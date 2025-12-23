import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export const protect = async (req, res, next) => {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        const token = header.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const admin = await Admin.findById(decoded.id).select('-password')
        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' })
        }

        req.admin = admin
        next()
    } catch {
        res.status(401).json({ message: 'Invalid token' })
    }
}
