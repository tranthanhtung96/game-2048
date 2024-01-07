function accumulateLeft(values) {
  const newValues = [...values];
  const vacancies = [];
  let row, col, x, buffer;
  for (row = 0; row <= 3; row++) {
    buffer = [];
    for (col = 0; col <= 2; col++) {
      if (
        newValues[row][col] > 0 &&
        newValues[row][col] === newValues[row][col + 1]
      ) {
        newValues[row][col] *= 2;
        newValues[row][++col] = 0;
      }
    }
    for (col = 0; col <= 3; col++) {
      if (newValues[row][col] > 0) {
        buffer.push(newValues[row][col]);
      }
    }
    for (col = 0; col <= 3; col++) {
      x = buffer.shift();
      if (x === undefined) {
        vacancies.push([row, col]);
        newValues[row][col] = 0;
      } else {
        newValues[row][col] = x;
      }
    }
  }
  return { newValues, vacancies };
}

function accumulateRight(values) {
  const newValues = [...values];
  const vacancies = [];
  let row, col, x, buffer;
  for (row = 0; row <= 3; row++) {
    buffer = [];
    for (col = 3; col >= 1; col--) {
      if (
        newValues[row][col] > 0 &&
        newValues[row][col] === newValues[row][col - 1]
      ) {
        newValues[row][col] *= 2;
        newValues[row][--col] = 0;
      }
    }
    for (col = 3; col >= 0; col--) {
      if (newValues[row][col] > 0) {
        buffer.push(newValues[row][col]);
      }
    }
    for (col = 3; col >= 0; col--) {
      x = buffer.shift();
      if (x === undefined) {
        vacancies.push([row, col]);
        newValues[row][col] = 0;
      } else {
        newValues[row][col] = x;
      }
    }
  }
  return { newValues, vacancies };
}

function accumulateUp(values) {
  const newValues = [...values];
  const vacancies = [];
  let row, col, x, buffer;
  for (col = 0; col <= 3; col++) {
    buffer = [];
    for (row = 0; row <= 2; row++) {
      if (
        newValues[row][col] > 0 &&
        newValues[row][col] === newValues[row + 1][col]
      ) {
        newValues[row][col] *= 2;
        newValues[++row][col] = 0;
      }
    }
    for (row = 0; row <= 3; row++) {
      if (newValues[row][col] > 0) {
        buffer.push(newValues[row][col]);
      }
    }
    for (row = 0; row <= 3; row++) {
      x = buffer.shift();
      if (x === undefined) {
        vacancies.push([row, col]);
        newValues[row][col] = 0;
      } else {
        newValues[row][col] = x;
      }
    }
  }
  return { newValues, vacancies };
}

function accumulateDown(values) {
  const newValues = [...values];
  const vacancies = [];
  let row, col, x, buffer;
  for (col = 0; col <= 3; col++) {
    buffer = [];
    for (row = 3; row >= 1; row--) {
      if (
        newValues[row][col] > 0 &&
        newValues[row][col] === newValues[row - 1][col]
      ) {
        newValues[row][col] *= 2;
        newValues[--row][col] = 0;
      }
    }
    for (row = 3; row >= 0; row--) {
      if (newValues[row][col] > 0) {
        buffer.push(newValues[row][col]);
      }
    }
    for (row = 3; row >= 0; row--) {
      x = buffer.shift();
      if (x === undefined) {
        vacancies.push([row, col]);
        newValues[row][col] = 0;
      } else {
        newValues[row][col] = x;
      }
    }
  }
  return { newValues, vacancies };
}

function random(values, vacancies) {
  const shuffled = vacancies.sort(() => 0.5 - Math.random());
  shuffled.slice(0, 2).forEach((x) => {
    let [row, col] = x;
    values[row][col] = 2 * Math.round(Math.random()) + 2;
  });
}

function checkWin(values) {
  return values.map((s) => s.includes(2048)).includes(true);
}

function checkLose(values, vacancies) {
  if (vacancies.length > 3) return false;

  for (let row = 0; row <= 2; row++) {
    for (let col = 0; col <= 3; col++) {
      if (values[row][col] > 0 && values[row][col] === values[row + 1][col]) {
        return false;
      }
    }
  }
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 2; col++) {
      if (values[row][col] > 0 && values[row][col] === values[row][col + 1]) {
        return false;
      }
    }
  }
  return true;
}

function calculate(values, direction) {
  let acc;
  switch (direction) {
    case "left":
      acc = accumulateLeft(values);
      break;
    case "right":
      acc = accumulateRight(values);
      break;
    case "up":
      acc = accumulateUp(values);
      break;
    case "down":
      acc = accumulateDown(values);
      break;
    default:
      acc = {
        newValues: [...values],
        vacancies: [],
      };
  }
  const { newValues, vacancies } = acc;
  random(newValues, vacancies);
  const isWin = checkWin(newValues);
  const isLose = !isWin && checkLose(newValues, vacancies);
  return { newValues, isWin, isLose };
}

function init() {
  const values = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  Array.from(Array(16).keys())
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .forEach((x) => {
      const row = Math.floor(x / 4);
      const col = x % 4;
      values[row][col] = 2 * Math.round(Math.random()) + 2;
    });
  return values;
}

export { calculate, init };
