function updateView(token){
    fetch('http://127.0.0.1:8000/admin/tournaments', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {

        const tournamentsDropdowns = document.getElementsByClassName('tournaments-dropdown');
        const tableBody = document.getElementById('tournaments');
        tableBody.innerHTML = "";
        tournamentsDropdowns.innerHTML = ""
        data.forEach(tournament => {

            for(let i = 0; i < tournamentsDropdowns.length; i++){
                tournamentsDropdowns[i].innerHTML += `<option value="${tournament.id}">Name:${tournament.name} - Location:${tournament.location} - Start date:${tournament.startDate} - End date:${tournament.endDate} - OwnerId:${tournament.ownerId}</option>`
            }

            tableBody.innerHTML += 
                    `
                    <tr>
                        <td>${tournament.id}</td>
                        <td>${tournament.name}</td>
                        <td>${tournament.location}</td>
                        <td>${tournament.startDate}</td>
                        <td>${tournament.endDate}</td>
                        <td>${tournament.ownerId}</td>
                    </tr>
                    `;
        })
    });
}

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    updateView(token);
    
    document.getElementById("add-tournament").addEventListener("click", e =>{
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            location: document.getElementById('location').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            ownerId: document.getElementById('ownerId').value
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
        fetch('http://127.0.0.1:8000/admin/tournaments', {
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

    document.getElementById("delete-tournament").addEventListener("click", e =>{
        e.preventDefault();
       
        const data = {
            id: document.getElementsByClassName('tournaments-dropdown')[0].value
        }

        fetch('http://127.0.0.1:8000/admin/tournaments/' + data.id, {
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


    document.getElementById("update-tournament").addEventListener("click", e =>{
        e.preventDefault();
        
        tournamentId =  document.getElementsByClassName('tournaments-dropdown')[1].value;
        const data = {
            startDate: document.getElementById('startDate_update').value,
            endDate: document.getElementById('endDate_update').value,
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
        fetch('http://127.0.0.1:8000/admin/tournaments/' + tournamentId, {
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