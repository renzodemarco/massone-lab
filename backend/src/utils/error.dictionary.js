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
  invalidClientId: {
    status: 400,
    message: "Invalid client id"
  },
  clientHasReports: {
    status: 409,
    message: "Client cannot be deleted because it has associated reports"
  },
  reportNotFound: {
    status: 404,
    message: "Report not found"
  },
  invalidReportId: {
    status: 400,
    message: "Invalid report id"
  },
  invalidReportImageId: {
    status: 400,
    message: "Invalid report image id"
  },
  reportImagesRequired: {
    status: 400,
    message: "At least one image file is required"
  },
  reportImagesLimitExceeded: {
    status: 400,
    message: "A report can include up to 4 images"
  },
  reportImageTooLarge: {
    status: 400,
    message: "Each report image must be 5 MB or smaller"
  },
  reportInvalidImageType: {
    status: 400,
    message: "Only image files are allowed for reports"
  },
  reportImageUploadFailed: {
    status: 500,
    message: "Report image upload failed"
  },
  reportImageDeleteFailed: {
    status: 500,
    message: "Report image cleanup failed"
  },
  reportImageNotFound: {
    status: 404,
    message: "Report image not found"
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
