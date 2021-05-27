import { graphql } from 'react-apollo'
import fetchSong from "../queries/fetchSong";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import gql from "graphql-tag";
import LyricCreate from "./LyricCreate";

const SongDetail = (props) => {

  const [title, setTitle] = useState(null)

  useEffect(() => {
    if(!props.data.loading) {
      if(props.data.song) {
        setTitle(props.data.song.title)
      }
    }
  }, [props.data])


  const renderLyrics = (lyrics) => {
    return lyrics.map(({id, content, likes}) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <i
            className={'material-icons like right'} style={{color: 'grey', fontSize: 'medium'}}
            onClick={() => onLike(id, likes)}
          >
            thumb_up
          </i>
          <small className={'right'}>{likes}</small>
        </li>
      )
    })
  }

  const onLike = (id, likes) => {
    props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }


  if(props.data.loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {props.data.song ? (
        <div>
          <br/>
          <Link to={'/'}>Go Back</Link>

          <h3>{title}</h3>

          {props.data.song.lyrics.length > 0 && (
            <div>
              <h6 style={{textAlign: 'center', marginTop: '4rem'}}>Lyrics of {title}</h6>
              <ul className={'collection'}>
              {renderLyrics(props.data.song.lyrics)}
              </ul>
            </div>
            )}

            <br/><br/>
            <LyricCreate songId={props.match.params.id} />
        </div>
      ) : (
        <h2>404 Not Found</h2>
      )}
    </>
  )
}

const addLike = gql(`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`)


export default graphql(addLike)(
    graphql(fetchSong, {
      options: props => {
        return { variables: { id: props.match.params.id } }
      }
    })(SongDetail)
)