const baseUrl = '';

//サーバーからJSONのデータを取得
async function getTasks() {
  const response = await fetch(`${baseUrl}/remind`, {
    mode:"cors",
    method: 'GET',
 
  });
  const body = await response.json();
  return body;
}

function deleteTaskById(id) {
  return fetch(`${baseUrl}/remind/${id}`, {
    method: 'DELETE',
  });
}

//Dateの表示形式を変える関数
function taskDate(task) {

  const jsonDate = task.until;
  const dateObj = new Date(jsonDate);
  
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  
    return `${year}年 ${month}月${day}日 ${hour}時${minute}分`;
    // console.log(formattedDate);
}

  function limit(task) {
  const jsonDate = task.until;
  const dateObj = new Date(jsonDate);
  const nowTime = new Date();


    return dateObj - nowTime;
 }
 

async function update() {
  const taskList = document.getElementById('task-list');
  const taskArray = await getTasks();


setInterval(function(){
  const l_val= limit(taskArray[0])
  console.log(l_val);
  if(l_val>0){
     $("#seg").sevenSegArray({digits:6, value:parseInt(l_val/1000) },)
  }else{
     $("#seg").sevenSegArray({digits:6, value:0})
  }
},1)

  while (taskList.firstChild !== null) {
    taskList.removeChild(taskList.firstChild);
  }

  console.log(taskArray)

  for (let i = 0; i < taskArray.length; i++) {
    const task = taskArray[i];

    
        const taskDiv_area = document.createElement('div');
        const taskDiv_date_flame = document.createElement('div');
        const taskDiv_date = document.createElement('div');
        const taskDiv_text_flame = document.createElement('div');
        const taskDiv_text = document.createElement('div');

        taskDiv_area.className = 'task_area';
        taskDiv_date.className = 'task_date';
        taskDiv_date_flame.className = 'task_date_flame';
        taskDiv_text.className = 'task_text';
        taskDiv_text_flame.className = 'task_text_flame';
        
        //taskの内容
        taskDiv_text.append(task.name);

        taskDiv_text_flame.appendChild(taskDiv_text);

        //dateの内容
        taskDiv_date.append(taskDate(task));

        taskDiv_date_flame.appendChild(taskDiv_date);

        //areaで囲う
        taskDiv_area.appendChild(taskDiv_date_flame);
        taskDiv_area.appendChild(taskDiv_text_flame);

    

    //jsonのオブジェクト指定
    //taskDiv.append("タスク名："+task.name +" "+task.since +" ~ "+ task.until);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task_delete';
    deleteButton.type = 'button';
    deleteButton.addEventListener('click', async () => {
      await deleteTaskById(task.id);
      update();
    });
    deleteButton.textContent = '削除';
    // taskDiv.append(deleteButton);
    taskDiv_area.appendChild(deleteButton);

    // taskList.append(taskDiv);
    taskList.append(taskDiv_area);
  }
};

update();

