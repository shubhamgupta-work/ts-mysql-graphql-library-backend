const typeDefs: string = `
#type 

type Query {
  getAllInventory(includeNonIssueable: Boolean, onlyNonIssueAble: Boolean): [InventoryList]
  getCatalogue: [InventoryList]
  getAllIssued(includeReturned: Boolean!, userEmail: String, bookName: String): [Issue]
  getExtremeBook(type: ExtremeBookType!): [IssueQuantity]
}

type Mutation {
  #User
  createUser(fields: UserInput!): Message
  login(email:String!, password: String!): User!

  #Inventory
  createBulkInventory(data: [InventoryInput]) : Message
  markAsNotIssueAble(bookId: Int): Message

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

type InventoryList {
  name: String, 
  author: String,
  quantity: Int
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
  issued_upto: String,
  issue_active: Boolean
}

type IssueQuantity {
  name: String,
  total: Int
}

enum UserType {
  member,
  staff
}

enum ExtremeBookType {
  all
  mostissued
  leastissued
}
  
`;

export default typeDefs;
