const RANDOM_URL = 'https://dog.ceo/api/breeds/image/random';
const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const img = document.querySelector('.doggo-img');
const spinner = document.querySelector('.spinner');

img.addEventListener('load', function(){
    spinner.classList.remove('show');
    img.classList.add('show');
});
init();



function init(){
getBreeds();
document.querySelector(".breeds").addEventListener('change', function(event){
    console.log(event.target.value);
    const url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;  
    getRandomDog(url);
});
}

function getRandomDog(url) {
    img.classList.remove('show');
    spinner.classList.add('show');
    fetch(url)
    .then(function(response){
        return response.json();//Gets url jpg dependng on the breed from url 
    })
    .then(function(data){
        /* const img = document.createElement('img'); si se quiere crear un nuevo elemento img*/
        img.src = data.message;
        img.alt = 'random dog photo';
       // document.querySelector('.doggos').appendChild(img);
    });
}

function getBreeds() {
    fetch(BREEDS_URL).then(function(response) {
        return response.json();
    })
    .then(function(data){
        const breeds = Object.keys(data.message);

        for(let i = 0 ; i < breeds.length;i++){
            let breed = document.createElement('option');
            breed.value = breeds[i]; 
            breed.innerText = breeds[i];
            document.querySelector('.breeds').appendChild(breed); 
        }
    });
}




