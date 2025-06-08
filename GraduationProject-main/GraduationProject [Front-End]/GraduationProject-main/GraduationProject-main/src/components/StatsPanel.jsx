import { useState } from "react";
import StatCard from "./StatCard";
import ChartDisplay from "./ChartDisplay";

function StatsPanel({
  activeTab,
  selectedColumns,
  selectedStats,
  handleCheckboxChange,
  stats,
  errors,
  animatingStats,
  data,
  chartType,
  setChartType,
  tTestData,
  regressionData,
}) {
  const [displayTab, setDisplayTab] = useState("calculations");

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

  const RegressionResults = () =>
    regressionData && (
      <div className="regression-results">
        <h3>Regression Analysis Results</h3>
        <table className="t-test-table">
          <thead>
            <tr>
              <th>Coefficient of Determination</th>
              <th>Intercept</th>
              <th>Linear Regression Equation</th>
              <th>Slope</th>
              <th>Standard Error</th>
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
    );

  const TTestResults = () =>
    tTestData && (
      <div className="t-test-results">
        <h3>T-Test Results</h3>
        <table className="t-test-table">
          <thead>
            <tr>
              <th>t-Statistic</th>
              <th>p-Value</th>
              <th>Decision</th>
              <th>Degrees of Freedom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tTestData.tStatistic.toFixed(3)}</td>
              <td>{tTestData.pValue.toFixed(3)}</td>
              <td>{tTestData.decision}</td>
              <td>{tTestData.degreesOfFreedom}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

  const renderContent = () => {
    if (displayTab === "calculations") {
      switch (activeTab) {
        case "descriptive":
          return (
            <>
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
            </>
          );
        case "hypothesis":
          return <TTestResults />;
        case "regression":
          return <RegressionResults />;
        default:
          return null;
      }
    } else {
      return (
        <ChartDisplay
          data={data}
          selectedColumns={selectedColumns}
          chartType={chartType}
          setChartType={setChartType}
        />
      );
    }
  };

  return (
    selectedColumns.length > 0 && (
      <div className="stats-container">
        <div className="content-tabs">
          <button
            className={`tab-button ${
              displayTab === "calculations" ? "active" : ""
            }`}
            onClick={() => setDisplayTab("calculations")}
          >
            Calculations
          </button>
          <button
            className={`tab-button ${
              displayTab === "visualization" ? "active" : ""
            }`}
            onClick={() => setDisplayTab("visualization")}
          >
            Visualization
          </button>
        </div>

        <div className="tab-content">{renderContent()}</div>
      </div>
    )
  );
}

export default StatsPanel;
