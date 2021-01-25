import React from 'react';

function AnimeCount({animes}) {
	const animeTotal = React.useMemo(() => animes.meta?.count || 0, [animes.meta]);
	const animeCount = React.useMemo(() => animes.data?.length || 0, [animes.meta]);
	
	const animeResult = React.useMemo(() => {
		const SINGULAR_COUNT = animeCount < 2;
		return SINGULAR_COUNT ? 'result' : 'results';
	}, [animeCount]);
	
	return (
		<React.Fragment>
			<span className="anime-count">
					<span>Showing</span>
					<b>{animeCount}</b>
					<span>{animeResult} out of</span>
					<b>{animeTotal}</b>
				</span>
		</React.Fragment>
	)
}

export default React.memo(AnimeCount)
