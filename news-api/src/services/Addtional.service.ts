export function isNotNullElement(parrentEl: HTMLElement, className: string): boolean {
    return parrentEl.querySelector(className) !== null ? true : false;
}
