// -------------------- Custom Configurations --------------------
const configs = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
};

module.exports = configs;