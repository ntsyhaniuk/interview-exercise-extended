export const executeInSequence = (functions, delay) => {
  if (functions.length === 0) return;

  const [firstFunction, ...remainingFunctions] = functions;

  firstFunction();

  setTimeout(() => {
    executeInSequence(remainingFunctions, delay);
  }, delay);
};

export const isBase64 = (str) => {
  // Regular expression to check if string is a valid Base64
  const regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

  // Check if the string length is a multiple of 4
  const isValidLength = str.length % 4 === 0;

  // Check if the string matches the Base64 pattern
  return isValidLength && regex.test(str);
}

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
