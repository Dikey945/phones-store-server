import path from "path";
import fs from "fs";

const phonesPath = path.resolve(__dirname, 'phones.json');
const phones = JSON.parse(fs.readFileSync(phonesPath, 'utf8'));
interface Pagination {
  offset: number,
  limit: number
}

interface args {
  id?: string | number;
  pagination?: Pagination;
  sort?: string;
  first?: number;
}

export const resolvers = {
  Query: {
    getAllPhones: () => phones,
    getPhones: (_: any, {pagination, sort, first}: args) => {
      let phonesList = [...phones];
      if (sort) {

      }
      if (pagination) {
        const start = pagination.offset * pagination.limit;
        const end = start + pagination.limit;
        phonesList = phonesList.slice(pagination.offset * pagination.limit, end);
      }
      if(first) {
        phonesList = phonesList.slice(0, first);
      }
      return phonesList;
    }
  }
}