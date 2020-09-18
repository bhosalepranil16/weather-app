console.log('Hello');

const desctemplate = document.querySelector('#description-template').innerHTML;
const loadtemplate = document.querySelector('#loader-template').innerHTML;
const errorTemplate = document.querySelector('#error-template').innerHTML;

const $btnSearch = document.querySelector('#btn-search');
const $btnPlace = document.querySelector('#btn-place');


const disabledButtons = ()=>{
    $btnSearch.setAttribute('disabled','disabled');
    $btnPlace.setAttribute('disabled','disabled');
}

const enableButtons = ()=>{
    $btnSearch.removeAttribute('disabled');
    $btnPlace.removeAttribute('disabled');
}

$btnSearch.addEventListener('click',(e)=>{
    e.preventDefault();

    disabledButtons();

    let markup = Mustache.render(loadtemplate);
    document.querySelector('#data-area').innerHTML = "";
    document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);



    const location = document.querySelector('#location').value;

    if(!location) {
        return errorMessageRendering('Please provide a valid location!!!');
    }

    fetch(`/weather?search=${location}`).then(res=>{
        res.json().then(({ data })=>{
            
            if(data.error) {
                return errorMessageRendering('Please provide a valid location!!!');
            }

            console.log(data);

            markup = Mustache.render(desctemplate,{
                location : `${data.location.name}, ${data.location.country}`,
                temperature : data.current.temperature,
                description : data.current.weather_descriptions[0],
                speed : data.current.wind_speed,
                src : data.current.weather_icons[0]
            });

            document.querySelector('#data-area').innerHTML = "";
            document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);

            enableButtons();
            
        })
    })
})

$btnPlace.addEventListener('click',(e)=>{

    if(!navigator.geolocation) {
        return errorMessageRendering.log('Your Browser does not support geolocation');
    }

    e.preventDefault();

    disabledButtons();
    document.querySelector('#location').value = "";

    let markup = Mustache.render(loadtemplate);
    document.querySelector('#data-area').innerHTML = "";
    document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);

    navigator.geolocation.getCurrentPosition((position)=>{

        fetch(`/my?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then(res=>{
            res.json().then(({ data })=>{

                markup = Mustache.render(desctemplate,{
                    location : `${data.location.name}, ${data.location.country}`,
                    temperature : data.current.temperature,
                    description : data.current.weather_descriptions[0],
                    speed : data.current.wind_speed,
                    src : data.current.weather_icons[0]
                });
    
                document.querySelector('#data-area').innerHTML = "";
                document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);
                enableButtons();
            })
        })
    })
});


const errorMessageRendering =  (msg)=>{
    let markup = Mustache.render(errorTemplate,{
        msg
    });
    document.querySelector('#data-area').innerHTML = "";
    document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);
    enableButtons();
}