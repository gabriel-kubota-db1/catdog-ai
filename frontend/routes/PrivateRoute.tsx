import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Can } from '@/config/ability';
import { Actions, Subjects } from '@/config/ability';

interface PrivateRouteProps {
  children: ReactNode;
  action: Actions;
  subject: Subjects;
}

const PrivateRoute = ({ children, action, subject }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Can I={action} a={subject}>
      {children}
    </Can>
  );
};

export default PrivateRoute;
