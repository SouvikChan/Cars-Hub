"use client"
import React, { useState, useEffect, MouseEvent } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import styled from './styled.module.css';

import { getRandomNumber } from "@random";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

const Dictaphone = () => {
    const [additionalText, setAditionalText] = useState<number | undefined>(undefined);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (transcript) {
            setAditionalText(getRandomNumber());
        }
    }, [transcript])

    if (!browserSupportsSpeechRecognition) {
        return <p>Browser doesn't support speech recognition.</p>;
    }

    const handleToggleListening = (e: MouseEvent<HTMLButtonElement>) => {
        resetTranscript();
        setAditionalText(undefined)
        if (listening) {
            SpeechRecognition.stopListening();
        }
        if (!listening) {
            SpeechRecognition.startListening();
        }
    }

    return (
        <div className={styled.widget}>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button className={styled.button + " " + (listening ? styled.buttonActive : '')} onClick={handleToggleListening}>
                <FontAwesomeIcon icon={listening ? faMicrophone : faMicrophoneSlash} />
            </button>
            <p className={styled.result}>{transcript}{additionalText}</p>
        </div>
    );
};
export default Dictaphone;