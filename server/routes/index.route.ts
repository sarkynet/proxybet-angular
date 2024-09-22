const express = require("express");
const ticketCtrl = require("./controllers/ticket.controller");

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req: any, res: any) =>
  {res.json('Called')}
); 

router.use('/tickets', ticketCtrl)

module.exports = router;