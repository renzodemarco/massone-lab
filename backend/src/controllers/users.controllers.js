import { loginUser } from '../services/users.services.js';
import { loginSchema } from '../schemas/users.schema.js'

export async function POSTLoginUser(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const token = await loginUser(value);
    return res.status(200).json({ success: true, payload: token });
  }
  catch (e) {
    next(e);
  }
}