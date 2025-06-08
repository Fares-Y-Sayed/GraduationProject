import { Line, Bar, Scatter } from "react-chartjs-2";
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
import { BoxPlotChart } from "@sgratzl/chartjs-chart-boxplot";

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

function ChartDisplay({ data, selectedColumns, chartType, setChartType }) {
  const calculateBoxPlotData = (values) => {
    const sorted = values.sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const median = sorted[Math.floor(sorted.length * 0.5)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const min = Math.max(q1 - 1.5 * iqr, sorted[0]);
    const max = Math.min(q3 + 1.5 * iqr, sorted[sorted.length - 1]);

    return values; // Return all values for the boxplot plugin to calculate
  };

  const generateChartData = () => {
    if (!data || selectedColumns.length === 0) return null;

    if (chartType === "boxplot") {
      return {
        labels: selectedColumns,
        datasets: [
          {
            label: "Box Plot",
            data: selectedColumns.map((column) => {
              const values = data
                .map((row) => parseFloat(row[column]))
                .filter((val) => !isNaN(val));
              return calculateBoxPlotData(values);
            }),
            backgroundColor: selectedColumns.map(
              (_, index) => `hsla(${index * 60}, 70%, 60%, 0.5)`
            ),
            borderColor: selectedColumns.map(
              (_, index) => `hsla(${index * 60}, 70%, 60%, 1)`
            ),
            borderWidth: 2,
          },
        ],
      };
    }

    return {
      labels: data.map((_, index) => `${index + 1}`),
      datasets: selectedColumns.map((column, index) => ({
        label: column,
        data: data
          .map((row) => parseFloat(row[column]))
          .filter((val) => !isNaN(val)),
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

  const ChartComponent = {
    line: Line,
    bar: Bar,
    scatter: Scatter,
    boxplot: BoxPlotChart,
  }[chartType];

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
          <option value="boxplot">Box Plot</option>
        </select>
      </div>
      <div className="column-visualization">
        <h2>Variable Comparison</h2>
        <div className="chart-container">
          <ChartComponent data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ChartDisplay;
