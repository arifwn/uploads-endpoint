import * as express from 'express'
import { Request, Response } from 'express'


class ReadinessController {
    public path = '/check/readiness'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.index)
    }

    index = (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'text/plain');
        res.send("ready")
    }
}

export default ReadinessController