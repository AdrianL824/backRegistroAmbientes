import spacesModel from "../models/spaceModel.js";
import slugify from "slugify";
export const registerSpaceController = async (req, res) => {
    try {
      const { name, capacity, block, webaddress } = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      //save
      const space = await new spacesModel({
        name, capacity, block, webaddress, slug: slugify(name),
      }).save();
  
      res.status(200).send({
        success: true,
        message: "space Register Successfully",
        space,
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
  //get all spaces
  export const spaceControlller = async (req, res) => {
    try {
      const space = await spacesModel.find({});
      res.status(200).send({
        success: true,
        message: "All Space List",
        space,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all spaces",
      });
    }
  };

  //get single space
  export const singleSpaceController = async (req, res) => {
    try {
      const space = await spacesModel.findOne({ name: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Space SUccessfully",
        space,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Space",
      });
    }
  };


