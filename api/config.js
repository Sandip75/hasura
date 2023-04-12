const env = process.env.NODE_ENV;

const plug = (obj) => obj[env];

module.exports = {
  env,
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  backend: {
    url: plug({
      dev: 'http://localhost:3000'
    })
  },
  hasura: {
    url: 'http://demo-hasura:8080/v1alpha1/graphql', 
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    jwtSecret: JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET)
  }
};