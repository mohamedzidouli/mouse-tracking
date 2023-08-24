import { useState, useEffect } from 'react';
import { logKeyboardEvents, logMouseCoordinates, removeEventListeners } from 't-mouse';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
export const postData = async (url, data) => {

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log('Saved data:', responseData);
  } catch (error) {
    console.error('Error saving data:', error);

  }

};




export const handleSaveData = async (data) => {
  try {
    const formattedData = data.map(({ mouseCoordinates, keyboardCoordinates }) => ({
      mouseCoordinates,
      keyboardCoordinates,
    }));
    await postData('http://localhost:3000/data', formattedData);
  } catch (error) {
    console.error('Error saving data:', error);
  }

};




export const MouseKey = () => {
  const [data, setData] = useState([]);
  const [isRecording, setIsRecording] = useState(true);
  const [classifier, setClassifier] = useState(null);




  useEffect(() => {
    const loadTrainingData = async () => {
      const botTrainingData = require('./b1.json');
      const humanTrainingData = require('./h1.json');
      console.log(botTrainingData);

      const knn = knnClassifier.create();


      botTrainingData.forEach((data) => {
        const tensor = tf.tensor(data);
        knn.addExample(tensor, 'bot');

      });




      humanTrainingData.forEach((data) => {
        const tensor = tf.tensor(data);
        knn.addExample(tensor, 'human');
      });


      setClassifier(knn);

    };


    loadTrainingData();
  }, []);


  useEffect(() => {

    if (isRecording) {
      const mouseCoordinates = logMouseCoordinates();
      const keyboardCoordinates = logKeyboardEvents();

      setData((prevData) => [
        ...prevData,
        { mouseCoordinates, keyboardCoordinates },
      ]);

    }
  }, [isRecording]);




  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsRecording(false);
      removeEventListeners();
      handleSaveData(data);

      if (classifier) {
        const newData = data.map(({ mouseCoordinates, keyboardCoordinates }) => {
          const mouseData = {
            clickCount: mouseCoordinates.data.clickCount,
            moves: mouseCoordinates.data.moves.map(move => [move.x, move.y, move.time]),
            clicks: mouseCoordinates.data.clicks.map(click => [click.button, click.duration, click.time]),
            scrollCount: mouseCoordinates.data.scrollCount
          };
      
          const keyboardData = {
            keysPressed: keyboardCoordinates.keysPressed,
            keydownTime: keyboardCoordinates.keydownTime,
            keyupTime: keyboardCoordinates.keyupTime
          };
      
          return [mouseData, keyboardData];
        });
      
        newData.forEach(async (data) => {
          const tensor = tf.tensor(data);
          const result = await classifier.predictClass(tensor);
          console.log('Prediction:', result.label);
        });
      }

    }, 10000);




    return () => {
      clearTimeout(timerId);
    };
  }, [data, classifier]);


  return null;

};