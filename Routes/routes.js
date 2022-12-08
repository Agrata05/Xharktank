const router = require("express").Router();
const controller = require("../controllers/controllers");

router.get('/pitches',controller.allPitches);
router.get('/pitches/:pitchId',controller.findPitch);
router.post("/pitches",controller.addPitch);
router.post("/pitches/:pitchId/makeOffer",controller.counterOffer);


module.exports = router;