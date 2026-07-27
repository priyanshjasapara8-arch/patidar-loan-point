import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { AlertCircle } from 'lucide-react'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="card-premium max-w-md text-center">
        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl font-semibold mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Button
          className="btn-premium-primary w-full"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}
