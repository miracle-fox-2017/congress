const express = require('express');
const router = express.Router();

router.get(`/`, (req, res) =>
  {
    res.render(`voters`)
  }
);


module.exports = router;