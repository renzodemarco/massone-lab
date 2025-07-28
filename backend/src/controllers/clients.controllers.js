import * as clientsServices from "../services/clients.services.js"
import { createClientSchema } from '../schemas/clients.schema.js';

export async function POSTClient(req, res, next) {
  try {
    const { error, value } = createClientSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const client = await clientsServices.createClient(value);
    res.status(201).json({ success: true, payload: client });
  }
  catch (e) {
    next(e)
  }
}