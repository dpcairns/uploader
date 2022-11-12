export async function fetchImages() {
  const raw = await fetch('/.netlify/functions/image_fetch');
  const json = await raw.json();

  return json;
}

export async function uploadImage(img) {
  const raw = await fetch(`/.netlify/functions/image_upload?key=${img.name}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: img // body data type must match "Content-Type" header

  });
  const json = await raw.json();
    
  return json;
}
