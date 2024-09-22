import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const routes = require('./server/routes/index.route');
  const commonEngine = new CommonEngine();

  //Configure mongoDB for the Application

  const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sarkynetengineering:wisdomofgod@cluster0.vmwsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const uri = "mongodb://localhost:27017"
// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  mongoose.Promise = global.Promise;
  mongoose.set("strictQuery", false);
  mongoose.connect(uri, {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("Database Connected Successfully...!");
  },
  (error:any)=>{
    console.log("Database Connection Error:" + error);
  });
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function connectDB() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }

// }
// connectDB().catch(console.dir);

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }))

  // Example Express Rest API endpoints
  server.use('/api', routes);
  
  server.get('/api/**', (req, res) => { 
    res.status(404).send('Data requests are not Supported');
  });

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

export default AppServerModule;