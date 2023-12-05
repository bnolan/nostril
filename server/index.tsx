require('dotenv').config()

import * as yaml from "js-yaml"
import * as express from "express"
import * as fs from "fs"
import { migrate } from "postgres-migrations"
import * as pg from "pg"
import { createFilter, getFilter, getFilters } from './filters'
import * as bodyParser from 'body-parser'
import { render } from 'preact-render-to-string';
import * as cookieParser from 'cookie-parser'
import hash from 'stable-hash'
const crypto = require('crypto')

// Require:
var postmark = require("postmark");

// Send an email:
var postClient = new postmark.ServerClient(process.env.POSTMARK_KEY);

// Code
const nostril_AUTH_KEY = process.env.NOSTRIL_AUTH_KEY

if (!nostril_AUTH_KEY) {
  throw new Error('nostril_AUTH_KEY not set')
}

import Root from '../app/views/root'
import Filter from '../app/views/filter'
import NotFound from '../app/views/not-found'

import { keys, presign } from './s3-client'

let client

const onView = async (path) => {
  await client.query(`
    INSERT INTO pageviews 
      (path, view_date)
    VALUES
      ($1, CURRENT_DATE) 
    ON CONFLICT ON CONSTRAINT
      view_date_unique
    DO NOTHING; 
  `, [path])

  await client.query(`
    UPDATE 
      pageviews 
    SET 
      count = count + 1 
    where 
      pageviews.path = $1 and pageviews.view_date=CURRENT_DATE;
  `, [path])
}

console.log(`nostril web starting...`)

const app = express()

const COOKIE_NAME = 'nostril-auth'

app.set("view engine", "ejs")
app.use(cookieParser(process.env.COOKIE_SECRET || 'omnomnomnom', { maxAge: 60 * 60 * 24 * 365}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

bodyParser.urlencoded({
  extended: true,
})

type UserRecord = {
  id: number
  email: string
}

export interface AuthenticatedRequest extends express.Request {
  user: UserRecord
  body: any
  signedCookies: any
}

async function auth (req: AuthenticatedRequest, res, next) {
  let string = req.signedCookies[COOKIE_NAME]

  if (string && string.email) {
    req.user = string

    next()
  } else {
    res.status(401)
    next(new Error('Not authorized'))
  }
}

function page (component) {
  return render(
    <html>
      <head>
        <script src="/bundle.js" />
        <script defer data-domain="nostril.com" src="https://plausible.io/js/script.js"></script>
        <link href='/theme.css' type='text/css' rel='stylesheet' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/nostril-logo.jpg" />
        <title>nostril</title>
      </head>
      <body>
        {component}
      </body>
    </html>)
}

// Views

let routes = []

app.get(['/', ...routes], async (req, res) => {
  let results = []
  res.status(200).send(page(<Root path='/' filters={results} />))
});

app.post('/api/presign', async (req, res) => {
  let { uploadUrl, viewUrl } = await presign(req.body.filename, req.body.filetype)
  res.json({ uploadUrl, viewUrl })
})

app.use(express.static("public"))

async function main() {
  const connectionString =
    process.env.DATABASE_URL || "postgres://localhost/nostril-web"

  client = new pg.Client({
    connectionString
  })

  await client.connect()

  console.log(`nostril web connected to db.`)

  try {
    await migrate({ client }, "migrate")
    console.log(`nostril web migrated db.`)
  } finally {
    // await client.end()
  }

  const port = process.env.PORT || 3000

  app.listen(port, () => console.log(`nostril web listening on port ${port}.`))
}

main()
