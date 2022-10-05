const params=window.location.search
const id=new URLSearchParams(params).get('id')
const idDOM=document.querySelector('.task-edit-id')
const nameDOM=document.querySelector('.task-edit-name')
const completedDOM=document.querySelector('.task-edit-completed')
const alertDOM=document.querySelector('.form-alert')

const submitBtnDOM=document.querySelector('.task-edit-btn')

console.log(id)

const showTasks=()=>{
    try{
        fetch(`/api/tasks/${id}`,{method:"GET"})
        .then(data=>data.json())
        .then(data=>{
            console.log(data)
            idDOM.innerHTML=data._id
            nameDOM.value=data.name
            if(data.completed){
                completedDOM.checked=true
            }
        })
    }catch(err){
        console.log(err)
        alertDOM.innerHTML="There was an error"
    }
}

showTasks()

submitBtnDOM.addEventListener('click',(e)=>{
    console.log(e.target)
    try{
        fetch(`/api/tasks/${id}`,{method:"PATCH",headers:{
            "Content-type":"application/json"
        },body:JSON.stringify({
            "name":nameDOM.value,
            "completed":completedDOM.checked
        })})
    }catch(err){
        console.log(err)
        alertDOM.innerHTML="There was an errro"
    }
    
})


