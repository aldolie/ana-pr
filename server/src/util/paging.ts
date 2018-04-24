import {Request} from "express";

let paging = {
    get: function(req: Request, count: number, limit: number = 10, offset: number = 0) {
        let page = req.query.page || 1;
        return {
            page: page,
            pages: Math.ceil(count / limit),
            limit: limit,
            offset: limit * (page - 1)
        };
    }
};

export default paging;