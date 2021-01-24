import React from 'react';
import Link from 'next/link';
import '../styles/anime.preview.less';

function AnimePreview(props) {
	const { id, name = '', thumbnail = '', episodeCount = 0 } = props;
	
	const totalEpisode = React.useMemo(() => {
		const hasOneEpisode = episodeCount === 1;
		return hasOneEpisode ? `${episodeCount} episode` : `${episodeCount} episodes`
	}, [episodeCount]);
	
	const linkTo = React.useMemo(() => `/anime/${id}`, [id]);
	
	return (
		<div className="anime-preview-container">
			<Link href={linkTo}>
				<a style={{cursor: 'pointer'}}>
					<img src={thumbnail} alt="Anime Preview" />
				</a>
			</Link>
			
			<div>
				<span>{name}</span>
				<span>{totalEpisode}</span>
			</div>
		</div>
	);
}

export default React.memo(AnimePreview);
