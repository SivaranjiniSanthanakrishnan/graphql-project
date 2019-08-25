import React,{Component} from 'react';
import { graphql } from 'react-apollo';
import {bookdetail} from '../query/query'


class BookDetail extends Component {

    constructor(props){
      super(props);
      this.state={
        
      }    
     this.displaybookdetails= this.displaybookdetails.bind(this)
    }

    displaybookdetails=()=>{
        if(this.props.selectedbook){
            if(this.props.data.loading){
                return(
                    <div> Loading.... </div>
                )
            }else{
                console.log(this.props.data.book)
                return(
                    <div>
                        <div>Name : {this.props.data.book.name}</div> 
                        <div>Genre : {this.props.data.book.genre}</div>
                        <div>Author : {this.props.data.book.author.name}</div>
                        <div>Age : {this.props.data.book.author.age}</div>
                    </div>
                )
            }
            
        }else{
            return(
            <div> No Books selected </div>
            )
        }
    }
    render(){
        console.log(this.props)
        return(
            <div id="book-details">
                <h3> Book Details </h3> 
                {this.displaybookdetails()}
                <br/>
            </div>
        )
    }
}

export default graphql(bookdetail,{
    options: (props) => {
        return {
            variables: {
                Id: props.selectedbook
            }
        }
    }
}) (BookDetail)