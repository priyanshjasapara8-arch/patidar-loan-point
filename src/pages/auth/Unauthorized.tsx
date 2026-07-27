import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { Lock } from 'lucide-react'

export const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="card-premium max-w-md text-center">
        <Lock className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this resource.
        </p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            className="btn-premium-primary flex-1"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}
