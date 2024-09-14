import React, { useState, useEffect } from 'react';
import './scroll.css';

export default function Scroll({ url }) {
    const [data, setData] = useState([]);  // We expect data.products to be an array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [scrollPercentage, setScrollPercentage] = useState(0); // Add scroll percentage state

    async function fetchData(getUrl) {
        try {
            setLoading(true);
            const response = await fetch(getUrl);
            const jsonData = await response.json();  // jsonData contains the entire API response

            // Check if jsonData has products, and then set it directly to the state
            if (jsonData && jsonData.products) {
                setData(jsonData.products);  // Set the 'products' array directly into state
            } else {
                throw new Error('No products found in response');
            }
        } catch (e) {
            console.log(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(url);  // Trigger the data fetch
    }, [url]);  // Only fetch data when URL changes

    // Scroll percentage handler
    function handleScrollPercentage() {
        const scrolled =
            document.body.scrollTop || document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrollPercent = (scrolled / height) * 100;
        setScrollPercentage(scrollPercent);
    }

    // Effect for setting up the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScrollPercentage);
        
        return () => {
            window.removeEventListener('scroll', handleScrollPercentage); // Proper cleanup
        };
    }, []);

    return (
        <div>
            <h1>Scroll Indicator</h1>

            {/* Scroll Progress Bar */}
            <div className="scroll-progress-tracking-container">
                <div
                    className="current-progress-bar"
                    style={{ width: `${scrollPercentage}%` }}  // Update width dynamically
                ></div>
            </div>

            {loading && <p>Loading...</p>}  {/* Show loading message */}
            {error && <p>Error: {error}</p>}  {/* Show error message */}

            <div className="data-container">
                {!loading && !error && data.length > 0 ? (
                    data.map((dataItem) => (
                        <p key={dataItem.id}>{dataItem.title}</p>  // Display each product title
                    ))
                ) : null}
            </div>
        </div>
    );
}
