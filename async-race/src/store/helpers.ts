export async function http<T>(request: string): Promise<T> {
  const response = await fetch(request);
  const data = (await response.json()) as Promise<T>;
  return data;
}
