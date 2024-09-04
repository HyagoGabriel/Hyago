
const express = require('express');

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    const apiRoutes = require('./routes/apiRoutes');
    this.express.use('/project-senai/api/v1/', apiRoutes);

    const teacherRoutes = require('./routes/teacherRoutes');
    this.express.use('/project-senai/api/v1/', teacherRoutes);

    this.express.get('/health/', (req, res) => {
      res.send({ status: 'OK' });
    });
  }
}

module.exports = AppController;
