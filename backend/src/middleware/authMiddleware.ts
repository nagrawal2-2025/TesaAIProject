import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Typ für das, was wir im Token speichern
interface JwtPayload {
  userId: string;
  role: string;
}

// Wir erweitern Request um user-Info, damit nachfolgende Handler drauf zugreifen können
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];

    // Erwartetes Format: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Kein Token übergeben' });
    }

    const token = authHeader.substring('Bearer '.length);

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET fehlt in den Environment Variables');
      return res.status(500).json({ error: 'Server-Konfiguration unvollständig' });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Nutzerinfo am Request-Objekt anhängen
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error('Auth-Fehler:', err);
    return res.status(401).json({ error: 'Ungültiger oder abgelaufener Token' });
  }
}
