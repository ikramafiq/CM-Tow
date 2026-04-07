// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = 'super-admin' | 'admin' | 'driver';

export type JobStatus =
  | 'Pending Approval'     // Admin created; Super Admin must approve
  | 'Open'                 // Super Admin approved; visible to drivers
  | 'Pending Confirmation' // Driver accepted; Admin confirms off-app
  | 'Confirmed'            // Admin confirmed; customer info revealed to driver
  | 'En Route to Pickup'   // Driver heading to vehicle
  | 'At Pickup'            // Driver at location; must upload photos
  | 'In Transit'           // Vehicle loaded; heading to destination
  | 'Arrived'              // At destination; must upload arrival photos
  | 'Completed'            // Job done
  | 'Cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  isActive: boolean;
  createdAt: Date;
  // Drivers only
  vehicleType?: string;
  operatingState?: string;
}

export interface StatusHistoryEntry {
  status: JobStatus;
  timestamp: Date;
  note?: string;
  updatedBy?: string; // user name
}

export interface Job {
  id: string;
  vehicleInfo: {
    make: string;
    model: string;
    plateNumber: string;
    year?: string;
  };
  pickupLocation: {
    address: string;
    town: string;
    state: string;
  };
  destination: {
    name: string;
    address: string;
    town: string;
    state: string;
  };
  customerName: string;
  customerPhone: string;
  issueDescription: string;
  price: number; // RM
  status: JobStatus;
  postedAt: Date;
  createdBy: string;   // admin user name
  approvedAt?: Date;
  approvedBy?: string; // super-admin user name
  assignedDriver?: {
    id: string;
    name: string;
    phone: string;
  };
  confirmedAt?: Date;
  confirmedBy?: string;
  pickupPhotos: string[];    // base64 data URLs
  deliveryPhotos: string[];  // base64 data URLs
  statusHistory: StatusHistoryEntry[];
  customerTrackingToken?: string; // For customer tracking link
}

// ─── Fixed Destination ────────────────────────────────────────────────────────

export const COMPANY_DESTINATION = {
  name: 'MedicTow CM Sdn Bhd',
  address: 'Lot 123, Jalan Teknologi 3/1',
  town: 'Bandar Teknologi Kajang',
  state: 'Selangor',
};

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'Hafiz Azman',
    email: 'boss@carmedic.com.my',
    password: 'admin123',
    role: 'super-admin',
    phone: '012-8881234',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'USR002',
    name: 'Zainab Hussain',
    email: 'staff1@carmedic.com.my',
    password: 'admin123',
    role: 'admin',
    phone: '011-2223344',
    isActive: true,
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'USR003',
    name: 'Amirul Faiz',
    email: 'staff2@carmedic.com.my',
    password: 'admin123',
    role: 'admin',
    phone: '019-4455667',
    isActive: true,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'DRV001',
    name: 'Mohd Razak',
    email: 'razak@gmail.com',
    password: 'driver123',
    role: 'driver',
    phone: '013-2223333',
    isActive: true,
    createdAt: new Date('2024-04-01'),
    vehicleType: 'Flatbed Tow Truck',
    operatingState: 'Selangor',
  },
  {
    id: 'DRV002',
    name: 'Kumar Selvam',
    email: 'kumar@gmail.com',
    password: 'driver123',
    role: 'driver',
    phone: '017-6667777',
    isActive: true,
    createdAt: new Date('2024-04-05'),
    vehicleType: 'Wheel-Lift Tow Truck',
    operatingState: 'Kuala Lumpur',
  },
  {
    id: 'DRV003',
    name: 'Tan Ah Kow',
    email: 'tan@gmail.com',
    password: 'driver123',
    role: 'driver',
    phone: '012-9990000',
    isActive: false,
    createdAt: new Date('2024-04-20'),
    vehicleType: 'Flatbed Tow Truck',
    operatingState: 'Selangor',
  },
  {
    id: 'DRV004',
    name: 'Kamal',
    email: 'kamal@carmedic.com.my',
    password: 'driver123',
    role: 'driver',
    phone: '016-1234567',
    isActive: true,
    createdAt: new Date('2026-04-07'),
    vehicleType: 'Wheel-Lift Tow Truck',
    operatingState: 'Selangor',
  },
];

// ─── Mock Jobs ────────────────────────────────────────────────────────────────

export const mockJobs: Job[] = [
  {
    id: 'JOB001',
    vehicleInfo: { make: 'Proton', model: 'X70', plateNumber: 'WXY 1234', year: '2022' },
    pickupLocation: { address: 'No. 45, Jalan Bukit Bintang', town: 'Kuala Lumpur', state: 'Wilayah Persekutuan' },
    destination: COMPANY_DESTINATION,
    customerName: 'Ahmad Ibrahim',
    customerPhone: '012-3456789',
    issueDescription: 'Engine overheating, unable to start',
    price: 180,
    status: 'Open',
    postedAt: new Date('2024-12-06T10:30:00'),
    createdBy: 'Zainab Hussain',
    approvedAt: new Date('2024-12-06T10:45:00'),
    approvedBy: 'Hafiz Azman',
    pickupPhotos: [],
    deliveryPhotos: [],
    statusHistory: [
      { status: 'Pending Approval', timestamp: new Date('2024-12-06T10:30:00'), updatedBy: 'Zainab Hussain' },
      { status: 'Open', timestamp: new Date('2024-12-06T10:45:00'), note: 'Approved by Super Admin', updatedBy: 'Hafiz Azman' },
    ],
  },
  {
    id: 'JOB002',
    vehicleInfo: { make: 'Perodua', model: 'Myvi', plateNumber: 'ABC 5678', year: '2021' },
    pickupLocation: { address: 'Jalan Sultan Ismail 88', town: 'Petaling Jaya', state: 'Selangor' },
    destination: COMPANY_DESTINATION,
    customerName: 'Siti Aminah',
    customerPhone: '019-8765432',
    issueDescription: 'Transmission failure, stuck on roadside',
    price: 120,
    status: 'Confirmed',
    postedAt: new Date('2024-12-06T09:15:00'),
    createdBy: 'Zainab Hussain',
    approvedAt: new Date('2024-12-06T09:30:00'),
    approvedBy: 'Hafiz Azman',
    assignedDriver: { id: 'DRV001', name: 'Mohd Razak', phone: '013-2223333' },
    confirmedAt: new Date('2024-12-06T09:50:00'),
    confirmedBy: 'Zainab Hussain',
    pickupPhotos: [],
    deliveryPhotos: [],
    statusHistory: [
      { status: 'Pending Approval', timestamp: new Date('2024-12-06T09:15:00'), updatedBy: 'Zainab Hussain' },
      { status: 'Open', timestamp: new Date('2024-12-06T09:30:00'), note: 'Approved by Super Admin', updatedBy: 'Hafiz Azman' },
      { status: 'Pending Confirmation', timestamp: new Date('2024-12-06T09:45:00'), note: 'Driver Mohd Razak accepted the job', updatedBy: 'Mohd Razak' },
      { status: 'Confirmed', timestamp: new Date('2024-12-06T09:50:00'), note: 'Admin confirmed after calling customer', updatedBy: 'Zainab Hussain' },
    ],
  },
  {
    id: 'JOB003',
    vehicleInfo: { make: 'Honda', model: 'City', plateNumber: 'DEF 9012', year: '2020' },
    pickupLocation: { address: '12A, Jalan Tun Razak', town: 'Shah Alam', state: 'Selangor' },
    destination: COMPANY_DESTINATION,
    customerName: 'Lim Wei Jian',
    customerPhone: '016-5554444',
    issueDescription: 'Brake system failure',
    price: 95,
    status: 'In Transit',
    postedAt: new Date('2024-12-06T08:00:00'),
    createdBy: 'Amirul Faiz',
    approvedAt: new Date('2024-12-06T08:10:00'),
    approvedBy: 'Hafiz Azman',
    assignedDriver: { id: 'DRV002', name: 'Kumar Selvam', phone: '017-6667777' },
    confirmedAt: new Date('2024-12-06T08:25:00'),
    confirmedBy: 'Amirul Faiz',
    pickupPhotos: [],
    deliveryPhotos: [],
    statusHistory: [
      { status: 'Pending Approval', timestamp: new Date('2024-12-06T08:00:00'), updatedBy: 'Amirul Faiz' },
      { status: 'Open', timestamp: new Date('2024-12-06T08:10:00'), updatedBy: 'Hafiz Azman' },
      { status: 'Pending Confirmation', timestamp: new Date('2024-12-06T08:20:00'), updatedBy: 'Kumar Selvam' },
      { status: 'Confirmed', timestamp: new Date('2024-12-06T08:25:00'), note: 'Admin confirmed after calling customer', updatedBy: 'Amirul Faiz' },
      { status: 'En Route to Pickup', timestamp: new Date('2024-12-06T08:30:00'), updatedBy: 'Kumar Selvam' },
      { status: 'At Pickup', timestamp: new Date('2024-12-06T09:00:00'), updatedBy: 'Kumar Selvam' },
      { status: 'In Transit', timestamp: new Date('2024-12-06T09:15:00'), note: 'Vehicle loaded, heading to factory', updatedBy: 'Kumar Selvam' },
    ],
  },
  {
    id: 'JOB004',
    vehicleInfo: { make: 'Toyota', model: 'Vios', plateNumber: 'GHI 3456', year: '2019' },
    pickupLocation: { address: 'Plaza Toll Sungai Besi', town: 'Kuala Lumpur', state: 'Wilayah Persekutuan' },
    destination: COMPANY_DESTINATION,
    customerName: 'Nurul Huda',
    customerPhone: '014-7778888',
    issueDescription: 'Flat tire, spare not available',
    price: 85,
    status: 'Completed',
    postedAt: new Date('2024-12-05T14:30:00'),
    createdBy: 'Zainab Hussain',
    approvedAt: new Date('2024-12-05T14:40:00'),
    approvedBy: 'Hafiz Azman',
    assignedDriver: { id: 'DRV001', name: 'Mohd Razak', phone: '013-2223333' },
    confirmedAt: new Date('2024-12-05T14:50:00'),
    confirmedBy: 'Zainab Hussain',
    pickupPhotos: [],
    deliveryPhotos: [],
    statusHistory: [
      { status: 'Pending Approval', timestamp: new Date('2024-12-05T14:30:00'), updatedBy: 'Zainab Hussain' },
      { status: 'Open', timestamp: new Date('2024-12-05T14:40:00'), updatedBy: 'Hafiz Azman' },
      { status: 'Pending Confirmation', timestamp: new Date('2024-12-05T14:45:00'), updatedBy: 'Mohd Razak' },
      { status: 'Confirmed', timestamp: new Date('2024-12-05T14:50:00'), updatedBy: 'Zainab Hussain' },
      { status: 'En Route to Pickup', timestamp: new Date('2024-12-05T15:00:00'), updatedBy: 'Mohd Razak' },
      { status: 'At Pickup', timestamp: new Date('2024-12-05T15:30:00'), updatedBy: 'Mohd Razak' },
      { status: 'In Transit', timestamp: new Date('2024-12-05T15:45:00'), updatedBy: 'Mohd Razak' },
      { status: 'Arrived', timestamp: new Date('2024-12-05T16:30:00'), updatedBy: 'Mohd Razak' },
      { status: 'Completed', timestamp: new Date('2024-12-05T16:45:00'), note: 'Vehicle delivered to factory', updatedBy: 'Mohd Razak' },
    ],
  },
  {
    id: 'JOB005',
    vehicleInfo: { make: 'Nissan', model: 'Almera', plateNumber: 'JKL 7890', year: '2023' },
    pickupLocation: { address: 'AEON Mall Cheras Selatan', town: 'Cheras', state: 'Selangor' },
    destination: COMPANY_DESTINATION,
    customerName: 'Ravi Kumar',
    customerPhone: '018-1112222',
    issueDescription: "Battery dead, won't start",
    price: 75,
    status: 'Pending Approval',
    postedAt: new Date('2024-12-06T11:45:00'),
    createdBy: 'Amirul Faiz',
    pickupPhotos: [],
    deliveryPhotos: [],
    statusHistory: [
      { status: 'Pending Approval', timestamp: new Date('2024-12-06T11:45:00'), updatedBy: 'Amirul Faiz' },
    ],
  },
  {
    id: 'JOB006',
    vehicleInfo: { make: 'Proton', model: 'Saga', plateNumber: 'MNO 2468', year: '2018' },
    pickupLocation: { address: 'Jalan Ampang 234', town: 'Ampang', state: 'Selangor' },
    destination: COMPANY_DESTINATION,
    customerName: 'Fatimah Zahra',
    customerPhone: '011-3334444',
    issueDescription: 'Accident damage, front collision',
    price: 150,
    status: 'Pending Confirmation',
    postedAt: new Date('2024-12-06T11:00:00'),
    createdBy: 'Zainab Hussain',
    approvedAt: new Date('2024-12-06T11:10:00'),
    approvedBy: 'Hafiz Azman',
    assignedDriver: { id: 'DRV002', name: 'Kumar Selvam', phone: '017-6667777' },
    pickupPhotos: [],
    deliveryPhotos: [],
    statusHistory: [
      { status: 'Pending Approval', timestamp: new Date('2024-12-06T11:00:00'), updatedBy: 'Zainab Hussain' },
      { status: 'Open', timestamp: new Date('2024-12-06T11:10:00'), updatedBy: 'Hafiz Azman' },
      { status: 'Pending Confirmation', timestamp: new Date('2024-12-06T11:20:00'), note: 'Driver Kumar Selvam accepted the job', updatedBy: 'Kumar Selvam' },
    ],
  },
];

// ─── Malaysian States ─────────────────────────────────────────────────────────

export const MY_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Penang', 'Perak', 'Perlis', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu', 'Wilayah Persekutuan',
];
