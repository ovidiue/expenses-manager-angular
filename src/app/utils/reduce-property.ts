export default (arr: any, propertyName: string): any[] => {
  return Array.from(new Set(arr.map((el) => el[propertyName])));
};
