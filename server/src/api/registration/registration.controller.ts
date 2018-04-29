import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/User';
import {Roles} from '../../util/Role';
import {Md5} from 'ts-md5';
import * as UUID from 'uuid';
import * as nodemailer from 'nodemailer';
import {Transaction} from "sequelize";
import {__sequelize} from "../../index";

export let controller = {
    post: (req: Request, res: Response, next: NextFunction) => {
        let priviledge = 0;
        let role = Roles.getUserRole();
        let {email, password} = req.body;
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user == null) {
                let activationToken = UUID();
                return __sequelize.transaction({ autocommit: false }).then((t: Transaction) => {
                    return User.create({
                        email: email,
                        password: Md5.hashStr(password),
                        priviledge: priviledge,
                        role: role,
                        active: false,
                        activationToken: activationToken,
                        name: '',
                        dateOfBirth: null,
                        country: '',
                        region: '',
                        postalCode: '',
                        phoneNumber: ''
                    }, { transaction: t }).then(user => {
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                type: 'OAuth2',
                                user: 'silentrazgriz@gmail.com',
                                clientId: '590519621077-4c26hntjttmv8f0806c2m5p262u1hu0r.apps.googleusercontent.com',
                                clientSecret: 'eb8sutDLpzU_6q7_G7nzqwUd',
                                refreshToken: '1/P2ic8BMKjNbzE86Dp-ScnZbjjLM9VMQKL9YnE2LZTXUwX33T9yoCPnoe-GAAQzFk',
                                accessToken: 'ya29.GlukBfSO7usV9nT8fA0MwUJ9uYZK2faZyeGg-QPOkCgY3guWU5X4nODqBevUrqrRqjMJjOO-roD0M07mHjperRrQm7C9XZnpURpuaKd8543GuPES9ONOkKH4a8bL'
                            }
                        });

                        let mailOptions = {
                            from: 'silentrazgriz@gmail.com',
                            to: email,
                            subject: 'Please verify your account',
                            text: 'Please click link below to verify your account http://localhost:3000/api/verification?token=' + activationToken
                        };

                        transporter.sendMail(mailOptions, (error: any, info: any) => {
                            if (error) {
                                console.log(error);
                                res.status(500).json({
                                    message: 'Unknown error has occured'
                                });
                                return t.rollback();
                            } else {
                                res.sendStatus(201);
                                return t.commit();
                            }
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message: 'Unknown error has occured'
                        });
                        return t.rollback();
                    });
                });
            } else {
                res.status(409).json({
                    errorCode: 409,
                    errorMessage: "email already registered"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: 'Unknown error has occured'
            });
        });
    }
};
