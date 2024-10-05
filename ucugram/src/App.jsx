import React from "react";
import PostGrid from 'ucugram/src/components/postGrid/postGrid.jsx';
//import PostGrid from "./components/PostGrid";
import "bulma/css/bulma.min.css";
import "ucugram/src/App.css"; 

function App() {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <PostGrid />
        </div>
      </section>
    </div>
  );
}

export default App;

