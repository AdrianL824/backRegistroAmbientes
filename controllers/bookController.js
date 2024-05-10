import booksModel from "../models/bookModel.js";
import slugify from "slugify";
export const registerBookController = async (req, res) => {
    try {
      const { name, capacity, block, webaddress, name_teacher, date, day, schedule } = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      {/*
      if (!capacity) {
        return res.send({ message: "capacity is Required" });
      }
      if (!block) {
        return res.send({ message: "block is Required" });
      }
      if (!webaddress) {
        return res.send({ message: "WebAddress is Required" });
      }*/}
      //save
      const book = await new booksModel({
        name, capacity, block, webaddress, name_teacher, date, day, schedule, slug: slugify(name),
      }).save();
  
      res.status(200).send({
        success: true,
        message: "book Register Successfully",
        book,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Registeration",
        error,
      });
    }
  };
  //get all books
  export const bookControlller = async (req, res) => {
    try {
      const book = await booksModel.find({});
      res.status(200).send({
        success: true,
        message: "All Book List",
        book,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all books",
      });
    }
  };

  //get single book
  export const singleBookController = async (req, res) => {
    try {
      const book = await booksModel.find({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "get single book",
        book,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error getting single book",
      });
    }
  };


