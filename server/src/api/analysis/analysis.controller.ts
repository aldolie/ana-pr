import {Request, Response, NextFunction} from 'express';
import {Analysis} from '../../models/Analysis';
import {Priviledges} from '../../util/Priviledge';
import io from "../../../index";

export let controller = {
    get: (req: Request, res: Response, next: NextFunction) => {
        let limit = 10;
        let offset = 0;
        let priviledges = Priviledges.getPrivildge(req.user.priviledge);
        Analysis.findAndCountAll({
            where: {
                priviledge: {
                    $in: priviledges
                }
            }
        }).then(data => {
            let page = req.query.page || 1;
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            Analysis.findAll({
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
            }).then(analyzes => {
                res.json({
                    'result': analyzes,
                    'count': data.count,
                    'page': page,
                    'pages': pages
                })
            }).catch(error => {
                res.status(500).json({
                    message: 'Unknown error has occured'
                });
            })

        }).catch(error => {
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    },
    getById: (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let priviledges = Priviledges.getPrivildge(req.user.priviledge);
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
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        let {name, value, priviledge} = req.body;
        Analysis.create({name: name, priviledge: priviledge, value: value}).then(analysis => {
            io.to('broadcast').emit('message', {id: analysis.id, priviledge: analysis.priviledge});
            res.status(201).json(analysis);
        });

    },
    put: (req: Request, res: Response, next: NextFunction) => {
        let {name, value, priviledge} = req.body;
        let id = req.params.id;
        let priviledges = Priviledges.getPrivildge(req.user.priviledge);
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
    },
    delete: (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let priviledges = Priviledges.getPrivildge(req.user.priviledge);
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
    },
};
