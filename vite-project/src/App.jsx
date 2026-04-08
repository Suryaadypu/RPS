import React, { useState } from 'react'

function App() {
  const [computerChoice, setComputerChoice] = useState(null)
  const [userChoice, setUserChoice] = useState(null)
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([]) // ✅ NEW

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

    let roundResult = ''

    if (choice === randomChoice) {
      roundResult = "Tie"
      setResult("It's a tie!")
    } else if (
      (randomChoice === 'rock' && choice === 'scissors') ||
      (randomChoice === 'paper' && choice === 'rock') ||
      (randomChoice === 'scissors' && choice === 'paper')
    ) {
      roundResult = "Computer"
      setResult("Computer wins this round!")
      const newComputerScore = computerScore + 1
      setComputerScore(newComputerScore)

      if (newComputerScore === 5) {
        setResult("Computer wins the game!")
      }
    } else {
      roundResult = "You"
      setResult("You win this round!")
      const newUserScore = userScore + 1
      setUserScore(newUserScore)

      if (newUserScore === 5) {
        setResult("You win the game!")
      }
    }

    // ✅ ADD TO HISTORY
    const newEntry = `You: ${choice} | Computer: ${randomChoice} | Winner: ${roundResult}`
    setHistory(prev => [newEntry, ...prev]) // latest on top
  }

  function resetGame() {
    setComputerChoice(null)
    setUserChoice(null)
    setUserScore(0)
    setComputerScore(0)
    setResult('')
    setHistory([]) // ✅ CLEAR HISTORY
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

      {/* ✅ HISTORY UI */}
      <h3>Game History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App