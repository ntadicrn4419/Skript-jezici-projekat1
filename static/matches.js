function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8000/admin/matches', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {

            const tableBody = document.getElementById('matches');

            data.forEach(match => {

                tableBody.innerHTML += 
                    `
                    <tr>
                        <td>${match.id}</td>
                        <td>${match.court}</td>
                        <td>${match.date}</td>
                        <td>${match.time}</td>
                        <td>${match.round}</td>
                    </tr>
                    `;
            })
        });  
}