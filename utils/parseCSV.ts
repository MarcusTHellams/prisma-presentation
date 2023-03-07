import { parse } from 'papaparse';

const parseCSV = <T>(csv: string) => {
  return parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
  }).data;
};

export default parseCSV;