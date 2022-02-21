import express from 'express';
import { getBags,createBag, deleteBag, getSingleBag, updateBag} from '../controllers/bagsController.js';
const router = express.Router();

router.post('/',createBag)
router.get('/:email', getBags);
router.get('/details/:id', getSingleBag);
router.put('/update/:id', updateBag);

router.delete('/:id', deleteBag);


export default router;
