import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser";
import mic from "../assets/mic.png";
import listen from "../assets/listen.png";
import pause from "../assets/pause.png";
import mic_on from "../assets/mic.png";
import { interactCall } from "../services/callTelemetryIntract";

export default class AudioRecorderCompair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      pauseAudio: false,
      soundDetected: false,
      stopDetection: false,
    };
    this.MIN_DECIBELS = -45;
  }

  controlAudio(status) {
    this.setState({
      status,
    });
  }

  changeScheme(e) {
    this.setState({
      audioType: e.target.value,
    });
  }

  componentDidMount() {
    this.setState({
      audioType: "audio/wav",
    });
  }

  startSoundDetection = async () => {
    console.log("startSoundDetection",this.state.soundDetected);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = this.MIN_DECIBELS;
      audioStreamSource.connect(analyser);

      const bufferLength = analyser.fftSize;
      const domainData = new Uint8Array(bufferLength);

      const detectSound = () => {

        if (this.state.stopDetection) {
          return; // Stop detection if stopDetection is true
        }
        console.log(this.state.soundDetected, "detectSound");
        if (this.state.soundDetected) {
          return;
        }

        analyser.getByteTimeDomainData(domainData);

        for (let i = 0; i < bufferLength; i++) {
          const amplitude = (domainData[i] / 140.0) - 1.0; // Normalize to [-1, 1]

          if (amplitude > 0.2) { // Adjust the threshold as needed
            this.setState({ soundDetected: true });
            this.props.setIsEmptyAudio(true);
            break;
          }
        }

        requestAnimationFrame(detectSound);
      };

      requestAnimationFrame(detectSound);

      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();

        // console.log({ soundDetected: this.state.soundDetected });
      });

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };


  render() {
    const { status, audioSrc, audioType } = this.state;
    const audioProps = {
      audioType,
      status,
      audioSrc,
      timeslice: 1000, // timeslice
      startCallback: (e) => {
        this.setState({
          audioSrc: "",
        });
        this.props.setRecordedAudio("");
        console.log("succ start", e);
      },
      pauseCallback: (e) => {
        console.log("succ pause", e);
      },
      stopCallback: (e) => {
        let temp_audioSrc = window.URL.createObjectURL(e);
        this.setState({
          audioSrc: temp_audioSrc,
        });
        this.props.setRecordedAudio(temp_audioSrc);
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
                      this.setState({ soundDetected: false });
                      this.setState({ stopDetection: true });
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
                  {!this.props.pauseAudio ? (
                    <div
                      onClick={() => {
                        interactCall("listen", "play", "DT", "pause");
                        this.props.playAudio(true);
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
                        this.props.playAudio(false);
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
                        this.startSoundDetection();
                        this.setState({ soundDetected: false, stopDetection: false });
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
                  this.controlAudio("recording");
                }}
              >
                Start
              </button>
              <button
                className="btn"
                id="stopaudio_compair"
                onClick={() => {
                  interactCall("stop", "play", "DT", "pause");
                  this.controlAudio("inactive");
                }}
              >
                Stop
              </button>
            </div>
          </AudioAnalyser>
        </div>
      </div>
    );
  }
}
