import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  type Job,
  type User,
  type JobStatus,
  mockJobs,
  mockUsers,
  COMPANY_DESTINATION,
} from '../data/mock-data';

interface NewJobPayload {
  vehicleInfo: { make: string; model: string; plateNumber: string; year?: string };
  pickupLocation: { address: string; town: string; state: string };
  customerName: string;
  customerPhone: string;
  issueDescription: string;
  price: number;
  createdBy: string;
}

interface AppContextValue {
  jobs: Job[];
  users: User[];
  // Job operations
  createJob: (payload: NewJobPayload) => void;
  updateJobStatus: (jobId: string, status: JobStatus, note: string, updatedBy: string) => void;
  approveJob: (jobId: string, approvedBy: string) => void;
  rejectJob: (jobId: string, rejectedBy: string) => void;
  driverAcceptJob: (jobId: string, driver: { id: string; name: string; phone: string }) => void;
  confirmJob: (jobId: string, confirmedBy: string) => void;
  addPickupPhotos: (jobId: string, photos: string[]) => void;
  addDeliveryPhotos: (jobId: string, photos: string[]) => void;
  deleteJob: (jobId: string) => void;
  updateJobPrice: (jobId: string, price: number) => void;
  // User/account operations
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  toggleUserActive: (userId: string) => void;
  deleteUser: (userId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function generateId(prefix: string, list: { id: string }[]): string {
  const nums = list
    .map((x) => parseInt(x.id.replace(prefix, ''), 10))
    .filter((n) => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `${prefix}${String(next).padStart(3, '0')}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const setJob = (jobId: string, updater: (j: Job) => Job) =>
    setJobs((prev) => prev.map((j) => (j.id === jobId ? updater(j) : j)));

  const now = () => new Date();

  const createJob = (payload: NewJobPayload) => {
    const newJob: Job = {
      id: generateId('JOB', jobs),
      vehicleInfo: payload.vehicleInfo,
      pickupLocation: payload.pickupLocation,
      destination: COMPANY_DESTINATION,
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      issueDescription: payload.issueDescription,
      price: payload.price,
      status: 'Pending Approval',
      postedAt: now(),
      createdBy: payload.createdBy,
      pickupPhotos: [],
      deliveryPhotos: [],
      statusHistory: [
        { status: 'Pending Approval', timestamp: now(), updatedBy: payload.createdBy },
      ],
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJobStatus = (jobId: string, status: JobStatus, note: string, updatedBy: string) =>
    setJob(jobId, (j) => ({
      ...j,
      status,
      statusHistory: [...j.statusHistory, { status, timestamp: now(), note: note || undefined, updatedBy }],
    }));

  const approveJob = (jobId: string, approvedBy: string) =>
    setJob(jobId, (j) => ({
      ...j,
      status: 'Open',
      approvedAt: now(),
      approvedBy,
      statusHistory: [
        ...j.statusHistory,
        { status: 'Open', timestamp: now(), note: 'Approved by Super Admin', updatedBy: approvedBy },
      ],
    }));

  const rejectJob = (jobId: string, rejectedBy: string) =>
    setJob(jobId, (j) => ({
      ...j,
      status: 'Cancelled',
      statusHistory: [
        ...j.statusHistory,
        { status: 'Cancelled', timestamp: now(), note: 'Rejected by Super Admin', updatedBy: rejectedBy },
      ],
    }));

  const driverAcceptJob = (jobId: string, driver: { id: string; name: string; phone: string }) => {
    // Generate a unique tracking token for customer
    const trackingToken = `track_${jobId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    setJob(jobId, (j) => ({
      ...j,
      status: 'Pending Confirmation',
      assignedDriver: driver,
      customerTrackingToken: trackingToken,
      statusHistory: [
        ...j.statusHistory,
        {
          status: 'Pending Confirmation',
          timestamp: now(),
          note: `Driver ${driver.name} accepted the job`,
          updatedBy: driver.name,
        },
      ],
    }));
  };

  const confirmJob = (jobId: string, confirmedBy: string) =>
    setJob(jobId, (j) => ({
      ...j,
      status: 'Confirmed',
      confirmedAt: now(),
      confirmedBy,
      statusHistory: [
        ...j.statusHistory,
        { status: 'Confirmed', timestamp: now(), note: 'Admin confirmed after calling customer', updatedBy: confirmedBy },
      ],
    }));

  const addPickupPhotos = (jobId: string, photos: string[]) =>
    setJob(jobId, (j) => ({ ...j, pickupPhotos: [...j.pickupPhotos, ...photos] }));

  const addDeliveryPhotos = (jobId: string, photos: string[]) =>
    setJob(jobId, (j) => ({ ...j, deliveryPhotos: [...j.deliveryPhotos, ...photos] }));

  const deleteJob = (jobId: string) =>
    setJobs((prev) => prev.filter((j) => j.id !== jobId));

  const updateJobPrice = (jobId: string, price: number) =>
    setJob(jobId, (j) => ({ ...j, price }));

  const createUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: generateId('USR', users),
      createdAt: now(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (userId: string, updates: Partial<User>) =>
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...updates } : u)));

  const toggleUserActive = (userId: string) =>
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)));

  const deleteUser = (userId: string) =>
    setUsers((prev) => prev.filter((u) => u.id !== userId));

  return (
    <AppContext.Provider
      value={{
        jobs,
        users,
        createJob,
        updateJobStatus,
        approveJob,
        rejectJob,
        driverAcceptJob,
        confirmJob,
        addPickupPhotos,
        addDeliveryPhotos,
        deleteJob,
        updateJobPrice,
        createUser,
        updateUser,
        toggleUserActive,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
