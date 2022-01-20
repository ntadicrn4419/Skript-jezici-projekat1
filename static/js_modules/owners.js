function updateView(token){
    fetch('http://127.0.0.1:8000/admin/owners', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {

        const ownersDropdowns = document.getElementsByClassName('owners-dropdown');
        const tableBody = document.getElementById('owners');
        tableBody.innerHTML = "";
        ownersDropdowns.innerHTML = ""
        data.forEach(owner => {

            for(let i = 0; i < ownersDropdowns.length; i++){
               ownersDropdowns[i].innerHTML += `<option value="${owner.id}">Name:${owner.name} - Email:${owner.email}</option>`
            }

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
function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    updateView(token);

    document.getElementById("add-owner").addEventListener("click", e =>{
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
        }

        for(field in data){
            if(data[field] == "") {
                alert("Greska pri unosu. Polje: '" + field + "' je ostalo prazno");
                return;
            }
        }

        fetch('http://127.0.0.1:8000/admin/owners', {
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
    document.getElementById("delete-owner").addEventListener("click", e =>{
        e.preventDefault();
       
        const data = {
            id: document.getElementsByClassName('owners-dropdown')[0].value
        }

        fetch('http://127.0.0.1:8000/admin/owners/' + data.id, {
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
    document.getElementById("update-owner").addEventListener("click", e =>{
        e.preventDefault();
        
        ownerId = document.getElementsByClassName('owners-dropdown')[1].value;
        const data = {
            email: document.getElementById('email_update').value,
            name: document.getElementById('name_update').value
        }

        for(field in data){
            if(data[field] == "") {
                alert("Greska pri unosu. Polje: '" + field + "' je ostalo prazno");
                return;
            }
        }

        fetch('http://127.0.0.1:8000/admin/owners/' + ownerId, {
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