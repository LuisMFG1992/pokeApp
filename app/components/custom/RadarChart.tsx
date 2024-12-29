import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'
import { PokemonDetailsType } from '~/types'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

type RadarChart = {
  pokemon: PokemonDetailsType
}

const RadarChart = ({ pokemon }: RadarChart) => {
  const data = {
    labels: [
      'HP',
      'Attack',
      'Defense',
      'Special Att.',
      'Special Def.',
      'Speed',
    ],
    datasets: [
      {
        label: pokemon.name,
        data: pokemon.stats.map((stat) => stat[1]),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0,0,0,0.2)',
        },
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false, // hide name
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} points`,
        },
      },
    },
  }

  return <Radar data={data} options={options} />
}

export default RadarChart
