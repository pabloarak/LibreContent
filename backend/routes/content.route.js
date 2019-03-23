const express = require('express');
const router = express.Router();

const contentController = require('../controllers/content.controller');

router.post('/create', contentController.contentCreate);
router.get('/:id', contentController.contentDetails);
router.get('/list/all', contentController.contentList);
router.put('/:id/update', contentController.contentUpdate);
router.delete('/:id/delete', contentController.contentDelete);
router.get('/printNumber/:number', contentController.printNumber);
router.get('/printStair/:times', contentController.printStair);
router.get('/nearbyEvent/:dateForQuery&:eventDates', contentController.nearbyEvent);

module.exports = router;