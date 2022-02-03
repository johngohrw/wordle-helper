import { NoWords } from "./NoWords";

export function LetterRank({ wordList, letterRanks }) {
  function getBadgeColorClass(percentage) {
    if (percentage < 2) {
      return "bg-gray-600 text-gray-400";
    } else if (percentage < 8) {
      return "bg-red-300 text-gray-800";
    } else if (percentage < 16) {
      return "bg-yellow-300 text-gray-800";
    } else if (percentage < 30) {
      return "bg-blue-400 text-gray-800";
    } else {
      return "bg-green-300 text-gray-800";
    }
  }
  return (
    <>
      {wordList?.length > 0 ? (
        <div className="flex flex-row border border-gray-600 rounded-md">
          {letterRanks.map((col, index) => (
            <div
              key={index}
              className="flex flex-col items-start border-r last:border-r-0 border-gray-600"
            >
              {col.map((letter) =>
                letter.count ? (
                  <div
                    key={letter.letter}
                    className={`w-full flex  justify-center items-center mb-1 flex-col sm:mb-0 sm:flex-row px-1 xs:px-3 py-1`}
                  >
                    <div className="w-5 text-xl font-semibold text-white flex items-center justify-center">
                      {letter.letter}
                    </div>
                    <div
                      style={{ padding: "1px 3px" }}
                      className={`inline-flex items-center rounded-md text-xs font-medium 
                          ${getBadgeColorClass(
                            ((letter.count / wordList.length) * 100).toFixed(1)
                          )}
                          `}
                    >
                      {((letter.count / wordList.length) * 100).toFixed(1)}%
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      ) : (
        <NoWords />
      )}
    </>
  );
}
