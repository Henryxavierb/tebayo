import React from 'react';
import Link from 'next/link';
import Spinner from "./Spinner";
require('../styles/anime.preview.less');

function AnimePreview(props) {
	const {id, name = '', thumbnail = '', episodeCount} = props;
	const [isLoading, updateLoadingBehavior] = React.useState(false);
	
	const totalEpisode = React.useMemo(() => {
		const THERE_IS_EPISODE = episodeCount < 2;
		return THERE_IS_EPISODE ? `${episodeCount || 0} episode` : `${episodeCount} episodes`
	}, [episodeCount]);
	
	const linkTo = React.useMemo(() => `/anime/${id}`, [id]);
	
	return (
		<div className="anime-preview-container">
			<Link href={linkTo}>
				<a onClick={() => updateLoadingBehavior(true)}>
					<img src={thumbnail} alt="Anime Preview"/>
					{isLoading && <Spinner className="loading" />}
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
