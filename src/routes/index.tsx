import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from '@components/layout/Layout'
import { ErrorBoundary } from '@components/common/ErrorBoundary'

// Auth Pages
const Login = React.lazy(() => import('@pages/auth/Login').then(m => ({ default: m.Login })))
const Register = React.lazy(() => import('@pages/auth/Register').then(m => ({ default: m.Register })))
const Unauthorized = React.lazy(() => import('@pages/auth/Unauthorized').then(m => ({ default: m.Unauthorized })))

// Customer Pages
const CustomerDashboard = React.lazy(() => import('@pages/customer/Dashboard').then(m => ({ default: m.Dashboard })))
const CustomerLoans = React.lazy(() => import('@pages/customer/Loans').then(m => ({ default: m.Loans })))
const CustomerLoanDetail = React.lazy(() => import('@pages/customer/LoanDetail').then(m => ({ default: m.LoanDetail })))
const CustomerPayments = React.lazy(() => import('@pages/customer/Payments').then(m => ({ default: m.Payments })))
const ApplyLoan = React.lazy(() => import('@pages/customer/ApplyLoan').then(m => ({ default: m.ApplyLoan })))

// Employee Pages
const EmployeeDashboard = React.lazy(() => import('@pages/employee/Dashboard').then(m => ({ default: m.Dashboard })))
const EmployeeApplications = React.lazy(() => import('@pages/employee/Applications').then(m => ({ default: m.Applications })))
const EmployeeCustomers = React.lazy(() => import('@pages/employee/Customers').then(m => ({ default: m.Customers })))

// Admin Pages
const AdminDashboard = React.lazy(() => import('@pages/admin/Dashboard').then(m => ({ default: m.Dashboard })))
const AdminLoans = React.lazy(() => import('@pages/admin/Loans').then(m => ({ default: m.Loans })))
const AdminUsers = React.lazy(() => import('@pages/admin/Users').then(m => ({ default: m.Users })))
const AdminAnalytics = React.lazy(() => import('@pages/admin/Analytics').then(m => ({ default: m.Analytics })))
const AdminSettings = React.lazy(() => import('@pages/admin/Settings').then(m => ({ default: m.Settings })))

// Common Pages
const Profile = React.lazy(() => import('@pages/Profile').then(m => ({ default: m.Profile })))
const Documents = React.lazy(() => import('@pages/Documents').then(m => ({ default: m.Documents })))
const NotFound = React.lazy(() => import('@pages/NotFound').then(m => ({ default: m.NotFound })))
const Home = React.lazy(() => import('@pages/website/Home').then(m => ({ default: m.Home })))

export const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span>Loading...</span></div>}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute requiredRole="customer">
                  <Layout>
                    <CustomerDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/loans"
              element={
                <ProtectedRoute requiredRole="customer">
                  <Layout>
                    <CustomerLoans />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/loans/:id"
              element={
                <ProtectedRoute requiredRole="customer">
                  <Layout>
                    <CustomerLoanDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/payments"
              element={
                <ProtectedRoute requiredRole="customer">
                  <Layout>
                    <CustomerPayments />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/apply-loan"
              element={
                <ProtectedRoute requiredRole="customer">
                  <Layout>
                    <ApplyLoan />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute requiredRole="employee">
                  <Layout>
                    <EmployeeDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/applications"
              element={
                <ProtectedRoute requiredRole="employee">
                  <Layout>
                    <EmployeeApplications />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/customers"
              element={
                <ProtectedRoute requiredRole="employee">
                  <Layout>
                    <EmployeeCustomers />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole={['manager', 'admin']}>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/loans"
              element={
                <ProtectedRoute requiredRole={['manager', 'admin']}>
                  <Layout>
                    <AdminLoans />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole={['manager', 'admin']}>
                  <Layout>
                    <AdminUsers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole={['manager', 'admin']}>
                  <Layout>
                    <AdminAnalytics />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AdminSettings />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Common Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Documents />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </React.Suspense>
    </ErrorBoundary>
  )
}
