const typeDefs: string = `
#type 

type Query {
  hello: String
}

type Mutation {
  #User
  createUser(fields: UserInput!): Message
  login(email:String!, password: String!): User!

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
  token: String
}

input UserInput {
  name: String
  address: String
  email: String
  password: String
}
  
`;

export default typeDefs;
