import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Filter, Search, Briefcase, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../status-badge';
import { type JobStatus } from '../../data/mock-data';

const QUICK_FILTERS: (JobStatus | 'All')[] = [
  'All', 'Pending Approval', 'Open', 'Pending Confirmation',
  'Confirmed', 'En Route to Pickup', 'At Pickup', 'In Transit', 'Arrived', 'Completed', 'Cancelled',
];

export function AdminDashboard() {
  const { jobs } = useApp();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<JobStatus | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = jobs
    .filter((j) => filter === 'All' || j.status === filter)
    .filter(
      (j) =>
        !search ||
        j.vehicleInfo.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
        `${j.vehicleInfo.make} ${j.vehicleInfo.model}`.toLowerCase().includes(search.toLowerCase()) ||
        j.customerName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

  const pending = jobs.filter((j) => j.status === 'Pending Confirmation').length;
  const open = jobs.filter((j) => j.status === 'Open').length;
  const active = jobs.filter((j) =>
    ['Confirmed', 'En Route to Pickup', 'At Pickup', 'In Transit', 'Arrived'].includes(j.status)
  ).length;
  const done = jobs.filter((j) => j.status === 'Completed').length;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white mb-1">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome, {currentUser?.name}</p>
        </div>
        <Link
          to="/admin/jobs/new"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-red-600/20"
        >
          <Plus className="w-4 h-4" />
          Create Tow Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MiniStat icon={<Clock className="w-4 h-4 text-purple-400" />} label="Pending Confirm" value={pending} />
        <MiniStat icon={<Briefcase className="w-4 h-4 text-blue-400" />} label="Open Jobs" value={open} />
        <MiniStat icon={<TrendingUp className="w-4 h-4 text-orange-400" />} label="Active Jobs" value={active} />
        <MiniStat icon={<CheckCircle2 className="w-4 h-4 text-green-400" />} label="Completed" value={done} />
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by plate, vehicle or customer..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-red-600 focus:outline-none text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        <Filter className="w-3.5 h-3.5 text-gray-500" />
        {QUICK_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
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
            <Link
              key={job.id}
              to={`/admin/jobs/${job.id}`}
              className="block bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs text-gray-500 font-mono">{job.id}</span>
                    <span className="text-white font-medium">
                      {job.vehicleInfo.make} {job.vehicleInfo.model}
                    </span>
                    <span className="text-gray-400 text-sm">{job.vehicleInfo.plateNumber}</span>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="text-sm text-gray-400 mb-1">
                    {job.pickupLocation.address}, {job.pickupLocation.town}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatTimeAgo(job.postedAt)}
                    {job.assignedDriver ? ` · Driver: ${job.assignedDriver.name}` : ''}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-semibold text-red-400">RM {job.price}</div>
                  <div className="text-xs text-gray-500 mt-1">{job.customerName}</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <div className="text-xl font-semibold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diff < 0) return 'Just now'; // Handle future dates
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}
