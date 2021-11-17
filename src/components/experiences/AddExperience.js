import axios from 'axios';
import React, { Component } from 'react';


class AddExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition:"",
            description: "",
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
                <div className="form-addExperience">
                    <form onSubmit = {this.handleFormSubmit}>
                    <div className="input-container-addExperience">
                        <label>
                            <input 
                                placeholder="Position Name"
                                type= "text"
                                name= "namePosition"
                                value = {this.state.namePosition}
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
                        <button>Submit your experience!</button>
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
        const namePosition = this.state.namePosition;
        const description = this.state.description;
        const skill = this.props.specificSkill._id;
        const owner = this.props.specificOwner.experiencesList;

        axios.post(`${process.env.REACT_APP_API_URL}/experiences`, {namePosition, description, skill, owner}, { withCredentials: true })
        .then(() => {
            this.props.getSkill();
            this.setState({namePosition:"", description:""})
            this.toggleForm()
        })
        .catch((err)=>console.log(err))
    }

    render(){
        return (

            <div>
            <button onClick={() => this.toggleForm()}>
                Add your experience!</button>
            {this.showForm()}
            
            </div>
        )
    }
}
 


export default AddExperience ;