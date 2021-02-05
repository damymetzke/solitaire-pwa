export async function loadCard(source: string): Promise<HTMLImageElement> {
  const result = new Image();
  result.src = source;
  return new Promise<HTMLImageElement>((resolve) => {
    result.addEventListener("load", () => {
      resolve(result);
    });
  });
}

export function loadCards(sources: string[]): Promise<HTMLImageElement[]> {
  const result = sources.map((source) => {
    return loadCard(source);
  });

  return Promise.all(result);
}
