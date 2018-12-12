import React, { Component } from 'react'
import {graphql, compose} from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'


class AddBook extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    displayAuthors() {
        var data = this.props.getAuthorsQuery
        if (data.loading){
            return ( <option>Loading authors...</option>)
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

    submitForm(e) {
        e.preventDefault()
        this.props.addBookMutation({
            variables: this.state,
            refetchQueries: [{query:getBooksQuery}]
        })
        this.inputName.value = "";
        this.inputGenre.value = "";
        this.inputAuthor.value = "";
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label htmlFor="bookName">Book name:</label>
                    <input type="text" name="bookName" ref={el => this.inputName = el} onChange={e => this.setState({name:e.target.value})}/>
                </div>

                <div className="field">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" name="genre" ref={el => this.inputGenre = el} onChange={e => this.setState({genre:e.target.value})}/>
                </div>

                <div className="field">
                    <label htmlFor="author">Author:</label>
                    <select name="author" ref={el => this.inputAuthor = el} onChange={e => this.setState({authorId:e.target.value})}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook)
