import React from 'react'
import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
} from 'lucide-react'

interface NavItem {
  icon: React.ReactNode
  label: string
  path: string
  role: string | string[]
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: 'Dashboard',
    path: '/customer/dashboard',
    role: 'customer',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: 'My Loans',
    path: '/customer/loans',
    role: 'customer',
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    label: 'Payments',
    path: '/customer/payments',
    role: 'customer',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: 'Applications',
    path: '/employee/applications',
    role: 'employee',
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: 'Customers',
    path: '/employee/customers',
    role: 'employee',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: 'Analytics',
    path: '/admin/analytics',
    role: ['manager', 'admin'],
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: 'Users',
    path: '/admin/users',
    role: ['manager', 'admin'],
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: 'Settings',
    path: '/admin/settings',
    role: 'admin',
  },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { userData } = useAuth()
  const [activePath, setActivePath] = React.useState(window.location.pathname)

  const filteredItems = navItems.filter((item) => {
    if (typeof item.role === 'string') {
      return userData?.role === item.role
    }
    return item.role.includes(userData?.role as string)
  })

  const handleNavigation = (path: string) => {
    navigate(path)
    setActivePath(path)
    onClose()
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto shadow-lg lg:static lg:translate-x-0 z-40 transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 space-y-2">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                activePath === item.path
                  ? 'bg-premium-blue text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  )
}
