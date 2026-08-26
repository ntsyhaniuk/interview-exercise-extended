# Front-End Challenge Solver

## You can test it here: [https://ntsyhaniuk.github.io/interview-exercise-extended/](https://ntsyhaniuk.github.io/interview-exercise-extended/)

## Overview

This React application was developed to simplify the passing of a [technical exercise](https://leetcode.com/discuss/post/3278286/ramp-ctf-challange-by-anonymous_user-dpx3/) for a front-end position at some company. It automates the task of decoding a base64 string to reveal a link, parsing a complex DOM structure to retrieve specific elements, building a link, capturing a flag, and then displaying it character by character every second.
I was too lazy to do it manually, so I wrote an application that does it automatically and looks nice.

## How It Works

- **Base64 Validation:** Automatically verifies if a given string is a base64 string.
- **Base64 Decoding:** Decodes a given base64 string to reveal a hidden URL.
- **URL Validation:** Checks if a given string is a valid URL.
- **Instructions Parsing:** Navigate to the provided link to parse the instructions template, get a link to the challenge template, and build a selector.
- **DOM Parsing:** Navigate to the provided link to parse a complex DOM structure, retrieving elements based on a generated selector.
- **Value Retrieval and Assembly:** Joins the retrieved values to form a second link.
- **Dynamic Fetch:** Fetches a specific flag (a two-word phrase) from the second link.
- **Display a Flag:** Display a flag with fancy animation on the page.

- **Publishing:** Publishes the template of the app with the required functionality to the code sandbox.
- **Display link to the sandbox:** Builds and displays on the page a clickable link to the generated sandbox with a ready-to-run application that meets the requirements of the task.

## Installation and Usage

To use this application:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install` or `yarn`.
3. Start the application by running `npm start` or `yarn start`.
4. Input the base64 encoded string when prompted.
5. The application will automatically process the input and display the results.

## Technologies Used

- `React.js` (18) with [React Compiler](https://react.dev/learn/react-compiler/introduction) via CRACO
- `codesandbox` tools and API
- `dompurify` for sanitizing templates
- `lodash/debounce` because I'm too lazy

## React Compiler

CRA (`react-scripts`) does not expose Babel config, so the compiler is wired through **CRACO**:

- [`craco.config.js`](craco.config.js) — `babel-plugin-react-compiler` runs **first**, with `target: '18'`
- `react-compiler-runtime` is a **runtime dependency** (required for React 17/18)
- Scripts use `craco start|build|test` instead of `react-scripts`
- `eslint-plugin-react-hooks@latest` is available for Rules of React guidance; CRA still resolves its own nested hooks plugin for in-build lint, so prefer React DevTools **Memo ✨** to confirm compilation

### What the compiler replaces vs what we keep

React Compiler auto-memoizes components/hooks. It does **not** replace the architectural performance fixes from PR #17, so those were **not** reverted:

| Keep (not compiler territory) | Dropped as redundant after compiler |
|-------------------------------|-------------------------------------|
| Batched CaptureFlag `setGlobal` | Manual `useCallback` on handlers / `setGlobal` |
| `DOMParser` instead of `document.body` mutate | Manual `useMemo` on provider `value` |
| Local `isMobile` (not in global state) | Manual `useCallback` wrappers in navigate hooks |
| CSS glitch / reduced-motion tuning | |
| Router `basename`, single `GlobalProvider` | |
| Fetch `response.ok` + CaptureFlag error UI | |
| Explicit lodash `debounce` + `cancel()` | |

Verify in React DevTools: optimized components show a **Memo ✨** badge.
