import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext";
import { useState} from "react";


import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts',{
        headers :{
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
if(user){

  fetchWorkouts()
}
   
  }, [dispatch,user])

  // const [checked, setChecked] = useState(
  //   JSON.parse(localStorage.getItem('checked')) || false
  // );
  // useEffect(() => {
  //   localStorage.setItem('checked', JSON.stringify(checked));
  // }, [checked]);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };


  return (
    
    <div className="home">
      <div className="workouts">
      {/* <div className="Cbox">
       <div className="cbox">
       <div className="box">Completed</div>
       <input  type="checkbox"  checked={checked} onChange={handleChange} value="Completed"/>
       </div>
       </div> */}
   
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home