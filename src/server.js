const app = require('./app');
const Env = require('./config/env');
const AdminSeeder = require('./seeders/admin.seeder');

AdminSeeder.ejecutar().then(() => {
  app.listen(Env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${Env.PORT}`);
  });
});
