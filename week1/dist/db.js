"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'database-1.cnwdmgl8rph0.ap-southeast-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'AWSMaster',
    port: 5432,
});
exports.default = pool;
