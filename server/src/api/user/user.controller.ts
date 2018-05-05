import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/User';
import {Md5} from 'ts-md5';

export let controller = {
    get: (req: Request, res: Response, next: NextFunction) => {
        let limit = 10;
        let offset = 0;
        let page = req.query.page || 1;
        offset = limit * (page - 1);
        let email  = req.query.email || '';
        User.scope('full').findAndCount({
            where:{
                "email": { $like: "%" + email + "%" }
            },
            limit: limit,
            offset: offset,
        }).then(data => {
            let pages = Math.ceil(data.count / limit);
            
            res.json({
                'result': data.rows,
                'count': data.count,
                'page': page,
                'pages': pages
            });

        }).catch(error => {
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
    getById: (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        User.scope('full').findById(id).then(user => {
            if (user == null) {
            res.status(404).json({
                message: 'User Not Found'
            });
            } else {
                res.json(user);
            }
        }).catch(error => {
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        let {email, password, role} = req.body;
        User.scope('full').create({
            email: email,
            password: Md5.hashStr(password),
            role: role,
            active: false,
            name: '',
            dateOfBirth: null,
            country: '',
            region: '',
            postalCode: '',
            phoneNumber: ''
        }).then(user => {
            res.status(201).json(user);
        }).catch(error => {
            res.status(400).json({
                message: 'Failed to save user'
            });
        });

    },
    put: (req: Request, res: Response, next: NextFunction) => {
        let {role, active, name, dateOfBirth, country, region, postalCode, phoneNumber} = req.body;
        let id = req.params.id;
        User.scope('full').findById(id).then(user => {
            if (user == null) {
                res.status(404).json({
                    message: 'User not found'
                });
            } else {
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
                    res.status(400).json({
                        message: 'Failed to save user'
                    });
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    }
};
