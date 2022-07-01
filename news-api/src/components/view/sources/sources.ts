import { INewsInfo } from '../../../modules/types';
import { isNotNullElement } from '../../../services/Addtional.service';
import './sources.css';

class Sources {
    public draw(data: Readonly<INewsInfo[]>): void {
        if (!data.length) throw Error('Array is empty!');

        const fragment: DocumentFragment = document.createDocumentFragment();

        let sourceItemTemp: HTMLTemplateElement;

        if (document.querySelector('#sourceItemTemp') !== null) {
            sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        }

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

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}
export default Sources;
