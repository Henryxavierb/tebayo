import React from 'react';
import {Input} from 'antd';
require('../styles/searchBar.less');

function SearchBar(props) {
	const {search, updateSearch, filterAnime} = props;
	
	return (
		<div className="navbar">
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
		</div>
	)
}

export default React.memo(SearchBar)
