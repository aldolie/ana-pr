import { Request, Response, NextFunction } from 'express';
import { Subscription } from '../../models/Subscription';
import { SubscriptionStatuses } from '../../util/SubscriptionStatus';
import paging from "../../util/paging";
import {User} from "../../models/User";
import {Priviledges} from "../../util/Priviledge";
import {__sequelize, upload} from "../../index";
import {Transaction} from "sequelize";

function querySubscription(req: Request, res: Response, condition: any = {}, limit: number = 10, offset: number = 0) {
    Subscription.findAndCountAll(condition).then(data => {
        let pages = paging.get(req, data.count, limit, offset);
        let limitCondition = {
            limit: pages.limit,
            offset: pages.offset
        };
        let others = {
            include: [User],
            order: [
                ['status', 'ASC']
            ]
        };
        condition = { ...condition, ...limitCondition, ...others };
        Subscription.findAll(condition).then(subscriptions => {
            res.json({
                'result': subscriptions,
                'count': data.count,
                'page': pages.page,
                'pages': pages.pages
            });
        }).catch(error => {
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Unknown error has occured'
        });
    });
}

export let controller = {
    get: (req: Request, res: Response, next: NextFunction) => {
        querySubscription(req, res);
    },
    getByStatus: (req: Request, res: Response, next: NextFunction) => {
        let status = req.params.status || -1;
        let condition = {
            where: {
                status: status
            }
        };
        if (status == -1) {
            delete condition.where.status;
        }
        querySubscription(req, res, condition);
    },
    getOwnByStatus: (req: Request, res: Response, next: NextFunction) => {
        let status = req.params.status || -1;
        let condition = {
            where: {
                userId: req.user.id,
                status: status
            }
        };
        if (status == -1) {
            delete condition.where.status;
        }
        querySubscription(req, res, condition);
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        console.log('receive create subs');
        let fileUpload = upload.single('image');
        fileUpload(req, res, (err) => {
            let { bankName, accountName, accountNumber, priviledge } = req.body;
            if (!req.file) {
                res.status(400).json({
                    message: 'File is required'
                });
            } else {
                Subscription.create({
                    userId: req.user.id,
                    bankName: bankName,
                    accountName: accountName,
                    accountNumber: accountNumber,
                    paymentProof: req.file.filename,
                    priviledge: priviledge,
                    status: SubscriptionStatuses.getAppliedStatus()
                }).then(subscription => {
                    res.status(201).json(subscription);
                }).catch(error => {
                    res.status(404).json({
                        message: 'Failed to save subscription'
                    });
                });
            }
        });
    },
    cancel: (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        Subscription.findOne({
            where: {
                id: id,
                userId: req.user.id,
                status: SubscriptionStatuses.getAppliedStatus()
            }
        }).then(subscription => {
            if (subscription == null) {
                res.status(404).json({
                    message: 'Subscription not found'
                });
            } else {
                subscription.status = SubscriptionStatuses.getCancelledStatus();
                subscription.save().then(savedSubscription => {
                    res.json(savedSubscription);
                }).catch(error => {
                    res.status(400).json({
                        message: 'Failed to save subscription'
                    });
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
    setStatus: (req: Request, res: Response, next: NextFunction) => {
        let { status } = req.body;
        let id = req.params.id;
        return __sequelize.transaction().then((t: Transaction) => {
            return Subscription.findById(id, { transaction: t }).then(subscription => {
                if (subscription == null) {
                    res.status(404).json({
                        message: 'Subscription not found'
                    });
                    return t.rollback();
                } else {
                    subscription.status = status;
                    subscription.respondedAt = new Date();
                    return subscription.save({ transaction: t }).then(savedSubscription => {
                        if (status == SubscriptionStatuses.getApprovedStatus()) {
                            return User.findById(savedSubscription.userId, { transaction: t }).then(user => {
                                if (user == null) {
                                    res.status(404).json({
                                        message: 'User Not Found'
                                    });
                                    return t.rollback();
                                } else if (user.priviledge <= savedSubscription.priviledge) {
                                    user.priviledge = savedSubscription.priviledge;
                                    user.expiredAt = Priviledges.getExpiredTime(savedSubscription.priviledge);
                                    return user.save({ transaction: t }).then(savedUser => {
                                        res.json(savedSubscription);
                                        return t.commit();
                                    }).catch(error => {
                                        res.status(400).json({
                                            message: 'Failed to apply subscription'
                                        });
                                        return t.rollback();
                                    });
                                } else {
                                    res.json(savedSubscription);
                                    return t.commit();
                                }
                            }).catch(error => {
                                res.status(500).json({
                                    message: 'Unknown error has occured'
                                });
                                return t.rollback();
                            });
                        } else {
                            res.json(savedSubscription);
                            return t.commit();
                        }
                    }).catch(error => {
                        res.status(400).json({
                            message: 'Failed to save subscription'
                        });
                        return t.rollback();
                    });
                }
            }).catch(error => {
                res.status(500).json({
                    message: 'Unknown error has occured'
                });
                return t.rollback();
            });
        });
    }
};
