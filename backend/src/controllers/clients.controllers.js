import * as clientsServices from "../services/clients.services.js"
import { createClientSchema, updateClientSchema } from '../schemas/clients.schema.js';

export async function POSTClient(req, res, next) {
  try {
    const { error, value } = createClientSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const client = await clientsServices.createClient(value);
    return res.status(201).json({ success: true, payload: client });
  }
  catch (e) {
    next(e)
  }
}

export async function GETAllClients(req, res, next) {
  try {
    let { q, page = 1, limit = 20 } = req.query;
    q = q?.trim();
    page = Number(page);
    limit = Number(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 20;

    const clients = await clientsServices.getClients({ q, page, limit });
    return res.status(200).json({ success: true, payload: clients });
  }
  catch (e) {
    next(e)
  }
}

export async function GETClientById(req, res, next) {
  try {
    const { id } = req.params;
    const client = await clientsServices.getClientById(id);
    return res.status(200).json({ success: true, payload: client });
  }
  catch (e) {
    next(e);
  }
}

export async function PUTClient(req, res, next) {
  try {
    const { id } = req.params;
    const { error, value } = updateClientSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const client = await clientsServices.updateClient(id, value);
    return res.status(200).json({ success: true, payload: client });
  }
  catch (e) {
    next(e)
  }
}

export async function DELETEClient(req, res, next) {
  try {
    const { id } = req.params;
    const client = await clientsServices.deleteClient(id);
    return res.status(200).json({ success: true, payload: client });
  }
  catch (e) {
    next(e)
  }
}
