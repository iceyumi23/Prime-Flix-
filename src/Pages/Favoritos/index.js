import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { aplicarTraducaoPortugues } from '../../Services/traduzirFilme';
import './favoritos.css';
 import {toast}  from 'react-toastify'

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeFlix');
        const filmesSalvos = JSON.parse(minhaLista) || [];
        const filmesAtualizados = filmesSalvos.map((filme) => aplicarTraducaoPortugues(filme));

        setFilmes(filmesAtualizados);
        localStorage.setItem('@primeFlix', JSON.stringify(filmesAtualizados));
    }, []);

    function excluirFilme(id) {
        const filtroFilmes = filmes.filter((item) => item.id !== id);

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso")
    }

    return (
        <div className="meus-filmes">
            <h1>Minha lista</h1>

            {filmes.length === 0 && <span>Voce nao possui filmes salvos :(</span>}

            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;
