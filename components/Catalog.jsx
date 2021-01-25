import React from 'react';
require('../styles/catalog.less');
import AnimePreview from './AnimePreview';

function Catalog(props) {
	const { animes = [] } = props;
	
	const ellipses = React.useCallback((phrase) => {
		const LIMIT_WORD_RANGE = 16;
		const newPhrase = phrase.substr(0, LIMIT_WORD_RANGE).concat('...');
		
		return String(phrase).length > LIMIT_WORD_RANGE ? newPhrase : phrase;
	}, [animes]);
	
	const catalog = React.useMemo(() => {
		return animes.map(anime => ({
			id: anime.id,
			episodeCount: anime.attributes.episodeCount || 0,
			thumbnail: anime.attributes.posterImage?.medium || '',
			title: ellipses(anime.attributes.canonicalTitle) || '',
		}))
	}, [animes]);
	
	return (
		<ul className="catalog-container">
			{catalog.map(({ id, title, thumbnail, episodeCount }) => {
				return (
					<li key={id}>
						<AnimePreview
							id={id}
							name={title}
							thumbnail={thumbnail}
							episodeCount={episodeCount}
						/>
					</li>
				);
			})}
		</ul>
	);
}

export default React.memo(Catalog);
