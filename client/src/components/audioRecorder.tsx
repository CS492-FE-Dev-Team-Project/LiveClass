import React, { useState, useCallback, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { CircleIcon } from './common/icons';
import { useSocket } from '../context/socket';
import useParsedClassLectureIds from '../hooks/useParsedClassLectureId';

const AudioRecorder = () => {
  const [audioStream, setAudioStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [audioAnalyser, setAudioAnalyser] = useState<ScriptProcessorNode>();
  const [audioUrl, setAudioUrl] = useState<Blob>();

  const { socket, connected } = useSocket();

  const { classUuid, lectureId } = useParsedClassLectureIds();

  useEffect(() => {
    if (connected && socket) {
      socket.on(
        'LiveChatAudioMessage',
        ({
          arrayBuffer,
          senderId
        }: {
          arrayBuffer: ArrayBuffer;
          senderId: number;
        }) => {
          const blob = new Blob([new Uint8Array(arrayBuffer)]);
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.play();
        }
      );
    }
  }, [connected]);

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new window.AudioContext();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAudioAnalyser(analyser);

    const makeSound = (stream: MediaStream) => {
      const src = audioCtx.createMediaStreamSource(stream);
      setSource(src);
      src.connect(analyser);
      analyser.connect(audioCtx.destination);
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setAudioStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = e => {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(track => {
            track.stop();
          });
          mediaRecorder.stop();

          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = (blobEvent: BlobEvent) => {
            setAudioUrl(blobEvent.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    if (media) {
      media.ondataavailable = e => {
        setAudioUrl(e.data);
        setOnRec(true);
      };
    }

    if (audioStream) {
      audioStream.getAudioTracks().forEach(track => {
        track.stop();
      });
    }

    if (media) media.stop();
    if (audioAnalyser) audioAnalyser.disconnect();
    if (source) source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      const sound = new File([audioUrl], 'soundBlob', {
        lastModified: new Date().getTime(),
        type: 'audio'
      });
      const payload = {
        classUuid,
        lectureId,
        arrayBuffer: sound
      };
      socket?.emit('LiveChatAudioMessage', payload);
    }
  }, [audioUrl]);

  return (
    <>
      <IconButton
        aria-label="Record Voice Chat"
        icon={<CircleIcon style={{ color: onRec ? 'black' : 'red' }} />}
        onClick={onRec ? onRecAudio : offRecAudio}
      />
      <button type="button" onClick={onSubmitAudioFile}>
        Send Audio Message
      </button>
    </>
  );
};

export default AudioRecorder;
