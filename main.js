let traduceBtn = document.querySelector('#submit');
let textToTraduce = document.querySelector('#text').value;
let result = document.querySelector('#result')
let selectLanguagesFrom = document.querySelector('#selectLanguagesFrom');
let selectLanguagesTo = document.querySelector('#selectLanguagesTo');

let codeFrom = 'es';
let codeTo;




const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

fetch('https://text-translator2.p.rapidapi.com/getLanguages', options)
	.then(response => response.json())
	.then(response => {
        let languages = response.data.languages;
        languages.forEach(element => {
            selectLanguagesFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`
            selectLanguagesTo.innerHTML += `<option value="${element.code}">${element.name}</option>`  
        });

        
        selectLanguagesFrom.addEventListener('click', ()=>{
            codeFrom = selectLanguagesFrom.value
        });


        

        selectLanguagesTo.addEventListener('click', ()=>{
            console.log(selectLanguagesTo.value)
            codeTo = selectLanguagesTo.value;
        });
    })
	.catch(err => console.error(err));




traduceBtn.addEventListener('click', event=>{
    event.preventDefault();
    textToTraduce = document.querySelector('#text').value;
    console.log(textToTraduce);
    
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", codeFrom);
    encodedParams.append("target_language", codeTo);
    encodedParams.append("text", textToTraduce);

    console.log(encodedParams)

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let transtedText = response.data.translatedText;
            result.innerText = transtedText;
        })
        .catch(err => console.error(err));
});