import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://167.99.70.72:55011';

class UserService {
  isPublic() {
    return axios.get(API_URL + '/validrole/guest');
  }

  isStudentC() {
    return axios.get(API_URL + '/validrole/student', { headers: authHeader() });
  }

  isProfessor() {
    return axios.get(API_URL + '/validrole/professor', { headers: authHeader() });
  }

  isStaff() {
    return axios.get(API_URL + '/validrole/staff', { headers: authHeader() });
  }

  isAdmin() {
    // console.log("[user.service.js] getAdminContent : done :"+ API_URL);

    return axios.get(API_URL + '/validrole/admin', { headers: authHeader() });
  }

  isProfessoOrAdmin() {
    // console.log("[user.service.js] ProfessoOrAdmin : done :"+ API_URL);

    return axios.get(API_URL + '/validrole/professororadmin', { headers: authHeader() });
  }


  isProfessorLeader() {
    // console.log("[user.service.js] ProfessoOrAdmin : done :"+ API_URL);

    return axios.get(API_URL + '/validrole/professorleader', { headers: authHeader() });
  }

  
}

export default new UserService();