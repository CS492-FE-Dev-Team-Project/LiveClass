import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './carousel.css';

import LectureCard from './lecturecard';
import { Lecture } from '../../types';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LectureCarousel = ({ classUuid, memberType, lectureList }: any) => {
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
          ({
            id: lectureId,
            lectureDate,
            lectureName,
            LiveStatus,
            playlist
          }: Lecture) => (
            <SwiperSlide>
              <LectureCard
                lectureNum={lectureId}
                youtubePlayList={playlist}
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
