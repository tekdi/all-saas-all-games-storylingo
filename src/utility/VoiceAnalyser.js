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
import Satya1 from '../assets/audio/Satya1.m4a'
import Satya2 from '../assets/audio/Satya2.m4a'
import Satya3 from '../assets/audio/Satya3.m4a'
import Satya4 from '../assets/audio/Satya4.m4a'
import Satya5 from '../assets/audio/Satya5.m4a'
import Satya6 from '../assets/audio/Satya6.m4a'
import Satya7 from '../assets/audio/Satya7.m4a'
import Satya8 from '../assets/audio/Satya8.m4a'
import Satya9 from '../assets/audio/Satya9.m4a'
import Satya10 from '../assets/audio/Satya10.m4a'
import Satya11 from '../assets/audio/Satya11.m4a'
import Satya12 from '../assets/audio/Satya12.m4a'
import Satya13 from '../assets/audio/Satya13.m4a'
import Satya14 from '../assets/audio/Satya14.m4a'
import Satya15 from '../assets/audio/Satya15.m4a'
import Satya16 from '../assets/audio/Satya16.m4a'
import Satya17 from '../assets/audio/Satya17.m4a'
import Satya18 from '../assets/audio/Satya18.m4a'
import Satya19 from '../assets/audio/Satya19.m4a'
import Satya20 from '../assets/audio/Satya20.m4a'
import Satya21 from '../assets/audio/Satya21.m4a'
import Cats_fault1 from '../assets/audio/Cat’s_fault1.m4a'
import Cats_fault2 from '../assets/audio/Cat’s_fault2.m4a'
import Cats_fault3 from '../assets/audio/Cat’s_fault3.m4a'
import Cats_fault4 from '../assets/audio/Cat’s_fault4.m4a'
import Cats_fault5 from '../assets/audio/Cat’s_fault5.m4a'
import Cats_fault6 from '../assets/audio/Cat’s_fault6.m4a'
import Cats_fault7 from '../assets/audio/Cat’s_fault7.m4a'
import Cats_fault8 from '../assets/audio/Cat’s_fault8.m4a'
import Cats_fault9 from '../assets/audio/Cat’s_fault9.m4a'

import AudioCompare from "./AudioCompare";
import Loader from "./Loader";
import { interactCall } from "../services/callTelemetryIntract";
import { response } from "../services/telementryService";
import { compareArrays } from "./helper";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import S3Client from '../config/config';


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
  3: {
    0:Satya1,
    1: Satya2,
    2: Satya3,
    3: Satya4,
    4: Satya5,
    5: Satya6,
    6: Satya7,
    7: Satya8,
    8: Satya9,
    9: Satya10,
    10: Satya11,
    11: Satya12,
    12: Satya13,
    13: Satya14,
    14: Satya15,
    15: Satya16,
    16: Satya17,
    17: Satya18,
    18: Satya19,
    19: Satya20,
    20: Satya21,
  },
  4: {
    0: Cats_fault1,
    1: Cats_fault2,
    2: Cats_fault3,
    3: Cats_fault4,
    4: Cats_fault5,
    5: Cats_fault6,
    6: Cats_fault7,
    7: Cats_fault8,
    8: Cats_fault9,
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
    console.log( AudioPath,currentIndex,props.storyLine);
    set_temp_audio(new Audio(AudioPath[currentIndex][props.storyLine]));
    setPauseAudio(val);
  };

  const [lang_code, set_lang_code] = useState(
    localStorage.getItem('apphomelang')
      ? localStorage.getItem('apphomelang')
      : 'en'
  );

  const DEFAULT_ASR_LANGUAGE_CODE = "ai4bharat/whisper-medium-en--gpu--t4";
  const HINDI_ASR_LANGUAGE_CODE = 'ai4bharat/conformer-hi-gpu--t4';
  const TAMIL_ASR_LANGUAGE_CODE = 'ai4bharat/conformer-multilingual-dravidian-gpu--t4';

  const [asr_language_code, set_asr_language_code] = useState(
    DEFAULT_ASR_LANGUAGE_CODE
  );


  useEffect(() => {
  switch (lang_code) {
  case 'hi':
  	set_asr_language_code(HINDI_ASR_LANGUAGE_CODE);
  	break;
    case 'ta':
  	set_asr_language_code(TAMIL_ASR_LANGUAGE_CODE);
  	break;
  default:
  	set_asr_language_code(DEFAULT_ASR_LANGUAGE_CODE);
  	break;
  }
  }, []);

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
      fetchASROutput(lang_code, recordedAudioBase64);
    }
  }, [recordedAudioBase64]);
  useEffect(() => {
    // props.updateStory();
    props.setVoiceText(ai4bharat);
    props.setRecordedAudio(recordedAudio);
  }, [ai4bharat]);

  const fetchASROutput = async (sourceLanguage, base64Data) => {
    const asr_api_key = process.env.REACT_APP_ASR_API_KEY;
    const URL = process.env.REACT_APP_URL;
    let samplingrate = 30000;
    if (lang_code === 'ta') {
      samplingrate = 16000;
    }
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
    fetch(apiURL, requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        var apiResponse = JSON.parse(result);
        setAi4bharat(
          apiResponse["output"][0]["source"] != ""
            ? apiResponse["output"][0]["source"]
            : "-"
        );

        if (process.env.REACT_APP_CAPTURE_AUDIO === 'true') {
          let getContentId = parseInt(localStorage.getItem('index'));
          let storyline = parseInt(localStorage.getItem('storySentenceId'));
          var audioFileName = `${process.env.REACT_APP_CHANNEL}/${localStorage.getItem('contentSessionId')===null?
          localStorage.getItem('StorylingoContentSessionId'):
          localStorage.getItem('contentSessionId')}-${Date.now()}-${getContentId}-${storyline}.wav`;
          localStorage.setItem('audioFileName',audioFileName)
           const command = new PutObjectCommand({
           Bucket: process.env.REACT_APP_AWS_s3_BUCKET_NAME,
           Key: audioFileName,
           Body: Uint8Array.from(window.atob(base64Data), (c) => c.charCodeAt(0)),
           ContentType: 'audio/wav'
         });

         try {
           const response = await S3Client.send(command);
         } catch (err) {
           console.error(err);
         }

       }


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