const typeDefs: string = `
#type 

type Query {
  hello: String
}

type Mutation {
  #User
  createUser(fields: UserInput!): Message
  login(email:String!, password: String!): User!

  #Inventory
  createBulkInventory(data: [InventoryInput]) : Message

  #Issue
  issueBook(bookId: Int, userId: Int) : Message
  returnBook(bookId: Int, userId: Int) : Message

}
  
type Message {
  message: String
}

type User {
  id: ID
  name: String
  address: String
  email: String
  password: String
  type: UserType,
  token: String
}

input UserInput {
  name: String
  address: String
  email: String
  password: String
  type: UserType
}

type Inventory {
  id: ID,
  name: String, 
  author: String, 
  issued: Boolean,
}

input InventoryInput {
  name: String, 
  author: String,
  quantity: Int
}

type Issue {
  id: ID,
  book: Inventory,
  user: User,
  issued_on: String,
  issue_upto: String,
  issue_active: Boolean
}

enum UserType {
  member,
  staff
}
  
`;

export default typeDefs;
