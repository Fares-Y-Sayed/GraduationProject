import React from "react";
import FileUpload from "./FileUpload";
import DataPreview from "./DataPreview";
import TestSelector from "./TestSelector";
import ColumnSelector from "./ColumnSelector";
import StatsPanel from "./StatsPanel";
import { FaChartLine, FaMagic, FaTrash, FaPlay } from "react-icons/fa";
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
    tTestType,
    setTTestType,
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
    zTestType,
    setZTestType,
    zTestPopulationMean1,
    setZTestPopulationMean1,
    zTestPopulationMean2,
    setZTestPopulationMean2,
    zTestPopulationStdDev1,
    setZTestPopulationStdDev1,
    zTestPopulationStdDev2,
    setZTestPopulationStdDev2,
  } = props;

  return (
    <div className='container'>
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
            tTestType={tTestType}
            setTTestType={setTTestType}
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
            zTestType={zTestType}
            setZTestType={setZTestType}
            zTestPopulationMean1={zTestPopulationMean1}
            setZTestPopulationMean1={setZTestPopulationMean1}
            zTestPopulationMean2={zTestPopulationMean2}
            setZTestPopulationMean2={setZTestPopulationMean2}
            zTestPopulationStdDev1={zTestPopulationStdDev1}
            setZTestPopulationStdDev1={setZTestPopulationStdDev1}
            zTestPopulationStdDev2={zTestPopulationStdDev2}
            setZTestPopulationStdDev2={setZTestPopulationStdDev2}
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
                className='run-test-button'>
                <FaPlay style={{ marginRight: 6 }} /> Run Regression
              </button>
            </div>
          )}

          {regressionData.length > 0 && (
            <>
              <h2 style={{ marginBottom: "1rem" }}>
                <FaChartLine
                  style={{
                    marginRight: 8,
                    color: "var(--chartline-icon-color)",
                  }}
                />
                Regression Results
              </h2>
              <div className='t-test-results fade-in-up  reg'>
                <table className='t-test-table'>
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
                                    title='Delete'>
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
                            <td colSpan='2'>{result.slope || "-"}</td>
                            <td>{result.standardError}</td>
                            <td>
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
                                title='Delete'>
                                <FaTrash style={{ marginRight: 6 }} />
                              </button>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

               <>
            <button
              className='run-test-button'
              style={{ marginTop: "1.5rem" }}
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
              }}>
              <FaMagic style={{ marginRight: 6 }} />
              {regressionExplaining ? "Explaining..." : "Explain Results"}
            </button>
            {regressionExplanation && (
              <div className='test-explanation'>
                <ExplanationTypewriter text={regressionExplanation} />
              </div>
            )}
          </>
            </>
          )}
         
        </>
      )}
    </div>
  );
}

export default ProjectPage;
