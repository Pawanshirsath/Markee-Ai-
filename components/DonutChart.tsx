import React from 'react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartData[];
  size?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, size = 200, strokeWidth = 25 }) => {
  if (!data || data.length === 0) {
    return null;
  }
  const halfsize = size / 2;
  const radius = halfsize - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={halfsize}
          cy={halfsize}
          r={radius}
          stroke="#334155" // slate-700
          strokeWidth={strokeWidth}
          fill="transparent"
          className="scale-[0.99]"
        />
        {data.map((item, index) => {
          const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
          const strokeDashoffset = (accumulatedPercent / 100) * circumference;
          accumulatedPercent += item.value;
          
          return (
            <circle
              key={index}
              cx={halfsize}
              cy={halfsize}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-strokeDashoffset}
              transform={`rotate(-90 ${halfsize} ${halfsize})`}
              className="transition-all duration-500"
            />
          );
        })}
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="fill-current text-slate-200 text-2xl font-bold"
        >
           Mix
        </text>
      </svg>
      <div className="flex flex-col gap-2 text-left">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-slate-300 font-medium">
              {item.name} ({item.value.toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
