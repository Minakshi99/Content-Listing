import React, { useEffect, useState, useMemo } from 'react';
import ContentGrid from './components/ContentGrid'; // Import the ContentGrid component

import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

// Define the API URLs
const BASE_API_URL = 'https://test.create.diagnal.com/';
const DATA_API_PAGES = 'data/';

function App() {
  const [contentData, setContentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchData(1);
  }, []);

  useEffect(() => {
    let pageNumber = 1;
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // check this logic again
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Load more data when close to the end of the grid
        pageNumber++;
        fetchData(pageNumber);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(`${BASE_API_URL}${DATA_API_PAGES}page${pageNumber}.json`);
      const data = await response.json();
      const dataList = data.page['content-items']['content'];
       // Append the new data to existing contentData
      setContentData((prevData) => [...prevData, ...dataList]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = useMemo(() => {
    return contentData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contentData, searchQuery]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
  };


  return (
      <div className="App" style={{ backgroundColor: '#171717', fontFamily: "'Titillium Web', sans-serif !important" }}>
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: 400,
            margin: '50px auto',
            padding: '2px 4px',
            justifyContent: 'space-between'
          }}
        >
          <SearchIcon sx={{ p: 1, color: 'grey.400' }} />
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            sx={{ ml: 1, flex: 1, color: 'black',   paddingRight: '40px'}}
          />
        </Paper>
        {/* Use the ContentGrid component */}
        <ContentGrid contentData={filteredData} />
      </div>
    );
}

export default App;
