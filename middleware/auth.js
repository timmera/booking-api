import { auth } from 'express-oauth2-jwt-bearer';

const authMiddleware = auth({
  audience: 'https://booking-api',
  issuerBaseURL: `https://dev-gihojkq66t8o755n.us.auth0.com/`,
});

export default authMiddleware;
