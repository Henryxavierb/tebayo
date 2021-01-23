import React from 'react';
import AnimePreview from '../AnimePreview/View';

function Catalog(props) {
	const {animes} = props;
	
	const catalog = React.useMemo(() => {
		return animes.map(anime => ({
			id: anime.id,
			...anime.attributes
		}))
	}, [animes]);
	
	console.log('Anime: ', catalog);
	
	return (
		<ul>
			{catalog.map(anime => (
				<li key={anime.id}>
					<AnimePreview
						id={anime.id}
						name={anime.titles.en}
						episodeCount={anime.episodeCount}
						thumbnail={anime.posterImage.small}
					/>
				</li>
			))}
		</ul>
	)
}

export default React.memo(Catalog);
