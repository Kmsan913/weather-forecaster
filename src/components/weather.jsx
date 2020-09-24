import React from "react";
import "./weatherStyle.css";

function Weather (props){
 
  return (
    <div className="container">
      <div className = "col">
      <div className = "Card">
      <div className="card-header">
          Today's Weather
      </div>
        <h1 className="text-black py-3">{props.cityname}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.icon} display-1`} />
        </h5>

        {props.dayOne.celsius ? (
          
          <h2 className="py-2">{props.dayOne.celsius}&deg;</h2>
        ) : null}

        {maxminTemp(props.dayOne.temp_min, props.dayOne.temp_max)}

        <h4 className="py-3">
            {props.dayOne.description}
        </h4>
      </div>
      <div className="Card ">
      <div className="card-header">
          The forcast for the next 4 days
      </div>
        <div className = "card d-flex">
        {maxminTemp(props.dayTwo.temp_min, props.dayTwo.temp_max)}

        <h4 className="px-2 py-2 justify-content-center d-flex">
            {props.dayThree.description}
        </h4>
        </div>
        <div className = "card d-flex">
        {maxminTemp(props.dayThree.temp_min, props.dayThree.temp_max)}

        <h4 className="px-2 py-2 justify-content-center d-flex">
            {props.dayThree.description}
        </h4>
        </div>
        <div className = "card d-flex">
        {maxminTemp(props.dayFour.temp_min, props.dayFour.temp_max)}

        <h4 className="px-2 py-2 justify-content-center d-flex">
            {props.dayFour.description}
        </h4>
        </div>
        <div className = "card d-flex">
        {maxminTemp(props.dayFive.temp_min, props.dayFive.temp_max)}

        <h4 className="px-2 py-2 justify-content-center d-flex">
            {props.dayFive.description}
        </h4>
        </div>
      </div>
      <div>
      </div>
      </div>
    </div>
  );
};

export default Weather;

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h2>
        <div className="px-2 py-2 justify-content-center d-flex">Low:{min}&deg;</div>
        <div className="px-2 py-2 justify-content-center d-flex">High:{max}&deg;</div>
      </h2>
    );
  }
}
