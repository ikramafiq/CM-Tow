import { useState } from 'react';
import { UserPlus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Check, Shield, Truck, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { type User, type UserRole, MY_STATES } from '../../data/mock-data';

const ROLE_LABELS: Record<UserRole, string> = {
  'super-admin': 'Super Admin',
  admin: 'Admin',
  driver: 'Driver',
};

const ROLE_COLORS: Record<UserRole, string> = {
  'super-admin': 'text-red-400 bg-red-600/10 border-red-600/20',
  admin: 'text-blue-400 bg-blue-600/10 border-blue-600/20',
  driver: 'text-green-400 bg-green-600/10 border-green-600/20',
};

type FormData = {
  name: string; email: string; password: string;
  phone: string; role: UserRole;
  vehicleType: string; operatingState: string;
};

const DEFAULT_FORM: FormData = {
  name: '', email: '', password: '', phone: '',
  role: 'driver', vehicleType: '', operatingState: '',
};

export function SuperAdminAccounts() {
  const { users, createUser, updateUser, toggleUserActive, deleteUser } = useApp();
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');

  const filteredUsers = users.filter((u) => roleFilter === 'All' || u.role === roleFilter);

  const openCreate = () => { setForm(DEFAULT_FORM); setEditingId(null); setShowForm(true); };
  const openEdit = (u: User) => {
    setForm({
      name: u.name, email: u.email, password: u.password,
      phone: u.phone, role: u.role,
      vehicleType: u.vehicleType ?? '',
      operatingState: u.operatingState ?? '',
    });
    setEditingId(u.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId, {
        name: form.name, email: form.email, password: form.password,
        phone: form.phone, role: form.role,
        vehicleType: form.vehicleType || undefined,
        operatingState: form.operatingState || undefined,
      });
    } else {
      createUser({
        name: form.name, email: form.email, password: form.password,
        phone: form.phone, role: form.role, isActive: true,
        vehicleType: form.vehicleType || undefined,
        operatingState: form.operatingState || undefined,
      });
    }
    setShowForm(false);
  };

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white mb-1">Account Management</h1>
          <p className="text-gray-400 text-sm">{users.length} accounts</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-red-600/20"
        >
          <UserPlus className="w-4 h-4" />
          Add Account
        </button>
      </div>

      {/* Role filter */}
      <div className="flex gap-2 mb-5">
        {(['All', 'super-admin', 'admin', 'driver'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              roleFilter === r ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {r === 'All' ? 'All' : ROLE_LABELS[r]}
          </button>
        ))}
      </div>

      {/* Users list */}
      <div className="space-y-3">
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className={`bg-gray-900/50 border rounded-xl p-4 transition-colors ${
              u.isActive ? 'border-gray-800' : 'border-gray-800/50 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-sm font-semibold text-red-400 flex-shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{u.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${ROLE_COLORS[u.role]}`}>
                      {ROLE_LABELS[u.role]}
                    </span>
                    {!u.isActive && (
                      <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">Inactive</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{u.email}</div>
                  {u.role === 'driver' && u.operatingState && (
                    <div className="text-xs text-gray-600 mt-0.5">
                      {u.vehicleType} · {u.operatingState}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Don't allow modifying own account or other super-admins easily */}
                <button
                  onClick={() => openEdit(u)}
                  className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleUserActive(u.id)}
                  disabled={u.id === currentUser?.id}
                  className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30"
                  title={u.isActive ? 'Deactivate' : 'Activate'}
                >
                  {u.isActive
                    ? <ToggleRight className="w-4 h-4 text-green-400" />
                    : <ToggleLeft className="w-4 h-4" />
                  }
                </button>
                <button
                  onClick={() => {
                    if (u.id === currentUser?.id) return;
                    if (confirm(`Delete account for ${u.name}?`)) deleteUser(u.id);
                  }}
                  disabled={u.id === currentUser?.id}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition-colors disabled:opacity-30"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h3 className="text-white font-medium">{editingId ? 'Edit Account' : 'New Account'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Field label="Full Name *">
                <input value={form.name} onChange={set('name')} required placeholder="Ahmad Ibrahim" className={INPUT} />
              </Field>
              <Field label="Email *">
                <input type="email" value={form.email} onChange={set('email')} required placeholder="user@carmedic.my" className={INPUT} />
              </Field>
              <Field label="Password *">
                <input type="text" value={form.password} onChange={set('password')} required placeholder="••••••••" className={INPUT} />
              </Field>
              <Field label="Phone *">
                <input value={form.phone} onChange={set('phone')} required placeholder="012-3456789" className={INPUT} />
              </Field>
              <Field label="Role *">
                <div className="relative">
                  <select value={form.role} onChange={set('role')} className={INPUT + ' appearance-none pr-8'}>
                    <option value="driver">Driver</option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </Field>
              {form.role === 'driver' && (
                <>
                  <Field label="Vehicle Type">
                    <input value={form.vehicleType} onChange={set('vehicleType')} placeholder="e.g. Flatbed Tow Truck" className={INPUT} />
                  </Field>
                  <Field label="Operating State">
                    <div className="relative">
                      <select value={form.operatingState} onChange={set('operatingState')} className={INPUT + ' appearance-none pr-8'}>
                        <option value="">Select state...</option>
                        {MY_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </Field>
                </>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-colors">
                  <Check className="w-4 h-4" />
                  {editingId ? 'Save Changes' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const INPUT = 'w-full px-3 py-2.5 bg-black/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
