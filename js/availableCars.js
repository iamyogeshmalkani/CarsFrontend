var cars = [];
async function bookcar(id) {
    if (!localStorage.getItem('isloggedin')) {
        window.location.replace('loginPage.html');
        return;
    }
    await isAuthorised();
    console.log(userType);
    if (userType == 'agency') {
        alert('You are not aloowed to book the car !');
        return;
    }
    if ($('.number_of_days').val() == '') {
        alert('Please select number of days to rent the car !');
        return;
    }
    var days_booked = $('.number_of_days').val();
    var booked_by = localStorage.getItem("isloggedin");
    await fetch(`http://localhost:4000/cars/book/${id}`, {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ "days_booked": days_booked, "booked_by": booked_by })
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
        })
        .catch((err) => {
            alert(err);
        })


}
async function availableCars() {

    var id = localStorage.getItem('isloggedin');
    await fetch(`http://localhost:4000/cars/availableCars`, {
        method: 'GET',
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong')
        }
        )
        .then(data => {
            cars = data.cars;
            var listHtml = ''
            cars.map((car, i) => {
                listHtml += `<div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${car.model}</h5>
                                     <p class="card-text text-center">${car.number}</p>
                                     <p class="card-text mt-2"><strong>Capacity:</strong> ${car.capacity}</p>
                                     <p class="card-text"><strong>Rent/Day:</strong> ${car.rent}</p>
                                    <a href="#" class="btn btn-primary w-100 mt-3 rentCar" onclick="bookcar('${car.id}');">Rent Car</a>
                                </div>
                            </div>`
            })
            $('#carsList').html(listHtml);
            alert(data.message);
        })
        .catch((err) => {
            alert(err);
        })

}