import { Router } from 'express';
import Logger from '../../loader/logger';
import classrooms from './classData';

interface ClassCreateRequest {
  userId: number;
  className: string;
}

export default (app: Router) => {
  const route = Router();

  route.get('/', (req, res) => {
    res.json(classrooms);
  });

  route.post('/', (req, res) => {
    try {
      // Do something with given request.
      const { userId, className }: ClassCreateRequest = req.body;
      Logger.silly('UserId: %d ClassName: %s', userId, className);

      // Send back the request if successful.
      res.json(classrooms[0]);
    } catch (e: any) {
      Logger.error(e.message);
      // Go to Error handling middleware and let it take care of sending error message.
    }
  });

  route.get('/:classId/lectures', (req, res) => {
    try {
      // get classIdentifier some way.
      // Here it is given as a url parameter.
      //   const { classId } = req.params;

      // find lecture lists in db using classId
      const lectureNames: { lectureId: number; lectureName: string }[] = [
        { lectureId: 11, lectureName: 'Process: Abstraction of a Machine' },
        { lectureId: 13, lectureName: 'Thread: Abstraction of a CPU' },
        { lectureId: 15, lectureName: 'FAT vs Multi-Level-Indexing' }
      ];
      res.json(lectureNames);
    } catch (e: any) {
      Logger.error(e.message);
    }
  });

  // Use the created Router!
  app.use('/class', route);
};