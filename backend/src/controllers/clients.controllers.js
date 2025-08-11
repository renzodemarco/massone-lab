import * as clientsServices from "../services/clients.services.js"
import { createClientSchema, updateClientSchema } from '../schemas/clients.schema.js';

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

export async function GETAllClients(req, res, next) {
  try {
    const clients = await clientsServices.getAllClients();
    res.status(200).json({ success: true, payload: clients });
  }
  catch (e) {
    next(e)
  }
}

export async function PUTClient(req, res, next) {
  try {
    const { id } = req.params;
    const { error, value } = updateClientSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const client = await clientsServices.updateClient(id, value);
    res.status(200).json({ success: true, payload: client });
  }
  catch (e) {
    next(e)
  }
}

export async function DELETEClient(req, res, next) {
  try {
    const { id } = req.params;
    const client = await clientsServices.deleteClient(id);
    res.status(200).json({ success: true, payload: client });
  }
  catch (e) {
    next(e)
  }
}