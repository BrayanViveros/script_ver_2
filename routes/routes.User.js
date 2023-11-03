import express from 'express'
import { getAllApdz, getApdz, createApdz, updateApdz, deleteApdz  } from '../controllers/controlUser.js'

const routerUser = express.Router()

routerUser.get('/', getAllApdz)
routerUser.get('/:id', getApdz)
routerUser.post('/', createApdz)
routerUser.put('/:id', updateApdz)
routerUser.delete('/:id', deleteApdz)

export default routerUser