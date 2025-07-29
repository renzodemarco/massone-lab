export const dictionary = {
  clientAlreadyExists: {
    status: 409,
    message: "Client name or email already exists"
  },
  clientNotFound: {
    status: 404,
    message: "Client not found"
  },
  authentication: {
    status: 401,
    message: "Not authenticated"
  },
  authorization: {
    status: 403,
    message: "Not authorized"
  }
}

export default dictionary