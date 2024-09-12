import React, { useState, useRef, useEffect } from 'react';
import RecordRTC from 'recordrtc';
import mic from '../assets/mic.png';
import listen from '../assets/listen.png';
import pause from '../assets/pause.png';
import mic_on from '../assets/mic.png';
import { interactCall } from '../services/callTelemetryIntract';

const AudioRecorderCompair = (props) => {
  const [status, setStatus] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [pauseAudio, setPauseAudio] = useState(false);
  const recorderRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      if (recorderRef.current) {
        recorderRef.current.destroy();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Use RecordRTC to start recording
      recorderRef.current = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 16000,
        disableLogs: true,
      });

      recorderRef.current.startRecording();
      setStatus('recording');
      setAudioSrc('');
      props.setRecordedAudio('');
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        if (blob) {
          const tempAudioSrc = window.URL.createObjectURL(blob);
          setAudioSrc(tempAudioSrc);
          props.setRecordedAudio(tempAudioSrc);

          // Stop the media stream
          if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          }

          setStatus('inactive');
        } else {
          console.error('Failed to retrieve audio blob.');
        }
      });
    }
  };

  return (
    <div>
      <div>
        {(() => {
          if (status === 'recording') {
            return (
              <>
                <img
                  src={mic_on}
                  className="micimg mic_stop_record"
                  onClick={() => {
                    interactCall('mic_stop', 'play', 'DT', 'stop');
                    stopRecording();
                  }}
                  alt="mic_on"
                  style={{
                    position: 'fixed',
                    bottom: '30px',
                    cursor: 'pointer',
                    height: '38px',
                  }}
                />
              </>
            );
          } else {
            return (
              <div
                style={{
                  display: 'flex',
                  width: '13%',
                  justifyContent: 'space-between',
                  margin: '0 auto',
                  position: 'fixed',
                  bottom: '30px',
                  left: '44%',
                }}
                className="game-action-button"
              >
                {!pauseAudio ? (
                  <div
                    onClick={() => {
                      interactCall('listen', 'play', 'DT', 'pause');
                      props.playAudio(true);
                      setPauseAudio(true);
                    }}
                  >
                    <img
                      src={listen}
                      alt={'listen'}
                      style={{
                        cursor: 'pointer',
                        padding: '5px',
                        height: '38px',
                      }}
                    />
                    <div
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px',
                      }}
                    >
                      LISTEN
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      interactCall('pause', 'play', 'DT', 'pause');
                      props.playAudio(false);
                      setPauseAudio(false);
                    }}
                  >
                    <img
                      src={pause}
                      alt={'pause'}
                      style={{
                        cursor: 'pointer',
                        padding: '5px',
                        height: '38px',
                      }}
                    />
                    <div
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px',
                      }}
                    >
                      PAUSE
                    </div>
                  </div>
                )}
                <div>
                  <img
                    src={mic}
                    className="micimg mic_record"
                    onClick={() => {
                      interactCall('speak', 'play', 'DT', 'play');
                      startRecording();
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: '5px',
                      height: '38px',
                    }}
                    alt="mic"
                  />
                  <div
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '14px',
                    }}
                  >
                    SPEAK
                  </div>
                </div>
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default AudioRecorderCompair;
