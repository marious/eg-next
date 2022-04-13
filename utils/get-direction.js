export function getDirection(locale) {
    if (!locale) return 'ltr';
    const rtlLanguages = ['ar'];
    return rtlLanguages.includes(locale) ? 'rtl' : 'ltr';
}
