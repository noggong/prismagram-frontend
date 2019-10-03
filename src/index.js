import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {ApolloProvider} from "react-apollo-hooks";
import Clinet from './Apollo/Clinet';

ReactDOM.render(<ApolloProvider client={Clinet}><App /></ApolloProvider>, document.getElementById('root'));
