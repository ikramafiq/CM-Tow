import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './components/login';
import { Layout } from './components/layout';
import { useAuth } from './context/AuthContext';

// Super Admin
import { SuperAdminDashboard } from './components/super-admin/dashboard';
import { SuperAdminAllJobs } from './components/super-admin/all-jobs';
import { SuperAdminJobDetail } from './components/super-admin/job-detail';
import { SuperAdminAccounts } from './components/super-admin/accounts';

// Admin
import { AdminDashboard } from './components/admin/dashboard';
import { AdminPostJob } from './components/admin/post-job';
import { AdminJobDetail } from './components/admin/job-detail';

// Driver
import { DriverDashboard } from './components/driver/dashboard';
import { DriverMyJobs } from './components/driver/my-jobs';
import { DriverJobDetail } from './components/driver/job-detail';
import { CustomerTracking } from './components/customer-tracking';

// Role guard wrappers — simple components that redirect if role doesn't match
function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  if (role !== 'super-admin') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  if (role !== 'admin' && role !== 'super-admin') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RequireDriver({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  if (role !== 'driver') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RootRedirect() {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  if (role === 'super-admin') return <Navigate to="/super-admin" replace />;
  if (role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/driver" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/track/:token',
    Component: CustomerTracking,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: RootRedirect,
      },
      // Super Admin routes
      {
        path: 'super-admin',
        Component: () => <RequireSuperAdmin><SuperAdminDashboard /></RequireSuperAdmin>,
      },
      {
        path: 'super-admin/jobs',
        Component: () => <RequireSuperAdmin><SuperAdminAllJobs /></RequireSuperAdmin>,
      },
      {
        path: 'super-admin/jobs/:jobId',
        Component: () => <RequireSuperAdmin><SuperAdminJobDetail /></RequireSuperAdmin>,
      },
      {
        path: 'super-admin/accounts',
        Component: () => <RequireSuperAdmin><SuperAdminAccounts /></RequireSuperAdmin>,
      },
      // Admin routes
      {
        path: 'admin',
        Component: () => <RequireAdmin><AdminDashboard /></RequireAdmin>,
      },
      {
        path: 'admin/jobs/new',
        Component: () => <RequireAdmin><AdminPostJob /></RequireAdmin>,
      },
      {
        path: 'admin/jobs/:jobId',
        Component: () => <RequireAdmin><AdminJobDetail /></RequireAdmin>,
      },
      // Driver routes
      {
        path: 'driver',
        Component: () => <RequireDriver><DriverDashboard /></RequireDriver>,
      },
      {
        path: 'driver/my-jobs',
        Component: () => <RequireDriver><DriverMyJobs /></RequireDriver>,
      },
      {
        path: 'driver/jobs/:jobId',
        Component: () => <RequireDriver><DriverJobDetail /></RequireDriver>,
      },
    ],
  },
]);
