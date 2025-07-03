import PropTypes from "prop-types";
import { VARIABLE_TYPES } from "../constants";

function ColumnSelector({
  columnTypes,
  selectedColumns,
  handleColumnSelect,
  selectedTest,
  activeTab,
  dependentVariable,
  independentVariables,
}) {
  const getColumnsByType = (type) =>
    Object.entries(columnTypes)
      .filter(([, colType]) => colType === type)
      .map(([column]) => column);

  const getAllColumns = () => Object.keys(columnTypes);

  const ColumnSection = ({ type, title, isRadio }) => {
    const columns =
      activeTab === "regression" ? getAllColumns() : getColumnsByType(type);
    if (columns.length === 0) return null;

    return (
      <div className="column-section">
        <h3>{title}</h3>
        <div className="column-checkboxes">
          {columns.map((column) => (
            <label key={column} className="stat-checkbox-label">
              <input
                type={isRadio ? "radio" : "checkbox"}
                name={isRadio ? "dependent-column" : undefined} // Group radio buttons
                checked={
                  activeTab === "regression"
                    ? isRadio
                      ? dependentVariable === column
                      : independentVariables.includes(column)
                    : selectedColumns.includes(column)
                }
                onChange={() => handleColumnSelect(column, isRadio)}
                className="stat-checkbox"
              />
              {column}
            </label>
          ))}
        </div>
      </div>
    );
  };

  ColumnSection.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    isRadio: PropTypes.bool,
  };

  return (
    selectedTest && (
      <div className="variable-sections">
        {console.log("Active Tab:", activeTab)}
        {activeTab === "regression" ? (
          <>
            <ColumnSection
              type={VARIABLE_TYPES.DEPENDENT}
              title="Dependent Variables"
              isRadio={true}
            />
            <ColumnSection
              type={VARIABLE_TYPES.INDEPENDENT}
              title="Independent Variables"
              isRadio={false}
            />
          </>
        ) : (
          <>
            <ColumnSection
              type={VARIABLE_TYPES.METRIC}
              title="Metric Variables"
            />
            <ColumnSection
              type={VARIABLE_TYPES.ORDINAL}
              title="Ordinal Variables"
            />
            <ColumnSection
              type={VARIABLE_TYPES.NOMINAL}
              title="Nominal Variables"
            />
          </>
        )}
      </div>
    )
  );
}

ColumnSelector.propTypes = {
  columnTypes: PropTypes.object.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  handleColumnSelect: PropTypes.func.isRequired,
  selectedTest: PropTypes.string,
  activeTab: PropTypes.string.isRequired,
  dependentVariable: PropTypes.string,
  independentVariables: PropTypes.array,
};

export default ColumnSelector;
