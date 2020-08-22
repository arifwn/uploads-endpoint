import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next) => {

    console.log(req.method, req.path, resp.statusCode, req.get('x-forwarded-for') || req.connection.remoteAddress, req.get('User-Agent'))
    next()
}

export default loggerMiddleware