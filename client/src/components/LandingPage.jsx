import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"

export default function LandingPage() {
  return (
    <div className="body">
      <div className="divtitulo">
      <h1 className="bienvenidos">-Henry's Food- </h1>
      </div>
      <div className="landing1">
        <Link to="/home">
          <div classNames="testbutton">
            <button className="botonHome">HOME</button>
          </div>
        </Link>
      </div>
    </div>
  );
}