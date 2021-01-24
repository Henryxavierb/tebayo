import React from 'react';
import {API} from '../../services/axios';

function Anime({anime, categories, episodes}) {
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
	
	return (
		<div>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<img src={animeData.thumbnails.small} alt={"Anime"} height={300}/>
				
				<div style={{display: 'flex', flexDirection: 'column', margin: '10px 24px'}}>
					<h1>{animeData.title}</h1>
					<span>Alternatives name: {alternativeNames}</span>
					<span>{animeData.ageRatingGuide}</span>
					<span>Status: {status}</span>
					<span>Categories: {getCategories}</span>
				</div>
			</div>
			
			<p style={{marginTop: '56px'}}>{animeData.description}</p>
			
			{animeData.trailer && (
				<div>
					<iframe
						frameBorder="0"
						allowFullScreen
						src={`https://www.youtube.com/embed/${animeData.trailer}`}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					/>
				</div>
			)}
			
			<div>
			
			</div>
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
