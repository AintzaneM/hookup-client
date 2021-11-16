import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddExperience from '../experiences/AddExperience';


class SkillsDetails extends Component {
   state = {}

   getSpecificSkill = () => {
    const {params} = this.props.match;
    axios.get(`${process.env.REACT_APP_API_URL}/skills/${params.id}`, { withCredentials: true })
    .then((skillFromApi) => {
        const specificSkill = skillFromApi.data; 
        this.setState(specificSkill)
        // console.log(specificSkill)  
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
            <div>
                <p><strong>{this.state.title}</strong></p>
                <p>We are going to see the Experiences LIST</p>
                
                {/* {console.log("title",this.state.namePosition)} */}

                
                {this.state.experiencesList && this.state.experiencesList.length > 0 && <p>Experiences</p>}
                {this.state.experiencesList && this.state.experiencesList.map((experience, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/skills/${this.state._id}/experiences/${experience._id}`}>
                                {experience.namePosition}
                                {console.log("experience owner in project details", experience.owner)}
                            </Link>

                        </div>
                    )
                })}
                <div>
                    <AddExperience specificSkill={this.state} getSkill={this.getSpecificSkill} specificOwner={this.state}></AddExperience>
                </div>


                <Link to={`/skills`}>
                    <button>Back to skills</button>
                </Link>


            </div>
        )
    }
}

export default SkillsDetails;
