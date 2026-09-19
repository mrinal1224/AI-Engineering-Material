# Class 1 — Section 5: Attention — How Does the Model Know What Matters?

## Core Question
A sentence contains many tokens. How does a model decide which tokens should influence the token it is trying to represent?

## Runtime
35–45 minutes

## Story Arc
Ambiguity -> Need context -> Manual attention -> Similarity scores -> Query/Key/Value -> Softmax -> Weighted sum -> Self-attention -> Multi-head attention -> Transformer bridge

## Learning Outcomes
- Explain why tokens sometimes need information from surrounding tokens.
- Explain attention as a weighted information-routing mechanism.
- Understand Query, Key, and Value intuitively.
- Calculate attention scores with dot products.
- Convert scores into weights with softmax.
- Compute a weighted sum in JavaScript.
- Build a tiny self-attention mechanism from scratch.
- Explain why attention produces contextual representations.
- Connect the toy mechanism to the Transformer architecture.

---

## 1. Cold Open — One Word, Two Meanings

Write:

The bank approved my loan.

I sat near the bank of the river.

Circle bank in both.

Ask:
> Is bank representing exactly the same idea in both sentences?

No.

Ask:
> What changed?

Expected: the surrounding context.

Then:
> If I only gave you the token bank, could you tell me which meaning I intended?

No.

### The problem
A token sometimes needs information from other tokens to interpret its role in the sentence.

---

## 2. Real-Life Analogy — Classroom Conversation

Ask:
> Imagine 30 people are speaking in a room. If I ask you, What did Arjun say?, do you need to give equal attention to all 29 other people?

No.

Board:

Question -> Who matters right now? -> Focus on relevant information

Say:
> Attention is a mechanism for selectively using information from other tokens.

Important:
> Attention is not literal human attention. It is a mathematical mechanism for computing weighted combinations.

---

## 3. Why Embeddings Alone Are Not Enough

Return to Section 4:

bank -> vector
loan -> vector
river -> vector

Ask:
> If bank starts with a representation, how can the model make it more useful for this particular sentence?

It needs information from other token representations.

Draw:

The bank approved my loan.
      <------------>

The river bank was crowded.
          <-------->

The surrounding tokens influence the contextual representation.

---

## 4. First Manual Attention Experiment

Use:

The cat drank the milk because it was thirsty.

Circle it.

Ask:
> What does it refer to?

Expected: cat.

Ask:
> Which tokens helped you decide that?

Possible answers: cat, milk, thirsty, drank.

Then ask:
> Did every token matter equally?

Illustrative board:

The       ▏
cat       ██████████
drank     ▎
the       ▏
milk      ███
because   ▎
it        CURRENT TOKEN
was       ▏
thirsty   ████

Explain:
> Different tokens can contribute different amounts of information. Attention gives us a way to compute those weights.

---

## 5. Turn Intuition Into Numbers

Suppose the current token is it and we invent compatibility scores:

cat      -> 5.2
milk     -> 1.4
thirsty  -> 3.0
drank    -> 0.8

Ask:
> Can we use these scores to decide how much each token should contribute?

Yes.

But raw scores are awkward. We want normalized positive weights. That leads to softmax.

---

## 6. Softmax — Turning Scores Into Weights

Use:

softmax(x_i) = e^(x_i) / sum(e^(x_j))

Explain:
- exponentials make larger scores stand out
- outputs are positive
- outputs sum to 1

JavaScript:

const softmax = (scores) => {
  const maxScore = Math.max(...scores);
  const exponentials = scores.map((score) => Math.exp(score - maxScore));
  const total = exponentials.reduce((sum, value) => sum + value, 0);

  return exponentials.map((value) => value / total);
};

console.log(softmax([5.2, 1.4, 3.0, 0.8]));

Important precision:
> These are attention weights, not probabilities that a token is the correct answer.

---

## 7. Where Do the Scores Come From?

Ask:
> Who decided that cat should get 5.2 and milk should get 1.4?

Answer:
> The model needs a learned way to compare the current token with other tokens.

This leads to Query and Key.

---

## 8. Query, Key, Value — Library Analogy

Use a library:

Query = what I am looking for.
Key = what each book advertises itself as.
Value = the actual information inside the book.

Say:
> Query and Key decide relevance. Value carries the information we actually mix into the output.

This is the most important Q/K/V intuition.

---

## 9. Concrete Q/K/V Example

Sentence:

The cat drank milk

Suppose current token = drank.

Its Query is roughly asking:
> What information is relevant to understanding me?

Each token contributes a Key. We compare the Query against each Key.

The corresponding Values carry the information that gets mixed into the output.

Board:

Query
  |
compare with Keys
 /      |      \
The     cat     milk
  \      |      /
 attention scores
       ↓
 attention weights
       ↓
 weighted Values
       ↓
 contextual output

---

## 10. The Three Equations

Given input representations X:

Q = XWq
K = XWk
V = XWv

Explain:
- X = incoming token representations
- Wq = learned Query projection
- Wk = learned Key projection
- Wv = learned Value projection

Then:

scores = QK^T

Scale:

scores = QK^T / sqrt(d_k)

Normalize:

weights = softmax(scores)

Mix information:

output = weights V

Complete formula:

Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V

Say:
> This is the mathematical heart of self-attention.

Do not move on until students understand what every symbol is doing.

---

## 11. Why Divide by sqrt(d_k)?

Explain the intuition:

As vector dimension increases, raw dot products can grow in magnitude. Very large logits can make softmax extremely sharp.

Scaling by sqrt(d_k) keeps score magnitudes more manageable and helps numerical behavior during training.

Do not go deep into gradient theory here. That belongs in the training phase.

---

## 12. Build Dot Product Yourself

```js
function dot(a, b) {
  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }

  return result;
}

console.log(dot([1, 2, 3], [4, 5, 6]));
// 32
```

Explain:
1*4 + 2*5 + 3*6 = 32

Connect it:
> Dot products give us a simple compatibility score between vectors. That is why they are useful for Query-Key comparison.

---

## 13. Build Tiny Attention From Scratch

Start with a current Query:

```js
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
```

Calculate scores:

```js
const scores = keys.map((key) => dot(query, key));
console.log(scores);
```

Then:

```js
const weights = softmax(scores);
console.log(weights);
```

Now combine Values:

```js
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

console.log(weightedSum(weights, values));
```

Pause.

Say:
> The output is a new representation produced by mixing information from multiple tokens according to attention weights.

---

## 14. Big Reveal — Attention Is Information Routing

Say:
> **Attention is not magic memory. It is learned information routing.**

Board:

QUERY
  ↓
What matters to me?

KEYS
  ↓
How relevant is each token?

VALUES
  ↓
What information does each token contribute?

      ↓
Weighted combination
      ↓
New contextual representation

---

## 15. Why Self-Attention?

Ask:
> Why is it called self-attention?

Because Q, K, and V are produced from the same token sequence.

For:

The cat drank milk

Each token can attend to other tokens in the same sequence.

The result is a contextual representation for each token.

---

## 16. Visualize the Attention Matrix

Draw:

             The  cat  drank  milk
The          ▣    ▣     ▣     ▣
cat          ▣    ▣     ▣     ▣
drank        ▣    ▣     ▣     ▣
milk         ▣    ▣     ▣     ▣

Explain:
- each row corresponds to a Query token
- each column corresponds to a Key token
- each cell contains an attention score/weight after normalization

Each token can ask the rest of the sequence: who is relevant to me?

---

## 17. Why Attention Changes the LLM Story

Before attention:

token -> representation

With self-attention:

token -> look at the sequence -> selectively gather information -> contextual representation

Return to bank:

The bank approved my loan.
I sat near the bank of the river.

The representation of bank can be influenced by different surrounding tokens.

---

## 18. Why Multi-Head Attention?

Ask:
> If one attention mechanism can look at relationships, why use several heads?

Intuition:
Different heads can learn different interaction patterns.

Conceptual example only:
- one head may learn local relationships
- one may capture longer-range dependencies
- another may capture different syntactic or semantic patterns

Do not claim heads always have fixed interpretable jobs.

Diagram:

Input
  ↓
Head 1 ─┐
Head 2 ─┤
Head 3 ─┼→ concatenate → projection
Head 4 ─┘
  ↓
contextual representation

---

## 19. Attention Is Not the Whole Transformer

Say:
> Attention is one major component, not the entire Transformer.

A Transformer block also involves pieces such as:
- feed-forward network
- residual connections
- layer normalization
- multiple stacked layers
- output projection

Do not deep-dive them here. This section is focused on the attention mechanism.

---

## 20. Mini Build Challenge

Students implement:

```js
function attention(query, keys, values) {
  const scores = keys.map((key) => dot(query, key));
  const weights = softmax(scores);

  return weightedSum(weights, values);
}
```

Tasks:
1. Change the Query and observe the weights.
2. Change a Key and observe relevance.
3. Change a Value while keeping Keys unchanged.
4. Explain why Key affects relevance but Value affects the information being mixed.

---

## 21. Retrieval Questions

1. Why does `bank` need context?
Expected: different surrounding tokens can change its interpretation.

2. What does Query represent?
Expected: what the current token is looking for.

3. What does Key represent?
Expected: information used to determine relevance to the Query.

4. What does Value represent?
Expected: the information that gets combined into the output.

5. Why softmax?
Expected: convert scores into normalized positive attention weights.

6. Why QK^T?
Expected: it produces pairwise Query-Key compatibility scores.

7. Why divide by sqrt(d_k)?
Expected: keep score magnitudes controlled as dimensionality grows.

8. Why self-attention?
Expected: Q, K, and V are derived from the same sequence.

---

## 22. Common Misconceptions

### Attention is human attention
No. It is a mathematical weighting mechanism.

### Highest attention score is always the explanation of a model's reasoning
Not necessarily. Attention is an internal mechanism, not a complete explanation of reasoning.

### Every head has one fixed human-readable job
Not guaranteed.

### Q/K/V are three unrelated inputs
In self-attention they are learned projections derived from the same input representations.

### Attention alone is the Transformer
No.

---

## 23. Full Self-Attention Pipeline

```text
Token embeddings
       ↓
Create Q, K, V
       ↓
QK^T
       ↓
Scale by sqrt(d_k)
       ↓
Softmax
       ↓
Attention weights
       ↓
Weighted sum of V
       ↓
Contextual representation
```

Then connect the class:

```text
Text
 ↓
Tokens
 ↓
Token IDs
 ↓
Embeddings
 ↓
Attention
 ↓
Contextual representations
```

Say:
> We have now moved from the statement "LLMs are autocomplete" to an actual neural computation that explains how tokens exchange information.

---

## 24. Bridge to Section 6 — How Does It Learn?

Ask:
> We now know how tokens interact. But how did the model learn Wq, Wk, and Wv in the first place?

Write:

```text
Wq
Wk
Wv
 ↓
learned parameters
 ↓
training
```

End:

> **Next: How does an LLM actually learn?**

That takes us to loss, gradient descent, backpropagation, and training.

## Instructor Rules
- Start with ambiguity, not equations.
- Let students discover the need for selective information.
- Use manual attention weights before introducing Q/K/V.
- Derive equations from the intuition.
- Code dot product, softmax, and weighted sum yourself.
- Keep Q/K/V roles distinct: relevance vs information.
- Never equate attention with human attention.
- Save full Transformer architecture for the next level.
