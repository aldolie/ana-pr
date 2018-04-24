import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/User';
import  *  as UUID from 'uuid';


export let controller = {
    activateUser: (req: Request, res: Response, next: NextFunction) => {
        let activationToken = req.query.token || 'unknown token';
        User.findOne({
            where: {
                activationToken: activationToken
            }
        }).then(user => {
            if (user != null) {
                user.active = true;
                user.save();
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }).catch(error => {
            res.sendStatus(400);
        });
    }
};
