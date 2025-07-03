import PropTypes from "prop-types";

function TestSelector({ selectedTest, setSelectedTest, setActiveTab }) {
  return (
    <div className="test-selection">
      <h2>Select Test Type</h2>
      <div className="test-buttons">
        <button
          className={`test-button ${
            selectedTest === "descriptive" ? "active" : ""
          }`}
          onClick={() => {
            setSelectedTest("descriptive");
            setActiveTab("descriptive");
          }}
        >
          Descriptive Statistics
        </button>
        <button
          className={`test-button ${
            selectedTest === "hypothesis" ? "active" : ""
          }`}
          onClick={() => {
            setSelectedTest("hypothesis");
            setActiveTab("hypothesis");
          }}
        >
          Hypothesis Tests
        </button>
        <button
          className={`test-button ${
            selectedTest === "regression" ? "active" : ""
          }`}
          onClick={() => {
            setSelectedTest("regression");
            setActiveTab("regression");
          }}
        >
          Regression
        </button>
        {/* <button
          className={`test-button ${
            selectedTest === "kolmogorov" ? "active" : ""
          }`}
          onClick={() => {
            setSelectedTest("kolmogorov");
            setActiveTab("kolmogorov");
          }}
        >
          Kolmogorov
        </button> */}
      </div>
    </div>
  );
}

TestSelector.propTypes = {
  selectedTest: PropTypes.string,
  setSelectedTest: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TestSelector;
