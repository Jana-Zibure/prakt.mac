document.addEventListener('DOMContentLoaded', iegūtUzdevumus);
document.querySelector('#task-form').addEventListener('submit', pievienotUzdevumu);
document.querySelector('#task-list').addEventListener('click', noņemtUzdevumu);

function iegūtUzdevumus() {
    let uzdevumi;
    if(localStorage.getItem('uzdevumi') === null) {
        uzdevumi = [];
    } else {
        uzdevumi = JSON.parse(localStorage.getItem('uzdevumi'));
    }

    console.log('Ielādētie uzdevumi no vietējās atmiņas:', uzdevumi);

    uzdevumi.forEach(function(uzdevums) {
        izveidotUzdevumaElementu(uzdevums);
    });
}

function pievienotUzdevumu(e) {
    e.preventDefault();

    const uzdevumaIevade = document.querySelector('#task-input').value;
    console.log('Pievieno uzdevumu:', uzdevumaIevade);

    izveidotUzdevumaElementu(uzdevumaIevade);

    saglabātUzdevumuVietējāAtmiņā(uzdevumaIevade);

    document.querySelector('#task-form').reset();
}

function izveidotUzdevumaElementu(uzdevums) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(uzdevums));

    const dzēstPoga = document.createElement('button');
    dzēstPoga.appendChild(document.createTextNode('Dzēst'));
    li.appendChild(dzēstPoga);

    document.querySelector('#task-list').appendChild(li);

    console.log('Izveidots uzdevuma elements:', li);
}

function saglabātUzdevumuVietējāAtmiņā(uzdevums) {
    let uzdevumi;
    if(localStorage.getItem('uzdevumi') === null) {
        uzdevumi = [];
    } else {
        uzdevumi = JSON.parse(localStorage.getItem('uzdevumi'));
    }
    uzdevumi.push(uzdevums);
    localStorage.setItem('uzdevumi', JSON.stringify(uzdevumi));

    console.log('Uzdevums saglabāts vietējā atmiņā:', uzdevumi);
}

function noņemtUzdevumu(e) {
    if(e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();

        noņemtUzdevumuNoVietējāsAtmiņas(e.target.parentElement.textContent.slice(0, -5));
    }
}

function noņemtUzdevumuNoVietējāsAtmiņas(uzdevums) {
    let uzdevumi;
    if(localStorage.getItem('uzdevumi') === null) {
        uzdevumi = [];
    } else {
        uzdevumi = JSON.parse(localStorage.getItem('uzdevumi'));
    }

    uzdevumi.forEach(function(saglabātsUzdevums, indekss) {
        if(saglabātsUzdevums === uzdevums) {
            uzdevumi.splice(indekss, 1);
        }
    });

    localStorage.setItem('uzdevumi', JSON.stringify(uzdevumi));

    console.log('Uzdevums noņemts no vietējās atmiņas:', uzdevumi);
}