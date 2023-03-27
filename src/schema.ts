import {buildSchema} from "graphql";

export const schema = `
  type Phone {
    id: ID
    category: String
    phoneId: String
    itemId: String
    name: String
    fullPrice: Int
    price: Int
    screen: String
    capacity: String
    color: String
    ram: String
    year: Int
    image: String
  }
    
   type Query {
    getPhones(id:ID, pagination:Int, sort:String, first:Int): [Phone]
  }
`