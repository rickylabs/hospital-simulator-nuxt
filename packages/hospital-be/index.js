/*
  Custom implementation have been added to packages/hospital/lib/src/helpers/formatter.ts
  to allow usage of Nuxt server APIs ("/api/hospital/patients" and "/api/hospital/drugs") in production deployment.
  Below implementation is untouched and is only used for local development using .env variable "USE_LOCAL_API" in hospital-fe.
 */
const express = require('express');
const _ = require('lodash');
const app = express();
const port = 7200;

const MIN = 0;
const MAX = 3;
const status = ['F', 'X', 'T', 'D', 'H'];
const treatments = ['', 'As', 'An', 'I', 'P', 'I,An', 'P,As'];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/patients', (req, res) => res.json(_.flatMap(status, status => Array(_.random(MIN, MAX)).fill(status)).join(',')));
app.get('/drugs', (req, res) => res.json(treatments[_.random(0, treatments.length - 1)]));

app.listen(port, () => console.log(`Hospital Backend listening on port ${port}!`));
