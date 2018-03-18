import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
import { Md5 } from 'ts-md5';


export let controller = {
    get: (req: Request, res: Response, next: NextFunction) => {
        let limit = 10;
        let offset = 0;
        User.findAndCountAll().then(data => {
           let page = req.query.page || 1;
           let pages = Math.ceil(data.count / limit);
           offset = limit * (page - 1);
           User.findAll({
              limit: limit,
              offset: offset,
           }).then(users => {
             res.json({
               'result': users, 
               'count': data.count,
               'page': page,
               'pages': pages
             })
           }).catch(error => {
             res.sendStatus(400);
           })

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
        let { email, password, priviledge, role } = req.body;
        User.create({email: email, password: Md5.hashStr(password), priviledge: priviledge,  role: role}).then(user => {
            res.status(201).json(user);
        }).catch(error => {
            res.sendStatus(400);
        });

    },
};
