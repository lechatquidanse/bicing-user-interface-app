import React from 'react';

import 'userInterface/react/components/App.css';
import Map from 'userInterface/react/containers/Map';
import Station from 'userInterface/react/containers/Station';

const Home = () => (
  <div className="App">
    <Map />
    <Station />
  </div>
);

export default Home;
