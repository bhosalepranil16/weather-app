console.log('Hello');

const desctemplate = document.querySelector('#description-template').innerHTML;
const loadtemplate = document.querySelector('#loader-template').innerHTML;
const errorTemplate = document.querySelector('#error-template').innerHTML;



document.querySelector('#btn-search').addEventListener('click',(e)=>{
    e.preventDefault();

    let markup = Mustache.render(loadtemplate);
    document.querySelector('#data-area').innerHTML = "";
    document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);


    const location = document.querySelector('#location').value;

    if(!location) {
        return errorMessageRendering('   Please provide a valid location!!!');
    }

    fetch(`/weather?search=${location}`).then(res=>{
        res.json().then(({ data })=>{
            
            if(data.error) {
                return errorMessageRendering('   Please provide a valid location!!!');
            }

            markup = Mustache.render(desctemplate,{
                location : `${data.location.name}, ${data.location.country}`,
                humidity : data.current.humidity,
                temperature : data.current.temperature,
                description : data.current.weather_descriptions[0],
                speed : data.current.wind_speed
            });

            document.querySelector('#data-area').innerHTML = "";
            document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);
            
        })
    })
})

document.querySelector('#btn-place').addEventListener('click',(e)=>{

    if(!navigator.geolocation) {
        return errorMessageRendering.log('Your Browser does not support geolocation');
    }

    e.preventDefault();

    let markup = Mustache.render(loadtemplate);
    document.querySelector('#data-area').innerHTML = "";
    document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);

    navigator.geolocation.getCurrentPosition((position)=>{

        fetch(`/my?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then(res=>{
            res.json().then(({ data })=>{

                
                markup = Mustache.render(desctemplate,{
                    location : `${data.location.name}, ${data.location.country}`,
                    humidity : data.current.humidity,
                    temperature : data.current.temperature,
                    description : data.current.weather_descriptions[0],
                    speed : data.current.wind_speed,
                    
                });
    
                document.querySelector('#data-area').innerHTML = "";
                document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);

            })
        })
    })
});


const errorMessageRendering =  (msg)=>{

    markup = Mustache.render(errorTemplate,{
        msg
    });
    document.querySelector('#data-area').innerHTML = "";
    document.querySelector('#data-area').insertAdjacentHTML('beforeend',markup);
}