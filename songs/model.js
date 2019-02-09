const Sequelize = require('sequelize')
const sequelize = require('../db')
// const Playlist = require('../playlists/model')

const Song = sequelize.define('songs', {
  songTitle: {
    type: Sequelize.STRING,
    field: 'song_title',
    validate: {
        allowNull: false
    }
  },
  artistName: {
    type: Sequelize.STRING,
    field: 'artist_name',
    validate: {
        allowNull: false
    }
  },
  albumTitle: {
    type: Sequelize.STRING,
    field: 'album_title',
    validate: {
        allowNull: false
    }
  }
}, {
  timestamps: false,
  tableName: 'songs'
})

// Song.belongsTo(Playlist)

module.exports = Song