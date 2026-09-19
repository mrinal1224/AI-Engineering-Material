// Class 1 — Section 4 demo
// Goal: visualize embeddings, similarity, and semantic search.

const embeddings = {
  love: [0.9, 0.8],
  like: [0.8, 0.7],
  hate: [0.1, 0.2],
  javascript: [0.1, 0.9],
};

function dot(a, b) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }
  return result;
}

function magnitude(vector) {
  let sum = 0;
  for (const value of vector) {
    sum += value ** 2;
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(a, b) {
  const denominator = magnitude(a) * magnitude(b);
  if (denominator === 0) {
    throw new Error('Cosine similarity is undefined for a zero vector.');
  }
  return dot(a, b) / denominator;
}

console.log('love vs like:', cosineSimilarity(embeddings.love, embeddings.like));
console.log('love vs hate:', cosineSimilarity(embeddings.love, embeddings.hate));

const documents = [
  { text: 'I enjoy building web applications', embedding: [0.85, 0.75] },
  { text: 'React is my favorite frontend library', embedding: [0.80, 0.70] },
  { text: 'I cooked pasta for dinner', embedding: [0.10, 0.20] },
  { text: 'The football match was exciting', embedding: [0.15, 0.10] },
];

const query = [0.82, 0.72];

const ranked = documents
  .map((doc) => ({
    ...doc,
    score: cosineSimilarity(query, doc.embedding),
  }))
  .sort((a, b) => b.score - a.score);

console.table(ranked);

// Teaching takeaway:
// token IDs identify vocabulary entries;
// embeddings provide learned vectors;
// similarity compares positions/directions in vector space.