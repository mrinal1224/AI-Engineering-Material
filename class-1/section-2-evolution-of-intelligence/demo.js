// Class 1 — Section 2 demo
// This file makes the shift from rules to learned behavior visible.

console.log('=== Rule-based spam filter ===');

function isSpam(email) {
  const text = email.toLowerCase();

  if (text.includes('win')) return true;
  if (text.includes('free')) return true;
  if (text.includes('click')) return true;

  return false;
}

const messages = [
  'WIN ₹50,000 NOW!!!',
  'You have won a reward',
  'Claim your exclusive offer',
  'Your invoice is attached',
  'Click here for your free vacation',
];

for (const message of messages) {
  console.log(message, '->', isSpam(message));
}

console.log('\\n=== Rule-based support classifier ===');

function classifySupportMessage(message) {
  const text = message.toLowerCase();

  if (text.includes('refund')) return 'billing';
  if (text.includes('password')) return 'account';

  return 'unknown';
}

console.log(classifySupportMessage('Can I get a refund?'));
console.log(classifySupportMessage('I want my money back'));

console.log('\\n=== Parameterized toy model ===');

function classifyBySize(size, threshold) {
  return size < threshold ? 'cat' : 'dog';
}

console.log('size=3 ->', classifyBySize(3, 10));
console.log('size=20 ->', classifyBySize(20, 10));

console.log('\\nThe threshold is manually chosen.');
console.log('Later, we learn how models can learn parameters from data.');

const trainingData = [
  { size: 2, animal: 'cat' },
  { size: 3, animal: 'cat' },
  { size: 18, animal: 'dog' },
  { size: 20, animal: 'dog' },
];

console.table(trainingData);
console.log('Training intuition: examples -> learning -> model -> prediction');