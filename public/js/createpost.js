 
var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dcthyhdxe', 
  uploadPreset: 'ml_default'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 
      
      if (result.info.format === "jpg"|| result.info.format === "png"|| result.info.format === "svg"||result.info.format === "jpeg" ) {
        document.getElementById('image_url').value = result.info.secure_url
      } else {
        document.getElementById('video_url').value = result.info.secure_url
      }
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);
