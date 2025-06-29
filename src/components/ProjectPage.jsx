import React from "react";
import FileUpload from "./FileUpload";
import DataPreview from "./DataPreview";
import TestSelector from "./TestSelector";
import ColumnSelector from "./ColumnSelector";
import StatsPanel from "./StatsPanel";
import { FaChartLine, FaMagic, FaTrash } from "react-icons/fa";
import Typewriter, { ExplanationTypewriter } from "./Typewriter";

function ProjectPage(props) {
  const {
    data,
    handleDataLoaded,
    selectedTest,
    setSelectedTest,
    setActiveTab,
    columnTypes,
    selectedColumns,
    handleColumnSelect,
    activeTab,
    dependentVariable,
    independentVariables,
    activeSubTab,
    setActiveSubTab,
    selectedStats,
    handleCheckboxChange,
    stats,
    errors,
    animatingStats,
    chartType,
    setChartType,
    singleTTest,
    tTestData,
    setTTestData,
    tTestAlpha,
    setTTestAlpha,
    tTestAlternative,
    setTTestAlternative,
    tTestPopulationMean,
    setTTestPopulationMean,
    regression,
    regressionData,
    kolmogorovTest,
    kolmogorovData,
    handleDeleteKolmogorov,
    anovaTest,
    anovaData,
    handleDeleteAnova,
    signTest,
    signTestData,
    setSignTestData,
    rankedSignTest,
    rankedSignTestData,
    setRankedSignTestData,
    uTest,
    uTestData,
    setUTestData,
    showRegBtn,
    handleDeleteRegression,
    regressionExplaining,
    setRegressionExplaining,
    regressionExplanation,
    setRegressionExplanation,
    chiSquareTest,
    chiSquareData,
    setChiSquareData,
    handleDeleteChiSquare,
    chiSquareAlpha,
    setChiSquareAlpha,
    chiSquareTestType,
    setChiSquareTestType,
    zTest,
    zTestData,
    setZTestData,
    handleDeleteZTest,
    zTestAlpha,
    setZTestAlpha,
    zTestAlternative,
    setZTestAlternative,
    zTestPopulationMean,
    setZTestPopulationMean,
    zTestPopulationStdDev,
    setZTestPopulationStdDev,
  } = props;

  return (
    <div className="container">
      <h1>
        Quick Statistics Analysis <br /> (QSA)
      </h1>
      <FileUpload onDataLoaded={handleDataLoaded} />
      {data && (
        <>
          <DataPreview data={data} />
          <TestSelector
            selectedTest={selectedTest}
            setSelectedTest={setSelectedTest}
            setActiveTab={setActiveTab}
          />
          <ColumnSelector
            columnTypes={columnTypes}
            selectedColumns={selectedColumns}
            handleColumnSelect={handleColumnSelect}
            selectedTest={selectedTest}
            activeTab={activeTab}
            dependentVariable={dependentVariable}
            independentVariables={independentVariables}
          />
          <StatsPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            selectedColumns={selectedColumns}
            selectedStats={selectedStats}
            handleCheckboxChange={handleCheckboxChange}
            stats={stats}
            errors={errors}
            animatingStats={animatingStats}
            data={data}
            chartType={chartType}
            setChartType={setChartType}
            singleTTest={singleTTest}
            tTestData={tTestData}
            setTTestData={setTTestData}
            tTestAlpha={tTestAlpha}
            setTTestAlpha={setTTestAlpha}
            tTestAlternative={tTestAlternative}
            setTTestAlternative={setTTestAlternative}
            tTestPopulationMean={tTestPopulationMean}
            setTTestPopulationMean={setTTestPopulationMean}
            regression={regression}
            regressionData={regressionData}
            kolmogorovTest={kolmogorovTest}
            kolmogorovData={kolmogorovData}
            handleDeleteKolmogorov={handleDeleteKolmogorov}
            anovaTest={anovaTest}
            anovaData={anovaData}
            handleDeleteAnova={handleDeleteAnova}
            signTest={signTest}
            signTestData={signTestData}
            setSignTestData={setSignTestData}
            rankedSignTest={rankedSignTest}
            rankedSignTestData={rankedSignTestData}
            setRankedSignTestData={setRankedSignTestData}
            uTest={uTest}
            uTestData={uTestData}
            setUTestData={setUTestData}
            chiSquareTest={chiSquareTest}
            chiSquareData={chiSquareData}
            setChiSquareData={setChiSquareData}
            handleDeleteChiSquare={handleDeleteChiSquare}
            chiSquareAlpha={chiSquareAlpha}
            setChiSquareAlpha={setChiSquareAlpha}
            chiSquareTestType={chiSquareTestType}
            setChiSquareTestType={setChiSquareTestType}
            zTest={zTest}
            zTestData={zTestData}
            setZTestData={setZTestData}
            handleDeleteZTest={handleDeleteZTest}
            zTestAlpha={zTestAlpha}
            setZTestAlpha={setZTestAlpha}
            zTestAlternative={zTestAlternative}
            setZTestAlternative={setZTestAlternative}
            zTestPopulationMean={zTestPopulationMean}
            setZTestPopulationMean={setZTestPopulationMean}
            zTestPopulationStdDev={zTestPopulationStdDev}
            setZTestPopulationStdDev={setZTestPopulationStdDev}
          />
        </>
      )}
      {activeTab === "regression" && (
        <>
          {showRegBtn && (
            <div>
              <button
                onClick={() => {
                  regression(dependentVariable, independentVariables);
                }}
                className="run-test-button"
              >
                Run Regression
              </button>
            </div>
          )}
          {regressionData.length > 0 && (
            <div style={{ marginTop: "2rem" }} className="fade-in-up">
              <h2>
                <FaChartLine style={{ marginRight: 8, color: "#6366f1" }} />
                Regression Results
              </h2>
              <table className="t-test-table">
                <thead>
                  <tr>
                    <th>Coefficient of Determination</th>
                    <th>Intercept</th>
                    <th>Equation</th>
                    <th>Variable</th>
                    <th>Slope</th>
                    <th>Standard Error</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {regressionData.map((result) => (
                    <React.Fragment key={result.id}>
                      {result.slopes && result.slopes.length > 0 ? (
                        result.slopes.map((slope, index) => (
                          <tr key={`${result.id}-${slope.variable}`}>
                            {index === 0 ? (
                              <td rowSpan={result.slopes.length || 1}>
                                {result.coefficientOfDetermination}
                              </td>
                            ) : null}
                            {index === 0 ? (
                              <td rowSpan={result.slopes.length || 1}>
                                {result.intercept}
                              </td>
                            ) : null}
                            {index === 0 ? (
                              <td rowSpan={result.slopes.length || 1}>
                                {result.linearRegressionEquation}
                              </td>
                            ) : null}
                            <td>{slope.variable}</td>
                            <td>{slope.coefficient}</td>
                            {index === 0 ? (
                              <td rowSpan={result.slopes.length || 1}>
                                {result.standardError}
                              </td>
                            ) : null}
                            {index === 0 ? (
                              <td rowSpan={result.slopes.length || 1}>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#ef4444",
                                  }}
                                  onClick={() =>
                                    handleDeleteRegression(result.id)
                                  }
                                  title="Delete"
                                >
                                  <FaTrash style={{ marginRight: 6 }} />
                                </button>
                              </td>
                            ) : null}
                          </tr>
                        ))
                      ) : (
                        <tr key={result.id}>
                          <td>{result.coefficientOfDetermination}</td>
                          <td>{result.intercept}</td>
                          <td>{result.linearRegressionEquation}</td>
                          <td colSpan="2">{result.slope || "-"}</td>
                          <td>{result.standardError}</td>
                          <td>
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#ef4444",
                              }}
                              onClick={() => handleDeleteRegression(result.id)}
                              title="Delete"
                            >
                              <FaTrash style={{ marginRight: 6 }} />
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <button
                className="run-test-button"
                disabled={regressionExplaining}
                onClick={async () => {
                  setRegressionExplaining(true);
                  setRegressionExplanation("");
                  const prompt = `Explain the following regression results in simple terms in three lines:\n${JSON.stringify(
                    regressionData,
                    null,
                    2
                  )}`;
                  try {
                    const response = await fetch(
                      "http://localhost:4000/generate",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ prompt }),
                      }
                    );
                    const data = await response.json();
                    setRegressionExplanation(
                      data.generatedText || "No explanation received."
                    );
                  } catch (error) {
                    setRegressionExplanation("Failed to get explanation.");
                  }
                  setRegressionExplaining(false);
                }}
              >
                <FaMagic style={{ marginRight: 6 }} />
                {regressionExplaining ? "Explaining..." : "Explain Results"}
              </button>
              {regressionExplanation && (
                <div className="test-explanation">
                  <h3 className="explanation-header">
                    <FaMagic style={{ marginRight: 8, color: "#10b981" }} />
                    Explanation using AI
                  </h3>
                  <ExplanationTypewriter text={regressionExplanation} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectPage;
