import config from '../config/index.js';

export default function serviceTokenAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing service token' });
  }
  const token = auth.slice(7);
  if (token !== config.serviceToken) {
    return res.status(403).json({ error: 'Forbidden - invalid service token' });
  }
  return next();
}
