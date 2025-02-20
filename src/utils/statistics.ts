export const calculateMean = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
};

export const calculateVariance = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const mean = calculateMean(numbers);
  return numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numbers.length;
};

export const calculateStandardDeviation = (numbers: number[]): number => {
  return Math.sqrt(calculateVariance(numbers));
};

export const calculateMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
};

export const calculateMode = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  
  const frequency: { [key: number]: number } = {};
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
  });
  
  let mode = numbers[0];
  let maxFrequency = 1;
  
  for (const num in frequency) {
    if (frequency[num] > maxFrequency) {
      maxFrequency = frequency[num];
      mode = Number(num);
    }
  }
  
  return mode;
};