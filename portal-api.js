module.exports = {
    getUserToken: getUserToken,
    authenticate: authenticate,
    getLogin: getLogin,
};

async function getUserToken() {
    try {
        const response = await fetch("https://sphere.nomosphere.fr/portal/mikrotik/HEF08TK6EY7/12228?client_mac=F4:C6:1E:8B:AE:B9&error=&login_url=http://nomosphere-5509.hotspot.encapto.com", {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-GB,en;q=0.5",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "cross-site",
                "Priority": "u=0, i"
            },
            "method": "GET",
            "redirect": "manual", // Disable automatic redirect
            "mode": "cors"
        });

        const location = response.headers.get('Location');
        if (location) {
            const urlParams = new URLSearchParams(new URL(location).search);
            const token = urlParams.get('token'); // Extract the token
            return token; // Return the token
        } else {
            console.log("Didn't find Location header...");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user token:", error);
        return null;
    }
}


async function authenticate(login, password, token) {
    const formData = new FormData();
    formData.append('json', JSON.stringify({
        username: login,
        password: password,
        user_token: token
    }));
    var responseCode;
    await await fetch("https://sphere.nomosphere.fr/papi/hotspot/auths/4568/user", {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
            "Accept": "application/json",
            "Accept-Language": "en-GB,en;q=0.5",
            "Content-Type": "multipart/form-data; boundary=---------------------------318511978327848839841124795800",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Priority": "u=0"
        },
        "referrer": "https://sphere.nomosphere.fr/",
        "body": "-----------------------------318511978327848839841124795800\r\nContent-Disposition: form-data; name=\"json\"\r\n\r\n{\"username\":\"" + login + "\",\"password\":\"" + password + "\",\"user_token\":\"" + token + "\"}\r\n-----------------------------318511978327848839841124795800--\r\n",
        "method": "POST",
        "mode": "cors"
    }).then(res => {
        responseCode = res.status
    });

    return responseCode
}

async function getLogin(token) {
    var uriParams = "?username=" + token +
        "&password=" + token + 
        "&var=https%3A%2F%2Fsphere.nomosphere.fr%2Fportal%2F%2F%3Ftoken%3D" + token + "%26apiUrl%3Dhttps%3A%2F%2Fsphere.nomosphere.fr%2Fpapi%2Fhotspot%2F%26loginStatus%3Dtrue%26success%3DYou%2520are%2520now%2520online"
    await fetch("http://nomosphere-5509.hotspot.encapto.com/login" + uriParams, {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-GB,en;q=0.5",
            "Upgrade-Insecure-Requests": "1",
            "Priority": "u=0, i"
        },
        "method": "GET",
        "mode": "cors"
    });
}
