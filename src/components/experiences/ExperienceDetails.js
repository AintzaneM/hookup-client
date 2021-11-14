import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


class ExperienceDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: "",
            description: "",
        }
    }

    getSpecificExperience = () => {
        const {params} = this.props.match;
        console.log(this.props.match)
        axios.get(`http://localhost:5000/api/skills/${params.id}/experiences/${params.experienceId}`)
        .then((experienceFromApi) => {
            const theExperience = experienceFromApi.data
            console.log("Experience fromDB", theExperience)
            this.setState ({
                namePosition: theExperience.namePosition,
                description: theExperience.description,
                
            });
        })
        .catch((err) => {
            console.log(err);
          });
    }

    componentDidMount(){
        this.getSpecificExperience();
    }
        

    render() {
        return (
            <div>
                <p>experience details</p>
                {console.log(this.state.namePosition)}
                <p>{this.state.namePosition}</p>
                <p>{this.state.description}</p>
                

            </div>
        )
    }
}
 


export default ExperienceDetails;