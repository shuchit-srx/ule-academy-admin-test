export const requireRole = role => (req, res, next) => {
    if (req.admin?.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
