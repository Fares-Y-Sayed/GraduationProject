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
  const [stats, setStats] = useState({});
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState(""); // State variable for file name

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(
      file.name.substring(0, file.name.lastIndexOf(".")) || file.name
    ); // Update file name state
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
      setStats({});
      setErrors({});
      setSelectedColumn("");
    };

    reader.readAsBinaryString(file);
  };

  const getValidNumbers = () => {
    if (!selectedColumn || !data) return [];
    return data
      .map((row) => parseFloat(row[selectedColumn]))
      .filter((val) => !isNaN(val));
  };

  const calculateStat = (type) => {
    const numbers = getValidNumbers();
    setErrors((prev) => ({ ...prev, [type]: null }));

    if (numbers.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [type]: "No valid numerical data in this column",
      }));
      setStats((prev) => ({ ...prev, [type]: null }));
      return;
    }

    try {
      let result;
      switch (type) {
        case "mean":
          result = mean(numbers).toFixed(2);
          break;
        case "variance":
          result = variance(numbers).toFixed(2);
          break;
        case "standardDeviation":
          result = standardDeviation(numbers).toFixed(2);
          break;
        case "median":
          result = median(numbers).toFixed(2);
          break;
        case "mode":
          result = mode(numbers).toFixed(2);
          break;
        case "count":
          result = numbers.length;
          break;
        default:
          throw new Error("Unknown calculation type");
      }
      setStats((prev) => ({ ...prev, [type]: result }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Could not calculate this statistic",
      }));
      setStats((prev) => ({ ...prev, [type]: null }));
    }
  };

  const getColumns = () => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  };

  const StatCard = ({ type, label }) => (
    <div className="stat-item">
      <div className="stat-header">
        <label>{label}</label>
        <button
          onClick={() => calculateStat(type)}
          className="calculate-btn"
          disabled={!selectedColumn}
        >
          Calculate
        </button>
      </div>
      {errors[type] ? (
        <div className="error-message">{errors[type]}</div>
      ) : (
        <span className={stats[type] ? "stat-value" : "stat-empty"}>
          {stats[type] || "Not calculated"}
        </span>
      )}
    </div>
  );

  return (
    <div className="container">
      <h1>Statistics Calculator</h1>

      {/* <div className="upload-section">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div> */}
      <div className="upload-section">
        <label htmlFor="file-upload" className="input-div">
          <input
            id="file-upload"
            className="input"
            name="file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            strokeLinejoin="round"
            strokeLinecap="round"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="icon"
          >
            <polyline points="16 16 12 12 8 16"></polyline>
            <line y2="21" x2="12" y1="12" x1="12"></line>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
            <polyline points="16 16 12 12 8 16"></polyline>
          </svg>
        </label>
        {fileName && <p className="file-name">{fileName}</p>}
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

          <div className="column-select-container">
            <select
              value={selectedColumn}
              onChange={(e) => {
                setSelectedColumn(e.target.value);
                setStats({});
                setErrors({});
              }}
              className="column-select"
            >
              <option value="">Select a column</option>
              {getColumns().map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>

          {selectedColumn && (
            <div className="stats-results">
              <h2>Statistics for {selectedColumn}</h2>
              <div className="stats-grid">
                <StatCard type="mean" label="Mean" />
                <StatCard type="variance" label="Variance" />
                <StatCard type="standardDeviation" label="Standard Deviation" />
                <StatCard type="median" label="Median" />
                <StatCard type="mode" label="Mode" />
                <StatCard type="count" label="Count" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
