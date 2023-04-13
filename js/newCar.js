var cars = []
var editoradd = 'add';

function fillform(data) {
    const formelement = ['model', 'number', 'capacity', 'rent'];
    for (let i = 0; i < formelement.length; i++) {
        console.log($('#' + formelement[i]));
        $('#' + formelement[i]).val(cars[data][formelement[i]]);
        $('#editornew').html('Edit');
        editoradd = 'edit';
    }
}
async function getcars() {
    await isAuthorised();
    if (userType != 'agency') {
        $('body').html('<p>Not authorised</p>');
        return;
    }

    try {
        var id = localStorage.getItem('isloggedin');
        await fetch(`http://localhost:4000/cars/agency/${id}`, {
            method: 'GET',
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(response => { console.log(response); return response.json() })
            .then(data => {
                cars = data.cars;
                var listHtml = ''
                cars.map((car, i) => {
                    listHtml +=
                        `<div class="card carItem" style="width: 18rem;" onclick="fillform(${i});">
                        <div class="card-body">
                            <h5 class="card-title">${car.model}</h5>
                            <p class="card-text text-center">${car.number}</p>
                            <p class="card-text mt-2"><strong>Capacity:</strong> ${car.capacity}</p>
                            <p class="card-text"><strong>Rent/Day:</strong> ${car.rent}</p>
                        </div>
                    </div>`;
                })
                console.log(listHtml);
                console.log($('#carsList').html());
                $('#carsList').html(listHtml);
            })
    } catch (error) {
        alert(error);
    }
};



async function addNewCar(e) {
    e.preventDefault();
    const form = e.target;
    var model = form.elements['model'].value;
    var number = form.elements['number'].value;
    var capacity = form.elements['capacity'].value;
    var rent = form.elements['rent'].value;
    if (model == "" || number == "" || capacity == "" || rent == "") {
        alert("Please fill all the fields !")
        return;
    }
    var method = editoradd == 'add' ? 'POST' : 'PUT';
    var booked = 0;
    var booked_by = "NULL";
    var id = localStorage.getItem("isloggedin");
    await fetch(`http://localhost:4000/cars/${id}`, {
        method: method,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ "model": model, "number": number, "capacity": capacity, "rent": rent, "booked": booked, "booked_by": booked_by })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong')
        }
        )
        .then(data => {
            alert(data.message);
            window.location.reload();
        })
        .catch((err) => {
            alert(err);
        })

}