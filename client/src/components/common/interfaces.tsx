import React from 'react';

export type MemberType = 'instructor' | 'student';
export type MarkerType = 'question' | 'quiz' | 'notice' | 'discussion';

export interface User {
  id: number,
  createdData: Date,
  updatedDate: Date;
  userName: string;
  classes: ClassMember[];
};

export interface ClassMember {
  id: number;
  createdDate: Date;
  updatedDate: Date;
  memberType: MemberType;
  member: User;
  class: Class;
  markers: Marker[];
};

export interface Class {
  id: number;
  createdDate: Date;
  updatedDate: Date;
  className: string;
  classCode: string;
  lectures: Lecture[];
  members: ClassMember[];
};

export interface Lecture {
  id: number;
  createdDate: Date;
  updatedDate: Date;
  lectureDate: Date;
  lectureName: string;
  playlist: string;
  class: Class;
  markers: Marker;
};

export interface Marker {
  id: number;
  createdDate: Date;
  markerType: MarkerType;
  lecture: Lecture;
  creator: ClassMember;
};
