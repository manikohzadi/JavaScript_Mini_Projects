// script.js

const inputs = process.argv.slice(2);

function normalize(input) {
  const value = input.trim();

  const specials = {
    "": null,
    null: null,
    undefined: undefined,
    Infinity: Infinity,
    "-Infinity": -Infinity,
    true: true,
    false: false,
  };

  if (value in specials) return specials[value];

  if (/^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }

  if (value === "NaN") return NaN;

  const num = Number(value);
  if (!Number.isNaN(num)) return num;

  return value;
}

function safe_for_arithmetic(input) {
  if (typeof input === "number") {
    return Number.isFinite(input);
  }
  return false;
}

for (const input of inputs) {
  const norm = normalize(input);
  console.log(`Input: ${input}`);
  console.log(`Type: ${typeof norm}`);
  console.log(`Safe for arithmetic: ${safe_for_arithmetic(norm)}`);
  console.log(
    `Normalized: ${typeof norm === "bigint" ? norm.toString() + "n" : norm}`
  );
  console.log();
}
