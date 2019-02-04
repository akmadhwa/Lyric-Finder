import React, { Component } from "react";
import { Link } from 'react-router-dom'

import axios from "axios";
import moment from 'moment'
import Spinner from "../layout/Spinner";

class Lyrics extends Component {
  state = {
    track: {},
    lyric: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        // console.log(res.data);
        this.setState({ lyric: res.data.message.body.lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
          console.log(res.data)
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyric } = this.state;
      if (track === undefined || lyric === undefined || Object.keys(track).length === 0 || Object.keys(lyric).length === 0 ) {
        return <Spinner />
    }
    else {
        return (
            <React.Fragment>
                <Link to="/" className="btn btn-dark mb-4">Go Back</Link>
                <div className="card">
                    <div className="card-header">
                        {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                    </div>
                    <div className="card-body">
                        <div className="card-text">
                            {lyric.lyrics_body}
                        </div>
                    </div>
                </div>

                <ul className="list-group mt-3">
                    <li className="list-group-item">
                        <strong> Album ID</strong>: {track.album_id}
                    </li>
                    <li className="list-group-item">
                        <strong> Song Genre</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                    </li>
                    <li className="list-group-item">
                        <strong> Explicit</strong>: {track.explicit === 0 ? 'No' : 'Yest'}
                    </li>
                    <li className="list-group-item">
                        <strong> Release Date</strong>: {moment(track.updated_time).format("MMM Do YY")}
                    </li>
                </ul>
            </React.Fragment>
        )
    }
    }
}

export default Lyrics;
