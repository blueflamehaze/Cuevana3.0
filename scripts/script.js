
let pagina = 1;
let posters = '';


const getData = async () => {

    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b7ef8f8a741775ea15a89eadb5f72420&language=es-MX&page=1')

    try {
        

        if(response.status === 200){

            

        } else if (response.status === 401){
            console.log('Algo salio mal con la apy_key')
        } else {
            console.log('algo salio mal y no sabemos que paso ')
        }


    } catch (error) {
        console.log(error)
    }
}