import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddSkill from "../skills/AddSkill"



class SkillList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfSkills: [],
            // userRole:this.props.user.role
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
        console.log("!!!!!",this.props.roleUser)     
        return (
            
            <div>
                {this.props.roleUser === "admin" &&  
                    <div>
                        <AddSkill specificSkill={this.state} getSkill={this.getAllSkills} specificOwner={this.state}></AddSkill>
                    </div> }
                <h1 className="title-skilList">Choose the skill that interests you the most <br/> and explore the different experiences</h1>
                <div className="SkilList">
                    {this.state.listOfSkills.map((skill) => {
                    return (
                        <div className="SkilList-items" key={skill._id}>
                                {<img src={skill.imageUrl} alt=""/>}
                            <Link className="Link" to={`/skills/${skill._id}`}>
                                <h3>{skill.title}</h3>   
                            </Link>

                            <p>{skill.description}</p>
                        </div>
                    )
                
                    })}
                </div>
               

            </div>
        )
    }
}
 


export default SkillList;