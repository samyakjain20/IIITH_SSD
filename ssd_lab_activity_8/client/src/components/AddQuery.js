import { useState } from "react"
import { useQueriesContext } from "../hooks/useQueriesContext"
import { useAuthContext } from '../hooks/useAuthContext'


const AddQuery = () => {
  const { dispatch } = useQueriesContext()
  const { user } = useAuthContext()

  const [exname, setExname] = useState('')
  const [course, setCourse] = useState('')
  const [qno, setQno] = useState('')
  const [taroll, setTaroll] = useState('')
  const [comments, setComments] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const query = {exname, course, qno, taroll, comments}

    const response = await fetch('/api/query', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setExname('')
      setCourse('')
      setQno('')
      setTaroll('')
      setComments('')
      setError(null)
      setEmptyFields([])
      // console.log('new query added', json)
      dispatch({type: 'CREATE_QUERY', paycourse: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Query Form</h3>

      <label>Exam Name</label>
      <input 
        type="text"
        onChange={(e) => setExname(e.target.value)}
        value={exname}
        className={emptyFields.includes('exname') ? 'error' : ''}
      />

      <label>Course Name:</label>
      <input 
        type="text"
        onChange={(e) => setCourse(e.target.value)}
        value={course}
        className={emptyFields.includes('course') ? 'error' : ''}
      />

      <label>Question No.:</label>
      <input 
        type="number"
        onChange={(e) => setQno(e.target.value)}
        value={qno}
        className={emptyFields.includes('qno') ? 'error' : ''}
      />

      <label>TA RollNo.:</label>
      <input 
        type="number"
        onChange={(e) => setTaroll(e.target.value)}
        value={taroll}
        className={emptyFields.includes('taroll') ? 'error' : ''}
      />

      <label>Comments:</label>
      <input 
        type="text"
        onChange={(e) => setComments(e.target.value)}
        value={comments}
        className={emptyFields.includes('comments') ? 'error' : ''}
      />

      <button>Add Query</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddQuery