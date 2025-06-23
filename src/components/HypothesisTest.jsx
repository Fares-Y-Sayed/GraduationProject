import { useState } from 'react';
import PropTypes from 'prop-types';

function HypothesisTest({ 
  selectedColumns, 
  singleTTest, 
  tTestData, 
  handleDeleteTTest,
  kolmogorovTest,
  kolmogorovData,
  handleDeleteKolmogorov 
}) {
  const [tTestParams, setTTestParams] = useState({
    alpha: 0.05,
    alternative: "two-tailed",
    populationMean: 7.5
  });

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setTTestParams(prev => ({
      ...prev,
      [name]: name === "alpha" || name === "populationMean" ? Number(value) : value
    }));
  };

  // Option 1: Pass handleDeleteTTest from the parent (recommended)
  const safeDelete = typeof handleDeleteTTest === "function" ? handleDeleteTTest : () => {};

  return (
    <div className='tab-content'>
      <h2>Hypothesis Tests
       
      </h2>
      <div className='test-controls'>
        <div className="test-params" style={{ 
  marginBottom: "20px", 
  display: "flex", 
  gap: "20px", 
  alignItems: "center",
  backgroundColor: "#3d3d3d",
  padding: "20px",
  borderRadius: "12px",
  color: "white"
}}>
          <div>
            <label style={{ 
      marginRight: "10px",
      fontSize: "0.9rem",
      fontWeight: "600"
    }}>Alpha Level:</label>
            <input
              type="number"
              name="alpha"
              value={tTestParams.alpha}
              onChange={handleParamChange}
              step="0.01"
              min="0"
              max="1"
              style={{ 
        width: "80px",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solidr #a3ffd6",
        backgroundColor: "#2d2d2d",
        color: "white"
      }}
            />
          </div>
          <div>
            <label style={{ 
      marginRight: "10px",
      fontSize: "0.9rem",
      fontWeight: "600"
    }}>Alternative:</label>
            <select
              name="alternative"
              value={tTestParams.alternative}
              onChange={handleParamChange}
              style={{
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #a3ffd6",
        backgroundColor: "",
        color: "white",
        cursor: "pointer",
        
      }}
            >
              <option value="two-tailed" style={{ backgroundColor: "#2d2d2d" }}>Two-tailed</option>
              <option value="greater" style={{ backgroundColor: "#2d2d2d" }}>greater</option>
              <option value="less" style={{ backgroundColor: "#2d2d2d" }}>less</option>
            </select>
          </div>
          <div>
            <label style={{ 
      marginRight: "10px",
      fontSize: "0.9rem",
      fontWeight: "600"
    }}>Population Mean:</label>
            <input
              type="number"
              name="populationMean"
              value={tTestParams.populationMean}
              onChange={handleParamChange}
              step="0.1"
              style={{ 
        width: "80px",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #a3ffd6",
        backgroundColor: "#2d2d2d",
        color: "white"
      }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              if (selectedColumns.length === 0) {
                alert("Please select at least one column.");
                return;
              }
              selectedColumns.forEach((column) => singleTTest(column, tTestParams));
            }}
            className='run-test-button'>
            Run t-Test
          </button>
          <button
            onClick={() => {
              if (selectedColumns.length === 0) {
                alert("Please select at least one column.");
                return;
              }
              selectedColumns.forEach((column) => kolmogorovTest(column));
            }}
            className='run-test-button'>
            Run Kolmogorov Test
          </button>
        </div>
      </div>
      
      {Array.isArray(tTestData) && tTestData.length > 0 && (
        <div>
          <div className='t-test-results'>
            <h3>Single T-Test Results {`"new"`}</h3>
            <table className='t-test-table'>
              <thead>
                <tr>
                  <th>Column</th>
                  <th>t-Statistic</th>
                  <th>p-Value</th>
                  <th>Decision</th>
                  <th>Degrees of Freedom</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tTestData.map((result) => (
                  <tr key={result.id ?? result.column}>
                    <td>{result.column}</td>
                    <td>{result.tStatistic !== undefined ? Number(result.tStatistic).toFixed(3) : (result.tValue ?? result.t_statistic ?? "")}</td>
                    <td>{result.pValue ?? result.p_value ?? ""}</td>
                    <td>{result.decision ?? result.result ?? ""}</td>
                    <td>{result.degreesOfFreedom ?? result.df ?? ""}</td>
                    <td>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#ef4444"
                        }}
                        onClick={() => safeDelete(result.id ?? result.column)}
                        title="Delete"
                      >
                        {/* SVG Trash Icon */}
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kolmogorov test results table */}
      {Array.isArray(kolmogorovData) && kolmogorovData.length > 0 && (
        <div>
          <div className='t-test-results'>
            <h3>Kolmogorov Test Results</h3>
            <table className='t-test-table'>
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Statistic</th>
                  <th>Critical Value</th>
                  <th>p-Value</th>
                  <th>Significance Level</th>
                  <th>Decision</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {kolmogorovData.map((result) => (
                  <tr key={result.id}>
                    <td>{result.column}</td>
                    <td>{result.statistic?.toFixed(4) ?? ""}</td>
                    <td>{result.criticalValue?.toFixed(4) ?? ""}</td>
                    <td>{result.pValue?.toFixed(4) ?? ""}</td>
                    <td>{result.significanceLevel?.toFixed(2) ?? ""}</td>
                    <td>{result.isNormal ? "Normal" : "Not Normal"}</td>
                    <td>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#ef4444"
                        }}
                        onClick={() => handleDeleteKolmogorov(result.id)}
                        title="Delete"
                      >
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

HypothesisTest.propTypes = {
  selectedColumns: PropTypes.array.isRequired,
  singleTTest: PropTypes.func.isRequired,
  tTestData: PropTypes.array.isRequired,
  handleDeleteTTest: PropTypes.func.isRequired,
  kolmogorovTest: PropTypes.func.isRequired,
  kolmogorovData: PropTypes.array.isRequired,
  handleDeleteKolmogorov: PropTypes.func.isRequired,
};

export default HypothesisTest;

