import React, {  useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

// import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
 const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  const[progress,setProgress]=useState(0)
 
    return (
      <div>
        <Router>
          <Navbar />

          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />

          {/* <News setProgress={setProgress}pageSize={this .pageSize} country="in" category="sports"/> */}
          <Routes>
            <Route exact path="/General" element={<News setProgress={setProgress} apiKey={apiKey} key="General" pageSize={pageSize} country="in" category="General" />} />
            <Route exact path="/Business" element={<News setProgress={setProgress} apiKey={apiKey} key="Business" pageSize={pageSize} country="in" category="Business" />} />
            <Route exact path="/Entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="Entertainment" pageSize={pageSize} country="in" category="Entertainment" />} />
            <Route exact path="/Health" element={<News setProgress={setProgress} apiKey={apiKey} key="Health" pageSize={pageSize} country="in" category="Health" />} />
            <Route exact path="/Science" element={<News setProgress={setProgress} apiKey={apiKey} key="Science" pageSize={pageSize} country="in" category="Science" />} />
            <Route exact path="/Spsorts" element={<News setProgress={setProgress} apiKey={apiKey} key="Sports" pageSize={pageSize} country="in" category="Sports" />} />
            <Route exact path="/Technology" element={<News setProgress={setProgress} apiKey={apiKey} key="Technology" pageSize={pageSize} country="in" category="Technology" />} />
          </Routes>
        </Router>
      </div>
    )
  
}

export default App;