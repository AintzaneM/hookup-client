import axios from 'axios';
import React, { Component } from 'react';


class AddSkill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"",
            description: "",
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
                                type="text"
                                name="description"
                                value={this.state.description}
                                onChange={(event) => this.handleChange(event)}
                            />
                        </label>
                        <button>Submit your the new skill!</button>
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

    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const experiencesList = this.state.experiencesList

        axios.post(`${process.env.REACT_APP_API_URL}/skills/`, {title, description, experiencesList}, { withCredentials: true })
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
            <button onClick={() => this.toggleForm()}>
                Add the new skill!</button>
            {this.showForm()}
            
            </div>
        )
    }
}
 


export default AddSkill ;