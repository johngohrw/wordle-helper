import { cloneDeep } from "lodash";
import { useRef, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";

export const wordStateTemplate = {
  0: {
    letter: "",
    state: 0,
  },
  1: {
    letter: "",
    state: 0,
  },
  2: {
    letter: "",
    state: 0,
  },
  3: {
    letter: "",
    state: 0,
  },
  4: {
    letter: "",
    state: 0,
  },
};

const allStates = [
  { value: "imposs", color: "#3A3A3C" },
  { value: "poss", color: "#B59F3B" },
  { value: "correct", color: "#538D4E" },
];

export function WordInput({ wordState, wordStateChange, ...rest }) {
  const inputRef = useRef();
  const [focused, setFocused] = useState(false);

  function getValueFromState(state) {
    return Object.values(state)
      .map((o) => o.letter)
      .join("");
  }
  function handleInputChange(val) {
    const newState = { ...wordState };
    Object.keys(newState).forEach((key) => {
      newState[key].letter = "";
    });
    val.split("").forEach((letter, index) => {
      newState[index].letter = letter.toLowerCase();
    });
    wordStateChange(newState);
  }

  function handleStateToggle(col) {
    const newState = { ...wordState };
    newState[col].state = (newState[col].state + 1) % allStates.length;
    wordStateChange(newState);
  }

  function handleStateReset() {
    wordStateChange(cloneDeep(wordStateTemplate));
  }

  return (
    <div className={`flex`} {...rest}>
      <button
        title="Reset word"
        onClick={() => {
          handleStateReset();
        }}
        className="w-10 flex items-center justify-center"
      >
        <AiFillCloseCircle
          style={{
            height: "21px",
            width: "21px",
            color: "white",
          }}
        />
      </button>
      <div
        className={`flex space-x-2 p-0.5 border-2 rounded-sm  ${
          focused ? "border-white" : "border-transparent"
        }`}
      >
        {Object.entries(wordState).map(([key, col], index) => (
          <div
            key={key}
            style={{
              backgroundColor: allStates[col.state].color,
            }}
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer"
            onClick={() => {
              inputRef.current.focus();
              handleStateToggle(index);
            }}
          >
            <span className="text-white font-semibold text-2xl sm:text-4xl select-none">
              {wordState[index].letter.length > 0
                ? " _".includes(wordState[index].letter)
                  ? "_"
                  : wordState[index].letter.toUpperCase()
                : ""}
            </span>
          </div>
        ))}
      </div>
      <input
        autoFocus
        type="text"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
        ref={inputRef}
        onKeyPress={(event) => false}
        onChange={(e) => {
          let newVal = e.target.value;
          newVal = newVal.replace(/[^a-zA-Z_ ]/gi, "");
          handleInputChange(newVal);
        }}
        maxLength="5"
        value={getValueFromState(wordState)}
      />
      <button
        title="Edit word"
        onClick={() => {
          inputRef.current.focus();
        }}
        className="w-10 flex items-center justify-center"
      >
        <AiFillEdit style={{ height: "21px", width: "21px", color: "white" }} />
      </button>
    </div>
  );
}
