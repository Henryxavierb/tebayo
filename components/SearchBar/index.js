import React from 'react';

function SearchBar(props) {
	const { search, updateSearch, filterAnime } = props;
	
	return (
		<div>
			<input value={search} onChange={(event) => updateSearch(event.target.value)} />
			<button type={'button'} onClick={() => filterAnime()}>Buscar</button>
		</div>
	)
}

export default React.memo(SearchBar)
