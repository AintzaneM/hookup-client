import React, { Component } from 'react';
import axios from 'axios';
import EditExperience from './EditExperience';
// import { Link } from 'react-router-dom';


class ExperienceDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namePosition: "",
            description: "",
            clickButtonForm: false,
        }
    }

    getSpecificExperience = () => {
        const {params} = this.props.match;
        // console.log(this.props.match)
        axios.get(`http://localhost:5000/api/skills/${params.id}/experiences/${params.experienceId}`)
        .then((experienceFromApi) => {
            const theExperience = experienceFromApi.data
            // console.log("Experience fromDB", theExperience)
            this.setState ({
                namePosition: theExperience.namePosition,
                description: theExperience.description,
                
            });
        })
        .catch((err) => {
            console.log(err);
          });
    }

    handleClickButton =() => {
        this.setState((prevState) => ({
            clickButtonForm : !prevState.clickButtonForm

        }))
    }

    deleteExperience = ()=> {
        const {params} = this.props.match;
        axios.delete(`http://localhost:5000/api/skills/${params.id}/experiences/${params.experienceId}`)
        .then(()=>{
            this.props.history.push(`/skills/${params.id}`)
        })
        
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.getSpecificExperience();
    }
        

    render() {
        return (
            <div>
                <p>experience details</p>
                {/* {console.log(this.state.namePosition)} */}
                <p>{this.state.namePosition}</p>
                <p>{this.state.description}</p>
                <button onClick={this.handleClickButton}>Edit Experience</button>
                {this.state.clickButtonForm === true ? (
                    <EditExperience
                    handleClickButton={() => this.handleClickButton()}
                    theExperience={this.state}
                    getData={()=>this.getSpecificExperience()}
                    {...this.props}
                    />)
                    
                    :(<div></div>
                )}
                <button onClick={()=>this.deleteExperience(this.state._id)}>Delete experience</button>
                

            </div>
        )
    }
}
 


export default ExperienceDetails;