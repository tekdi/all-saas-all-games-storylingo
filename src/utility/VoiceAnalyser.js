import React, { useState, useEffect } from "react";
import Eidgah2 from "../assets/audio/Eidgah2.m4a";
import Eidgah3 from "../assets/audio/Eidgah3.m4a";
import Eidgah4 from "../assets/audio/Eidgah4.m4a";
import Eidgah5 from "../assets/audio/Eidgah5.m4a";
import Eidgah6 from "../assets/audio/Eidgah6.m4a";
import Eidgah7 from "../assets/audio/Eidgah7.m4a";
import Eidgah8 from "../assets/audio/Eidgah8.m4a";
import Eidgah9 from "../assets/audio/Eidgah9.m4a";
import Eidgah10 from "../assets/audio/Eidgah10.m4a";
import Eidgah11 from "../assets/audio/Eidgah11.m4a";
import Eidgah12 from "../assets/audio/Eidgah12.m4a";
import Eidgah13 from "../assets/audio/Eidgah13.m4a";
import Eidgah14 from "../assets/audio/Eidgah14.m4a";
import Eidgah15 from "../assets/audio/Eidgah15.m4a";
import Eidgah16 from "../assets/audio/Eidgah16.m4a";
import Eidgah17 from "../assets/audio/Eidgah17.m4a";
import Eidgah18 from "../assets/audio/Eidgah18.m4a";
import Eidgah19 from "../assets/audio/Eidgah19.m4a";
import Eidgah20 from "../assets/audio/Eidgah20.m4a";
import Eidgah21 from "../assets/audio/Eidgah21.m4a";
import Eidgah22 from "../assets/audio/Eidgah22.m4a";
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
import Letter1 from "../assets/audio/Letter1.m4a";
import Letter2 from "../assets/audio/Letter2.m4a";
import Letter3 from "../assets/audio/Letter3.m4a";
import Letter4 from "../assets/audio/Letter4.m4a";
import Letter5 from "../assets/audio/Letter5.m4a";
import Letter6 from "../assets/audio/Letter6.m4a";
import Letter7 from "../assets/audio/Letter7.m4a";
import Letter8 from "../assets/audio/Letter8.m4a";
import Letter9 from "../assets/audio/Letter9.m4a";
import Letter10 from "../assets/audio/Letter10.m4a";
import Letter11 from "../assets/audio/Letter11.m4a";
import Letter12 from "../assets/audio/Letter12.m4a";
import Letter13 from "../assets/audio/Letter13.m4a";
import Letter14 from "../assets/audio/Letter14.m4a";
import Letter15 from "../assets/audio/Letter15.m4a";
import Letter16 from "../assets/audio/Letter16.m4a";
import Azhaguthaan1 from "../assets/audio/Azhaguthaan1.m4a";
import Azhaguthaan2 from "../assets/audio/Azhaguthaan2.m4a";
import Azhaguthaan3 from "../assets/audio/Azhaguthaan3.m4a";
import Azhaguthaan4 from "../assets/audio/Azhaguthaan4.m4a";
import Azhaguthaan5 from "../assets/audio/Azhaguthaan5.m4a";
import Azhaguthaan6 from "../assets/audio/Azhaguthaan6.m4a";
import Azhaguthaan7 from "../assets/audio/Azhaguthaan7.m4a";
import Azhaguthaan8 from "../assets/audio/Azhaguthaan8.m4a";
import Azhaguthaan9 from "../assets/audio/Azhaguthaan9.m4a";
import Azhaguthaan10 from "../assets/audio/Azhaguthaan10.m4a";
import Azhaguthaan11 from "../assets/audio/Azhaguthaan11.m4a";
import Azhaguthaan12 from "../assets/audio/Azhaguthaan12.m4a";
import Azhaguthaan13 from "../assets/audio/Azhaguthaan13.m4a";
import Azhaguthaan14 from "../assets/audio/Azhaguthaan14.m4a";
import Azhaguthaan15 from "../assets/audio/Azhaguthaan15.m4a";
import Azhaguthaan16 from "../assets/audio/Azhaguthaan16.m4a";
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
    0: Eidgah2,
    1: Eidgah3,
    2: Eidgah4,
    3: Eidgah5,
    4: Eidgah6,
    5: Eidgah7,
    6: Eidgah8,
    7: Eidgah9,
    8:Eidgah10,
    9:Eidgah11,
    10:Eidgah12,
    11:Eidgah13,
    12:Eidgah14,
    13:Eidgah15,
    14:Eidgah16,
    15:Eidgah17,
    16:Eidgah18,
    17:Eidgah19,
    18:Eidgah20,
    19:Eidgah21,
    20:Eidgah22
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
  5: {
    0: Letter1,
    1: Letter2,
    2: Letter3,
    3: Letter4,
    4: Letter5,
    5: Letter6,
    6: Letter7,
    7: Letter8,
    8: Letter9,
    9: Letter10,
    10: Letter11,
    11: Letter12,
    12: Letter13,
    13: Letter14,
    14: Letter15,
    15: Letter16,
  },
  6: {
    0: Azhaguthaan1,
    1: Azhaguthaan2,
    2: Azhaguthaan3,
    3: Azhaguthaan4,
    4: Azhaguthaan5,
    5: Azhaguthaan6,
    6: Azhaguthaan7,
    7: Azhaguthaan8,
    8: Azhaguthaan9,
    9:Azhaguthaan10,
    10:Azhaguthaan11,
    11:Azhaguthaan12,
    13:Azhaguthaan13,
    14:Azhaguthaan14,
    15:Azhaguthaan15,
    16:Azhaguthaan16,
  },
  
};
const currentIndex = localStorage.getItem("index");
// console.log("get current index", currentIndex);
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

  const [lang_code, set_lang_code] = useState(
    localStorage.getItem('apphomelang')
      ? localStorage.getItem('apphomelang')
      : 'en'
  );

  const DEFAULT_ASR_LANGUAGE_CODE = 'ai4bharat/whisper--gpu-t4';
  const HINDI_ASR_LANGUAGE_CODE = 'ai4bharat/conformer-hi--gpu-t4';
  const TAMIL_ASR_LANGUAGE_CODE = 'ai4bharat/conformer-multilingual-dravidian--gpu-t4';

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