import { type JobStatus } from '../data/mock-data';

interface StatusBadgeProps {
  status: JobStatus;
  size?: 'sm' | 'md';
}

const styles: Record<JobStatus, string> = {
  'Pending Approval':     'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Open':                 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Pending Confirmation': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  'Confirmed':            'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  'En Route to Pickup':   'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'At Pickup':            'bg-orange-500/10 text-orange-300 border-orange-500/30',
  'In Transit':           'bg-red-500/10 text-red-400 border-red-500/30',
  'Arrived':              'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'Completed':            'bg-green-500/10 text-green-400 border-green-500/30',
  'Cancelled':            'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const padding = size === 'md' ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs';
  return (
    <span className={`inline-block rounded-full border font-medium whitespace-nowrap ${padding} ${styles[status]}`}>
      {status}
    </span>
  );
}
