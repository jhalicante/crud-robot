import { useEffect, useState } from 'react';
import { ListingTable } from './components';
import { APIResponse } from './models';
import { GET } from './services';

function App() {
  return (
    <div className="container m-auto">
      <ListingTable></ListingTable>
    </div>
  );
}

export default App;
