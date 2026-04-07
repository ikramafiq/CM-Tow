import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Send, MapPin } from "lucide-react";
import { Link } from "react-router";
import { CAR_MEDIC_LOCATION } from "../data/mock-data";

export function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Vehicle Info
    make: '',
    model: '',
    plateNumber: '',
    year: '',
    // Pickup Location
    pickupAddress: '',
    pickupTown: '',
    pickupState: '',
    // Customer Info
    customerName: '',
    customerPhone: '',
    // Job Details
    issueDescription: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('Job posted:', formData);
    navigate('/admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isValid = formData.make && formData.model && formData.plateNumber &&
                  formData.pickupAddress && formData.pickupTown && formData.pickupState &&
                  formData.customerName && formData.customerPhone &&
                  formData.issueDescription && formData.price;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="mb-1">Create New Tow Job</h1>
        <p className="text-gray-400">All vehicles will be towed to MedicTow CM factory</p>
      </div>

      {/* Destination Info Box */}
      <div className="bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#ff6b00] mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-[#ff6b00] mb-1">Fixed Destination</div>
            <div className="text-sm text-gray-300">
              <div className="font-semibold">{CAR_MEDIC_LOCATION.name}</div>
              <div>{CAR_MEDIC_LOCATION.address}</div>
              <div>{CAR_MEDIC_LOCATION.town}, {CAR_MEDIC_LOCATION.state}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vehicle Information */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="mb-4 text-[#ff6b00]">Vehicle Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="make" className="block mb-2 text-sm text-gray-300">
                Make <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g., Proton, Perodua, Toyota"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="model" className="block mb-2 text-sm text-gray-300">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., X70, Myvi, Vios"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="plateNumber" className="block mb-2 text-sm text-gray-300">
                Plate Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="plateNumber"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="e.g., ABC 1234"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="year" className="block mb-2 text-sm text-gray-300">
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2022"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="mb-4 text-[#ff6b00]">Pickup Location</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="pickupAddress" className="block mb-2 text-sm text-gray-300">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="pickupAddress"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="e.g., No. 45, Jalan Bukit Bintang"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickupTown" className="block mb-2 text-sm text-gray-300">
                  Town/City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pickupTown"
                  name="pickupTown"
                  value={formData.pickupTown}
                  onChange={handleChange}
                  placeholder="e.g., Kuala Lumpur"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="pickupState" className="block mb-2 text-sm text-gray-300">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="pickupState"
                  name="pickupState"
                  value={formData.pickupState}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
                >
                  <option value="">Select state...</option>
                  <option value="Johor">Johor</option>
                  <option value="Kedah">Kedah</option>
                  <option value="Kelantan">Kelantan</option>
                  <option value="Melaka">Melaka</option>
                  <option value="Negeri Sembilan">Negeri Sembilan</option>
                  <option value="Pahang">Pahang</option>
                  <option value="Penang">Penang</option>
                  <option value="Perak">Perak</option>
                  <option value="Perlis">Perlis</option>
                  <option value="Sabah">Sabah</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Selangor">Selangor</option>
                  <option value="Terengganu">Terengganu</option>
                  <option value="Wilayah Persekutuan">Wilayah Persekutuan</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="mb-4 text-[#ff6b00]">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block mb-2 text-sm text-gray-300">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="customerPhone" className="block mb-2 text-sm text-gray-300">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="e.g., 012-3456789"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="mb-4 text-[#ff6b00]">Job Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="issueDescription" className="block mb-2 text-sm text-gray-300">
                Issue Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="issueDescription"
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleChange}
                placeholder="Describe the vehicle issue or reason for towing..."
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-sm text-gray-300">
                Tow Price (RM) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">RM</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full flex items-center justify-center gap-2 bg-[#ff6b00] hover:bg-[#ff8533] text-white px-6 py-4 rounded-lg transition-colors shadow-lg shadow-[#ff6b00]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ff6b00]"
        >
          <Send className="w-5 h-5" />
          Post Tow Job
        </button>
      </form>
    </div>
  );
}
