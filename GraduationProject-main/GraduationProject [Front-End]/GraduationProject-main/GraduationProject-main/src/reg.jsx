import "./App.css";
// import { selectedTest } from "./App";
export default function Reg(props) {
  async function regrission() {
    async function singleTTest(column) {
      const fileName = window.localStorage.getItem("fileName");

      if (!fileName) {
        console.error("fileName is missing in localStorage");
        return;
      }
      console.log(column);
      // const params = {
      //   fileName: fileName,
      //   dependentName: ,
      //   independentName: ,
      // };

      // console.log("Sending request with parameters:", params);

      try {
        let res = await axios.post(
          "http://localhost:3000/api/v1/regression/linear",
          params
        );

        console.log("Response from backend:", res.data.data);
        setTTestData(res.data.data);
      } catch (error) {
        console.error("Error performing single t-test:", error);
        if (error.response) {
          // console.error("Response data:", error.response.data);
          // console.error("Response status:", error.response.status);
          // console.error("Response headers:", error.response.headers);
        }
      }
    }
  }

  return (
    <div>
      <button
        className={`test-button ${
          props.selectedTest === "regression" ? "active" : ""
        }`}
      >
        Regression
      </button>

      {props.selectedTest && (
        <div className="variable-sections">
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
        </div>
      )}
    </div>
  );
}
