import { useState, useEffect } from "react";
import { Loading } from "./helper/Loading";
import { NoWords } from "./helper/NoWords";

const pageSize = 1000;

export function WordList({ words }) {
  const [limit, setLimit] = useState(pageSize);
  const [truncatedWords, setTruncatedWords] = useState([]);

  // reset on re-search
  useEffect(() => {
    setTruncatedWords(words.slice(0, pageSize));
    setLimit(pageSize);
  }, [words]);

  const handleShowMore = () => {
    setTruncatedWords([
      ...truncatedWords,
      ...words.slice(limit, limit + pageSize),
    ]);
    setLimit(limit + pageSize);
  };

  return (
    <div className="px-2">
      {words.length > 0 ? (
        truncatedWords.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-center mb-2">
              {truncatedWords.map((word) => (
                <Badge key={word} text={word} />
              ))}
              {limit < words.length && <Badge text="..." />}
            </div>
            {limit < words.length && (
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 text-white bg-indigo-700 rounded-md font-semibold focus:ring-2 focus:ring-white"
                  onClick={() => handleShowMore()}
                >
                  Show me more
                </button>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <NoWords />
      )}
    </div>
  );
}

function Badge({ text, className, ...rest }) {
  return (
    <span
      className={`inline-flex items-center mb-1.5 mr-1.5 px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-blue-800 ${className}`}
      {...rest}
    >
      {text}
    </span>
  );
}
