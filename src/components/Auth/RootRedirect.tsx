import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RootRedirect() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (token) {
      navigate('/dashboard', { replace: true });
    } else if (onboardingCompleted === 'true') {
      navigate('/signin', { replace: true });
    } else {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}