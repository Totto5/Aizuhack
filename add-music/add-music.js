const baseURL = '';

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    console.log(file.name);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch(`${baseURL}/music/${file.name}`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
 	      credentials: "same-origin",
        
 	      
      })
        .then(response => {
          if (response.ok) {
            console.log('ファイルがアップロードされました');
            window.alert('ファイルがアップロードされました');
            
          } else {
            console.error('ファイルのアップロードに失敗しました:', response.status);
          }
        })
        .catch(error => {
          console.error('エラー:', error);
        });
    } else {
      console.error('ファイルが選択されていません');
    }
  }

  function showAlert(message){
    window.alert(message);
  }