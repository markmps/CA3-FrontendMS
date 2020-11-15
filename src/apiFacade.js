import URL, {localURL, dropletURL} from './settings';
 
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}
 
function apiFacade() {
    const setToken = (token) => {
      localStorage.setItem('jwtToken', token)
    }

    const setRole = (role) => {
      localStorage.setItem('role', role)
    }

    const getRole = () => {
      return localStorage.getItem('role')
    }

    const getToken = () => {
      return localStorage.getItem('jwtToken')
    }

    const loggedIn = () => {
      const loggedIn = getToken() != null;
      return loggedIn;
    }

    const logout = () => {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("role");
    }
    
const fetchJoke = () => {
    const options = makeOptions("GET",true); //True add's the token
return fetch(localURL + "/api/jokes/", options).then(handleHttpErrors)}

const login = (user, password) => {
    const options = makeOptions("POST", true,{username: user, password: password});
return fetch(localURL + "/api/login", options)
  .then(handleHttpErrors)
  .then(res => {
    //atob = ASCII to binary, den decoder base64 token. 
    const decodedToken = JSON.parse(atob(res.token.split('.')[1]));
    const role = decodedToken.roles;
    setToken(res.token); 
    setRole(role);
  })}

const fetchData = () => {const options = makeOptions("GET",true); //True add's the token
return fetch(localURL + "/api/info/" + getRole(), options).then(handleHttpErrors)}

const makeOptions= (method,addToken,body) =>{
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }
 return {
     makeOptions,
     setToken,
     setRole,
     getRole,
     getToken,
     loggedIn,
     login,
     logout,
     fetchData,
     fetchJoke 
 }
}
const facade = apiFacade();
export default facade;
