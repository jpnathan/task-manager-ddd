import { NextFunction, Request, Response } from "express";

const publicRoutes: object[] = [];
  
module.exports = (req: Request, res: Response, next: NextFunction) => {
    const opts = {
      requestProperty: 'user',
      secret: process.env.JWT_SECRET,
      algorithms: ['HS256'],
    };
  
    if (req.headers['x-auth-version'] === 'v2') {
      logger.info('Client is using auth0 token');
  
      return jwt({
        ...opts,
        secret: jwskRsa.expressJwtSecret({
          aud: AUTH0_TOKEN_NS_BASE,
          iss: AUTH0_BASE_URL,
        }),
        algorithms: ['RS256'],
      }).unless({ path: publicRoutes })(req, res, next);
    }
  
    return jwt(opts).unless({ path: publicRoutes })(req, res, next);
  };
  