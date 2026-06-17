import { useEffect, useState} from 'react';
import api from '../../Services/api';
import { Link} from 'react-router-dom';
import { aplicarTraducaoPortugues } from '../../Services/traduzirFilme';
import './pages.css';
import './Filme/filme-info.css';
 //// Url da API: https://api.themoviedb.org/3/movie/now_playing?api_key=6db4cf2b02053cfbcd7e541147377f9a&language=pt-BR

function Home() {

    const [Filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{

     async function loadFilmes(){
        const response = await api.get("movie/now_playing", {
            params: {
                page: 1,
            }
        })

        const filmesTraduzidos = response.data.results
            .slice(0, 10)
            .map((filme) => aplicarTraducaoPortugues(filme));

        setFilmes(filmesTraduzidos);
        setLoading(false);
     }
     
     loadFilmes();
    }, [])

      if (loading) {
        return(
            <div className = "loading">
                <h2> Carregando...</h2>
            </div>
        )
      }
       

    return (
        <div className = "container">
           <div className = "lista-filmes">
            {Filmes.map((filme) =>{
                return(
                    <article key={filme.id}>
                     <strong>{filme.title}</strong>
                     <img src= {`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} />
                     <Link to= {`/filme/${filme.id}`}> Acessar
                     </Link>
                    </article> 
                )
            })}
           </div>
        </div>
    )
 }
 
 export default Home;
