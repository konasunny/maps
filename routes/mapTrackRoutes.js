var express = require('express');
var router = express.Router();
var mapTrackController = require('../controllers/mapTrackController.js');
 
/*
 * GET
 */
router.get('/maps', mapTrackController.getAll);
 
/*
 * GET
 */
router.get('/maps/:techId/:requestId', mapTrackController.getByTechId);
 
/*
 * POST
 */
router.post('/maps', mapTrackController.create);
 
/*
 * PUT
 */
router.put('/maps/:id', mapTrackController.update);
 
/*
 * DELETE
 */
router.delete('/maps/:id', mapTrackController.remove);
 
module.exports = router;