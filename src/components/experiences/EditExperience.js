import axios from 'axios';
import React, { Component } from 'react';

class EditExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: this.props.theExperience.namePosition,
            description: this.props.theExperience.description,
            skill: this.props.theExperience.skill,
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
        const skill = this.state.skill;
        const owner = this.state.owner;

        axios.put(`${process.env.REACT_APP_API_URL}/skills/${params.id}/experiences/${params.experienceId}`,{namePosition, description, skill, owner}, { withCredentials: true })
        .then(()=> {
            this.props.getData();
            this.props.handleClickButton();          
        })
        .catch((err) => console.log(err))
    }

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
                    <button>Submit your edition</button>
                </form>
            </div>
        )
    }
 
}


export default EditExperience ;