import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useTheme } from '@hooks/useTheme'
import { signOut } from '@firebase/auth'
import { Button } from '@components/ui/button'
import { Moon, Sun, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

interface NavbarProps {
  onMenuClick?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const { userData, currentUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Logged out successfully')
      navigate('/auth/login')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-premium-blue to-premium-gold flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg transition-shadow">
              PLP
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient-blue-gold">PATIDAR</h1>
              <p className="text-xs text-muted-foreground">Loan Point</p>
            </div>
          </motion.div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {userData && (
              <>
                {userData.role === 'customer' && (
                  <>
                    <Button variant="ghost" onClick={() => navigate('/customer/dashboard')}>Dashboard</Button>
                    <Button variant="ghost" onClick={() => navigate('/customer/loans')}>My Loans</Button>
                    <Button variant="ghost" onClick={() => navigate('/customer/payments')}>Payments</Button>
                  </>
                )}
                {userData.role === 'employee' && (
                  <>
                    <Button variant="ghost" onClick={() => navigate('/employee/dashboard')}>Dashboard</Button>
                    <Button variant="ghost" onClick={() => navigate('/employee/applications')}>Applications</Button>
                    <Button variant="ghost" onClick={() => navigate('/employee/customers')}>Customers</Button>
                  </>
                )}
                {(userData.role === 'manager' || userData.role === 'admin') && (
                  <>
                    <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
                    <Button variant="ghost" onClick={() => navigate('/admin/loans')}>All Loans</Button>
                    <Button variant="ghost" onClick={() => navigate('/admin/users')}>Users</Button>
                    {userData.role === 'admin' && (
                      <Button variant="ghost" onClick={() => navigate('/admin/settings')}>Settings</Button>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* User Menu - Desktop */}
            {currentUser && userData && (
              <div className="hidden sm:flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-premium-blue to-premium-gold flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(userData.name)}
                    </div>
                    <span className="text-sm font-medium hidden md:inline">{userData.name}</span>
                  </button>

                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2 z-50"
                    >
                      <button
                        onClick={() => navigate('/profile')}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Profile Settings
                      </button>
                      <button
                        onClick={() => navigate('/documents')}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Documents
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && currentUser && userData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-2"
          >
            {userData.role === 'customer' && (
              <>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/customer/dashboard')}>Dashboard</Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/customer/loans')}>My Loans</Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/customer/payments')}>Payments</Button>
              </>
            )}
            {userData.role === 'employee' && (
              <>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/employee/dashboard')}>Dashboard</Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/employee/applications')}>Applications</Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/employee/customers')}>Customers</Button>
              </>
            )}
            {(userData.role === 'manager' || userData.role === 'admin') && (
              <>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/loans')}>All Loans</Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/users')}>Users</Button>
              </>
            )}
            <hr className="my-2" />
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>Profile Settings</Button>
            <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>Logout</Button>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
