

export const typeDefs = `
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
  
  type Description {
    title: String
    text: [String]
  }
  
  type ExtendedPhone {
    id: ID
    namespaceId: String
    name: String
    capacityAvailable: [String]
    capacity: String
    priceRegular: Int
    priceDiscount: Int
    colorsAvailable: [String]
    color: String
    images: [String],
    description: [Description],
    screen: String
    resolution: String
    processor: String
    ram: String
    camera: String
    zoom: String
    cell: [String]
  }
  
  input Pagination {
    offset: Int
    limit: Int
  }
  
  type User {
    id: ID!
    email: String!
    password: String!
  }
    
   type Query {
    getPhones(pagination: Pagination, sort:String, first:Int): [Phone]
    getAllPhones: [Phone]
    getPhonesCount: Int
    getExtendedPhone(id: ID!): ExtendedPhone
  }
  type Mutation {
     register(email: String, password: String): User!
  }
  `