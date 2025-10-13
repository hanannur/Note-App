const noteController = require('../controller/noteController')
const router = require("express").Router();

router.get('/' , noteController.getAll);
router.post('/' , noteController.create);
router.get('/:id' , noteController.getOne);
router.delete('/:id', noteController.remove);
router.patch('/:id', noteController.updatedNotes);
module.exports=router;