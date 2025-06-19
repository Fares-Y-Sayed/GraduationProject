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
          {/* <button
            className={`tab-button ${
              activeTab === "descriptive" ? "active" : ""
            }`}
            onClick={() => setActiveTab("descriptive")}>
            Descriptive Statistics
          </button> */}
          <button
            className={`tab-button ${
              activeTab === "visualization" ? "active" : ""
            }`}
            onClick={() => setActiveTab("visualization")}
          >
            Visualization
          </button>
          {/* <button
            className={`tab-button ${
              activeTab === "hypothesis" ? "active" : ""
            }`}
            onClick={() => setActiveTab("hypothesis")}>
            Hypothesis Tests
          </button> */}
          <button
            className={`tab-button ${activeTab === "sign" ? "active" : ""}`}
            onClick={() => setActiveTab("sign")}
          >
            Sign Test
          </button>
        </div>

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

        {activeTab === "visualization" && (
          <ChartDisplay
            data={data}
            selectedColumns={selectedColumns}
            chartType={chartType}
            setChartType={setChartType}
          />
        )}

        {activeTab === "hypothesis" && (
          <HypothesisTest
            selectedColumns={selectedColumns}
            singleTTest={singleTTest}
            tTestData={tTestData}
            handleDeleteTTest={handleDeleteTTest}
            kolmogorovTest={kolmogorovTest}
            kolmogorovData={kolmogorovData}
            handleDeleteKolmogorov={handleDeleteKolmogorov}
            regressionData={regressionData}
          />
        )}

        {/* Add sign test content */}
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
      </div>
    )
  );
}

export default StatsPanel;
