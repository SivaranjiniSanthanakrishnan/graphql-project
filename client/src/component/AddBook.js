import React,{Component} from 'react';
import { graphql , compose} from 'react-apollo';
import {Form, Label} from 'reactstrap'
import {authorQuery ,addBookMutation, bookdata} from '../query/query'


class AddBook extends Component {

    constructor(props){
      super(props);
  
      this.state={
        name:"",
        genre:"",
        author:""
      }
      this.loadauthor= this.loadauthor.bind(this) 
      
    }
    submitForm(e){  
        e.preventDefault();    
          
        this.props.addBookMutation({
            variables:{
                Name:this.state.name,
                Genre:this.state.genre,
                Author:this.state.author
            },
            refetchQueries:[{query:bookdata}]
        })
    }
    loadauthor=()=>{       
        var authors= this.props.authorQuery;       
        if(authors.loading){
            return(
                <option key="loading" disabled>Loading...</option>
            )
        }
        return authors.authors.map(author=>{
            return(
                <option key={author.id} value={author.id}>{author.name}</option>
            )
        })
    }
    render(){
       console.log(this.state)
        return(
            <Form id="addbook" onSubmit={this.submitForm.bind(this)}>
                <Label>Name </Label> <br/>
                <input type="text" name="Name" onChange={(e)=>this.setState({name:e.target.value})}/><br/>
                <Label>Genre</Label><br/>
                <input type="text" name="Genre" onChange={(e)=>this.setState({genre:e.target.value})}></input> <br/>
                <Label>Author</Label><br/>
                <select name="author" onChange={(e)=>this.setState({author:e.target.value})}>
                    <option value="nome" selected disabled hidden> Select Author</option>
                    {this.loadauthor()}
                </select> <br/> <br/>
                <input type="submit" value="AddBook"/>
            </Form>
        )
    }
}

export default compose(
   graphql(authorQuery,{name:"authorQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook);

// export default graphql(authorQuery) ,graphql(addBookMutation), AddBook ;
