import express from 'express'

const router = express.Router()
import { auth } from '../middleware/auth'
import TagController from '../controllers/tagController'

router.route('/tag')
    .post(auth, TagController.createTag)
    .get(TagController.getTags)

router.route('/tag/:id')
    .patch(auth, TagController.updateTag)
    .delete(auth, TagController.deleteTag)

export default router