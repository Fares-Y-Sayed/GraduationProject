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
  handleDeleteKolmogorov
}) {
  const handleDeleteTTest = (idOrColumn) => {
    setTTestData((prev) => prev.filter((item) => (item.id ?? item.column) !== idOrColumn));
  };

  const StatCheckbox = ({ type, label }) => (
    <div className='stat-checkbox-container'>
      <label className='stat-checkbox-label'>
        <input
          type='checkbox'
          checked={selectedStats[type]}
          onChange={() => handleCheckboxChange(type)}
          disabled={selectedColumns.length === 0}
          className='stat-checkbox'
        />
        {label}
      </label>
    </div>
  );

  const ColumnStatistics = ({ columnName }) => (
    <div className='column-statistics'>
      <div className='column-header'>
        <h2>Statistics for "{columnName}"</h2>
      </div>
      <div className='stats-grid'>
        <StatCard
          type='mean'
          label='Mean'
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type='variance'
          label='Variance'
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type='standardDeviation'
          label='Standard Deviation'
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type='median'
          label='Median'
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type='mode'
          label='Mode'
          columnName={columnName}
          stats={stats}
          errors={errors}
          animatingStats={animatingStats}
          selectedStats={selectedStats}
        />
        <StatCard
          type='count'
          label='Count'
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
      <div className='stats-container'>
        <div className='tabs'>
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
            onClick={() => setActiveTab("visualization")}>
            Visualization
          </button>
          {/* <button
            className={`tab-button ${
              activeTab === "hypothesis" ? "active" : ""
            }`}
            onClick={() => setActiveTab("hypothesis")}>
            Hypothesis Tests
          </button> */}
        </div>

        {activeTab === "descriptive" && (
          <div className='tab-content'>
            <div className='checkboxes-container'>
              <StatCheckbox type='mean' label='Mean' />
              <StatCheckbox type='variance' label='Variance' />
              <StatCheckbox
                type='standardDeviation'
                label='Standard Deviation'
              />
              <StatCheckbox type='median' label='Median' />
              <StatCheckbox type='mode' label='Mode' />
              <StatCheckbox type='count' label='Count' />
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
      </div>
    )
  );
}

export default StatsPanel;
