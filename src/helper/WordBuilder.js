import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { WordInput, wordStateTemplate } from "./WordInput";

export function WordBuilder({ setGameState }) {
  const [wordsState, setWordState] = useState([cloneDeep(wordStateTemplate)]);
  const [selectedInput, setSelectedInput] = useState(null);
  function handleWordAdd() {
    setSelectedInput(wordsState.length);
    setWordState([...wordsState, cloneDeep(wordStateTemplate)]);
  }

  function handleWordRemove() {
    setWordState([...wordsState].slice(0, wordsState.length - 1));
  }

  function handleWordStateChange(newWordState, index) {
    const newState = [...wordsState];
    newState[index] = newWordState;
    setWordState(newState);
  }

  useEffect(() => {
    setGameState(wordsState);
  }, [wordsState, setGameState]);

  return (
    <div className="flex flex-col items-center">
      {wordsState.map((wordState, index) => {
        return (
          <WordInput
            onClick={() => setSelectedInput(index)}
            key={index}
            wordState={wordState}
            wordStateChange={(state) => handleWordStateChange(state, index)}
            focused={selectedInput === index}
          />
        );
      })}
      <div className="flex mt-4 space-x-4">
        <button
          onClick={() => {
            if (wordsState.length > 1) {
              handleWordRemove();
            }
          }}
        >
          <AiFillMinusCircle
            title="Remove word"
            style={{
              color: wordsState.length > 1 ? "#955050" : "#414141",
              height: "45px",
              width: "45px",
            }}
          />
        </button>
        <button onClick={handleWordAdd}>
          <AiFillPlusCircle
            title="Add word"
            style={{
              color: "rgb(81, 171, 81)",
              height: "45px",
              width: "45px",
            }}
          />
        </button>
      </div>
    </div>
  );
}
