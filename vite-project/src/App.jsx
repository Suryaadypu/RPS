import React, { useState } from 'react'

function App() {
  const [computerChoice, setComputerChoice] = useState(null)
  const [userChoice, setUserChoice] = useState(null)
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [result, setResult] = useState('')

  const choices = ['rock', 'paper', 'scissors']

  const emojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
  }

  function handleUserChoice(choice) {
    if (userScore === 5 || computerScore === 5) return

    const randomChoice = choices[Math.floor(Math.random() * 3)]

    setUserChoice(choice)
    setComputerChoice(randomChoice)

    if (choice === randomChoice) {
      setResult("It's a tie!")
    } else if (
      (randomChoice === 'rock' && choice === 'scissors') ||
      (randomChoice === 'paper' && choice === 'rock') ||
      (randomChoice === 'scissors' && choice === 'paper')
    ) {
      setResult("Computer wins this round!")
      const newComputerScore = computerScore + 1
      setComputerScore(newComputerScore)

      if (newComputerScore === 5) {
        setResult("Computer wins the game!")
      }
    } else {
      setResult("You win this round!")
      const newUserScore = userScore + 1
      setUserScore(newUserScore)

      if (newUserScore === 5) {
        setResult("You win the game!")
      }
    }
  }

  function resetGame() {
    setComputerChoice(null)
    setUserChoice(null)
    setUserScore(0)
    setComputerScore(0)
    setResult('')
  }

  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <h2>Computer {computerScore} : {userScore} You</h2>
      <button onClick={() => handleUserChoice('rock')}>🪨</button>
      <button onClick={() => handleUserChoice('paper')}>📄</button>
      <button onClick={() => handleUserChoice('scissors')}>✂️</button>
      <p>Computer: {computerChoice ? emojis[computerChoice] : '-'}</p> 
      <p>You: {userChoice ? emojis[userChoice] : '-'}</p> 
      <p>{result}</p>
      {(userScore === 5 || computerScore === 5) && (
        <button onClick={resetGame}>Play Again</button>
      )}
    </div>
  )
}

export default App