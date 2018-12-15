import React from 'react';

import 'userInterface/react/components/App.css';
import GeoSuggestion from 'userInterface/react/containers/GeoSuggestion';
import Map from 'userInterface/react/containers/Map';
import Station from 'userInterface/react/containers/Station';

const Home = () => (
  <div className="App">
    <GeoSuggestion />
    <Map />
    <Station />
  </div>
);

export default Home;
