import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

export default  {
    validatetoken: (req, res, next) => {
        const token = req.headers['x-access-token']
        if(token) {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if(err) {
                    return res.status(402).send({
                        message: 'Could not authenticate token', error: err
                    })
                }
                req.decoded = decoded;
                next();
            })
        } else {
            return res.status(401).send({
                message: 'No Authentication Provided', success: false
            })
        }
    }
}
