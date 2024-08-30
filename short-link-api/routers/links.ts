import express from 'express';
import ShortLink from '../models/ShortLink';
import { ShortLinkApi, ShortLinkMutation } from '../types';
import getShortLink from '../lib/shortLink';

const linksRouter = express.Router();

linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const link = await ShortLink.findOne({shortUrl: req.params.shortUrl});

    if (link === null) {
      return res.status(404).send({error: 'ShortLink not found'});
    }

    return res.status(301).redirect(link.originalUrl);
  } catch (e) {
    next(e)
    return res.sendStatus(500);
  }
});

linksRouter.post('/', async (req, res, next) => {
  try {
    const originalUrl = req.body.originalUrl;
    if (!req.body.originalUrl) {
      return res.status(400).send({error: 'Link are required!'});
    }

    const linkMutation: ShortLinkMutation = {
      shortUrl: await getShortLink(),
      originalUrl,
    };

    const shortLink = new ShortLink(linkMutation);
    await shortLink.save();

    const savedLink: ShortLinkApi = {
      _id: shortLink._id,
      shortUrl: shortLink.shortUrl,
      originalUrl: shortLink.originalUrl,
    };

    return res.send(savedLink);
  } catch (e) {
    next(e);
    return res.sendStatus(500);
  }
});

export default linksRouter;