function Regression({selectedColumns, regressionData }) {
  return (
    <div className='tab-content'>
      <h2>Hypothesis Tests</h2>
      <div className='test-controls'>
        <button
          onClick={() => {
            if (selectedColumns.length === 0) {
              alert("Please select Two columns.");
              return;
            }
            selectedColumns.forEach((column) => singleTTest(column));
          }}
          className='run-test-button'>
          Run Regression
        </button>
      </div>
      {tTestData && (
        <div>
          {tTestData && (
            <div className='t-test-results'>
              <h3>t-Test Results</h3>
              <table className='t-test-table'>
                <thead>
                  <tr>
                    <th>t-Statistic</th>
                    <th>p-Value</th>
                    <th>Decision</th>
                    <th>Degrees of Freedom</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{tTestData.tStatistic.toFixed(3)}</td>
                    <td>{tTestData.pValue.toFixed(3)}</td>
                    <td>{tTestData.decision}</td>
                    <td>{tTestData.degreesOfFreedom}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HypothesisTest;
