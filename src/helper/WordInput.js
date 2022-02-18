import { cloneDeep } from "lodash";
import { useRef, useEffect } from "react";

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

export const allStates = [
  { value: "imposs", color: "#3A3A3C" },
  { value: "poss", color: "#B59F3B" },
  { value: "correct", color: "#538D4E" },
];

export function WordInput({
  wordState,
  wordStateChange,
  focused,
  handleDelete,
  allowDelete,
  ...rest
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

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
    <div className={`flex items-center relative`} {...rest}>
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
            className="w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer"
            onClick={() => {
              if (focused) {
                handleStateToggle(index);
              }
              inputRef.current.focus();
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
      <div className="hidden md:flex flex-col lg:flex-row text-sm absolute left-full origin-right">
        <button
          title="Reset word"
          onClick={() => {
            handleStateReset();
          }}
          className="ml-4 p-2 py-1 mb-1 lg:mb-0 flex items-center justify-center rounded-md bg-gray-700 font-semibold text-white"
        >
          Reset
        </button>
        {allowDelete && (
          <button
            title="Delete word"
            onClick={handleDelete}
            className="ml-4 p-2 py-1 flex items-center justify-center rounded-md font-semibold text-white"
            style={{ background: "#6a3a3a" }}
          >
            Delete
          </button>
        )}
      </div>
      <input
        autoFocus
        type="text"
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
    </div>
  );
}
