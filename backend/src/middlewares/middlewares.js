import ClientModel from "../models/clients.model.js";
import CustomError from "../utils/custom.error.js";
import dictionary from "../utils/error.dictionary.js";

export async function validateClient(req, res, next) {
  try {
    const { client } = req.body;

    if (!client)CustomError.new(dictionary.clientRequired)

    const exists = await ClientModel.findById(client).lean();

    if (!exists) CustomError.new(dictionary.clientNotFound);

    next()
  } 
  catch (e) {
    next(e);
  }
}