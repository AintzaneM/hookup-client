import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddExperience from '../experiences/AddExperience';
import "./SkillDetails.css"

class SkillsDetails extends Component {
   state = {}

   getSpecificSkill = () => {
    const {params} = this.props.match;
    axios.get(`${process.env.REACT_APP_API_URL}/skills/${params.id}`, { withCredentials: true })
    .then((skillFromApi) => {
        const specificSkill = skillFromApi.data; 
        this.setState(specificSkill) 
        })
        .catch((err) => {
            console.log(err);
        });  
    }

    componentDidMount() {
        this.getSpecificSkill();
    }

    render() {
        return (
            <div className="SkillDetails">
                <h1>Discover professional experiences related to {this.state.title}</h1>
                {this.state.experiencesList && this.state.experiencesList.length > 0 && <p>Experiences</p>}
                {this.state.experiencesList && this.state.experiencesList.map((experience, index) => {
                    return (
                        <div key={index}>
                            {<img src={experience.imageUrl} alt=""/>}
                            <Link to={`/skills/${this.state._id}/experiences/${experience._id}`}>
                                {experience.namePosition}
                            </Link>
                        </div>
                    )
                })}
                <div>
                    <AddExperience specificSkill={this.state} getSkill={this.getSpecificSkill} specificOwner={this.state}></AddExperience>
                    <Link to={`/skills`}>
                        <button className="btn-back"><strong>Go back to the skills</strong></button>
                    </Link>
                </div>
                
            </div>
        )
    }
}

export default SkillsDetails;
