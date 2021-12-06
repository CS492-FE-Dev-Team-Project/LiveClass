import { useParams } from 'react-router';

const useParsedClassLectureIds = () => {
  const { classUuid, lectureId } = useParams();

  if (!classUuid) {
    throw new Error('No ClassUuid');
  }

  if (!lectureId) {
    throw new Error('No Lecture Id');
  }
  const parsedLectureId = parseInt(lectureId, 10);
  return { classUuid, lectureId: parsedLectureId };
};

export default useParsedClassLectureIds;
