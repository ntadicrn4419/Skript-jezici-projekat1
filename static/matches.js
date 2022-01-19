function updateView(token){
    fetch('http://127.0.0.1:8000/admin/matches', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {

        const matchesDropdowns = document.getElementsByClassName('matches-dropdown');
        const tableBody = document.getElementById('matches');
        tableBody.innerHTML = "";
        matchesDropdowns.innerHTML = "";
        data.forEach(match => {

            for(let i = 0; i < matchesDropdowns.length; i++){
                matchesDropdowns[i].innerHTML += `<option value="${match.id}">Court:${match.court} - Date:${match.date} - Time:${match.time} - Round:${match.round} - TournamentId:${match.tournamentId}</option>`
            }

            tableBody.innerHTML += 
                 `
                 <tr>
                    <td>${match.id}</td>
                    <td>${match.court}</td>
                    <td>${match.date}</td>
                    <td>${match.time}</td>
                    <td>${match.round}</td>
                    <td>${match.tournamentId}</td>
                </tr>
                 `;
        })
    });
}

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    updateView(token);
    
    document.getElementById("add-match").addEventListener("click", e =>{
        e.preventDefault();
        const data = {
            court: document.getElementById('court').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            round: document.getElementById('round').value,
            tournamentId: document.getElementById('tournamentId').value
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
        fetch('http://127.0.0.1:8000/admin/matches', {
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

    document.getElementById("delete-match").addEventListener("click", e =>{
        e.preventDefault();
       
        const data = {
            id: document.getElementsByClassName('matches-dropdown')[0].value
        }

        fetch('http://127.0.0.1:8000/admin/matches/' + data.id, {
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


    document.getElementById("update-match").addEventListener("click", e =>{
        e.preventDefault();
        
        matchId = document.getElementsByClassName('matches-dropdown')[1].value;
        const data = {
            court: document.getElementById('court_update').value,
            date: document.getElementById('date_update').value,
            time: document.getElementById('time_update').value,
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
        fetch('http://127.0.0.1:8000/admin/matches/' + matchId, {
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