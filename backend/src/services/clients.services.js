import ClientsModel from '../models/clients.model.js';
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js';

export async function createClient(data) {
  const existing = await ClientsModel.findOne({
    $or: [
      { name: { $regex: `^${data.name}$`, $options: 'i' } },
      { email: data.email }
    ]
  }).lean();
  if (existing) CustomError.new(dictionary.clientAlreadyExists);
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
  if (data.name || data.email) {
    const existing = await ClientsModel.findOne({
      _id: { $ne: id },
      $or: [
        data.name ? { name: { $regex: `^${data.name}$`, $options: 'i' } } : null,
        data.email ? { email: data.email } : null
      ].filter(Boolean)
    }).lean();
    if (existing) CustomError.new(dictionary.clientAlreadyExists);
  }
  const client = await ClientsModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}

export async function deleteClient(id) {
  const client = await ClientsModel.findByIdAndDelete(id);
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}