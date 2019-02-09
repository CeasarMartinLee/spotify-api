const { Router } = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/playlists', auth, (req, res, next) => {
    Playlist
        .findAll({where: { userId : req.user.id }})
        .then(playlists => {
            res.status(200).send({ playlists })
        })
        .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
    Playlist
        .findById(req.params.id, { include: [Song] })
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            } else if (playlist.userId !== req.user.id){
                return res.status(404).send({
                    message: `Playlist not found`
                })               
            }
            return res.status(200).send(playlist)
        })
        .catch(error => next(error))
})

router.post('/playlists', auth, (req, res, next) => {
    req.body.userId = req.user.id

    Playlist
        .create(req.body)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            return res.status(201).send(playlist)
        })
        .catch(error => next(error))
})

router.delete('/playlists/:id', auth, (req, res, next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            } else if (playlist.userId !== req.user.id){
                return res.status(404).send({
                    message: `Playlist not found`
                })               
            }

            return playlist.destroy()
                .then(
                    Song
                        .destroy({ where: { playlistId: req.params.id } })
                        .then(() => res.status(204).send({
                            message: `Successfully deleted playlist and all songs on it`
                        }))
                )
        })
        .catch(error => next(error))
})

module.exports = router