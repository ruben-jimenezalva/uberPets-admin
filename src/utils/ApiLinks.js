var urlLocal = 'http://localhost:8081';
//var url = 'https://shared-server-taller2-2c-2018.herokuapp.com';
var url = urlLocal;
module.exports = {
     Login : url+'/api/user/login',
     Users : url+'/api/users',
     Drivers : url+'/api/drivers',
     Travels : url+'/api/travels',
     Documents: url+'/api/fileDocuments',
};
