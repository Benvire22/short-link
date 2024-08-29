import express from 'express';
import ShortLink from '../models/ShortLink';
import { ShortLinkMutation } from '../types';

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
    const originalUrl = req.body.link;
    if (!req.body.link) {
      return res.status(400).send({error: 'Link are required!'});
    }

    const linkMutation: ShortLinkMutation = {
      // shortUrl: shortUrl(originalUrl),
      shortUrl: 'short link',
      originalUrl,
    };

    const shortLink = new ShortLink(linkMutation);
    await shortLink.save();

    return res.send(shortLink);
  } catch (e) {
    next(e);
    return res.sendStatus(500);
  }
});

export default linksRouter;