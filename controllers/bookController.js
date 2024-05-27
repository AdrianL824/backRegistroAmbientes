import booksModel from "../models/bookModel.js";
import slugify from "slugify";
import mongoose from "mongoose";




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




// get room with most reservations between two dates
export const mostReservedRoomController = async (req, res) => {
  const { startDate, endDate } = req.params;


  try {
    const result = await booksModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: "$name",
          reservationCount: { $sum: 1 }
        }
      },
      {
        $sort: { reservationCount: -1 }
      },
      {
        $limit: 1
      }
    ]);


    res.status(200).send({
      success: true,
      message: "Most reserved room between the given dates",
      room: result[0]?._id || null,
      reservationCount: result[0]?.reservationCount || 0
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting the most reserved room"
    });
  }
};






// get teacher with most reservations between two dates
export const teacherWithMostResevations = async (req, res) => {
  const { startDate, endDate } = req.params;


  try {
    const result = await booksModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: "$name_teacher",
          reservationCount: { $sum: 1 }
        }
      },
      {
        $sort: { reservationCount: -1 }
      },
      {
        $limit: 1
      }
    ]);


    res.status(200).send({
      success: true,
      message: "Teacher with most reservations",
      room: result[0]?._id || null,
      reservationCount: result[0]?.reservationCount || 0
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting the most reserved room"
    });
  }
};