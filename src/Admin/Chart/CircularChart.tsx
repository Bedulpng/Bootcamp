import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularChartProps {
  percentage: number;
  title: string;
}

const CircularChart: React.FC<CircularChartProps> = ({ percentage, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="w-32 h-32 mx-auto">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: '#3B82F6',
            textColor: '#1F2937',
            trailColor: '#E5E7EB',
          })}
        />
      </div>
    </div>
  );
};

export default CircularChart;