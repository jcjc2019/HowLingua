module.exports = function(text,language){
    console.log("Microsoft Text to Speech function here. get the audio")
    // Requires request and request-promise for HTTP requests
    // e.g. npm install request request-promise
    const rp = require('request-promise');
    // Requires fs to write synthesized speech to a file
    const fs = require('fs');
    // Requires xmlbuilder to build the SSML body
    const xmlbuilder = require('xmlbuilder');
    let code = "";
    let voice = "";
    //change language options
    if (language === "Mandarin") {
        code = "zh-CN";
        voice = "Microsoft Server Speech Text to Speech Voice (zh-CN, Yaoyao, Apollo)";
    } else if (language === "Japanese") {
        code = "ja-JP";
        voice = "Microsoft Server Speech Text to Speech Voice (ja-JP, Ayumi, Apollo)";
    }

    // Gets an access token.
    function getAccessToken(subscriptionKey) {
        let options = {
            method: 'POST',
            uri: 'https://eastasia.api.cognitive.microsoft.com/sts/v1.0/issueToken',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        }
        return rp(options);
    }
    // Make sure to update User-Agent with the name of your resource.
    // You can also change the voice and output formats. See:
    // https://docs.microsoft.com/azure/cognitive-services/speech-service/language-support#text-to-speech
    function textToSpeech(accessToken, text, language) {
        // Create the SSML request.
        let xml_body = xmlbuilder.create('speak')
            .att('version', '1.0')
            .att('xml:lang', code)
            .ele('voice')
            .att('xml:lang', code)
            .att('name', voice)
            .txt(text)
            .end();
        // Convert the XML into a string to send in the TTS request.
        let body = xml_body.toString();

        let options = {
            method: 'POST',
            baseUrl: 'https://eastasia.tts.speech.microsoft.com/',
            url: 'cognitiveservices/v1',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'cache-control': 'no-cache',
                'User-Agent': 'MyCognitiveService',
                'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
                'Content-Type': 'application/ssml+xml'
            },
            body: body
        }

        let request = rp(options)
            .on('response', (response) => {
                if (response.statusCode === 200) {
                    request.pipe(fs.createWriteStream(`./public/${text}_output.wav`));
                    console.log('\nYour file is ready.\n')
                }
            });
        return request
    }

    // Use async and await to get the token before attempting
    // to convert text to speech.
    async function main() {
        // Reads subscription key from env variable.
        // You can replace this with a string containing your subscription key. If
        // you prefer not to read from an env variable.
        // e.g. const subscriptionKey = "your_key_here";
        const subscriptionKey = "8fba1348eba54b8a8fe2f299c8cb4874";
        if (!subscriptionKey) {
            throw new Error('Environment variable for your subscription key is not set.')
        };
        //REPLACE THIS PART WITH THE VOCABULARY
        // const text = document.querySelector("#vocabulary").innerText;
        try {
            const accessToken = await getAccessToken(subscriptionKey);
            await textToSpeech(accessToken, text);
        } catch (err) {
            console.log(`Something went wrong: ${err}`);
        }
    }
   main()
}