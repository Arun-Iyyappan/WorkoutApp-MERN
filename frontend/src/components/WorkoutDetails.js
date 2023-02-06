import { useWorkoutsContext } from "../hooks/useWorkoutContext"

import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
   const { user} = useAuthContext()
  const handleClick = async () => {

    if(!user){
      return
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers : {
        'Authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto'
  })

  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
  ]
  
  function formatTimeAgo(date) {
    let duration = (date - new Date()) / 1000
  
    for (let i = 0; i <= DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name)
      }
      duration /= division.amount
    }
  }

    return (
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
        <p><strong>Updated at : </strong>{formatTimeAgo(Date.parse(workout.createdAt))}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        <p>{new Intl.DateTimeFormat("en-us",{dateStyle : 'full'}).format(new Date(Date.parse(workout.createdAt)))}</p>
      </div>
    )
  }
  
  export default WorkoutDetails