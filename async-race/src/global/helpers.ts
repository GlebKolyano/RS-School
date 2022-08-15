import { sessionStoragePrefix } from './constants';
import {
  GetRequestRerurnType,
  PatchRequestRerurnType,
  StoragePropType,
  StorageReturnType,
  TPatchRequestProps,
  TPostRequestProps
} from './models';

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

export async function get<T>(request: string): Promise<GetRequestRerurnType<T>> {
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error();
  }
  const total = Number(response.headers.get('x-total-count'));
  const data = (await response.json()) as Promise<T>;

  return { total, data };
}

export async function httpDelete(request: string): Promise<number> {
  const response = await fetch(request, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error();
  }

  const total = Number(response.headers.get('x-total-count'));

  return total;
}

export async function patch<T, R = void>({
  request,
  patchedObj
}: TPatchRequestProps<R>): Promise<PatchRequestRerurnType<T>> {
  const response = await fetch(request, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patchedObj)
  });

  if (!response.ok) {
    throw new Error();
  }

  const total = Number(response.headers.get('x-total-count'));
  const data = (await response.json()) as Promise<T>;
  return { total, data };
}

export async function post<R>({ request, postedObj }: TPostRequestProps<R>): Promise<number> {
  const response = await fetch(request, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postedObj)
  });

  if (!response.ok) {
    throw new Error();
  }

  const total = Number(response.headers.get('x-total-count'));

  return total;
}
