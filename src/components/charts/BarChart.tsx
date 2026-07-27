import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '@hooks/useTheme'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BarChartProps {
  title: string
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor: string
  }>
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  labels,
  datasets,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: title,
        color: isDark ? '#fff' : '#000',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        },
      },
    },
  }

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      borderRadius: 8,
      borderSkipped: false,
    })),
  }

  return (
    <div className="card-premium h-full">
      <Bar options={options} data={data} />
    </div>
  )
}
