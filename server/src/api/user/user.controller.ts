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
           User.scope('full').findAll({
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
        User.scope('full').findById(id).then(user => {
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
        User.scope('full').create({
          email: email, 
          password: Md5.hashStr(password), 
          priviledge: priviledge,  
          role: role, 
          active: false,
          name:'',
          dateOfBirth: null,
          country:'',
          region:'',
          postalCode:'',
          phoneNumber:''
        }).then(user => {
            res.status(201).json(user);
        }).catch(error => {
            res.sendStatus(400);
        });

    },
    put: (req: Request, res: Response, next: NextFunction) => {
      let { priviledge, role, active, name, dateOfBirth, country, region, postalCode, phoneNumber } = req.body;
      let id = req.params.id;
        User.scope('full').findById(id).then(user => {
          if (user == null) {
             res.sendStatus(404);
          } else {
             user.priviledge = priviledge;
             user.role = role;
             user.active = active;
             user.name = name;
             user.dateOfBirth = dateOfBirth;
             user.country = country;
             user.region = region;
             user.postalCode = postalCode;
             user.phoneNumber = phoneNumber;
             console.log(user);
             user.save().then(savedUser => {
               res.json(savedUser);
             }).catch(error => {
               res.sendStatus(400);
             })
          }
        }).catch(error => {
            res.sendStatus(400);
        });
    }
};
