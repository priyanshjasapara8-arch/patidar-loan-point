import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { LoadingSpinner } from '@components/common/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string | string[]
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { currentUser, userData, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" replace />
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    if (!userData || !roles.includes(userData.role)) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}
