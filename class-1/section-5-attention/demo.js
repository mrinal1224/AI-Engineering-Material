// Class 1 — Section 5 demo
// Goal: build a tiny self-attention mechanism from scratch.

function dot(a, b) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }
  return result;
}

function softmax(scores) {
  const maxScore = Math.max(...scores);
  const exponentials = scores.map((score) => Math.exp(score - maxScore));
  const total = exponentials.reduce((sum, value) => sum + value, 0);
  return exponentials.map((value) => value / total);
}

function weightedSum(weights, values) {
  const dimensions = values[0].length;
  const output = Array(dimensions).fill(0);

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < dimensions; j++) {
      output[j] += weights[i] * values[i][j];
    }
  }

  return output;
}

function attention(query, keys, values) {
  const scores = keys.map((key) => dot(query, key));
  const weights = softmax(scores);
  const output = weightedSum(weights, values);

  return { scores, weights, output };
}

const query = [1, 0];
const keys = [
  [1, 0],
  [0, 1],
  [0.8, 0.1],
];

const values = [
  [10, 10],
  [2, 2],
  [8, 8],
];

const result = attention(query, keys, values);

console.log('Scores:', result.scores);
console.log('Attention weights:', result.weights);
console.log('Contextual output:', result.output);

// Experiments:
// 1. Change the query and observe the weights.
// 2. Change a key and observe relevance.
// 3. Change a value while keeping keys unchanged.
//    Relevance should remain similar, while output information changes.