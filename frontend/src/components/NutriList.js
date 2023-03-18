import { useState } from "react";
import uuid from "react-uuid";

const NutriList = ({ ndata }) => {
  return (
    <div className="nutbg" key={uuid()}>
      {ndata && (
        <div>
          <h1>{ndata.name}</h1>
          
          <p>
            <strong>Calories : </strong>
            {ndata.calories}cal
          </p>
         
          <p>
            <strong>Cholestrol : </strong>
            {ndata.cholesterol_mg}mg
          </p>
          <div className="flnut">
          <p>
            <strong>Protein : </strong>
            {ndata.protein_g}g
          </p>
          <p>
            <strong>Fat : </strong>
            {ndata.fat_total_g}g
          </p>
          </div>
         
        </div>
        
      )}
    </div>
  );
};

export default NutriList;
