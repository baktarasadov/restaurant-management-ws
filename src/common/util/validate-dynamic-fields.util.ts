export function validateDynamicFields(
  translations: any[],
  fields: string[],
  supportedLanguages: string[],
) {
  // Check for duplicate languages in the translations
  const seenLanguages = new Set();
  for (const translation of translations) {
    if (seenLanguages.has(translation.languageCode)) {
      return `Language "${translation.languageCode}" appears more than once.`;
    }
    seenLanguages.add(translation.languageCode);

    // Validate language support
    if (!supportedLanguages.includes(translation.languageCode)) {
      return `this "${translation.languageCode}" is not supported. for Restaurant`;
    }

    // Validate fields
    for (const field of fields) {
      if (
        !translation[field] ||
        typeof translation[field] !== 'string' ||
        translation[field].trim() === ''
      ) {
        return `Invalid value for "${field}" in language "${translation.languageCode}".`;
      }
    }
  }

  // Check if all supported languages are included in the translations
  for (const lang of supportedLanguages) {
    const isLanguageIncluded = translations.some(
      (translation) => translation.languageCode === lang,
    );

    if (!isLanguageIncluded) {
      return `Missing translation for language "${lang}".`;
    }
  }

  return '';
}
