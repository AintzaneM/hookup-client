import axios from 'axios';
 
class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
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

  handleUpload = file => {
    return this.service
      .post("/upload", file)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };

  
}
 
// class AuthService is used to organize and group the methods.
// To get an object containing all the methods we just need to
// instantiate the new AuthService object.
const authService = new AuthService();
 
export default authService;