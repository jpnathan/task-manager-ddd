import TokenGenerator from "../../../domain/entity/auth/tokenGenerator";

export = (req, res, next) => {
  const token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(401).send("A token is required for authentication");
    }

    try {
        const tokenGenerator = new TokenGenerator(process.env.TOKEN_KEY);
        const decoded = tokenGenerator.verify(token);

        req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};