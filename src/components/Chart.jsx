import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function Chart() {
  const options = {
    chart: {
      id: 'area-datetime',
      background: 'transparent',
      toolbar: { show: false },
    },
    xaxis: { type: 'datetime' },
    stroke: { curve: 'smooth' },
    grid: { borderColor: '#1f2937' },
    colors: ['#60a5fa', '#f87171'],
  }

  const series = [
    {
      name: 'Price',
      data: [
        [1640995200000, 120],
        [1641081600000, 125],
        [1641168000000, 122],
        [1641254400000, 130],
        [1641340800000, 128],
      ],
    },
  ]

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-sm">
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  )
}
