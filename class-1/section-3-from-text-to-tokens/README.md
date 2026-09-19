# Class 1 — Section 3: From Text to Tokens

## Core Question

**If an LLM is a neural network, how does `I love JavaScript` become something the neural network can actually process?**

## Runtime
25–35 minutes

## Story Arc
String -> Characters -> Unicode -> Why characters fail -> Why words fail -> Subwords -> Token IDs -> Embeddings mystery

## Learning Outcomes
- Explain why a neural network needs numerical input.
- Understand ASCII/Unicode at a high level.
- Compare character, word, and subword tokenization.
- Explain vocabulary and token IDs.
- Build a tiny tokenizer in JavaScript.
- Explain text -> tokens -> IDs.
- Explain why token IDs do not carry semantic meaning.

---

## 1. Cold Open — Where Is the English?

Open VS Code:

```js
const message = "I love JavaScript";
```

Ask:

> Where exactly is the English inside this variable?

Take answers, then ask:

> Does the CPU understand that this is English?

Teaching point:

> The system eventually operates on numerical representations. There is no special CPU object called `English`.

Do not reduce this to "computers only understand 0s and 1s". We care about the representation layers software actually uses.

---

## 2. First Layer — Characters Become Numbers

Write A, B, C.

Ask:

> Can we assign each symbol a numeric representation?

Use ASCII as the simple historical example.

| Character | ASCII code |
|---|---:|
| A | 65 |
| B | 66 |
| C | 67 |
| a | 97 |

### Live JS demo

```js
console.log("A".charCodeAt(0)); // 65
console.log("B".charCodeAt(0)); // 66
console.log("a".charCodeAt(0)); // 97
```

Explain `charCodeAt(0)` as reading the first character's numeric code unit.

Then ask:

> Are we done? Can ASCII represent the whole world?

No.

---

## 3. Break ASCII — The World Is Bigger Than English

Show:

```text
😊
你
অ
é
```

Use JavaScript to inspect Unicode-related values:

```js
console.log("é".charCodeAt(0));
console.log("你".charCodeAt(0));
console.log("অ".charCodeAt(0));
```

Explain:

> ASCII is a small historical character set. Unicode provides a much larger standardized space for representing characters and symbols across languages.

Important precision:

> Unicode is not tokenization.

Useful layering:

```text
Text / characters
        ↓
Character representation / encoding
        ↓
Bytes in memory or storage
```

Then ask:

> Even if we can represent every character, should an LLM process text character-by-character?

---

## 4. Problem #2 — Character-Level Representation

Write:

```text
unhappy
```

Then:

```text
u n h a p p y
```

Ask:

> If the model gets one character at a time, what happens to sequence length?

Compare `unbelievable` as characters.

Then:

```text
unhappy
happiness
```

Ask:

> These words are related. Does character-level representation naturally give us a useful reusable linguistic unit?

Not necessarily.

Teaching point:

> Character-level models are possible. The trade-off is often longer sequences and less direct reusable linguistic structure.

---

## 5. Problem #3 — Why Not Whole Words?

Write:

```text
I love JavaScript
```

Word-level representation:

```js
["I", "love", "JavaScript"]
```

Then attack it with:

```text
unbelievability
Mrinal1234
ScalerSchoolOfTechnology
supercalifragilisticexpialidocious
```

Ask:

> Do we want a separate vocabulary entry for every possible word humans can invent?

No.

Board:

```text
Vocabulary size ↑
Rare words ↑
Unknown words ↑
Model burden ↑
```

### LEGO analogy

> Whole-word tokenization is like trying to keep one LEGO piece for every complete object someone might ever want to build. Reusable pieces are more practical.

---

## 6. Discovery Game — Invent a Tokenizer

Tell the class:

> Forget that you have heard the word BPE. You are the tokenizer designer now.

Give:

```text
play
playing
played
player
replay
```

Ask them to invent reusable pieces.

Likely discovery:

```text
play
ing
ed
er
re
```

Then:

```text
playing -> play + ing
played  -> play + ed
player  -> play + er
replay  -> re + play
```

Reveal:

> This is the intuition behind subword tokenization.

We want reusable pieces that balance vocabulary size, sequence length, and coverage of rare words.

Do not teach the full BPE algorithm here; save that for a dedicated tokenizer deep dive.

---

## 7. First Build — Tiny Word Tokenizer

### Step 1

```js
const sentence = "I love JavaScript";
```

### Step 2

```js
const tokens = sentence.split(" ");
console.log(tokens);
// ["I", "love", "JavaScript"]
```

Ask:

> Is this a production tokenizer?

No.

Explain that this is deliberately simplified so the pipeline is visible.

---

## 8. Add a Vocabulary

Create:

```js
const vocab = {
  I: 101,
  love: 205,
  JavaScript: 502,
};
```

Explain:

> A vocabulary maps a token string to an integer identifier.

Then:

```js
const ids = tokens.map((token) => vocab[token]);
console.log(ids);
// [101, 205, 502]
```

Why integer IDs?

> They are compact identifiers that let the model refer to vocabulary entries before those entries are mapped to learned vectors.

---

## 9. The Big Reveal

Show:

```text
"I love JavaScript"
        ↓
["I", "love", "JavaScript"]
        ↓
[101, 205, 502]
```

Pause.

Say:

> This is the first moment where our sentence has become model-friendly input.

Then immediately clarify:

> `205` does not mean that the semantic meaning of `love` is 205. It is just an identifier for a vocabulary entry.

### Unforgettable sentence

> **Token IDs identify tokens. They do not contain their meaning.**

---

## 10. Live Challenge — Unknown Word

Change input to:

```js
const sentence = "I love Rust";
```

Our toy vocabulary does not contain `Rust`.

Ask:

> What should a real tokenizer do when a word is rare or unseen?

Possible discussion:
- unknown token
- split into smaller pieces
- special token

Use this to reinforce why subword tokenization is useful.

---

## 11. Why Tokens Are Not Necessarily Words

Show:

```text
play
playing
unbelievable
ChatGPT
JavaScript
```

Explain:

> A token might be a whole word, part of a word, punctuation, or another chunk depending on the tokenizer.

Important engineering point:

> **Tokenization is model-specific.**

Different models can have different token boundaries, vocabularies, and token IDs.

---

## 12. Token Count Is an Engineering Concern

Ask:

> Why should an AI engineer care how text gets split?

Because tokenization affects:
- context length
- model input limits
- latency
- inference cost
- prompt size
- truncation
- future RAG chunking choices

Board:

```text
More tokens
    ↓
More context to process
    ↓
More compute / latency / cost
```

---

## 13. What We Have Built

```text
Text
 ↓
Tokenizer
 ↓
Token strings
 ↓
Vocabulary lookup
 ↓
Token IDs
```

Ask:

> What comes next?

Expected:

> We need a learned numerical representation.

---

## 14. The Mystery at the End

Write only:

```text
205
 ↓
???
 ↓
vector
```

Ask:

> We know 205 identifies `love`. But how can the model turn this ID into a representation that is useful for language?

Then:

> **That is the next mystery: embeddings.**

---

## 15. Retrieval Questions

### Q1 — Why not feed strings directly into a neural network?
Expected: the network operates on numerical representations.

### Q2 — Why not tokenize every character?
Expected: sequences can become longer and reusable linguistic pieces are harder to exploit directly.

### Q3 — Why not tokenize every complete word?
Expected: vocabulary becomes huge and rare/unknown words become difficult.

### Q4 — Why are subwords useful?
Expected: they balance vocabulary size and sequence length and help represent rare words.

### Q5 — Does token ID 205 contain the meaning of `love`?
Expected: no, it is an identifier.

### Q6 — Is tokenization identical across LLMs?
Expected: no, it is model-specific.

---

## 16. Common Misconceptions

### A token equals a word
Not necessarily.

### Unicode equals tokenization
No. Unicode standardizes characters/symbols; tokenization maps text into model vocabulary units.

### Token IDs contain meaning
No. They are identifiers.

### Every LLM uses the same tokenizer
No.

### The tokenizer understands language
Not in the semantic sense. It performs a representation/segmentation step.

---

## 17. Mini Build Challenge

Students extend the toy tokenizer:

```js
const sentence = "I love JavaScript";

const vocab = {
  I: 101,
  love: 205,
  JavaScript: 502,
};

function tokenize(text) {
  return text.split(" ");
}

function encode(tokens) {
  return tokens.map((token) => vocab[token] ?? 0);
}

const tokens = tokenize(sentence);
const ids = encode(tokens);

console.log({ sentence, tokens, ids });
```

### Student tasks
1. Add five vocabulary entries.
2. Handle unknown tokens without crashing.
3. Print token count.
4. Try punctuation.
5. Explain why this is only a toy tokenizer.

---

## 18. Bridge to Section 4

End with:

> **We finally have numbers.**

Pause.

> But `[101, 205, 502]` are just IDs. A neural network needs a learned representation.

Write:

```text
token ID
   ↓
???
   ↓
vector
```

Then:

> **Section 4: How does a number become meaning?**

---

## Instructor Rules

- Make students invent subword tokenization before naming the concept.
- Distinguish character encoding, tokenization, and embeddings.
- Never describe token IDs as semantic numbers.
- Be precise that tokenization differs across models.
- Use the toy tokenizer to expose the pipeline, not to pretend we implemented a production tokenizer.
