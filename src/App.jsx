import { useState } from "react";
import * as XLSX from "xlsx";
import {
  mean,
  variance,
  standardDeviation,
  median,
  mode,
} from "simple-statistics";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [stats, setStats] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
      setStats(null);
      setSelectedColumn("");
    };

    reader.readAsBinaryString(file);
  };

  const calculateStats = () => {
    if (!selectedColumn || !data) return;

    const numbers = data
      .map((row) => parseFloat(row[selectedColumn]))
      .filter((val) => !isNaN(val));

    setStats({
      mean: mean(numbers).toFixed(2),
      variance: variance(numbers).toFixed(2),
      standardDeviation: standardDeviation(numbers).toFixed(2),
      median: median(numbers).toFixed(2),
      mode: mode(numbers).toFixed(2),
      count: numbers.length,
    });
  };

  const getColumns = () => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  };

  return (
    <div className="container">
      <h1>Excel Statistics Calculator</h1>

      <div className="upload-section">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>

      {data && (
        <div className="data-section">
          <h2>Data Preview</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {getColumns().map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0).map((row, index) => (
                  <tr key={index}>
                    {getColumns().map((column) => (
                      <td key={column}>{row[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats-controls">
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="column-select"
            >
              <option value="">Select a column</option>
              {getColumns().map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <button onClick={calculateStats} disabled={!selectedColumn}>
              Calculate Statistics
            </button>
          </div>

          {stats && (
            <div className="stats-results">
              <h2>Statistics for {selectedColumn}</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <label>Mean</label>
                  <span>{stats.mean}</span>
                </div>
                <div className="stat-item">
                  <label>Variance</label>
                  <span>{stats.variance}</span>
                </div>
                <div className="stat-item">
                  <label>Standard Deviation</label>
                  <span>{stats.standardDeviation}</span>
                </div>
                <div className="stat-item">
                  <label>Median</label>
                  <span>{stats.median}</span>
                </div>
                <div className="stat-item">
                  <label>Mode</label>
                  <span>{stats.mode}</span>
                </div>
                <div className="stat-item">
                  <label>Count</label>
                  <span>{stats.count}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
