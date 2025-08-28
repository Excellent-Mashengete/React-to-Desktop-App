import { useState, useEffect } from 'react';

function Search({ data }) {
    const { onSearchChange, searchQuery} = data;
    const [searchValue, setSearchValue] = useState(searchQuery || '');

    useEffect(() => {
        if (searchQuery !== searchValue) {
            setSearchValue(searchQuery);
        }
    }, [searchQuery]);

    const handleInputChange = event => {
        const value = event.target.value;
        setSearchValue(value);

        if (value.trim() === '') {
            onSearchChange('');
        }
    };

    const handleSearchQuery = () => {
        onSearchChange(searchValue);
    }

    return (
        <div className="form-control gap-2 flex flex-row">
            <label className="input w-100">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input 
                    type="search" 
                    className="grow"
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                />
            </label>
            <button className="btn btn-primary ml-2" onClick={handleSearchQuery}>Search</button>
        </div>
    );
}

export default Search