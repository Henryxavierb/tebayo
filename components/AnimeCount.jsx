import React from 'react';

function AnimeCount({animes}) {
	const animeTotal = React.useMemo(() => animes.meta?.count || 0, [animes.meta]);
	const animeCount = React.useMemo(() => animes.data?.length || 0, [animes.meta]);
	
	return (
		<React.Fragment>
			<span className="anime-count">
					<span>Showing</span>
					<b>{animeCount}</b>
					<span>results out of</span>
					<b>{animeTotal}</b>
				</span>
		</React.Fragment>
	)
}

export default React.memo(AnimeCount)
