import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ImagePreview = ({ filename }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const host = "http://localhost:5000"

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${host}/api/getfile/${filename}`);
                setImageUrl(`data:<span class="math-inline">\ {response\ .data\ .file\ }; base64, </span> {response.data.data}`);
            } catch (error) {
                setError(error.message || 'Failed to fetch image');
            }
        };

        if (filename) {
            fetchImage();
            console.log(imageUrl);
        }
    }, [filename]);

  return (
    <div>
      <div>
            {imageUrl && (
                <img src={imageUrl} alt={filename} />
            )}
            {error && <p>Error: {error}</p>}
        </div>
    </div>
  );
}

export default ImagePreview;
