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
  clientHasReports: {
    status: 409,
    message: "Client cannot be deleted because it has associated reports"
  },
  reportNotFound: {
    status: 404,
    message: "Report not found"
  },
  reportImagesRequired: {
    status: 400,
    message: "At least one image file is required"
  },
  reportImageUploadFailed: {
    status: 500,
    message: "Report image upload failed"
  },
  protocolNumberExists: {
    status: 409,
    message: "Protocol number already exists"
  },
  invalidQuery: {
    status: 400,
    message: "Invalid query format"
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
