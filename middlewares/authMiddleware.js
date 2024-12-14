import jwt from "jsonwebtoken"

const jwt_sec = process.env.JWT_SECRET || "Under_One_Sky" ;
console.log("jwt_sec", jwt_sec)

export const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
 export const authenticate = (req, res, next) =>{
    // const token = req.headers['authorization'];
    const token = req.header("Authorization")?.split(" ")[1]; // get token from authorization header
    console.log("Token extracted", token);
    if(!token){
      return res.status(403).json({error: "Access Denied"})
    }
    try{
      const verified = jwt.verify(token, jwt_sec);
      req.user = verified;
      next();
    }
    catch(error){
      res.status(401).json({error: 'Invalid Token'});
    }
  }