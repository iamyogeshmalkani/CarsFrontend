async function login(e) {
    e.preventDefault();
    const form = e.target;
    var email = form.elements['email'].value;
    var password = form.elements['password'].value;
    var type = form.elements['type'].value;
    console.log(type);
    if (email == "" || type == "" || password == "") {
        alert("Please fill all the fields !")
        return;
    }
    await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ "email": email, "password": password, "type": type })
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
async function isloggedin() {
    console.log('ws');
    if (localStorage.getItem('isloggedin')) {
        await isAuthorised();
        if (userType == 'agency') {
            window.location.replace('newCar.html');
        }
        else if (userType == 'customer') {
            window.location.replace('availableCars.html')
        }
        else {
            window.location.replace('loginPage.html')

        }
    }

}