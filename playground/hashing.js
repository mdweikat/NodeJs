const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var passwordHashed = SHA256('Asdasd123').toString();
console.log(passwordHashed);

var data = {
  email: 'mdweikat@takwinco.com',
  password: passwordHashed,
  id: 5
}

var token = jwt.sign(data, 'secret');
console.log('Token: ', token);

var decoded = jwt.verify(token, 'secret');
console.log('Decoded: ', decoded);
