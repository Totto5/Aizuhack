const baseUrl = "";


async function remind(taskObj) {
  return await fetch(`${baseUrl}/remind`, {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify(taskObj)
  });
}
async function getMusicList() {
  const res=await fetch(`${baseUrl}/music/list`, {
    method: "GET",
    mode: 'cors',
  });
  return await res.json()
}

function dateFormat(date_str){
  const t=new Date(date_str)
  return t.toISOString().slice(0,-5)
}

window.onload = async function () {
  // 音楽一覧取得処理
  const musicList = await getMusicList();

  const select1=document.getElementById("music1");
  for(let i=0;i<musicList.length;i++){
    const option = document.createElement('option');
    option.value = musicList[i].id;
    option.textContent = musicList[i].file_name;
    select1.appendChild(option);
  }
  const select2=document.getElementById("music2");
  for(let i=0;i<musicList.length;i++){
    const option = document.createElement('option');
    option.value = musicList[i].id;
    option.textContent = musicList[i].file_name;
    select2.appendChild(option);
  }
  const select3=document.getElementById("music3");
  for(let i=0;i<musicList.length;i++){
    const option = document.createElement('option');
    option.value = musicList[i].id;
    option.textContent = musicList[i].file_name;
    select3.appendChild(option);
  }
  const select4=document.getElementById("music4");
  for(let i=0;i<musicList.length;i++){
    const option = document.createElement('option');
    option.value = musicList[i].id;
    option.textContent = musicList[i].file_name;
    select4.appendChild(option);
  }
  const select5=document.getElementById("music5");
  for(let i=0;i<musicList.length;i++){
    const option = document.createElement('option');
    option.value = musicList[i].id;
    option.textContent = musicList[i].file_name;
    select5.appendChild(option);
  }

  // タスク登録処理
  let OkButton = document.getElementById("OkButton");
  const List_Link = document.getElementById("List_Link");
  OkButton.addEventListener("click", async function () {
    let name = document.getElementById("taskInput");
    let since = document.getElementById("since");
    let until = document.getElementById("until");
    let Music1 = document.getElementById("music1");
    let Music2 = document.getElementById("music2");
    let Music3 = document.getElementById("music3");
    let Music4 = document.getElementById("music4");
    let Music5 = document.getElementById("music5");

    let since_val=new Date(since.value)
    since_val.setHours(since_val.getHours() + 9);
    since_val=since_val.toISOString().split(".")[0]

    let until_val=new Date(until.value)
    until_val.setHours(until_val.getHours() + 9);
    until_val=until_val.toISOString().split(".")[0]
    


    const select1_num=Music1.selectedIndex;
    const music1 = Music1.options[select1_num].value;
    const select2_num=Music2.selectedIndex;
    const music2 = Music2.options[select2_num].value;
    const select3_num=Music3.selectedIndex;
    const music3 = Music3.options[select3_num].value;
    const select4_num=Music4.selectedIndex;
    const music4 = Music4.options[select4_num].value;
    const select5_num=Music5.selectedIndex;
    const music5 = Music5.options[select5_num].value;

    const taskObj = {
      name: name.value,
      since: since_val,
      until: until_val,
      musics: [music1,music2,music3,music4,music5]
    };

    await remind(taskObj);
  });
};


