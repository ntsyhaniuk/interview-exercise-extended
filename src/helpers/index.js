export const executeInSequence = (functions, delay) => {
  if (functions.length === 0) return;

  const [firstFunction, ...remainingFunctions] = functions;

  firstFunction();

  setTimeout(() => {
    executeInSequence(remainingFunctions, delay);
  }, delay);
};
