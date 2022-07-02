import { INewsInfo } from '../../../modules/types';
import { isNotNullElement } from '../../../services/Addtional.service';
import './sources.css';

class Sources {
    public draw(data: Readonly<INewsInfo[]>): void {
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

            if (isNotNullElement(sourceClone, '.source__item-name')) {
                (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            } else throw new Error('source__item-name is not found!');

            if (isNotNullElement(sourceClone, '.source__item')) {
                (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
            } else throw new Error('source__item is not found!');

            fragment.append(sourceClone);
        });

        sources.innerHTML = '';
        sources.append(fragment);
    }

    public drawSelects(data: Readonly<INewsInfo[]>): void {
        if (!data.length) throw Error('Array is empty!');
        const typesOfSelects: string[] = ['category', 'country', 'language'];

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
