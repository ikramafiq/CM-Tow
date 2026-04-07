import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <div className="dark min-h-screen bg-background">
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </AuthProvider>
    </div>
  );
}
