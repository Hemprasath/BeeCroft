const express = require('express');
const uploadFields = require('../middlewares/uploadMiddleware');
const {
  submitForm,
  getForms,
  deleteForms,
  viewFile
} = require('../controllers/formController');

const router = express.Router();

router.get('/formdatas', getForms);
router.delete('/', deleteForms);
router.post('/submit-form', uploadFields, submitForm);
router.get('/view-file/:id/:filename', viewFile);

module.exports = router;
