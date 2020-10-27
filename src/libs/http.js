class Http {
    static instance = new Http();

    get = async (url) => {
        try {
            let req = await fetch(url);
            let json = await req.json();
            
            return json;
        } catch (err) {
            console.log('GET method error', err);
            throw Error(err);
        }
    }

    post = async (url, body) => {
        try {
            let req = await fetch(url, {
                type: 'POST',
                body
            });

            let json = await req.json();
            
            return json;
        } catch (err) {
            console.log('POST method error', err);
            throw Error(err);
        }
    }
}

export default Http;