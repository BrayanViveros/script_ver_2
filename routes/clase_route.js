import { guardarResultadoClase, } from '../controllers/ClasesController.js'


app.post('/usuarios/clase-guardada', passport.authenticate('local'), guardarResultadoClase);