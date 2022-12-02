export const buildCategories = (categories) => {
  let categoriesOpts = [{ label: "All", value: "" }];
  if (categories) {
    categories.forEach((category) => {
      categoriesOpts.push({
        label: category.name,
        value: category.id,
      });
    });
  }

  return categoriesOpts;
};
