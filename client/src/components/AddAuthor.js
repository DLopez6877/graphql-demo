import React, { Component } from 'react'
import {graphql, compose} from 'react-apollo'
import {addAuthorMutation, getAuthorsQuery} from '../queries/queries'


class AddAuthor extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            age: null
        }
    }

    submitForm(e) {
        e.preventDefault()
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: parseInt(this.state.age)
            },
            refetchQueries: [{query:getAuthorsQuery}]
        })
        this.inputAge.value = "";
        this.inputName.value = "";
    }

    render() {
        return (
            <form id="add-author" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label htmlFor="authorName">Author name:</label>
                    <input type="text" name="authorName" ref={el => this.inputName = el} onChange={e => this.setState({name:e.target.value})}/>
                </div>

                <div className="field">
                    <label htmlFor="age">Age:</label>
                    <input type="number" name="age" ref={el => this.inputAge = el} onChange={e => this.setState({age:e.target.value})}/>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addAuthorMutation, { name: "addAuthorMutation"})
)(AddAuthor)