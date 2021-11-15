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
            owner: "",
        }
    }

    getSpecificExperience = () => {
        const {params} = this.props.match;
        // console.log(this.props.match)
        axios.get(`http://localhost:5001/api/skills/${params.id}/experiences/${params.experienceId}`)
        .then((experienceFromApi) => {
            const theExperience = experienceFromApi.data
            // console.log("Experience fromDB", theExperience)
            this.setState ({
                namePosition: theExperience.namePosition,
                description: theExperience.description,
                skill: theExperience.skill,
                owner: theExperience.owner
                
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
        axios.delete(`http://localhost:5001/api/skills/${params.id}/experiences/${params.experienceId}`)
        .then(()=>{
            this.props.history.push(`/skills/${params.id}`)
        })
        
        .catch((err) => {
            console.log(err)
        })
    }

    ownershipCheck = (experience) => {
        const currentUserIsOwner =
          this.props.user && (experience.owner === this.props.user._id);
        //   console.log("props_user", this.props.user)
        //   console.log("experience_owner", experience.owner )
        //   console.log("props_user_id", this.props.user._id)
        
     
        if (currentUserIsOwner) {
          return (
            <div>
              <button onClick={() => this.deleteExperience(this.state._id)}>
                Delete project
              </button>
            </div>
          );
        }
        console.log("current user", currentUserIsOwner)
      };



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
                <div> {this.ownershipCheck(this.state)} </div>
                {/* <button onClick={()=>this.deleteExperience(this.state._id)}>Delete experience</button> */}
                

            </div>
        )
    }
}
 


export default ExperienceDetails;