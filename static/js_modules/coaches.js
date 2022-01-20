function updateView(token){
    fetch('http://127.0.0.1:8000/admin/coaches', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {

        const coachesDropdowns = document.getElementsByClassName('coaches-dropdown');
        const tableBody = document.getElementById('coaches');
        tableBody.innerHTML = "";
        coachesDropdowns.innerHTML = "";
        data.forEach(coach => {

            for(let i = 0; i < coachesDropdowns.length; i++){
                coachesDropdowns[i].innerHTML += `<option value="${coach.id}">Name:${coach.name} - Email:${coach.email} - PlayerId:${coach.playerId} </option>`
            }

            tableBody.innerHTML += 
                 `
                 <tr>
                    <td>${coach.id}</td>
                    <td>${coach.name}</td>
                    <td>${coach.age}</td>
                    <td>${coach.playerId}</td>
                    <td>${coach.email}</td>
                </tr>
                 `;
        })
    });
}

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    updateView(token);

    document.getElementById("delete-coach").addEventListener("click", e =>{
        e.preventDefault();
       
        const data = {
            id: document.getElementsByClassName('coaches-dropdown')[0].value
        }

        fetch('http://127.0.0.1:8000/admin/coaches/' + data.id, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data) 
        })
            .then( res => res.json() )
            .then( data => {
                if(data.msg){
                    alert(data.msg);
                }else{
                    location.reload();
                }
            });
    }); 

    document.getElementById("update-coach").addEventListener("click", e =>{
        e.preventDefault();

        coachId = document.getElementsByClassName('coaches-dropdown')[1].value;
        const data = {
            email: document.getElementById('email_update').value,
            playerId: document.getElementById('playerId_update').value,
        }

        for(field in data){
            if(data[field] == "") {
                alert("Greska pri unosu. Polje: '" + field + "' je ostalo prazno");
                return;
            }
        }
        
        fetch('http://127.0.0.1:8000/admin/coaches/' + coachId, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data) 
        })
            .then( res => res.json() )
            .then( data => {
                if(data.msg){
                    alert(data.msg);
                }
                else {
                    location.reload();
                }
            });
    });
    
}