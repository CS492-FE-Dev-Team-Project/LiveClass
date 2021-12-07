import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './carousel.css';

import LectureCard from './lecturecard';

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
          ({ id: lectureId, lectureDate, lectureName, LiveStatus }: any) => (
            <SwiperSlide>
              <LectureCard
                lectureNum={lectureId}
                youtubeID="4-u7kewhpDU"
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
