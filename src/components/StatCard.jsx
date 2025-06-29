import PropTypes from "prop-types";
import {
  FaEquals, // mean
  FaChartLine, // variance
  FaWaveSquare, // standard deviation
  FaSortNumericDown, // median
  FaHashtag, // mode
  FaListOl, // count
} from "react-icons/fa";

const statIcons = {
  mean: <FaEquals style={{ color: "#a3ffd6", marginRight: 6 }} />,
  variance: <FaChartLine style={{ color: "#a3ffd6", marginRight: 6 }} />,
  standardDeviation: (
    <FaWaveSquare style={{ color: "#a3ffd6", marginRight: 6 }} />
  ),
  median: <FaSortNumericDown style={{ color: "#a3ffd6", marginRight: 6 }} />,
  mode: <FaHashtag style={{ color: "#a3ffd6", marginRight: 6 }} />,
  count: <FaListOl style={{ color: "#a3ffd6", marginRight: 6 }} />,
};

function StatCard({
  type,
  label,
  columnName,
  stats,
  errors,
  animatingStats,
  selectedStats,
}) {
  if (!selectedStats[type]) return null;

  const animationClass = animatingStats[columnName]?.[type]
    ? "stat-item-enter"
    : "";

  return (
    <div className={`stat-item fade-in-up ${animationClass}`}>
      <div className="stat-header">
        <label>
          {statIcons[type]}
          {label}
        </label>
      </div>
      {errors[columnName]?.[type] ? (
        <div className="error-message">{errors[columnName][type]}</div>
      ) : (
        <span
          className={stats[columnName]?.[type] ? "stat-value" : "stat-empty"}
        >
          {stats[columnName]?.[type] || "Calculating..."}
        </span>
      )}
    </div>
  );
}

StatCard.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  columnName: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  animatingStats: PropTypes.object.isRequired,
  selectedStats: PropTypes.object.isRequired,
};

export default StatCard;
