function updateView(token){
    fetch('http://127.0.0.1:8000/admin/players', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {

        const playersDropdowns = document.getElementsByClassName('players-dropdown');
        const tableBody = document.getElementById('players');
        tableBody.innerHTML = "";
        playersDropdowns.innerHTML = ""
        data.forEach(player => {

            for(let i = 0; i < playersDropdowns.length; i++){
                playersDropdowns[i].innerHTML += `<option value="${player.id}">Name:${player.name} - Age:${player.age} - Opponent ID:${player.playerId} - Email:${player.email} - Match ID:${player.matchId} - Coach ID:${player.coachId}</option>`
            }

            tableBody.innerHTML += 
                 `
                 <tr>
                    <td>${player.id}</td>
                    <td>${player.name}</td>
                    <td>${player.age}</td>
                    <td>${player.playerId}</td>
                    <td>${player.email}</td>
                    <td>${player.matchId}</td>
                    <td>${player.coachId}</td>
                    <td>${player.ranking}</td>
                </tr>
                 `;
        })
    });
}

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    updateView(token);

    document.getElementById("add-player").addEventListener("click", e =>{
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            playerId: document.getElementById('playerId').value,
            email: document.getElementById('email').value,
            matchId: document.getElementById('matchId').value,
            coachId: document.getElementById('coachId').value,
            ranking: document.getElementById('ranking').value
        }

        let error = false;
        for(el in data){
            if(data[el] == "") {
                error = true;
            }
        }

        if(error){
            alert("Greska pri unosu. Ostalo je prazno polje.")
            return;
        }
        fetch('http://127.0.0.1:8000/admin/players', {
            method: 'POST',
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
    document.getElementById("delete-player").addEventListener("click", e =>{
        e.preventDefault();
       
        const data = {
            id: document.getElementsByClassName('players-dropdown')[0].value
        }

        fetch('http://127.0.0.1:8000/admin/players/' + data.id, {
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
    document.getElementById("update-player").addEventListener("click", e =>{
        e.preventDefault();
        

        const data = {
            id: document.getElementsByClassName('players-dropdown')[1].value,
            playerId: document.getElementById('playerId_update').value,
            email: document.getElementById('email_update').value,
            age: document.getElementById('age_update').value,
            ranking: document.getElementById('ranking_update').value,
            matchId: document.getElementById('matchId_update').value,
            coachId: document.getElementById('coachId_update').value
        }

        let error = false;
        for(el in data){
            if(data[el] == "") {
                error = true;
            }
        }

        if(error){
            alert("Greska pri unosu.")
            return;
        }
        fetch('http://127.0.0.1:8000/admin/players/' + data.id, {
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