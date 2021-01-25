import React from 'react';
import Router from 'next/router';

require('../../styles/anime.less');
import {API} from '../../services/axios';
import SearchBar from "../../components/SearchBar";

function Anime({anime, categories, episodes}) {
	const [search, updateSearch] = React.useState('');
	
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
		return animeData.status === isFinished ? 'Completo' : 'Em lançamento'
	}, [animeData]);
	
	const alternativeNames = React.useMemo(() => {
		return Object.values(anime.titles).join(', ');
	});
	
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

export async function getServerSideProps(context) {
	const {id} = context.query;
	
	const animeData = await API.get(`/anime/${id}`);
	const categoryData = await API.get(`/anime/${id}/categories`);
	const episodesData = await API.get(`/anime/${id}/episodes`);
	
	const anime = animeData.data.data;
	
	return {
		props: {
			anime: {id: anime.id, ...anime.attributes},
			categories: categoryData.data.data,
			episodes: episodesData.data.data,
		}
	}
}

export default React.memo(Anime);
