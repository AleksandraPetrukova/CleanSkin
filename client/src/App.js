import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header"
import Homepage from "./components/Homepage";
import Review from "./components/Review";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/review/:reviewId" element={<Review/>}/>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  
  
`
export default App;
