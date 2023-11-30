const Location = require('../models/location');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = { create, deletePlace, index };

async function create(req, res) {
  console.log("hitting create [location] controller")
  // console.log(req.body, "<- req.body")
  // console.log(req.user, "<- req.user? i need to embed that in the document for Mongo")

  try {
    const locationDoc = await Location.create({
      residentName: req.body.residentName,
      cityName: req.body.cityName,
      addedBy: req.user._id
    })    
    // console.log(locationDoc, "<- new locationDoc, with addedBy?");
    await locationDoc.save();

    res.status(201).json({place: locationDoc});
    
  } catch (error) {
    console.log(error, "<- error in create location");
    res.json({error: "Problem in creating location in Mongo"})
  }
}


async function deletePlace(req, res) {
  console.log("hitting delete controller fn");
  console.log(req.params, "<- req.params")
  try {
    const placeToRemove = await Location.deleteOne({_id: req.params.id})
    console.log("should be deleted?");
    // await placeToRemove.save();
    res.status(200).json({response: placeToRemove});
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
}


async function index(req, res) {
  // console.log("hit the location controller index fn");
  // console.log(req.user, "<- req.user");
  try {
    const locations = await Location
      .find(
        {addedBy: req.user._id}, 
        {cityName: 1, residentName: 1, addedBy: 1}
        )
      .populate('addedBy');
    // console.log(locations, "<- this user's added locations from Mongo");
    res.status(200).json({locations});


  } catch (error) {
    console.log(error);
    res.json({error: error});
  }
}