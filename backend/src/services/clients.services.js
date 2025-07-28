import ClientsModel from '../models/clients.model.js';
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js';

export async function createClient(data) {
  const existingClient = await ClientsModel.findOne({
    $or: [{ name: data.name }, { email: data.email }]
  }).lean();
  if (existingClient) {
    if (existingClient.name === data.name) CustomError.new(dictionary.clientExists);
    if (existingClient.email === data.email) CustomError.new(dictionary.emailExists);
  };
  return await ClientsModel.create(data);
}

export async function getAllClients() {
  return await ClientsModel.find();
}

export async function getClientById(id) {
  const client = await ClientsModel.findById(id);
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}

export async function getClientsByName(name) {
  return await ClientsModel.find({
    name: { $regex: name, $options: 'i' }
  });
}

export async function updateClient(id, data) {
  const client = await ClientsModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}

export async function deleteClientById(id) {
  const client = await ClientsModel.findByIdAndDelete(id);
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}