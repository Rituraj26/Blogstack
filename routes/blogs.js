var express = require("express");
var router  = express.Router();
var Blog = require("../models/blog");

// INDEX ROUTE
router.get("/", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR!");
		} else {
		   res.render("blogs/index", {blogs: blogs}); 
		}
	});
 });
 
 // NEW ROUTE
 router.get("/new", function(req, res){
	 res.render("blogs/new");
 });
 
 // CREATE ROUTE
 router.post("/", function(req, res){
	 Blog.create(req.body.blog, function(err, newBlog){
		 if(err){
			 res.render("blogs/new");
		 } else {
			 res.redirect("/blogs");
		 }
	 });
 });
 
 // SHOW ROUTE
 router.get("/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("blogs/show", {blog: foundBlog});
		}
	})
 });
 
 // EDIT ROUTE
 router.get("/:id/edit", function(req, res){
	 Blog.findById(req.params.id, function(err, foundBlog){
		 if(err){
			 res.redirect("/blogs");
		 } else {
			 res.render("blogs/edit", {blog: foundBlog});
		 }
	 });
 })
 
 
 // UPDATE ROUTE
 router.put("/:id", function(req, res){
	 req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
	   if(err){
		   res.redirect("/blogs");
	   }  else {
		   res.redirect("/blogs/" + req.params.id);
	   }
	});
 });
 
 // DELETE ROUTE
 router.delete("/:id", function(req, res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
 });

 module.exports = router;