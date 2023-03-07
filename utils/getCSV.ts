import fs from 'fs-extra';

const getCSV = (file: string) => {
  return fs.readFile(file, { encoding: 'utf-8' });
};

export default getCSV;
