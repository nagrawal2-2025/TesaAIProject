import { Request, Response, NextFunction } from 'express';

// Nur Admins dürfen weiter
export function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Keine Berechtigung: Admin erforderlich' });
  }

  next();
}

// Beispiel für später, falls du feiner unterscheiden willst:
// Editor darf erstellen/ändern, Admin darf alles, Viewer nur lesen
export function editorOrAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }

  if (req.user.role === 'admin' || req.user.role === 'editor') {
    return next();
  }

  return res.status(403).json({ error: 'Keine Berechtigung: Editor oder Admin erforderlich' });
}
