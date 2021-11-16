import React, { Component } from 'react';
import axios from 'axios';
import EditExperience from './EditExperience';
import { Link } from 'react-router-dom';


class ExperienceDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: "",
            description: "",
            clickButtonForm: false,
            owner: this.props.user_id,
        }
    }

    getSpecificExperience = () => {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_API_URL}/skills/${params.id}/experiences/${params.experienceId}`)
            .then((experienceFromApi) => {
                const theExperience = experienceFromApi.data
                console.log("Experience fromDB", theExperience.owner)
                this.setState({
                    namePosition: theExperience.namePosition,
                    description: theExperience.description,
                    skill: theExperience.skill,
                    owner: theExperience.owner
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleClickButton = () => {
        this.setState((prevState) => ({
            clickButtonForm: !prevState.clickButtonForm
        }))
    }

    deleteExperience = () => {
        const { params } = this.props.match;
        axios.delete(`${process.env.REACT_APP_API_URL}/skills/${params.id}/experiences/${params.experienceId}`)
            .then(() => {
                this.props.history.push(`/skills/${params.id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    ownershipCheck = (experience) => {
        const currentUserIsOwner =
            this.props.user && (experience.owner === this.props.user._id)
        if (currentUserIsOwner) {
            return (
                <div>

                    <button onClick={() => this.deleteExperience(this.state._id)}>
                        Delete experience
                    </button>

                    <button onClick={this.handleClickButton}>Edit Experience</button>

                </div>
            );
        }
    };

    componentDidMount() {
        this.getSpecificExperience();
    }

    render() {
        return (
            <div>
                
                <p>experience details</p>
                <p>{this.state.namePosition}</p>
                <p>{this.state.description}</p>
                
                {this.state.clickButtonForm === true && (this.props.user && (this.state.owner === this.props.user._id)) ?

                    <div>
                        
                        <EditExperience handleClickButton={() => this.handleClickButton()} theExperience={this.state} getData={() => this.getSpecificExperience()} {...this.props}
                        />
                    </div>
                    :
                    <div></div>
                }
                <div> {this.ownershipCheck(this.state)} </div>

                <Link to={`/skills/${this.props.match.params.id}`}>
                    <button>Back to experiences</button>
                </Link>


                
            </div>
        )
    }
}



export default ExperienceDetails;