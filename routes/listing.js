const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validatingListing } = require("../middleware.js");
const Review = require("../models/review.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });
/* index route */
router
  .route("/")
  .get(wrapAsync(listingController.Index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validatingListing,
    wrapAsync(listingController.createNewListing)
  ); //create

//new listing route
router.get("/new", isLoggedIn, listingController.renderFormListing);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //show route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validatingListing,
    wrapAsync(listingController.updateListing)
  ); //update

//edit

router.get(
  "/:id/edit",
  isOwner,
  isLoggedIn,
  wrapAsync(listingController.editListing)
);

//delete
router.delete(
  "/:id/delete",
  isOwner,
  isLoggedIn,
  wrapAsync(listingController.destroyListing)
);
router.get('/category/:category',wrapAsync(listingController.filterByCategory))
module.exports = router;
