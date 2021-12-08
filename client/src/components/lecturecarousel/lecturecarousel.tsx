import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './carousel.css';

import { getPlayListItems } from '../common/playlist';

import LectureCard from './lecturecard';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LectureCarousel = ({ classUuid, memberType, lectureList }: any) => {
  const [firstVidIds, setFirstVidIds] = useState<string[]>([]);

  const getFirstVideoIds = async () => {
    const ids: string[] = [];
    lectureList.forEach(({ playlist }: any) => {
      getPlayListItems(playlist).then(data => {
        ids.push(data.items[0].snippet.resourceId.videoId);
      });
    });
    return ids;
  };

  useEffect(() => {
    getFirstVideoIds().then(res => {
      setFirstVidIds(res);
    });
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: (index: any, className: any) => {
      return `<span class="${className}">${index + 1}</span>`;
    }
  };

  return (
    <>
      <Swiper
        centeredSlides
        className="swiper-container"
        spaceBetween={50}
        slidesPerView={4}
        navigation
        pagination={pagination}
      >
        {lectureList.map(
          (
            { id: lectureId, lectureDate, lectureName, LiveStatus }: any,
            idx: number
          ) => (
            <SwiperSlide>
              <LectureCard
                lectureNum={lectureId}
                youtubeID={firstVidIds.length > idx ? firstVidIds[idx] : ''}
                date={lectureDate.slice(0, 10)}
                to={`/class/${classUuid}/${memberType}/${lectureId}`}
                key={lectureId}
                isLive={LiveStatus}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default LectureCarousel;
