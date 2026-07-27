import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTheme } from '@hooks/useTheme'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  title: string
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }>
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  labels,
  datasets,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const options: ChartOptions<'line'> = {
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
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: dataset.borderColor,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    })),
  }

  return (
    <div className="card-premium h-full">
      <Line options={options} data={data} />
    </div>
  )
}
