
const tasksDOM=document.querySelector(".tasks");
const loadingDOM=document.querySelector(".loading-text")
const taskInputDOM=document.querySelector(".task-input")
const formDOM=document.querySelector(".task-form")

//Load task from api/tasks/
const showTasks=()=>{
  loadingDOM.style.visibility="visible";
  try{
    fetch('/api/tasks/',{method:"GET"}).then(data=>{
      return data.json()
    }).then((data)=>{
      // console.log(data)
      // console.log(data.tasks)
      const tasks=data.tasks
      // console.log(dta)
      if(tasks.length<1){
        tasksDOM.innerHTML='No Tasks'
        loadingDOM.style.visibility="hidden";
        return;
      }
      const allTasks=tasks.map((task)=>{
        const {completed,_id:taskID,name}=task;
        if(completed){
          return `<div class="outer-container"><div class="single-task">
          <a class="edit-btn" href="task.html?id=${taskID}"><img src="./style/resource/edit.svg" alt="Edit Button" width="25" height=auto></a>
          <input type="image" src="./style/resource/exit.svg" class="delete-btn" id="${taskID}"></input>
          <input type="checkbox" checked=true id=${taskID} class="index-checkbox">
          <h5><s>${name}</s></h5>
          </div></div>`
        }else{ 
          return `<div class="outer-container"><div class="single-task">
          <a class="edit-btn" href="task.html?id=${taskID}"><img src="./style/resource/edit.svg" alt="Edit Button" width="25" height=auto></a>      
          <input type="image" src="./style/resource/exit.svg" class="delete-btn" id="${taskID}"></input>
          <input type="checkbox" class="index-checkbox" id=${taskID}>
          <h5>${name}</h5>
          </div></div>`
        }
        
      }).join("")
      tasksDOM.innerHTML=allTasks
    })
  }catch(err){
    console.log(err)
    tasksDOM.innerHTML="<h5>There was an error</h5>"
  }
  loadingDOM.style.visibility="hidden";
  
}
showTasks()

//delete task api/tasks/:id and modify if completed or not
tasksDOM.addEventListener("click",async(e)=>{
  // console.log(e.target.type)
  const el=e.target
  const taskID=el.id
  if(e.target.type==="checkbox"){
    try{
      await fetch(`/api/tasks/${taskID}`,{method:"PATCH",headers:{
          "Content-type":"application/json"
      },body:JSON.stringify({
          "completed":e.target.checked
      })})
      showTasks()
    }catch(err){
      console.log(err)
      alertDOM.innerHTML="There was an errro"
    }
  }
  if(e.target.type==="image"){
    try{
      loadingDOM.style.visibility="visible"
      await fetch(`/api/tasks/${taskID}/`,{method:"Delete"})
      showTasks()
    }catch(err){
      console.log(err)
    }
    loadingDOM.style.visibility="hidden"

  }
})

//add an element
formDOM.addEventListener("submit",async(e)=>{
  const taskName=taskInputDOM.value
  try{
    await fetch('/api/tasks/',{method:"POST",headers:{
      "Content-type":"application/json"
    },body:JSON.stringify({
      "name":taskName,
      "completed":false
    })})
    showTasks()
  }catch(err){
    console.log(err)
  }
})