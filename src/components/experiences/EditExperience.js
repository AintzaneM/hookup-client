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
        }   
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        
        const {params} = this.props.match;
        const namePosition = this.state.namePosition;
        const description = this.state.description;
        const imageUrl = this.state.imageUrl;
        const skill = this.state.skill;
        const owner = this.state.owner;

        axios.put(`${process.env.REACT_APP_API_URL}/skills/${params.id}/experiences/${params.experienceId}`,{namePosition, description, imageUrl, skill, owner}, { withCredentials: true })
        .then(()=> {
            this.props.getData();
            this.props.handleClickButton();          
        })
        .catch((err) => console.log(err))
    }

    handleFileUpload = (event) => {
        // console.log("The file to be uploaded is: ", event.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append('imageUrl', event.target.files[0]);
     
        authService
          .handleUpload(uploadData)
          .then(response => {
            console.log("response is: ", response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state
            this.setState({ imageUrl: response.secure_url });
          })
          .catch(err => console.log('Error while uploading the file: ', err));
    };

    render() {
        return (
            <div>
                <p>Edit experience</p>
                <form onSubmit ={this.handleFormSubmit}>
                    <label>
                        Name Position
                        <input
                            type="text"
                            name= "namePosition"
                            value= {this.state.namePosition}
                            onChange = {(event) => this.handleChange(event)}
                        />                           
                    </label>
                    <label>
                        Description
                        <input
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange = {(event) => this.handleChange(event)}
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


                    <button>Submit your edition</button>
                </form>
            </div>
        )
    }
 
}


export default EditExperience ;