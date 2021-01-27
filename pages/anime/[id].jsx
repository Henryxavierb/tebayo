import React from 'react';
require('../../styles/anime.less');
import {API} from '../../services/axios';
import Spinner from "../../components/Spinner";
import Router, { useRouter } from 'next/router';
import SearchBar from "../../components/SearchBar";

function Anime({anime}) {
	const { isFallback } = useRouter();

	if(isFallback) {
		return <Spinner className="loader"/>
	}

	const [search, updateSearch] = React.useState('');
	const [categories, updateCategories] = React.useState([]);

	async function fetchCategories() {
		const categoriesData = await API.get(`/anime/${anime.id}/categories`);
		updateCategories(categoriesData.data.data);
	}

	React.useEffect(() => {
		fetchCategories()
	}, []);

	const getCategories = React.useMemo(() => {
		return categories.map(category => category.attributes.title).join(', ')
	}, [categories]);

	const animeData = React.useMemo(() => ({
		status: anime.status || false,
		thumbnails: anime.posterImage,
		title: anime.canonicalTitle || '',
		lastModified: anime.updatedAt || '',
		description: anime.description || '',
		trailer: anime.youtubeVideoId || null,
		episodeCount: anime.episodeCount || 0,
		ageRatingGuide: anime.ageRatingGuide || '',
	}), [anime]);

	const status = React.useMemo(() => {
		const isFinished = 'finished';
		return animeData?.status === isFinished ? 'Completo' : 'Em lançamento'
	}, [animeData]);

	const alternativeNames = React.useMemo(() => {
		return Object.values(anime.titles).join(', ');
	}, [anime]);

	const filterAnime = () => {
		Router.push({
			pathname: '/',
			query: {query: search}
		});
	}
	
	return (
		<div className="anime-container">
			<SearchBar
				search={search}
				updateSearch={updateSearch}
				filterAnime={() => filterAnime(search)}
			/>

			<main>
				<div>
					<img src={animeData.thumbnails.small} alt={"Anime"} height={300}/>

					<div>
						<h1>{animeData.title}</h1>

						<span>
							<b>Alternatives name: </b>
							{alternativeNames}
						</span>

						<b>{animeData.ageRatingGuide}</b>
						<span>
							<b>Status: </b>
							{status}
						</span>

						<span>
							<b>Categories: </b>
							{getCategories}
						</span>
					</div>
				</div>

				<p className="anime-description">{animeData.description}</p>

				<h1 className="trailer-title">Trailer</h1>

				<div className="trailer-container">
					{animeData.trailer ? (
						<iframe
							frameBorder="0"
							allowFullScreen
							src={`https://www.youtube.com/embed/${animeData.trailer}`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						/>
					) : (
						<span>No trailers currently available.</span>
					)}
				</div>
			</main>
		</div>
	)
}

/*
	getStaticPaths can generate static page at build time to all anime included in "/anime".
	If fallback passed on return is false, any anime not included in "/anime" will be redirect to "Not found" page.
	However, if fallback is false, will be generate a new static page at run time.
*/
export async function getStaticPaths() {
	const res = await API.get('/anime');
	const animeList = res.data.data;

	/* Getting a required param to fetch page data. In this case, anime id. */
	const paths = animeList.map(anime => `/anime/${anime.id}`);
	return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
	const animeData = await API.get(`/anime/${params.id}`);
	const anime = animeData.data.data;
	
	return {
		props: {
			anime: {id: anime.id, ...anime.attributes},
		}
	}
}

export default React.memo(Anime);
