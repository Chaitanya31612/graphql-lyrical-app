import {useState} from "react";
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from '../queries/fetchSongs'

import {Link} from "react-router-dom";
// import { history } from "../App";

const SongCreate = (props) => {

  // console.log(props)
  const [title, setTitle] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    // mutation gives access to props.mutate which calls the mutation function
    // console.log(props)

    // refetchQueries are used to rerun queries after mutation has successfully ran because apollo doesn't do it
    // refectQueries take array of queries to rerun and each query has two properties query and variables
    props.mutate({
      variables: { title },
      refetchQueries: [{ query }]
    }).then(() => {
      props.history.push('/')
    })
  }

  return (
    <>
      <br />
      <Link to={'/'}>Go Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title: </label>
        <input
          autoFocus
          onChange={event => {setTitle(event.target.value)}}
          value={title}
        />
      </form>
    </>
  )
}

const mutation = gql`
  mutation AddSong($title:String){
    addSong(title: $title) {
      id
      title
    }
  }
`

export default graphql(mutation)(SongCreate)