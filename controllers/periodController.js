import periodsModel from "../models/periodModel.js";
import slugify from "slugify";
export const registerPeriodController = async (req, res) => {
    try {
      const { name, date_i, date_e, } = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      //save
      const period = await new periodsModel({
        name, date_i, date_e, slug: slugify(name),
      }).save();
  
      res.status(200).send({
        success: true,
        message: "period Register Successfully",
        period,
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
  //get all period
  export const periodControlller = async (req, res) => {
    try {
      const period = await periodsModel.find({});
      res.status(200).send({
        success: true,
        message: "All Period List",
        period,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all period",
      });
    }
  };

  //get single period
  export const singlePeriodController = async (req, res) => {
    try {
      const period = await periodsModel.find({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get Single period Successfully",
        period,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single period",
        period,
      });
    }
  };

  // update period
export const updatePeriodController = async (req, res) => {
  try {
    const { name, date_i, date_e } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    const updatedPeriod = await periodsModel.findByIdAndUpdate(
      id,
      { name, date_i, date_e, slug: slugify(name) },
      { new: true }
    );
    if (!updatedPeriod) {
      return res.status(404).send({ success: false, message: "Period not found" });
    }
    res.status(200).send({
      success: true,
      message: "Period updated successfully",
      period: updatedPeriod,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating period",
    });
  }
};
