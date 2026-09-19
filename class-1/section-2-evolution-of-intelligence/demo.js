// Class 1 — Section 2 demo
// This file illustrates the difference between hand-written rules
// and the idea of learning from examples. It does NOT implement ML.

console.log('=== 1. Rule-based animal classifier ===');

function classifyAnimal(animal) {
  if (animal.hasFur && animal.hasWhiskers && animal.says === 'meow') {
    return 'cat';
  }
  return 'unknown';
}

const examples = [
  { name: 'obvious cat', value: { hasFur: true, hasWhiskers: true, says: 'meow' } },
  { name: 'silent cat', value: { hasFur: true, hasWhiskers: true, says: 'silent' } },
  { name: 'hairless cat', value: { hasFur: false, hasWhiskers: true, says: 'meow' } },
  { name: 'tiger', value: { hasFur: true, hasWhiskers: true, says: 'roar' } },
];

for (const example of examples) {
  console.log(example.name, '->', classifyAnimal(example.value));
}

console.log('\\n=== 2. Brittle keyword rules ===');

function classifySupportMessage(message) {
  const text = message.toLowerCase();

  if (text.includes('refund')) return 'billing';
  if (text.includes('password')) return 'account';
  return 'unknown';
}

const messages = [
  'Can I get a refund?',
  'I want my money back',
  'Please return my payment',
  'I forgot my password',
  'I cannot log in',
];

for (const message of messages) {
  console.log(message, '->', classifySupportMessage(message));
}

console.log('\\n=== 3. Training examples ===');

const trainingData = [
  { text: 'Can I get a refund?', label: 'billing' },
  { text: 'I want my money back', label: 'billing' },
  { text: 'Please return my payment', label: 'billing' },
  { text: 'I forgot my password', label: 'account' },
  { text: 'I cannot log in', label: 'account' },
];

console.table(trainingData);
console.log('Idea: examples -> learning -> model -> prediction');

console.log('\\n=== 4. Parameterized toy classifier ===');

function classifyBySize(size, threshold) {
  return size < threshold ? 'cat' : 'dog';
}

console.log('size=3, threshold=10 ->', classifyBySize(3, 10));
console.log('size=20, threshold=10 ->', classifyBySize(20, 10));

console.log('The threshold is still manually chosen.');
console.log('Later, we will learn how models can learn parameters from data.');