const { APPLICATION_ID } = require("../constants/Ids");

const redisFileList = (CompanyId, UserId, fileType) => {
  return `${APPLICATION_ID}:${UserId}:${fileType}`;
};

const redisDel = async (CompanyId, UserId, fileType) => {
  try {
    await redis.del(`${APPLICATION_ID}:${CompanyId}:${UserId}:${fileType}`);
  } catch (error) {
    return error;
  }
};

module.exports = { redisFileList, redisDel };
