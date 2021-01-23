import React from 'react';
import Head from 'next/head';
import {API} from '../services/axios';
import styles from '../styles/Home.module.css'
import Catalog from "../components/Catalog/View";
import SearchBar from "../components/SearchBar/View";

export default function Home() {
 const [search, updateSearch] = React.useState('');
  const [animes, updateAnimes] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchAnimes() {
     const { data } = await API.get("/anime?include=categories");
     updateAnimes(data.data);
    }
 
   fetchAnimes();
  }, []);
  
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Tebayo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       <SearchBar {...{search, updateSearch}} />
       
       <Catalog animes={animes} />
      </main>
    </div>
  )
}
