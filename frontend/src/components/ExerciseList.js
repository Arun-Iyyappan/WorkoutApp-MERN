import { useState } from "react";
import uuid from "react-uuid";

const ExerciseList = ({ exercise }) => {
  


  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    setIsPopupVisible(true);
  };

  const handleClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="exerbg" key={uuid()}>
      <div className="stybut">
        <h1>{exercise.name}</h1>

        <button className="button-container">
          <a
            target="_blank"
            href={`https://www.youtube.com/results?search_query=${exercise.name}`}
            rel="noreferrer"
          >
            <i></i>
          </a>
        </button>
      </div>

      <p>
        <strong>Exercise Difficulty : </strong>
        {exercise.difficulty}
      </p>
      <p>
        <strong>Exercise Equipment : </strong>
        {exercise.equipment}
      </p>
      <p onClick={handleClick}>
        <strong>Click Here for Exercise Instructions !!!</strong>
      </p>
      {isPopupVisible && (
        <div className="popup-container">
          <div onClick={handleClose} className="popup-background" />
          <div className="popup-box">
            <div className="popup-text">
              <ul className="ex">
                {exercise.instructions
                  .split(/\.\s/)
                  .slice(0, 12)
                  .map((sentence) => (
                    <li>{sentence}</li>
                  ))}
              </ul>
              <button onClick={handleClose} className="popup-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <p onClick={handleShow}>Exercise Instructions : </p>
        {show && (
          <ul className="ex">
            {exercise.instructions.split(/\.\s/).map((sentence) => (
              <li>{sentence}</li>
            ))}
          </ul>
        )} */}

      {/* <p>
          <strong>Exercise Instructions : </strong>
          {exercise.instructions}
        </p> */}
    </div>
  );
};

export default ExerciseList;
