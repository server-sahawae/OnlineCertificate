const {
  FILE_TOO_BIG,
  DATA_NOT_FOUND,
  NOT_IMAGE,
  CERTIFICATE_UNAVAILABLE,
} = require("../constants/ErrorKeys");

module.exports = function ErrorHandler(err, req, res, next) {
  switch (err.name) {
    case FILE_TOO_BIG:
      data = {
        code: 503,
        name: FILE_TOO_BIG,
        message: "Your file size is too big, max file size allowed is 16 MB",
      };
      break;
    case NOT_IMAGE:
      data = {
        code: 503,
        name: NOT_IMAGE,
        message: "Only allowed image file(s)!",
      };
      break;
    case DATA_NOT_FOUND:
      data = {
        code: 404,
        name: DATA_NOT_FOUND,
        message: "Data not Found!",
      };
      break;
    case CERTIFICATE_UNAVAILABLE:
      data = {
        code: 404,
        name: CERTIFICATE_UNAVAILABLE,
        message: "Your certificate is not yet published",
      };
      break;

    default:
      data = {
        code: err?.response?.status || 500,
        name: err?.message || "ISE",
        message: Array.isArray(err?.errors)
          ? err.errors?.map((el) => el.message)
          : err?.response?.data?.message || "INTERNAL SERVER ERROR",
      };
      break;
  }
  res.status(data.code).json({ message: data.message });
};
