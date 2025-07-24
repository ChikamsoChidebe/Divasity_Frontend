import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    const currentPath = location.pathname;
    
    // Public routes that don't require authentication
    const publicRoutes = ['/', '/signin', '/register', '/verify', '/nextstep', '/updates', '/profile', '/notifications'];
    const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));
    
    // If user is logged in and on a public auth route, redirect to dashboard
    if (token && user && (currentPath === '/signin' || currentPath === '/register' || currentPath === '/')) {
      navigate('/dashboard', { replace: true });
      return;
    }
    
    // If user is not logged in and trying to access private route, redirect to signin
    if (!token && !isPublicRoute) {
      navigate('/signin', { replace: true });
      return;
    }
  }, [navigate, location]);
  
  return <>{children}</>;
}