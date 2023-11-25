export const appComponentTemplate = ({ flagLink, flagSelector }) => `
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const getData = () => {
    const url = "${flagLink}";

    setIsLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <List word={data} />
    </div>
  );
}

function List({ word }) {
  const [lettersShown, setLettersShown] = useState([]);

  useEffect(() => {
    if (lettersShown.length < word.length) {
      const timer = setTimeout(() => {
        setLettersShown((prevLetters) =>
          prevLetters.concat(word[prevLetters.length])
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [lettersShown, word]);

  return (
    <ul>
      {lettersShown.map((letter, index) => (
        <li key={\`\${ letter }\${ index }\`}>{letter}</li>
      ))}
    </ul>
  );
}

// const url = Array.from(document.querySelectorAll("${flagSelector}")).reduce((acc, element) => {
//   const { value } = element?.attributes?.value;
//   acc += value;
//   return acc;
// }, '');

`;