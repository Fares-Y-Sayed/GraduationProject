import React from 'react';
import { ColumnData } from '../types';

interface StatisticsPanelProps {
  columnName: string;
  stats: ColumnData;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ columnName, stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{columnName}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Mean</p>
          <p className="font-medium">{stats.mean?.toFixed(2) ?? 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Variance</p>
          <p className="font-medium">{stats.variance?.toFixed(2) ?? 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Standard Deviation</p>
          <p className="font-medium">{stats.standardDeviation?.toFixed(2) ?? 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Median</p>
          <p className="font-medium">{stats.median?.toFixed(2) ?? 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Mode</p>
          <p className="font-medium">{stats.mode?.toFixed(2) ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};