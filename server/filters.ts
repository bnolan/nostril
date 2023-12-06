import { Pool } from 'pg'
import { migrate } from "postgres-migrations"
const { Configuration, OpenAIApi } = require("openai");
const crypto = require('crypto');

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

export interface InviteRecord {
  payload: string
}

export const createOrGetUser = async (publicKey: string) => {
  await pool.query(`
    insert into users(public_key) values ($1) on conflict (public_key) do nothing;
  `, [publicKey])

  let result = await pool.query(`
    select id from users where public_key = $1;
  `, [publicKey])

  return result.rows[0].id as string;
}

export const getFilters = async () => {
  let result = await pool.query(`
    select ${fields} from filters;
  `)
  return result.rows as Array<FilterRecord>
}

export const getInvite = async (code: string) => {
  let result = await pool.query(`
    select payload from invites where code=$1 and expires_at > now();
  `, [code])

  return result.rows[0] as InviteRecord
}

export const createInvite = async (userId: string, payload: string) => {
  let length = 10

  let code = crypto.randomBytes(256)
        .toString('hex')
        .slice(0, length);
  
  await pool.query(`
    INSERT INTO
      invites (sender_id, code, payload, created_at, expires_at)
    VALUES
      ($1, $2, $3, now(), now() + interval '12 hours');
  `, [userId, code, payload])

  console.log(code)

  return code
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



