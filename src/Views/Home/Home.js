import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Home.css';
import NewsArticle from '../../component/NewsArticle/NewsArticle';

function Home() {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('bhandara');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadNews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2024-02-29&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}`);
            setNews(response.data.articles);
        } catch (error) {
            setError('Failed to load news articles. Please try again later.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <h1>News App</h1>

            <input 
                type='text'
                className='search-input'
                value={searchQuery}
                onChange={handleInputChange}
            />

            {loading && <p>Loading...</p>}
            {error && <p className='error-message'>{error}</p>}

            <div className='news-container'>
                {news.map((newsArticle) => {
                    const { author, title, description, url, urlToImage, publishedAt } = newsArticle;
                    return (
                        <NewsArticle 
                            key={url}  // Using URL as a unique key
                            author={author} 
                            title={title} 
                            description={description} 
                            url={url} 
                            urlToImage={urlToImage} 
                            publishedAt={publishedAt} 
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
