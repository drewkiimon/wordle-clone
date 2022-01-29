import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

import axios from "axios";

const Home: NextPage = () => {
  return (
    <div className={styles.gameContainer}>
      <Head>
        <title>Wordle Clone</title>
        <meta
          name="description"
          content="Kind of cool Wordle clone (totally not done before)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GameBoard />
    </div>
  );
};

const GameBoard = () => {
  const [length, setLength] = useState<number>(5);
  const [numberOfAttempts, setNumberOfAttempts] = useState<number>(6);
  const [turn, setTurn] = useState<number>(0);
  const [word, setWord] = useState<string>("");

  // console.log("AAAA lalala", process.env.APIKEY, process.env.APIHOST);

  useEffect(() => {
    const getWord = async () => {
      const options = {
        method: "GET",
        url: "https://wordsapiv1.p.rapidapi.com/words/",
        params: {
          letterPattern: "^[a-z]+$",
          letters: length,
          limit: "1",
          page: "1",
          hasDetails: "definitions",
          random: "true",
          partofspeech: "adjective",
        },
        headers: {
          "x-rapidapi-host": process.env.NEXT_PUBLIC_APIHOST,
          "x-rapidapi-key": process.env.NEXT_PUBLIC_APIKEY,
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getWord();
  }, []);

  return <div id="coolBoard"></div>;
};

type BoardRowProps = {
  length: number;
};

const BoardRow = ({ length }: BoardRowProps) => {
  const [text, setText] = useState<string>("");
};

export default Home;
