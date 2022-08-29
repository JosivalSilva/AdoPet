function showThumbnail(filess) {
  var url = filess.value;
  var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  if (filess.files && filess.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
    var reader = new FileReader();
      reader.onload = function (e) {
        console.log(e)
        document.getElementById('imagemUsuario').setAttribute('src', e.target.result);
        document.getElementById('logoUsuario').setAttribute('src', e.target.result);  
    }
    reader.readAsDataURL(filess.files[0]);
  }
}
