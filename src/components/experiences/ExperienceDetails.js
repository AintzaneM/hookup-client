import React, { Component } from 'react';
import axios from 'axios';
import EditExperience from './EditExperience';
import { Link } from 'react-router-dom';
import ContactWithExperience from './ContactWithExperience'


class ExperienceDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: "",
            description: "",
            imageUrl: "",
            clickButtonForm: false,
            owner: this.props.user_id,
        }
    }

    getSpecificExperience = () => {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_API_URL}/skills/${params.id}/experiences/${params.experienceId}`)
            .then((experienceFromApi) => {
                const theExperience = experienceFromApi.data
                this.setState({
                    namePosition: theExperience.namePosition,
                    description: theExperience.description,
                    imageUrl: theExperience.imageUrl,
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
                    <button className="btn-delete" onClick={() => this.deleteExperience(this.state._id)}>
                        <strong>Delete experience</strong>
                    </button>
                    <button className="btn-edit-experience" onClick={this.handleClickButton}><strong>Edit Experience</strong></button>
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
                <Link to={`/skills/${this.props.match.params.id}`}>
                    <button className="btn-back"><strong>Go back to experiences</strong></button>
                </Link>
                <h1>{this.state.namePosition}</h1>
                <ContactWithExperience />
                <div className="ExperienceDetails">
                    <img src={this.state.imageUrl} alt="" />
                    <p className="test-ExperienceDetails">{this.state.description}</p>
                    {this.state.clickButtonForm === true && (this.props.user && (this.state.owner === this.props.user._id)) ?
                        <div>
                            <EditExperience handleClickButton={() => this.handleClickButton()} theExperience={this.state} getData={() => this.getSpecificExperience()} {...this.props}
                            />
                        </div>
                        :
                        <div></div>
                    }
                    <div> {this.ownershipCheck(this.state)} </div>
                </div>
            </div>
        )
    }
}



export default ExperienceDetails;