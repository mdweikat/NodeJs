var env = process.env.NODE_ENV || 'development';

if (env === 'test') {
  console.log('test test');
  process.env.PORT = 3001;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
