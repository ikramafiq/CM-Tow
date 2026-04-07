import { useState } from "react";
import { Link } from "react-router";
import { MapPin, Clock, Car, DollarSign, CheckCircle } from "lucide-react";
import { mockJobs } from "../data/mock-data";
import { StatusBadge } from "./status-badge";

export function DriverDashboard() {
  const [claimedJobs, setClaimedJobs] = useState<Set<string>>(new Set());

  // Only show jobs that are "Posted" or that the driver has claimed/is handling
  const availableJobs = mockJobs.filter(job => 
    job.status === 'Posted' || 
    (job.assignedDriver && ['Driver Assigned', 'In Transit'].includes(job.status))
  );

  // Sort by timestamp (newest first)
  const sortedJobs = [...availableJobs].sort((a, b) => 
    b.postedAt.getTime() - a.postedAt.getTime()
  );

  const handleClaimJob = (jobId: string) => {
    // In a real app, this would update the backend
    console.log(`Job ${jobId} claimed by driver`);
    setClaimedJobs(prev => new Set([...prev, jobId]));
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8 animate-slide-in-down">
        <h1 className="mb-1 transition-smooth">Available Tow Jobs</h1>
        <p className="text-gray-400 transition-smooth">All vehicles go to MedicTow CM factory in Bandar Teknologi Kajang</p>
      </div>

      {/* Jobs Feed */}
      <div className="space-y-4">
        {sortedJobs.length === 0 ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center animate-slide-in-up transition-smooth">
            <p className="text-gray-400">No jobs available</p>
            <p className="text-gray-500 text-sm mt-2 transition-smooth">
              New tow requests will appear here
            </p>
          </div>
        ) : (
          sortedJobs.map((job, i) => {
            const isClaimed = claimedJobs.has(job.id) || job.status !== 'Posted';
            const isMyJob = job.assignedDriver !== undefined;

            return (
              <div
                key={job.id}
                className={`bg-gray-900/50 border rounded-lg p-6 transition-all hover-smooth animate-slide-in-up ${
                  isClaimed
                    ? 'border-yellow-500/50 bg-yellow-500/5'
                    : 'border-gray-800 hover:border-gray-600 hover:bg-gray-900/70 hover:shadow-lg hover:shadow-white/5'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Job Header */}
                <div className="flex items-start justify-between mb-4 transition-smooth">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 transition-smooth">
                      <Car className="w-5 h-5 text-[#ff6b00] transition-smooth" />
                      <h3 className="text-lg transition-smooth">
                        {job.vehicleInfo.make} {job.vehicleInfo.model}
                      </h3>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm transition-smooth">{job.vehicleInfo.plateNumber}</span>
                      {job.vehicleInfo.year && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400 text-sm transition-smooth">{job.vehicleInfo.year}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-4 transition-smooth">
                      <StatusBadge status={job.status} />
                      <span className="text-xs text-gray-500 transition-smooth">
                        Posted {formatTimeAgo(job.postedAt)}
                      </span>
                    </div>

                    {/* Location Details */}
                    <div className="space-y-3 mb-4 transition-smooth">
                      <div className="flex items-start gap-3 hover:text-gray-300 transition-smooth">
                        <MapPin className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0 transition-smooth" />
                        <div className="transition-smooth">
                          <div className="text-sm text-gray-400 transition-smooth">Pickup From</div>
                          <div className="text-white font-medium transition-smooth">
                            {job.pickupLocation.town}, {job.pickupLocation.state}
                          </div>
                          <div className="text-gray-500 text-sm transition-smooth">{job.pickupLocation.address}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 hover:text-gray-300 transition-smooth">
                        <MapPin className="w-5 h-5 mt-0.5 text-[#ff6b00] flex-shrink-0 transition-smooth" />
                        <div className="transition-smooth">
                          <div className="text-sm text-gray-400 transition-smooth">Deliver To</div>
                          <div className="text-white font-medium transition-smooth">{job.destination.name}</div>
                          <div className="text-gray-500 text-sm transition-smooth">
                            {job.destination.town}, {job.destination.state}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer & Issue */}
                    <div className="border-t border-gray-800 pt-3 space-y-2 transition-smooth">
                      <div className="text-sm transition-smooth">
                        <span className="text-gray-400 transition-smooth">Customer: </span>
                        <span className="text-white transition-smooth">{job.customerName}</span>
                        <span className="text-gray-500"> • </span>
                        <span className="text-gray-400 transition-smooth">{job.customerPhone}</span>
                      </div>
                      <div className="text-sm text-gray-400 transition-smooth">
                        <span className="text-gray-500">Issue: </span>
                        {job.issueDescription}
                      </div>
                    </div>

                    {isMyJob && job.assignedDriver && (
                      <div className="mt-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 animate-slide-in-left transition-smooth">
                        <div className="text-sm text-yellow-400 transition-smooth">
                          Assigned to: {job.assignedDriver.name}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="text-right ml-6 flex-shrink-0 transition-smooth">
                    <div className="text-3xl font-semibold text-[#ff6b00] mb-2 transition-smooth">
                      RM {job.price}
                    </div>
                    
                    {isClaimed ? (
                      <div className="flex flex-col items-end gap-2 transition-smooth">
                        {job.status === 'Posted' ? (
                          <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-lg border border-yellow-500/20 animate-pulse-subtle transition-smooth">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Claimed</span>
                          </div>
                        ) : (
                          <Link
                            to={`/job/${job.id}`}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-all hover-smooth shadow-sm hover:shadow-md text-sm"
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaimJob(job.id)}
                        className="px-6 py-3 bg-[#ff6b00] hover:bg-[#ff8533] text-white rounded-md transition-all shadow-lg shadow-[#ff6b00]/20 hover:shadow-[#ff6b00]/40 hover:shadow-xl whitespace-nowrap hover-smooth hover:scale-[1.02]"
                      >
                        Claim Job
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info Note */}
      <div className="mt-8 bg-gray-900/30 border border-gray-800 rounded-lg p-4 animate-slide-in-up transition-smooth hover:shadow-lg hover:shadow-white/5 hover-smooth">
        <p className="text-sm text-gray-400 text-center transition-smooth">
          Jobs are sorted by posting time. Claim jobs quickly to secure the opportunity.
        </p>
      </div>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else {
    return `${Math.floor(diffHours / 24)}d ago`;
  }
}
