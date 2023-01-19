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
import { LetterRank } from "./helper/LetterRank";
import { WordList } from "./WordList";
import { Tabs } from "./Tabs";
import { BrandBadge } from "./helper/BrandBadge";

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

const tabs = [
  {
    value: "words",
    label: "Possible Words",
  },
  {
    value: "rank",
    label: "Letter Probability Ranking",
  },
];

export default function App() {
  const [gameState, setGameState] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [letterRanks, setLetterRanks] = useState(null);
  const [searchDirty, setSearchDirty] = useState(false);

  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  useEffect(() => {
    setLetterRanks(createLetterRanking(searchResult));
  }, [searchResult]);

  return (
    <div className="min-h-full flex flex-col justify-between">
      <Layout>
        <div className="mb-6 px-4 flex flex-col text-semibold text-gray-400 justify-center text-center">
          <div className="mb-2">
            Enter your guesses below to find possible words for your game
          </div>
          <div className="mb-2">Click on each square to change its color</div>
        </div>
        <div className="mb-10">
          <WordBuilder setGameState={setGameState} />
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setSearchResult(generatePossibleWords(gameState));
              setSearchDirty(true);
            }}
            className="px-4 py-2 text-white bg-indigo-700 rounded-md font-semibold focus:ring-2 focus:ring-white"
          >
            Search words
          </button>
        </div>

        {searchDirty && (
          <div className="text-gray-200 flex justify-center mb-6">
            {searchResult.length} words found
          </div>
        )}

        {searchDirty && (
          <Tabs
            className="mb-6"
            tabs={tabs}
            value={selectedTab}
            onClick={(tab) => setSelectedTab(tab.value)}
          />
        )}

        {searchDirty && selectedTab === "words" && (
          <div className="flex flex-col mb-8">
            <WordList words={searchResult} />
          </div>
        )}
        {searchDirty && selectedTab === "rank" && (
          <div className="flex flex-col items-center mb-8">
            <LetterRank wordList={searchResult} letterRanks={letterRanks} />
          </div>
        )}
        {/* {!searchDirty && (
          <div className="h-56 flex items-center justify-center text-center text-lg text-gray-700 font-semibold">
            (more features coming soon!)
          </div>
        )} */}
      </Layout>
      <div className="flex justify-end">
        <BrandBadge />
      </div>
    </div>
  );
}
