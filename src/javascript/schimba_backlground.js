import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { pexels_api_key } from './api';
import '../css/vreme_curenta.css';

function ImageSearch({ data }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (data && data.city) {
            searchImage();
        }
    }, [data]);

    const searchImage = async () => {
        const url = `https://api.pexels.com/v1/search?query=${data.city}&per_page=1`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': pexels_api_key
                }
            });
            setImageUrl(response.data.photos[0].src.original);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.position = 'relative';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.position = '';
        };
    }, [imageUrl]);

    return (
        <>
        </>
    );
}

export default ImageSearch;
