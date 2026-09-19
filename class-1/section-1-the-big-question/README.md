# Class 1 — Section 1: The Big Question

## Goal

This section is a **discovery exercise**, not a definition dump.

The student should discover:

> **An LLM takes context, predicts the next token, appends it, and repeats.**

## Runtime

15–20 minutes

## Story Arc

**Mystery -> Prediction -> Probability -> Context -> Generation Loop -> Reveal**

---

## 1. Cold Open

### Instructor says

> "I am going to show you something that looks obvious, but it hides the core idea behind ChatGPT."

Write:

```text
I love
```

Ask one student:

> "Finish this sentence."

Take several answers.

Likely answers:
- JavaScript
- coding
- pizza
- you

Do not correct anyone.

Then ask:

> "Why did different people produce different answers from the same two words?"

Let the class discuss.

### Reveal

Write:

```text
context -> prediction
```

Say:

> "That tiny relationship is going to explain a huge part of what an LLM does."

---

## 2. Prediction Game — You Are the LLM

Tell the class:

> "For the next five minutes, you are the language model. I give you context. You give me the next token."

### Round A — Predictable

```text
The capital of France is
```

Expected:

```text
Paris
```

Ask:

> "Was Paris written anywhere in the prompt?"

No.

Then:

> "So you used the context to make a prediction."

---

### Round B — Multiple plausible answers

```text
I drink
```

Collect 5–6 answers.

Possible:

```text
water
coffee
tea
milk
juice
```

Ask:

> "Who is wrong?"

Important reveal:

> "There doesn't have to be one universally correct next word. Language gives us a distribution of plausible continuations."

Illustrative board:

```text
I drink

water   ██████████
coffee  ███████
tea     ████
juice   ██
chair   ▏
```

Tell students:

> "These bars are only a visual analogy. These are not real LLM probabilities."

---

### Round C — Context changes the prediction

Show:

```text
I drink hot
I drink cold
I drink during
I drink after
```

Ask:

> "Should the same next word win in every case?"

Then write:

```text
More context
     ↓
Different distribution
     ↓
Different prediction
```

This is the first major idea of the class.

---

## 3. Real-Life Analogy — Phone Keyboard

Ask:

> "Why does your phone suggest something different after 'see you' versus 'see you at'?"

Expected:

> "The context changed."

Then explain:

> "LLMs use the same broad intuition of context-dependent prediction, but with a much more capable learned neural network and a vastly larger vocabulary."

Important:

> "This is an analogy for the prediction idea, not a claim that phone autocomplete and an LLM have the same internal architecture."

---

## 4. Live Demo — The Smallest Possible Language Model

Type this manually in VS Code:

```js
const brain = {
  "The capital of France is": "Paris",
  "I drink hot": "coffee",
  "I drink cold": "water",
  "React is": "awesome",
};

function predict(prompt) {
  return brain[prompt] ?? "I don't know";
}

console.log(predict("The capital of France is"));
console.log(predict("I drink hot"));
```

Explain every line:

- `brain` is our fake model.
- The key is the context.
- The value is the predicted continuation.
- `predict()` maps context to an answer.
- This is **not** a real LLM; it is a teaching model.

Now break it:

```js
console.log(predict("The capital of Germany is"));
// I don't know
```

Ask:

> "Why did it fail?"

Expected:

> "Because we manually programmed only a few cases."

Bridge:

> "Then the obvious question is: how do real models learn these patterns instead of us manually writing every rule?"

Do not answer yet.

---

## 5. Demo — One Answer Is Not Enough

Show a distribution:

```js
const distributions = {
  "I drink": {
    water: 0.45,
    coffee: 0.30,
    tea: 0.15,
    juice: 0.05,
    milk: 0.05,
  },

  "The capital of France is": {
    Paris: 0.98,
    London: 0.005,
    Berlin: 0.005,
    Rome: 0.005,
    Madrid: 0.005,
  },
};

console.table(distributions["I drink"]);
```

Say:

> "These numbers are made up by us for the demo. A real LLM computes a distribution from learned parameters."

Ask:

> "Would a real model only score five possible tokens?"

No.

Explain:

> "A real model scores a large vocabulary of candidate next tokens."

Core mental model:

```text
Context
  ↓
scores / probabilities
  ↓
candidate next tokens
  ↓
choose or sample a token
```

---

## 6. The Big Reveal — Generation Is a Loop

Now run the most important demo.

```js
const brain = {
  "I love": "JavaScript",
  "I love JavaScript": "because",
  "I love JavaScript because": "it",
  "I love JavaScript because it": "is",
  "I love JavaScript because it is": "fun",
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

console.log(generate("I love"));
```

Output:

```text
I love JavaScript because it is fun
```

Pause.

Ask:

> "What just happened?"

Walk through the loop:

```text
I love
   ↓
I love JavaScript
   ↓
I love JavaScript because
   ↓
I love JavaScript because it
   ↓
I love JavaScript because it is
   ↓
I love JavaScript because it is fun
```

### Unforgettable sentence

> **The model predicts one token, appends it to the context, and predicts again.**

That sentence becomes the foundation for the rest of the LLM phase.

---

## 7. What We Still Do Not Know

Tell students:

> "We now know what the model is trying to do. We have not yet learned how it does it."

Write:

```text
1. What exactly is a token?
2. How does text become numbers?
3. Where do the probabilities come from?
4. How does the model learn its parameters?
5. Why can it use so much context?
```

Say:

> "These are the questions we are going to answer over the next few classes."

Do **not** jump into embeddings or attention yet.

---

## 8. First Precise Definition

Only now introduce the formal definition:

> **An LLM is a large neural network trained to model language by predicting the probability of the next token given the previous context.**

Break it down:

### Large

A large number of learned parameters and substantial training data.

### Language model

A model that learns statistical structure in sequences of language tokens.

### Predict

It outputs scores/probabilities for candidate next tokens.

### Context

The preceding tokens available to condition the next prediction.

---

## 9. Thought Experiment — Does It Need Human-Like Understanding?

Ask:

> "Does the computer need a little person inside it to decide the next word?"

Let students respond.

Then say:

> "For our engineering mental model, no. We can explain the core generation loop through learned probabilistic prediction over token sequences without assuming human-like understanding."

This keeps the lecture mechanism-first.

---

## 10. Retrieval Questions

Ask without notes.

### Q1

**What does an LLM predict?**

Expected:

> The next token given the preceding context.

### Q2

**Why can several next tokens be plausible?**

Expected:

> Language is probabilistic; multiple continuations can have non-zero probability.

### Q3

**Why does context matter?**

Expected:

> Changing the context changes the conditional distribution over possible next tokens.

### Q4

**Does the model generate an entire answer in one conceptual step?**

Expected:

> Our generation abstraction is sequential: predict -> append -> predict again.

---

## 11. End-of-Section Challenge

Put this on screen:

```text
The engineer opened the
```

Everyone writes one continuation.

Then change it to:

```text
The engineer opened the terminal and ran
```

Ask:

> "Why did your prediction change?"

Expected insight:

> More context changes the next-token distribution.

---

## 12. Bridge to Section 2

End with:

> "We now know **what an LLM does**."

Pause.

> "But we have not answered **how we got from normal software written with explicit rules to a model that can learn patterns in language at this scale**."

That is Section 2.

---

## Instructor Rules for This Section

- Ask before explaining.
- Let students give wrong answers.
- Use code to reveal the concept rather than decorating the explanation.
- Never call the toy lookup table a real LLM.
- Use **token**, not only **word**.
- Separate the idea of prediction from the later mechanics of embeddings, attention, and training.
