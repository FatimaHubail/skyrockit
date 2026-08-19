const express = require('express');
const authCtrl = require('../controllers/applicationsCtrl');

const router = express.Router({ mergeParams: true });

router.get('', applicationsCtrl.index);
router.get('/new', applicationsCtrl.newApp);
router.post('/new', applicationsCtrl.create);
router.get('/:appId', applicationsCtrl.show);
router.delete('/:appId', applicationsCtrl.deleteApp);
router.get('/:appId/edit', applicationsCtrl.edit);

module.exports = router;