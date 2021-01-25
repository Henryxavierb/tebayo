import Head from 'next/head';
require('../styles/index.less');
import {API} from '../services/axios';
import Spinner from '../components/Spinner';
import React, {lazy, Suspense} from 'react';
import Catalog from "../components/Catalog";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import AnimeCount from "../components/AnimeCount";

export default function Home() {
	const [search, updateSearch] = React.useState('');
	const [animes, updateAnimes] = React.useState({});
	const [isLoading, updateLoadingBehavior] = React.useState(true);
	
	async function fetchAnimes(additionalParams) {
		// TODO: Handle behavior if input search is empty
		const {data} = await API.get(`/anime?page[limit]=15${additionalParams}`);
		
		updateAnimes(data);
		updateLoadingBehavior(false);
	}
	
	React.useEffect(() => {
		fetchAnimes()
	}, []);
	
	async function paginate(paginationType) {
		updateLoadingBehavior(true);
		const {data} = await API.get(animes.links[paginationType])
		updateAnimes(data);
		updateLoadingBehavior(false);
	};
	
	const filterAnime = React.useCallback((search) => {
		updateLoadingBehavior(true);
		fetchAnimes(`&filter[text]=${search}`)
	}, [search]);
	
	const isPreviosButtonDisabled = React.useMemo(() => {
		return !animes.links?.prev;
	}, [animes.links]);
	
	const isNextButtonDisabled = React.useMemo(() => {
		return !animes.links?.next;
	}, [animes.links]);
	
	const isDisabled = {
		nextButton: isNextButtonDisabled,
		previousButton: isPreviosButtonDisabled,
	}
	
	return (
		<div>
			<Head>
				<title>Tebayo</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			
			<SearchBar
				search={search}
				updateSearch={updateSearch}
				filterAnime={() => filterAnime(search)}
			/>
			
			<main>
				<AnimeCount animes={animes}/>
				
				{isLoading ? <Spinner/> : <Catalog animes={animes.data}/>}
				
				{!isLoading && (
					<Pagination
						isDisabled={isDisabled}
						onNext={() => paginate('next')}
						onPrev={() => paginate('prev')}
					/>
				)}
			</main>
		</div>
	)
}
