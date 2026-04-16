/**
 * Curated decks: each question has four options, an explanation, and difficulty.
 * Correct answers are verified against `correctIndex` (0–3).
 */
export const DECKS = [
  {
    id: 'js-runtime',
    title: 'JavaScript Runtime',
    subtitle: 'Event loop, memory, modules — how the engine really behaves',
    accent: '#7cf8c4',
    icon: '⚡',
    questions: [
      {
        id: 'js-1',
        text: 'What does `queueMicrotask` primarily schedule work relative to?',
        options: [
          'After the next paint',
          'Before the next macrotask, after the current JS stack clears',
          'Inside `requestIdleCallback` only',
          'After all `setTimeout(0)` callbacks',
        ],
        correctIndex: 1,
        difficulty: 'hard',
        explanation:
          'Microtasks run after the current synchronous code finishes and before the event loop takes the next task from the macrotask queue — that ordering is why promises often “feel” faster than `setTimeout(0)`.',
      },
      {
        id: 'js-2',
        text: 'Which statement best describes a JavaScript closure?',
        options: [
          'A function copied into the global scope',
          'A function that retains access to variables from its lexical environment',
          'A pattern that prevents garbage collection entirely',
          'A class method bound with `.bind(this)`',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          'Closures capture their surrounding bindings by reference, which powers callbacks, factories, and module privacy patterns.',
      },
      {
        id: 'js-3',
        text: 'What is the value of `typeof null` in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
        difficulty: 'easy',
        explanation:
          'This is a long-standing language quirk: `typeof null === "object"` for backwards compatibility. Prefer `value === null` for real null checks.',
      },
      {
        id: 'js-4',
        text: 'In ES modules, when are static `import` bindings evaluated?',
        options: [
          'Only when the imported symbol is first used',
          'Lazily inside `requestAnimationFrame`',
          'Before the module body runs, in dependency order',
          'After `DOMContentLoaded`',
        ],
        correctIndex: 2,
        difficulty: 'hard',
        explanation:
          'ES modules are parsed and linked up front; imports are hoisted and executed in a well-defined dependency graph before your module code runs.',
      },
      {
        id: 'js-5',
        text: 'Which primitive was added to represent integers beyond `Number.MAX_SAFE_INTEGER`?',
        options: ['Decimal', 'BigInt', 'Int64', 'Long'],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          '`BigInt` represents arbitrary-precision integers and cannot be mixed with `Number` without explicit conversion.',
      },
      {
        id: 'js-6',
        text: 'What does `structuredClone` guarantee compared to `JSON.parse(JSON.stringify(x))`?',
        options: [
          'It always runs faster',
          'It preserves more types (Dates, Maps, circular refs) per the HTML spec',
          'It removes all functions automatically',
          'It only works inside Web Workers',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          '`structuredClone` is the standards-based deep clone for many structured types; JSON round-trips lose types, functions, `undefined`, and cycles.',
      },
    ],
  },
  {
    id: 'web-platform',
    title: 'Web Platform 2026',
    subtitle: 'Performance, security, and resilient UX on the modern web',
    accent: '#a78bfa',
    icon: '◈',
    questions: [
      {
        id: 'wp-1',
        text: 'Which header is the primary browser signal for strict isolation from embedding origins?',
        options: [
          'Content-Security-Policy: sandbox',
          'Cross-Origin-Opener-Policy + Cross-Origin-Embedder-Policy',
          'X-Frame-Options: DENY only',
          'Permissions-Policy: geolocation=()',
        ],
        correctIndex: 1,
        difficulty: 'hard',
        explanation:
          'COOP/COEP combine to enable cross-origin isolation, unlocking `SharedArrayBuffer` and tighter timing side-channel mitigations when configured correctly.',
      },
      {
        id: 'wp-2',
        text: 'What is the main benefit of `content-visibility: auto` for long pages?',
        options: [
          'It encrypts offscreen content',
          'It lets the browser skip rendering work for offscreen subtrees',
          'It disables JavaScript for hidden nodes',
          'It forces synchronous layout for accuracy',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          'This CSS hint tells the engine it may defer layout/paint for content not needed yet — a practical win for large lists and documents.',
      },
      {
        id: 'wp-3',
        text: 'When should you prefer `fetch` streaming over buffering the full body?',
        options: [
          'Never — buffering is always faster',
          'When you want progressive UI as bytes arrive (large models, NDJSON)',
          'Only for WebSocket fallbacks',
          'Only when `Content-Length` is unknown and zero',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          'Readable streams let you parse and render incrementally, improving perceived latency for big payloads.',
      },
      {
        id: 'wp-4',
        text: 'What does `navigator.storage.estimate()` help you reason about?',
        options: [
          'CPU core count',
          'Quota usage and available persistence for client-side storage',
          'GPU memory for WebGL',
          'Network RTT only',
        ],
        correctIndex: 1,
        difficulty: 'easy',
        explanation:
          'It is the pragmatic API for understanding how close you are to eviction pressure when using Cache Storage or IndexedDB.',
      },
      {
        id: 'wp-5',
        text: 'Which pattern best preserves input responsiveness during heavy main-thread work?',
        options: [
          'Long synchronous loops in one task',
          'Chunk work via `scheduler.postTask` / `requestIdleCallback` / workers',
          'Disable `pointer-events` on `<body>`',
          'Set `z-index` very high',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          'Breaking work into smaller slices or moving it off-thread keeps INP healthy — critical for modern Core Web Vitals budgets.',
      },
      {
        id: 'wp-6',
        text: 'What is `View Transitions API` primarily designed to coordinate?',
        options: [
          'Cross-document payments',
          'Animated transitions between DOM states or navigations',
          'GPU shader compilation',
          'Service worker precaching only',
        ],
        correctIndex: 1,
        difficulty: 'easy',
        explanation:
          'The API captures old/new visual states and animates between them, giving SPA and MPA navigations a more native feel with less bespoke code.',
      },
    ],
  },
  {
    id: 'react-ui',
    title: 'React & UI Systems',
    subtitle: 'Hooks, concurrent features, and component architecture',
    accent: '#38bdf8',
    icon: '◇',
    questions: [
      {
        id: 'ru-1',
        text: 'In React 18+, what does automatic batching change for developers?',
        options: [
          'State updates are never asynchronous',
          'Multiple `setState` calls in async handlers batch into one render by default',
          'Effects run synchronously during render',
          'Refs reset on every keystroke',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          'Batching now spans promises, timeouts, and native events where possible, reducing accidental render thrash.',
      },
      {
        id: 'ru-2',
        text: 'When is `useLayoutEffect` preferred over `useEffect`?',
        options: [
          'For data fetching',
          'When you must read layout and synchronously mutate DOM before paint',
          'For animations that must never run',
          'Only inside server components',
        ],
        correctIndex: 1,
        difficulty: 'hard',
        explanation:
          'It fires after DOM updates but before the browser paints — ideal for measuring and correcting layout to avoid flicker.',
      },
      {
        id: 'ru-3',
        text: 'What problem does `useDeferredValue` primarily address?',
        options: [
          'Persisting form drafts',
          'Keeping input snappy while deferring expensive derived rendering',
          'Replacing memoization entirely',
          'Scheduling native module calls',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          'It lets React deprioritize updates to a deferred copy of some value so urgent interactions stay responsive.',
      },
      {
        id: 'ru-4',
        text: 'Which statement about controlled vs uncontrolled inputs is most accurate?',
        options: [
          'Uncontrolled inputs cannot use `defaultValue`',
          'Controlled inputs source truth in React state; uncontrolled rely more on the DOM',
          'Controlled inputs never re-render',
          'They behave identically for accessibility',
        ],
        correctIndex: 1,
        difficulty: 'easy',
        explanation:
          'Choosing controlled vs uncontrolled is about where the authoritative value lives and how much you need to coordinate with React.',
      },
      {
        id: 'ru-5',
        text: 'Why might you colocate state as low as possible in the tree?',
        options: [
          'To guarantee global singletons',
          'To minimize re-render scope and keep components easier to reason about',
          'To avoid using keys in lists',
          'To disable Strict Mode warnings',
        ],
        correctIndex: 1,
        difficulty: 'easy',
        explanation:
          'State locality reduces blast radius and makes data flow easier to follow than a single mega-store for everything.',
      },
      {
        id: 'ru-6',
        text: 'What is a practical use of `React.memo`?',
        options: [
          'To memoize async functions automatically',
          'To skip re-rendering a pure component when props are shallowly equal',
          'To replace `useCallback` in every component',
          'To batch network requests',
        ],
        correctIndex: 1,
        difficulty: 'medium',
        explanation:
          '`React.memo` is a render bailout for props equality — pair it with stable props for predictable wins.',
      },
    ],
  },
];

export const SECONDS_PER_QUESTION = 26;
