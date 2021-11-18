import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddExperience from '../experiences/AddExperience';

class SkillsDetails extends Component {
    state = {}

    getSpecificSkill = () => {
        const { params } = this.props.match;
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
            <div>
                <Link to={`/skills`}>
                    <button className="btn-back"><strong>Go back to skills</strong></button>
                </Link>
                <AddExperience specificSkill={this.state} getSkill={this.getSpecificSkill} specificOwner={this.state}></AddExperience>
                <p className="title-SkilListDetails">Discover professional experiences related to <strong>{this.state.title}</strong> skill </p>
                <div className="SkilDetails">
                    {this.state.experiencesList && this.state.experiencesList.length > 0}
                    {this.state.experiencesList && this.state.experiencesList.map((experience, index) => {
                        return (
                            <div className="SkilListDetails-items" key={index}>

                                <Link to={`/skills/${this.state._id}/experiences/${experience._id}`}>
                                    {<img src={experience.imageUrl} alt="" />} <br />
                                    <p className="SkillDetails-namePosition"><strong>{experience.namePosition}</strong></p>
                                </Link>
                            </div>
                        )
                    })}
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SkillsDetails;