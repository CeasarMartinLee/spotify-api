const Sequelize = require('sequelize')
const sequelize = require('../db')
const Song = require('../songs/model')

const Playlist = sequelize.define('playlists', {
  playlistName: {
    type: Sequelize.STRING,
    field: 'playlist_name',
    unique: 'true',
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})

Playlist.hasMany(Song)

module.exports = Playlist