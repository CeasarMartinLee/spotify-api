const Sequelize = require('sequelize')
const sequelize = require('../db')
const Song = require('../songs/model')
const User = require('../users/model')


const Playlist = sequelize.define('playlists', {
	playlistName: {
		type: Sequelize.STRING,
		field: 'playlist_name',
		allowNull: false
	}
}, {
		timestamps: false,
		tableName: 'playlists'
	})

Playlist.hasMany(Song)
Playlist.belongsTo(User)

module.exports = Playlist