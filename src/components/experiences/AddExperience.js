import axios from 'axios';
import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';


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
                <div>
                    <form onSubmit = {this.handleFormSubmit}>
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
                        <button>Submit newExperience</button>
                    </form>
                </div>
            )
        }
    }

    handleChange = (event) => {
        // event.preventDefault()
        const {name, value}= event.target;
        this.setState({[name]: value})
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const namePosition = this.state.namePosition;
        const description = this.state.description;
        const skill = this.props.specificSkill._id

        axios.post('http://localhost:5000/api/experiences', {
            namePosition,
            description,
            skill,
        })
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
                add experience</button>
            {this.showForm()}
            
            </div>
        )
    }
}
 


export default AddExperience ;