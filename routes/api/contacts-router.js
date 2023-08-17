import express from 'express';

import contactsController from '../../controllers/contactController.js'

import contactsSchema from '../../schema/schemaJoi.js'

import { validateBody } from '../../decorators/index.js';

import { isEmptyBody, isValidId, authenticate } from '../../middlewars/index.js';


const contactsRouter = express.Router();

contactsRouter.use(authenticate)

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post('/',validateBody(contactsSchema.contactsAddSchema), contactsController.add);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter.put('/:contactId', isValidId, isEmptyBody, validateBody(contactsSchema.contactsAddSchema), contactsController.updateById);

contactsRouter.patch('/:contactId/favorite', isValidId, isEmptyBody, validateBody(contactsSchema.contactUpdateFavoriteSchema), contactsController.updateFavorite);

export default contactsRouter;
