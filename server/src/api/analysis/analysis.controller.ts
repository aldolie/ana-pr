import {Request, Response, NextFunction} from 'express';
import {Analysis} from '../../models/Analysis';
import {Priviledges} from '../../util/Priviledge';
import { Subscription } from '../../models/Subscription';
import { SubscriptionStatuses } from '../../util/SubscriptionStatus';
import { Roles } from '../../util/Role';
import io from "../../../index";

function getSubscription(userId: number) {
    return Subscription.scope('priviledge').findOne({
        where: {
          status: SubscriptionStatuses.getApprovedStatus(),
          expiredAt: { $gt: new Date() },
          userId: userId,
          },
            order: [
            ['priviledge', 'DESC']
        ]
    });
}

function getPriviledgeValue(sub: any,  user: { role: number }) {
    if (Roles.isAdmin(user.role)) {
        return Priviledges.getPrivildge(3);
    } else if (sub == null) {
        return Priviledges.getPrivildge(0);
    } else  {
        return Priviledges.getPrivildge(sub.priviledge);
    }
}


export let controller = {

    get: (req: Request, res: Response, next: NextFunction) => {
        let limit = 10;
        let page = req.query.page || 1;
        let offset = limit * (page - 1);
        getSubscription(req.user.id).then(sub => {
            let priviledges: Array<number> = getPriviledgeValue(sub, req.user);
            Analysis.findAndCount({
                where: {
                    priviledge: {
                        $in: priviledges
                    }
                },
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'DESC']
                ]
            }).then(data => {
                let pages = Math.ceil(data.count / limit);
                res.json({
                        'result': data.rows,
                        'count': data.count,
                        'page': page,
                        'pages': pages
                    });
            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    message: 'Unknown error has occured'
                });
            });
        }, error => {
            console.log(error);
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
    getById: (req: Request, res: Response, next: NextFunction) => {
        getSubscription(req.user.id).then(sub => {
            let id = req.params.id;
            let priviledges: Array<number> = getPriviledgeValue(sub, req.user);
            Analysis.findOne({
                where: {
                    id: id,
                    priviledge: {$in: priviledges}
                }
            }).then(analysis => {
                if (analysis == null) {
                    res.status(404).json({
                        message: 'Analysis Not Found'
                    });
                } else {
                    res.json(analysis);
                }
            }).catch(error => {
                res.status(500).json({
                    message: 'Unknown error has occured'
                });
            });
        }, error => {
            console.log(error);
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        let {name, value, priviledge} = req.body;
        Analysis.create({name: name, priviledge: priviledge, value: value}).then(analysis => {
            io.to('broadcast').emit('message', {id: analysis.id, priviledge: analysis.priviledge});
            res.status(201).json(analysis);
        });

    },
    put: (req: Request, res: Response, next: NextFunction) => {
        getSubscription(req.user.id).then(sub => {
            let {name, value, priviledge} = req.body;
            let id = req.params.id;
            let priviledges: Array<number> = getPriviledgeValue(sub, req.user);
            Analysis.findOne({
                where: {
                    id: id,
                    priviledge: {$in: priviledges}
                }
            }).then(analysis => {
                if (analysis == null) {
                    res.status(404).json({
                        message: 'Analysis not found'
                    });
                } else {
                    analysis.name = name;
                    analysis.value = value;
                    analysis.priviledge = priviledge;
                    analysis.save().then(savedAnalysis => {
                        res.json(analysis);
                    }).catch(error => {
                        res.status(400).json({
                            message: 'Failed to save analysis'
                        });
                    });
                }
            }).catch(error => {
                res.status(500).json({
                    message: 'Unknown error has occured'
                });
            });
        }, error => {
            console.log(error);
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
    delete: (req: Request, res: Response, next: NextFunction) => {
        getSubscription(req.user.id).then(sub => {
            let id = req.params.id;
            let priviledges: Array<number> = getPriviledgeValue(sub, req.user);
            Analysis.findOne({
                where: {
                    id: id,
                    priviledge: {$in: priviledges}
                }
            }).then(analysis => {
                if (analysis == null) {
                    res.status(404).json({
                        message: 'Analysis not found'
                    });
                } else {
                    analysis.destroy();
                    res.sendStatus(204);
                }
            }).catch(error => {
                res.status(500).json({
                    message: 'Unknown error has occured'
                });
            });
        }, error => {
            console.log(error);
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
};
