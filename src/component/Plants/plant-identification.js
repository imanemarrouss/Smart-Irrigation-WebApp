
const fs = require('fs'); // File System
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams

// Paths to your images
const image_1 = "image_1.png"; // Replace with your actual image path
const image_2 = "image_2.png"; // Replace with your actual image path

(async () => {
  const form = new FormData();
  
  // Add the type of plant organ being observed
  form.append('organs', 'flower'); 
  form.append('images', fs.createReadStream(image_1)); 

  form.append('organs', 'leaf'); 
  form.append('images', fs.createReadStream(image_2)); 

  const project = 'all'; // Change to specific project if desired

  try {
    const { status, data } = await axios.post(
      `https://my-api.plantnet.org/v2/identify/${project}?api-key=2b10dBkOX36k0lm4QqSynmbdAe`, // Replace with your API key
      form,
      {
        headers: form.getHeaders() // Set the headers for form data
      }
    );

    console.log('status', status); // Should be: 200
    console.log('data', require('util').inspect(data, false, null, true)); // Display the result
  } catch (error) {
    console.error('error', error.response ? error.response.data : error.message); // Log any errors
  }
})();