import axios from 'axios';
import React, { Component } from 'react';
import authService from '../auth/auth-service';

class EditExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: this.props.theExperience.namePosition,
            description: this.props.theExperience.description,
            skill: this.props.theExperience.skill,
            imageUrl: this.props.theExperience.imageUrl,
            owner: this.props.theExperience.owner,
            isUploading: false,
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.isUploading) {
            setTimeout(() => {
                // console.log("callback",)
                // console.log(event)
                this.handleFormSubmit(event);
            }, 100);
        } else {
            const { params } = this.props.match;
            const namePosition = this.state.namePosition;
            const description = this.state.description;
            const imageUrl = this.state.imageUrl;
            const skill = this.state.skill;
            const owner = this.state.owner;

            axios.put(`${process.env.REACT_APP_API_URL}/skills/${params.id}/experiences/${params.experienceId}`, { namePosition, description, imageUrl, skill, owner }, { withCredentials: true })
                .then(() => {
                    this.props.getData();
                    this.props.handleClickButton();
                })
                .catch((err) => console.log(err))
        }
    }

    handleFileUpload = (event) => {
        const uploadData = new FormData();
        uploadData.append('imageUrl', event.target.files[0]);

        authService
            .handleUpload(uploadData)
            .then(response => {
                console.log("response is: ", response);
                this.setState({ imageUrl: response.secure_url, isUploading: false });
            })
            .catch(err => console.log('Error while uploading the file: ', err));
    };

    render() {
        return (
            <div className="form-editExperience">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="input-container-editExperience">
                        <label>
                            <input
                                type="text"
                                placeholder="Position Name"
                                name="namePosition"
                                value={this.state.namePosition}
                                onChange={(event) => this.handleChange(event)}
                            />
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={this.state.description}
                                onChange={(event) => this.handleChange(event)}
                            />
                        </label>
                        <label>
                            <input
                                placeholder="Image"
                                type="file"
                                name="imageUrl"
                                onChange={(event) => this.handleFileUpload(event)}
                            />
                        </label>
                        <button className="btn-submit-edition"><strong>Submit your edition</strong></button>
                    </div>
                </form>
            </div>
        )
    }
}


export default EditExperience;