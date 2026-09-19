# Class 1 — Section 2: The Engineering Problem That Led to Machine Learning

## Goal
Do not teach this as AI history. Make students feel the engineering pain of hand-written rules, then make machine learning feel like the obvious next abstraction.

**Student takeaway:** Rules tell the computer what to do. Machine learning lets the computer learn parameters and patterns from examples.

## Runtime
25–30 minutes

## Story Arc
Problem -> Rules -> Break the rules -> Need learning -> Deep learning -> Foundation models -> LLMs -> ChatGPT

## 1. Cold Open — Build the Worst Spam Filter Ever
Instructor says:
I am the backend engineer at a startup. Tomorrow we have to ship a spam filter. We only have JavaScript. How would you build it?
Collect student ideas.

Likely first answer:
if (email.includes('WIN')) spam = true;

Write more rules live:
if (email.includes('FREE')) spam = true;
if (email.includes('OFFER')) spam = true;
if (email.includes('CLICK')) spam = true;

Then say:
Congratulations. We have invented the world's most fragile spam filter.

## 2. Live Build — Rule-Based System
```js
function isSpam(email) {
  const text = email.toLowerCase();

  if (text.includes('win')) return true;
  if (text.includes('free')) return true;
  if (text.includes('click')) return true;

  return false;
}

console.log(isSpam('WIN ₹50,000 NOW!!!'));
// true

console.log(isSpam('You have won a reward'));
// false
```

Explain every line: input, normalization, hard-coded conditions, and why nothing is being learned.

## 3. Break the System
Test these messages:
- Congratulations! You won a prize.
- You have been selected for a reward.
- Claim your exclusive offer.
- Your account requires verification.
- Your invoice is attached.
- Can you click this link?

Ask: How many if-statements can we keep adding?

Board:
```text
More edge cases
      ↓
More rules
      ↓
More exceptions
      ↓
Rules interact
      ↓
System becomes brittle
```

Say:
The problem is not JavaScript. The problem is that reality does not follow our tiny list of rules.

## 4. Real-Life Analogy — Teaching a Junior Developer
Ask:
Suppose a junior developer joins your team. Do you teach them every sentence a customer might say?
No.

Instead, you might show examples:
- I need a refund -> billing
- Give my money back -> billing
- Reverse this transaction -> billing
- I forgot my password -> account
- I cannot log in -> account
- My login is not working -> account

Then say:
We are shifting from writing every rule to showing examples of the behavior we want.

Contrast:
```text
Traditional programming
Rules + Input → Output

Machine learning
Examples → Learning process → Model
Model + New input → Prediction
```

## 5. Key Abstraction — Model and Parameters
Write:
```text
prediction = f(input, parameters)
```

Explain:
- input = what the system receives
- f = the learned function
- parameters = internal numbers adjusted during training

Toy example:
```js
function classifyBySize(size, threshold) {
  return size < threshold ? 'cat' : 'dog';
}

classifyBySize(3, 10);
// cat

classifyBySize(20, 10);
// dog
```

Important:
This is not machine learning yet because we manually selected the threshold.

## 6. Thought Experiment — Can We Learn the Threshold?
Show:
```js
const trainingData = [
  { size: 2, animal: 'cat' },
  { size: 3, animal: 'cat' },
  { size: 4, animal: 'cat' },
  { size: 18, animal: 'dog' },
  { size: 20, animal: 'dog' },
  { size: 25, animal: 'dog' },
];
```

Ask:
Looking only at these examples, where would you put the threshold?

Then:
Could a program search for a threshold that makes the fewest mistakes?

Plant the idea:
Training means adjusting parameters so the model behaves better on examples.

Do not teach gradient descent yet.

## 7. What Makes Deep Learning Different?
Ask: What if instead of size, our input is a photograph?

A photo has many values and complicated patterns involving edges, textures, shapes, colors, objects, background, and lighting.

Board:
```text
RAW INPUT
   ↓
NEURAL NETWORK
   ↓
INTERNAL REPRESENTATIONS
   ↓
PREDICTION
```

Explain:
Deep learning uses neural networks with many layers of learned parameters to transform raw input into useful internal representations.

### Analogy — Recognizing a friend
Ask:
When you recognize your friend in a crowd, do you consciously execute 200 rules?

Use carefully:
The analogy is imperfect. Human brains and neural networks are not the same system. It is only intuition for learning useful representations from many examples.

## 8. AI -> ML -> DL -> LLM
Draw:
```text
Artificial Intelligence
        ↓
Machine Learning
        ↓
Deep Learning
        ↓
Language Models
        ↓
Large Language Models
```

Definitions:
- AI: broad field/goal of systems performing tasks associated with intelligence
- ML: systems learn patterns or parameters from data
- Deep Learning: ML using layered neural networks
- Language Model: model that learns statistical structure in token sequences
- LLM: a very large deep-learning language model

Important: these are nested ideas, not competing technologies.

## 9. Foundation Models
Ask:
What if we do not train one model for one tiny task?

A broadly pretrained model can support: writing, summarization, translation, coding, question answering, classification, and extraction.

Definition:
A foundation model is broadly pretrained enough to serve as a reusable base for many downstream tasks and applications.

Avoid saying one model knows everything.

## 10. Connect Back to Next-Token Prediction
Return to Section 1:
An LLM predicts the next token.

Ask:
What happens if we train that objective over huge amounts of diverse text?

Mention learned exposure to patterns involving grammar, vocabulary, code, facts, style, and relationships between concepts.

Key sentence:
The training objective can be simple to state even when the learned internal representation becomes extremely rich.

## 11. Why Is It Called Large?
Discuss three scales:
- model scale / learned parameters
- data scale
- compute scale

Board:
model scale + data scale + compute + architecture → capability

Clarify: bigger does not automatically mean better. Data quality, architecture, optimization, post-training, and evaluation also matter.

## 12. ChatGPT vs LLM
Draw:
```text
USER
  ↓
CHATGPT APPLICATION
  ├── model(s)
  ├── system instructions
  ├── conversation state
  ├── tools
  ├── safety systems
  ├── UI
  └── serving infrastructure
```

Say:
ChatGPT is a product. An LLM is a model.

## 13. Mini Demo — Keyword Rules vs Different Wording
```js
function classifySupportMessage(message) {
  const text = message.toLowerCase();

  if (text.includes('refund')) return 'billing';
  if (text.includes('password')) return 'account';

  return 'unknown';
}

console.log(classifySupportMessage('Can I get a refund?'));
// billing

console.log(classifySupportMessage('I want my money back'));
// unknown
```

Ask:
These users probably mean the same thing. Why did our program treat them differently?

Expected: it only looks for exact keywords.

Then say:
Learning-based representations can capture relationships that are not tied to one exact surface form. This function itself is still not ML.

## 14. Build — AI Hierarchy Visualizer
Use a small React build so the section has a real software artifact.

### Data shape
```jsx
const hierarchy = {
  name: 'Artificial Intelligence',
  children: [
    {
      name: 'Machine Learning',
      children: [
        {
          name: 'Deep Learning',
          children: [
            { name: 'Large Language Models', children: [] }
          ]
        }
      ]
    }
  ]
};
```

Ask: Why is this naturally a tree? Because each node can contain children of the same shape.

### Recursive component
```jsx
function TreeNode({ node }) {
  return (
    <div>
      <strong>{node.name}</strong>
      {node.children?.length > 0 && (
        <div style={{ marginLeft: 24 }}>
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
```

Explain each line and why recursion matches the tree-shaped data.

### Render
```jsx
export default function App() {
  return (
    <main>
      <h1>AI Hierarchy</h1>
      <TreeNode node={hierarchy} />
    </main>
  );
}
```

Optional challenge: add a description field and display it when a node is clicked.

## 15. Final Board Reveal
```text
RULES
  ↓ tell the computer
MACHINE LEARNING
  ↓ show examples
DEEP LEARNING
  ↓ learn representations
FOUNDATION MODELS
  ↓ broad reusable base
LLMs
  ↓ model language/token sequences
NEXT-TOKEN PREDICTION
```

Say:
We did not create LLMs because programmers suddenly became better at writing if-statements. We changed the abstraction.

## 16. Retrieval Questions
1. Why do rule-based systems become brittle?
Expected: real-world variation and exceptions are difficult to encode completely.

2. What does machine learning change?
Expected: instead of explicitly encoding every rule, we learn parameters/patterns from examples.

3. Is every AI system ML?
Expected: no.

4. Is every deep-learning model an LLM?
Expected: no.

5. Is ChatGPT an LLM?
Expected: ChatGPT is a product/application that uses model(s) plus supporting systems.

6. Why are foundation models useful?
Expected: broad pretraining creates a reusable base for many downstream applications.

## 17. Bridge to Section 3
Return to:
```text
I love JavaScript
```

Ask:
A neural network operates on numbers. What exactly is the model going to receive?

Pause.

Then:
How do we turn language into numbers?

That is Section 3: From Text to Tokens.
