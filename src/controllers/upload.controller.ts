import * as express from 'express'
import { Request, Response } from 'express'
const path = require('path');

export interface MulterFile {
    name: string;
    key: string;
    path: string;
    mimetype: string;
    originalname: string;
    size: number;
    mv: (path: string) => Promise<Error>;
}

class UploadController {
    public path = '/api/v1/upload'
    public router = express.Router()

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.index);
        this.router.post(this.path, this.create);
        if (process.env.NODE_ENV !== 'production') {
            this.router.get(`${this.path}/testpage`, this.testPage);
        }
    }

    isAuthenticated = (req: Request, res: Response) => {
        let key = req.query['_key'] ? req.query['_key'] : null;
        if (!key) {
            key = req.body._key ? req.body._key : null;
        }
        key = req.headers['authorization'] ? req.headers['authorization'].substr('Bearer '.length) : key;

        if (key === process.env.UPLOAD_KEY) {
            return true;
        }

        res.status(403).send({result: null, success: false, errors: [{code: 403, message: "Unauthorized"}]});
        return false;
    }

    getUploadDirs = () => {
        const uploadDirs = process.env.UPLOAD_DIRS ? JSON.parse(process.env.UPLOAD_DIRS) : {default: path.join(process.cwd(), 'uploads')};
        return uploadDirs;
    }

    getUploadDirNames = () => {
        const uploadDirs = this.getUploadDirs();
        const names = [];
        for (const [key, value] of Object.entries(uploadDirs)) {
            names.push(key);
        }
        return names;
    }

    isAllowedFileType = (fileName: string) => {
        const allowedTypes = process.env.ACCEPTED_FILE_TYPES ? process.env.ACCEPTED_FILE_TYPES.split(',') : [] as string[];
        if (allowedTypes.length === 0) return true;

        if (allowedTypes.includes(path.extname(fileName))) {
            return true;
        }
        return false;
    }

    index = (req: Request, res: Response) => {
        res.send({status: 'ready'});
    }

    create = async (req: Request & { files: MulterFile[] }, res: Response) => {
        if (!this.isAuthenticated(req, res)) return;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({success: false, errors: [{code: 400, message: "No file uploaded"}]});
        }

        if (!req.files['file']) {
            return res.status(400).send({success: false, errors: [{code: 400, message: "No file uploaded"}]});
        }

        const uploadedFile = req.files['file'];
        if (!this.isAllowedFileType(uploadedFile.name)) {
            return res.status(400).send({success: false, errors: [{code: 400, message: "File type is disallowed"}]});
        }

        const uploadDirs = this.getUploadDirs();
        if (!uploadDirs[req.body.target]) {
            return res.status(400).send({success: false, errors: [{code: 400, message: "Base path not found"}]});
        }
        let newFileName = new Date().getTime() + '-' + path.extname(uploadedFile.name);
        let targetPath = path.join(uploadDirs[req.body.target], newFileName);
        const err = await uploadedFile.mv(targetPath);
        if (err) {
            return res.send({success: false, errors: [{code: 400, message: `${err}`}]});
        }

        return res.send({success: true, fileName: newFileName});
    }

    testPage = (req: Request, res: Response) => {
        const rootPath = process.env.ROOT_PATH ? process.env.ROOT_PATH : '/';
        const apiEndpoint = rootPath === '/' ? this.path : `${rootPath}${this.path}`;
        const uploadDirNames = this.getUploadDirNames();

        res.render('upload/test-page', {
            rootPath: rootPath,
            apiEndpoint: apiEndpoint,
            UPLOAD_KEY: process.env.UPLOAD_KEY ? process.env.UPLOAD_KEY : '/',
            uploadDirNames: uploadDirNames,
        })
    }
}

export default UploadController