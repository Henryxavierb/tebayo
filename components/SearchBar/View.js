import React from 'react';

function SearchBar(props) {
	const {search, updateSearch} = props;
	
	return (
		<div>
			<input value={search} onChange={updateSearch} />
			<button>Buscar</button>
		</div>
	)
}

export default React.memo(SearchBar)
