import {useState} from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

const LyricCreate = (props) => {

  const [lyric, setLyric] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    // refetchQueries will not required as we are getting id of lyrics after mutation so apollo
    // knows which id is updated and rerender the page, this is caching and doesn't make any other request
    props.mutate({
      variables: {content: lyric, songId: props.songId},
      refetchQueries: [{ query: fetchSong, variables: { id: props.songId} }]
    }).then(() => {
      setLyric("")
    })
  }



  return (
    <form onSubmit={onSubmit}>
      <label>Add Lyric</label>
      <input
        autoFocus
        onChange={(event) => {setLyric(event.target.value)}}
        value={lyric}
      />
      <br/><br/>
    </form>
  )
}


const addLyric = gql(`
  mutation AddLyricsToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`)

export default graphql(addLyric)(LyricCreate)