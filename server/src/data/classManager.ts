import ClassEntity from '../entity/classEntity';
import Logger from '../loader/logger';
import { classUuid } from '../types';
import Class from './class';

class ClassManager {
  private classMap: Map<classUuid, Class> = new Map<classUuid, Class>();

  // Join class
  public async getOrCreateClass(uuid: classUuid): Promise<Class> {
    if (this.classMap.has(uuid)) return this.classMap.get(uuid)!;

    const classEntity = await ClassEntity.findOne(uuid, {
      relations: ['lectures', 'members', 'members.member']
    });

    Logger.debug(
      `Create Class Obj\nentity:${JSON.stringify(classEntity, null, 2)}`
    );

    if (classEntity !== undefined) return this.addClass(classEntity);

    throw new Error('No Such Class Exists');
  }

  public async addClass(classEntity: ClassEntity) {
    const newClass = new Class(classEntity);

    const { uuid } = newClass;
    this.classMap.set(uuid, newClass);
    return newClass;
  }

  public findUserClass(id: number): Class | undefined {
    let result;
    this.classMap.forEach(cls => {
      if (cls.getMemberById(id)) {
        result = cls;
      }
    });
    return result;
  }
}

export default ClassManager;
