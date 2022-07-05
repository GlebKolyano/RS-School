export function isNotNullElement(parrentEl: HTMLElement, className: string): HTMLElement | null {
    return parrentEl.querySelector(className);
}

export function filterButtonWork() {
    const filterButton = document.querySelector('.filter__button') as HTMLElement;
    const selectsBlock = document.querySelector('.selects') as HTMLElement;

    filterButton.addEventListener('click', () => {
        if (window.innerWidth <= 792) {
            selectsBlock.classList.toggle('selects_active');
            filterButton.classList.toggle('filter__button_active');
        }
    });
}
