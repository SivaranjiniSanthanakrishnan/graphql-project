const graphql=require('graphql')
const _=require('lodash')
const bookSchema = require('../model/bookmodel')
const authorSchema = require('../model/authormodel')

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;

var books = [
    {name:'ABC',genre:'comedy', id:'1'},
    {name:'DEF',genre:'comedy', id:'2'},
    {name:'GHI',genre:'comedy', id:'3'}
]

var author = [
    {name:'author1',age:50, id:'1'},
    {name:'author2',age:60, id:'2'},
    {name:'author3',age:70, id:'3'}
]

const BookType = new GraphQLObjectType ({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                
                return authorSchema.findById(parent.author)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'author',
    fields:()=>({
        id:{type:GraphQLID},
        age:{type:GraphQLInt},
        name:{type:GraphQLString},
        books:{
            type:BookType,
            resolve(parent,args){
                return bookSchema.find({author:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{ id : {type:GraphQLID} },
            resolve(parent,args){
                //return _.find(books, {id:args.id})
                return bookSchema.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(author, {id:args.id})
                return authorSchema.findById(args.id)
            }
        },
        books:{
            type:GraphQLList(BookType),
            resolve(parent,args){
                return bookSchema.find()
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(parent,args){
                return authorSchema.find()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                author:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                var book = new bookSchema({
                    name: args.name,
                    genre: args.genre,
                    author:args.author
                });                
                return book.save();
            }
        },
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                var author = new authorSchema({
                    name: args.name,
                    age:args.age
                });                
                return author.save();
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})