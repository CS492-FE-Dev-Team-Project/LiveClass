import ClassEntity from '../entity/classEntity';
import { classUuid } from '../types';
import Class from './class';

class ClassManager {
  private classMap: Map<classUuid, Class> = new Map<classUuid, Class>();

  public async getOrCreateClass(uuid: classUuid): Promise<Class> {
    if (this.classMap.has(uuid)) return this.classMap.get(uuid)!;

    const classEntity = await ClassEntity.findOne(uuid);
    if (classEntity !== undefined) return this.addClass(classEntity);

    throw new Error('No Such Class Exists');
  }

  public addClass(classEntity: ClassEntity) {
    const newClass = new Class(classEntity);
    const { uuid } = newClass;
    this.classMap.set(uuid, newClass);
    return newClass;
  }
}

export default ClassManager;
