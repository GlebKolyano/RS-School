import { StoragePropType, StorageReturnType } from '../models';
import { localStoragePrefix } from '../constants';

export default class LocaleStorage {
  constructor(private prefix = localStoragePrefix) {}

  private addPrefixForFieldName(fieldName: string) {
    return this.prefix + fieldName;
  }

  public set(fieldName: string, data: StoragePropType) {
    localStorage.setItem(this.addPrefixForFieldName(fieldName), JSON.stringify(data));
  }

  public get(fieldName: string): StorageReturnType {
    const computedName = this.addPrefixForFieldName(fieldName);
    const storedItem = localStorage.getItem(computedName);

    return this.exists(fieldName) ? (JSON.parse(storedItem as string) as StoragePropType) : null;
  }

  public remove(fieldName: string) {
    const computedName = this.addPrefixForFieldName(fieldName);
    if (this.exists(fieldName)) {
      localStorage.removeItem(computedName);
    }
  }

  private exists(fieldName: string) {
    return !!localStorage.getItem(this.addPrefixForFieldName(fieldName));
  }

  public clear() {
    Object.keys(localStorage).forEach((el) => {
      if (el.indexOf(this.prefix) === 0) {
        localStorage.removeItem(el);
      }
    });
  }
}
