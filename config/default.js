module.exports = {
	port: 8000,
	url: 'mongodb://localhost:27017/elm-test',
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365*24*60*60*1000,
    },
  }
}
