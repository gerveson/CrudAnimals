document.addEventListener('DOMContentLoaded', function() {
    const itemList = document.getElementById('item-list');
    const itemForm = document.getElementById('item-form');

    function listItems() {
        fetch('http://cafepradev.com.br:21020/animals/list')
            .then(response => response.json())
            .then(data => {
                itemList.innerHTML = '';
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.innerText = item.name;

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-danger btn-sm float-end';
                    deleteButton.innerText = 'Deletar';
                    deleteButton.addEventListener('click', function() {
                        deleteItem(item.id);
                    });

                    listItem.appendChild(deleteButton);
                    itemList.appendChild(listItem);
                });
            })
            .catch(error => console.error(error));
    }
    itemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemName = document.getElementById('itemName').value;

        fetch('http://cafepradev.com.br:21020/animals/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: itemName
            })
        })
        .then(response => response.json())
        .then(() => {
            listItems();
            document.getElementById('itemName').value = '';
        })
        .catch(error => console.error(error));
    });
    function deleteItem(itemId) {
        fetch(`http://cafepradev.com.br:21020/animals/delete${itemId}`, {
            method: 'DELETE'
        })
        .then(() => {
            listItems();
        })
        .catch(error => console.error(error));
    }
    listItems();
});
