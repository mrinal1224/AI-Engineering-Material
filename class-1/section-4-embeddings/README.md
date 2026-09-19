# Class 1 — Section 4: Embeddings

## Core Question
Section 3 ended with token ID `205`.

> If `205` is only an identifier, where does useful learned structure live?

## Runtime
30–40 minutes

## Story Arc
Token ID -> Problem -> Vector -> Similarity -> Semantic Search -> Learned Values -> Contextual Representations -> Attention

## 1. Cold Open — The Number 205

Write:

```text
love -> 205
```

Ask:
> What does 205 mean?

Expected: it identifies the token `love`.

Then ask:
> Does 205 tell the model that `love` is related to `like`, `affection`, or `romance`?

No.

Write:

```text
205
 ↓
???
 ↓
useful representation
```

Say:
> We converted language into IDs. We have not yet created a representation that lets the model represent relationships between tokens.

That is the problem embeddings solve.

## 2. Real-Life Analogy — Library Shelf

Ask:
> Imagine every book has a shelf number. Does the shelf number itself tell you what the book is about?

No.

Now imagine related books tend to be placed near one another.

```text
Cooking books       -> nearby
Travel books        -> nearby
Physics books       -> nearby
Programming books   -> nearby
```

Say:
> An embedding is conceptually closer to where something sits in a learned space than to its arbitrary ID.

Caveat: a real embedding space is not a physical room, and individual dimensions do not normally have simple human-readable labels.

## 3. The First Big Idea — Meaning as a Vector

Use a deliberately tiny 2D example:

```text
love       -> [0.9, 0.8]
like       -> [0.8, 0.7]
hate       -> [0.1, 0.2]
javascript -> [0.1, 0.9]
```

State clearly:
> These values are invented for the demo. Real embedding values are learned and usually live in a much higher-dimensional space.

Ask:
> Why is `[0.9, 0.8]` more useful than an arbitrary ID such as `205`?

Because vectors give us a space in which relationships can be compared.

### Unforgettable sentence
> **An ID identifies an item. A vector gives us a space in which relationships can be represented.**

## 4. Build the Toy Embedding Space

```js
const embeddings = {
  love: [0.9, 0.8],
  like: [0.8, 0.7],
  hate: [0.1, 0.2],
  javascript: [0.1, 0.9],
};

console.log(embeddings.love);
```

Explain every part: token key, vector array, dimensions, and why we should not assign one simple concept to one dimension.

## 5. First Similarity Demo — Euclidean Distance

Ask:
> If two words are points, how can we tell whether they are close?

```js
function distance(a, b) {
  let sum = 0;

  for (let i = 0; i < a.length; i++) {
    const difference = a[i] - b[i];
    sum += difference ** 2;
  }

  return Math.sqrt(sum);
}

console.log(distance(embeddings.love, embeddings.like));
console.log(distance(embeddings.love, embeddings.hate));
```

Walk through subtraction, squaring, summing, square root.

Expected intuition: in this toy space, `love` is closer to `like` than `hate`.

## 6. Why Cosine Similarity?

Ask:
> What if two vectors point in almost the same direction but have different lengths?

Explain that sometimes direction is more useful than magnitude.

Formula:

```text
             a · b
cos(a,b) = -----------
            ||a|| ||b||
```

Derive the pieces instead of hiding them in a library.

## 7. Build Cosine Similarity in JavaScript

```js
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

console.log(cosineSimilarity(embeddings.love, embeddings.like));
console.log(cosineSimilarity(embeddings.love, embeddings.hate));
```

Teaching point:

```text
similar direction -> higher similarity signal
less related     -> lower similarity signal
```

Do not call cosine similarity a perfect semantic truth machine.

## 8. The Big Mental Model

```text
Token
  ↓
Token ID
  ↓
Embedding lookup
  ↓
Vector
  ↓
Position in learned space
```

Key distinction:
- ID = identifier
- embedding = learned numerical representation

## 9. Live Experiment — Semantic Search

```js
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
```

Reveal:
> **We just built the core idea behind semantic search.**

Important caveat: real search systems often combine several techniques. This demo isolates embeddings.

## 10. Real-Life Analogy — Search by Intent

Search:

```text
cheap Italian food nearby
```

Explain the difference between literal keyword overlap and representing query/content in a shared learned space.

Use this later when introducing RAG and semantic retrieval.

## 11. Who Chose `0.91`?

Show:

```text
love -> [0.91, -0.42, 0.18, ...]
```

Ask:
> Who decided that `0.91` should be there?

Answer:
> **We didn't. The representation is learned during training.**

Board:

```text
initial parameters
       ↓
training examples
       ↓
loss / gradients
       ↓
updated parameters
       ↓
learned representation
```

Do not teach backpropagation here. This is just the bridge to the later training phase.

## 12. Contextual Representations — Preview

Show:

```text
The bank approved my loan.
The river bank was crowded.
```

Explain:
> Classic word embeddings give one vector per vocabulary item. Modern Transformer systems can also produce contextual representations whose representation depends on surrounding tokens.

Then:
> Later, attention will show us how surrounding tokens influence one another.

## 13. What We Built

```text
token ID
   ↓
embedding vector
   ↓
vector comparison
   ↓
semantic similarity
   ↓
semantic search
```

That is already a real AI-engineering pattern.

## 14. Retrieval Questions

1. Why is `[101, 205, 502]` not enough for semantic reasoning?
2. What does an embedding represent?
3. Does one dimension correspond to one human-readable concept?
4. Why can cosine similarity be useful?
5. Where do embedding values come from?
6. Does high cosine similarity prove two texts mean exactly the same thing?

Expected answers should reinforce: IDs are identifiers; embeddings are learned vectors; dimensions are distributed representations; cosine is a similarity signal; values are learned; similarity is imperfect.

## 15. Common Misconceptions

- Embedding = token ID -> false.
- One dimension = one concept -> usually false.
- High cosine = identical meaning -> false.
- Embeddings are only for search -> false.
- Humans manually choose every embedding value -> false.

## 16. Real Embedding API Demo

Only after the toy implementation is clear:

```js
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'I love building software',
});

const vector = response.data[0].embedding;

console.log(vector.length);
console.log(vector.slice(0, 10));
```

Explain:
- text goes in
- numerical vector comes out
- dimensionality is model-dependent
- vectors can be compared with similarity functions

## 17. Mini Build Challenge — Semantic Search

Students:
1. Create five toy document vectors.
2. Create one query vector.
3. Compute cosine similarity.
4. Rank documents.
5. Print the top three.
6. Replace toy vectors with actual embedding API outputs.

Optional extension: search box + nearest-document results.

## 18. Bridge to Section 5 — Attention

Show:

```text
Token IDs
    ↓
Embeddings
    ↓
Vector space
    ↓
Semantic relationships
```

Then write:

```text
The cat sat on the mat
```

Ask:
> A sentence contains many tokens. How does the model decide which tokens should influence which other tokens?

Answer:
> **Attention.**

## Instructor Rules
- Repeat ID vs embedding.
- Use toy vectors before any API.
- Do not assign simple human labels to individual dimensions.
- Treat cosine similarity as a signal, not a truth oracle.
- Explain where vectors come from conceptually, but save backpropagation for the training phase.
- Mention contextual embeddings only as a bridge to Transformers.
