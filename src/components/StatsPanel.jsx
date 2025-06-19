import StatCard from "./StatCard";
import ChartDisplay from "./ChartDisplay";
import HypothesisTest from "./HypothesisTest";
// import {handleDeleteTTest} from "../App"

function StatsPanel({
  activeTab,
  setActiveTab,
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

  signTest,
  signTestData,
  setSignTestData,

  rankedSignTest,
  rankedSignTestData,
  setRankedSignTestData,
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

  const ColumnStatistics = ({ columnName }) => (
    <div className="column-statistics">
      <div className="column-header">
        <h2>Statistics for "{columnName}"</h2>
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

  return (
    selectedColumns.length > 0 && (
      <div className="stats-container">
        <div className="tabs">
          {/* Descriptive Statistics Tabs */}
          {activeTab === "descriptive" && (
            <>
              <button
                className={`tab-button ${
                  activeTab === "descriptive" ? "active" : ""
                }`}
                onClick={() => setActiveTab("descriptive")}
              >
                Descriptive Statistics
              </button>
              <button
                className={`tab-button ${
                  activeTab === "visualization" ? "active" : ""
                }`}
                onClick={() => setActiveTab("visualization")}
              >
                Visualization
              </button>
            </>
          )}
          {/* Hypothesis Tests Tabs */}
          {activeTab === "hypothesis" && (
            <>
              <button
                className={`tab-button ${
                  activeTab === "t-test" ? "active" : ""
                }`}
                onClick={() => setActiveTab("t-test")}
              >
                T-Test
              </button>
              <button
                className={`tab-button ${
                  activeTab === "kolmogorov" ? "active" : ""
                }`}
                onClick={() => setActiveTab("kolmogorov")}
              >
                Kolmogorov
              </button>
              <button
                className={`tab-button ${activeTab === "sign" ? "active" : ""}`}
                onClick={() => setActiveTab("sign")}
              >
                Sign Test
              </button>
              <button
                className={`tab-button ${
                  activeTab === "rankedSign" ? "active" : ""
                }`}
                onClick={() => setActiveTab("rankedSign")}
              >
                Ranked Sign Test
              </button>
            </>
          )}
        </div>

        {/* Descriptive Tab */}
        {activeTab === "descriptive" && (
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

        {/* Visualization Tab */}
        {activeTab === "visualization" && (
          <ChartDisplay
            data={data}
            selectedColumns={selectedColumns}
            chartType={chartType}
            setChartType={setChartType}
          />
        )}

        {/* T-Test Tab */}
        {activeTab === "t-test" && (
          <div className="tab-content">
            <h2>T-Test Analysis</h2>
            <div className="test-controls">
              <button
                onClick={() => {
                  if (selectedColumns.length === 0) {
                    alert("Please select at least one column.");
                    return;
                  }
                  selectedColumns.forEach((column) => singleTTest(column));
                }}
                className="run-test-button"
              >
                Run T-Test
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Kolmogorov Tab */}
        {activeTab === "kolmogorov" && (
          <div className="tab-content">
            <h2>Kolmogorov-Smirnov Test</h2>
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
                Run Kolmogorov Test
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "sign" && (
          <div className="tab-content">
            <h2>Sign Test</h2>
            <div className="test-controls">
              <button
                onClick={() => {
                  if (selectedColumns.length !== 2) {
                    alert("Please select exactly two columns for Sign test.");
                    return;
                  }
                  signTest(selectedColumns);
                }}
                className="run-test-button"
              >
                Run Sign Test
              </button>
            </div>
            {signTestData && signTestData.result && (
              <div style={{ marginTop: "2rem" }}>
                <h3>Sign Test Results</h3>
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add ranked sign test content */}
        {activeTab === "rankedSign" && (
          <div className="tab-content">
            <h2>Ranked Sign Test</h2>
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
                Run Ranked Sign Test
              </button>
            </div>
            {rankedSignTestData && rankedSignTestData.result && (
              <div style={{ marginTop: "2rem" }}>
                <h3>Ranked Sign Test Results</h3>
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
                        {typeof rankedSignTestData.result.statistic === "number"
                          ? rankedSignTestData.result.statistic.toFixed(3)
                          : rankedSignTestData.result.statistic}
                      </td>
                      <td>
                        {typeof rankedSignTestData.result.pValue === "number"
                          ? rankedSignTestData.result.pValue.toExponential(6)
                          : rankedSignTestData.result.pValue}
                      </td>
                      <td>{String(rankedSignTestData.result.significant)}</td>
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
}

export default StatsPanel;
