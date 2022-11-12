import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchImages, uploadImage } from './fetch-utils.js';

function App() {
  async function loadImages() {
    setLoading(true);
    const imageData = await fetchImages();

    setImages(imageData);
    setLoading(false);
  }

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});

  function handleFileSelect(e) {
    setSelectedImage(e.target.files[0]);
  }

  async function handleImageUpload(e) {
    e.preventDefault();
    setLoading(true);
    await uploadImage(selectedImage);
    setSelectedImage({});
    await loadImages();
    setLoading(false);
    e.target.reset();
  }

  useEffect(() => {

    if (images.length === 0) loadImages();
  }, [images.length]);
  return (
    <div className="App">
      <section>
        <form onSubmit={handleImageUpload}>
          <label>
            <input type="file" onChange={handleFileSelect} />
          </label>
          {
            loading 
              ? <div className="lds-circle"><div></div></div>
              : <button>
                Upload Image
              </button>

          }
        </form>
      </section>
      <main>
        <h3>gallery:</h3>
        <div className='gallery'>
          {
            images.map(img => 
              <img key={img} src={img} alt={img} />)
          }
        </div>
      </main>
    </div>
  );
}

export default App;
