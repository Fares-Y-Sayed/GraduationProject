import PropTypes from "prop-types";
import { Line, Bar, Scatter, Pie } from "react-chartjs-2";
import Plot from 'react-plotly.js'; // Import Plotly
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
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,  // Required for pie charts
  Title,
  Tooltip,
  Legend
);

function ChartDisplay({ data, selectedColumns, chartType, setChartType }) {
  const generateChartData = () => {
    if (!data || selectedColumns.length === 0) return null;

    // Special handling for pie chart
    if (chartType === 'pie') {
      const pieData = selectedColumns.map(column => {
        const values = data
          .map(row => parseFloat(row[column]))
          .filter(val => !isNaN(val));
        return values.reduce((sum, val) => sum + val, 0) / values.length;
      });

      return {
        labels: selectedColumns,
        datasets: [{
          data: pieData,
          backgroundColor: selectedColumns.map((_, index) => 
            `hsla(${index * (360 / selectedColumns.length)}, 70%, 60%, 0.8)`
          ),
          borderColor: selectedColumns.map((_, index) => 
            `hsla(${index * (360 / selectedColumns.length)}, 70%, 60%, 1)`
          ),
          borderWidth: 1,
        }]
      };
    }

    // Return data for other chart types
    return {
      labels: data.map((_, index) => `${index + 1}`),
      datasets: selectedColumns.map((column, index) => ({
        label: column,
        data: data.map((row) => parseFloat(row[column])).filter((val) => !isNaN(val)),
        backgroundColor: `hsla(${index * 60}, 70%, 60%, 0.5)`,
        borderColor: `hsla(${index * 60}, 70%, 60%, 1)`,
        borderWidth: 1,
        pointRadius: chartType === "scatter" ? 4 : 2,
      })),
    };
  };

  const generateBoxPlotData = () => {
    if (!data || selectedColumns.length === 0) return null;

    return selectedColumns.map(column => {
      const values = data
        .map(row => parseFloat(row[column]))
        .filter(val => !isNaN(val));
      return {
        y: values,
        type: 'box',
        name: column,
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8
      };
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: chartType === 'pie' ? 'right' : 'top',
        labels: {
          padding: 20,
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#2d2d2d'
        }
      },
      title: { 
        display: true, 
        text: chartType === 'pie' ? 'Variable Averages' : 'Data Comparison',
        color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#2d2d2d'
      },
    },
    scales: chartType === 'pie' ? {} : {
      y: { 
        beginAtZero: true,
        grid: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
  };

  const chartData = generateChartData();
  const boxPlotData = generateBoxPlotData();

  if (!chartData && !boxPlotData) return null;

  const ChartType = { line: Line, bar: Bar, scatter: Scatter, pie: Pie }[chartType];

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
          {chartType === 'box' ? (
            <Plot
              data={boxPlotData}
              layout={{
                title: 'Box Plot',
                xaxis: { title: 'Variables' },
                yaxis: { title: 'Values' },
                boxmode: 'group',
                paper_bgcolor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#2d2d2d' : '#fff',
                plot_bgcolor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#2d2d2d' : '#fff',
                font: { color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#2d2d2d' }
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