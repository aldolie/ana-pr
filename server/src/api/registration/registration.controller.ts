import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
import { Roles } from '../../util/Role';
import { Md5 } from 'ts-md5';
import  *  as UUID from 'uuid';


export let controller = {
    post: (req: Request, res: Response, next: NextFunction) => {
        let priviledge = 0;
        let role = Roles.getUserRole();
        let { email, password } = req.body;
        User.findOne({
          where: {
            email: email
          }
        }).then(user => {
          if (user == null) {
            User.create({email: email, password: Md5.hashStr(password), priviledge: priviledge, role: role, activationToken: UUID()}).then(user => {
                res.sendStatus(201);
            }).catch(error => {
                console.log(error);
                res.sendStatus(400);
            });
          } else {
            res.status(409).json({
              errorCode: 409,
              errorMessage: "email already registered"
            });
          }
        }).catch(error => {
          res.sendStatus(400);
        });
    }
};
