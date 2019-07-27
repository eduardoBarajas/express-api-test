function request(req) {
    if (req === 'delete') {
        fetch('Api/NutriNet/Cliente/'+document.getElementById('operation_message').textContent.split(':')[1], {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            alert(`Se elimino el cliente`);
            clearClientInfo();
            request('get');
        });
    }

    if (req === 'post' || req === 'put') {
        let url = '';
        (req === 'post') ? url = 'Api/NutriNet/Cliente': url = 'Api/NutriNet/Cliente/'+document.getElementById('operation_message').textContent.split(':')[1];
        let data = {'Nombre': document.getElementById('inputNombre').value, 'Nombre_Usuario': document.getElementById('inputUsuario').value,
            'Correo_Electronico':  document.getElementById('inputEmail').value, 'Contrasena': document.getElementById('inputPass').value, 
            'Edad': document.getElementById('inputEdad').value, 'Estatura': document.getElementById('inputEstatura').value, 
            'Peso': document.getElementById('inputPeso').value, 'GEB': document.getElementById('inputGEB').value, 'Apellidos': 
            document.getElementById('inputApellidos').value};
        fetch(url, {
            method: req.toUpperCase(),
            body: JSON.stringify(data), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data['status'] !== null && data['status'] === 'Error') {
                let errMsg = '';
                for (var type in data['errors']) {
                    errMsg += `--${type}--:${data['errors'][type]}\n`;
                }
                alert(errMsg);
            } else {
                alert(`CVE_MENSAJE: ${data['_id']}`);
                request('get');
                clearClientInfo();
            }
        });
    }
    
    if (req === 'get') {
        fetch('Api/NutriNet/Cliente').then(response => {
            return response.json();
        }).then(data => {
            let index = 0;
            while (document.getElementById('table_row_' + index) !== null) {
                document.getElementsByClassName('table')[0].removeChild(document.getElementById('table_row_' + index));
                index++;
            }
            data.forEach(cliente => {
                let row = document.createElement('tbody');
                let content = document.createElement('tr');
                let nameCell = document.createElement('th');
                nameCell.scope = 'row';
                nameCell.textContent = cliente.Nombre;
                content.appendChild(nameCell);
                content.appendChild(createCell('td', cliente.Apellidos));
                content.appendChild(createCell('td', cliente.Nombre_Usuario));
                content.appendChild(createCell('td', cliente.Correo_Electronico));
                content.appendChild(createCell('td', cliente.Contrasena));
                if (cliente['Edad'] != null) {
                    content.appendChild(createCell('td', cliente.Edad));
                } else {
                    content.appendChild(createCell('td', 'No Definido'));
                }
                if (cliente['Estatura'] != null) {
                    content.appendChild(createCell('td', cliente.Estatura));
                } else {
                    content.appendChild(createCell('td', 'No Definido'));
                }
                if (cliente['Peso'] != null) {
                    content.appendChild(createCell('td', cliente.Peso));
                } else {
                    content.appendChild(createCell('td', 'No Definido'));
                }
                if (cliente['GEB'] != null) {
                    content.appendChild(createCell('td', cliente.GEB));
                } else {
                    content.appendChild(createCell('td', 'No Definido'));
                }
                row.appendChild(content);
                row.onclick = function clienteSeleccionado() {
                    updateClient(cliente);
                }
                row.id = 'table_row_' + data.indexOf(cliente);
                document.getElementsByClassName('table')[0].appendChild(row);
                initTransition('table');
            });
        });
    }
}

function addClient() {
    document.getElementById('btnActualizar').style.display = 'none';
    document.getElementById('btnEliminar').style.display = 'none';
    document.getElementById('btnGuardar').style.display = 'block';
    document.getElementById('operation_message').textContent = 'Agregar Nuevo Cliente';
    clearClientInfo();
    initTransition('form');
}

function createCell(type, text) {
    let cell = document.createElement(type);
    cell.textContent = text;
    return cell;
}

function updateClient(client) {
    document.getElementById('btnGuardar').style.display = 'none';
    document.getElementById('btnActualizar').style.display = 'block';
    document.getElementById('btnEliminar').style.display = 'block';
    document.getElementById('operation_message').textContent = 'Modificando Cliente con ID:'+client._id;
    setClientInfo(client);
    initTransition('form');
}

function initTransition(newTransition) {
    let options = {'table': 'form', 'form': 'table'};
    let old = document.getElementById('clients_'+options[newTransition]);
    let current = document.getElementById('clients_'+newTransition);
    if (old.classList.contains('fadeIn')) {
        old.classList.remove('fadeIn');
        old.style.display = 'none';
    } else {
        current.classList.remove('fadeIn');
        current.style.display = 'none';
    }
    setTimeout(e => {
        current.classList.add('fadeIn');
        current.style.display = 'block';
    },10);
}

function setClientInfo(client) {
    document.getElementById('inputNombre').value = client.Nombre;
    document.getElementById('inputApellidos').value = client.Apellidos;
    document.getElementById('inputUsuario').value = client.Nombre_Usuario;
    document.getElementById('inputEmail').value = client.Correo_Electronico;
    document.getElementById('inputPass').value = client.Contrasena;
    document.getElementById('inputEdad').value = client.Edad;
    document.getElementById('inputEstatura').value = client.Estatura;
    document.getElementById('inputPeso').value = client.Peso;
    document.getElementById('inputGEB').value = client.GEB;
}

function clearClientInfo() {
    document.getElementById('inputNombre').value = '';
    document.getElementById('inputApellidos').value = '';
    document.getElementById('inputUsuario').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputPass').value = '';
    document.getElementById('inputEdad').value = 0;
    document.getElementById('inputEstatura').value = 0;
    document.getElementById('inputPeso').value = 0;
    document.getElementById('inputGEB').value = 0;
}
