import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { useAuth } from '@hooks/useAuth'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!currentUser) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
