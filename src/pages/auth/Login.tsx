import React from 'react'
import { LoginForm } from '@components/forms/LoginForm'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@hooks/useAuth'
import { useEffect } from 'react'

export const Login = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      navigate('/customer/dashboard')
    }
  }, [currentUser, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-premium-blue via-white to-premium-gold dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="card-premium">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-premium-blue to-premium-gold flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              PLP
            </div>
            <h1 className="text-3xl font-bold text-gradient-blue-gold">Sign In</h1>
            <p className="text-muted-foreground mt-2">Welcome back to PATIDAR LOAN POINT</p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-950 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-premium-blue font-semibold hover:underline">
              Create one now
            </Link>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:no-underline">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="#" className="underline hover:no-underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  )
}
