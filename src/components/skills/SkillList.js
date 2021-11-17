import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddSkill from "../skills/AddSkill"



class SkillList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfSkills: []
        }
    }

    getAllSkills = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/skills`, { withCredentials: true })
        .then(skillsFromApi => {
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
                <AddSkill specificSkill={this.state} getSkill={this.getAllSkills} specificOwner={this.state}></AddSkill>

                <p>this is skilllist</p>
                {this.state.listOfSkills.map((skill) => {
                    return (
                        <div key={skill._id}>
                            <Link to={`/skills/${skill._id}`}>
                                <h3>{skill.title}</h3>   
                            </Link>

                            
                        </div>
                    )
                })}
               

            </div>
        )
    }
}
 


export default SkillList;