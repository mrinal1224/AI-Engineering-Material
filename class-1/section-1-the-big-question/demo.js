// Class 1 — Section 1 demo
// The code is intentionally tiny. The teaching goal is to visualize:
// context -> prediction -> append -> predict again.

const distributions = {
  'I drink': {
    water: 0.45,
    coffee: 0.30,
    tea: 0.15,
    juice: 0.05,
    milk: 0.05,
  },
  'The capital of France is': {
    Paris: 0.98,
    London: 0.005,
    Berlin: 0.005,
    Rome: 0.005,
    Madrid: 0.005,
  },
};

function predictDistribution(prompt) {
  return distributions[prompt] ?? {};
}

console.log('Distribution for: I drink');
console.table(predictDistribution('I drink'));

// A deliberately tiny deterministic model for showing
// how generation works as a loop.
const brain = {
  'I love': 'JavaScript',
  'I love JavaScript': 'because',
  'I love JavaScript because': 'it',
  'I love JavaScript because it': 'is',
  'I love JavaScript because it is': 'fun',
};

function generate(prompt, maxSteps = 5) {
  let text = prompt;

  for (let i = 0; i < maxSteps; i++) {
    const nextToken = brain[text];

    if (!nextToken) break;

    text += ` ${nextToken}`;
  }

  return text;
}

console.log(generate('I love'));
// I love JavaScript because it is fun

console.log(generate('The capital of Germany is'));
// The model cannot continue because our toy brain has no rule for that context.