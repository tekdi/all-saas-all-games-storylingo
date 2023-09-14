import React, { useState, useEffect } from "react";
import v1 from "../assets/audio/V1.m4a";
import v2 from "../assets/audio/V2.m4a";
import v3 from "../assets/audio/V3.m4a";
import v4 from "../assets/audio/V4.m4a";
import v5 from "../assets/audio/V5.m4a";
import v6 from "../assets/audio/V6.m4a";
import v7 from "../assets/audio/V7.m4a";
import v8 from "../assets/audio/V8.m4a";
import s1 from "../assets/audio/S1.m4a";
import s2 from "../assets/audio/S2.m4a";
import s3 from "../assets/audio/S3.m4a";
import s4 from "../assets/audio/S4.m4a";
import s5 from "../assets/audio/S5.m4a";
import s6 from "../assets/audio/S6.m4a";
import AudioCompare from "./AudioCompare";
import Loader from "./Loader";
import { interactCall } from "../services/callTelemetryIntract";
import { response } from "../services/telementryService";
import { compareArrays } from "./helper";
/* eslint-disable */

const AudioPath = {
  1: {
    0: v1,
    1: v2,
    2: v3,
    3: v4,
    4: v5,
    5: v6,
    6: v7,
    7: v8,
  },
  2: {
    0: s1,
    1: s2,
    2: s3,
    3: s4,
    4: s5,
    5: s6,
  },
};
const currentIndex = localStorage.getItem("index");
console.log("get current index", currentIndex);
function VoiceAnalyser(props) {
  const [loadCnt, setLoadCnt] = useState(0);
  const [loader, setLoader] = useState(false);
  const [pauseAudio, setPauseAudio] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState("");
  const [recordedAudioBase64, setRecordedAudioBase64] = useState("");
  const [audioPermission, setAudioPermission] = useState(null);
  const [ai4bharat, setAi4bharat] = useState("");
  const [currentIndex, setCurrentIndex] = useState();
  const [temp_audio, set_temp_audio] = useState(null);
  const initiateValues = async () => {
    const currIndex = await localStorage.getItem("index");
    setCurrentIndex(currIndex);
  };

  const playAudio = (val) => {
    interactCall("playAudio", "", "DT", "play");
    set_temp_audio(new Audio(AudioPath[currentIndex][props.storyLine]));
    setPauseAudio(val);
  };

  const DEFAULT_ASR_LANGUAGE_CODE = "ai4bharat/whisper-medium-en--gpu--t4";
  // const HINDI_ASR_LANGUAGE_CODE = 'ai4bharat/conformer-hi-gpu--t4';
  // const TAMIL_ASR_LANGUAGE_CODE = 'ai4bharat/conformer-multilingual-dravidian-gpu--t4';

  const [asr_language_code, set_asr_language_code] = useState(
    DEFAULT_ASR_LANGUAGE_CODE
  );

  // useEffect(() => {
  // switch (lang_code) {
  // case 'hi':
  // 	set_asr_language_code(HINDI_ASR_LANGUAGE_CODE);
  // 	break;
  //   case 'ta':
  // 	set_asr_language_code(TAMIL_ASR_LANGUAGE_CODE);
  // 	break;
  // default:
  // 	set_asr_language_code(DEFAULT_ASR_LANGUAGE_CODE);
  // 	break;
  // }
  // }, []);

  useEffect(() => {
    console.log("check temp audio", temp_audio && temp_audio.play());
    if (temp_audio !== null) {
      if (!pauseAudio) {
        temp_audio.pause();
        props.setVoiceAnimate(false);
      } else {
        temp_audio.play();
        props.setVoiceAnimate(true);
      }
      temp_audio.onended = function () {
        setPauseAudio(false);
        props.setVoiceAnimate(false);
      };
      //temp_audio.addEventListener("ended", () => alert("end"));
    }
    return () => {
      if (temp_audio !== null) {
        temp_audio.pause();
      }
    };
  }, [temp_audio]);

  useEffect(() => {
    initiateValues();
  }, []);

  useEffect(() => {
    if (loadCnt === 0) {
      getpermision();
      setLoadCnt((loadCnt) => Number(loadCnt + 1));
    }
  }, [loadCnt]);

  useEffect(() => {
    if (recordedAudio !== "") {
      setLoader(true);
      let uri = recordedAudio;
      var request = new XMLHttpRequest();
      request.open("GET", uri, true);
      request.responseType = "blob";
      request.onload = function () {
        var reader = new FileReader();
        reader.readAsDataURL(request.response);
        reader.onload = function (e) {
          // console.log("DataURL:", e.target.result);
          var base64Data = e.target.result.split(",")[1];
          setRecordedAudioBase64(base64Data);
        };
      };
      request.send();
    } else {
      setLoader(false);
      setRecordedAudioBase64("");
      setAi4bharat("");
    }
  }, [recordedAudio]);

  useEffect(() => {
    if (recordedAudioBase64 !== "") {
      fetchASROutput("en", recordedAudioBase64);
    }
  }, [recordedAudioBase64]);
  useEffect(() => {
    // props.updateStory();
    props.setVoiceText(ai4bharat);
    props.setRecordedAudio(recordedAudio);
  }, [ai4bharat]);

  const fetchASROutput = (sourceLanguage, base64Data) => {
    const asr_api_key = process.env.REACT_APP_ASR_API_KEY;
    const URL = process.env.REACT_APP_URL;
    let samplingrate = 30000;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", asr_api_key);
    var payload = JSON.stringify({
      config: {
        language: {
          sourceLanguage: sourceLanguage,
        },
        transcriptionFormat: {
          value: "transcript",
        },
        audioFormat: "wav",
        samplingRate: samplingrate,
        postProcessors: null,
      },
      audio: [
        {
          audioContent: base64Data,
        },
      ],
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    };

    const apiURL = `${URL}/services/inference/asr?serviceId=${asr_language_code}`;
    const responseStartTime = new Date().getTime();
    fetch(apiURL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const responseEndTime = new Date().getTime();
        const responseDuration = Math.round(
          (responseEndTime - responseStartTime) / 1000
        );
        var apiResponse = JSON.parse(result);

        let texttemp = apiResponse["output"][0]["source"].toLowerCase();

        const studentTextArray = texttemp.split(" ");
        let tempteacherText = localStorage.getItem("contentText")?.toLowerCase();

        const teacherTextArray = tempteacherText?.split(" ");

        let student_correct_words_result = [];
        let student_incorrect_words_result = [];
        let originalwords = teacherTextArray?.length;
        let studentswords = studentTextArray?.length;
        let wrong_words = 0;
        let correct_words = 0;
        let result_per_words = 0;
        let result_per_words1 = 0;
        let occuracy_percentage = 0;

        let word_result_array = compareArrays(
          teacherTextArray,
          studentTextArray
        );

        for (let i = 0; i < studentTextArray?.length; i++) {
          if (teacherTextArray?.includes(studentTextArray[i])) {
            correct_words++;
            student_correct_words_result.push(studentTextArray[i]);
          } else {
            wrong_words++;
            student_incorrect_words_result.push(studentTextArray[i]);
          }
        }
        //calculation method
        if (originalwords >= studentswords) {
          result_per_words = Math.round(
            Number((correct_words / originalwords) * 100)
          );
        } else {
          result_per_words = Math.round(
            Number((correct_words / studentswords) * 100)
          );
        }

        let word_result = result_per_words == 100 ? "correct" : "incorrect";

        response(
          {
            // Required
            target: localStorage.getItem("contentText"), // Required. Target of the response
            //"qid": "", // Required. Unique assessment/question id
            type: "SPEAK", // Required. Type of response. CHOOSE, DRAG, SELECT, MATCH, INPUT, SPEAK, WRITE
            values: [
              { original_text: localStorage.getItem("contentText") },
              { response_text: apiResponse },
              { response_correct_words_array: student_correct_words_result },
              {
                response_incorrect_words_array: student_incorrect_words_result,
              },
              { response_word_array_result: word_result_array },
              { response_word_result: word_result },
              { accuracy_percentage: result_per_words },
              { duration: responseDuration },
            ],
          },
          "ET"
        );

        setAi4bharat(
          apiResponse["output"][0]["source"] != ""
            ? apiResponse["output"][0]["source"]
            : "-"
        );
        setLoader(false);
      });
  };

  // const getpermision = () => {
  //   navigator.getUserMedia =
  //     navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia ||
  //     navigator.msGetUserMedia;
  //   navigator.getUserMedia(
  //     { audio: true },
  //     () => {
  //       console.log("Permission Granted");
  //       setAudioPermission(true);
  //     },
  //     () => {
  //       console.log("Permission Denied");
  //       setAudioPermission(false);
  //       //alert("Microphone Permission Denied");
  //     }
  //   );
  // };
  const getpermision = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Permission Granted");
        setAudioPermission(true);
      })
      .catch((error) => {
        console.log("Permission Denied");
        setAudioPermission(false);
        //alert("Microphone Permission Denied");
      });
  };
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        (() => {
          if (audioPermission != null) {
            if (audioPermission) {
              return (
                <AudioCompare
                  setRecordedAudio={setRecordedAudio}
                  playAudio={playAudio}
                  pauseAudio={pauseAudio}
                />
              );
            } else {
              return (
                <h5
                  style={{
                    position: "fixed",
                    bottom: "50px",
                    fontSize: "19px",
                    color: "red",
                    width: "100%",
                  }}
                >
                  Microphone Permission Denied
                </h5>
              );
            }
          }
        })()
      )}
    </div>
  );
}

export default VoiceAnalyser;
