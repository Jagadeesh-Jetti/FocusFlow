import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TaskStatusPieChart = ({ completed, pending, overdue }) => {
  const total = (completed || 0) + (pending || 0) + (overdue || 0);

  if (total === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-sm text-gray-400 dark:text-slate-600 italic">
        No tasks yet.
      </div>
    );
  }

  const data = {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [completed, pending, overdue],
        backgroundColor: ['#4f46e5', '#a5b4fc', '#fecaca'],
        borderColor: '#fff',
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563',
          font: { size: 12 },
          boxWidth: 10,
          padding: 14,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#111827',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 8,
        cornerRadius: 6,
      },
    },
  };

  return (
    <div className="h-56">
      <Doughnut data={data} options={options} />
    </div>
  );
};
