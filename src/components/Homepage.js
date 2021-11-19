import React from 'react';
// import {NavLink} from "react-router-dom";
import "../App.css";


class Homepage extends React.Component {
    render() {
        return (
            <>
                <p className="homepage-question"><strong>Are you ready to start your own career path?</strong></p>
                <p className=""> You build culture by talking to people and understanding what they care about so let's use <strong>About Skills</strong> to learn about different professional experiences, according to the most demanded skills in the labor market</p>
                <div className="Homepage">
                    <img src="./Diseño sin título.jpg" alt="" />
                    <p className="homepage-text"><strong>About Skills</strong> takes the job search to a more intimate level by <strong>sharing professional experiences </strong>
                        in different areas and matching them with <strong>people looking for a new job or deciding which studies to choose.</strong>
                    </p>
                </div>
            </>
        )
    }
}



export default Homepage