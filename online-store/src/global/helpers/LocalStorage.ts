import { StoragePropType, StorageReturnType } from '../models';
import { localStoragePrefix } from '../constants';

export default class LocaleStorage {
  constructor(private prefix = localStoragePrefix) {}

  static addPrefixForFieldName(fieldName: string) {
    return localStoragePrefix + fieldName;
  }

  static set(fieldName: string, data: StoragePropType) {
    localStorage.setItem(this.addPrefixForFieldName(fieldName), JSON.stringify(data));
  }

  static get(fieldName: string): StorageReturnType {
    const computedName = this.addPrefixForFieldName(fieldName);
    const storedItem = localStorage.getItem(computedName);

    return this.exists(fieldName) ? (JSON.parse(storedItem as string) as StoragePropType) : null;
  }

  static remove(fieldName: string) {
    const computedName = this.addPrefixForFieldName(fieldName);
    if (this.exists(fieldName)) {
      localStorage.removeItem(computedName);
    }
  }

  static exists(fieldName: string) {
    return !!localStorage.getItem(this.addPrefixForFieldName(fieldName));
  }

  static clear() {
    Object.keys(localStorage).forEach((el) => {
      if (el.indexOf(localStoragePrefix) === 0) {
        localStorage.removeItem(el);
      }
    });
  }
}
