// utils/logger.js
// Placeholder logger — will be replaced with Winston in Week 6.
// Every test calls logger.info/warn/error so the upgrade is a one-file change.
module.exports = {
    info: (msg) => console.log(`[INFO]  ${msg}`),
    warn: (msg) => console.warn(`[WARN]  ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`),
};
