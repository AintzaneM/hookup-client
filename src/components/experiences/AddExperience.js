import axios from 'axios';
import React, { Component } from 'react';
import authService from '../auth/auth-service';


class AddExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: "",
            description: "",
            imageUrl: "",
            isUploading: false,
            clickButtonForm: false,
        }
    }


    toggleForm = () => {
        if (!this.state.clickButtonForm) {
            this.setState({ clickButtonForm: true });
        } else {
            this.setState({ clickButtonForm: false })
        }
    }

    showForm = () => {
        if (this.state.clickButtonForm) {
            return (
                <div className="form-addExperience">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="input-container-addExperience">
                            <label>
                                <input
                                    placeholder="Position Name"
                                    type="text"
                                    name="namePosition"
                                    value={this.state.namePosition}
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </label>
                            <label>
                                <input
                                    placeholder="Description"
                                    type="textarea"
                                    name="description" cols="50" rows="4"
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
                            <button className="btn-submit-experience"><strong>Submit your experience!</strong></button>
                        </div>
                    </form>
                </div>
            )
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleFileUpload = (event) => {
        // console.log("The file to be uploaded is: ", event.target.files[0]);
        this.setState({ isUploading: true });
        const uploadData = new FormData();

        uploadData.append('imageUrl', event.target.files[0]);

        authService
            .handleUpload(uploadData)
            .then(response => {
                // console.log("response is: ", response);
                this.setState({ imageUrl: response.secure_url, isUploading: false });
            })
            .catch(err => console.log('Error while uploading the file: ', err));
    };


    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.isUploading) {
            setTimeout(() => {
                // console.log("callback",)
                // console.log(event)
                this.handleFormSubmit(event);
            }, 100);
        } else {
            const namePosition = this.state.namePosition;
            const description = this.state.description;
            const imageUrl = this.state.imageUrl;
            const skill = this.props.specificSkill._id;
            const owner = this.props.specificOwner.experiencesList;

            axios.post(`${process.env.REACT_APP_API_URL}/experiences`, { namePosition, description, imageUrl, skill, owner }, { withCredentials: true })
                .then(() => {
                    this.props.getSkill();
                    this.setState({ namePosition: "", description: "", imageUrl: "", })
                    this.toggleForm()
                })
                .catch((err) => console.log(err))
        }
    }

    render() {
        return (

            <div>
                <button className="btn-addExperience" onClick={() => this.toggleForm()}>
                    <strong> Add your experience! </strong> </button>
                {this.showForm()}

            </div>
        )
    }
}



export default AddExperience;