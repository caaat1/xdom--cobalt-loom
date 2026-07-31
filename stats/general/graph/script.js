const labels = raw.map((r) => r.t)
const GRID = '#333'
const TICK = '#555'

const baseOpts = () => ({
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      labels: { color: '#888', font: { family: 'monospace', size: 11 } },
    },
  },
  scales: {
    x: {
      ticks: {
        color: TICK,
        font: { family: 'monospace', size: 10 },
        maxRotation: 45,
      },
      grid: { color: GRID },
    },
    y: {
      ticks: { color: TICK, font: { family: 'monospace', size: 10 } },
      grid: { color: GRID },
    },
  },
})

new Chart(document.getElementById('c0'), {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'files',
        data: raw.map((r) => r.files),
        borderColor: '#4ec9b0',
        backgroundColor: '#4ec9b022',
        yAxisID: 'y',
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'lines',
        data: raw.map((r) => r.lines),
        borderColor: '#9cdcfe',
        backgroundColor: '#9cdcfe22',
        yAxisID: 'y1',
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'bytes',
        data: raw.map((r) => r.bytes),
        borderColor: '#ce9178',
        backgroundColor: '#ce917822',
        yAxisID: 'y2',
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  },
  options: {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        labels: { color: '#888', font: { family: 'monospace', size: 11 } },
      },
    },
    scales: {
      x: {
        ticks: {
          color: TICK,
          font: { family: 'monospace', size: 10 },
          maxRotation: 45,
        },
        grid: { color: GRID },
      },
      y: {
        position: 'left',
        ticks: { color: '#4ec9b0', font: { family: 'monospace', size: 10 } },
        grid: { color: GRID },
        title: {
          display: true,
          text: 'files',
          color: '#4ec9b0',
          font: { size: 10 },
        },
      },
      y1: {
        position: 'right',
        ticks: { color: '#9cdcfe', font: { family: 'monospace', size: 10 } },
        grid: { drawOnChartArea: false },
        title: {
          display: true,
          text: 'lines',
          color: '#9cdcfe',
          font: { size: 10 },
        },
      },
      y2: {
        position: 'right',
        ticks: { color: '#ce9178', font: { family: 'monospace', size: 10 } },
        grid: { drawOnChartArea: false },
        title: {
          display: true,
          text: 'bytes',
          color: '#ce9178',
          font: { size: 10 },
        },
      },
    },
  },
})

new Chart(document.getElementById('c1'), {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'bytes/file',
        data: raw.map((r) => r.bpf),
        borderColor: '#ce9178',
        backgroundColor: '#ce917822',
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  },
  options: baseOpts(),
})

new Chart(document.getElementById('c2'), {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'lines/file',
        data: raw.map((r) => r.lpf),
        borderColor: '#9cdcfe',
        backgroundColor: '#9cdcfe22',
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  },
  options: baseOpts(),
})
