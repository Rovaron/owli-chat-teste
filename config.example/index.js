module.exports = {
  SECRET: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'seu-segredo',
  CONNECTION_STRING: "string mongo driver",
  SALT_ROUNDS: 10
}