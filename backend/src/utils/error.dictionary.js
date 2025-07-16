export const dictionary = {
  clientExists: {
    status: 409,
    message: "Client name already exists"
  },
  emailExists: {
    status: 409,
    message: "Email already exists"
  },
  authentication: {
    status: 401,
    message: "Not authenticated"
  },
  authorization: {
    status: 403,
    message: "No authorizated"
  }
}

export default dictionary