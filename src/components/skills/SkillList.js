import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class SkillList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfSkills: []
        }
    }

    getAllSkills = () => {
        axios.get("http://localhost:5001/api/skills", { withCredentials: true })
        .then(skillsFromApi => {
            // console.log(skillsFromApi)
            this.setState ({
                listOfSkills: skillsFromApi.data
            })
        })
    }

    componentDidMount() {
        this.getAllSkills();
    }
        

    render() {
        return (
            <div>
                <p>this is skilllist</p>
                {this.state.listOfSkills.map((skill) => {
                    return (
                        <div key={skill._id}>
                            <Link to={`/skills/${skill._id}`}>
                                <h3>{skill.title}</h3>   
                            </Link>
                            {/* <ul>
                                {skill.experiences.map((experience, index) => {
                                    return <li key={index}>{experience.title}</li>
                                })}
                            </ul> */}

                        </div>
                    )
                })}
               

            </div>
        )
    }
}
 


export default SkillList;