// Class 1 — Section 3 demo
// Goal: visualize the pipeline text -> tokens -> token IDs.

const sentence = 'I love JavaScript';

function tokenize(text) {
  return text.split(' ');
}

const vocab = {
  I: 101,
  love: 205,
  JavaScript: 502,
  React: 610,
  Node: 611,
  developer: 612,
  code: 613,
  AI: 614,
};

function encode(tokens) {
  return tokens.map((token) => vocab[token] ?? 0);
}

const tokens = tokenize(sentence);
const ids = encode(tokens);

console.log({
  sentence,
  tokens,
  ids,
  tokenCount: tokens.length,
});

const unknownSentence = 'I love Rust';
const unknownTokens = tokenize(unknownSentence);
const unknownIds = encode(unknownTokens);

console.log({
  sentence: unknownSentence,
  tokens: unknownTokens,
  ids: unknownIds,
});

// Exercise:
// Replace the toy whitespace tokenizer with a tokenizer that can
// at least separate punctuation such as: 'Hello, world!'