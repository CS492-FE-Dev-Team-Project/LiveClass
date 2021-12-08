import { Router } from 'express';
import { detectLanguage, translate } from '../../externalAPI/PapagoAPI';
import Logger from '../../loader/logger';
import { authenticateUser } from '../../passport';
import { TranslateRequestInterface } from '../../types';

export default (app: Router) => {
  const translateRouter = Router();
  app.use('/translate', translateRouter);

  translateRouter.post('/', authenticateUser, async (req, res) => {
    try {
      const { translateArray, target }: TranslateRequestInterface = req.body;

      Logger.info(JSON.stringify(req.body, null, 2));

      const translated = await Promise.all(
        translateArray.map(async (text: string) => {
          const { src, canTranslate } = await detectLanguage(text);
          return canTranslate
            ? translate(src, target, text)
            : { text, status: 200 };
        })
      );

      res.json({ translated, status: 200 });
    } catch (e) {
      Logger.error(e);
    }
  });
};
