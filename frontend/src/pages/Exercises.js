import { useEffect, useState } from "react";
import uuid from "react-uuid";
import ExerciseList from "../components/ExerciseList";

const Exercises = () => {
  const [data, setData] = useState("");
  const [value, setValue] = useState(data);
  const [error, setError] = useState(null);
  const [second, setSecond] = useState(true);
 

  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    if (second) {
      setSecond(false);
    } else {
      fetchData(value);
    }
  }, [value]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_EXER_KEY,
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  const fetchData = (value) => {
    setExercises([]);

    fetch(
      `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${value}`,
      options
    )
      .then((response) => response.json())

      .then((exercises) => {
        console.log(exercises);
       
        setExercises(exercises);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleClick = () => {
    console.log(data);
    if (!data) {
      setError("Please Enter the Valid Data");
      console.log("Error");
    }
    setValue(data);
  };

  const suggestions = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  return (
    <div>
      <div className="topic">Enter the Muscle Category </div>
      <div className="searchtopic">
        <input
          id="autocomplete-input"
          type="text"
          list="autocomplete-suggestions"
          value={data}
          placeholder="Enter the Target Muscle Group"
          name="data"
          onChange={handleChange}
        ></input>
        <datalist id="autocomplete-suggestions">
          {suggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
        <button onClick={handleClick}>Search</button>
      </div>

      {value &&
        exercises.map((exercise) => (
          <ExerciseList exercise={exercise} key={uuid()} />
        ))}

<div className="errordata">
{error && <p>{error}</p>}
</div>
    </div>
  );
};

export default Exercises;
