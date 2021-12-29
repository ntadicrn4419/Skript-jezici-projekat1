function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8000/admin/tournaments', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {

            const tableBody = document.getElementById('tournaments');

            data.forEach(tournament => {

                tableBody.innerHTML += 
                    `
                    <tr>
                        <td>${tournament.id}</td>
                        <td>${tournament.name}</td>
                        <td>${tournament.location}</td>
                        <td>${tournament.startDate}</td>
                        <td>${tournament.endDate}</td>
                    </tr>
                    `;
            })
        });  
}