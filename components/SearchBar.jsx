import React from 'react';
import {Input} from 'antd';
require('../styles/search.bar.less');

function SearchBar(props) {
	const {search, updateSearch, filterAnime} = props;
	
	return (
		<form className="navbar" onSubmit={(event) => event.preventDefault()}>
			<Input
				size="large"
				value={search}
				className="search-bar-input"
				placeholder="Search anime (Type only anime's name)"
				onChange={(event) => updateSearch(event.target.value)}
			/>
			
			<button
				size="large"
				type="primary"
				className="search-bar-button"
				onClick={() => filterAnime()}
			>
				Buscar
			</button>
		</form>
	)
}

export default React.memo(SearchBar)
