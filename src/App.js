import React from "react";
import Header from "./Componets/Header";
import FrideContainer from "./containers/FrideContainer";

function App() {
  return (
    <div className='App'>
      <div className='top-section'>
        <Header headerTitle={`Good morning Johny`}  subTitle={`It's better to go shopping before this friday`}/>
      </div>
      <div className='bottom-section'>
          <FrideContainer />
      </div>
    </div>
  );
}

export default App;
