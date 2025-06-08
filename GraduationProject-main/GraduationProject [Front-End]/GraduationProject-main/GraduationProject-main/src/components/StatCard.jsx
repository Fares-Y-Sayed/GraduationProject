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
    <div className={`stat-item ${animationClass}`}>
      <div className='stat-header'>
        <label>{label}</label>
      </div>
      {errors[columnName]?.[type] ? (
        <div className='error-message'>{errors[columnName][type]}</div>
      ) : (
        <span
          className={stats[columnName]?.[type] ? "stat-value" : "stat-empty"}>
          {stats[columnName]?.[type] || "Calculating..."}
        </span>
      )}
    </div>
  );
}

export default StatCard;
