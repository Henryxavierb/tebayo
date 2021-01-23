import React from 'react';
import {API} from '../../services/axios';

function Anime({anime}) {
	// TODO: Finish category list
	const categoryList = () => React.useCallback(async () => {
		const categories = anime.relationships.categories.data;
		
		const getCategoryName = async (id) => {
			const {data} = await API.get(`/categories/${id}`);
			return data.data.attributes.title;
		}
		
		const categoriesName = await Promise.all(categories.map(category => {
			return getCategoryName(category.id)
		}));
		
		return categoriesName
	}, [anime])
	
	
	// const animeData = React.useMemo(() => ({
	// 	id: anime.id,
	// 	categories: anime.relationships.categories.data,
	// 	...anime.attributes
	// }), [anime])
	
	// console.log(animeData)
	
	return (<div/>
		// <span>Anime name: {titles.en}</span>
	)
}

export async function getServerSideProps(context) {
	const {id} = context.query;
	const animeData = await API.get(`/anime/${id}?include=categories`);
	
	return {
		props: {anime: {...animeData.data.data}}
	}
}

export default React.memo(Anime);
