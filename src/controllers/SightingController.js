const express = require('express');
const { Sighting } = require('../models/SightingModel');
const router = express.Router();

// Find ALL sightings in the DB
router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await Sighting.find({});

	response.json({
		sighting: result
	});

});

// Find one sighting by its ID
router.get("/one/id/:id", async (request, response) => {
	let result = await Sighting.findById(request.params.id).populate('user cats', '-password');

	response.json({
		sighting: result
	});

});
// Find one sighting by its name 
// localhost:3000/sightings/multiple/location/Sydney
router.get("/multiple/location/:locationToSearchFor", async (request, response) => {
	let result = await Sighting.find({location: request.params.locationToSearchFor}).populate('user cats', '-password');

	response.json({
		sightings: result
	});

});



// Create a new cat in the DB
// POST localhost:3000/sightings/
/*
Request.body:
{
	location: "Sydney",
	user: "jbhasdpf;klanbsfdgpk;sldejbnf",
	cats: [
		"kjhtfgvkljzsddhfbnvds"
	]
}
*/
router.post("/", async (request, response) => {

	// let providedUser = await User.findOne({id: request.body.user});
	// providedUser._id

	// Error handling via Promise.catch()
    
    // Populate style 1
	let result = await Sighting.create(request.body).catch(error => {return error});
	result = await result.populate('cats');
    // TO FILTER THE VALUES THAT WE WANT TO POPULATE 2 WAYS
    // result = await result.populate('user', 'username');
    result = await result.populate('user', '-password');

    // Populate style 2
    // let result = await Sighting
	// .create(request.body)
	// .catch(error => {return error});

	// let newSighting = await Sighting
	// .findOne({_id: result._id})
	// .populate('cats')
	// .populate('user', 'username')
	// .catch(error => {return error});

	response.json({
		sighting: result
	});

});

// Update an existing  sighting in the DB.
// Find one sighting by its ID, and modify that  sighting. 
// Patch is for whatever properties are provided,
// does not overwrite or remove any unmentioned properties of the  sighting 
router.patch("/:id", async (request, response) => {
	let result = await Sighting.findByIdAndUpdate(
		request.params.id, 
		request.body,
        {
			returnDocument:"after"
		}
		);

	response.json({
		sighting: result
	});

});


// Find one sighting by its ID,
// and delete it from the DB.
router.delete("/:id", async (request, response) => {
	let result = await Sighting.findByIdAndDelete(request.params.id);

	response.json({
		deletedSighting: result
	});

});


module.exports = router;