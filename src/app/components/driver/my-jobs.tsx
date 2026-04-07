import { Link } from 'react-router';
import { Briefcase, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../status-badge';

export function DriverMyJobs() {
  const { jobs } = useApp();
  const { currentUser } = useAuth();

  const myJobs = jobs
    .filter((j) => j.assignedDriver?.id === currentUser?.id)
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

  const active = myJobs.filter((j) => !['Completed', 'Cancelled'].includes(j.status));
  const history = myJobs.filter((j) => ['Completed', 'Cancelled'].includes(j.status));

  const earned = myJobs
    .filter((j) => j.status === 'Completed')
    .reduce((sum, j) => sum + j.price, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white mb-1">My Jobs</h1>
        <p className="text-gray-400 text-sm">{myJobs.length} total · RM {earned} earned</p>
      </div>

      {/* Active */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-300 mb-3">Active ({active.length})</h2>
        {active.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-8 text-center text-gray-500 text-sm">
            No active jobs
          </div>
        ) : (
          <div className="space-y-3">
            {active.map((job) => (
              <Link
                key={job.id}
                to={`/driver/jobs/${job.id}`}
                className="flex items-center justify-between bg-gray-900/50 border border-gray-800 hover:border-red-600/30 rounded-xl p-4 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-sm text-white font-medium">
                      {job.vehicleInfo.make} {job.vehicleInfo.model}
                    </span>
                    <span className="text-xs text-gray-500">{job.vehicleInfo.plateNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={job.status} />
                    <span className="text-xs text-gray-500">{job.pickupLocation.town}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <span className="text-red-400 font-semibold text-sm">RM {job.price}</span>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-300 mb-3">History ({history.length})</h2>
          <div className="space-y-2">
            {history.map((job) => (
              <Link
                key={job.id}
                to={`/driver/jobs/${job.id}`}
                className="flex items-center justify-between bg-gray-900/30 border border-gray-800/50 hover:border-gray-700 rounded-xl p-4 transition-colors opacity-70 hover:opacity-100"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-300">
                      {job.vehicleInfo.make} {job.vehicleInfo.model}
                    </span>
                    <span className="text-xs text-gray-500">{job.vehicleInfo.plateNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={job.status} />
                    <span className="text-xs text-gray-600">{formatDate(job.postedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <span className={`font-semibold text-sm ${job.status === 'Completed' ? 'text-green-400' : 'text-gray-500'}`}>
                    RM {job.price}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
}
