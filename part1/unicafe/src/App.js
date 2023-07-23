import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, bad, neutral, all }) => {
  
  const averageScore = (good, bad, all) => {
    return ((good - bad) / all).toFixed(1)
  }

  const positiveScore = (good, all) => {
    return ((good / all) * 100).toFixed(1) + "%"
  }

  if (all === 0) return (
    <>
      <p>No feedback given</p>
    </>
  )

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={averageScore(good, bad, all)} />
          <StatisticLine text={"positive"} value={positiveScore(good, all)} />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }



  return (
    <>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text={"good"} />
    <Button handleClick={handleNeutralClick} text={"neutral"} />
    <Button handleClick={handleBadClick} text={"bad"} />
    <br />
    <h1>statistics</h1>
    <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </>
  )
}

export default App