import { useQueriesContext } from '../hooks/useQueriesContext'
import { useAuthContext } from '../hooks/useAuthContext'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const QueryDetails = ({ query }) => {
  console.log(query)
  const { dispatch } = useQueriesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/query/' + query._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_QUERY', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4><strong>Exam Name: </strong>{query.exname}</h4>
      <p><strong>Course: </strong>{query.course}</p>
      <p><strong>Question No: </strong>{query.qno}</p>
      <p><strong>TA's Roll No: </strong>{query.taroll}</p>
      <p><strong>Your Comment: </strong>{query.comments}</p>
      <p>{formatDistanceToNow(new Date(query.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default QueryDetails