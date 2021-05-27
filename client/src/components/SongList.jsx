import {graphql} from 'react-apollo'
import {Link} from "react-router-dom";
import query from '../queries/fetchSongs'
import gql from "graphql-tag";

const SongList = (props) => {

  const onSongDelete = (id) => {
    props.mutate({
      variables: { id },
      // refetchQueries: [{ query }]
    }).then(() => {
      props.data.refetch()
    })
  }

  const renderSongs = () => {
    return props.data.songs.map(({id, title}) => {
      return (
          <li key={id} className="collection-item">
            <Link key={id} to={`/songs/${id}`}>
            {title}
            </Link>
            <i
              className={'material-icons delete right'}
              style={{color: 'grey', fontSize: 'medium'}}
              onClick={() => onSongDelete(id)}
            >
              delete
            </i>
          </li>
      )
    })
  }

  if(props.data.loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h3 style={{textAlign: "center", marginBottom: '30px'}}>List of Songs</h3>
      <ul className="collection">
        {renderSongs()}
      </ul>
      <Link
        to={'/songs/new'}
        className="btn-floating btn-large blue right"
        style={{marginBottom: '3rem'}}
      >
        <i className='material-icons'>add</i>
      </Link>
    </>
    )
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`


// graphql(query) returns a function and is used by (SongList)
export default graphql(mutation)(
  graphql(query)(SongList)
)