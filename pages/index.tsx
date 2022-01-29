import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState, ReactElement } from "react";
import styles from "./index.module.css";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const Home: NextPage = () => {
  return (
    <div className={styles.gameGrid}>
      <Head>
        <title>Wordle Clone</title>
        <meta
          name="description"
          content="Kind of cool Wordle clone (totally not done before)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{/*Just for CSS Grid*/}</div>
      <GameBoard />
      <div>{/*Just for CSS Grid*/}</div>
    </div>
  );
};

const GameBoard = () => {
  const [length, setLength] = useState<number>(5); // columns
  const [numberOfAttempts, setNumberOfAttempts] = useState<number>(6); // rows
  const [turn, setTurn] = useState<number>(0); // which component we're one
  const [word, setWord] = useState<string>("cream"); // word from WordsAPI

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

  const createBoard = (
    length: number,
    numberOfAttempts: number
  ): Array<ReactElement> => {
    const elements = [];

    for (var i = 0; i <= numberOfAttempts - 1; i++) {
      elements.push(
        <BoardRow key={i} length={length} numberOfAttempts={numberOfAttempts} />
      );
    }

    return elements;
  };

  return <div id="coolBoard">{createBoard(length, numberOfAttempts)}</div>;
};

type BoardRowProps = {
  length: number;
  numberOfAttempts: number;
};

const BoardRow = ({ length, numberOfAttempts }: BoardRowProps) => {
  const [text, setText] = useState<string>("");

  const gridColumnsStyle = {
    "grid-template-columns": Array.from(Array(length))
      .map(() => {
        return "1fr";
      })
      .join(" "),
  };

  const createCells = (): Array<ReactElement> => {
    const cells = [];

    for (var i = 0; i <= length - 1; i++) {
      cells.push(<div key={i}>I am a cell</div>);
    }

    return cells;
  };

  return (
    <div className={styles.boardRow} style={gridColumnsStyle}>
      {createCells()}
    </div>
  );
};

export default Home;
