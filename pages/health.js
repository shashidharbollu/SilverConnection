// pages/health.js

import React from 'react';
import Head from 'next/head';
import meditationImage from "../components/images/m.jpg";
import exerciseImage from "../components/images/exe.jpeg";
import eatHealthyImage from "../components/images/e.jpeg";
import sleepImage from "../components/images/h.jpeg";
import { Toolbar } from '../components/toolbar';
import Image from 'next/image';

const Health = () => {
  return (
    <div className="container">
      <Head>
        <title>Healthy Living Tips for Older Adults</title>
      </Head>

      <Toolbar />

      <header>
        <h1>Healthy Living Tips for Older Adults</h1>
      </header>

      <section>
        <h2>Meditation for Peace of Mind</h2>
        
        <Image src={meditationImage} alt="employee"  />

        <p>
          Incorporate meditation into your daily routine to reduce stress and promote mental well-being.
        </p>
        <p>
          <strong>Step-by-Step Guide:</strong>
        </p>
        <ol>
          <li>Find a quiet and comfortable place to sit or lie down.</li>
          <li>Close your eyes and take deep, slow breaths.</li>
          <li>Focus your attention on your breath or use guided meditation apps.</li>
          <li>Start with short sessions and gradually increase the duration.</li>
          <li>Practice consistently to experience the full benefits of meditation.</li>
        </ol>
      </section>

      <section>
        <h2>Stay Active with Gentle Exercises</h2>
        <Image src={exerciseImage} alt="employee"  />

        <p>
          Engage in low-impact exercises like walking or swimming to maintain mobility and overall health.
        </p>
        <p>
          <strong>Step-by-Step Guide:</strong>
        </p>
        <ol>
          <li>Consult with a healthcare professional before starting any exercise program.</li>
          <li>Choose activities that you enjoy and that match your fitness level.</li>
          <li>Start with short sessions and gradually increase the duration and intensity.</li>
          <li>Include a mix of aerobic, strength, and flexibility exercises in your routine.</li>
          <li>Listen to your body and make adjustments as needed to avoid injury.</li>
        </ol>
      </section>

      <section>
        <h2>Healthy Eating Habits</h2>
      
        <Image src={eatHealthyImage} alt="employee"  />

        <p>
          Consume a balanced diet rich in nutrients, including fruits, vegetables, and whole grains.
        </p>
        <p>
          <strong>Step-by-Step Guide:</strong>
        </p>
        <ol>
          <li>Include a variety of colorful fruits and vegetables in each meal.</li>
          <li>Choose whole grains over refined grains for added fiber and nutrients.</li>
          <li>Opt for lean protein sources like fish, poultry, beans, and nuts.</li>
          <li>Limit processed foods, sugary drinks, and excessive salt intake.</li>
          <li>Stay hydrated by drinking plenty of water throughout the day.</li>
        </ol>
      </section>

      <section>
        <h2>Quality Sleep Matters</h2>
        
        <Image src={sleepImage} alt="employee"  />

        <p>
          Ensure you get enough sleep each night to support your body's healing and rejuvenation.
        </p>
        <p>
          <strong>Step-by-Step Guide:</strong>
        </p>
        <ol>
          <li>Establish a regular sleep schedule, going to bed and waking up at the same time every day.</li>
          <li>Create a relaxing bedtime routine to signal your body that it's time to wind down.</li>
          <li>Keep your sleep environment comfortable, cool, and dark.</li>
          <li>Avoid stimulants like caffeine and electronics before bedtime.</li>
          <li>If sleep problems persist, consult with a healthcare professional.</li>
        </ol>
      </section>

      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          overflow-y: auto;
        }

        header {
          text-align: center;
          margin-bottom: 30px;
        }

        h1 {
          color: #333;
        }

        section {
          margin-bottom: 30px;
        }

        h2 {
          color: #333;
        }

        p {
          color: #666;
          line-height: 1.5;
        }

        ol {
          margin-top: 10px;
          padding-left: 20px;
        }

        image {
          max-width: 100%;
          height: auto;
          margin-top: 10px;
          position: center;
        }

        // Add the following styles for a fixed toolbar
        .toolbar {
          position: fixed;
          top: 0;
          width: 100%;
          background-color: #fff; // Adjust as needed
          z-index: 1000; // Ensure it's above other elements
        }
      `}</style>
    </div>
  );
};

export default Health;
