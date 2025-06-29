import React from "react";
import PropTypes from "prop-types";
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
import { Line, Bar, Scatter, Pie } from "react-chartjs-2";
import Plot from "react-plotly.js";
import { useTheme } from "../contexts/ThemeContext";

// Register Chart.js components
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

const ChartDisplay = ({ data, selectedColumns, chartType, setChartType }) => {
  const { isDarkMode } = useTheme();

  const generateChartData = () => {
    if (!data || selectedColumns.length === 0) return null;

    if (chartType === "pie") {
      // For pie chart, calculate averages
      const averages = selectedColumns.map((column) => {
        const values = data
          .map((row) => parseFloat(row[column]))
          .filter((val) => !isNaN(val));
        return values.length > 0
          ? values.reduce((sum, val) => sum + val, 0) / values.length
          : 0;
      });

      return {
        labels: selectedColumns,
        datasets: [
          {
            data: averages,
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    }

    // Return data for other chart types
    return {
      labels: data.map((_, index) => `${index + 1}`),
      datasets: selectedColumns.map((column, index) => ({
        label: column,
        data: data
          .map((row) => parseFloat(row[column]))
          .filter((val) => !isNaN(val)),
        backgroundColor: `hsla(${index * 60}, 70%, 60%, 0.5)`,
        borderColor: `hsla(${index * 60}, 70%, 60%, 1)`,
        borderWidth: 1,
        pointRadius: chartType === "scatter" ? 4 : 2,
      })),
    };
  };

  const generateBoxPlotData = () => {
    if (!data || selectedColumns.length === 0) return null;

    return selectedColumns.map((column) => {
      const values = data
        .map((row) => parseFloat(row[column]))
        .filter((val) => !isNaN(val));
      return {
        y: values,
        type: "box",
        name: column,
        boxpoints: "all",
        jitter: 0.3,
        pointpos: -1.8,
      };
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: chartType === "pie" ? "right" : "top",
        labels: {
          padding: 20,
          color: isDarkMode ? "#fff" : "#484b6a",
        },
      },
      title: {
        display: true,
        text: chartType === "pie" ? "Variable Averages" : "Data Comparison",
        color: isDarkMode ? "#fff" : "#484b6a",
      },
    },
    scales:
      chartType === "pie"
        ? {}
        : {
            y: {
              beginAtZero: true,
              grid: {
                color: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(72, 75, 106, 0.1)",
              },
            },
          },
  };

  const chartData = generateChartData();
  const boxPlotData = generateBoxPlotData();

  if (!chartData && !boxPlotData) return null;

  const ChartType = { line: Line, bar: Bar, scatter: Scatter, pie: Pie }[
    chartType
  ];

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
          <option value="pie">Pie Chart</option>
          <option value="box">Box Plot</option> {/* Add Box Plot option */}
        </select>
      </div>
      <div className="column-visualization">
        <h2>Variable Comparison</h2>
        <div className="chart-container">
          {chartType === "box" ? (
            <Plot
              data={boxPlotData}
              layout={{
                title: "Box Plot",
                xaxis: { title: "Variables" },
                yaxis: { title: "Values" },
                boxmode: "group",
                paper_bgcolor: isDarkMode ? "#2d2d2d" : "#fafafa",
                plot_bgcolor: isDarkMode ? "#2d2d2d" : "#fafafa",
                font: {
                  color: isDarkMode ? "#fff" : "#484b6a",
                },
              }}
              config={{ responsive: true }}
            />
          ) : (
            <ChartType data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}

ChartDisplay.propTypes = {
  data: PropTypes.array,
  selectedColumns: PropTypes.array.isRequired,
  chartType: PropTypes.string.isRequired,
  setChartType: PropTypes.func.isRequired,
};

export default ChartDisplay;
