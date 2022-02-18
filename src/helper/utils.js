import { sortBy } from "lodash";

export function convertToArray(value) {
  return value.match(/[a-z]\w+/g);
}

export function removeWords(words, lettersToRemove) {
  let result = [...words];
  lettersToRemove.forEach((letter) => {
    result = result.filter((word) => {
      return word.indexOf(letter) === -1;
    });
  });
  return result;
}

export function getFiltersFromGameState(gameState) {
  const posFilter = {};
  const yellowFilter = {};
  const removeFilter = {};
  if (!gameState) {
    return { pos: null, neg: null, remove: null };
  }
  gameState.forEach((word) => {
    Object.entries(word).forEach(([key, letter]) => {
      if (letter.letter.length > 0 && !" _".includes(letter.letter)) {
        if (letter.state === 0) {
          removeFilter[letter.letter] = true;
        } else if (letter.state === 1) {
          yellowFilter[letter.letter] = [
            ...(yellowFilter.hasOwnProperty(letter.letter)
              ? yellowFilter[letter.letter]
              : []),
            ...[JSON.parse(key)],
          ];
        } else if (letter.state === 2) {
          posFilter[letter.letter] = JSON.parse(key);
        }
      }
    });
  });
  return { pos: posFilter, yellow: yellowFilter, remove: removeFilter };
}

export function positiveFilterer(wordsArray, positiveFilter) {
  let result = wordsArray;
  if (!result) {
    return result;
  }

  Object.entries(positiveFilter).every(([letter, index]) => {
    if (!letter || index === null) {
      return false;
    }
    index = JSON.parse(index);
    result = result.filter((word) => word[index] === letter);
    return true;
  });
  return result;
}

export function yellowFilterer(wordsArray, yellowFilterer) {
  let result = wordsArray;
  if (!result) {
    return result;
  }
  Object.entries(yellowFilterer).every(([letter, indexes]) => {
    if (!letter || indexes === null || indexes?.length <= 0) {
      return false;
    }
    indexes.forEach((index) => {
      result = result.filter((word) => word.includes(letter));
      result = result.filter((word) => !(word[index] === letter));
    });

    return true;
  });
  return result;
}

export function negativeFilterer(wordsArray, negativeFilter) {
  let result = wordsArray;
  if (!result) {
    return result;
  }
  Object.entries(negativeFilter).every(([letter, index]) => {
    if (!letter || index === null) {
      return false;
    }
    index = JSON.parse(index);
    result = result.filter((word) => word[index] !== letter);
    return true;
  });
  return result;
}

export function filtererNew(textArr, negativeFilters, positiveFilters) {
  let result = textArr;
  if (!result) {
    return result;
  }
  result = negativeFilterer(result, negativeFilters);
  result = positiveFilterer(result, positiveFilters);
  return result;
}

export function filterer(textArr, negative_filters, positive_filters) {
  let result = textArr;
  if (!result) {
    return result;
  }
  negative_filters.split("\n").every((filter) => {
    let [letter, index] = filter.split(", ");
    if (!letter || !index) {
      return false;
    }
    index = JSON.parse(index);
    result = result.filter((word) => word[index] !== letter);
    return true;
  });
  positive_filters.split("\n").every((filter) => {
    let [letter, index] = filter.split(", ");
    if (!letter || !index) {
      return false;
    }
    index = JSON.parse(index);
    result = result.filter((word) => word[index] === letter);
    return true;
  });
  return result;
}

export function bucketing(textArr) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const buckets = {};
  if (!textArr) {
    return null;
  }
  letters.split("").every((char) => {
    buckets[char] = [0, 0, 0, 0, 0];
    return true;
  });
  textArr.forEach((word) => {
    word.split("").forEach((letter, index) => {
      buckets[letter][index] += 1;
    });
  });
  return buckets;
}

export function letterRanking(buckets) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const rank = {};
  if (!buckets) {
    return null;
  }
  letters.split("").forEach((letter) => {
    rank[letter] = 0;
  });
  const ranks = [
    { ...rank },
    { ...rank },
    { ...rank },
    { ...rank },
    { ...rank },
  ];
  Object.entries(buckets).forEach(([letter, counts]) => {
    counts.forEach((count, index) => {
      ranks[index][letter] = count;
    });
  });
  const transformed = [];
  ranks.forEach((column) => {
    let columnRanking = [];
    Object.entries(column).forEach(([letter, count]) => {
      columnRanking.push({ letter, count });
    });
    transformed.push(sortBy(columnRanking, (o) => o.count * -1));
  });
  return transformed;
}
