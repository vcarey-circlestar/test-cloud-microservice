// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from 'express';
import {pinoHttp, logger} from './utils/logging.js';

const app = express();

// Use request-based logger for log correlation
app.use(pinoHttp);

// Example endpoint
app.get('/', async (req, res) => {
  // Use basic logger without HTTP request info
  logger.info({logField: 'custom-entry', arbitraryField: 'custom-entry'}); // Example of structured logging
  // Use request-based logger with log correlation
  req.log.info('Child logger with trace Id.'); // https://cloud.google.com/run/docs/logging#correlate-logs
  res.send('Hello World!');
});

// Another endpoint with a parameter
app.get('/greet/:name', async (req, res) => {

  const name = req.params.name; // Access the 'name' parameter from the URL
  // Use basic logger without HTTP request info
  logger.info({logField: 'custom-entry', arbitraryField: 'custom-entry'}); 
  req.log.info(`Greeting ${name}`);
  res.send(`Hello, ${name}!`);
});

// Another endpoint with a query parameter
app.get('/query', async (req, res) => {
  const message = req.query.message; // Access the 'message' query parameter
  // Use basic logger without HTTP request info
  logger.info({logField: 'custom-entry', arbitraryField: 'custom-entry'}); 
  req.log.info(`Received message: ${message}`);
  res.send(`You sent: ${message}`);
});


export default app;
