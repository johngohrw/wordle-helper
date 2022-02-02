import { Layout } from "./helper/Layout";
import "./App.css";
import { WordBuilder } from "./helper/WordBuilder";
import { useEffect, useState } from "react";
import {
  bucketing,
  getFiltersFromGameState,
  letterRanking,
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

  const allWords = possWordsData.words;
  let filteredWords = removeWords(allWords, Object.keys(removeFilter));
  filteredWords = positiveFilterer(filteredWords, posFilter);
  filteredWords = yellowFilterer(filteredWords, yellowFilter);
  return filteredWords;
}

export function createLetterRanking(wordsArray) {
  const buckets = bucketing(wordsArray);
  const ranking = letterRanking(buckets);
  return ranking;
}

export default function App() {
  const [gameState, setGameState] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [letterRanks, setLetterRanks] = useState(null);

  useEffect(() => {
    setLetterRanks(createLetterRanking(searchResult));
  }, [searchResult]);

  return (
    <div className="min-h-full" style={{ backgroundColor: "#222834" }}>
      <Layout>
        <div className="mb-6">
          <WordBuilder setGameState={setGameState} />
        </div>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setSearchResult(generatePossibleWords(gameState))}
            className="px-4 py-2 text-white bg-indigo-700 rounded-md font-semibold focus:ring-2 focus:ring-white"
          >
            Search words
          </button>
        </div>
        {searchResult?.length > 0 && (
          <div className="flex flex-col mb-8">
            <div className="text-2xl flex text-center justify-center font-semibold text-gray-100 mb-2">
              Possible Words
            </div>
            <div className="flex flex-wrap justify-center">
              {searchResult.map((word) => (
                <span class="inline-flex items-center mb-1.5 mr-1.5 px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
        {searchResult?.length > 0 && (
          <div className="flex flex-col items-center mb-8">
            <div className="text-2xl flex text-center justify-center font-semibold text-gray-100 mb-2">
              Letter Probability Distribution
            </div>
            <LetterDistribution
              wordList={searchResult}
              letterRanks={letterRanks}
            />
          </div>
        )}
      </Layout>
    </div>
  );
}

export function LetterDistribution({ wordList, letterRanks }) {
  function getBadgeColorClass(percentage) {
    if (percentage < 2) {
      return "bg-gray-100 text-gray-800";
    } else if (percentage < 8) {
      return "bg-red-100 text-red-800";
    } else if (percentage < 16) {
      return "bg-yellow-100 text-yellow-800";
    } else if (percentage < 30) {
      return "bg-blue-100 text-blue-800b";
    } else {
      return "bg-green-100 text-green-800";
    }
  }
  return (
    <>
      {wordList?.length > 0 && (
        <div className="flex flex-row">
          {letterRanks.map((col) => (
            <div className="flex flex-col items-start border border-gray-500">
              {col.map((letter) =>
                letter.count ? (
                  <div className="flex w-full justify-between items-center px-3 mb-2">
                    <div className="w-5 text-xl font-semibold text-white flex items-center justify-center">
                      {letter.letter}
                    </div>
                    <div>
                      <span
                        style={{ padding: "2px 6px" }}
                        className={`inline-flex items-center rounded-full text-xs font-medium
                          ${getBadgeColorClass(
                            ((letter.count / wordList.length) * 100).toFixed(1)
                          )}
                          `}
                      >
                        {((letter.count / wordList.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
