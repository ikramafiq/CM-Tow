import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Car, User, Phone, Clock, ChevronRight } from "lucide-react";
import { mockJobs } from "../data/mock-data";
import { StatusBadge } from "./status-badge";
import { useState } from "react";

export function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find(j => j.id === jobId);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-400">Job not found</p>
        <Link to="/admin" className="text-[#ff6b00] hover:text-[#ff8533] mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const canUpdateStatus = job.status !== 'Delivered' && job.status !== 'Cancelled';
  
  const getNextStatus = () => {
    switch (job.status) {
      case 'Posted':
        return 'Driver Assigned';
      case 'Driver Assigned':
        return 'In Transit';
      case 'In Transit':
        return 'Delivered';
      default:
        return null;
    }
  };

  const handleUpdateStatus = () => {
    const nextStatus = getNextStatus();
    if (!nextStatus) return;
    
    setUpdatingStatus(true);
    // In a real app, this would update the backend
    console.log(`Updating job ${jobId} status to: ${nextStatus}`);
    
    setTimeout(() => {
      setUpdatingStatus(false);
      // Navigate back or show success message
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Job Details: {job.id}</h1>
            <p className="text-gray-400">Complete tracking and status history</p>
          </div>
          <StatusBadge status={job.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Info */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-[#ff6b00]" />
              <h3>Vehicle Information</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Make & Model</span>
                <span className="text-white font-medium">
                  {job.vehicleInfo.make} {job.vehicleInfo.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Plate Number</span>
                <span className="text-white font-medium">{job.vehicleInfo.plateNumber}</span>
              </div>
              {job.vehicleInfo.year && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Year</span>
                  <span className="text-white font-medium">{job.vehicleInfo.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="mb-4">Location Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Pickup From</div>
                  <div className="text-white font-medium">
                    {job.pickupLocation.town}, {job.pickupLocation.state}
                  </div>
                  <div className="text-gray-400 text-sm">{job.pickupLocation.address}</div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#ff6b00] flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Deliver To</div>
                  <div className="text-white font-medium">{job.destination.name}</div>
                  <div className="text-gray-400 text-sm">{job.destination.address}</div>
                  <div className="text-gray-400 text-sm">
                    {job.destination.town}, {job.destination.state}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Issue */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="mb-4">Customer & Issue Details</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-white">{job.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-white">{job.customerPhone}</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <div className="text-sm text-gray-400 mb-2">Issue Description</div>
              <p className="text-white">{job.issueDescription}</p>
            </div>
          </div>

          {/* Driver Info (if assigned) */}
          {job.assignedDriver && (
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-lg p-6">
              <h3 className="mb-4 text-yellow-400">Assigned Driver</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-medium">{job.assignedDriver.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{job.assignedDriver.phone}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-2">Tow Price</div>
            <div className="text-4xl font-semibold text-[#ff6b00]">
              RM {job.price}
            </div>
          </div>

          {/* Status Update */}
          {canUpdateStatus && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="mb-3">Update Status</h3>
              <button
                onClick={handleUpdateStatus}
                disabled={updatingStatus}
                className="w-full flex items-center justify-center gap-2 bg-[#ff6b00] hover:bg-[#ff8533] text-white px-4 py-3 rounded-md transition-colors disabled:opacity-50"
              >
                {updatingStatus ? 'Updating...' : `Mark as ${getNextStatus()}`}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Status History */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#ff6b00]" />
              <h3>Status History</h3>
            </div>
            
            <div className="space-y-4">
              {job.statusHistory.map((history, index) => (
                <div key={index} className="relative">
                  {index !== job.statusHistory.length - 1 && (
                    <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-800" />
                  )}
                  
                  <div className="flex gap-3">
                    <div className="w-4 h-4 mt-1 rounded-full bg-[#ff6b00] border-2 border-gray-900 relative z-10" />
                    <div className="flex-1 pb-4">
                      <div className="text-white font-medium mb-1">{history.status}</div>
                      <div className="text-sm text-gray-400">
                        {formatDateTime(history.timestamp)}
                      </div>
                      {history.note && (
                        <div className="text-sm text-gray-500 mt-1">{history.note}</div>
                      )}
                    </div>
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

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
