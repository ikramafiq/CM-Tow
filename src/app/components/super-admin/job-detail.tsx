import { useParams, Link } from 'react-router';
import { ArrowLeft, MapPin, Car, User, Phone, Clock, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../status-badge';

export function SuperAdminJobDetail() {
  const { jobId } = useParams();
  const { jobs, approveJob, rejectJob, deleteJob, updateJobPrice } = useApp();
  const { currentUser } = useAuth();
  const job = jobs.find((j) => j.id === jobId);
  const [editingPrice, setEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState('');

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Job not found</p>
        <Link to="/super-admin/jobs" className="text-red-400 hover:text-red-300 mt-3 inline-block text-sm">
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  const handleSavePrice = () => {
    const p = parseFloat(newPrice);
    if (!isNaN(p) && p > 0) updateJobPrice(job.id, p);
    setEditingPrice(false);
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/super-admin/jobs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-white mb-1">Job {job.id}</h1>
            <p className="text-gray-400 text-sm">
              {job.vehicleInfo.make} {job.vehicleInfo.model} · {job.vehicleInfo.plateNumber}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={job.status} size="md" />
            {job.status === 'Pending Approval' && (
              <>
                <button
                  onClick={() => rejectJob(job.id, currentUser!.name)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-red-600/10 text-gray-300 hover:text-red-400 border border-gray-700 hover:border-red-600/30 rounded-lg text-sm transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => approveJob(job.id, currentUser!.name)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg text-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <div className="text-white text-sm">{job.pickupLocation.address}</div>
                  <div className="text-gray-400 text-sm">{job.pickupLocation.town}, {job.pickupLocation.state}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Deliver To</div>
                  <div className="text-white text-sm font-medium">{job.destination.name}</div>
                  <div className="text-gray-400 text-sm">{job.destination.address}</div>
                  <div className="text-gray-400 text-sm">{job.destination.town}, {job.destination.state}</div>
                </div>
              </div>
            </div>
          </Section>

          {/* Customer */}
          <Section title="Customer Details">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-white text-sm">{job.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-white text-sm">{job.customerPhone}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-1">Issue</p>
              <p className="text-sm text-gray-300">{job.issueDescription}</p>
            </div>
          </Section>

          {/* Driver */}
          {job.assignedDriver && (
            <Section title="Assigned Driver">
              <Row label="Name" value={job.assignedDriver.name} />
              <Row label="Phone" value={job.assignedDriver.phone} />
              {job.confirmedBy && <Row label="Confirmed by" value={job.confirmedBy} />}
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
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-400">Tow Price</span>
            </div>
            {editingPrice ? (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">RM</span>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-black/50 border border-gray-700 rounded-lg text-white text-sm focus:border-red-600 focus:outline-none"
                    autoFocus
                  />
                </div>
                <button onClick={handleSavePrice} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">Save</button>
                <button onClick={() => setEditingPrice(false)} className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm transition-colors">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold text-red-400">RM {job.price}</span>
                <button
                  onClick={() => { setNewPrice(String(job.price)); setEditingPrice(true); }}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Status History */}
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

          {/* Delete Job */}
          <div className="bg-gray-900/30 border border-red-600/20 rounded-xl p-4">
            <button
              onClick={() => {
                if (confirm('Delete this job? This cannot be undone.')) {
                  deleteJob(job.id);
                  window.history.back();
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20 rounded-lg text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Job
            </button>
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
