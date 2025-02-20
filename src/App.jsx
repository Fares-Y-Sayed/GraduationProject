import React, { useState } from 'react';
import { FileUp, Table, Calculator, Bean as Mean, Sigma, FunctionSquare as Functions, ArrowDownNarrowWide, Hash } from 'lucide-react';
import * as XLSX from 'xlsx';
import { StatisticsPanel } from './components/StatisticsPanel';
import {
  calculateMean,
  calculateVariance,
  calculateStandardDeviation,
  calculateMedian,
  calculateMode,
} from './utils/statistics';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [stats, setStats] = useState({});

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target?.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      setData(jsonData);
      if (jsonData.length > 0) {
        setColumns(Object.keys(jsonData[0]));
      }
    };
    reader.readAsBinaryString(file);
  };

  const calculateStat = (statType) => {
    const newStats = { ...stats };
    
    columns.forEach(column => {
      const values = data.map(row => parseFloat(row[column])).filter(val => !isNaN(val));
      
      if (values.length > 0) {
        if (!newStats[column]) {
          newStats[column] = { values };
        }

        switch (statType) {
          case 'mean':
            newStats[column].mean = calculateMean(values);
            break;
          case 'variance':
            newStats[column].variance = calculateVariance(values);
            break;
          case 'standardDeviation':
            newStats[column].standardDeviation = calculateStandardDeviation(values);
            break;
          case 'median':
            newStats[column].median = calculateMedian(values);
            break;
          case 'mode':
            newStats[column].mode = calculateMode(values);
            break;
          case 'all':
            newStats[column] = {
              values,
              mean: calculateMean(values),
              variance: calculateVariance(values),
              standardDeviation: calculateStandardDeviation(values),
              median: calculateMedian(values),
              mode: calculateMode(values),
            };
            break;
        }
      }
    });
    
    setStats(newStats);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Table className="w-8 h-8" />
            Excel Statistics Analyzer
          </h1>
          
          <div className="mb-6">
            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <div className="flex flex-col items-center space-y-2">
                <FileUp className="w-8 h-8 text-gray-400" />
                <span className="font-medium text-gray-600">
                  Drop Excel file or click to upload
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {data.length > 0 && (
            <>
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => calculateStat('all')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate All
                </button>
                <button
                  onClick={() => calculateStat('mean')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mean className="w-5 h-5" />
                  Mean
                </button>
                <button
                  onClick={() => calculateStat('variance')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Sigma className="w-5 h-5" />
                  Variance
                </button>
                <button
                  onClick={() => calculateStat('standardDeviation')}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Functions className="w-5 h-5" />
                  Standard Deviation
                </button>
                <button
                  onClick={() => calculateStat('median')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <ArrowDownNarrowWide className="w-5 h-5" />
                  Median
                </button>
                <button
                  onClick={() => calculateStat('mode')}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Hash className="w-5 h-5" />
                  Mode
                </button>
              </div>

              <div className="border rounded-lg shadow-sm">
                <div className="max-h-[250px] overflow-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        {columns.map((column) => (
                          <th
                            key={column}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.map((row, index) => (
                        <tr key={index}>
                          {columns.map((column) => (
                            <td
                              key={column}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {Object.keys(stats).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats).map(([columnName, columnStats]) => (
              <StatisticsPanel
                key={columnName}
                columnName={columnName}
                stats={columnStats}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;