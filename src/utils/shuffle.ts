/** Fisher-Yates shuffle */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 名前リストを指定グループ数に均等分配 */
export function divideIntoGroups(names: string[], groupCount: number): string[][] {
  const shuffled = shuffle(names);
  const groups: string[][] = Array.from({ length: groupCount }, () => []);
  shuffled.forEach((name, i) => {
    groups[i % groupCount].push(name);
  });
  return groups;
}
