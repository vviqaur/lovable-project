
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingScreen from '@/components/LoadingScreen';
import AuthWrapper from '@/components/AuthWrapper';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import TechnicianDashboard from '@/components/dashboard/TechnicianDashboard';
import WorkshopDashboard from '@/components/dashboard/WorkshopDashboard';

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen on first visit
  if (showLoading) {
    return <LoadingScreen />;
  }

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated || !user) {
    return <AuthWrapper />;
  }

  // Show appropriate dashboard based on user role
  switch (user.role) {
    case 'customer':
      return <CustomerDashboard />;
    case 'technician':
      return <TechnicianDashboard />;
    case 'workshop':
      return <WorkshopDashboard />;
    default:
      return <AuthWrapper />;
  }
};

export default Index;
