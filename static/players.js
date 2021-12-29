function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8000/admin/players', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {

            const tableBody = document.getElementById('players');

            data.forEach(player => {

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
                        
                    </tr>
                    `;
            })
        });  
}