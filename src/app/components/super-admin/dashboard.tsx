import { Link } from 'react-router';
import { CheckCircle2, XCircle, Briefcase, Users, TrendingUp, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../status-badge';
import { type Job } from '../../data/mock-data';

export function SuperAdminDashboard() {
  const { jobs, users, approveJob, rejectJob } = useApp();
  const { currentUser } = useAuth();

  const pending = jobs.filter((j) => j.status === 'Pending Approval');
  const active = jobs.filter((j) =>
    ['Open', 'Pending Confirmation', 'Confirmed', 'En Route to Pickup', 'At Pickup', 'In Transit', 'Arrived'].includes(j.status)
  );
  const completed = jobs.filter((j) => j.status === 'Completed');
  const cancelled = jobs.filter((j) => j.status === 'Cancelled');
  const totalRevenue = completed.reduce((sum, j) => sum + j.price, 0);
  const activeDrivers = users.filter((u) => u.role === 'driver' && u.isActive).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white mb-1">Super Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back, {currentUser?.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Clock className="w-5 h-5 text-yellow-400" />} label="Pending Approval" value={pending.length} border="border-yellow-500/20" />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-blue-400" />} label="Active Jobs" value={active.length} border="border-blue-500/20" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} label="Completed" value={completed.length} border="border-green-500/20" />
        <StatCard icon={<Users className="w-5 h-5 text-red-400" />} label="Active Drivers" value={activeDrivers} border="border-red-500/20" />
      </div>

      {/* Revenue */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Revenue (Completed Jobs)</p>
            <p className="text-3xl font-semibold text-red-400">RM {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div>{jobs.length} total jobs</div>
            <div>{cancelled.length} cancelled</div>
          </div>
        </div>
      </div>

      {/* Pending Approval Queue */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">Pending Approval</h2>
          {pending.length > 0 && (
            <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs px-2.5 py-1 rounded-full">
              {pending.length} waiting
            </span>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-8 text-center text-gray-500 text-sm">
            No jobs pending approval
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((job) => (
              <ApprovalCard
                key={job.id}
                job={job}
                onApprove={() => approveJob(job.id, currentUser!.name)}
                onReject={() => rejectJob(job.id, currentUser!.name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Active Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">Active Jobs</h2>
          <Link to="/super-admin/jobs" className="text-sm text-red-400 hover:text-red-300 transition-colors">
            View all →
          </Link>
        </div>

        {active.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-8 text-center text-gray-500 text-sm">
            No active jobs
          </div>
        ) : (
          <div className="space-y-2">
            {active.slice(0, 5).map((job) => (
              <Link
                key={job.id}
                to={`/super-admin/jobs/${job.id}`}
                className="flex items-center justify-between bg-gray-900/40 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Briefcase className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm text-white font-medium truncate">
                      {job.vehicleInfo.make} {job.vehicleInfo.model} · {job.vehicleInfo.plateNumber}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {job.pickupLocation.town}, {job.pickupLocation.state}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <StatusBadge status={job.status} />
                  <span className="text-red-400 font-medium text-sm">RM {job.price}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, border }: { icon: React.ReactNode; label: string; value: number; border: string }) {
  return (
    <div className={`bg-gray-900/50 border ${border} rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function ApprovalCard({ job, onApprove, onReject }: { job: Job; onApprove: () => void; onReject: () => void }) {
  return (
    <Link
      to={`/super-admin/jobs/${job.id}`}
      className="block bg-gray-900/50 border border-yellow-500/20 hover:border-yellow-500/40 hover:bg-gray-900/60 rounded-xl p-5 transition-all hover-smooth group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-medium group-hover:text-yellow-400 transition-smooth">
              {job.vehicleInfo.make} {job.vehicleInfo.model}
            </span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-smooth">{job.vehicleInfo.plateNumber}</span>
          </div>
          <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-smooth">
            {job.pickupLocation.address}, {job.pickupLocation.town}, {job.pickupLocation.state}
          </div>
          <div className="text-sm text-gray-500 mt-1 group-hover:text-gray-400 transition-smooth">
            Created by {job.createdBy} · {formatTimeAgo(job.postedAt)}
          </div>
          <div className="text-xs text-gray-600 mt-1 group-hover:text-gray-500 transition-smooth">{job.issueDescription}</div>
        </div>
        <div 
          className="text-right flex-shrink-0"
          onClick={(e) => e.preventDefault()}
        >
          <div className="text-xl font-semibold text-red-400 mb-3 group-hover:text-red-300 transition-smooth">RM {job.price}</div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onReject();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-red-600/20 hover:text-red-400 border border-gray-700 hover:border-red-600/40 rounded-lg text-sm text-gray-300 transition-all hover-smooth"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onApprove();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg text-sm transition-all hover-smooth"
            >
              <CheckCircle2 className="w-4 h-4" />
              Approve
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function formatTimeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}
