var userType = '';
async function isAuthorised() {
    var id = localStorage.getItem('isloggedin');
    if (!id) {
        $('body').html('<p>You are not authorised</p>');
        return false;
    }
    await fetch(`http://localhost:4000/auth/usertype/${id}`, {
        method: 'GET',
        headers: { "Content-type": "application/json; charset=UTF-8" },
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
            userType = data.type;
        })
        .catch((err) => {
            alert(err);
            return '';
        })

}
function logout() {
    localStorage.removeItem('isloggedin');
    window.location.replace('loginpage.html');
}