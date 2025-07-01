import { useState } from "react";
import PropTypes from "prop-types";
import StatCard from "./StatCard";
import ChartDisplay from "./ChartDisplay";
import HistogramChart from "./HistogramChart";
import { ExplanationTypewriter } from "./Typewriter";
import { FaFlask, FaMagic, FaTrash, FaPlay } from "react-icons/fa";
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
  tTestType,
  setTTestType,

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
  handleDeleteChiSquare,
  chiSquareAlpha,
  setChiSquareAlpha,
  chiSquareTestType,
  setChiSquareTestType,
  zTest,
  zTestData,
  handleDeleteZTest,
  zTestAlpha,
  setZTestAlpha,
  zTestAlternative,
  setZTestAlternative,
  zTestPopulationMean,
  setZTestPopulationMean,
  zTestPopulationStdDev,
  setZTestPopulationStdDev,
  zTestType,
  setZTestType,
  zTestPopulationMean1,
  setZTestPopulationMean1,
  zTestPopulationMean2,
  setZTestPopulationMean2,
  zTestPopulationStdDev1,
  setZTestPopulationStdDev1,
  zTestPopulationStdDev2,
  setZTestPopulationStdDev2,
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
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    T-Test Analysis
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    {tTestType === "single" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          alignItems: "stretch",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--primary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Null Hypothesis (H₀)
                            </h3>
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              μ = μ₀ (The population mean is equal to a
                              specified value.)
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--secondary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Alternative Hypothesis (H₁)
                            </h3>
                            {tTestAlternative === "two-tailed" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ ≠ μ₀
                              </p>
                            )}
                            {tTestAlternative === "less" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ &lt; μ₀
                              </p>
                            )}
                            {tTestAlternative === "greater" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ &gt; μ₀
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {tTestType === "independent" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          alignItems: "stretch",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--primary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Null Hypothesis (H₀)
                            </h3>
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              μ₁ = μ₂ (The two population means are equal.)
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--secondary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Alternative Hypothesis (H₁)
                            </h3>
                            {tTestAlternative === "two-tailed" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ₁ ≠ μ₂
                              </p>
                            )}
                            {tTestAlternative === "less" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ₁ &lt; μ₂
                              </p>
                            )}
                            {tTestAlternative === "greater" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ₁ &gt; μ₂
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {tTestType === "paired" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          alignItems: "stretch",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--primary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Null Hypothesis (H₀)
                            </h3>
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              μd = 0 (The mean of the differences between paired
                              observations is zero.)
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--secondary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Alternative Hypothesis (H₁)
                            </h3>
                            {tTestAlternative === "two-tailed" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μd ≠ 0
                              </p>
                            )}
                            {tTestAlternative === "less" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μd &lt; 0
                              </p>
                            )}
                            {tTestAlternative === "greater" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μd &gt; 0
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="test-parameters">
                    <div className="test-param-item">
                      <label>Test Type:</label>
                      <select
                        value={tTestType}
                        onChange={(e) => setTTestType(e.target.value)}
                      >
                        <option value="single">Single Sample</option>
                        <option value="paired">Paired Sample</option>
                        <option value="independent">Independent Sample</option>
                      </select>
                    </div>
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
                    {tTestType === "single" && (
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
                    )}
                  </div>
                  <div className="test-controls">
                    <button
                      onClick={() => {
                        if (selectedColumns.length === 0) {
                          alert("Please select at least one column.");
                          return;
                        }

                        // Validate column selection based on test type
                        if (
                          tTestType === "single" &&
                          selectedColumns.length !== 1
                        ) {
                          alert(
                            "Single sample t-test requires exactly 1 column."
                          );
                          return;
                        }
                        if (
                          (tTestType === "paired" ||
                            tTestType === "independent") &&
                          selectedColumns.length !== 2
                        ) {
                          alert(
                            `${
                              tTestType === "paired" ? "Paired" : "Independent"
                            } sample t-test requires exactly 2 columns.`
                          );
                          return;
                        }

                        const params = {
                          alpha: tTestAlpha,
                          alternative: tTestAlternative,
                          ...(tTestType === "single" && {
                            populationMean: tTestPopulationMean,
                          }),
                        };
                        singleTTest(selectedColumns, params);
                      }}
                      className="run-test-button"
                    >
                      <FaPlay style={{ marginRight: 6 }} /> Run T-Test
                    </button>
                  </div>
                  {tTestData && tTestData.length > 0 && (
                    <div
                      style={{
                        maxWidth: "100%",
                        overflowX: "auto",
                        border: "1px solid var(--border-color)",
                        borderRadius: 8,
                        margin: "1rem 0",
                        boxShadow: "0 2px 8px var(--shadow-color)",
                        background: "var(--background-color)",
                        padding: "1rem",
                      }}
                    >
                      <table className="t-test-table" style={{ minWidth: 900 }}>
                        <thead>
                          <tr>
                            <th>Test Type</th>
                            <th>Columns</th>
                            <th>t-Statistic</th>
                            <th>p-Value</th>
                            <th>Decision</th>
                            <th>Degrees of Freedom</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tTestData.map((result) => (
                            <tr key={result.id}>
                              <td>
                                {result.testType === "single"
                                  ? "Single Sample"
                                  : result.testType === "paired"
                                  ? "Paired Sample"
                                  : result.testType === "independent"
                                  ? "Independent Sample"
                                  : "Unknown"}
                              </td>
                              <td>
                                {Array.isArray(result.columns)
                                  ? result.columns.join(", ")
                                  : result.columns}
                              </td>
                              <td>
                                {result.tStatistic?.toFixed(3) ??
                                  result.tValue?.toFixed(3) ??
                                  ""}
                              </td>
                              <td>{result.pValue?.toFixed(3) ?? ""}</td>
                              <td>{result.decision ?? result.result ?? ""}</td>
                              <td>
                                {result.degreesOfFreedom ?? result.df ?? ""}
                              </td>
                              <td>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#ef4444",
                                  }}
                                  onClick={() => handleDeleteTTest(result.id)}
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
                          } catch {
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
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    Kolmogorov-Smirnov Test
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "stretch",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--primary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Null Hypothesis (H₀)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The data follows a normal distribution (the sample
                            comes from a normally distributed population).
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--secondary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Alternative Hypothesis (H₁)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The data does not follow a normal distribution (the
                            sample does not come from a normally distributed
                            population).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <div
                      style={{
                        maxWidth: "100%",
                        overflowX: "auto",
                        border: "1px solid var(--border-color)",
                        borderRadius: 8,
                        margin: "1rem 0",
                        boxShadow: "0 2px 8px var(--shadow-color)",
                        background: "var(--background-color)",
                        padding: "1rem",
                      }}
                    >
                      <table className="t-test-table" style={{ minWidth: 900 }}>
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
                              <td>
                                {result.isNormal
                                  ? "Normal Distribution"
                                  : "Not Normal Distribution"}
                              </td>
                              <td>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#ef4444",
                                  }}
                                  onClick={() =>
                                    handleDeleteKolmogorov(result.id)
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
                          } catch {
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
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    ANOVA Test
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "1rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <b>Instructions:</b> Select <b>2 columns</b> (first:
                      factor, second: value) for one-way ANOVA, or{" "}
                      <b>3 columns</b> (first & second: factors, third: value)
                      for two-way ANOVA.
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "stretch",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--primary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Null Hypothesis (H₀)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            All group means are equal (μ₁ = μ₂ = μ₃ = ... = μₖ).
                            There is no significant difference between the means
                            of the groups.
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--secondary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Alternative Hypothesis (H₁)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            At least one group mean is different from the
                            others. There is a significant difference between
                            the means of at least two groups.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="test-controls">
                    <button
                      onClick={() => anovaTest(selectedColumns)}
                      className="run-test-button"
                    >
                      <FaPlay style={{ marginRight: 6 }} /> Run ANOVA Test
                    </button>
                  </div>
                  {anovaData && anovaData.length > 0 && (
                    <>
                      <div
                        style={{
                          maxWidth: "100%",
                          overflowX: "auto",
                          border: "1px solid var(--border-color)",
                          borderRadius: 8,
                          margin: "1rem 0",
                          boxShadow: "0 2px 8px var(--shadow-color)",
                          background: "var(--background-color)",
                          padding: "1rem",
                        }}
                      >
                        <table
                          className="t-test-results t-test-table"
                          style={{ minWidth: 900 }}
                        >
                          <thead>
                            <tr>
                              {/* For two-way ANOVA, show Source column */}
                              <th>Columns</th>
                              <th>Source</th>
                              <th>DF</th>
                              <th>SS</th>
                              <th>MS</th>
                              <th>F</th>
                              <th>p</th>
                              <th>Decision</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {anovaData.map((result) => {
                              // Two-way ANOVA
                              if (
                                result.FactorA &&
                                result.FactorB &&
                                result.Interaction
                              ) {
                                return [
                                  <tr key={result.id + "-A"}>
                                    <td rowSpan={5}>
                                      {result.columns &&
                                        result.columns.join(", ")}
                                    </td>
                                    <td>{`Factor A (${
                                      Array.isArray(result.FactorA.name)
                                        ? result.FactorA.name.join(", ")
                                        : result.FactorA.name
                                    })`}</td>
                                    <td>{result.FactorA.df}</td>
                                    <td>{result.FactorA.SS?.toFixed(4)}</td>
                                    <td>{result.FactorA.MS?.toFixed(4)}</td>
                                    <td>{result.FactorA.F?.toFixed(4)}</td>
                                    <td>
                                      {result.FactorA.p?.toExponential(4)}
                                    </td>
                                    <td>{result.FactorA.decision}</td>
                                    <td rowSpan={5}>
                                      <button
                                        style={{
                                          background: "none",
                                          border: "none",
                                          cursor: "pointer",
                                          color: "#ef4444",
                                        }}
                                        onClick={() =>
                                          handleDeleteAnova(result.id)
                                        }
                                        title="Delete"
                                      >
                                        <FaTrash style={{ marginRight: 6 }} />
                                      </button>
                                    </td>
                                  </tr>,
                                  <tr key={result.id + "-B"}>
                                    <td>{`Factor B (${
                                      Array.isArray(result.FactorB.name)
                                        ? result.FactorB.name.join(", ")
                                        : result.FactorB.name
                                    })`}</td>
                                    <td>{result.FactorB.df}</td>
                                    <td>{result.FactorB.SS?.toFixed(4)}</td>
                                    <td>{result.FactorB.MS?.toFixed(4)}</td>
                                    <td>{result.FactorB.F?.toFixed(4)}</td>
                                    <td>
                                      {result.FactorB.p?.toExponential(4)}
                                    </td>
                                    <td>{result.FactorB.decision}</td>
                                  </tr>,
                                  <tr key={result.id + "-I"}>
                                    <td>Interaction</td>
                                    <td>{result.Interaction.df}</td>
                                    <td>{result.Interaction.SS?.toFixed(4)}</td>
                                    <td>{result.Interaction.MS?.toFixed(4)}</td>
                                    <td>{result.Interaction.F?.toFixed(4)}</td>
                                    <td>
                                      {result.Interaction.p?.toExponential(4)}
                                    </td>
                                    <td>{result.Interaction.decision}</td>
                                  </tr>,
                                  <tr key={result.id + "-E"}>
                                    <td>Error</td>
                                    <td>{result.Error.df}</td>
                                    <td>{result.Error.SS?.toFixed(4)}</td>
                                    <td>{result.Error.MS?.toFixed(4)}</td>
                                    <td colSpan={4}></td>
                                  </tr>,
                                  <tr key={result.id + "-T"}>
                                    <td>Total</td>
                                    <td>{result.Total.df}</td>
                                    <td>{result.Total.SS?.toFixed(4)}</td>
                                    <td colSpan={5}></td>
                                  </tr>,
                                ];
                              }
                              // One-way ANOVA (new structure)
                              if (
                                result.between &&
                                result.within &&
                                result.total
                              ) {
                                return [
                                  <tr key={result.id + "-between"}>
                                    <td rowSpan={3}>
                                      {result.columns &&
                                        result.columns.join(", ")}
                                    </td>
                                    <td>{result.between.source}</td>
                                    <td>{result.between.df}</td>
                                    <td>{result.between.SS?.toFixed(4)}</td>
                                    <td>{result.between.MS?.toFixed(4)}</td>
                                    <td>{result.between.F?.toFixed(4)}</td>
                                    <td>
                                      {result.between.p?.toExponential(4)}
                                    </td>
                                    <td>{result.between.decision}</td>
                                    <td rowSpan={3}>
                                      <button
                                        style={{
                                          background: "none",
                                          border: "none",
                                          cursor: "pointer",
                                          color: "#ef4444",
                                        }}
                                        onClick={() =>
                                          handleDeleteAnova(result.id)
                                        }
                                        title="Delete"
                                      >
                                        <FaTrash style={{ marginRight: 6 }} />
                                      </button>
                                    </td>
                                  </tr>,
                                  <tr key={result.id + "-within"}>
                                    <td>{result.within.source}</td>
                                    <td>{result.within.df}</td>
                                    <td>{result.within.SS?.toFixed(4)}</td>
                                    <td>{result.within.MS?.toFixed(4)}</td>
                                    <td colSpan={5}></td>
                                  </tr>,
                                  <tr key={result.id + "-total"}>
                                    <td>{result.total.source}</td>
                                    <td>{result.total.df}</td>
                                    <td>{result.total.SS?.toFixed(4)}</td>
                                    <td colSpan={6}></td>
                                  </tr>,
                                ];
                              }
                              // fallback (old one-way)
                              return (
                                <tr key={result.id}>
                                  <td>
                                    {result.columns &&
                                      result.columns.join(", ")}
                                  </td>
                                  <td>One-way ANOVA</td>
                                  <td>{result.dfBetween}</td>
                                  <td>{result.ssb?.toFixed(4)}</td>
                                  <td>{result.msb?.toFixed(4)}</td>
                                  <td>{result.fStatistic?.toFixed(4)}</td>
                                  <td>{result.pValue?.toExponential(4)}</td>
                                  <td>{result.decision}</td>
                                  <td>
                                    <button
                                      style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "#ef4444",
                                      }}
                                      onClick={() =>
                                        handleDeleteAnova(result.id)
                                      }
                                      title="Delete"
                                    >
                                      <FaTrash style={{ marginRight: 6 }} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
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
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({ prompt }),
                                }
                              );
                              const data = await response.json();
                              setAnovaExplanation(
                                data.generatedText || "No explanation received."
                              );
                            } catch {
                              setAnovaExplanation("Failed to get explanation.");
                            }
                            setAnovaExplaining(false);
                          }}
                        >
                          <FaMagic style={{ marginRight: 6 }} />
                          {anovaExplaining
                            ? "Explaining..."
                            : "Explain Results"}
                        </button>
                        {anovaExplanation && (
                          <div className="test-explanation">
                            <ExplanationTypewriter text={anovaExplanation} />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Sign Test SubTab */}
              {activeSubTab === "sign" && (
                <div className="tab-content">
                  <h2>
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    Sign Test
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "stretch",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--primary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Null Hypothesis (H₀)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The median difference between paired observations is
                            zero (median of differences = 0). There is no
                            systematic difference between the two groups.
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--secondary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Alternative Hypothesis (H₁)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The median difference between paired observations is
                            not zero (median of differences ≠ 0). There is a
                            systematic difference between the two groups.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <div
                        style={{
                          maxWidth: "100%",
                          overflowX: "auto",
                          border: "1px solid var(--border-color)",
                          borderRadius: 8,
                          margin: "1rem 0",
                          boxShadow: "0 2px 8px var(--shadow-color)",
                          background: "var(--background-color)",
                          padding: "1rem",
                        }}
                      >
                        <table
                          className="t-test-table"
                          style={{ minWidth: 900 }}
                        >
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
                                {typeof signTestData.result.statistic ===
                                "number"
                                  ? signTestData.result.statistic.toFixed(3)
                                  : signTestData.result.statistic}
                              </td>
                              <td>
                                {typeof signTestData.result.pValue === "number"
                                  ? signTestData.result.pValue.toExponential(6)
                                  : signTestData.result.pValue}
                              </td>
                              <td>
                                {signTestData.result.significant
                                  ? "Reject H0 (Significant)"
                                  : "Fail to Reject H0 (Not Significant)"}
                              </td>
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
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({ prompt }),
                                }
                              );
                              const data = await response.json();
                              setSignTestExplanation(
                                data.generatedText || "No explanation received."
                              );
                            } catch {
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
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    Ranked Sign Test
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "stretch",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--primary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Null Hypothesis (H₀)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The median difference between paired observations is
                            zero (median of differences = 0). There is no
                            consistent difference between the two groups.
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--secondary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Alternative Hypothesis (H₁)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The median difference is not zero (median of
                            differences ≠ 0). There is a consistent difference
                            between the two groups.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <div
                        style={{
                          maxWidth: "100%",
                          overflowX: "auto",
                          border: "1px solid var(--border-color)",
                          borderRadius: 8,
                          margin: "1rem 0",
                          boxShadow: "0 2px 8px var(--shadow-color)",
                          background: "var(--background-color)",
                          padding: "1rem",
                        }}
                      >
                        <table
                          className="t-test-table"
                          style={{ minWidth: 900 }}
                        >
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
                                  ? rankedSignTestData.result.statistic.toFixed(
                                      3
                                    )
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
                                {rankedSignTestData.result.significant
                                  ? "Reject H0 (Significant)"
                                  : "Fail to Reject H0 (Not Significant)"}
                              </td>
                              <td>
                                {rankedSignTestData.result.positiveRankSum}
                              </td>
                              <td>
                                {rankedSignTestData.result.negativeRankSum}
                              </td>
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
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({ prompt }),
                                }
                              );
                              const data = await response.json();
                              setRankedSignTestExplanation(
                                data.generatedText || "No explanation received."
                              );
                            } catch {
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
                            <ExplanationTypewriter
                              text={rankedSignTestExplanation}
                            />
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
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    U-Test
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "stretch",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--primary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Null Hypothesis (H₀)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The two groups have identical distributions (F₁(x) =
                            F₂(x)). There is no difference between the two
                            independent groups.
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--secondary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Alternative Hypothesis (H₁)
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--text-primary)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                            }}
                          >
                            The two groups have different distributions (F₁(x) ≠
                            F₂(x)). There is a difference between the two
                            independent groups.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="test-controls">
                    <button
                      onClick={() => {
                        if (selectedColumns.length !== 2) {
                          alert(
                            "Please select exactly two columns for U-Test."
                          );
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
                      <div
                        style={{
                          maxWidth: "100%",
                          overflowX: "auto",
                          border: "1px solid var(--border-color)",
                          borderRadius: 8,
                          margin: "1rem 0",
                          boxShadow: "0 2px 8px var(--shadow-color)",
                          background: "var(--background-color)",
                          padding: "1rem",
                        }}
                      >
                        <table
                          className="t-test-table"
                          style={{ minWidth: 900 }}
                        >
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
                              <td>
                                {uTestData.result.significant
                                  ? "Reject H0 (Significant)"
                                  : "Fail to Reject H0 (Not Significant)"}
                              </td>
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
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({ prompt }),
                                }
                              );
                              const data = await response.json();
                              setUTestExplanation(
                                data.generatedText || "No explanation received."
                              );
                            } catch {
                              setUTestExplanation("Failed to get explanation.");
                            }
                            setUTestExplaining(false);
                          }}
                        >
                          <FaMagic style={{ marginRight: 6 }} />
                          {uTestExplaining
                            ? "Explaining..."
                            : "Explain Results"}
                        </button>
                        {uTestExplanation && (
                          <div className="test-explanation">
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
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    Chi-Square Test
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "stretch",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--primary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Null Hypothesis (H₀)
                          </h3>
                          {chiSquareTestType === "independence" ? (
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              The two variables are independent (no association
                              between the variables). The observed frequencies
                              match the expected frequencies under independence.
                            </p>
                          ) : (
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              The observed data follows the expected theoretical
                              distribution. The sample data fits the specified
                              probability distribution.
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          backgroundColor: "var(--background-color)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "120px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 1rem 0",
                              color: "var(--secondary-color)",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            Alternative Hypothesis (H₁)
                          </h3>
                          {chiSquareTestType === "independence" ? (
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              The two variables are dependent (there is an
                              association between the variables). The observed
                              frequencies differ from the expected frequencies.
                            </p>
                          ) : (
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              The observed data does not follow the expected
                              theoretical distribution. The sample data does not
                              fit the specified probability distribution.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
                        <option value="independence">
                          Test of Independence
                        </option>
                        <option value="goodness-of-fit">Goodness of Fit</option>
                      </select>
                    </div>
                  </div>
                  <div className="test-controls">
                    <button
                      onClick={() => {
                        if (
                          chiSquareTestType === "independence" &&
                          selectedColumns.length !== 2
                        ) {
                          alert(
                            "Please select exactly two columns for Chi-Square test of independence."
                          );
                          return;
                        }
                        if (
                          chiSquareTestType === "goodness-of-fit" &&
                          selectedColumns.length !== 1
                        ) {
                          alert(
                            "Please select exactly one column for Chi-Square goodness of fit test."
                          );
                          return;
                        }
                        const type =
                          chiSquareTestType === "goodness-of-fit"
                            ? "goodness-of-fit"
                            : chiSquareTestType;
                        chiSquareTest(selectedColumns, type);
                      }}
                      className="run-test-button"
                    >
                      <FaPlay style={{ marginRight: 6 }} /> Run Chi-Square Test
                    </button>
                  </div>
                  {chiSquareData && chiSquareData.length > 0 && (
                    <div
                      style={{
                        maxWidth: "100%",
                        overflowX: "auto",
                        border: "1px solid var(--border-color)",
                        borderRadius: 8,
                        margin: "1rem 0",
                        boxShadow: "0 2px 8px var(--shadow-color)",
                        background: "var(--background-color)",
                        padding: "1rem",
                      }}
                    >
                      <table className="t-test-table" style={{ minWidth: 900 }}>
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
                              <td>
                                {result.testType === "independence"
                                  ? "Independence"
                                  : "Goodness of Fit"}
                              </td>
                              <td>
                                {Array.isArray(result.columns)
                                  ? result.columns.join(", ")
                                  : result.columns}
                              </td>
                              <td>
                                {result.chi2?.toFixed(4) ??
                                  result.chi2?.toFixed(4) ??
                                  ""}
                              </td>
                              <td>{result.pValue?.toFixed(4) ?? ""}</td>
                              <td>
                                {result.degreesOfFreedom ?? result.df ?? ""}
                              </td>
                              <td>
                                {result.significant
                                  ? "Reject H0 (Significant)"
                                  : "Fail to Reject H0 (Not Significant)"}
                              </td>
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
                          } catch {
                            setChiSquareExplanation(
                              "Failed to get explanation."
                            );
                          }
                          setChiSquareExplaining(false);
                        }}
                      >
                        <FaMagic style={{ marginRight: 6 }} />
                        {chiSquareExplaining
                          ? "Explaining..."
                          : "Explain Results"}
                      </button>
                      {chiSquareExplanation && (
                        <div className="test-explanation">
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
                    <FaFlask
                      style={{
                        marginRight: 8,
                        color: "var(--flask-icon-color)",
                      }}
                    />
                    Z-Test Analysis
                  </h2>
                  <div
                    className="hypothesis-display"
                    style={{
                      margin: "1rem 0",
                      padding: "1.5rem",
                      backgroundColor: "var(--surface-color)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 2px 12px var(--shadow-color)",
                    }}
                  >
                    {zTestType === "single" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          alignItems: "stretch",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--primary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Null Hypothesis (H₀)
                            </h3>
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              μ = μ₀ (The population mean is equal to a
                              specified value.)
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--secondary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Alternative Hypothesis (H₁)
                            </h3>
                            {zTestAlternative === "two-tailed" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ ≠ μ₀
                              </p>
                            )}
                            {zTestAlternative === "less" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ &lt; μ₀
                              </p>
                            )}
                            {zTestAlternative === "greater" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ &gt; μ₀
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {zTestType === "two-sample" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          alignItems: "stretch",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--primary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Null Hypothesis (H₀)
                            </h3>
                            <p
                              style={{
                                margin: 0,
                                color: "var(--text-primary)",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              μ₁ = μ₂ (The two population means are equal.)
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            padding: "1.5rem",
                            backgroundColor: "var(--background-color)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "120px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin: "0 0 1rem 0",
                                color: "var(--secondary-color)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Alternative Hypothesis (H₁)
                            </h3>
                            {zTestAlternative === "two-tailed" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ₁ ≠ μ₂
                              </p>
                            )}
                            {zTestAlternative === "less" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ₁ &lt; μ₂
                              </p>
                            )}
                            {zTestAlternative === "greater" && (
                              <p
                                style={{
                                  margin: 0,
                                  color: "var(--text-primary)",
                                  fontSize: "0.95rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                μ₁ &gt; μ₂
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="test-parameters">
                    <div className="test-param-item">
                      <label>Test Type:</label>
                      <select
                        value={zTestType}
                        onChange={(e) => setZTestType(e.target.value)}
                      >
                        <option value="single">Single Sample</option>
                        <option value="two-sample">Two Sample</option>
                      </select>
                    </div>
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
                    {zTestType === "single" ? (
                      <>
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
                              setZTestPopulationStdDev(
                                parseFloat(e.target.value)
                              )
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="test-param-item">
                          <label>Population Mean 1:</label>
                          <input
                            type="number"
                            value={zTestPopulationMean1}
                            onChange={(e) =>
                              setZTestPopulationMean1(
                                parseFloat(e.target.value)
                              )
                            }
                          />
                        </div>
                        <div className="test-param-item">
                          <label>Population Mean 2:</label>
                          <input
                            type="number"
                            value={zTestPopulationMean2}
                            onChange={(e) =>
                              setZTestPopulationMean2(
                                parseFloat(e.target.value)
                              )
                            }
                          />
                        </div>
                        <div className="test-param-item">
                          <label>Population Std Dev 1:</label>
                          <input
                            type="number"
                            value={zTestPopulationStdDev1}
                            onChange={(e) =>
                              setZTestPopulationStdDev1(
                                parseFloat(e.target.value)
                              )
                            }
                          />
                        </div>
                        <div className="test-param-item">
                          <label>Population Std Dev 2:</label>
                          <input
                            type="number"
                            value={zTestPopulationStdDev2}
                            onChange={(e) =>
                              setZTestPopulationStdDev2(
                                parseFloat(e.target.value)
                              )
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="test-controls">
                    <button
                      onClick={() => {
                        if (selectedColumns.length === 0) {
                          alert("Please select at least one column.");
                          return;
                        }
                        if (
                          zTestType === "two-sample" &&
                          selectedColumns.length !== 2
                        ) {
                          alert(
                            "Please select exactly two columns for two-sample Z-test."
                          );
                          return;
                        }
                        if (
                          zTestType === "single" &&
                          selectedColumns.length !== 1
                        ) {
                          alert(
                            "Please select exactly one column for single sample Z-test."
                          );
                          return;
                        }
                        zTest(selectedColumns);
                      }}
                      className="run-test-button"
                    >
                      <FaPlay style={{ marginRight: 6 }} /> Run Z-Test
                    </button>
                  </div>
                  {zTestData && zTestData.length > 0 && (
                    <div
                      style={{
                        maxWidth: "100%",
                        overflowX: "auto",
                        border: "1px solid var(--border-color)",
                        borderRadius: 8,
                        margin: "1rem 0",
                        boxShadow: "0 2px 8px var(--shadow-color)",
                        background: "var(--background-color)",
                        padding: "1rem",
                      }}
                    >
                      <table className="t-test-table" style={{ minWidth: 900 }}>
                        <thead>
                          <tr>
                            <th>Test Type</th>
                            <th>Columns</th>
                            <th>Z-Statistic</th>
                            <th>p-Value</th>
                            <th>Decision</th>
                            <th>Sample Mean(s)</th>
                            <th>Sample Size(s)</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {zTestData.map((result) => (
                            <tr key={result.id}>
                              <td>
                                {result.testType === "single"
                                  ? "Single Sample"
                                  : "Two Sample"}
                              </td>
                              <td>
                                {Array.isArray(result.columns)
                                  ? result.columns.join(" vs ")
                                  : result.column || result.columns}
                              </td>
                              <td>
                                {result.zStatistic?.toFixed(3) ??
                                  result.zValue?.toFixed(3) ??
                                  ""}
                              </td>
                              <td>{result.pValue?.toFixed(3) ?? ""}</td>
                              <td>{result.decision ?? result.result ?? ""}</td>
                              <td>
                                {result.testType === "single"
                                  ? result.sampleMean?.toFixed(3) ?? ""
                                  : (result.mean1?.toFixed(3) ?? "") +
                                    " - " +
                                    (result.mean2?.toFixed(3) ?? "")}
                              </td>
                              <td>
                                {result.testType === "single"
                                  ? result.sampleSize ?? result.n ?? ""
                                  : (result.sampleSize1 ?? result.n1 ?? "") +
                                    " - " +
                                    (result.sampleSize2 ?? result.n2 ?? "")}
                              </td>
                              <td>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#ef4444",
                                  }}
                                  onClick={() => handleDeleteZTest(result.id)}
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
                          } catch {
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
  tTestType: PropTypes.string.isRequired,
  setTTestType: PropTypes.func.isRequired,
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
  handleDeleteChiSquare: PropTypes.func.isRequired,
  chiSquareAlpha: PropTypes.number.isRequired,
  setChiSquareAlpha: PropTypes.func.isRequired,
  chiSquareTestType: PropTypes.string.isRequired,
  setChiSquareTestType: PropTypes.func.isRequired,
  zTest: PropTypes.func.isRequired,
  zTestData: PropTypes.array.isRequired,
  handleDeleteZTest: PropTypes.func.isRequired,
  zTestAlpha: PropTypes.number.isRequired,
  setZTestAlpha: PropTypes.func.isRequired,
  zTestAlternative: PropTypes.string.isRequired,
  setZTestAlternative: PropTypes.func.isRequired,
  zTestPopulationMean: PropTypes.number.isRequired,
  setZTestPopulationMean: PropTypes.func.isRequired,
  zTestPopulationStdDev: PropTypes.number.isRequired,
  setZTestPopulationStdDev: PropTypes.func.isRequired,
  zTestType: PropTypes.string.isRequired,
  setZTestType: PropTypes.func.isRequired,
  zTestPopulationMean1: PropTypes.number.isRequired,
  setZTestPopulationMean1: PropTypes.func.isRequired,
  zTestPopulationMean2: PropTypes.number.isRequired,
  setZTestPopulationMean2: PropTypes.func.isRequired,
  zTestPopulationStdDev1: PropTypes.number.isRequired,
  setZTestPopulationStdDev1: PropTypes.func.isRequired,
  zTestPopulationStdDev2: PropTypes.number.isRequired,
  setZTestPopulationStdDev2: PropTypes.func.isRequired,
};

export default StatsPanel;
