import { CChart } from '@coreui/react-chartjs'
import React from 'react'
import { COLORS } from 'src/common/const'

function BarChartOrganizers() {
  return (
    <CChart
  type="bar"
  data={{
    labels: ['Seat', 'Local Authority', 'Ward', 'GN Division', 'Street Village'],
    datasets: [

      {
        label: 'Organizers',
        backgroundColor: COLORS.DANGER_BTN,
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
      },
    ],
  }}
  labels="months"
  options={{
    plugins: {
      legend: {
        labels: {
          color: 'gray',
        }
      }
    },
    scales: {
      x: {
        grid: {
          color:'#fff6',
        },
        ticks: {
          color: 'gray',
        },
      },
      y: {
        grid: {
          color: COLORS.LIGHT,
        },
        ticks: {
          color: 'gray',
        },
      },
    },
  }}
/>
  )
}

export default BarChartOrganizers