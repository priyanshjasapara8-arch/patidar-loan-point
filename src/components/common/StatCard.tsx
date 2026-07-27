import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@utils/cn'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'blue' | 'gold' | 'green' | 'red'
  onClick?: () => void
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 text-blue-600 dark:text-blue-400',
  gold: 'from-yellow-500 to-yellow-600 text-yellow-600 dark:text-yellow-400',
  green: 'from-green-500 to-green-600 text-green-600 dark:text-green-400',
  red: 'from-red-500 to-red-600 text-red-600 dark:text-red-400',
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  color = 'blue',
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={onClick}
      className={cn(
        'card-premium cursor-pointer',
        onClick && 'hover:shadow-premium transition-shadow'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs mt-2',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}% from last month
            </p>
          )}
        </div>
        <div
          className={cn(
            'p-3 rounded-lg bg-gradient-to-br',
            colorClasses[color]
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  )
}
