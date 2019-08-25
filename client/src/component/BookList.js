import React,{Component} from 'react';
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import {bookdata} from '../query/query'
import BookDetail from '../component/BookDetails'

class BookList extends Component {

  constructor(props){
    super(props);
    this.state={
     selected:null
    }
  }

  render(){    
    const menu1= (props)=>{  
      if(props.data.loading){
        return(
          <li>Loading...</li>
        )
      }else{
        return props.data.books.map(book=>{
          return(
            <li key={book.id} onClick={(e)=>this.setState({selected:book.id})}>{book.name}</li>
          )
        })       
      }
    } 

    return (
      <div class="main">
        Books
        <ul>  
            {menu1(this.props)}
        </ul>
        <BookDetail selectedbook={this.state.selected}/>
      </div>
    );
  }  
}

export default graphql(bookdata)(BookList);
