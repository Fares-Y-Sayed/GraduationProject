import { VARIABLE_TYPES } from "../constants";

function ColumnSelector({
  columnTypes,
  selectedColumns,
  handleColumnSelect,
  selectedTest,
  activeTab,
  dependentVariable,
  independentVariables,
  alpha, // Add state for alpha
  setAlpha, // Add function to update alpha
  populationMean, // Add state for populationMean
  setPopulationMean, // Add function to update populationMean
  alternative, // Add state for alternative
  setAlternative, // Add function to update alternative
}) {
  const getColumnsByType = (type) =>
    Object.entries(columnTypes)
      .filter(([_, colType]) => colType === type)
      .map(([column]) => column);

  const getAllColumns = () => Object.keys(columnTypes);

  const RegressionSection = ({ isDependent }) => {
    const columns = getAllColumns();
    const title = isDependent ? "Dependent Variable" : "Independent Variables";
    const description = isDependent
      ? "Select one variable to predict"
      : "Select one or more variables to use as predictors";

    return (
      <div className="column-section">
        <h3>{title}</h3>
        <p className="section-description">{description}</p>
        <div className="column-checkboxes">
          {columns.map((column) => (
            <label key={column} className="column-checkbox-label">
              <input
                type={isDependent ? "radio" : "checkbox"}
                name={
                  isDependent ? "dependent-variable" : "independent-variables"
                }
                checked={
                  isDependent
                    ? dependentVariable === column
                    : independentVariables.includes(column)
                }
                onChange={() => handleColumnSelect(column, isDependent)}
                className="column-checkbox"
                disabled={
                  isDependent
                    ? independentVariables.includes(column)
                    : dependentVariable === column
                }
              />
              {column}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const StandardSection = ({ type, title }) => {
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

  // Hypothesis test input fields
  const renderHypothesisInputs = () => {
    if (selectedTest === "hypothesis") {
      return (
        <div className="hypothesis-inputs">
          <div>
            <label>
              Alpha:
              <input
                type="number"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                step="0.01"
                min="0"
                max="1"
              />
            </label>
          </div>

          <div>
            <label>
              Population Mean:
              <input
                type="number"
                value={populationMean}
                onChange={(e) => setPopulationMean(parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div>
            <label>
              Alternative Hypothesis:
              <select
                value={alternative}
                onChange={(e) => setAlternative(e.target.value)}
              >
                <option value="two-tailed">Two-tailed</option>
                <option value="greater">Greater</option>
                <option value="less">Less</option>
              </select>
            </label>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!selectedTest) return null;

  return (
    <div className="variable-sections">
      {selectedTest === "regression" ? (
        <>
          <RegressionSection isDependent={true} />
          <RegressionSection isDependent={false} />
        </>
      ) : (
        <>
          <StandardSection
            type={VARIABLE_TYPES.METRIC}
            title="Metric Variables"
          />
          <StandardSection
            type={VARIABLE_TYPES.ORDINAL}
            title="Ordinal Variables"
          />
          <StandardSection
            type={VARIABLE_TYPES.NOMINAL}
            title="Nominal Variables"
          />
        </>
      )}
      {renderHypothesisInputs()} {/* Render hypothesis test inputs here */}
    </div>
  );
}

export default ColumnSelector;
