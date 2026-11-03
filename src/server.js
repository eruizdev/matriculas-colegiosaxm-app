const app = require('./app');
const Env = require('./config/env');
const AdminSeeder = require('./seeders/admin.seeder');

process.on('unhandledRejection', error => {
  console.error('Promesa rechazada sin manejar:', error);
});

process.on('uncaughtException', error => {
  console.error('Error no controlado, se detiene el servidor:', error);
  process.exit(1);
});

AdminSeeder.ejecutar()
  .then(() => {
    app.listen(Env.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${Env.PORT} (${Env.NODE_ENV})`);
    });
  })
  .catch(error => {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  });
