'use strict';

const express = require('express');
const {expressjwt: validateJWT} = require('express-jwt');

const createLetterService = require('./letters-service');
const permissions = require('../../middleware/route-permissions');

const router = express.Router();
router.use(validateJWT({secret: process.env.DCS_JWT_SECRET, algorithms: ['HS256']}));

router
    .route('/letters')
    .delete(permissions('letters:delete'), async (req, res, next) => {
        try {
            const {questionnaireIds} = req.params;
            const letterService = createLetterService({
                logger: req.log,
                apiVersion: req.get('Dcs-Api-Version')
            });
            const response = await letterService.updateQuestionnairesExpiresDate(questionnaireIds);
            res.status(204).json(response);
        } catch (err) {
            next(err);
        }
    })
    .post(permissions('letters:create'), async (req, res, next) => {
        try {
            const {template, owner, origin, system} = req.body.data.attributes;

            const letterService = createLetterService({
                logger: req.log,
                apiVersion: req.get('Dcs-Api-Version'),
                ownerId: owner?.['owner-id']
            });
            const response = await letterService.createQuestionnaire({
                template,
                owner,
                origin,
                system
            });

            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
