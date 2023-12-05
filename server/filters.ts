import { Pool } from 'pg'
import { migrate } from "postgres-migrations"
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const connectionString = process.env.DATABASE_URL || "postgres://localhost/nostril-web"

async function connect (client) {
  await migrate({ client }, "migrate")
  console.log(`nostril web migrated db.`)
}

const pool = new Pool({ connectionString });
connect(pool)

type Wallet = string
type UUID = string

const fields = `*`

export interface FilterRecord {
  id: UUID
  user: Wallet
  name: string
  content: object
}

export const getFilters = async () => {
  let result = await pool.query(`
    select ${fields} from filters;
  `)
  return result.rows as Array<FilterRecord>
}

export const getFilter = async (id: UUID) => {
  let result = await pool.query(`
    select ${fields} from filter where id=$1;
  `, [id])
  return result.rows[0] as FilterRecord
}

export const createFilter = (userId: number, name: string) => {
  return pool.query(`
    INSERT INTO
      filters (user_id, name, updated_at, created_at)
    VALUES
      ($1, $2, now(), now());
  `, [userId, name])
}

export const updateFilter = (user: Wallet, id: UUID, filter: FilterRecord) => {
  return pool.query(`
    UPDATE
      filters (user, name, content, updated_at, created_at)
    SET
      name=$3, content=$4, updated_at=now()
    WHERE
      user=$1 and id=$2;
  `, [user, id, filter.name, filter.content])
}



