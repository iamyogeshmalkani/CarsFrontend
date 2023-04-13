var customers = []
async function getCustomers() {
    await isAuthorised();
    if (userType != 'agency') {
        $('body').html('<p>Not Authorised</p>')
    }
    var id = localStorage.getItem('isloggedin');
    await fetch(`http://localhost:4000/cars/customers/${id}`, {
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
            customers = data.cars;
            var listHtml = ''
            customers.map((customer, i) => {
                listHtml += `<div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${customer.model}</h5>
                                     <p class="card-text">${customer.name}</p>
                                     <p class="card-text"><strong>Capacity:</strong> ${customer.days_booked}</p>
                                     <p class="card-text"><strong>Rent/Day:</strong> ${customer.rent}</p>
                                     <p class="card-text"><strong>Booked On:</strong> ${customer.start_date}</p>

                                </div>
                            </div>`
            })
            $('#CustomersList').html(listHtml);
            alert(data.message);
        })
        .catch((err) => {
            alert(err);
        })
}