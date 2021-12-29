function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8000/admin/coaches', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {

            const tableBody = document.getElementById('coaches');

            data.forEach(coach => {

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