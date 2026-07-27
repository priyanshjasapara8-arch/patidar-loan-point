import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { ArrowRight, TrendingUp, Shield, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export const Home = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Competitive Rates',
      description: 'Get the best interest rates in the market',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your financial data is encrypted and secure',
    },
    {
      icon: Clock,
      title: 'Quick Approval',
      description: 'Get approved in minutes, not days',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-premium-blue to-premium-gold flex items-center justify-center text-white font-bold">
              PLP
            </div>
            <span className="font-bold text-xl text-gradient-blue-gold">PATIDAR LOAN POINT</span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <Link to="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth/register">
              <Button className="btn-premium-primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gradient-blue-gold"
          >
            Banking Solutions You Can Trust
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Experience seamless loan management with PATIDAR LOAN POINT. Fast approvals, transparent terms, and dedicated support.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/auth/register">
              <Button className="btn-premium-primary px-8 py-6 text-lg">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" className="px-8 py-6 text-lg">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="card-premium text-center"
                >
                  <Icon className="h-12 w-12 text-premium-blue mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-premium-blue to-premium-gold rounded-lg p-12 text-center text-white">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers managing their loans efficiently
          </p>
          <Link to="/auth/register">
            <Button className="bg-white text-premium-blue hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">PATIDAR LOAN POINT</h4>
              <p className="text-gray-400 text-sm">Your trusted banking partner for all loan solutions.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Personal Loans</a></li>
                <li><a href="#" className="hover:text-white">Business Loans</a></li>
                <li><a href="#" className="hover:text-white">Home Loans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 PATIDAR LOAN POINT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
