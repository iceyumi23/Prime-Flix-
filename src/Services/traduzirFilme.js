const TITULOS_TRADUZIDOS_POR_ID = {
    1057265: 'Peddi',
    1367220: 'Karuppu',
};

const TITULOS_TRADUZIDOS_POR_NOME = {
    '\u0c2a\u0c46\u0c26\u0c4d\u0c26\u0c3f': 'Peddi',
    '\u0b95\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1': 'Karuppu',
    '\u0939\u0948 \u091c\u0935\u093e\u0928\u0940 \u0924\u094b \u0907\u0936\u094d\u0915 \u0939\u094b\u0928\u093e \u0939\u0948': 'Se ha juventude, tem que haver amor',
};

const SINOPSES_TRADUZIDAS_POR_ID = {
    1057265: 'Em um drama esportivo cheio de acao e superacao, um homem precisa enfrentar seus limites, seus rivais e o peso do proprio passado para conquistar seu lugar.',
    1367220: 'Um advogado de dia e defensor da justica de noite se envolve em uma jornada intensa contra crime, corrupcao e forcas que ameacam sua comunidade.',
};

const SINOPSES_TRADUZIDAS_POR_NOME = {
    '\u0c2a\u0c46\u0c26\u0c4d\u0c26\u0c3f': SINOPSES_TRADUZIDAS_POR_ID[1057265],
    '\u0b95\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1': SINOPSES_TRADUZIDAS_POR_ID[1367220],
    '\u0939\u0948 \u091c\u0935\u093e\u0928\u0940 \u0924\u094b \u0907\u0936\u094d\u0915 \u0939\u094b\u0928\u093e \u0939\u0948': 'Uma comedia romantica sobre paixoes, desencontros e escolhas do coracao, em que a juventude transforma o amor em uma confusao divertida.',
};

export function aplicarTraducaoPortugues(filme) {
    const tituloOriginal = filme.title || filme.original_title;
    const tituloTraduzido = TITULOS_TRADUZIDOS_POR_ID[filme.id] || TITULOS_TRADUZIDOS_POR_NOME[tituloOriginal];
    const sinopseTraduzida = SINOPSES_TRADUZIDAS_POR_ID[filme.id] || SINOPSES_TRADUZIDAS_POR_NOME[tituloOriginal];

    if (!tituloTraduzido && !sinopseTraduzida) {
        return filme;
    }

    return {
        ...filme,
        title: tituloTraduzido || filme.title,
        overview: sinopseTraduzida || filme.overview,
    };
}
