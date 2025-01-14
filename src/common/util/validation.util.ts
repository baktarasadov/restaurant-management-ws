export const processValidationErrors = (errors: any, prefix = '') =>
  errors.reduce((acc: any, error: any) => {
    const propertyPath = prefix
      ? `${prefix}.${error.property}`
      : error.property;

    // If error has children, process them recursively
    if (error.children && error.children.length > 0) {
      return {
        ...acc,
        ...processValidationErrors(error.children, propertyPath),
      };
    }
    // Extract the first error message for this property
    const message = Object.values(error.constraints)[0];
    return { ...acc, [propertyPath]: message };
  }, {});
