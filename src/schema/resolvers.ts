import path from "path";
import fs from "fs";
import {Phone} from "../types/PhoneType";
import {User} from "../types/User";

const phonesPath = path.resolve(__dirname, 'phones.json');
const phones = JSON.parse(fs.readFileSync(phonesPath, 'utf8'));
const extendPhonesPath = path.resolve(__dirname, 'fullPhone.json');
const extendPhones = JSON.parse(fs.readFileSync(extendPhonesPath, 'utf8'));
const usersPath = path.resolve(__dirname, 'users.json');
let users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
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
  },
  Mutation: {
    register(_: any, {email, password}: any) {
      console.log(users)
      if(users.find(user => user.email === email)) {
        console.log('User with current email already exists')
        throw new Error('User with current email already exists')
      } else {
        const newUser: User = {
          id: new Date().getTime().toString(),
          email,
          password
        }
        const jsonString = JSON.stringify(newUser, null, 2);

        function insertData() {
          try {
            // Read the JSON file
            const jsonString = fs.readFileSync(usersPath, 'utf8');

            // Parse the JSON content
            const data = JSON.parse(jsonString);

            // Insert newData into the data array or object
            data.push(newUser); // If data is an array
            // OR
            // data[newData.name] = newData; // If data is an object

            // Convert the modified data back to a JSON string
            const updatedJsonString = JSON.stringify(data, null, 2);

            // Write the updated JSON string back to the file
            fs.writeFileSync(usersPath, updatedJsonString);

            console.log('Data inserted successfully');
          } catch (err) {
            console.error('Error inserting data:', err);
          }
        }

        insertData();
        users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        console.log(users)
        return newUser;
      }
    }
  }
}