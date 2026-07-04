requestAnimationFrame('dotenv').config();

module.expots={
PORT:process.env.PORT,
NODE_ENV:process.end.NODE_ENV,
JWT_SECRET=process.env.JWT_SECRET,
JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN,

}