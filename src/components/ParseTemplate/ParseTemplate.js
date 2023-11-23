import { useGlobal } from '../../context';

export const ParseTemplate = () => {
  const { state } = useGlobal();

  const { decodedString } = state;

  return (
    <div>
      <h1>Enter encoded string:</h1>
      <input type="text" value={decodedString} />
      <a href={decodedString}>{decodedString}</a>
    </div>
  );
};