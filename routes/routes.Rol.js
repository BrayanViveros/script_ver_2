import express from 'express'
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole  } from '../controllers/Control.Rol.js'

const routerRol = express.Router()

routerRol.get('/rol/', getAllRoles)
routerRol.get('/rol/:id', getRoleById)
routerRol.post('/rol/', createRole)
routerRol.put('/rol/:id', updateRole)
routerRol.delete('/rol/:id', deleteRole)

export default routerRol