const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')
const Sequelize = require('sequelize')


const router = new Router()

router.post('/playlists/:id/songs', (req, res, next) => {
    req.body.playlistId = req.params.id

    Playlist
    .findById(req.params.id)
    .then(playlist => {
        if (!playlist) {
            return res.status(404).send({
            message: `Playlist does not exist`
            })
        }
        return (
            Song
            .create(req.body)
            .then(song => {
                console.log(song)
                console.log(req.body)
              if (!song) {
                return res.status(404).send({
                    message: `Song does not exist`
                })
              }
              return res.status(201).send(song)
            })
        )
    })
    .catch(Sequelize.ValidationError, error => {
        return res.status(422).send({
            message: `Song/Artist/Album should have a value....Details:` + error,
    })})
    .catch(error => next(error))

})

router.put('/playlists/:id/songs/:id', (req, res, next) => {
    Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.update(req.body).then(song => res.send(song))
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id/songs/:id', (req, res, next) => {
    Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.destroy()
        .then(() => res.send({
          message: `Song was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router