import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Hello from React + TS</h1>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    </div>
  )
}

export default App
