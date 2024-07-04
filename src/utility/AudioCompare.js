import React, { useState, useEffect } from "react";
import AudioAnalyser from "react-audio-analyser";
import mic from "../assets/mic.png";
import listen from "../assets/listen.png";
import pause from "../assets/pause.png";
import mic_on from "../assets/mic.png";
import { interactCall } from "../services/callTelemetryIntract";
import useAudioDetection from "./useAudioDetection";

const AudioRecorderCompair = (props) => {

  const { startDetection, stopDetection, isSilent, isRunning, audioDetected } = useAudioDetection();

  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioType, setAudioType] = useState("audio/wav");
  const [pauseAudio, setPauseAudio] = useState(false);


  const handleAudioControl = async (status) => {
    if (status === "recording") {
      await startDetection();
    } else {
      stopDetection();
    }
    setStatus(status);
  };

  useEffect(()=>{
      if(props.setIsEmptyAudio){
        props.setIsEmptyAudio(audioDetected);
    }
  },[audioDetected])

  const changeScheme = (e) => {
    setAudioType(e.target.value);
  };

  useEffect(() => {
    setAudioType("audio/wav");
  }, []);

  const audioProps = {
    audioType,
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      setAudioSrc("");
      props.setRecordedAudio("");
      console.log("succ start", e);
    },
    pauseCallback: (e) => {
      console.log("succ pause", e);
    },
    stopCallback: (e) => {
      let temp_audioSrc = window.URL.createObjectURL(e);
      setAudioSrc(temp_audioSrc);
      props.setRecordedAudio(temp_audioSrc);
      console.log("succ stop", e);
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
    },
    errorCallback: (err) => {
      console.log("error", err);
    },
  };

  return (
    <div>
      <div>
        {(() => {
          if (status === "recording") {
            return (
              <>
                <img
                  src={mic_on}
                  className="micimg mic_stop_record"
                  onClick={() => {
                    interactCall("mic_stop", "play", "DT", "stop");
                    document.getElementById("stopaudio_compair").click();
                  }}
                  alt="micon"
                  style={{
                    position: "fixed",
                    bottom: "30px",
                    cursor: "pointer",
                    height: "38px",
                  }}
                />
              </>
            );
          } else {
            return (
              <div
                style={{
                  display: "flex",
                  width: "13%",
                  justifyContent: "space-between",
                  margin: "0 auto",
                  position: "fixed",
                  bottom: "30px",
                  left: "44%",
                }}
                className="game-action-button"
              >
                {!pauseAudio ? (
                  <div
                    onClick={() => {
                      interactCall("listen", "play", "DT", "pause");
                      props.playAudio(true);
                      setPauseAudio(true);
                    }}
                  >
                    <img
                      src={listen}
                      alt={"listen"}
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        height: "38px",
                      }}
                    />
                    <div
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      LISTEN
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      interactCall("pause", "play", "DT", "pause");
                      props.playAudio(false);
                      setPauseAudio(false);
                    }}
                  >
                    <img
                      src={pause}
                      alt={"pause"}
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        height: "38px",
                      }}
                    />
                    <div
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px",
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
                      interactCall("speak", "play", "DT", "play");
                      document.getElementById("startaudio_compair").click();
                    }}
                    style={{
                      cursor: "pointer",
                      padding: "5px",
                      height: "38px",
                    }}
                    alt="mic"
                  />
                  <div
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    SPEAK
                  </div>
                </div>
              </div>
            );
          }
        })()}
        <AudioAnalyser {...audioProps} className="hide">
          <div className="btn-box hide">
            <br />
            <button
              className="btn"
              id="startaudio_compair"
              onClick={() => {
                interactCall("Start", "play", "DT", "play");
                handleAudioControl("recording");
              }}
            >
              Start
            </button>
            <button
              className="btn"
              id="stopaudio_compair"
              onClick={() => {
                interactCall("stop", "play", "DT", "pause");
                handleAudioControl("inactive");
              }}
            >
              Stop
            </button>
          </div>
        </AudioAnalyser>
      </div>
    </div>
  );
};

export default AudioRecorderCompair;
