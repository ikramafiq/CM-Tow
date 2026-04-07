import { useParams, Link } from 'react-router';
import { ArrowLeft, MapPin, Car, User, Phone, Clock, ChevronRight, Lock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../status-badge';
import { PhotoUpload } from '../photo-upload';
import { type JobStatus } from '../../data/mock-data';

// What status comes after each driver-actionable state
const NEXT_STATUS: Partial<Record<JobStatus, { next: JobStatus; label: string; requiresPhotos?: 'pickup' | 'delivery' }>> = {
  'Confirmed':          { next: 'En Route to Pickup',   label: 'Head to Pickup Location' },
  'En Route to Pickup': { next: 'At Pickup',            label: "I've Arrived at Pickup" },
  'At Pickup':          { next: 'In Transit',            label: 'Vehicle Loaded — Head to Destination', requiresPhotos: 'pickup' },
  'In Transit':         { next: 'Arrived',               label: "I've Arrived at Destination" },
  'Arrived':            { next: 'Completed',             label: 'Mark Job as Completed', requiresPhotos: 'delivery' },
};

export function DriverJobDetail() {
  const { jobId } = useParams();
  const { jobs, updateJobStatus, addPickupPhotos, addDeliveryPhotos } = useApp();
  const { currentUser } = useAuth();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Job not found</p>
        <Link to="/driver/my-jobs" className="text-red-400 hover:text-red-300 mt-3 inline-block text-sm">
          ← Back to My Jobs
        </Link>
      </div>
    );
  }

  const isMyJob = job.assignedDriver?.id === currentUser?.id;
  const transition = NEXT_STATUS[job.status];
  const customerRevealed = ['Confirmed', 'En Route to Pickup', 'At Pickup', 'In Transit', 'Arrived', 'Completed'].includes(job.status);

  const canAdvance =
    transition &&
    isMyJob &&
    !(transition.requiresPhotos === 'pickup' && job.pickupPhotos.length === 0) &&
    !(transition.requiresPhotos === 'delivery' && job.deliveryPhotos.length === 0);

  const photosMissing =
    transition?.requiresPhotos === 'pickup' && job.pickupPhotos.length === 0
      ? 'Upload at least one pickup photo before proceeding'
      : transition?.requiresPhotos === 'delivery' && job.deliveryPhotos.length === 0
      ? 'Upload at least one delivery photo before proceeding'
      : null;

  return (
    <div>
      <div className="mb-6">
        <Link to="/driver/my-jobs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to My Jobs
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-white mb-1">Job {job.id}</h1>
            <p className="text-gray-400 text-sm">
              {job.vehicleInfo.make} {job.vehicleInfo.model} · {job.vehicleInfo.plateNumber}
            </p>
          </div>
          <StatusBadge status={job.status} size="md" />
        </div>
      </div>

      {/* Pending confirmation notice */}
      {job.status === 'Pending Confirmation' && (
        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 mb-5 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-white font-medium">Waiting for Admin Confirmation</p>
            <p className="text-xs text-gray-400 mt-0.5">
              The admin is calling the customer to confirm. Customer details will be revealed once confirmed.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Vehicle */}
          <Section icon={<Car className="w-4 h-4 text-red-400" />} title="Vehicle">
            <Row label="Make & Model" value={`${job.vehicleInfo.make} ${job.vehicleInfo.model}`} />
            <Row label="Plate Number" value={job.vehicleInfo.plateNumber} />
            {job.vehicleInfo.year && <Row label="Year" value={job.vehicleInfo.year} />}
          </Section>

          {/* Locations */}
          <Section title="Route">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Pickup From</div>
                  <div className="text-sm text-white font-medium">{job.pickupLocation.address}</div>
                  <div className="text-sm text-gray-400">{job.pickupLocation.town}, {job.pickupLocation.state}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Deliver To</div>
                  <div className="text-sm text-white font-medium">{job.destination.name}</div>
                  <div className="text-sm text-gray-400">{job.destination.address}</div>
                  <div className="text-sm text-gray-400">{job.destination.town}, {job.destination.state}</div>
                </div>
              </div>
            </div>
          </Section>

          {/* Customer Tracking Link */}
          {job.customerTrackingToken && (
            <Section title="Customer Tracking Link">
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-400 font-medium mb-2">Share this link with the customer</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/track/${job.customerTrackingToken}`}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/track/${job.customerTrackingToken}`);
                      // Could add a toast notification here
                    }}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This link allows the customer to track their vehicle's status in real-time.
                </p>
              </div>
            </Section>
          )}

          {/* Pickup Photos */}
          {['At Pickup', 'In Transit', 'Arrived', 'Completed'].includes(job.status) && (
            <Section title="Pickup Photos">
              <PhotoUpload
                photos={job.pickupPhotos}
                onAdd={(photos) => addPickupPhotos(job.id, photos)}
                label="Vehicle photos at pickup location"
              />
            </Section>
          )}

          {/* Delivery Photos */}
          {['Arrived', 'Completed'].includes(job.status) && (
            <Section title="Delivery Photos">
              <PhotoUpload
                photos={job.deliveryPhotos}
                onAdd={(photos) => addDeliveryPhotos(job.id, photos)}
                label="Vehicle photos at delivery destination"
              />
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Price */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <p className="text-xs text-gray-500 mb-2">Your Earnings</p>
            <p className="text-3xl font-semibold text-red-400">RM {job.price}</p>
          </div>

          {/* Action */}
          {transition && isMyJob && job.status !== 'Completed' && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              {photosMissing && (
                <div className="flex items-start gap-2 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3 mb-4 text-xs text-yellow-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  {photosMissing}
                </div>
              )}
              <button
                onClick={() =>
                  updateJobStatus(
                    job.id,
                    transition.next,
                    '',
                    currentUser!.name
                  )
                }
                disabled={!canAdvance}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-red-600/20"
              >
                {transition.label}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {job.status === 'Completed' && (
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5 text-center">
              <p className="text-green-400 font-medium text-sm">Job Completed</p>
              <p className="text-xs text-gray-500 mt-1">Great work! RM {job.price} earned.</p>
            </div>
          )}

          {/* Status Timeline */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-white">Timeline</span>
            </div>
            <div className="space-y-3">
              {job.statusHistory.map((h, i) => (
                <div key={i} className="relative flex gap-3">
                  {i < job.statusHistory.length - 1 && (
                    <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-gray-800" />
                  )}
                  <div className={`w-3.5 h-3.5 mt-1 rounded-full border-2 border-[#0a0a0a] flex-shrink-0 relative z-10 ${
                    i === job.statusHistory.length - 1 ? 'bg-red-600' : 'bg-gray-700'
                  }`} />
                  <div className="pb-3">
                    <div className="text-sm text-white">{h.status}</div>
                    <div className="text-xs text-gray-500">{formatDateTime(h.timestamp)}</div>
                    {h.note && <div className="text-xs text-gray-600 mt-0.5">{h.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-sm font-medium text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-gray-800/50 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm text-white font-medium">{value}</span>
    </div>
  );
}

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-MY', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
