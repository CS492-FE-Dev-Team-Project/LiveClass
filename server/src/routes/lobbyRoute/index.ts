import { Router } from 'express';
import Class from '../../entity/class';
import ClassMember, { MemberType } from '../../entity/classMember';
import Logger from '../../loader/logger';
import { authenticateUser } from '../../passport';

export default (app: Router) => {
  const router = Router();
  app.use('/lobby', router);

  router.use(authenticateUser);
  router.get('/classes', async (req, res) => {
    try {
      const user = req.user!;
      const classMembers = await ClassMember.find({
        where: { member: user.id },
        join: {
          alias: 'class_member',
          leftJoinAndSelect: { class: 'class_member.class' }
        }
      });
      const classes = classMembers
        .filter(member => !!member.class)
        .map(({ memberType, class: { uuid, title, subtitle } }) => {
          return {
            memberType,
            title,
            subtitle,
            uuid
          };
        });
      res.json({ classes, status: 200 });
    } catch (e) {
      Logger.error(e);
      res.json({ err: e, status: 400 });
    }
  });

  router.post('/class', async (req, res) => {
    try {
      const user = req.user!;
      const classMember = new ClassMember();
      classMember.member = user;
      classMember.memberType = MemberType.INSTRUCTOR;
      const savedClassMember = await classMember.save();

      const { title, subtitle } = req.body;
      const newClass = new Class();
      newClass.title = title;
      newClass.subtitle = subtitle;
      newClass.members = [savedClassMember];
      const { uuid } = await newClass.save();

      res.json({
        class: { uuid, title, subtitle, memberType: MemberType.INSTRUCTOR },
        status: 200
      });
    } catch (e) {
      Logger.error(e);
      res.json({ err: e, status: 400 });
    }
  });

  router.patch('/class', async (req, res) => {
    try {
      const user = req.user!;
      const { uuid } = req.body;
      const joinClass = await Class.findOne(uuid, { relations: ['members'] });
      if (!joinClass) {
        res.json({ err: 'No Such Class', status: 400 });
      }

      if (
        joinClass!.members.find(
          ({ member }: ClassMember) =>
            member !== undefined && member.id === user.id
        )
      ) {
        res.json({ err: 'Already Joined Class', status: 400 });
      }

      const classMember = new ClassMember();
      classMember.member = user;
      classMember.class = joinClass!;
      classMember.memberType = MemberType.STUDENT;
      await classMember.save();
      res.json({
        class: {
          uuid,
          title: joinClass!.title,
          subtitle: joinClass!.subtitle,
          memberType: classMember.memberType
        },
        status: 200
      });
    } catch (e) {
      Logger.error(e);
      res.json({ err: e, status: 400 });
    }
  });
};
