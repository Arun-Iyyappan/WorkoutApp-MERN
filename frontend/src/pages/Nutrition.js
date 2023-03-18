import { useState, useEffect } from "react";
import uuid from "react-uuid";
import NutriList from "../components/NutriList";

const Nutrition = () => {

  const [data, setData] = useState("");
  const [value, setValue] = useState(data);
  const [error, setError] = useState(null);
  const [second, setSecond] = useState(true);
  const [show, setShow] = useState('');
  const [loaded,setLoaded] = useState(true);

  const [nutdata , setNutData] = useState([]);
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
      "X-API-Key": process.env.REACT_APP_NUTRI_KEY,
    },
  };
  
  const fetchData = (value) => {
    setNutData([]);

    fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${value}`,
      options
    )
      .then((response) => response.json())

      .then((nutdata) => {
        console.log(nutdata);
        if (nutdata.items.length === 0) {
          setShow('No data found');
        }
        setNutData(nutdata);
        setLoaded(false);
      })
      .catch((err) => console.error(err));
  };
   
  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleClick = () => {
  
    if (!data) {
      setError("Please Enter the Valid Data");
      console.log("Error");
    }
    setValue(data);
  };

  return (
    <div>
       <div className="topic">Enter the Items for Nutrition Info </div>
       <div className="searchtopic">
      <input
          type="text"

          value={data}
          placeholder="Search for Info"
          name="data"
          onChange={handleChange}
        ></input>
        <button onClick={handleClick}>Search</button>
        </div>
  
   { value && nutdata.items?.map((ndata) => (
     <NutriList ndata={ndata} key={uuid()} />
   ))
   
   }



{/* {show && loaded &&
  <div className="errordata">
<p>{show}</p>
</div>
} */}

<div className="errordata">
{error && <p>{error}</p>}
</div>
    
    </div>
  );
};

export default Nutrition;
