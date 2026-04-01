import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function Chart({ type = 'candlestick', title, subtitle }) {
  if (type === 'candlestick') {
    const options = {
      chart: {
        id: 'candles',
        background: 'transparent',
        toolbar: { show: false },
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      },
      theme: { mode: 'dark' },
      xaxis: {
        type: 'datetime',
        labels: { style: { colors: '#8b92a3', fontSize: '11px' } },
        axisBorder: { show: false },
        axisTicks: { color: '#252a36' },
      },
      yaxis: {
        tooltip: { enabled: true },
        labels: { style: { colors: '#8b92a3', fontSize: '11px' } },
      },
      grid: {
        borderColor: '#252a36',
        strokeDashArray: 4,
        padding: { left: 8, right: 8 },
      },
      plotOptions: {
        candlestick: {
          colors: { upward: '#4ade80', downward: '#f87171' },
        },
      },
    }

    const series = [
      {
        data: [
          { x: new Date(2024, 10, 1).getTime(), y: [155.2, 157.5, 154.8, 157.1] },
          { x: new Date(2024, 10, 4).getTime(), y: [157.0, 158.9, 156.4, 158.2] },
          { x: new Date(2024, 10, 5).getTime(), y: [158.3, 161.2, 158.1, 160.5] },
          { x: new Date(2024, 10, 6).getTime(), y: [160.4, 162.1, 159.8, 161.8] },
          { x: new Date(2024, 10, 7).getTime(), y: [161.9, 164.3, 161.2, 163.9] },
          { x: new Date(2024, 10, 8).getTime(), y: [163.8, 165.2, 162.5, 164.7] },
          { x: new Date(2024, 10, 11).getTime(), y: [164.5, 167.1, 163.9, 166.8] },
          { x: new Date(2024, 10, 12).getTime(), y: [166.7, 169.4, 166.1, 168.9] },
          { x: new Date(2024, 10, 13).getTime(), y: [169.2, 170.5, 167.8, 169.8] },
          { x: new Date(2024, 10, 14).getTime(), y: [169.9, 171.3, 168.5, 170.6] },
          { x: new Date(2024, 10, 15).getTime(), y: [170.5, 172.8, 169.2, 172.1] },
          { x: new Date(2024, 10, 18).getTime(), y: [172.0, 173.5, 170.4, 171.9] },
          { x: new Date(2024, 10, 19).getTime(), y: [171.8, 173.2, 170.1, 172.5] },
          { x: new Date(2024, 10, 20).getTime(), y: [172.4, 174.9, 171.6, 174.2] },
          { x: new Date(2024, 10, 21).getTime(), y: [174.1, 176.3, 173.2, 175.8] },
          { x: new Date(2024, 10, 22).getTime(), y: [175.7, 177.2, 174.5, 176.9] },
          { x: new Date(2024, 10, 25).getTime(), y: [176.8, 178.5, 175.3, 177.6] },
          { x: new Date(2024, 10, 26).getTime(), y: [177.5, 179.1, 176.2, 178.9] },
          { x: new Date(2024, 10, 27).getTime(), y: [178.8, 180.4, 177.5, 179.8] },
          { x: new Date(2024, 10, 28).getTime(), y: [179.7, 181.2, 178.4, 180.6] },
          { x: new Date(2024, 10, 29).getTime(), y: [180.5, 182.3, 179.1, 181.9] },
          { x: new Date(2024, 11, 2).getTime(), y: [181.8, 183.6, 180.5, 182.7] },
          { x: new Date(2024, 11, 3).getTime(), y: [182.6, 184.8, 181.3, 183.9] },
          { x: new Date(2024, 11, 4).getTime(), y: [183.8, 185.7, 182.6, 185.1] },
          { x: new Date(2024, 11, 5).getTime(), y: [185.0, 186.9, 183.7, 186.3] },
          { x: new Date(2024, 11, 6).getTime(), y: [186.2, 188.1, 184.9, 187.5] },
          { x: new Date(2024, 11, 9).getTime(), y: [187.4, 189.3, 186.1, 188.7] },
        ],
      },
    ]

    return (
      <div className="rounded-xl border border-mw-border bg-mw-raised/90 shadow-card p-3 sm:p-4 min-h-[320px]">
        {title || subtitle ? (
          <div className="mb-3 sm:mb-4">
            {title ? <div className="text-[15px] font-semibold text-white tracking-tight">{title}</div> : null}
            {subtitle ? <div className="text-[12px] text-mw-muted mt-1 leading-relaxed">{subtitle}</div> : null}
          </div>
        ) : null}
        <ReactApexChart options={options} series={series} type="candlestick" height={380} />
      </div>
    )
  }

  // default area as fallback
  const options = {
    chart: {
      id: 'area',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    },
    theme: { mode: 'dark' },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#8b92a3', fontSize: '11px' } },
    },
    stroke: { curve: 'smooth' },
    grid: { borderColor: '#252a36', strokeDashArray: 4 },
  }
  const series = [{ name: 'Price', data: [[1640995200000, 120], [1641081600000, 125]] }]
  return (
    <div className="rounded-xl border border-mw-border bg-mw-raised/90 shadow-card p-3 sm:p-4">
      {title || subtitle ? (
        <div className="mb-3 sm:mb-4">
          {title ? <div className="text-[15px] font-semibold text-white tracking-tight">{title}</div> : null}
          {subtitle ? <div className="text-[12px] text-mw-muted mt-1 leading-relaxed">{subtitle}</div> : null}
        </div>
      ) : null}
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  )
}
