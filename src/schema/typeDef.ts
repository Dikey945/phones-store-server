

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
  
  input Pagination {
    offset: Int
    limit: Int
  }
    
   type Query {
    getPhones(pagination: Pagination, sort:String, first:Int): [Phone]
    getAllPhones: [Phone]
  }
  `