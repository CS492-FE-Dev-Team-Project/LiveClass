# 🧑‍🏫 LiveClass

<div align="center">
    <img src="./client/src/assets/logo1.svg" width="60%"/>
</div>

<div align="center">

![TypeScipt](https://img.shields.io/badge/typescript-4.1.0-719af4?logo=typescript)
![React](https://img.shields.io/badge/react-17.0.2-9cf?logo=react)
![Chakra](https://img.shields.io/badge/chakra-1.6.12-%234ED1C5?logo=chakraui)

![Express](https://img.shields.io/badge/express-v4.17.13-010101?logo=express)
![MySQL](https://img.shields.io/badge/mysql-2.18.1-%2300f?logo=mysql)
![Socket.io](https://img.shields.io/badge/Socket.io-4.3.1-black?logo=socket.io&badgeColor=010101)
![Docker](https://img.shields.io/badge/docker-20.10.10-%230db7ed?logo=docker)

![OpenIssues](https://img.shields.io/github/issues-raw/CS492-FE-Dev-Team-Project/FE-Dev-Client)
![ClosedIssues](https://img.shields.io/github/issues-closed-raw/CS492-FE-Dev-Team-Project/FE-Dev-Client)
![License](https://img.shields.io/github/license/CS492-FE-Dev-Team-Project/FE-Dev-Client)
</div>

## ✏️ LiveClass 소개
**LiveClass**는 블렌디드 러닝을 위한 실시간 &middot; 비실시간 강의 지원 서비스입니다. 기존의 블렌디드 러닝 서비스들은 서로 간의 카메라 영상을 통해 대면 강의를 하지만, **LiveClass**는 **YouTube Playlist**를 기반으로 강의를 생성하여, 이를 공유하며 수업을 진행할 수 있습니다.

핵심 기능은 다음과 같습니다.
- 준비된 YouTube Playlist를 이용하여 영상들로 구성된 강의를 생성 가능
- 강의자의 YouTube 영상 재생 상황이 학생들의 영상과 공유됨
- 영상 재생 중 Time Marker를 이용하여 해당 시간에 질문과 토론을 생성 가능
- Walkie-Talkie 기능으로 실시간 음성 전달과 대화가 가능 (*Wailkie Talkie 기능은 `navigator.mediaDevices` api의 [브라우저의 보안 정책](https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia) 때문에 아래의 링크에서는 사용이 불가능합니다. 테스트를 원하신다면 localhost에서 테스트해 보실 수 있습니다.)

### ➡️ [**LiveClass를 써보고 싶으면 클릭하세요!!**](http://ec2-3-38-83-97.ap-northeast-2.compute.amazonaws.com/)

현재 LiveClass는 테스터 계정으로만 이용할 수 있습니다. 사용하기를 원하신다면, **ysrheee@kaist.ac.kr**으로 연락해주세요!

## 📋 LiveClass 사용법

wip

## 🖥 개발 환경
시작 전 다음의 개발 환경들을 설치해주세요.
- [**NodeJS**](https://nodejs.org/en/) 16.13.1 LTS
- **npm** 8.1.0
- **yarn** 1.22.17
- [**Docker**](https://www.docker.com/products/docker-desktop) 20.10.10

## 🖥 프로젝트 시작하기
1️⃣ Clone Repository
```
$ git clone https://github.com/CS492-FE-Dev-Team-Project/FE-Dev-Client.git
```
2️⃣ Install Packages
```
$ cd client && yarn
$ cd ../server && yarn
$ cd ..
```
3️⃣ Build & Run Server
```
$ yarn build:run
```
4️⃣ [http://localhost:5000](http://localhost:5000)으로 접속

### For more detailed information about the local settings, go to [Wiki:How to run](https://github.com/CS492-FE-Dev-Team-Project/FE-Dev-Client/wiki/How-to-run)

--------
**2021 KAIST Fall Semester** &middot; CS492(C) - FrontEnd Development
