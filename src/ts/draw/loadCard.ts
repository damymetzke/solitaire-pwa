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

export async function batchLoadCards(
  sources: Promise<{ default: string }>[]
): Promise<[HTMLImageElement, HTMLImageElement[]]> {
  const convertedSources = (await Promise.all(sources)).map(
    (source) => source.default
  );
  const result = await loadCards(convertedSources);
  return [result[0], result.slice(1)];
}
