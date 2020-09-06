import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {ChangeEvent, useState} from 'react'

import digitsToWords from "../lib/digits-to-words"

export default function Home() {
  const [currencyText, setCurrencyText] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const words = digitsToWords(e.target.value);
      setCurrencyText(words ? words[0].toUpperCase() + words.substr(1) : '');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Money Machine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Turn digits into text!</h1>

        <input
            className={styles.currencyInput}
            onChange={handleChange}
        />

        <p className={styles.currencyText}>
            {currencyText}
        </p>
      </main>
    </div>
  )
}
