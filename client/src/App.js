import React,{Component} from 'react';
import BookList from './component/BookList'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AddBook from './component/AddBook'
var client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }  
}

export default App;
