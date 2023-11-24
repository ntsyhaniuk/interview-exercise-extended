export const fetchTemplate = async (endpoint) => {
  const response = await fetch(endpoint);
  const templateString = await response.text();
  return templateString;
};