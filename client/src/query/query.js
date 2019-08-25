import {gql} from 'apollo-boost'

const addBookMutation=gql`
mutation($Name:String!, $Genre:String!, $Author:ID!){
    addBook(name:$Name, genre : $Genre, author: $Author){
        name
        id
    }
}
`

const authorQuery= gql`
{
    authors{
        name
        id
    }
}
`
const bookdata=gql`
{
    books {
      id
      name
    }
  }
`
const bookdetail= gql`
query($Id:ID!){
    book(id:$Id){
        name
        genre
        author{
            name
            age
        }
    }    
}
`
export {addBookMutation, authorQuery, bookdata, bookdetail};