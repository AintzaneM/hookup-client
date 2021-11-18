import axios from 'axios';
import React, { Component } from 'react';
import authService from '../auth/auth-service';


class AddSkill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"",
            description: "",
            imageUrl:"",
            experiencesList:[],
            clickButtonForm: false,
        }
    }

    toggleForm =() =>{
        if(!this.state.clickButtonForm) {
            this.setState({clickButtonForm : true});
        } else {
            this.setState({clickButtonForm: false})
        }
    }

    
 
    showForm = () => {
        if(this.state.clickButtonForm) {
            return (
                <div className="form-addSkill">
                    <form onSubmit = {this.handleFormSubmit}>
                    <div className="input-container-addSkill">
                        <label>
                            <input 
                                placeholder="Title"
                                type= "text"
                                name= "title"
                                value = {this.state.title}
                                onChange= {(event) => this.handleChange(event)}
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
                        <button className="btn-submit-skill"><strong>Submit the new skill!</strong></button>
                        </div>
                    </form>
                </div>
            )
        }
    }

    handleChange = (event) => {
        const {name, value}= event.target;
        this.setState({[name]: value})
    }

    handleFileUpload = (event) => {
        // console.log("The file to be uploaded is: ", event.target.files[0]);
     
        const uploadData = new FormData();
     
        uploadData.append('imageUrl', event.target.files[0]);
     
        authService
          .handleUpload(uploadData)
          .then(response => {
            console.log("response is: ", response);
            this.setState({ imageUrl: response.secure_url });
          })
          .catch(err => console.log('Error while uploading the file: ', err));
    };


    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const imageUrl = this.state.imageUrl;
        const experiencesList = this.state.experiencesList

        axios.post(`${process.env.REACT_APP_API_URL}/skills`, {title, description, imageUrl, experiencesList}, { withCredentials: true })
        .then(() => {
            this.props.getSkill();
            this.setState({title:"", description:""})
            this.toggleForm()
        })
        .catch((err)=>console.log(err))
    }
    render(){
        return (

            <div>
            <button className="btn-addSkill" onClick={() => this.toggleForm()}>
                <strong>Add a new skill!</strong></button>
            {this.showForm()}
            </div>
        )
    }
}
 


export default AddSkill ;