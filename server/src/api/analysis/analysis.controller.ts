import { Request, Response, NextFunction } from 'express';
import { Analysis } from '../../models/Analysis';


export let controller = {
    get: (req: Request, res: Response, next: NextFunction) => {
        let limit = 10;
        let offset = 0;
        Analysis.findAndCountAll().then(data => {
           let page = req.query.page || 1;
           let pages = Math.ceil(data.count / limit);
           offset = limit * (page - 1);
           Analysis.findAll({
              limit: limit,
              offset: offset,
           }).then(analyzes => {
             res.json({
               'result': analyzes, 
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
        Analysis.findById(id).then(analysis => {
          if (analysis == null) {
             res.sendStatus(404);
          } else {
             res.json(analysis);
          }
        }).catch(error => {
            res.sendStatus(400);
        });
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        let { name, value } = req.body;
        Analysis.create({name: name, value: value}).then(analysis => {
            res.status(201).json(analysis);
        });

    },
    put: (req: Request, res: Response, next: NextFunction) => {
      let { name, value } = req.body;
      let id = req.params.id;
        Analysis.findById(id).then(analysis => {
          if (analysis == null) {
             res.sendStatus(404);
          } else {
            analysis.name = name;
            analysis.value = value;
            analysis.save();
            res.json(analysis);
          }
        }).catch(error => {
            res.sendStatus(400);
        });
    },
    delete: (req: Request, res: Response, next: NextFunction) => {
      let id = req.params.id;
        Analysis.findById(id).then(analysis => {
          if (analysis == null) {
             res.sendStatus(404);
          } else {
            analysis.destroy();
            res.sendStatus(204);
          }
        }).catch(error => {
            res.sendStatus(400);
        });
    },
};
