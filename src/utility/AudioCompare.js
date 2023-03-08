import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser";
import mic from "../assets/mic.png";
import listen from "../assets/listen.png";
import pause from "../assets/pause.png";
import mic_on from "../assets/mic.png";

export default class AudioRecorderCompair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      pauseAudio: false,
    };
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
                    onClick={() =>
                      document.getElementById("stopaudio_compair").click()
                    }
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
                      onClick={() =>
                        document.getElementById("startaudio_compair").click()
                      }
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
                onClick={() => this.controlAudio("recording")}
              >
                Start
              </button>
              <button
                className="btn"
                id="stopaudio_compair"
                onClick={() => this.controlAudio("inactive")}
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
