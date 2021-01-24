import React from 'react';
import Head from 'next/head';
import {API} from '../services/axios';
import styles from '../styles/Home.module.css'
import Catalog from "../components/Catalog";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function Home() {
	const [search, updateSearch] = React.useState('');
	const [animes, updateAnimes] = React.useState({});
	
	async function fetchAnimes(additionalParams) {
		const {data} = await API.get(`/anime?page[limit]=15${additionalParams}`);
		updateAnimes(data);
	}
	
	React.useEffect(() => {
		fetchAnimes()
	}, []);
	
	async function paginate(paginationType) {
		const {data} = await API.get(animes.links[paginationType])
		updateAnimes(data);
	};
	
	const filterAnime = React.useCallback((search) => {
		fetchAnimes(`&filter[text]=${search}`)
	}, [search]);
	
	const isPreviosButtonDisabled = React.useMemo(() => {
		return !animes.links?.prev;
	}, [animes.links]);
	
	const isNextButtonDisabled = React.useMemo(() => {
		return !animes.links?.next;
	}, [animes.links]);
	
	const animeCount = React.useMemo(() => {
		return `Exibindo ${animes.data?.length || 0} resultados de ${animes.meta?.count || 0}`
	}, [animes.meta]);
	
	const isDisabled = {
		nextButton: isNextButtonDisabled,
		previousButton: isPreviosButtonDisabled,
	}
	
	return (
		<div className={styles.container}>
			<Head>
				<title>Tebayo</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			
			<main className={styles.main}>
				<SearchBar
					search={search}
					updateSearch={updateSearch}
					filterAnime={() => filterAnime(search)}
				/>
				
				<span>{animeCount}</span>
				
				<Catalog animes={animes.data} />
				
				<Pagination
					isDisabled={isDisabled}
					onNext={() => paginate('next')}
					onPrev={() => paginate('prev')}
				/>
			</main>
		</div>
	)
}
