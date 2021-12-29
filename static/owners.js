function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8000/admin/owners', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {

            const tableBody = document.getElementById('owners');

            data.forEach(owner => {

                tableBody.innerHTML += 
                    `
                    <tr>
                        <td>${owner.id}</td>
                        <td>${owner.name}</td>
                        <td>${owner.email}</td>
                    </tr>
                    `;
            })
        });  
}