const Sequelize = require('sequelize')
const sequelize = require('../db')

const Song = sequelize.define('songs', {
    songTitle: {
        type: Sequelize.STRING,
        field: 'song_title',
        allowNull: false
    },
    artistName: {
        type: Sequelize.STRING,
        field: 'artist_name',
        allowNull: false
    },
    albumTitle: {
        type: Sequelize.STRING,
        field: 'album_title',
        allowNull: false
    }
}, {
        timestamps: false,
        tableName: 'songs'
    })


module.exports = Song