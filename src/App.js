import { Layout } from "./helper/Layout";
import "./App.css";
import { WordBuilder } from "./helper/WordBuilder";
import { useState } from "react";
import {
  getFiltersFromGameState,
  positiveFilterer,
  removeWords,
  yellowFilterer,
} from "./helper/utils";
import possWordsData from "./helper/possWords.json";

export function generatePossibleWords(gameState) {
  const {
    pos: posFilter,
    yellow: yellowFilter,
    remove: removeFilter,
  } = getFiltersFromGameState(gameState);

  // console.log("p", posFilter, "n", negFilter, "r", removeFilter);
  const allWords = possWordsData.words;
  let filteredWords = removeWords(allWords, Object.keys(removeFilter));
  // console.log("1", filteredWords);
  filteredWords = positiveFilterer(filteredWords, posFilter);
  // console.log("2", filteredWords);
  filteredWords = yellowFilterer(filteredWords, yellowFilter);
  // console.log("3", filteredWords);
  return filteredWords;
}

export default function App() {
  const [gameState, setGameState] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="min-h-full" style={{ backgroundColor: "#222834" }}>
      <Layout>
        <WordBuilder setGameState={setGameState} />
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setSearchResult(generatePossibleWords(gameState))}
            className="px-4 py-2 text-white bg-indigo-700 rounded-md font-semibold focus:ring-2 focus:ring-white"
          >
            Search words
          </button>
        </div>
        <div className="flex flex-wrap justify-center mt-8">
          {searchResult.map((word) => (
            <span class="inline-flex items-center mb-1.5 mr-1.5 px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
              {word}
            </span>
          ))}
        </div>
      </Layout>
    </div>
  );
}
