import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChartDisplay from "./components/ChartDisplay";
import { useState, useEffect } from "react";
import {
  mean,
  variance,
  standardDeviation,
  median,
  mode,
} from "simple-statistics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import DataPreview from "./components/DataPreview";
import TestSelector from "./components/TestSelector";
import ColumnSelector from "./components/ColumnSelector";
import StatsPanel from "./components/StatsPanel";
import { VARIABLE_TYPES } from "./constants";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [stats, setStats] = useState({});
  const [errors, setErrors] = useState({});
  const [tTestData, setTTestData] = useState([]); // Change from "" to []
  const [dependentVariable, setDependentVariable] = useState(null);
  const [independentVariables, setIndependentVariables] = useState([]);
  const [regressionData, setRegressionData] = useState(null); // Added for regression
  const [selectedStats, setSelectedStats] = useState({
    mean: false,
    variance: false,
    standardDeviation: false,
    median: false,
    mode: false,
    count: false,
    tTest: false,
    anova: false,
    correlation: false,
    chiSquare: false,
    rankCorrelation: false,
  });
  const [activeTab, setActiveTab] = useState("descriptive");
  const [animatingStats, setAnimatingStats] = useState({});
  const [chartType, setChartType] = useState("line");
  const [columnTypes, setColumnTypes] = useState({});
  const [selectedTest, setSelectedTest] = useState(null);
  const [showRegBtn, setShowRgBtn] = useState(false);
  const [kolmogorovData, setKolmogorovData] = useState([]);
  const [signTestData, setSignTestData] = useState(null); // Sign test data state
  const [rankedSignTestData, setRankedSignTestData] = useState(null); // Ranked sign test data state
  const handleDataLoaded = (jsonData, file) => {
    setData(jsonData);
    setStats({});
    setErrors({});
    setSelectedColumns([]);
    setAnimatingStats({});
    initializeColumnTypes(jsonData);
  };

  const initializeColumnTypes = (jsonData) => {
    if (!jsonData || jsonData.length === 0) return;
    const types = {};
    const columns = Object.keys(jsonData[0]);
    columns.forEach((column) => {
      const values = jsonData.map((row) => row[column]);
      types[column] = detectVariableType(values);
    });
    setColumnTypes(types);
  };

  const detectVariableType = (values) => {
    const numericValues = values.filter((v) => !isNaN(parseFloat(v)));
    const uniqueValues = new Set(values);
    if (numericValues.length === values.length) return VARIABLE_TYPES.METRIC;
    if (uniqueValues.size <= values.length * 0.2) return VARIABLE_TYPES.NOMINAL;
    return VARIABLE_TYPES.ORDINAL;
  };

  const getValidNumbers = (columnName) =>
    data
      ? data
          .map((row) => parseFloat(row[columnName]))
          .filter((val) => !isNaN(val))
      : [];

  const calculateStat = (type, columnName) => {
    const numbers = getValidNumbers(columnName);
    setErrors((prev) => ({
      ...prev,
      [columnName]: { ...prev[columnName], [type]: null },
    }));

    if (numbers.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [columnName]: {
          ...prev[columnName],
          [type]: "No valid numerical data in this column",
        },
      }));
      setStats((prev) => ({
        ...prev,
        [columnName]: { ...prev[columnName], [type]: null },
      }));
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
      setStats((prev) => ({
        ...prev,
        [columnName]: { ...prev[columnName], [type]: result },
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [columnName]: {
          ...prev[columnName],
          [type]: "Could not calculate this statistic",
        },
      }));
      setStats((prev) => ({
        ...prev,
        [columnName]: { ...prev[columnName], [type]: null },
      }));
    }
  };

  const singleTTest = async (column, params = {}) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) return console.error("fileName is missing in localStorage");

    const defaultParams = {
      alpha: 0.05,
      alternative: "two-tailed",
      populationMean: 7.5,
    };

    const testParams = {
      ...defaultParams,
      ...params,
      fileName: fileName,
      headerName: column.trim(),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tests/single-t-test",
        testParams
      );
      // Defensive: handle both .data.result and .data.data
      const result = res.data.result || res.data.data || res.data;
      if (!result || typeof result !== "object") {
        console.error("Unexpected t-test response format:", res.data);
        return;
      }
      setTTestData((prev) => [...prev, { ...result, column, id: Date.now() }]);
    } catch (error) {
      console.error("Error performing single t-test:", error);
    }
  };

  const handleDeleteTTest = (id) => {
    setTTestData((prev) => prev.filter((item) => item.id !== id));
  };

  // Add the regression function here
  const regression = async (column1, ...column2) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) {
      console.error("fileName is missing in localStorage");
      return;
    }

    const params = {
      fileName,
      dependentName: column1,
      independentNames: column2,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/regression/linear",
        params
      );
      setRegressionData(res.data.data); // Update state with regression results
      console.log(res.data.data);
    } catch (error) {
      console.error("Error performing regression:", error);
    }
  };

  // kolomogrov

  const kolmogorovTest = async (column) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) return console.error("fileName is missing in localStorage");

    const params = {
      fileName: fileName,
      headerName: column.trim(),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tests/kolmogorov-smirnov-test",
        params
      );
      const result = res.data.result || res.data.data || res.data;
      if (!result || typeof result !== "object") {
        console.error("Unexpected Kolmogorov test response format:", res.data);
        return;
      }
      setKolmogorovData((prev) => [
        ...prev,
        { ...result, column, id: Date.now() },
      ]);
    } catch (error) {
      console.error("Error performing Kolmogorov test:", error);
    }
  };

  // Add delete handler for Kolmogorov results
  const handleDeleteKolmogorov = (id) => {
    setKolmogorovData((prev) => prev.filter((item) => item.id !== id));
  };

  // Sign Test function
  const signTest = async (columns) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) {
      console.error("fileName is missing in localStorage");
      return;
    }

    const params = {
      fileName,
      headerNames: columns,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tests/sign-test",
        params
      );
      setSignTestData(res.data);
    } catch (error) {
      console.error("Error performing Sign test:", error);
    }
  };

  // Ranked Sign Test function
  const rankedSignTest = async (columns) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) {
      console.error("fileName is missing in localStorage");
      return;
    }

    const params = {
      fileName,
      headerNames: columns,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tests/ranked-sign-test",
        params
      );
      setRankedSignTestData(res.data);
    } catch (error) {
      console.error("Error performing Ranked Sign test:", error);
    }
  };

  const handleCheckboxChange = (type) => {
    setAnimatingStats((prev) => {
      const newState = { ...prev };
      selectedColumns.forEach((col) => {
        newState[col] = { ...prev[col], [type]: !selectedStats[type] };
      });
      return newState;
    });

    setSelectedStats((prev) => ({ ...prev, [type]: !prev[type] }));

    setTimeout(() => {
      setAnimatingStats((prev) => {
        const newState = { ...prev };
        selectedColumns.forEach((col) => {
          newState[col] = { ...prev[col], [type]: false };
        });
        return newState;
      });
    }, 500);
  };
  const handleColumnSelect = (column, isDependent) => {
    if (!selectedTest) return alert("Please select a test first");

    if (selectedTest === "regression") {
      if (isDependent) {
        setDependentVariable(column);
        setSelectedColumns([column, ...independentVariables]);
      } else {
        const newIndependentVars = independentVariables.includes(column)
          ? independentVariables.filter((col) => col !== column)
          : [...independentVariables, column];
        setIndependentVariables(newIndependentVars);
        setSelectedColumns(
          [dependentVariable, ...newIndependentVars].filter(Boolean)
        );
      }
    } else {
      setSelectedColumns((prev) =>
        prev.includes(column)
          ? prev.filter((col) => col !== column)
          : [...prev, column]
      );
    }
  };

  useEffect(() => {
    Object.entries(selectedStats).forEach(([type, isSelected]) => {
      if (isSelected)
        selectedColumns.forEach((col) => calculateStat(type, col));
    });
    // Optionally, you could call regression here if you want it to auto-run:
    console.log("Selected columns:", selectedColumns);
    if (selectedColumns.length === 2) {
      // regression(selectedColumns[0], selectedColumns[1]);
      setShowRgBtn(true);
    }
  }, [selectedStats, selectedColumns]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project" element={<ChartDisplay />} />
      </Routes>
      <div className="container">
        <h1>Quick Stats</h1>
        <FileUpload onDataLoaded={handleDataLoaded} />
        {data && (
          <>
            <DataPreview data={data} />
            <TestSelector
              selectedTest={selectedTest}
              setSelectedTest={setSelectedTest}
              setActiveTab={setActiveTab}
            />
            <ColumnSelector
              columnTypes={columnTypes}
              selectedColumns={selectedColumns}
              handleColumnSelect={handleColumnSelect}
              selectedTest={selectedTest}
              activeTab={activeTab} // Add this line
            />
            <StatsPanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedColumns={selectedColumns}
              selectedStats={selectedStats}
              handleCheckboxChange={handleCheckboxChange}
              stats={stats}
              errors={errors}
              animatingStats={animatingStats}
              data={data}
              chartType={chartType}
              setChartType={setChartType}
              singleTTest={singleTTest}
              tTestData={tTestData}
              setTTestData={setTTestData}
              regression={regression} // Pass regression function
              regressionData={regressionData} // Pass regression data
              kolmogorovTest={kolmogorovTest} // Pass Kolmogorov function
              kolmogorovData={kolmogorovData} // Pass Kolmogorov data
              handleDeleteKolmogorov={handleDeleteKolmogorov} // Pass delete handler
              signTest={signTest} // Pass Sign test function
              signTestData={signTestData} // Pass Sign test data
              setSignTestData={setSignTestData} // Pass set function for Sign test data
              rankedSignTest={rankedSignTest} // Pass Ranked Sign test function
              rankedSignTestData={rankedSignTestData} // Pass Ranked Sign test data
              setRankedSignTestData={setRankedSignTestData} // Pass set function for Ranked Sign test data
            />
          </>
        )}
        {showRegBtn && (
          <div>
            <button
              onClick={() => {
                regression(selectedColumns[0], selectedColumns[1]);
              }}
              className="run-test-button"
            >
              Run Regression
            </button>
          </div>
        )}
        {regressionData && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Regression Results</h2>
            <table className="t-test-table">
              <thead>
                <tr>
                  <th>coefficient Of Determination</th>
                  <th>intercept</th>
                  <th>linear Regression Equation</th>
                  <th>slope</th>
                  <th>standard Error</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{regressionData.coefficientOfDetermination}</td>
                  <td>{regressionData.intercept}</td>
                  <td>{regressionData.linearRegressionEquation}</td>
                  <td>{regressionData.slope}</td>
                  <td>{regressionData.standardError}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Single T-Test Results Card */}

        {/* // Hide this section by default  */}
        {tTestData.length > 0 && (
          <div style={{ marginTop: "2rem", display: "none" }}>
            <h2>Single T-Test Results</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {tTestData.map((result) => (
                <div
                  key={result.id}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    padding: "1.5rem",
                    minWidth: "250px",
                    position: "relative",
                    color: "#333",
                  }}
                >
                  <button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      display: "none",
                    }}
                    onClick={() => handleDeleteTTest(result.id)}
                    title="Delete"
                  >
                    {/* Simple SVG trash icon */}
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                  <div>
                    <strong>Column:</strong> {result.column}
                  </div>
                  {Object.entries(result)
                    .filter(([key]) => !["id", "column"].includes(key))
                    .map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
