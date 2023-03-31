import path from "path";
import fs from "fs";
import {Phone} from "../types/PhoneType";

const phonesPath = path.resolve(__dirname, 'phones.json');
const phones = JSON.parse(fs.readFileSync(phonesPath, 'utf8'));
const extendPhonesPath = path.resolve(__dirname, 'fullPhone.json');
const extendPhones = JSON.parse(fs.readFileSync(extendPhonesPath, 'utf8'));
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

const discount = (phone: Phone) => {
  return phone.fullPrice - phone.price
}

export const resolvers = {
  Query: {
    getAllPhones: () => phones,
    getPhones: (_: any, {pagination, sort, first}: args) => {

      let phonesList = [...phones];
      if (sort) {
        switch (sort) {
          case 'newest':
            phonesList = phonesList.sort((phoneA, phoneB): any => (
              phoneA.year - phoneB.year
            ))
            break;
          case 'cheapest':
            phonesList = phonesList.sort((phoneA, phoneB): any => (
              phoneA.price - phoneB.price
            ))
            break;
          case 'discount':
            phonesList = phonesList.sort((phoneA, phoneB): any => (
              discount(phoneB) - discount(phoneA)
            ))
            break;
        }
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
    },
    getPhonesCount: () => phones.length,
    getExtendedPhone: (_: any, {id}: args) => {
      return extendPhones.find((phone: Phone) => phone.id === id)
    }
  }
}