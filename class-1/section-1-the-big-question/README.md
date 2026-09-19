# Class 1 — Section 1: The Big Question

## Theme
What is an LLM actually doing when it generates text?

## Duration
15–20 minutes

## Primary Learning Outcome
By the end of this section, learners should be able to explain:
"An LLM is a model trained to predict the next token from the context it has seen so far."

This is intentionally a first mental model. Later sections unpack token, context, prediction, and model.

## Instructor Intent
Do not begin with a formal definition. Create a sequence of questions:
1. Can a machine generate language?
2. How does a machine decide what to say next?
3. Is there always one correct next word?
4. Does context change the prediction?
5. Could text generation be viewed as repeated prediction?
6. What would a model need to learn in order to do this well?

The definition of an LLM should feel like the answer to questions students have discovered.

## Opening Hook
Write:
"Can a machine write?"

Pause, then:
"Can a machine understand language?"

Pause, then:
"What do you think ChatGPT is actually doing when we type a sentence?"

Take a few answers before explaining anything.

### Instructor note
Avoid early claims such as:
- ChatGPT understands exactly like humans.
- ChatGPT thinks like a human.
- LLMs know the correct answer.

At this stage, separate observable behavior from assumptions about human-like understanding.

## Prediction Game — Round 1
Tell the class:
"For the next few minutes, you are the language model."

Show:
The capital of France is ______

Ask everyone to shout the next word.

Expected: Paris.

Ask:
"Why did almost everyone choose Paris?"

Then:
"Did the sentence itself contain the word Paris?"

Answer: No.

Explain:
"You used the words before the blank to predict what comes next. What you already saw influenced what you predicted."

Board:
Previous text -> prediction

Introduce context informally; do not deep-dive into context windows yet.

## Prediction Game — Round 2: Multiple Valid Answers
Show:
I drink ______

Collect predictions:
water, coffee, tea, milk, juice.

Ask:
"Who is wrong?"

Important teaching moment:
There does not have to be one universally correct next word.

Explain:
Language is probabilistic. Given some context, several next tokens can be plausible, but some are more likely than others.

Board:
"I drink"
water -> likely
coffee -> likely
tea -> plausible
chair -> unlikely

The point is not that a model has a tiny fixed list. The point is that language naturally creates a distribution of plausible continuations.

## Prediction Game — Round 3: Context Changes the Prediction
Example A:
I drink hot ______
Likely: coffee, tea, milk

Example B:
I drink cold ______
Likely: water, juice, milk

Ask:
"What changed?"

Answer:
Context.

Board:
More context
  -> Different probability distribution
  -> Different next-token prediction

## Is an LLM Just Autocomplete?
Students may say:
"So an LLM is just autocomplete?"

Say:
"That is actually a useful starting point."

Explain:
Autocomplete is a good intuition, but real LLMs use learned neural representations, large parameter sets, sophisticated architectures, and long contexts to model much richer distributions.

Key statement:
Next-token prediction is the core objective.

## Live Mini Demo — Smallest Language Model
Run:

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
// Paris

console.log(predict("I drink hot"));
// coffee

Then:
console.log(predict("The capital of Germany is"));
// I don't know

Ask:
"Why did our model fail?"

Expected:
"Because we never gave it that rule."

Bridge:
"How do real models learn these patterns instead of us manually writing rules?"

Do not solve that question yet.

## Better Demo — From One Answer to a Distribution
Use:

const model = {
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

function predictDistribution(prompt) {
  return model[prompt] ?? {};
}

console.log(predictDistribution("I drink"));

Explain:
water -> 45%
coffee -> 30%
tea -> 15%
juice -> 5%
milk -> 5%

Ask:
"Would a real language model only have five possible options?"

No. A real model scores a very large vocabulary.

Core idea:
Context
  -> scores/probabilities for possible next tokens
  -> choose or sample a next token

## Core Mental Model
Write:

CONTEXT
   |
   v
+--------------+
|   LLM MODEL  |
+--------------+
   |
   v
probabilities over
possible next tokens
   |
   v
next token
   |
   v
append to text
   |
   v
predict again...

Explain:
If the user types:
"The capital of France"

the model predicts a next token such as:
Paris

The generated token becomes part of the context used for the next prediction.

Be precise: use token, not simply word.

## First Precise Definition
Large Language Model:
"A Large Language Model (LLM) is a neural network trained on large amounts of text to model language by predicting the probability of the next token given the previous context."

Break it down:
Large = large number of learned parameters and training data.
Language = models sequences of language tokens.
Model = a parameterized mathematical function that maps input to predictions.

This is a first-principles teaching definition, not a complete specification of every modern LLM or post-training technique.

## Does It Understand?
Ask:
"So does ChatGPT understand English?"

Do not force a philosophical yes/no.

Use:
"From an engineering perspective, we can explain a huge amount of its behavior without assuming human-like understanding. Our first useful abstraction is that it models patterns in token sequences and uses those learned patterns to predict what comes next."

## Retrieval Questions
Q1: What does an LLM predict?
Expected: The next token, conditioned on previous context.

Q2: Why can multiple next tokens be valid?
Expected: Because language is probabilistic; several continuations can be plausible.

Q3: Why does adding context change the prediction?
Expected: Because the probability distribution over next tokens depends on the preceding context.

Q4: Is next-token prediction the whole implementation of an LLM?
Expected: No. It is the core training/generation abstraction; the actual model uses a much more complex neural architecture.

## Common Misconceptions
"LLM predicts the next word."
Correction: "Conceptually yes, but technically we should say next token."

"The model stores every sentence it has seen."
Clarify: "A trained model primarily stores learned parameters, not a simple searchable copy of its entire training dataset."

"The model always picks the most probable token."
Clarify: "Not necessarily. Generation can involve sampling; we will study temperature, top-k, and top-p later."

"The model knows the answer and then writes it."
Clarify: "Our first mental model is sequential generation: predict the next token, append it, then predict again."

"LLM = ChatGPT."
Clarify: "ChatGPT is a product/interface. An LLM is the underlying model technology."

## Optional 60-Second Challenge
Prompt:
The programmer opened the

Collect predictions: terminal, computer, editor, laptop, code.

Then:
The programmer opened the terminal and ran

Ask again.

Takeaway:
More context can constrain the next-token distribution.

## Bridge to Section 2
End with:
"So far, we have one big idea: an LLM predicts the next token."

Then ask:
"But exactly what is a token?"
"How does a computer represent that token?"
"How can a neural network turn a huge vocabulary into probabilities?"

Those questions lead into the rest of Class 1.

## Instructor Checklist
- Language generation can be viewed as prediction.
- Context affects prediction.
- Multiple next tokens can be plausible.
- The model produces a distribution over possible next tokens.
- Generation happens sequentially.
- We say token, not simply word.
- Next-token prediction is the core abstraction, not the full implementation.
- An LLM is learned, not a manually written rule table.

## Suggested Timing
Hook + discussion: 2 min
Prediction Game Round 1: 2 min
Prediction Game Round 2: 3 min
Context experiment: 2 min
Autocomplete discussion: 2 min
JS toy model: 3 min
Definition + recap: 3 min

Total: ~17 min

## Build Artifact
class-1/section-1-the-big-question/
  README.md
  demo.js
