async function register(e, type) {
    e.preventDefault();
    const form = e.target;
    var name = form.elements['name'].value;
    var password = form.elements['password'].value;
    var email = form.elements['email'].value;
    if (name == "" || email == "" || password == "") {
        alert("Please fill all the fields !")
        return;
    }
    await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ "name": name, "password": password, "email": email, "type": type })
    })
        .then(async response => {
            if (response.ok) {
                return response.json();
            }
            response = await response.json()
            throw new Error(response.message)
        }
        )
        .then(data => {
            localStorage.setItem('isloggedin', data.user_id)
            if (type == 'agency') {
                window.location.replace('newCar.html')
            }
            else {
                window.location.replace('availableCars.html')

            }
            alert(data.message);

        })
        .catch((err) => {
            alert(err);
        })

}