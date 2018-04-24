import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/User';
import {Md5} from 'ts-md5';
import * as jwt from 'jsonwebtoken';


export let controller = {
    login: (req: Request, res: Response, next: NextFunction) => {
        let {email, password} = req.body;
        let chiperPassword: any = Md5.hashStr(password);

        User.findOne({
            where: {
                email: email,
                password: chiperPassword
            }
        }).then(user => {
            if (user != null) {
                let expiresIn = 60 * 60;
                let data = {
                    id: user.id,
                    email: user.email,
                    priviledge: user.priviledge,
                    role: user.role
                };
                let token = jwt.sign(data, 'secret', {expiresIn: expiresIn});
                res.json({
                    token: token,
                    expiresIn: expiresIn,
                });
            } else {
                res.sendStatus(400);
            }
        }).catch(error => {
            console.log(error);
            res.sendStatus(400);
        })

    },
};
