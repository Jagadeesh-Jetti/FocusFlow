import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TaskStatusPieChart = ({ completed, pending, overdue }) => {
  const data = {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [completed, pending, overdue],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563',
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
