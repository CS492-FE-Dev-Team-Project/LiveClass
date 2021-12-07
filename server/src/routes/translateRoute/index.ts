import { Router } from 'express';
import { detectLanguage, translate } from '../../externalAPI/PapagoAPI';
import Logger from '../../loader/logger';
import { TranslateRequestInterface } from '../../types';

export default (app: Router) => {
  const translateRouter = Router();
  app.use('/translate', translateRouter);

  translateRouter.post('/', async (req, res) => {
    try {
      const { translateArray, target }: TranslateRequestInterface = req.body;

      const translated = await Promise.all(
        translateArray.map(async (text: string) => {
          const { src } = await detectLanguage(text);
          return translate(src, target, text);
        })
      );

      res.json({ translated });
    } catch (e) {
      Logger.error(e);
    }
  });
};
