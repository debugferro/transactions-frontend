export const accessValueThroughString = (value, idString) => {
  const accessors = idString.split(".");
  let newValue;
  accessors.forEach((accessor) => {
    if (newValue) {
      newValue = newValue[accessor];
    } else {
      newValue = value[accessor];
    }
  });
  return newValue;
};