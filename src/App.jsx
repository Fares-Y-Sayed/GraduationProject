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
  const [tTestData, setTTestData] = useState("");
  const [regressionData, setRegressionData] = useState(null);
  const [selectedStats, setSelectedStats] = useState({
    mean: false,
    variance: false,
    standardDeviation: false,
    median: false,
    mode: false,
    count: false,
  });
  const [activeTab, setActiveTab] = useState("descriptive");
  const [animatingStats, setAnimatingStats] = useState({});
  const [chartType, setChartType] = useState("line");
  const [columnTypes, setColumnTypes] = useState({});
  const [selectedTest, setSelectedTest] = useState(null);
  const [dependentVariable, setDependentVariable] = useState(null);
  const [independentVariables, setIndependentVariables] = useState([]);
  const [alpha, setAlpha] = useState(0.01); // default value of 0.05 for alpha
  const [populationMean, setPopulationMean] = useState(3); // default value for population mean
  const [alternative, setAlternative] = useState("two-tailed"); // default value for alternative hypothesis

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

  const performCalculations = async () => {
    // Perform t-test if applicable
    console.log(alpha, alternative, populationMean);
    if (selectedColumns.length > 0) {
      const fileName = window.localStorage.getItem("fileName");
      if (fileName) {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/v1/tests/single-t-test",
            {
              fileName,
              headerName: selectedColumns[0].trim(),
              alpha: alpha,
              alternative: alternative,
              populationMean: populationMean,
            }
          );
          setTTestData(res.data.data);
        } catch (error) {
          console.error("Error performing t-test:", error);
        }
      }
    }

    // Perform regression if applicable
    if (selectedColumns.length >= 2) {
      const fileName = window.localStorage.getItem("fileName");
      if (fileName) {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/v1/regression/linear",
            {
              fileName,
              dependentName: selectedColumns[0],
              independentName: selectedColumns[1],
            }
          );
          setRegressionData(res.data.data);
        } catch (error) {
          console.error("Error performing regression:", error);
        }
      }
    }
  };

  useEffect(() => {
    Object.entries(selectedStats).forEach(([type, isSelected]) => {
      if (isSelected) {
        selectedColumns.forEach((col) => calculateStat(type, col));
      }
    });

    // Perform calculations whenever columns change
    performCalculations();
  }, [selectedStats, selectedColumns]);

  return (
    <div className="container">
      <h1>Statistics Calculator</h1>
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
            activeTab={activeTab}
            dependentVariable={dependentVariable}
            independentVariables={independentVariables}
            setAlpha={setAlpha}
            setPopulationMean={setPopulationMean}
            setAlternative={setAlternative}
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
            tTestData={tTestData}
            regressionData={regressionData}
          />
        </>
      )}
    </div>
  );
}

export default App;
