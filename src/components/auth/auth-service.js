import axios from 'axios';
 
class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5001/api',
      withCredentials: true
    });
  }

  signup = (email, password) => {
    return this.service.post('/signup', { email, password }).then(response => response.data);
  };

  loggedin = () => {
    return this.service.get('/loggedin').then(response => response.data);
  };

  login = (email, password) => {
    return this.service.post('/login', { email, password }).then(response => response.data);
  };
   
  logout = () => {
    return this.service.get('/logout', {}).then(response => response.data);
  };
}
 
// class AuthService is used to organize and group the methods.
// To get an object containing all the methods we just need to
// instantiate the new AuthService object.
const authService = new AuthService();
 
export default authService;