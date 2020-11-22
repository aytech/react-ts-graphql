import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Listings } from './sections'
import './styles/index.css'

const client = new ApolloClient({ uri: '/api' })

render(
  <ApolloProvider client={ client }>
    <React.StrictMode>
      <Listings title="TinyHouse Listings" />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
