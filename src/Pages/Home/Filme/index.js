import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../Services/api';
import { aplicarTraducaoPortugues } from '../../../Services/traduzirFilme';
import { toast} from 'react-toastify'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/${id}`)
                .then((response) => {
                    setFilme(aplicarTraducaoPortugues(response.data));
                    setLoading(false);
                })
                .catch(() => {
                    console.log('Filme nao encontrado');
                    navigate('/', { replace: true });
                });
        }

        loadFilmes();
    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeFlix');
        const filmesSalvos = JSON.parse(minhaLista) || [];
        const haveFilme = filmesSalvos.some((item) => item.id === filme.id);

        if (haveFilme) {
            toast.warning("Este filme já está na lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
        toast.success("Filme Salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <a
                    href={`https://youtube.com/results?search_query=${encodeURIComponent(`${filme.title} trailer`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Trailer
                </a>
            </div>
        </div>
    );
}

export default Filme;
