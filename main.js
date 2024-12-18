const portal_api = require('./portal-api'); 
const fs = require('fs/promises');
const path = require('path');

const appDir = path.dirname(process.execPath);

main();

async function main () {
    console.info("Let's try to get you connected to the NOMOSPHERE captive portal ;D !")

    try {
        creds = await getCredentials()
    } catch (error) {
        console.error("failed to retreive credentials: ", error)
        return
    }

    attemptCounter = 0;
    success = false;
    while (!success) {
        attemptCounter++;
        try {
            await connect(creds.username, creds.password)
            success = true
        } catch (error) {
            console.error("failed to connect: ", error);
            
            // waiting 3 second.
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
            await delay(3_000) 
            console.info("Trying again.");
        }
    }
    
    try {
        await printAsciiArt()
    } catch {
        console.log("[Couldn't retreive the ascii art]")
    }
    console.info("Connected !");

    await new Promise(resolve => setTimeout(resolve, 10_000));
}

async function getCredentials () {
    const data = await fs.readFile(path.join(appDir, 'config.json'), 'utf-8');
    const config = JSON.parse(data);
    return config
}

async function connect (login, password) {
    console.log("Connexion attempt " + attemptCounter)

    console.debug("Getting user token...")
    user_token = await portal_api.getUserToken();

    console.debug("Authenticating...")
    responseCode = await portal_api.authenticate(login, password, user_token);
    if (responseCode != 200) {
        throw new Error("bad response code:", responseCode);
    }

    console.debug("Getting login...")
    await portal_api.getLogin(user_token)
    if (responseCode != 200) {
        throw new Error("bad response code:", responseCode);
    }
}

async function printAsciiArt () {
    const data = await fs.readFile(path.join(appDir, './asciiArt.txt'), 'utf-8');
    console.log(data)
}