import { WIDTH_SIZE } from '../modules/constants';

export function filterButtonWork() {
    const filterButton = document.querySelector('.filter__button') as HTMLElement;
    const selectsBlock = document.querySelector('.selects') as HTMLElement;

    filterButton.addEventListener('click', () => {
        if (window.innerWidth <= WIDTH_SIZE) {
            selectsBlock.classList.toggle('selects_active');
            filterButton.classList.toggle('filter__button_active');
        }
    });
}
