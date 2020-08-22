import * as express from 'express'
import { Request, Response } from 'express'


class UploadController {
    public path = '/api/v1/upload'
    public router = express.Router()

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.index);
        this.router.post(this.path, this.create);
    }

    isAuthenticated = (req: Request, res: Response) => {
        let key = req.query['_key'] ? req.query['_key'] : null;
        key = req.headers['authorization'] ? req.headers['authorization'].substr('Bearer '.length) : key;

        if (key === process.env.API_KEY) {
            return true;
        }

        res.status(403).send({result: null, success: false, errors: [{code: 403, message: "Unauthorized"}]});
        return false;
    }

    index = (req: Request, res: Response) => {
        res.send({status: 'ready'});
    }

    create = async (req: Request, res: Response) => {
        if (!this.isAuthenticated(req, res)) return;

        res.send({success: false, errors: [{code: 400, message: "Not implemented yet"}]});
    }
}

export default UploadController