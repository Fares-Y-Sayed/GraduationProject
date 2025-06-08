import { useState, useEffect } from "react";
import { mean, variance, standardDeviation, median, mode } from "simple-statistics";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import DataPreview from "./components/DataPreview";
import TestSelector from "./components/TestSelector";
import ColumnSelector from "./components/ColumnSelector";
import StatsPanel from "./components/StatsPanel";
import { VARIABLE_TYPES } from "./constants"; // Move constants to a separate file
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [stats, setStats] = useState({});
  const [errors, setErrors] = useState({});
  const [tTestData, setTTestData] = useState("");
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
    data ? data.map((row) => parseFloat(row[columnName])).filter((val) => !isNaN(val)) : [];

  const calculateStat = (type, columnName) => {
    const numbers = getValidNumbers(columnName);
    setErrors((prev) => ({ ...prev, [columnName]: { ...prev[columnName], [type]: null } }));

    if (numbers.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [columnName]: { ...prev[columnName], [type]: "No valid numerical data in this column" },
      }));
      setStats((prev) => ({ ...prev, [columnName]: { ...prev[columnName], [type]: null } }));
      return;
    }

    try {
      let result;
      switch (type) {
        case "mean": result = mean(numbers).toFixed(2); break;
        case "variance": result = variance(numbers).toFixed(2); break;
        case "standardDeviation": result = standardDeviation(numbers).toFixed(2); break;
        case "median": result = median(numbers).toFixed(2); break;
        case "mode": result = mode(numbers).toFixed(2); break;
        case "count": result = numbers.length; break;
        default: throw new Error("Unknown calculation type");
      }
      setStats((prev) => ({ ...prev, [columnName]: { ...prev[columnName], [type]: result } }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [columnName]: { ...prev[columnName], [type]: "Could not calculate this statistic" },
      }));
      setStats((prev) => ({ ...prev, [columnName]: { ...prev[columnName], [type]: null } }));
    }
  };

  const singleTTest = async (column) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) return console.error("fileName is missing in localStorage");

    const params = { fileName, headerName: column.trim(), alpha: 0.05, alternative: "two-tailed", populationMean: 7.5 };
    try {
      const res = await axios.post("http://localhost:3000/api/v1/tests/single-t-test", params);
      setTTestData(res.data.data);
    } catch (error) {
      console.error("Error performing single t-test:", error);
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

  const handleColumnSelect = (column) => {
    if (!selectedTest) return alert("Please select a test first");
    setSelectedColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  useEffect(() => {
    Object.entries(selectedStats).forEach(([type, isSelected]) => {
      if (isSelected) selectedColumns.forEach((col) => calculateStat(type, col));
    });
  }, [selectedStats, selectedColumns]);

  return (
    <div className="container">
      <h1>Statistics Calculator</h1>
      <FileUpload onDataLoaded={handleDataLoaded} />
      {data && (
        <>
          <DataPreview data={data} />
          <TestSelector selectedTest={selectedTest} setSelectedTest={setSelectedTest} setActiveTab={setActiveTab} />
          <ColumnSelector columnTypes={columnTypes} selectedColumns={selectedColumns} handleColumnSelect={handleColumnSelect} selectedTest={selectedTest} />
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
          />
        </>
      )}
    </div>
  );
}

export default App;