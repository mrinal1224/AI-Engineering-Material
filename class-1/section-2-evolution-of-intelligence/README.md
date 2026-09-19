# Class 1 — Section 2: The Evolution of Intelligence

## Theme
How did we get from writing rules for computers to training models that can work with language?

## Duration
20–30 minutes

## Learning Outcomes
- Explain why hand-written rules become brittle in messy real-world problems.
- Distinguish AI, ML, Deep Learning, and LLMs.
- Explain the shift from rules -> learning from examples -> neural networks -> foundation models.
- Explain that an LLM is a large deep-learning language model.
- Distinguish an LLM from a product such as ChatGPT.
- Connect this history back to the Section 1 idea of next-token prediction.

## 0. Connection From Section 1
Section 1 established a first mental model:

> An LLM predicts the next token from context.

Now ask:

> Why do we need a model for this instead of just writing rules?

This section is not a history lecture. Every step answers an engineering problem.

## 1. Opening — How Would You Teach a Computer What a Cat Is?
Write on the board: **HOW WOULD YOU TEACH A COMPUTER WHAT A CAT IS?**

Let students propose: four legs, fur, whiskers, meows, many labelled examples, train a model.

Split the ideas:

```text
Strategy A: Tell the computer the rules.
Strategy B: Give examples and let it learn patterns.
```

### Real-life analogy: teaching a junior developer
Rule-based: `IF button_clicked THEN call_api()`

Learning-oriented:
> Here are 50 good code reviews and 50 bad ones. Learn the patterns.

Key statement:
> Traditional programming explicitly encodes how a problem should be solved. Machine learning learns parameters/patterns from examples.

## 2. Era 1 — Rule-Based Systems
```text
INPUT
  |
  v
HAND-WRITTEN RULES
  |
  v
OUTPUT
```

Live JavaScript:

```js
function classifyAnimal(animal) {
  if (animal.hasFur && animal.hasWhiskers && animal.says === 'meow') {
    return 'cat';
  }
  return 'unknown';
}

console.log(classifyAnimal({
  hasFur: true,
  hasWhiskers: true,
  says: 'meow'
}));
// cat
```

Explain every piece: input, manually selected features, if-condition, and why this system is not learning.

### Break the system
- Silent cat: `{ hasFur: true, hasWhiskers: true, says: 'silent' }`
- Hairless cat: `{ hasFur: false, hasWhiskers: true, says: 'meow' }`
- Tiger: `{ hasFur: true, hasWhiskers: true, says: 'roar' }`

Ask:
> How many rules would we need to handle every real-world variation?

The problem is not JavaScript. The problem is that the programmer does not know the complete rule set.

## 3. Real-Life Analogy — Spam Filters
Ask:
> Could you write 500 perfect if/else conditions for every spam email?

Contrast examples such as 'WIN ₹50,000 NOW!!!' and 'Your payment statement is attached.'

Key idea:
> Real-world inputs contain variation that is hard to capture with a finite list of hand-written rules.

## 4. Era 2 — Machine Learning
New mental model:

```text
EXAMPLES
   |
   v
LEARNING ALGORITHM
   |
   v
MODEL
   |
   v
PREDICTION
```

Contrast:

```text
Traditional programming:
Rules + Input -> Output

Machine learning:
Input + Correct examples -> Learned model
Learned model + New input -> Prediction
```

Important abstraction:

```text
model = function(input, parameters)
```

The parameters are adjusted during training. Do not teach gradient descent here; plant the question for a later phase.

## 5. Make the Learning Idea Visible in JavaScript
Start with examples:

```js
const trainingData = [
  { size: 2, animal: 'cat' },
  { size: 3, animal: 'cat' },
  { size: 20, animal: 'dog' },
  { size: 25, animal: 'dog' },
];

function classifyBySize(size, threshold) {
  return size < threshold ? 'cat' : 'dog';
}
```

Important honesty:
> This is NOT machine learning yet. We still chose threshold = 10 ourselves.

Ask:
> What would need to change if the computer had to learn the threshold from the examples?

## 6. Era 3 — Deep Learning
Ask:
> What if the input is a photograph?

A photo can contain huge numbers of pixel values and patterns involving edges, textures, shapes, colors, objects, background, and lighting.

New mental model:

```text
RAW INPUT
   |
   v
NEURAL NETWORK
   |
   v
LEARNED REPRESENTATION
   |
   v
PREDICTION
```

Explain that a neural network is a parameterized function built from layers of mathematical operations and that training adjusts those parameters.

### Real-life analogy — recognizing a friend
> When you recognize your friend in a crowd, do you consciously run hundreds of explicit rules?

Use this only as intuition: deep learning aims to learn representations automatically rather than requiring every useful feature to be manually specified.

## 7. Deep Learning Is Not Magic
Board:

```text
Input
  |
Layer
  |
Layer
  |
Layer
  |
Prediction
```

Explain: layers perform learned transformations; the network contains parameters; training adjusts them. Do not teach backpropagation here.

## 8. AI -> ML -> DL -> LLM
```text
Artificial Intelligence
└── Machine Learning
    └── Deep Learning
        └── Language Models
            └── Large Language Models
```

Clarify this is a useful teaching hierarchy, not a perfect taxonomy.

| Concept | Practical meaning |
|---|---|
| AI | Broad goal/field of making machines perform tasks associated with intelligence |
| Machine Learning | Systems learn patterns/parameters from data |
| Deep Learning | ML using multi-layer neural networks |
| LLM | A large deep-learning language model trained to model token sequences |

### Company analogy
AI = company, ML = department, Deep Learning = specialized team, LLM = one large specialized system.

## 9. Foundation Models
Ask:
> What if we do not train one tiny model for one tiny task?

A broadly pretrained model can support writing, summarization, translation, coding, Q&A, classification, extraction and other tasks.

Definition:
> A foundation model is broadly pretrained enough to serve as a reusable base for many downstream tasks and applications.

Do not say one model knows everything.

## 10. Connect Foundation Models Back to LLMs
Return to next-token prediction. If that objective is trained over huge amounts of diverse text, the model is exposed to patterns involving syntax, vocabulary, facts, styles, code and relationships between concepts.

Careful statement:
> The training objective is simple to state; the representations learned inside a large neural network can become extremely rich.

## 11. Why 'Large' Matters
Three kinds of scale:
1. model size / parameters
2. training data
3. compute

```text
Scale + Data + Compute + Architecture -> capability
```

Clarify that bigger does not automatically mean better; data quality, architecture, optimization, post-training and evaluation matter.

## 12. ChatGPT vs LLM
```text
User
  |
  v
ChatGPT application
  +-- model(s)
  +-- system instructions
  +-- conversation state
  +-- tools
  +-- safety systems
  +-- UI
  +-- serving infrastructure
```

Key statement:
> ChatGPT is a product/application. An LLM is a model.

## 13. Rules vs Learned-System Demo
```js
function classifySupportMessage(message) {
  const text = message.toLowerCase();

  if (text.includes('refund')) return 'billing';
  if (text.includes('password')) return 'account';

  return 'unknown';
}

classifySupportMessage('Can I get a refund?');
// billing

classifySupportMessage('I want my money back');
// unknown
```

Explain that different phrases can represent the same intent, which is one reason learning-based systems are useful. Do not pretend this function is ML.

## 14. React Build — AI Hierarchy Visualizer
### Data
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

Explain `name`, `children`, tree shape, and why this data structure is recursive.

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

Explain every line and why recursion is the natural fit for tree-shaped data.

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

## 15. Final Mental Model
```text
RULES
  |  Tell the computer
  v
MACHINE LEARNING
  |  Show the computer examples
  v
DEEP LEARNING
  |  Learn useful representations
  v
FOUNDATION MODELS
  |  Broad pretraining, reusable base
  v
LLMs
  |  Model language/token sequences
  v
Next-token prediction
```

Caveat: history was not perfectly linear; this is a teaching model.

## 16. Retrieval Questions
1. What is the key difference between traditional programming and ML?
2. Is every AI system ML?
3. Is every ML system deep learning?
4. Is every deep-learning model an LLM?
5. Is ChatGPT an LLM?
6. Why can a learned system generalize better than a keyword rule in some problems?

## 17. Common Misconceptions
- AI means ML -> AI is broader.
- Deep learning just means complicated ML -> it specifically refers to neural-network-based ML with multiple layers.
- LLM means chatbot -> chatbot is an app pattern; LLM is a model.
- More parameters automatically means a better model -> not necessarily.
- Foundation model solves every problem -> it is a broadly pretrained reusable base, not a universal oracle.

## 18. Bridge to Section 3
Return to:

```text
I love JavaScript
```

Ask:
> A neural network does not receive this string as a string. What does it actually receive?

Expected: numbers.

Then:
> So how do we convert language into numbers?

This is the start of Section 3: From Text to Tokens.

## Instructor Checklist
- rule-based systems explicitly encode logic
- messy variation makes complete rule systems difficult
- ML learns patterns/parameters from examples
- deep learning uses multi-layer neural networks
- LLMs are large deep-learning language models
- foundation models are broadly pretrained reusable bases
- ChatGPT is a product, not simply another name for an LLM
- model scale, data, compute and architecture all matter
- next-token prediction connects the history to LLMs

## Timing
- Cat question + discussion: 3 min
- Rule-based demo + break cases: 4 min
- ML transition: 3 min
- Deep-learning intuition: 3 min
- AI/ML/DL/LLM hierarchy: 4 min
- Foundation model + ChatGPT: 4 min
- React build: 6–8 min
- Retrieval + bridge: 3 min
