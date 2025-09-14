// script.js

function groupBy(array, keyFn) {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function unique(array) {
  return [...new Set(array)];
}

function deepClone(obj) {
  if (typeof structuredClone === "function") {
    return structuredClone(obj);
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
}


function groupByNaive(array, keyFn) {
  const groups = {};
  for (let i = 0; i < array.length; i++) {
    const key = keyFn(array[i]);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(array[i]);
  }
  return groups;
}

function chunkNaive(array, size) {
  let result = [];
  let temp = [];
  for (let i = 0; i < array.length; i++) {
    temp.push(array[i]);
    if (temp.length === size) {
      result.push(temp);
      temp = [];
    }
  }
  if (temp.length) result.push(temp);
  return result;
}

function uniqueNaive(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

function deepCloneNaive(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function benchmark(fn, data, label) {
  console.time(label);
  fn(data);
  console.timeEnd(label);
}

function runBenchmarks() {
  const bigArray = Array.from({ length: 100000 }, (_, i) => i % 1000);

  console.log("=== Benchmark: unique ===");
  benchmark(unique, bigArray, "unique (Set)");
  benchmark(uniqueNaive, bigArray, "uniqueNaive (includes)");

  console.log("\n=== Benchmark: chunk ===");
  benchmark(arr => chunk(arr, 50), bigArray, "chunk (slice)");
  benchmark(arr => chunkNaive(arr, 50), bigArray, "chunkNaive (manual)");

  console.log("\n=== Benchmark: groupBy ===");
  benchmark(arr => groupBy(arr, x => x % 10), bigArray, "groupBy (reduce)");
  benchmark(arr => groupByNaive(arr, x => x % 10), bigArray, "groupByNaive (for)");

  console.log("\n=== Benchmark: deepClone ===");
  const bigObj = { arr: bigArray, nested: { a: 1, b: 2 } };
  benchmark(() => deepClone(bigObj), null, "deepClone (structuredClone/JSON)");
  benchmark(() => deepCloneNaive(bigObj), null, "deepCloneNaive (JSON)");
}

runBenchmarks();

module.exports = {
  groupBy,
  chunk,
  unique,
  deepClone,
  groupByNaive,
  chunkNaive,
  uniqueNaive,
  deepCloneNaive
};
