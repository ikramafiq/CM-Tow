import { useParams } from 'react-router';
import { MapPin, Phone, User, Clock, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from './status-badge';

export function CustomerTracking() {
  const { token } = useParams();
  const { jobs } = useApp();

  const job = jobs.find((j) => j.customerTrackingToken === token);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Tracking Link Not Found</h1>
          <p className="text-gray-600">
            This tracking link is invalid or has expired. Please contact MedicTow CM for assistance.
          </p>
        </div>
      </div>
    );
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'Pending Confirmation':
        return 'Your tow request has been accepted by a driver. Waiting for admin confirmation.';
      case 'Confirmed':
        return 'Your tow job has been confirmed. Driver will be heading to your location.';
      case 'En Route to Pickup':
        return 'Driver is on the way to pick up your vehicle.';
      case 'At Pickup':
        return 'Driver has arrived at your location and is preparing your vehicle.';
      case 'In Transit':
        return 'Your vehicle is being towed to the destination.';
      case 'Arrived':
        return 'Your vehicle has arrived at the destination.';
      case 'Completed':
        return 'Your tow job has been completed successfully.';
      default:
        return 'Your tow request is being processed.';
    }
  };

  const getEstimatedTime = (status: string) => {
    switch (status) {
      case 'Pending Confirmation':
        return '15-30 minutes';
      case 'Confirmed':
        return '30-60 minutes';
      case 'En Route to Pickup':
        return 'Arriving soon';
      case 'At Pickup':
        return '15-30 minutes';
      case 'In Transit':
        return '30-90 minutes';
      case 'Arrived':
        return 'Job completed';
      case 'Completed':
        return 'Job completed';
      default:
        return 'TBD';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-8 h-8" />
            <h1 className="text-2xl font-bold">MedicTow CM</h1>
          </div>
          <p className="text-red-100">Vehicle Tow Tracking</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-8">
        {/* Job Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {job.vehicleInfo.make} {job.vehicleInfo.model}
              </h2>
              <p className="text-gray-600">{job.vehicleInfo.plateNumber}</p>
            </div>
            <StatusBadge status={job.status} size="md" />
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-900 font-medium">Current Status</p>
                <p className="text-blue-800 text-sm mt-1">{getStatusMessage(job.status)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Estimated Time</p>
              <p className="font-medium text-gray-900">{getEstimatedTime(job.status)}</p>
            </div>
            <div>
              <p className="text-gray-500">Job ID</p>
              <p className="font-medium text-gray-900">{job.id}</p>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        {job.assignedDriver && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Your Driver
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{job.assignedDriver.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone</span>
                <a
                  href={`tel:${job.assignedDriver.phone}`}
                  className="font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Phone className="w-4 h-4" />
                  {job.assignedDriver.phone}
                </a>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Important:</strong> Please call your driver if you need to make any changes or have questions about your tow.
              </p>
            </div>
          </div>
        )}

        {/* Locations */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Locations
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Pickup Location</p>
                <p className="text-gray-600 text-sm">
                  {job.pickupLocation.address}, {job.pickupLocation.town}, {job.pickupLocation.state}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Destination</p>
                <p className="text-gray-600 text-sm">
                  {job.destination.name}<br />
                  {job.destination.address}, {job.destination.town}, {job.destination.state}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Status Updates
          </h3>

          <div className="space-y-3">
            {job.statusHistory.slice().reverse().map((entry, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{entry.status}</p>
                  <p className="text-xs text-gray-500">
                    {entry.timestamp.toLocaleString()}
                    {entry.note && ` • ${entry.note}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Need help? Contact MedicTow CM at +60 12-888-1234</p>
        </div>
      </div>
    </div>
  );
}