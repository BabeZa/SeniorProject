module.exports = function(req, res, next) {
    const { username, email, name, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
    //   console.log(!email.length);
      if (![username, email, name, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
      // เอาไว้เช็ค email
      // else if (!validEmail(email)) {
      //   return res.json("Invalid Email");
      // }
    }
  
    next();
  };