import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, MapPin, Send, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { COMPANY_DESTINATION, MY_STATES } from '../../data/mock-data';

export function AdminPostJob() {
  const { createJob } = useApp();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    make: '', model: '', plateNumber: '', year: '',
    pickupAddress: '', pickupTown: '', pickupState: '',
    customerName: '', customerPhone: '',
    issueDescription: '', price: '',
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const isValid =
    form.make && form.model && form.plateNumber &&
    form.pickupAddress && form.pickupTown && form.pickupState &&
    form.customerName && form.customerPhone &&
    form.issueDescription && form.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJob({
      vehicleInfo: { make: form.make, model: form.model, plateNumber: form.plateNumber, year: form.year || undefined },
      pickupLocation: { address: form.pickupAddress, town: form.pickupTown, state: form.pickupState },
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      issueDescription: form.issueDescription,
      price: parseFloat(form.price),
      createdBy: currentUser!.name,
    });
    navigate('/admin');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-white mb-1">Create New Tow Job</h1>
        <p className="text-gray-400 text-sm">Job will go to Super Admin for approval before drivers can see it</p>
      </div>

      {/* Destination */}
      <div className="bg-red-600/5 border border-red-600/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-red-400 mb-0.5">Fixed Destination</div>
            <div className="text-sm text-gray-300">{COMPANY_DESTINATION.name}</div>
            <div className="text-xs text-gray-500">
              {COMPANY_DESTINATION.address}, {COMPANY_DESTINATION.town}, {COMPANY_DESTINATION.state}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Vehicle */}
        <FormSection title="Vehicle Information">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Brand / Make *">
              <input value={form.make} onChange={set('make')} required placeholder="e.g. Proton, Toyota" className={INPUT} />
            </Field>
            <Field label="Model *">
              <input value={form.model} onChange={set('model')} required placeholder="e.g. X70, Vios" className={INPUT} />
            </Field>
            <Field label="Plate Number *">
              <input value={form.plateNumber} onChange={set('plateNumber')} required placeholder="e.g. WXY 1234" className={INPUT} />
            </Field>
            <Field label="Year">
              <input value={form.year} onChange={set('year')} placeholder="e.g. 2022" className={INPUT} />
            </Field>
          </div>
        </FormSection>

        {/* Pickup Location */}
        <FormSection title="Pickup Location">
          <Field label="Street Address *">
            <input value={form.pickupAddress} onChange={set('pickupAddress')} required placeholder="e.g. No. 45, Jalan Bukit Bintang" className={INPUT} />
          </Field>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Town / City *">
              <input value={form.pickupTown} onChange={set('pickupTown')} required placeholder="e.g. Kuala Lumpur" className={INPUT} />
            </Field>
            <Field label="State *">
              <div className="relative">
                <select value={form.pickupState} onChange={set('pickupState')} required className={INPUT + ' appearance-none pr-8'}>
                  <option value="">Select state...</option>
                  {MY_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </Field>
          </div>
        </FormSection>

        {/* Customer */}
        <FormSection title="Customer Information">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name *">
              <input value={form.customerName} onChange={set('customerName')} required placeholder="Customer name" className={INPUT} />
            </Field>
            <Field label="Phone Number *">
              <input type="tel" value={form.customerPhone} onChange={set('customerPhone')} required placeholder="012-3456789" className={INPUT} />
            </Field>
          </div>
        </FormSection>

        {/* Job Details */}
        <FormSection title="Job Details">
          <Field label="Issue Description *">
            <textarea
              value={form.issueDescription}
              onChange={set('issueDescription')}
              required
              rows={3}
              placeholder="Describe the vehicle issue or reason for towing..."
              className={INPUT + ' resize-none'}
            />
          </Field>
          <div className="mt-4">
            <Field label="Tow Price (RM) *">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">RM</span>
                <input
                  type="number"
                  value={form.price}
                  onChange={set('price')}
                  required
                  min="1"
                  step="1"
                  placeholder="0"
                  className={INPUT + ' pl-10'}
                />
              </div>
            </Field>
          </div>
        </FormSection>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-red-600/20"
        >
          <Send className="w-4 h-4" />
          Submit for Approval
        </button>
      </form>
    </div>
  );
}

const INPUT = 'w-full px-3 py-2.5 bg-black/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors';

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
      <h3 className="text-sm font-medium text-red-400 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
