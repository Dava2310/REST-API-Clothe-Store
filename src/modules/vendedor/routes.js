import { Router } from "express";
import auth from "../../middleware/auth.js";
import ctrl from './controller.js'

const router = Router();

router.get('/', auth.ensureAuthenticated, auth.authorize(['admin', 'user']), ctrl.getVendedores);

router.get('/:vendedorId', auth.ensureAuthenticated, auth.authorize(['admin', 'user']), ctrl.getOneVendedor);

// router.post('/', auth.ensureAuthenticated, auth.authorize(['admin']), ctrl.createVendedor);
router.post('/', ctrl.createVendedor);

router.patch('/:vendedorId', auth.ensureAuthenticated, auth.authorize(['admin']), ctrl.updateVendedor);

router.delete('/:vendedorId', auth.ensureAuthenticated, auth.authorize(['admin']), ctrl.deleteVendedor);

export default router;