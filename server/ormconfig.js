module.exports = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  schema: 'sync',
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  dropSchema: false,
  logging: false,
  keepConnectionAlive: true,
  retryAttempts: 10,
  retryDelay: 3000,

  // Migration Config
  migrations: ['dist/**/*/migrations/*{.ts,.js}'],
  cli: { migrationsDir: 'apps/core/src/data/migrations' },
};
