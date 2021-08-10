import { GraphQLServer } from "graphql-yoga";

//type definitions
const typeDefs = `
    type Query {
        me: Person!    
        greeting(name: String): String!    
    }

    type Person {
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
         greeting(parent, args, ctx, info){
             if(args.name)
             {
                return `Hello ${args.name}!`
             }
             return `Hello!`
         },
         me(){
             return {
               id: 'a123sa',
               name: 'Paulo',
               age: 30,
               employed: true,
               gpa: 12.80,    
               address: {
                
                    id: '1a2s1a5',
                    street: 'Fluorina',
                    number: 1660,
                    neighbor: 'Paraiso',                 
                          
             }}
         },         
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(()=>{
    console.log('Server is up and running')
})