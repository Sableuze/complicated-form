const OPERANDS = ['>=', '<=', '==='];

// eslint-disable-next-line import/prefer-default-export
export const compareDates = (firstValue, secondValue, operand) => {
  if (!secondValue) return false;
  if (!OPERANDS.includes(operand)) throw new Error('Wrong operand is passed');
  let res;

  switch (operand) {
    case '<=': {
      res = firstValue <= secondValue;
      break;
    }
    case '>=': {
      res = firstValue >= secondValue;
      break;
    }
    case '===': {
      res = firstValue === secondValue;
      break;
    }
    default: {
      return false;
    }
  }
  return res;
};
