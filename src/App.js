import './App.css';
import Timer from './components/Timer'
import wordsList from './WordsList';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import heart from './images/heart.png';

const Input = styled.input`
background-color: #2b2a33;
color: white;
width: 50%;
height: 46px;
line-height: 46px;
font-size: 1.1em;
border-radius: 30px;
padding: 10px 20px;
margin: 20px;
box-sizing: border-box;
text-align: center;
`;

const Button = styled.button`
    color: rgb(232, 230, 227);
    height: 2em;
    padding: 0px 1em;
    border: none;
    background: linear-gradient(
      to right,
      rgba(24, 170, 135, 1) 0%,
      rgba(1, 144, 182, 1) 100%
    );
    border-radius: 30px;
    font-size: 1em;
    margin: 25px;
  `;

const Stats = styled.div`
div{
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
}
p{
  color: grey;
}
`

const Img = styled.img`
height: calc(10px + 5vmin);
margin: 2px;
`

function App() {
  const nextQuestion = () => setCurrQ(getNewQuestion)
  const reduceHealth = () => setHealth(health - 1)
  const rand = (max) => Math.floor(Math.random() * max);
  const getNewQuestion = () => {
    const word = wordsList[rand(wordsList.length)]
    const substring = rand(word.length - 2)
    const finalWord = word.substring(substring, substring + 3)
    return finalWord
  }
  const getUserInput = (e) => {
    if (e.key === 'Enter') {
      const userValue = e.target.value.toLowerCase().trim()
      e.target.value = null
      if (userValue.includes(currQ) && wordsList.includes(userValue)) {
        setScore(score + 1);
        childRef.current.reset();
        setCurrQ(getNewQuestion);
      }
    }
  }

  const replay = () => {
    setScore(0)
    setHealth(3)
  }
  const [health, setHealth] = useState(3)
  const childRef = useRef();
  const [currQ, setCurrQ] = useState(getNewQuestion)
  const [score, setScore] = useState(0)

  return <div className="App">
    {health ? <>
        <p>Type a word that contains</p>
        <h2>{currQ}</h2>
      <Input type="text" onKeyDown={getUserInput} autoFocus />
      <Stats>
        <div>
          <p>Time Left</p>
        <Timer nextQuestion={nextQuestion} reduceHealth={reduceHealth} ref={childRef} />
        </div>
          {[...Array(health)].map(() => <Img src={heart} alt="❤" />)}
          <div>
            <p>Score</p>
          <h3>{score}</h3>
          </div>
      </Stats>
    </> : <>
      <h1>Your Final Score is {score}</h1>
      <Button onClick={replay}>Replay</Button>
    </>}
  </div>
}

export default App;