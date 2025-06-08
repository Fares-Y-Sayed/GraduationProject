export const VARIABLE_TYPES = {
    METRIC: "metric",
    ORDINAL: "ordinal",
    NOMINAL: "nominal",
    DEPENDENT: "dependent",
    INDEPENDENT: "independent"
};

export const TESTS = {
    DESCRIPTIVE: {
        name: "Descriptive Statistics",
        metrics: [
            "mean",
            "variance",
            "standardDeviation",
            "median",
            "mode",
            "count",
        ],
        ordinal: ["median", "mode", "count"],
        nominal: ["mode", "count"],
    },
    HYPOTHESIS: {
        name: "Hypothesis Tests",
        metrics: ["tTest", "anova", "correlation"],
        ordinal: ["chiSquare", "rankCorrelation"],
        nominal: ["chiSquare"],
    },
};