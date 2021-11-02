const baseMusicas = [
    {
		'name': "When The Party's Over",
        'artist': 'Billie Eilish',
        'path': "../assets/audios/7. When The Party's Over.mp3",
        'album': "When The Party's Over",
    },
	{
        'name': 'Bad Guy',
        'artist': 'Billie Eilish',
        'path': '../assets/audios/bad guy.m4a',
        'album': 'Bad Guy',
    },
	{
        'name': 'Bellyache',
        'artist': 'Billie Eilish',
        'path': '../assets/audios/Bellyache.mp3',
        'album': 'Bellyache',
    },
	{
        'name': 'Bored',
        'artist': 'Billie Eilish',
        'path': '../assets/audios/Billie Eilish  Bored.mp3',
        'album': 'Bored',
    },
	{
        'name': 'Happier Than Ever',
        'artist': 'Billie Eilish',
        'path': '../assets/audios/Happier Than Ever.mp3',
        'album': 'Happier Than Ever',
    }
];

const listaMusicas = document.getElementById('musicasListaInfo');
const tagAudio = document.getElementById('audioMusica');
const pausarButton = document.getElementById('listaButton');
const onOff = document.getElementById('onOff');
const anterior = document.getElementById('anterior');
const posterior = document.getElementById('posterior');
const vol = document.querySelector('#vol input');
const totSongs = document.querySelector('div#totSongs');
tagAudio.src = baseMusicas[0].path;

let atual = 0;

totSongs.innerHTML = `<p>${baseMusicas.length} songs</p>`;

// CONSTRUÇÃO DA LISTA
function construirPlaylist(musicaSelecionada, i) {
    const li = document.createElement('li');
    const musica = document.createElement('p');
    const artista = document.createElement('p');
    const album = document.createElement('p');
	attPlayer(baseMusicas[0].name, baseMusicas[0].artist);
	
    li.dataset.id = i;
    musica.className = 'primeiroItem';
    musica.innerText = musicaSelecionada.name;
    artista.innerText = musicaSelecionada.artist;
    album.innerText = musicaSelecionada.album;

    li.appendChild(musica);
    li.appendChild(artista);
    li.appendChild(album);
    listaMusicas.appendChild(li);

    li.addEventListener('click', tocar);
};

for (let i = 0; i < baseMusicas.length; i++) {
    construirPlaylist(baseMusicas[i], i);
};

// FUNÇÃO PLAY
function tocar(event) {
    const elementClique = event.currentTarget;
	if (elementClique.tagName == 'LI') {
		const musicaId = elementClique.dataset.id;
		const musicaSelecionada = baseMusicas[musicaId];
		tagAudio.src = musicaSelecionada.path;
		atual = Number(musicaId);
		tagAudio.play();
		onOff.classList.add('pause');
	} else {
		if (tagAudio.paused) {
			tagAudio.play();
			onOff.classList.add('pause');
		} else {
			pausar();
		}
	};
	attPlayer(baseMusicas[atual].name, baseMusicas[atual].artist);
};

// FUNÇÃO PAUSE
function pausar(event) {
    tagAudio.pause();
	onOff.classList.remove('pause');
}

function proxima() {
	if (atual === baseMusicas.length -1) {
		atual = 0;
	} else {
		atual++
	};
	tagAudio.src = baseMusicas[atual].path;
	tagAudio.play();
	onOff.classList.add('pause');
	
	attPlayer(baseMusicas[atual].name, baseMusicas[atual].artist);
};

function voltar() {
	if (atual === 0) {
		atual = baseMusicas.length -1;
	} else {
		atual--
	};
	tagAudio.src = baseMusicas[atual].path;
	tagAudio.play();
	onOff.classList.add('pause');
	
	attPlayer(baseMusicas[atual].name, baseMusicas[atual].artist);
};

function ajustarVol() {
	tagAudio.volume = vol.value;
};

function attPlayer(nomeMusica, nomeArtist) {
	const musica = document.getElementById('nomeMusica');
 	const artist = document.getElementById('nomeArtist');
	const album = document.getElementById('fotoAlbum');
	musica.innerText = nomeMusica;
	artist.innerText = nomeArtist;
	album.src = `./assets/img/album${atual}.jfif`;
};

// EVENTOS 
onOff.addEventListener('click', tocar);
pausarButton.addEventListener('click', pausar);
posterior.addEventListener('click', proxima);
anterior.addEventListener('click', voltar);
vol.addEventListener('input', ajustarVol);