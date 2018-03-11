import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
import { Md5 } from 'ts-md5';


export let controller = {
    get: (req: Request, res: Response, next: NextFunction) => {
        User.findAll().then(users => {
            res.json({ contents: users});
        }).catch(error => {
            res.sendStatus(400);
        });
    },
    getById: (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        User.findById(id).then(user => {
          if (user == null) {
             res.sendStatus(404);
          } else {
             res.json(user);
          }
        }).catch(error => {
            res.sendStatus(400);
        });
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body;
        User.create({email: email, password: Md5.hashStr(password)}).then(user => {
            res.status(201).json(user);
        }).catch(error => {
            res.sendStatus(400);
        });

    },
};
