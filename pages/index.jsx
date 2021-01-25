import React from 'react';
import Head from 'next/head';
require('../styles/index.less');
import {API} from '../services/axios';
import Router, {useRouter} from "next/router";
import Spinner from '../components/Spinner';
import Catalog from "../components/Catalog";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import AnimeCount from "../components/AnimeCount";

export default function Home() {
	const router = useRouter();
	const {query = ''} = router.query;
	
	const [search, updateSearch] = React.useState(query);
	const [animes, updateAnimes] = React.useState({});
	const [isLoading, updateLoadingBehavior] = React.useState(true);
	
	async function fetchAnimes(additionalParams) {
		const {data} = await API.get(`/anime?page[limit]=15${additionalParams}`);
		return data;
	}
	
	async function handleFetchAnime(additionalParams) {
		updateLoadingBehavior(true);
		
		const collection = await fetchAnimes(additionalParams);
		updateAnimes(collection);
		
		updateLoadingBehavior(false);
	}
	
	React.useEffect(() => {
		query ? filterAnime(query) : handleFetchAnime();
	}, [query]);
	
	async function paginate(paginationType) {
		updateLoadingBehavior(true);
		const {data} = await API.get(animes.links[paginationType]);
		
		updateAnimes(data);
		updateLoadingBehavior(false);
	};
	
	const filterAnime = React.useCallback((search) => {
		handleFetchAnime(`&filter[text]=${search}`);
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
				
				{isLoading ? <Spinner className="loader"/> : <Catalog animes={animes.data}/>}
				
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
