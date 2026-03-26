import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function Chart({ type = 'candlestick' }) {
  if (type === 'candlestick') {
    const options = {
      chart: {
        id: 'candles',
        background: 'transparent',
        toolbar: { show: false },
      },
      xaxis: { type: 'datetime' },
      grid: { borderColor: '#1f2937' },
      yaxis: { tooltip: { enabled: true } },
      plotOptions: { candlestick: { colors: { upward: '#60a5fa', downward: '#f87171' } } },
    }

    const series = [
      {
        data: [
          { x: new Date(2018, 11, 19).getTime(), y: [141.18, 141.45, 140.5, 141.22] },
          { x: new Date(2018, 11, 20).getTime(), y: [141.22, 141.51, 139.56, 140.85] },
          { x: new Date(2018, 11, 21).getTime(), y: [140.85, 141.0, 139.49, 140.07] },
          { x: new Date(2018, 11, 24).getTime(), y: [140.07, 140.27, 138.65, 139.84] },
          { x: new Date(2018, 11, 25).getTime(), y: [139.84, 140.76, 139.45, 140.45] },
        ],
      },
    ]

    return (
      <div className="bg-slate-800 p-4 rounded-lg shadow-sm">
        <ReactApexChart options={options} series={series} type="candlestick" height={380} />
      </div>
    )
  }

  // default area as fallback
  const options = {
    chart: { id: 'area', background: 'transparent', toolbar: { show: false } },
    xaxis: { type: 'datetime' },
    stroke: { curve: 'smooth' },
    grid: { borderColor: '#1f2937' },
  }
  const series = [{ name: 'Price', data: [[1640995200000, 120], [1641081600000, 125]] }]
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-sm">
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  )
}
