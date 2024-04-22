import React, { useState } from "react";
import styled from "styled-components";
import AddGroupPriceList from './components/AgeGroupPriceList';
// import MainLogo from "./assets/main_logo.svg";

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

// const BarImage = styled.img`
// width: 256px;
// height: 256px;
// `;

const Title = styled.h1`
font-size: 72px;
margin-bottom: 12px;
`;

const SmallTitle = styled.h3`
font-size: 48px;
margin: 0;
margin-bottom: 48px;
`;

const ConsoleContainer = styled.div`
display: flex;
padding: 24px 72px;
background-color: ${props => props.theme.color.ContainerBackground};
border-radius: 4px;
margin-top: 36px;
`;

function App() {

  const [result, setResult] = useState([
    { ageGroup: [0, 20], price: 0 }
  ]); // Result

  return (
    <Container>
      {/* <BarImage src={MainLogo} /> */}
      <Title>年齡計算器</Title>
      <SmallTitle>Age Calculator</SmallTitle>
      <AddGroupPriceList result={result} setResult={setResult} onChange={result => console.log(result)} />
      <ConsoleContainer>
        <pre><code>{`result:${JSON.stringify(result, null, 2).replace(/(\[[\d,\s]+?\])/g, (match) => match.replace(/\s/g, ''))}`}</code></pre>
      </ConsoleContainer>
    </Container>
  );
}

export default App;
