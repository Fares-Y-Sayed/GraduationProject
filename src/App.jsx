import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ChartDisplay from "./components/ChartDisplay";
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
import Typewriter from "./components/Typewriter";
import { FaChartLine, FaMagic, FaTrash } from "react-icons/fa";
import "./App.css";
import ProjectPage from "./components/ProjectPage";

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
  const [regressionData, setRegressionData] = useState([]); // Will now be an array
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
  const [activeSubTab, setActiveSubTab] = useState("statistics"); // Add this line
  const [animatingStats, setAnimatingStats] = useState({});
  const [chartType, setChartType] = useState("line");
  const [columnTypes, setColumnTypes] = useState({});
  const [selectedTest, setSelectedTest] = useState(null);
  const [showRegBtn, setShowRgBtn] = useState(false);
  const [kolmogorovData, setKolmogorovData] = useState([]);
  const [signTestData, setSignTestData] = useState(null); // Sign test data state
  const [uTestData, setUTestData] = useState(null); // U-test data state
  const [rankedSignTestData, setRankedSignTestData] = useState(null); // Ranked sign test data state
  const [anovaData, setAnovaData] = useState([]); // ANOVA test data state
  const [tTestAlpha, setTTestAlpha] = useState(0.05);
  const [tTestAlternative, setTTestAlternative] = useState("two-tailed");
  const [tTestPopulationMean, setTTestPopulationMean] = useState(7.5);
  const [regressionExplanation, setRegressionExplanation] = useState("");
  const [regressionExplaining, setRegressionExplaining] = useState(false);

  // Chi-Square test states
  const [chiSquareData, setChiSquareData] = useState([]);
  const [chiSquareAlpha, setChiSquareAlpha] = useState(0.05);
  const [chiSquareTestType, setChiSquareTestType] = useState("independence"); // "independence" or "goodness_of_fit"

  // Z-test states
  const [zTestData, setZTestData] = useState([]);
  const [zTestAlpha, setZTestAlpha] = useState(0.05);
  const [zTestAlternative, setZTestAlternative] = useState("two-tailed");
  const [zTestPopulationMean, setZTestPopulationMean] = useState(0);
  const [zTestPopulationStdDev, setZTestPopulationStdDev] = useState(1);

  const handleDataLoaded = (jsonData) => {
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

  const calculateStat = useCallback(
    (type, columnName) => {
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
    },
    [data]
  );

  const singleTTest = async (column, params = {}) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) return console.error("fileName is missing in localStorage");

    const testParams = {
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

  const handleDeleteRegression = (id) => {
    setRegressionData((prev) => prev.filter((item) => item.id !== id));
  };

  // Add the regression function here
  const regression = async (dependentName, independentNames) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) {
      console.error("fileName is missing in localStorage");
      return;
    }

    const params = {
      fileName,
      dependentName: dependentName,
      independentNames: independentNames,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/regression/linear",
        params
      );
      const newResult = { ...res.data.data, id: Date.now() };
      setRegressionData((prev) => [...prev, newResult]); // Add new result to the array
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

  const anovaTest = async (columns) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) {
      console.error("fileName is missing in localStorage");
      return;
    }
    if (columns.length < 2) {
      alert("Please select at least two columns for the ANOVA test.");
      return;
    }
    const params = {
      fileName,
      headerNames: columns,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tests/anova-test",
        params
      );
      const result = { ...res.data.result, id: Date.now(), columns };
      setAnovaData((prev) => [...prev, result]);
    } catch (error) {
      console.error("Error performing ANOVA test:", error);
    }
  };

  const handleDeleteAnova = (id) => {
    setAnovaData((prev) => prev.filter((item) => item.id !== id));
  };

  // U-Test function
  const uTest = async (columns) => {
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
        "http://localhost:3000/api/v1/tests/u-test",
        params
      );
      setUTestData(res.data);
    } catch (error) {
      console.error("Error performing U-test:", error);
    }
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

  // Chi-Square Test function
  const chiSquareTest = async (columns, testType = "independence") => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) {
      console.error("fileName is missing in localStorage");
      return;
    }

    if (testType === "independence" && columns.length !== 2) {
      alert(
        "Please select exactly two columns for Chi-Square test of independence."
      );
      return;
    }

    if (testType === "goodness_of_fit" && columns.length !== 1) {
      alert(
        "Please select exactly one column for Chi-Square goodness of fit test."
      );
      return;
    }

    const params = {
      fileName,
      headerNames: columns,
      testType: testType,
      alpha: chiSquareAlpha,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tests/chi-square-test",
        params
      );
      const result = { ...res.data.result, id: Date.now(), columns, testType };
      setChiSquareData((prev) => [...prev, result]);
    } catch (error) {
      console.error("Error performing Chi-Square test:", error);
    }
  };

  // Z-Test function
  const zTest = async (column, params = {}) => {
    const fileName = window.localStorage.getItem("fileName");
    if (!fileName) {
      console.error("fileName is missing in localStorage");
      return;
    }

    const testParams = {
      fileName,
      headerNames: [column.trim()],
      alpha: zTestAlpha,
      alternative: zTestAlternative,
      populationMean: zTestPopulationMean,
      populationStdDev: zTestPopulationStdDev,
      ...params,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tests/z-test",
        testParams
      );
      const result = res.data.result || res.data.data || res.data;
      if (!result || typeof result !== "object") {
        console.error("Unexpected z-test response format:", res.data);
        return;
      }
      setZTestData((prev) => [...prev, { ...result, column, id: Date.now() }]);
    } catch (error) {
      console.error("Error performing z-test:", error);
    }
  };

  // Delete handlers for new tests
  const handleDeleteChiSquare = (id) => {
    setChiSquareData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteZTest = (id) => {
    setZTestData((prev) => prev.filter((item) => item.id !== id));
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
        const newIndependentVars = independentVariables.filter(
          (c) => c !== column
        );
        setIndependentVariables(newIndependentVars);
        setSelectedColumns([column, ...newIndependentVars].filter(Boolean));
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
    if (dependentVariable && independentVariables.length > 0) {
      setShowRgBtn(true);
    } else {
      setShowRgBtn(false);
    }
  }, [
    selectedStats,
    selectedColumns,
    dependentVariable,
    independentVariables,
    calculateStat,
  ]);

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="route-fade">
              <HomePage />
            </div>
          }
        />
        <Route
          path="/project"
          element={
            <div className="route-fade">
              <ProjectPage
                data={data}
                handleDataLoaded={handleDataLoaded}
                selectedTest={selectedTest}
                setSelectedTest={setSelectedTest}
                setActiveTab={setActiveTab}
                columnTypes={columnTypes}
                selectedColumns={selectedColumns}
                handleColumnSelect={handleColumnSelect}
                activeTab={activeTab}
                dependentVariable={dependentVariable}
                independentVariables={independentVariables}
                activeSubTab={activeSubTab}
                setActiveSubTab={setActiveSubTab}
                selectedStats={selectedStats}
                handleCheckboxChange={handleCheckboxChange}
                stats={stats}
                errors={errors}
                animatingStats={animatingStats}
                chartType={chartType}
                setChartType={setChartType}
                singleTTest={singleTTest}
                tTestData={tTestData}
                setTTestData={setTTestData}
                tTestAlpha={tTestAlpha}
                setTTestAlpha={setTTestAlpha}
                tTestAlternative={tTestAlternative}
                setTTestAlternative={setTTestAlternative}
                tTestPopulationMean={tTestPopulationMean}
                setTTestPopulationMean={setTTestPopulationMean}
                regression={regression}
                regressionData={regressionData}
                kolmogorovTest={kolmogorovTest}
                kolmogorovData={kolmogorovData}
                handleDeleteKolmogorov={handleDeleteKolmogorov}
                anovaTest={anovaTest}
                anovaData={anovaData}
                handleDeleteAnova={handleDeleteAnova}
                signTest={signTest}
                signTestData={signTestData}
                setSignTestData={setSignTestData}
                rankedSignTest={rankedSignTest}
                rankedSignTestData={rankedSignTestData}
                setRankedSignTestData={setRankedSignTestData}
                uTest={uTest}
                uTestData={uTestData}
                setUTestData={setUTestData}
                showRegBtn={showRegBtn}
                handleDeleteRegression={handleDeleteRegression}
                regressionExplaining={regressionExplaining}
                setRegressionExplaining={setRegressionExplaining}
                regressionExplanation={regressionExplanation}
                setRegressionExplanation={setRegressionExplanation}
                chiSquareTest={chiSquareTest}
                chiSquareData={chiSquareData}
                setChiSquareData={setChiSquareData}
                handleDeleteChiSquare={handleDeleteChiSquare}
                chiSquareAlpha={chiSquareAlpha}
                setChiSquareAlpha={setChiSquareAlpha}
                chiSquareTestType={chiSquareTestType}
                setChiSquareTestType={setChiSquareTestType}
                zTest={zTest}
                zTestData={zTestData}
                setZTestData={setZTestData}
                handleDeleteZTest={handleDeleteZTest}
                zTestAlpha={zTestAlpha}
                setZTestAlpha={setZTestAlpha}
                zTestAlternative={zTestAlternative}
                setZTestAlternative={setZTestAlternative}
                zTestPopulationMean={zTestPopulationMean}
                setZTestPopulationMean={setZTestPopulationMean}
                zTestPopulationStdDev={zTestPopulationStdDev}
                setZTestPopulationStdDev={setZTestPopulationStdDev}
              />
            </div>
          }
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
