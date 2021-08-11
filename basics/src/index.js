import { GraphQLServer } from "graphql-yoga";

//demo user data
const users = [{    
        id: '123acbder',
        name: 'Paulo',
        email: 'psvieira.ti@gmail.com'               
     }, {
        id: 'aiuock',
        name: 'Fulano ',
        email: 'fulano.ti@gmail.com'               
     },{    
        id: '9ass5a1',
        name: 'Siclano',
        email: 'siclano.ti@gmail.com'               
     }];

const posts = [{
    id: '1552',
    title: 'My First post',
    body: 'abde',
    published: true,
    author: 'aiuock'
},
{
    id: '697a',
    title: 'My second post',
    body: 'asas',
    published: true,
    author: '123acbder'
},
{
    id: 'as148',
    title: 'My third post',
    body: 'vcsdawe',
    published: true,
    author: '123acbder'
}]

//type definitions
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        posts(query: String): [Post!]!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!    
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`;

//resolver
const resolvers = {
    Query: {      
         users(parent, args, ctx, info){
             if(!args.query)
              return users;

              return users.filter((user)=>{
                return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
              })
         },
         me(){
             return {
               id: '123acbder',
               name: 'Paulo',
               email: 'psvieira.ti@gmail.com'               
            }
         },  
         posts(parent, args, ctx, info){
            if(!args.query)
                return posts;

            return posts.filter((post)=>{
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return isTitleMatch || isBodyMatch;
            });
        },
         post(){
             return {
                 id: '02848a9',
                 title: 'Some title',
                 body: 'Body goes here',
                 published: false
             }
         }
         
    },
    Post: {
        author(parent, args, ctx, info){
            return users.find((user)=> {
               return user.id === parent.author;
            });
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