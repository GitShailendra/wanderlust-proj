const Listing = require("../models/listing")
module.exports.Index = async (req,res)=>{
    let listings = await Listing.find({})
    console.log(listings)
    res.render("listing/index.ejs",{listings})
 
}

module.exports.renderFormListing = (req,res)=>{
    
    res.render("listing/new.ejs")
}

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    let listingId = await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author"
    }}).populate("owner")
    if(!listingId){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    
    res.render("listing/show.ejs",{listingId})
 }

 module.exports.createNewListing =async (req,res,next)=>{
    
    let url = req.file.path;
    let filename = req.file.filename
    const newList = new Listing(req.body.listing)
    console.log(newList)
    newList.owner = req.user._id
    newList.image.url=url;
    newList.image.filename=filename
    await newList.save()
    req.flash("success","New listing is created!")
    res.redirect("/listings");
    
}

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    const listing= await Listing.findById(id)
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings");
    }
    
    req.flash("success","Listing is edited!")

    res.render("listing/edit.ejs",{listing})
}

module.exports.updateListing =async(req,res)=>{

    let {id} = req.params;
    
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file !=="undefined"){
        let url = req.file.path;
        let filename = req.file.filename
        listing.image={url,filename};
        await listing.save()
    }
    
    req.flash("success","Listing is updated!")

    res.redirect(`/listings/${id}`)

}
module.exports.destroyListing = async(req,res)=>{
    
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    req.flash("success","Listing is deleted!")

    res.redirect(`/listings`)

}
module.exports.filterByCategory= async (req,res)=>{
    let {category} = req.params;
    let listings;
    if (category) {
        listings = await Listing.find({ category: category });
        if (listings.length === 0) {
          // Set a flash message if no listings found in this category
          req.flash("error", `No listings found for the category "${category}"`);
          return res.redirect("/listings");  // Redirect to the listings page
        }
      } else {
        listings = await Listing.find({});  // Return all listings if no category is selected
      }
    
      // If listings are found, render them on the page
      res.render("listing/index.ejs", { listings });
    // const listings = await Listing.find({category})
    // console.log(listings)
    // if(!listings){
    //     req.flash("error","No listings found")
    //     res.send("listing not found")
    // }
    // res.render("listing/index.ejs", { listings, category });

}