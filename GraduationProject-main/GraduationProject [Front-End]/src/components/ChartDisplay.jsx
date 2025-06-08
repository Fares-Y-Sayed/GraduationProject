import { Line, Bar, Scatter } from "react-chartjs-2";

function ChartDisplay({ data, selectedColumns, chartType, setChartType }) {
  const generateChartData = () => {
    if (!data || selectedColumns.length === 0) return null;

    return {
      labels: data.map((_, index) => `${index + 1}`),
      datasets: selectedColumns.map((column, index) => ({
        label: column,
        data: data.map((row) => parseFloat(row[column])).filter((val) => !isNaN(val)),
        backgroundColor: `hsla(${index * 60}, 70%, 60%, 0.5)`,
        borderColor: `hsla(${index * 60}, 70%, 60%, 1)`,
        borderWidth: 2,
        pointRadius: chartType === "scatter" ? 4 : 2,
      })),
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Data Comparison" },
    },
    scales: { y: { beginAtZero: true } },
  };

  const chartData = generateChartData();
  if (!chartData) return null;

  const ChartType = { line: Line, bar: Bar, scatter: Scatter }[chartType];

  return (
    <div className="tab-content">
      <div className="chart-controls">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="chart-type-select"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="scatter">Scatter Plot</option>
        </select>
      </div>
      <div className="column-visualization">
        <h2>Variable Comparison</h2>
        <div className="chart-container">
          <ChartType data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ChartDisplay;