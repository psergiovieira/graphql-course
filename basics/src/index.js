import { GraphQLServer } from "graphql-yoga";

//type definitions
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        address: Address!
    }

    type Address {
        id: ID!
        street: String!
        neighbor: String!
        number: Int!
    }
`;

//resolver
const resolvers = {
    Query: {
         id(){
             return 'iuaskas,da1235';
         },
         name(){
             return 'Paulo';
         },
         age(){
             return 30;
         },
         employed(){
             return true;
         },
         gpa(){
            return 10.920;
         },
         address(){
             return {
                 id: '1a2s1a5',
                 street: 'Fluorina',
                 number: 1660,
                 neighbor: 'Paraiso',                 
             }
         }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(()=>{
    console.log('Server is up and running')
})