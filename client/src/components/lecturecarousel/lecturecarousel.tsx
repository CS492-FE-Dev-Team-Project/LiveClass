import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './carousel.css';

import LectureCard from './lecturecard';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LectureCarousel = ({ lectureList }: any) => {
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
        <SwiperSlide>
          <LectureCard
            lectureNum={1}
            youtubeID="4-u7kewhpDU"
            date="2021-01-01"
          />
        </SwiperSlide>
        <SwiperSlide>
          <LectureCard
            lectureNum={2}
            youtubeID="4-u7kewhpDU"
            date="2021-01-02"
          />
        </SwiperSlide>
        <SwiperSlide>
          <LectureCard
            lectureNum={3}
            youtubeID="4-u7kewhpDU"
            date="2021-01-03"
            isLive
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default LectureCarousel;
