import { VARIABLE_TYPES } from "../constants"; // Move constants to a separate file

function ColumnSelector({ columnTypes, selectedColumns, handleColumnSelect, selectedTest }) {
  const getColumnsByType = (type) =>
    Object.entries(columnTypes)
      .filter(([_, colType]) => colType === type)
      .map(([column]) => column);

  const ColumnSection = ({ type, title }) => {
    const columns = getColumnsByType(type);
    if (columns.length === 0) return null;

    return (
      <div className="column-section">
        <h3>{title}</h3>
        <div className="column-checkboxes">
          {columns.map((column) => (
            <label key={column} className="column-checkbox-label">
              <input
                type="checkbox"
                checked={selectedColumns.includes(column)}
                onChange={() => handleColumnSelect(column)}
                className="column-checkbox"
              />
              {column}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    selectedTest && (
      <div className="variable-sections">
        <ColumnSection type={VARIABLE_TYPES.METRIC} title="Metric Variables" />
        <ColumnSection type={VARIABLE_TYPES.ORDINAL} title="Ordinal Variables" />
        <ColumnSection type={VARIABLE_TYPES.NOMINAL} title="Nominal Variables" />
      </div>
    )
  );
}

export default ColumnSelector;