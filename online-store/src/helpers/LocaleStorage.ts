import { StoragePropType, StorageReturnType } from '../models/models';
import { localStoragePrefix } from './constants';

export default class LocaleStorage {
  constructor(private prefix = localStoragePrefix) {}

  addPrefixForFieldName(fieldName: string) {
    return this.prefix + fieldName;
  }

  set(fieldName: string, data: StoragePropType) {
    localStorage.setItem(this.addPrefixForFieldName(fieldName), JSON.stringify(data));
  }

  get(fieldName: string): StorageReturnType {
    const computedName = this.addPrefixForFieldName(fieldName);
    const storedItem = localStorage.getItem(computedName);

    return this.exists(fieldName) ? (JSON.parse(storedItem as string) as StoragePropType) : null;
  }

  exists(fieldName: string) {
    return !!localStorage.getItem(this.addPrefixForFieldName(fieldName));
  }

  clear() {
    Object.keys(localStorage).forEach((el) => {
      if (el.indexOf(this.prefix) === 0) {
        localStorage.removeItem(el);
      }
    });
  }
}
