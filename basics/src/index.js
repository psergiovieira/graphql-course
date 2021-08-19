import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from 'uuid';

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

const comments = [{
    id: '12453',
    text: 'nice text',
    author: 'aiuock',
    post: '1552'
},
{
    id: '789',
    text: 'awesome post',
    author: '123acbder',
    post: '697a'
},
{
    id: '654',
    text: '1st comment',
    author: '123acbder',
    post: '697a'
},
{
    id: 'ag56',
    text: 'interesting',
    author: 'aiuock',
    post: 'as148'
}]

//type definitions
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        posts(query: String): [Post!]!
        post: Post!
        comments: [Comment!]
    }

    type Mutation{
        createUser(name: String!, email: String!, age: Int): User!
    }

    type User {
        id: ID!
        name: String!
        email: String!    
        age: Int
        posts: [Post]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!] 
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

const findUsers = (author)=>{    
    return users.find((user)=> {
        return user.id === author;
     });
}

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
         },
         comments(){
             return comments;
         }
         
    },
    Mutation: {
        createUser(parent, args, ctx, info){
            const userToBeAdded = {
                id: uuidv4(),
                name: args.name,
                email: args.email
            };

            users.push(userToBeAdded);
            return userToBeAdded;            
        }
    },
    Post: {
        author(parent, args, ctx, info){
            return findUsers(parent.author);
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.post === parent.id;
            })
        }
    },
    User:{
        posts(parent, args, ctx, info){
            return posts.filter((post) => {
                return post.author == parent.id;
            })
        }
    },
    Comment:{
        author(parent, args, ctx, info){
            return findUsers(parent.author);
        },
        post(parent, args, ctx, info){            
            return posts.find((post) => {                
                return post.id === parent.post
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