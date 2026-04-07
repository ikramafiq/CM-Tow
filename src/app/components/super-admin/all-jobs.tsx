import { useState } from 'react';
import { Link } from 'react-router';
import { Filter, Search, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../status-badge';
import { type JobStatus } from '../../data/mock-data';

const ALL_STATUSES: JobStatus[] = [
  'Pending Approval', 'Open', 'Pending Confirmation', 'Confirmed',
  'En Route to Pickup', 'At Pickup', 'In Transit', 'Arrived', 'Completed', 'Cancelled',
];

export function SuperAdminAllJobs() {
  const { jobs, approveJob, rejectJob } = useApp();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<JobStatus | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = jobs
    .filter((j) => filter === 'All' || j.status === filter)
    .filter(
      (j) =>
        !search ||
        j.vehicleInfo.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
        j.vehicleInfo.make.toLowerCase().includes(search.toLowerCase()) ||
        j.vehicleInfo.model.toLowerCase().includes(search.toLowerCase()) ||
        j.customerName.toLowerCase().includes(search.toLowerCase()) ||
        j.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white mb-1">All Jobs</h1>
          <p className="text-gray-400 text-sm">{jobs.length} total jobs</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by plate, vehicle, customer, or job ID..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-red-600 focus:outline-none text-sm"
        />
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-500" />
        {(['All', ...ALL_STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              filter === s ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Jobs */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-10 text-center text-gray-500 text-sm">
            No jobs found
          </div>
        ) : (
          filtered.map((job) => (
            <div key={job.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500 font-mono">{job.id}</span>
                    <span className="text-white font-medium">
                      {job.vehicleInfo.make} {job.vehicleInfo.model}
                    </span>
                    <span className="text-gray-400 text-sm">{job.vehicleInfo.plateNumber}</span>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="text-sm text-gray-400 mb-1">
                    {job.pickupLocation.town}, {job.pickupLocation.state}
                  </div>
                  <div className="text-xs text-gray-600">
                    By {job.createdBy} · {formatDate(job.postedAt)}
                    {job.assignedDriver && ` · Driver: ${job.assignedDriver.name}`}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-semibold text-red-400 mb-2">RM {job.price}</div>
                  <div className="flex gap-2 justify-end">
                    {job.status === 'Pending Approval' && (
                      <>
                        <button
                          onClick={() => rejectJob(job.id, currentUser!.name)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-800 hover:bg-red-600/10 text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-600/30 rounded-lg text-xs transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                        <button
                          onClick={() => approveJob(job.id, currentUser!.name)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg text-xs transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      </>
                    )}
                    <Link
                      to={`/super-admin/jobs/${job.id}`}
                      className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 rounded-lg text-xs transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
}
