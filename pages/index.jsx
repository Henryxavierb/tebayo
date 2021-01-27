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
	const { query = '' } = router.query;
	
	const [search, updateSearch] = React.useState(query);
	const [animeList, updateAnimeList] = React.useState({});
	const [isLoading, updateLoadingBehavior] = React.useState(true);
	
	async function fetchAnimeList(additionalParams = '') {
		const {data} = await API.get(`/anime?page[limit]=20&page[offset]=50${additionalParams}`);
		return data;
	}
	
	async function handleFetchAnime(additionalParams) {
		updateLoadingBehavior(true);
		
		const collection = await fetchAnimeList(additionalParams);
		updateAnimeList(collection);
		
		updateLoadingBehavior(false);
	}
	
	React.useEffect(() => {
		handleFetchAnime();
	}, []);
	
	async function paginate(paginationType) {
		updateLoadingBehavior(true);
		const {data} = await API.get(animeList.links[paginationType]);

		updateAnimeList(data);
		updateLoadingBehavior(false);
	};
	
	const filterAnime = React.useCallback((search) => {
		handleFetchAnime(`&filter[text]=${search}`);
	}, [search]);
	
	const isPreviousButtonDisabled = React.useMemo(() => {
		return !animeList.links?.prev;
	}, [animeList.links]);
	
	const isNextButtonDisabled = React.useMemo(() => {
		return !animeList.links?.next;
	}, [animeList.links]);
	
	const isDisabled = {
		nextButton: isNextButtonDisabled,
		previousButton: isPreviousButtonDisabled,
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
				<AnimeCount animes={animeList}/>
				
				{isLoading ? <Spinner className="loader"/> : <Catalog animes={animeList.data}/>}
				
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