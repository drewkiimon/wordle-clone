import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
  const [length, setLength] = useState<number>(5); // columns
  const [numberOfAttempts, setNumberOfAttempts] = useState<number>(6); // rows
  const [turn, setTurn] = useState<number>(0); // which component we're one
  const [word, setWord] = useState<string>(""); // word from WordsAPI

  useEffect(() => {
    const getWord = async () => {
      if (process.env.NEXT_PUBLIC_APIHOST && process.env.NEXT_PUBLIC_APIKEY) {
        const options: AxiosRequestConfig = {
          method: "GET",
          url: process.env.NEXT_PUBLIC_API_URL,
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
          const response: AxiosResponse = await axios.request(options);
          const { word: returnedWord } = response.data;

          setWord(returnedWord);
        } catch (err) {
          console.log(err);
        }
      }
    };

    // getWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createBoard = (length: number, numberOfAttempts: number) => {};

  return <div id="coolBoard"></div>;
};

type BoardRowProps = {
  length: number;
};

const BoardRow = ({ length }: BoardRowProps) => {
  const [text, setText] = useState<string>("");
};

export default Home;
