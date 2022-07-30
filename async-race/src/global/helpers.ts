import { sessionStoragePrefix } from './constants';
import { StoragePropType, StorageReturnType } from './models';

export default class SessionStorage {
  static addPrefixForFieldName(fieldName: string) {
    return fieldName + sessionStoragePrefix;
  }

  static set(fieldName: string, data: StoragePropType) {
    sessionStorage.setItem(this.addPrefixForFieldName(fieldName), JSON.stringify(data));
  }

  static get(fieldName: string): StorageReturnType {
    const computedName = this.addPrefixForFieldName(fieldName);
    const storedItem = sessionStorage.getItem(computedName);

    return this.exists(fieldName) ? (JSON.parse(storedItem as string) as StoragePropType) : null;
  }

  static remove(fieldName: string) {
    const computedName = this.addPrefixForFieldName(fieldName);
    if (this.exists(fieldName)) {
      sessionStorage.removeItem(computedName);
    }
  }

  static exists(fieldName: string) {
    return !!sessionStorage.getItem(this.addPrefixForFieldName(fieldName));
  }

  static clear() {
    Object.keys(sessionStorage).forEach((el) => {
      if (el.indexOf(sessionStoragePrefix) === 0) {
        sessionStorage.removeItem(el);
      }
    });
  }
}
