import PropTypes from "prop-types";

function Regression({ regressionData }) {
  if (!regressionData) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "auto",
        border: "1px solid var(--border-color)",
        borderRadius: 8,
        margin: "1rem 0",
        boxShadow: "0 2px 8px var(--shadow-color)",
        background: "var(--background-color)",
        padding: "1rem",
      }}
    >
      <h2>Regression Results</h2>
      <table className="t-test-table" style={{ minWidth: 900 }}>
        <thead>
          <tr>
            <th>Coefficient of Determination</th>
            <th>Intercept</th>
            <th>Linear Regression Equation</th>
            <th>Variable</th>
            <th>Slope Coefficient</th>
            <th>Standard Error</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(regressionData.slopes) &&
          regressionData.slopes.length > 0 ? (
            regressionData.slopes.map((slopeObj, idx) => (
              <tr key={slopeObj.variable || idx}>
                <td>{regressionData.coefficientOfDetermination}</td>
                <td>{regressionData.intercept}</td>
                <td>{regressionData.linearRegressionEquation}</td>
                <td>{slopeObj.variable}</td>
                <td>{slopeObj.coefficient}</td>
                <td>{regressionData.standardError}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>{regressionData.coefficientOfDetermination}</td>
              <td>{regressionData.intercept}</td>
              <td>{regressionData.linearRegressionEquation}</td>
              <td colSpan={2}>{regressionData.slope || "-"}</td>
              <td>{regressionData.standardError}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

Regression.propTypes = {
  regressionData: PropTypes.object,
};

export default Regression;
