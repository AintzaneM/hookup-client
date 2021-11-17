import axios from 'axios';
import React, { Component } from 'react';


class ContactWithExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: this.props.user_id,
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

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        
    //     // const {params} = this.props.match;
    //     // const emailUser = this.state.emailUser;
    //     // const description = this.state.description;
    //     // const skill = this.state.skill;
        const owner = this.props.owner;
        

    //     // console.log("experience email", emailUser)
    //     // console.log("user", this.state.user.username)
        console.log("owner", owner)

    //     // axios.get(`${process.env.REACT_APP_API_URL}/skills/${params.id}/experiences/${params.experienceId}`,{emailUser, description, skill, owner}, { withCredentials: true })
    //     // .then(()=> {
    //     //     this.props.getData();
    //     //     this.props.handleClickButton();          
    //     // })
    //     // .catch((err) => console.log(err))
    }


    showForm =() => {
        if(this.state.clickButtonForm) {
        return(
            <div>

                <form>
                    <div class="emailBox">
                        <label for="emailAddress">Your e-mail address</label>
                        <input id="emailAddress" type="email" size="64" maxLength="64" required
                                placeholder="youremail@gmail.com" 
                                title="Please provide your e-mail address"/>
                    </div>

                <div class="messageBox">
                <label for="message">Email</label>
                <textarea id="message" cols="80" rows="8" required
                            placeholder= "Get in contact and share your concerns about this job experience "></textarea>
                </div>
                <input type="submit" value="Send your email!"/>
                </form>

            </div>
        )
        }
    }

    render() {
        return (

            <div>
            <button onClick={() => this.toggleForm()}>
                Get in contact!</button>
            {this.showForm()}
            
            </div>

        )
    }
}



export default ContactWithExperience ;