export const isMobile = function (): boolean {
    return /mobile/i.test(window.navigator.userAgent)
};
