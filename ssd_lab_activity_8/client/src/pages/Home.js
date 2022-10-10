import { useEffect }from 'react'
import { useQueriesContext } from "../hooks/useQueriesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import QueryDetails from '../components/QueryDetails'
// import AddQuery from '../components/AddQuery'
import { Link } from 'react-router-dom'

const Home = () => {
  const {queries, dispatch} = useQueriesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchQueries = async () => {
      const response = await fetch('/api/query',{
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      // console.log("res: ", json);
      
      if (response.ok) {
        dispatch({type: 'SET_QUERIES', payload: json})
      }
    }

    if (user) {
      fetchQueries()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {queries && queries.map((query) => (
          <QueryDetails key={query._id} query={query} />
        ))}
      </div>
      <Link to="/addQuery">Add Query</Link>
      {/* <WorkoutForm /> */}
    </div>
  )
}

export default Home