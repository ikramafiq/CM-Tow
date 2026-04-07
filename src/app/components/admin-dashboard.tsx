import { Link } from "react-router";
import { Plus, Filter, Car } from "lucide-react";
import { mockJobs } from "../data/mock-data";
import { StatusBadge } from "./status-badge";
import { useState } from "react";

export function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  const filteredJobs = statusFilter === 'All' 
    ? mockJobs 
    : mockJobs.filter(job => job.status === statusFilter);

  const sortedJobs = [...filteredJobs].sort((a, b) => 
    b.postedAt.getTime() - a.postedAt.getTime()
  );

  const stats = {
    total: mockJobs.length,
    posted: mockJobs.filter(j => j.status === 'Posted').length,
    assigned: mockJobs.filter(j => j.status === 'Driver Assigned').length,
    inTransit: mockJobs.filter(j => j.status === 'In Transit').length,
    delivered: mockJobs.filter(j => j.status === 'Delivered').length,
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-slide-in-down">
        <div>
          <h1 className="mb-1 transition-smooth">MedicTow CM Admin Dashboard</h1>
          <p className="text-gray-400 transition-smooth">Manage tow requests to Bandar Teknologi Kajang</p>
        </div>
        
        <Link
          to="/post-job"
          className="flex items-center gap-2 bg-[#ff6b00] hover:bg-[#ff8533] text-white px-6 py-3 rounded-lg transition-all shadow-lg shadow-[#ff6b00]/20 hover:shadow-[#ff6b00]/40 hover:shadow-xl hover-smooth hover:scale-[1.02]"
        >
          <Plus className="w-5 h-5" />
          Create Tow Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Jobs', value: stats.total },
          { label: 'Posted', value: stats.posted, color: 'text-blue-400', borderColor: 'border-blue-500/20' },
          { label: 'Assigned', value: stats.assigned, color: 'text-yellow-400', borderColor: 'border-yellow-500/20' },
          { label: 'In Transit', value: stats.inTransit, color: 'text-[#ff6b00]', borderColor: 'border-[#ff6b00]/20' },
          { label: 'Delivered', value: stats.delivered, color: 'text-green-400', borderColor: 'border-green-500/20' },
        ].map((stat, i) => (
          <div 
            key={stat.label}
            className={`bg-gray-900/50 border ${stat.borderColor || 'border-gray-800'} rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-white/5 hover-smooth animate-slide-in-up`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className={`text-2xl font-semibold mb-1 ${stat.color || ''} transition-smooth`}>{stat.value}</div>
            <div className="text-sm text-gray-400 transition-smooth">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 animate-slide-in-left">
        <Filter className="w-4 h-4 text-gray-400 transition-smooth" />
        <span className="text-sm text-gray-400 transition-smooth">Filter:</span>
        {['All', 'Posted', 'Driver Assigned', 'In Transit', 'Delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-md text-sm transition-all hover-smooth ${
              statusFilter === status
                ? 'bg-[#ff6b00] text-white shadow-lg shadow-[#ff6b00]/20'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {sortedJobs.length === 0 ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center animate-slide-in-up transition-smooth">
            <p className="text-gray-400">No jobs found</p>
          </div>
        ) : (
          sortedJobs.map((job, i) => (
            <Link
              key={job.id}
              to={`/job/${job.id}`}
              className="block bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-600 hover:bg-gray-900/70 hover:shadow-lg hover:shadow-white/5 transition-all hover-smooth animate-slide-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="w-5 h-5 text-[#ff6b00]" />
                    <h3 className="text-lg">
                      {job.vehicleInfo.make} {job.vehicleInfo.model}
                    </h3>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{job.vehicleInfo.plateNumber}</span>
                    <StatusBadge status={job.status} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 mb-1">Pickup Location</div>
                      <div className="text-white">
                        {job.pickupLocation.town}, {job.pickupLocation.state}
                      </div>
                      <div className="text-gray-500 text-xs">{job.pickupLocation.address}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Customer</div>
                      <div className="text-white">{job.customerName}</div>
                      <div className="text-gray-500 text-xs">{job.customerPhone}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-2xl font-semibold text-[#ff6b00] mb-1">
                    RM {job.price}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatTimestamp(job.postedAt)}
                  </div>
                  {job.assignedDriver && (
                    <div className="text-xs text-gray-400 mt-2">
                      Driver: {job.assignedDriver.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-800 pt-3 text-sm text-gray-400">
                {job.issueDescription}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else {
    return `${diffDays}d ago`;
  }
}
