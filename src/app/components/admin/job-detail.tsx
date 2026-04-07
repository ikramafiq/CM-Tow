import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Car, User, Phone, Clock, CheckCircle2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../status-badge';

export function AdminJobDetail() {
  const { jobId } = useParams();
  const { jobs, confirmJob, deleteJob } = useApp();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Job not found</p>
        <Link to="/admin" className="text-red-400 hover:text-red-300 mt-3 inline-block text-sm">
          ← Back
        </Link>
      </div>
    );
  }

  const canConfirm = job.status === 'Pending Confirmation';
  const canDelete = ['Pending Approval', 'Open', 'Cancelled'].includes(job.status);

  return (
    <div>
      <div className="mb-6">
        <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left */}
        <div className="lg:col-span-2 space-y-5">
          {/* Vehicle */}
          <Section icon={<Car className="w-4 h-4 text-red-400" />} title="Vehicle Information">
            <Row label="Make & Model" value={`${job.vehicleInfo.make} ${job.vehicleInfo.model}`} />
            <Row label="Plate Number" value={job.vehicleInfo.plateNumber} />
            {job.vehicleInfo.year && <Row label="Year" value={job.vehicleInfo.year} />}
          </Section>

          {/* Location */}
          <Section title="Locations">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Pickup From</div>
                  <div className="text-sm text-white">{job.pickupLocation.address}</div>
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

          {/* Customer */}
          <Section title="Customer Details">
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-white">{job.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${job.customerPhone}`} className="text-sm text-white hover:text-red-400 transition-colors">
                  {job.customerPhone}
                </a>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-3">
              <p className="text-xs text-gray-500 mb-1">Issue</p>
              <p className="text-sm text-gray-300">{job.issueDescription}</p>
            </div>
          </Section>

          {/* Driver */}
          {job.assignedDriver && (
            <Section title="Assigned Driver">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">{job.assignedDriver.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${job.assignedDriver.phone}`} className="text-sm text-white hover:text-red-400 transition-colors">
                    {job.assignedDriver.phone}
                  </a>
                </div>
              </div>
            </Section>
          )}

          {/* Photos */}
          {(job.pickupPhotos.length > 0 || job.deliveryPhotos.length > 0) && (
            <Section title="Photos">
              {job.pickupPhotos.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Pickup Photos ({job.pickupPhotos.length})</p>
                  <div className="grid grid-cols-4 gap-2">
                    {job.pickupPhotos.map((src, i) => (
                      <img key={i} src={src} alt="" className="aspect-square rounded-lg object-cover" />
                    ))}
                  </div>
                </div>
              )}
              {job.deliveryPhotos.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Delivery Photos ({job.deliveryPhotos.length})</p>
                  <div className="grid grid-cols-4 gap-2">
                    {job.deliveryPhotos.map((src, i) => (
                      <img key={i} src={src} alt="" className="aspect-square rounded-lg object-cover" />
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}
        </div>

        {/* Right */}
        <div className="space-y-5">
          {/* Price */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <p className="text-xs text-gray-500 mb-2">Tow Price</p>
            <p className="text-3xl font-semibold text-red-400">RM {job.price}</p>
          </div>

          {/* Confirm action */}
          {canConfirm && (
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
              <p className="text-sm text-white font-medium mb-1">Confirm Driver</p>
              <p className="text-xs text-gray-400 mb-4">
                {job.assignedDriver?.name} has accepted this job. Call the customer to confirm, then mark as confirmed.
              </p>
              <button
                onClick={() => confirmJob(job.id, currentUser!.name)}
                className="w-full flex items-center justify-center gap-2 bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/30 py-2.5 rounded-xl text-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Confirmed
              </button>
            </div>
          )}

          {/* Status Timeline */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-white">Status Timeline</span>
            </div>
            <div className="space-y-3">
              {job.statusHistory.map((h, i) => (
                <div key={i} className="relative flex gap-3">
                  {i < job.statusHistory.length - 1 && (
                    <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-gray-800" />
                  )}
                  <div className="w-3.5 h-3.5 mt-1 rounded-full bg-red-600 border-2 border-[#0a0a0a] flex-shrink-0 relative z-10" />
                  <div className="pb-3">
                    <div className="text-sm text-white">{h.status}</div>
                    <div className="text-xs text-gray-500">{formatDateTime(h.timestamp)}</div>
                    {h.note && <div className="text-xs text-gray-600 mt-0.5">{h.note}</div>}
                    {h.updatedBy && <div className="text-xs text-gray-600">by {h.updatedBy}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delete */}
          {canDelete && (
            <button
              onClick={() => {
                if (confirm('Delete this job?')) {
                  deleteJob(job.id);
                  navigate('/admin');
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20 rounded-xl text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Job
            </button>
          )}
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
