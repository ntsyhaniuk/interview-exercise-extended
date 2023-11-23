import { useGlobal } from '../../context';

export const ParseTemplate = () => {
  const { state } = useGlobal();

  console.log(state);

  return (
    <div>
      <h1>Enter encoded string:</h1>
      <input type="text" value={state.decodedString} />
    </div>
  );
};