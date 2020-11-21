import React from 'react';
import { render } from 'react-dom';
import { Listings } from './sections';

render(
  <React.StrictMode>
    <Listings title="TinyHouse Listings" />
  </React.StrictMode>,
  document.getElementById('root')
);
