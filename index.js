/**
 * INITALIZATION OF PACKAGES
 */

const express = require('express')
const bcrypt = require('bcrypt')
const mysql = require('mysql');
const cors = require('cors')
const logger = require('morgan')
const bodyparser = require('body-parser');
require('dotenv').config();

/**
 * IMPORTING MODULES
 */

const logIn = require('./modules/logIn')
const admin = require('./modules/admin')
const mstatus = require('./modules/mstatus')
const request = require('./modules/request')

/**
 * CONFIGURATION OF MODULES
 */

const app = express()
app.use(logger('dev'))
app.use(express.json())

/**
 * DEFINING API PORT
 */

app.listen(process.env.API_PORT, () => console.log(`Express Server is running on ${process.env.API_PORT} port`))

/**
 * API DEVELOPMENT
 */

/**
 * LOGIN API
 */

app.post('/login', async function (req, res) {
    const result = await logIn.init(req.body, req.process)
    res.json(result)
})

/**
 * ADMIN
 */
app.post('/admin', async function (req, res) {
    const result = await admin.init(req.body, req.process)
    res.json(result)
})
/**
 * MATERIAL STATUS
 */
app.post('/mstatus', async function (req, res) {
    const result = await mstatus.init(req.body, req.process)
    res.json(result)
})
/**
 * REQUEST
 */
app.post('/request', async function (req, res) {
    const result = await request.init(req.body, req.process)
    res.json(result)
})

// 
// 
// 
// 