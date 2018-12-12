import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`


class AddBook extends Component {
    displayAuthors() {
        var data = this.props.data
        if (data.loading){
            return ( <option>Loading authors...</option>)
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.name}>{author.name}</option>
                )
            })
        }
    }

    render() {
        return (
            <form id="add-book">
                <div className="field">
                    <label htmlFor="bookName">Book name:</label>
                    <input type="text" name="bookName" />
                </div>

                <div className="field">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" name="genre" />
                </div>

                <div className="field">
                    <label htmlFor="author">Author:</label>
                    <select name="author">
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook)
