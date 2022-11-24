import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header"
import Homepage from "./components/Homepage";
import Review from "./components/Review";
import Profile from "./components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/review/:reviewId" element={<Review/>}/>
          <Route path="/profile/:handle" element={<Profile/>}/>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  
  
`
export default App;
