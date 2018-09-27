import React from "react";

// @todo change import without ../../
import Home from "./HomePage/Home";
import Header from './../components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}