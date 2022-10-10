import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import Select from 'react-select'

const options = [
  { label: "Student", value: 'student' },
  { label: "TA", value: 'ta' },
];

const Signup = () => {
  const [roll, setRoll] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(roll, password, role)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Roll No:</label>
      <input 
        type="number" 
        onChange={(e) => setRoll(e.target.value)} 
        value={roll} 
      />
      
      <label>Select Role:</label>
      <Select options={options} onChange={(value) => setRole(value)} />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup