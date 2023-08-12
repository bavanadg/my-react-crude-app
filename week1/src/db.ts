import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'database-1.cnwdmgl8rph0.ap-southeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'AWSMaster',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

export default pool;
