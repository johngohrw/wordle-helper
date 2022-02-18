import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
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

  function handleDelete(delIndex) {
    setWordState([...wordsState].filter((_, index) => index !== delIndex));
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
            handleDelete={() => handleDelete(index)}
            wordState={wordState}
            wordStateChange={(state) => handleWordStateChange(state, index)}
            focused={selectedInput === index}
            allowDelete={wordsState.length > 1}
          />
        );
      })}
      <div className="flex mt-4 space-x-4">
        <button
          style={{
            background: wordsState.length > 1 ? "#955050" : "#414141",
          }}
          className={`px-3 py-1 flex items-center font-semibold bg-red-300 rounded-lg ${
            wordsState.length > 1 ? "text-white" : "text-gray-500"
          }`}
          onClick={() => {
            if (wordsState.length > 1) {
              handleWordRemove();
            }
          }}
        >
          <span className="hidden sm:block mr-2 text-xs md:text-lg">
            Remove word
          </span>
          <AiOutlineMinus
            title="Remove word"
            style={{
              height: "17px",
              width: "17px",
              margin: "4px 0",
            }}
          />
        </button>
        <button
          style={{
            background: "rgb(81, 171, 81)",
          }}
          className="px-3 py-1 flex items-center font-semibold bg-red-300 rounded-lg text-white"
          onClick={handleWordAdd}
        >
          <span className="hidden sm:block mr-2 text-xs md:text-lg">
            Add word
          </span>
          <AiOutlinePlus
            title="Add word"
            style={{
              height: "17px",
              width: "17px",
              margin: "4px 0",
            }}
          />
        </button>
      </div>
    </div>
  );
}
