export const dictionary = {
  clientAlreadyExists: {
    status: 409,
    message: "Client name or email already exists"
  },
  clientNotFound: {
    status: 404,
    message: "Client not found"
  },
  clientRequired: {
    status: 400,
    message: "Client is required"
  },
  reportNotFound: {
    status: 404,
    message: "Report not found"
  },
  protocolNumberExists: {
    status: 409,
    message: "Protocol number already exists"
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