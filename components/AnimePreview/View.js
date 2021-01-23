import React from 'react';
import Link from 'next/link';

function AnimePreview(props) {
	const {id, name, thumbnail, episodeCount} = props;
	
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Link href="/animes/[id]" as={`/animes/${id}`}>
				<img src={thumbnail} alt="Anime Preview" />
			</Link>
			
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>{name}</span>
				<span>{episodeCount} episodios</span>
			</div>
		</div>
	)
}

export default React.memo(AnimePreview)
