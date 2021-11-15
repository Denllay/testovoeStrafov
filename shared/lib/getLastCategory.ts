const getWeight = (value: string, shift = 0) => {
  let count = 1 + shift;

  const weights = [...value].map((num) => {
    const number = Number(num) * count;
    count = count < 10 ? count + 1 : 1;

    return number;
  });

  return weights;
};

const arrSum = (arr: number[]) => {
  if (!arr.length) return 0;

  return arr.reduce((acc, el) => (acc += el));
};

const firtTypeSizeOfNumber = 24;
const secondaryTypeSizeOfNumber = 19;

export const getLastCategory = (value: string, count = 1, shift = 0): string => {
  const isNotValidValue = value.length !== firtTypeSizeOfNumber && value.length !== secondaryTypeSizeOfNumber;

  if (isNotValidValue) return "";

  const weightsSum = arrSum(getWeight(value, shift));

  const lastCategory = weightsSum % 11;

  if (lastCategory === 10) {
    return getLastCategory(value, 2, 2);
  }
  if (count === 2) {
    return `${value}0`;
  }

  return `${value}${lastCategory}`;
};
