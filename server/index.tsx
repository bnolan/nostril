require('dotenv').config()

import * as yaml from "js-yaml"
import * as express from "express"
import * as fs from "fs"
import { migrate } from "postgres-migrations"
import * as pg from "pg"
import { createOrGetUser, createInvite, getInvite } from './filters'
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
import Invite from '../app/views/invite'
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
  id: string
  publicKey: string
}

export interface AuthenticatedRequest extends express.Request {
  user: UserRecord
  body: any
  signedCookies: any
}

async function isValid(key: string, sig: string) {
  // let sig = "--not-implemented--"
  return true
}

async function auth (req: AuthenticatedRequest, res, next) {
  let publicKey = req.body.pub
  let signature = req.body.sig

  if (!await isValid(publicKey, signature)) {
    res.status(401)
    next(new Error('Not authorized'))
    return
  }

  let id = await createOrGetUser(publicKey)

  if (id) {
    req.user = { id, publicKey }

    next()
  } else {
    res.status(401)
    next(new Error('Not authorized'))
  }
}

function page (component, payload?) {
  let prepend = ''

  if (payload?.invite) {
    prepend = `<script type="application/json" id="invite">${JSON.stringify(payload?.invite)}</script>`
  }

  return prepend + render(
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

// app.post('/api/authenticate', async (req, res) => {
//   let email = req.body.email
//   let token = req.body.token

//   let uuid = 
//   let id = 1
//   let cookie = { email, id }

//   if (!validCode(code, email)) {
//     res.json({ success: false })
//     return
//   }

//   res.cookie(COOKIE_NAME, cookie, { signed: true })
//   res.redirect('/')
// })


// todo - add auth
app.post('/api/presign', async (req, res) => {
  let { uploadUrl, viewUrl } = await presign(req.body.filename, req.body.filetype)
  res.json({ uploadUrl, viewUrl })
})

app.post('/api/invite', auth, async (req, res) => {
  // let url = `https://www.nostril.com/invite/${code}?otp=${otp}`

  let code = await createInvite(req.user.id, req.body.payload)


  res.json({ code })
})

app.get('/invite/:code', async (req, res) => {
  let invite = await getInvite(req.params.code)

  res.status(200).send(page(<Invite path='/' />, { invite }))
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
