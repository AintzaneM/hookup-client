import React, { Component } from 'react';


class ContactWithExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: this.props.user_id,
            clickButtonForm: false,
        }
    }

    toggleForm = () => {
        if (!this.state.clickButtonForm) {
            this.setState({ clickButtonForm: true });
        } else {
            this.setState({ clickButtonForm: false })
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    showForm = () => {
        if (this.state.clickButtonForm) {
            return (
                <div className="form-getContact">
                    <form>
                        <div className="input-container-contact">
                            <label for="emailAddress"></label>
                            <input id="emailAddress" type="email" size="64" maxLength="64" required
                                placeholder="youremail@gmail.com"
                                title="Please provide your e-mail address" />
                        </div>
                        <div className="messageBox">
                            <label for="message"></label>
                            <textarea id="message" cols="80" rows="8" required
                                placeholder="Get in contact and share your concerns about this job experience "></textarea>
                        </div>
                        <button className="btn-submit-email" type="submit" value="Send your email!"><strong>Send your email!</strong></button>
                    </form>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <button className="btn-contact" onClick={() => this.toggleForm()}>
                    <strong>Get in contact!</strong></button>
                {this.showForm()}
            </div>
        )
    }
}


export default ContactWithExperience;