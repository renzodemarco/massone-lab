export default class CustomError {
  static from({ status, message }) {
    const error = new Error(message);
    error.status = status;
    return error;
  }

  static new({ status, message }) {
    throw CustomError.from({ status, message });
  }
}
