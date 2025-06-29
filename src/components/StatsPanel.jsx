import React, { useState } from "react";
import PropTypes from "prop-types";
import StatCard from "./StatCard";
import ChartDisplay from "./ChartDisplay";
import HistogramChart from "./HistogramChart";
import Typewriter, { ExplanationTypewriter } from "./Typewriter";
import {
  FaFlask,
  FaChartBar,
  FaMagic,
  FaTrash,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";
// import {handleDeleteTTest} from "../App"

function StatsPanel({
  activeTab,
  activeSubTab,
  setActiveSubTab,
  selectedColumns,
  selectedStats,
  handleCheckboxChange,
  stats,
  errors,
  animatingStats,
  data,
  chartType,
  setChartType,
  singleTTest,
  tTestData,
  setTTestData, // Make sure this is passed from App.jsx

  regressionData,
  kolmogorovTest,
  kolmogorovData,
  handleDeleteKolmogorov,

  anovaTest,
  anovaData,
  handleDeleteAnova,

  signTest,
  signTestData,
  setSignTestData,

  rankedSignTest,
  rankedSignTestData,
  setRankedSignTestData,

  tTestAlpha,
  setTTestAlpha,
  tTestAlternative,
  setTTestAlternative,
  tTestPopulationMean,
  setTTestPopulationMean,

  uTest,
  uTestData,
  setUTestData,
  chiSquareTest,
  chiSquareData,
  setChiSquareData,
  handleDeleteChiSquare,
  chiSquareAlpha,
  setChiSquareAlpha,
  chiSquareTestType,
  setChiSquareTestType,
  zTest,
  zTestData,
  setZTestData,
  handleDeleteZTest,
  zTestAlpha,
  setZTestAlpha,
  zTestAlternative,
  setZTestAlternative,
  zTestPopulationMean,
  setZTestPopulationMean,
  zTestPopulationStdDev,
  setZTestPopulationStdDev,
}) {
  const handleDeleteTTest = (idOrColumn) => {
    setTTestData((prev) =>
      prev.filter((item) => (item.id ?? item.column) !== idOrColumn)
    );
  };

  const StatCheckbox = ({ type, label }) => (
    <div className="stat-checkbox-container">
      <label className="stat-checkbox-label">
        <input
          type="checkbox"
          checked={selectedStats[type]}
          onChange={() => handleCheckboxChange(type)}
          disabled={selectedColumns.length === 0}
          className="stat-checkbox"
        />
        {label}
      </label>
    </div>
  );

  StatCheckbox.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  const ColumnStatistics = ({ columnName }) => (
    <div className="column-statistics">
      <div className="column-header">
        <h2>Statistics for {`"${columnName}"`}</h2>
      </div>
      <div className="stats-grid">
        <StatCard
          type="mean"
          label="Mean"
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type="variance"
          label="Variance"
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type="standardDeviation"
          label="Standard Deviation"
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type="median"
          label="Median"
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type="mode"
          label="Mode"
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type="count"
          label="Count"
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
      </div>
    </div>
  );

  ColumnStatistics.propTypes = {
    columnName: PropTypes.string.isRequired,
  };

  // Explanation states for each test
  const [tTestExplanation, setTTestExplanation] = useState("");
  const [tTestExplaining, setTTestExplaining] = useState(false);
  const [kolmogorovExplanation, setKolmogorovExplanation] = useState("");
  const [kolmogorovExplaining, setKolmogorovExplaining] = useState(false);
  const [signTestExplanation, setSignTestExplanation] = useState("");
  const [signTestExplaining, setSignTestExplaining] = useState(false);
  const [rankedSignTestExplanation, setRankedSignTestExplanation] =
    useState("");
  const [rankedSignTestExplaining, setRankedSignTestExplaining] =
    useState(false);
  const [anovaExplanation, setAnovaExplanation] = useState("");
  const [anovaExplaining, setAnovaExplaining] = useState(false);
  const [uTestExplanation, setUTestExplanation] = useState("");
  const [uTestExplaining, setUTestExplaining] = useState(false);
  const [chiSquareExplanation, setChiSquareExplanation] = useState("");
  const [chiSquareExplaining, setChiSquareExplaining] = useState(false);
  const [zTestExplanation, setZTestExplanation] = useState("");
  const [zTestExplaining, setZTestExplaining] = useState(false);

  return (
    selectedColumns.length > 0 && (
      <div className="stats-container">
        <div className="tabs">
          {activeTab === "descriptive" && (
            <>
              <button
                className={`tab-button ${
                  activeSubTab === "statistics" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("statistics")}
              >
                Statistics
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "visualization" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("visualization")}
              >
                Visualization
              </button>
            </>
          )}
          {activeTab === "hypothesis" && (
            <>
              <button
                className={`tab-button ${
                  activeSubTab === "t-test" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("t-test")}
              >
                T-Test
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "kolmogorov" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("kolmogorov")}
              >
                Kolmogorov
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "anova" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("anova")}
              >
                ANOVA
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "sign" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("sign")}
              >
                Sign Test
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "rankedSign" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("rankedSign")}
              >
                Ranked Sign Test
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "u-test" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("u-test")}
              >
                U-Test
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "chi-square" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("chi-square")}
              >
                Chi-Square
              </button>
              <button
                className={`tab-button ${
                  activeSubTab === "z-test" ? "active" : ""
                }`}
                onClick={() => setActiveSubTab("z-test")}
              >
                Z-Test
              </button>
            </>
          )}
        </div>
        <div key={activeSubTab} className="tab-fade">
        {/* Descriptive Tab */}
        {activeTab === "descriptive" && (
          <>
            {/* Statistics SubTab */}
            {activeSubTab === "statistics" && (
              <div className="tab-content">
                <div className="checkboxes-container">
                  <StatCheckbox type="mean" label="Mean" />
                  <StatCheckbox type="variance" label="Variance" />
                  <StatCheckbox
                    type="standardDeviation"
                    label="Standard Deviation"
                  />
                  <StatCheckbox type="median" label="Median" />
                  <StatCheckbox type="mode" label="Mode" />
                  <StatCheckbox type="count" label="Count" />
                </div>
                {selectedColumns.map((column) => (
                  <ColumnStatistics key={column} columnName={column} />
                ))}
              </div>
            )}

            {/* Visualization SubTab */}
            {activeSubTab === "visualization" && (
              <ChartDisplay
                data={data}
                selectedColumns={selectedColumns}
                chartType={chartType}
                setChartType={setChartType}
              />
            )}
          </>
        )}

        {/* Hypothesis Tab */}
        {activeTab === "hypothesis" && (
          <>
            {/* T-Test SubTab */}
            {activeSubTab === "t-test" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  T-Test Analysis
                </h2>
                <div className="test-parameters">
                  <div className="test-param-item">
                    <label>Alpha Level:</label>
                    <input
                      type="number"
                      step="0.01"
                      value={tTestAlpha}
                      onChange={(e) =>
                        setTTestAlpha(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="test-param-item">
                    <label>Alternative:</label>
                    <select
                      value={tTestAlternative}
                      onChange={(e) => setTTestAlternative(e.target.value)}
                    >
                      <option value="two-tailed">Two-tailed</option>
                      <option value="less">Less</option>
                      <option value="greater">Greater</option>
                    </select>
                  </div>
                  <div className="test-param-item">
                    <label>Population Mean:</label>
                    <input
                      type="number"
                      value={tTestPopulationMean}
                      onChange={(e) =>
                        setTTestPopulationMean(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="test-controls">
                  <button
                    onClick={() => {
                      if (selectedColumns.length === 0) {
                        alert("Please select at least one column.");
                        return;
                      }
                      const params = {
                        alpha: tTestAlpha,
                        alternative: tTestAlternative,
                        populationMean: tTestPopulationMean,
                      };
                      selectedColumns.forEach((column) =>
                        singleTTest(column, params)
                      );
                    }}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run T-Test
                  </button>
                </div>
                {tTestData && tTestData.length > 0 && (
                  <div className="t-test-results">
                    <table className="t-test-table">
                      <thead>
                        <tr>
                          <th>Column</th>
                          <th>t-Statistic</th>
                          <th>p-Value</th>
                          <th>Decision</th>
                          <th>Degrees of Freedom</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tTestData.map((result) => (
                          <tr key={result.id ?? result.column}>
                            <td>{result.column}</td>
                            <td>{result.tStatistic?.toFixed(3) ?? ""}</td>
                            <td>{result.pValue?.toFixed(3) ?? ""}</td>
                            <td>{result.decision}</td>
                            <td>{result.degreesOfFreedom}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                }}
                                onClick={() =>
                                  handleDeleteTTest(result.id ?? result.column)
                                }
                                title="Delete"
                              >
                                <FaTrash style={{ marginRight: 6 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {data &&
                  selectedColumns.length > 0 &&
                  activeSubTab === "t-test" && (
                    <HistogramChart data={data} columns={selectedColumns} />
                  )}
                {tTestData && tTestData.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      className="run-test-button"
                      disabled={tTestExplaining}
                      onClick={async () => {
                        setTTestExplaining(true);
                        setTTestExplanation("");
                        const prompt = `Explain the following t-test results in simple terms in three lines:\n${JSON.stringify(
                          tTestData,
                          null,
                          2
                        )}`;
                        try {
                          const response = await fetch(
                            "http://localhost:4000/generate",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ prompt }),
                            }
                          );
                          const data = await response.json();
                          setTTestExplanation(
                            data.generatedText || "No explanation received."
                          );
                        } catch (error) {
                          setTTestExplanation("Failed to get explanation.");
                        }
                        setTTestExplaining(false);
                      }}
                    >
                      <FaMagic style={{ marginRight: 6 }} />
                      {tTestExplaining ? "Explaining..." : "Explain Results"}
                    </button>
                    {tTestExplanation && (
                      <div className="test-explanation">
                        <h3 className="explanation-header">
                          <FaMagic
                            style={{ marginRight: 8, color: "#10b981" }}
                          />
                          Explanation using AI
                        </h3>
                        <ExplanationTypewriter text={tTestExplanation} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Kolmogorov SubTab */}
            {activeSubTab === "kolmogorov" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  Kolmogorov-Smirnov Test
                </h2>
                <div className="test-controls">
                  <button
                    onClick={() => {
                      if (selectedColumns.length === 0) {
                        alert("Please select a column.");
                        return;
                      }
                      kolmogorovTest(selectedColumns[0]);
                    }}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run Kolmogorov Test
                  </button>
                </div>
                {kolmogorovData && kolmogorovData.length > 0 && (
                  <table className="t-test-table">
                    <thead>
                      <tr>
                        <th>Column</th>
                        <th>Statistic</th>
                        <th>Critical Value</th>
                        <th>p-Value</th>
                        <th>Is Normal</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kolmogorovData.map((result) => (
                        <tr key={result.id}>
                          <td>{result.column}</td>
                          <td>{result.statistic?.toFixed(3)}</td>
                          <td>{result.criticalValue?.toFixed(3)}</td>
                          <td>
                            {typeof result.pValue === "number"
                              ? result.pValue.toExponential(3)
                              : result.pValue}
                          </td>
                          <td>{String(result.isNormal)}</td>
                          <td>
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#ef4444",
                              }}
                              onClick={() => handleDeleteKolmogorov(result.id)}
                              title="Delete"
                            >
                              <FaTrash style={{ marginRight: 6 }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {data &&
                  selectedColumns.length > 0 &&
                  activeSubTab === "kolmogorov" && (
                    <HistogramChart data={data} columns={selectedColumns} />
                  )}
                {kolmogorovData && kolmogorovData.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      className="run-test-button"
                      disabled={kolmogorovExplaining}
                      onClick={async () => {
                        setKolmogorovExplaining(true);
                        setKolmogorovExplanation("");
                        const prompt = `Explain the following Kolmogorov-Smirnov test results in simple terms in three lines:\n${JSON.stringify(
                          kolmogorovData,
                          null,
                          2
                        )}`;
                        try {
                          const response = await fetch(
                            "http://localhost:4000/generate",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ prompt }),
                            }
                          );
                          const data = await response.json();
                          setKolmogorovExplanation(
                            data.generatedText || "No explanation received."
                          );
                        } catch (error) {
                          setKolmogorovExplanation(
                            "Failed to get explanation."
                          );
                        }
                        setKolmogorovExplaining(false);
                      }}
                    >
                      <FaMagic style={{ marginRight: 6 }} />
                      {kolmogorovExplaining
                        ? "Explaining..."
                        : "Explain Results"}
                    </button>
                    {kolmogorovExplanation && (
                      <div className="test-explanation">
                        <h3 className="explanation-header">
                          <FaMagic
                            style={{ marginRight: 8, color: "#10b981" }}
                          />
                          Explanation using AI
                        </h3>
                        <ExplanationTypewriter text={kolmogorovExplanation} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ANOVA SubTab */}
            {activeSubTab === "anova" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  ANOVA Test
                </h2>
                <div className="test-controls">
                  <button
                    onClick={() => anovaTest(selectedColumns)}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run ANOVA Test
                  </button>
                </div>
                {anovaData && anovaData.length > 0 && (
                  <table className=" t-test-results t-test-table">
                    <thead>
                      <tr>
                        <th>Columns</th>
                        <th>F-Statistic</th>
                        <th>P-Value</th>
                        <th>DF Between</th>
                        <th>DF Within</th>
                        <th>SS Between</th>
                        <th>SS Within</th>
                        <th>MS Between</th>
                        <th>MS Within</th>
                        <th>Decision</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className="anova-table">
                      {anovaData.map((result) => (
                        <tr key={result.id}>
                          <td>{result.columns.join(", ")}</td>
                          <td>{result.fStatistic?.toFixed(4)}</td>
                          <td>{result.pValue?.toExponential(4)}</td>
                          <td>{result.dfBetween}</td>
                          <td>{result.dfWithin}</td>
                          <td>{result.ssb?.toFixed(4)}</td>
                          <td>{result.ssw?.toFixed(4)}</td>
                          <td>{result.msb?.toFixed(4)}</td>
                          <td>{result.msw?.toFixed(4)}</td>
                          <td>{result.decision}</td>
                          <td>
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#ef4444",
                              }}
                              onClick={() => handleDeleteAnova(result.id)}
                              title="Delete"
                            >
                              <FaTrash style={{ marginRight: 6 }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {data &&
                  selectedColumns.length > 0 &&
                  activeSubTab === "anova" && (
                    <HistogramChart data={data} columns={selectedColumns} />
                  )}
                <div style={{ marginTop: "1rem" }}>
                  <button
                    className="run-test-button"
                    disabled={anovaExplaining}
                    onClick={async () => {
                      setAnovaExplaining(true);
                      setAnovaExplanation("");
                      const prompt = `Explain the following ANOVA test results in simple terms in three lines:\n${JSON.stringify(
                        anovaData,
                        null,
                        2
                      )}`;
                      try {
                        const response = await fetch(
                          "http://localhost:4000/generate",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ prompt }),
                          }
                        );
                        const data = await response.json();
                        setAnovaExplanation(
                          data.generatedText || "No explanation received."
                        );
                      } catch (error) {
                        setAnovaExplanation("Failed to get explanation.");
                      }
                      setAnovaExplaining(false);
                    }}
                  >
                    <FaMagic style={{ marginRight: 6 }} />
                    {anovaExplaining ? "Explaining..." : "Explain Results"}
                  </button>
                  {anovaExplanation && (
                    <div className="test-explanation">
                      <h3 className="explanation-header">
                        <FaMagic style={{ marginRight: 8, color: "#10b981" }} />
                        Explanation using AI
                      </h3>
                      <ExplanationTypewriter text={anovaExplanation} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sign Test SubTab */}
            {activeSubTab === "sign" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  Sign Test
                </h2>
                <div className="test-controls">
                  <button
                    onClick={() => {
                      if (selectedColumns.length !== 2) {
                        alert(
                          "Please select exactly two columns for Sign test."
                        );
                        return;
                      }
                      signTest(selectedColumns);
                    }}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run Sign Test
                  </button>
                </div>
                {signTestData && signTestData.result && (
                  <>
                    <div style={{ marginTop: "2rem" }}>
                      <h3>
                        <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                        Sign Test Results
                      </h3>
                      <table className="t-test-table">
                        <thead>
                          <tr>
                            <th>Statistic</th>
                            <th>p-Value</th>
                            <th>Significant</th>
                            <th>Positive Signs</th>
                            <th>Negative Signs</th>
                            <th>Ties</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {typeof signTestData.result.statistic === "number"
                                ? signTestData.result.statistic.toFixed(3)
                                : signTestData.result.statistic}
                            </td>
                            <td>
                              {typeof signTestData.result.pValue === "number"
                                ? signTestData.result.pValue.toExponential(6)
                                : signTestData.result.pValue}
                            </td>
                            <td>{String(signTestData.result.significant)}</td>
                            <td>{signTestData.result.positiveSigns}</td>
                            <td>{signTestData.result.negativeSigns}</td>
                            <td>{signTestData.result.ties}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                }}
                                onClick={() => setSignTestData(null)}
                                title="Delete"
                              >
                                <FaTrash style={{ marginRight: 6 }} />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        className="run-test-button"
                        disabled={signTestExplaining}
                        onClick={async () => {
                          setSignTestExplaining(true);
                          setSignTestExplanation("");
                          const prompt = `Explain the following sign test results in simple terms in three lines:\n${JSON.stringify(
                            signTestData.result,
                            null,
                            2
                          )}`;
                          try {
                            const response = await fetch(
                              "http://localhost:4000/generate",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ prompt }),
                              }
                            );
                            const data = await response.json();
                            setSignTestExplanation(
                              data.generatedText || "No explanation received."
                            );
                          } catch (error) {
                            setSignTestExplanation(
                              "Failed to get explanation."
                            );
                          }
                          setSignTestExplaining(false);
                        }}
                      >
                        <FaMagic style={{ marginRight: 6 }} />
                        {signTestExplaining
                          ? "Explaining..."
                          : "Explain Results"}
                      </button>
                      {signTestExplanation && (
                        <div className="test-explanation">
                          <h3 className="explanation-header">
                            <FaMagic
                              style={{ marginRight: 8, color: "#10b981" }}
                            />
                            Explanation using AI
                          </h3>
                          <ExplanationTypewriter text={signTestExplanation} />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Ranked Sign-Test SubTab */}
            {activeSubTab === "rankedSign" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  Ranked Sign Test
                </h2>
                <div className="test-controls">
                  <button
                    onClick={() => {
                      if (selectedColumns.length !== 2) {
                        alert(
                          "Please select exactly two columns for Ranked Sign test."
                        );
                        return;
                      }
                      rankedSignTest(selectedColumns);
                    }}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run Ranked Sign Test
                  </button>
                </div>
                {rankedSignTestData && rankedSignTestData.result && (
                  <>
                    <div style={{ marginTop: "2rem" }}>
                      <h3>
                        <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                        Ranked Sign Test Results
                      </h3>
                      <table className="t-test-table">
                        <thead>
                          <tr>
                            <th>Statistic</th>
                            <th>p-Value</th>
                            <th>Significant</th>
                            <th>Positive Rank Sum</th>
                            <th>Negative Rank Sum</th>
                            <th>Ties</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {typeof rankedSignTestData.result.statistic ===
                              "number"
                                ? rankedSignTestData.result.statistic.toFixed(3)
                                : rankedSignTestData.result.statistic}
                            </td>
                            <td>
                              {typeof rankedSignTestData.result.pValue ===
                              "number"
                                ? rankedSignTestData.result.pValue.toExponential(
                                    6
                                  )
                                : rankedSignTestData.result.pValue}
                            </td>
                            <td>
                              {String(rankedSignTestData.result.significant)}
                            </td>
                            <td>{rankedSignTestData.result.positiveRankSum}</td>
                            <td>{rankedSignTestData.result.negativeRankSum}</td>
                            <td>{rankedSignTestData.result.ties}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                }}
                                onClick={() => setRankedSignTestData(null)}
                                title="Delete"
                              >
                                <FaTrash style={{ marginRight: 6 }} />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        className="run-test-button"
                        disabled={rankedSignTestExplaining}
                        onClick={async () => {
                          setRankedSignTestExplaining(true);
                          setRankedSignTestExplanation("");
                          const prompt = `Explain the following ranked sign test results in simple terms in three lines:\n${JSON.stringify(
                            rankedSignTestData.result,
                            null,
                            2
                          )}`;
                          try {
                            const response = await fetch(
                              "http://localhost:4000/generate",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ prompt }),
                              }
                            );
                            const data = await response.json();
                            setRankedSignTestExplanation(
                              data.generatedText || "No explanation received."
                            );
                          } catch (error) {
                            setRankedSignTestExplanation(
                              "Failed to get explanation."
                            );
                          }
                          setRankedSignTestExplaining(false);
                        }}
                      >
                        <FaMagic style={{ marginRight: 6 }} />
                        {rankedSignTestExplaining
                          ? "Explaining..."
                          : "Explain Results"}
                      </button>
                      {rankedSignTestExplanation && (
                        <div className="test-explanation">
                          <h3 className="explanation-header">
                            <FaMagic
                              style={{ marginRight: 8, color: "#10b981" }}
                            />
                            Explanation using AI
                          </h3>
                          <ExplanationTypewriter text={rankedSignTestExplanation} />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* U-Test SubTab */}
            {activeSubTab === "u-test" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  U-Test
                </h2>
                <div className="test-controls">
                  <button
                    onClick={() => {
                      if (selectedColumns.length !== 2) {
                        alert("Please select exactly two columns for U-Test.");
                        return;
                      }
                      uTest(selectedColumns);
                    }}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run U-Test
                  </button>
                </div>
                {uTestData && uTestData.result && (
                  <>
                    <div style={{ marginTop: "2rem" }}>
                      <h3>
                        <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                        U-Test Results
                      </h3>
                      <table className="t-test-table">
                        <thead>
                          <tr>
                            <th>U</th>
                            <th>U1</th>
                            <th>U2</th>
                            <th>p-Value</th>
                            <th>Significant</th>
                            <th>n1</th>
                            <th>n2</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{uTestData.result.U}</td>
                            <td>{uTestData.result.U1}</td>
                            <td>{uTestData.result.U2}</td>
                            <td>{uTestData.result.pValue}</td>
                            <td>{String(uTestData.result.significant)}</td>
                            <td>{uTestData.result.n1}</td>
                            <td>{uTestData.result.n2}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                }}
                                onClick={() => setUTestData(null)}
                                title="Delete"
                              >
                                <FaTrash style={{ marginRight: 6 }} />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        className="run-test-button"
                        disabled={uTestExplaining}
                        onClick={async () => {
                          setUTestExplaining(true);
                          setUTestExplanation("");
                          const prompt = `Explain the following U-Test results in simple terms in three lines:\n${JSON.stringify(
                            uTestData.result,
                            null,
                            2
                          )}`;
                          try {
                            const response = await fetch(
                              "http://localhost:4000/generate",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ prompt }),
                              }
                            );
                            const data = await response.json();
                            setUTestExplanation(
                              data.generatedText || "No explanation received."
                            );
                          } catch (error) {
                            setUTestExplanation("Failed to get explanation.");
                          }
                          setUTestExplaining(false);
                        }}
                      >
                        <FaMagic style={{ marginRight: 6 }} />
                        {uTestExplaining ? "Explaining..." : "Explain Results"}
                      </button>
                      {uTestExplanation && (
                        <div className="test-explanation">
                          <h3 className="explanation-header">
                            <FaMagic
                              style={{ marginRight: 8, color: "#10b981" }}
                            />
                            Explanation using AI
                          </h3>
                          <ExplanationTypewriter text={uTestExplanation} />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Chi-Square Test SubTab */}
            {activeSubTab === "chi-square" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  Chi-Square Test
                </h2>
                <div className="test-parameters">
                  <div className="test-param-item">
                    <label>Alpha Level:</label>
                    <input
                      type="number"
                      step="0.01"
                      value={chiSquareAlpha}
                      onChange={(e) =>
                        setChiSquareAlpha(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="test-param-item">
                    <label>Test Type:</label>
                    <select
                      value={chiSquareTestType}
                      onChange={(e) => setChiSquareTestType(e.target.value)}
                    >
                      <option value="independence">Test of Independence</option>
                      <option value="goodness-of-fit">Goodness of Fit</option>
                    </select>
                  </div>
                </div>
                <div className="test-controls">
                  <button
                    onClick={() => {
                      if (chiSquareTestType === "independence" && selectedColumns.length !== 2) {
                        alert("Please select exactly two columns for Chi-Square test of independence.");
                        return;
                      }
                      if (chiSquareTestType === "goodness-of-fit" && selectedColumns.length !== 1) {
                        alert("Please select exactly one column for Chi-Square goodness of fit test.");
                        return;
                      }
                      const type = chiSquareTestType === "goodness-of-fit" ? "goodness-of-fit" : chiSquareTestType;
                      chiSquareTest(selectedColumns, type);
                    }}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run Chi-Square Test
                  </button>
                </div>
                {chiSquareData && chiSquareData.length > 0 && (
                  <div className="t-test-results">
                    <table className="t-test-table">
                      <thead>
                        <tr>
                          <th>Test Type</th>
                          <th>Columns</th>
                          <th>Chi-Square Statistic</th>
                          <th>p-Value</th>
                          <th>Degrees of Freedom</th>
                          <th>Decision</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chiSquareData.map((result) => (
                          <tr key={result.id}>
                            <td>{result.testType === "independence" ? "Independence" : "Goodness of Fit"}</td>
                            <td>{Array.isArray(result.columns) ? result.columns.join(", ") : result.columns}</td>
                            <td>{result.chiSquareStatistic?.toFixed(4) ?? result.statistic?.toFixed(4) ?? ""}</td>
                            <td>{result.pValue?.toFixed(4) ?? ""}</td>
                            <td>{result.degreesOfFreedom ?? result.df ?? ""}</td>
                            <td>{result.decision ?? result.result ?? ""}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                }}
                                onClick={() =>
                                  handleDeleteChiSquare(result.id)
                                }
                                title="Delete"
                              >
                                <FaTrash style={{ marginRight: 6 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {data &&
                  selectedColumns.length > 0 &&
                  activeSubTab === "chi-square" && (
                    <HistogramChart data={data} columns={selectedColumns} />
                  )}
                {chiSquareData && chiSquareData.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      className="run-test-button"
                      disabled={chiSquareExplaining}
                      onClick={async () => {
                        setChiSquareExplaining(true);
                        setChiSquareExplanation("");
                        const prompt = `Explain the following Chi-Square test results in simple terms in three lines:\n${JSON.stringify(
                          chiSquareData,
                          null,
                          2
                        )}`;
                        try {
                          const response = await fetch(
                            "http://localhost:4000/generate",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ prompt }),
                            }
                          );
                          const data = await response.json();
                          setChiSquareExplanation(
                            data.generatedText || "No explanation received."
                          );
                        } catch (error) {
                          setChiSquareExplanation("Failed to get explanation.");
                        }
                        setChiSquareExplaining(false);
                      }}
                    >
                      <FaMagic style={{ marginRight: 6 }} />
                      {chiSquareExplaining ? "Explaining..." : "Explain Results"}
                    </button>
                    {chiSquareExplanation && (
                      <div className="test-explanation">
                        <h3 className="explanation-header">
                          <FaMagic
                            style={{ marginRight: 8, color: "#10b981" }}
                          />
                          Explanation using AI
                        </h3>
                        <ExplanationTypewriter text={chiSquareExplanation} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Z-Test SubTab */}
            {activeSubTab === "z-test" && (
              <div className="tab-content">
                <h2>
                  <FaFlask style={{ marginRight: 8, color: "#6366f1" }} />
                  Z-Test Analysis
                </h2>
                <div className="test-parameters">
                  <div className="test-param-item">
                    <label>Alpha Level:</label>
                    <input
                      type="number"
                      step="0.01"
                      value={zTestAlpha}
                      onChange={(e) =>
                        setZTestAlpha(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="test-param-item">
                    <label>Alternative:</label>
                    <select
                      value={zTestAlternative}
                      onChange={(e) => setZTestAlternative(e.target.value)}
                    >
                      <option value="two-tailed">Two-tailed</option>
                      <option value="less">Less</option>
                      <option value="greater">Greater</option>
                    </select>
                  </div>
                  <div className="test-param-item">
                    <label>Population Mean:</label>
                    <input
                      type="number"
                      value={zTestPopulationMean}
                      onChange={(e) =>
                        setZTestPopulationMean(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="test-param-item">
                    <label>Population Std Dev:</label>
                    <input
                      type="number"
                      value={zTestPopulationStdDev}
                      onChange={(e) =>
                        setZTestPopulationStdDev(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="test-controls">
                  <button
                    onClick={() => {
                      if (selectedColumns.length === 0) {
                        alert("Please select at least one column.");
                        return;
                      }
                      const params = {
                        alpha: zTestAlpha,
                        alternative: zTestAlternative,
                        populationMean: zTestPopulationMean,
                        populationStdDev: zTestPopulationStdDev,
                      };
                      selectedColumns.forEach((column) =>
                        zTest(column, params)
                      );
                    }}
                    className="run-test-button"
                  >
                    <FaPlay style={{ marginRight: 6 }} /> Run Z-Test
                  </button>
                </div>
                {zTestData && zTestData.length > 0 && (
                  <div className="t-test-results">
                    <table className="t-test-table">
                      <thead>
                        <tr>
                          <th>Column</th>
                          <th>Z-Statistic</th>
                          <th>p-Value</th>
                          <th>Decision</th>
                          <th>Sample Mean</th>
                          <th>Sample Size</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {zTestData.map((result) => (
                          <tr key={result.id}>
                            <td>{result.column}</td>
                            <td>{result.zStatistic?.toFixed(3) ?? result.zValue?.toFixed(3) ?? ""}</td>
                            <td>{result.pValue?.toFixed(3) ?? ""}</td>
                            <td>{result.decision ?? result.result ?? ""}</td>
                            <td>{result.sampleMean?.toFixed(3) ?? ""}</td>
                            <td>{result.sampleSize ?? result.n ?? ""}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                }}
                                onClick={() =>
                                  handleDeleteZTest(result.id)
                                }
                                title="Delete"
                              >
                                <FaTrash style={{ marginRight: 6 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {data &&
                  selectedColumns.length > 0 &&
                  activeSubTab === "z-test" && (
                    <HistogramChart data={data} columns={selectedColumns} />
                  )}
                {zTestData && zTestData.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      className="run-test-button"
                      disabled={zTestExplaining}
                      onClick={async () => {
                        setZTestExplaining(true);
                        setZTestExplanation("");
                        const prompt = `Explain the following Z-test results in simple terms in three lines:\n${JSON.stringify(
                          zTestData,
                          null,
                          2
                        )}`;
                        try {
                          const response = await fetch(
                            "http://localhost:4000/generate",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ prompt }),
                            }
                          );
                          const data = await response.json();
                          setZTestExplanation(
                            data.generatedText || "No explanation received."
                          );
                        } catch (error) {
                          setZTestExplanation("Failed to get explanation.");
                        }
                        setZTestExplaining(false);
                      }}
                    >
                      <FaMagic style={{ marginRight: 6 }} />
                      {zTestExplaining ? "Explaining..." : "Explain Results"}
                    </button>
                    {zTestExplanation && (
                      <div className="test-explanation">
                        <h3 className="explanation-header">
                          <FaMagic
                            style={{ marginRight: 8, color: "#10b981" }}
                          />
                          Explanation using AI
                        </h3>
                        <ExplanationTypewriter text={zTestExplanation} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        </div>
      </div>
    )
  );
}

StatsPanel.propTypes = {
  activeTab: PropTypes.string.isRequired,
  activeSubTab: PropTypes.string.isRequired,
  setActiveSubTab: PropTypes.func.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  selectedStats: PropTypes.object.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  animatingStats: PropTypes.object.isRequired,
  data: PropTypes.array,
  chartType: PropTypes.string.isRequired,
  setChartType: PropTypes.func.isRequired,
  singleTTest: PropTypes.func.isRequired,
  tTestData: PropTypes.array.isRequired,
  setTTestData: PropTypes.func.isRequired,
  kolmogorovTest: PropTypes.func.isRequired,
  kolmogorovData: PropTypes.array.isRequired,
  handleDeleteKolmogorov: PropTypes.func.isRequired,
  anovaTest: PropTypes.func.isRequired,
  anovaData: PropTypes.array.isRequired,
  handleDeleteAnova: PropTypes.func.isRequired,
  signTest: PropTypes.func.isRequired,
  signTestData: PropTypes.object,
  setSignTestData: PropTypes.func.isRequired,
  rankedSignTest: PropTypes.func.isRequired,
  rankedSignTestData: PropTypes.object,
  setRankedSignTestData: PropTypes.func.isRequired,
  tTestAlpha: PropTypes.number.isRequired,
  setTTestAlpha: PropTypes.func.isRequired,
  tTestAlternative: PropTypes.string.isRequired,
  setTTestAlternative: PropTypes.func.isRequired,
  tTestPopulationMean: PropTypes.number.isRequired,
  setTTestPopulationMean: PropTypes.func.isRequired,
  uTest: PropTypes.func.isRequired,
  uTestData: PropTypes.object,
  setUTestData: PropTypes.func.isRequired,
  chiSquareTest: PropTypes.func.isRequired,
  chiSquareData: PropTypes.array.isRequired,
  setChiSquareData: PropTypes.func.isRequired,
  handleDeleteChiSquare: PropTypes.func.isRequired,
  chiSquareAlpha: PropTypes.number.isRequired,
  setChiSquareAlpha: PropTypes.func.isRequired,
  chiSquareTestType: PropTypes.string.isRequired,
  setChiSquareTestType: PropTypes.func.isRequired,
  zTest: PropTypes.func.isRequired,
  zTestData: PropTypes.array.isRequired,
  setZTestData: PropTypes.func.isRequired,
  handleDeleteZTest: PropTypes.func.isRequired,
  zTestAlpha: PropTypes.number.isRequired,
  setZTestAlpha: PropTypes.func.isRequired,
  zTestAlternative: PropTypes.string.isRequired,
  setZTestAlternative: PropTypes.func.isRequired,
  zTestPopulationMean: PropTypes.number.isRequired,
  setZTestPopulationMean: PropTypes.func.isRequired,
  zTestPopulationStdDev: PropTypes.number.isRequired,
  setZTestPopulationStdDev: PropTypes.func.isRequired,
};

export default StatsPanel;
