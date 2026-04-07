import { Link } from 'react-router';
import { MapPin, Clock, Car, CheckCircle, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export function DriverDashboard() {
  const { jobs, driverAcceptJob } = useApp();
  const { currentUser } = useAuth();
  const [acceptedJob, setAcceptedJob] = useState<string | null>(null);

  // Only show Open jobs that aren't already taken
  const available = jobs
    .filter((j) => j.status === 'Open')
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

  const myActiveIds = new Set(
    jobs
      .filter((j) => j.assignedDriver?.id === currentUser?.id && j.status !== 'Completed' && j.status !== 'Cancelled')
      .map((j) => j.id)
  );

  const handleAcceptJob = (jobId: string) => {
    driverAcceptJob(jobId, {
      id: currentUser!.id,
      name: currentUser!.name,
      phone: currentUser!.phone,
    });
    setAcceptedJob(jobId);
    // Auto-hide after 10 seconds
    setTimeout(() => setAcceptedJob(null), 10000);
  };

  const acceptedJobData = acceptedJob ? jobs.find(j => j.id === acceptedJob) : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white mb-1">Available Jobs</h1>
        <p className="text-gray-400 text-sm">
          {available.length} job{available.length !== 1 ? 's' : ''} available near you
        </p>
      </div>

      {/* Success message after accepting job */}
      {acceptedJobData && acceptedJobData.customerTrackingToken && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-green-400 font-medium">Job Accepted!</p>
            <p className="text-sm text-gray-300 mt-1">
              Share this tracking link with the customer so they can monitor their vehicle's status:
            </p>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/track/${acceptedJobData.customerTrackingToken}`}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 font-mono"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/track/${acceptedJobData.customerTrackingToken}`);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
              >
                <Share2 className="w-3 h-3" />
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {available.length === 0 ? (
        <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-12 text-center">
          <Car className="w-10 h-10 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No jobs available right now</p>
          <p className="text-gray-600 text-xs mt-1">New tow requests will appear here once approved</p>
        </div>
      ) : (
        <div className="space-y-4">
          {available.map((job) => (
            <div
              key={job.id}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="w-4 h-4 text-red-400" />
                    <span className="text-white font-medium">
                      {job.vehicleInfo.make} {job.vehicleInfo.model}
                    </span>
                    <span className="text-gray-500 text-sm">·</span>
                    <span className="text-gray-400 text-sm">{job.vehicleInfo.plateNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    Posted {formatTimeAgo(job.postedAt)}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-semibold text-red-400">RM {job.price}</div>
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">Pickup From</div>
                    <div className="text-sm text-white">{job.pickupLocation.town}, {job.pickupLocation.state}</div>
                    <div className="text-xs text-gray-500">{job.pickupLocation.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">Deliver To</div>
                    <div className="text-sm text-white">{job.destination.name}</div>
                    <div className="text-xs text-gray-500">{job.destination.town}, {job.destination.state}</div>
                  </div>
                </div>
              </div>

              {/* Issue */}
              <div className="border-t border-gray-800 pt-3 mb-4">
                <p className="text-xs text-gray-500 line-clamp-2">{job.issueDescription}</p>
              </div>

              {/* Action */}
              <button
                onClick={() => handleAcceptJob(job.id)}
                disabled={myActiveIds.size >= 1}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-red-600/20"
              >
                Accept Job
              </button>
              {myActiveIds.size >= 1 && (
                <p className="text-xs text-center text-gray-600 mt-2">
                  Complete your current job before accepting another
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="mt-6 bg-gray-900/30 border border-gray-800 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500">
          After accepting, Admin will call the customer to confirm. Customer details will be revealed once confirmed.
        </p>
      </div>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diff < 1) return 'just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}
