const model = {
  "The capital of France is": {
    Paris: 0.98,
    London: 0.005,
    Berlin: 0.005,
    Rome: 0.005,
    Madrid: 0.005,
  },

  "I drink": {
    water: 0.45,
    coffee: 0.30,
    tea: 0.15,
    juice: 0.05,
    milk: 0.05,
  },

  "I drink hot": {
    coffee: 0.55,
    tea: 0.25,
    milk: 0.15,
    water: 0.03,
    juice: 0.02,
  },

  "I drink cold": {
    water: 0.50,
    juice: 0.25,
    milk: 0.15,
    tea: 0.05,
    coffee: 0.05,
  },
};

function predictDistribution(prompt) {
  return model[prompt] ?? {};
}

function predict(prompt) {
  const distribution = predictDistribution(prompt);
  const entries = Object.entries(distribution);

  if (entries.length === 0) {
    return "I don't know";
  }

  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

console.log("Distribution for: I drink");
console.table(predictDistribution("I drink"));
console.log("Top prediction:", predict("I drink"));

console.log("\nDistribution for: I drink hot");
console.table(predictDistribution("I drink hot"));
console.log("Top prediction:", predict("I drink hot"));

console.log("\nUnknown prompt:");
console.log(predict("The capital of Germany is"));
