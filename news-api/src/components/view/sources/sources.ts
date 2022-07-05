import { typesOfSelects } from '../../../modules/constants';
import { INewsInfo } from '../../../modules/types';
import './sources.css';

class Sources {
    public draw(data: Readonly<INewsInfo[]>): void | never {
        const sources = document.querySelector('.sources') as HTMLElement;
        const sourcesErrorTemp = document.querySelector('#sources__error') as HTMLTemplateElement;
        const sourcesErrorTempClone = sourcesErrorTemp.content.cloneNode(true) as HTMLElement;

        if (!data.length) {
            sources.innerHTML = '';
            sources.append(sourcesErrorTempClone);
            throw Error('Array is empty!');
        }

        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: Readonly<INewsInfo>) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            if (sourceItemName) {
                sourceItemName.textContent = item.name;
            } else throw new Error('source__item-name is not found!');

            const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            } else throw new Error('source__item is not found!');

            fragment.append(sourceClone);
        });

        sources.innerHTML = '';
        sources.append(fragment);
    }

    public drawSelects(data: Readonly<INewsInfo[]>): void | never {
        if (!data.length) throw Error('Array is empty!');

        typesOfSelects.forEach((type) => {
            const optionsOfSelect: Set<string> = new Set();

            data.forEach((item: Readonly<INewsInfo>) => {
                optionsOfSelect.add(item[type as keyof Readonly<INewsInfo>]);
            });

            createSelect(`#${type}-select`, optionsOfSelect);
        });

        function createSelect(id: string, itemsForOptions: Set<string>): void {
            if (document.querySelector(id) !== null) {
                const categorySelect = document.querySelector(id) as HTMLTemplateElement;
                itemsForOptions.forEach((item: string) => createOptions(item, categorySelect));
            } else throw new Error('category-select is not found!');
        }

        function createOptions(optionVal: string, parentEl: HTMLTemplateElement): void {
            const optionEl = document.createElement('option');
            optionEl.innerHTML = optionVal;
            optionEl.value = optionVal;
            parentEl.append(optionEl);
        }
    }
}
export default Sources;
