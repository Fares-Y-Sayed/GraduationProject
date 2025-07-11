import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HistogramChart = ({ data, columns }) => {
  // --- THEME PALETTE HOOKS ---
  const getPalette = () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    return isDark
      ? [
          "rgba(96, 240, 175, 0.6)",
          "rgba(61, 125, 96, 0.6)",
          "rgba(96, 175, 240, 0.6)",
          "rgba(143, 102, 224, 0.6)",
          "rgba(80, 200, 120, 0.6)",
        ]
      : [
          "#484b6acf",
          "#9394a58a",
          "rgba(96, 175, 240, 0.6)",
          "rgba(143, 102, 224, 0.6)",
          "rgba(80, 200, 120, 0.6)",
        ];
  };

  const [colorPalette, setColorPalette] = useState(getPalette());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColorPalette(getPalette());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  // --- END THEME PALETTE HOOKS ---

  if (!data || !columns || columns.length === 0) {
    return null;
  }

  const createHistogramData = (columnData) => {
    const values = columnData
      .filter((val) => !isNaN(val) && val !== null)
      .map(Number);
    if (values.length === 0) return { labels: [], freqs: [] };

    const min = Math.min(...values);
    const max = Math.max(...values);
    const binCount = Math.ceil(Math.sqrt(values.length));
    const binWidth = (max - min) / binCount || 1;

    const bins = Array(binCount).fill(0);
    const labels = [];

    for (let i = 0; i < binCount; i++) {
      const binStart = min + i * binWidth;
      const binEnd = binStart + binWidth;
      labels.push(`${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`);
    }

    values.forEach((value) => {
      let binIndex = Math.floor((value - min) / binWidth);
      if (value === max) {
        // Ensure the max value falls into the last bin
        binIndex = binCount - 1;
      }
      if (binIndex >= 0 && binIndex < binCount) {
        bins[binIndex]++;
      }
    });

    return { labels, freqs: bins };
  };

  const datasets = columns.map((col, index) => {
    const columnData = data.map((row) => row[col]);
    const { labels, freqs } = createHistogramData(columnData);
    return {
      label: `${col} Distribution`,
      data: freqs,
      backgroundColor: colorPalette[index % colorPalette.length],
      borderColor: colorPalette[index % colorPalette.length].replace(
        "0.6",
        "1"
      ),
      borderWidth: 1,
      barPercentage: 1.0,
      categoryPercentage: 1.0,
      labels: labels,
    };
  });

  const chartLabels = datasets.length > 0 ? datasets[0].labels : [];

  const chartData = {
    labels: chartLabels,
    datasets: datasets.map((ds) => {
      // eslint-disable-next-line no-unused-vars
      const { labels, ...rest } = ds;
      return rest;
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution Chart",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Value Bins",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Frequency",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{ marginTop: "1rem", height: "400px" }}
    >
      <Bar
        key={`histogram-${columns.join("-")}`}
        data={chartData}
        options={options}
      />
    </div>
  );
};

HistogramChart.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
};

export default HistogramChart;
