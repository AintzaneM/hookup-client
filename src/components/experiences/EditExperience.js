import axios from 'axios';
import React, { Component } from 'react';

class EditExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: this.props.theExperience.namePosition,
            description: this.props.theExperience.description,
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

        axios.put(`http://localhost:5000/api/skills/${params.id}/experiences/${params.experienceId}`,{namePosition, description})
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
                    
                    <button>submit edition</button>

                </form>
            </div>
        )
    }
 
}


export default EditExperience ;