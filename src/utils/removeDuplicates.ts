export default function removeDuplicates(arr: string[]) {
  const unique = arr.reduce((acc, curr) => {
    if (!acc.includes(curr)) acc.push(curr);
    return acc;
  }, [] as string[]);
  return unique;
}
