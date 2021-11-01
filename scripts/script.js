const baseMusicas = [
    {
        'name': 'Demonike',
        'artist': 'LEALL, Luna',
        'path': './assets/audios/demonike-pika.mp3',
        'album': 'Demonike',
    },
    {
        'name': 'Falador',
        'artist': 'MC Cebezinho',
        'path': './assets/audios/falador-cebezinho.mp3',
        'album': 'Falador',
    },
    {
        'name': 'Menor do Beco',
        'artist': 'MC Menor da VG',
        'path': './assets/audios/menor-do-beco.mp3',
        'album': 'Menor do Beco',
    },
    {
        'name': 'Veneza',
        'artist': 'Duzz',
        'path': './assets/audios/veneza.mp3',
        'album': 'Veneza',
    },
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
		console.log('Chegou');
		tagAudio.src = musicaSelecionada.path;
		atual = Number(musicaId);
		tagAudio.play();
		onOff.classList.add('pause');
	} else {
		if (tagAudio.paused) {
			tagAudio.play();
			onOff.classList.add('pause');
		} else {
			tagAudio.pause();
			onOff.classList.remove('pause');
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
	
	attPlayer(baseMusicas[atual].name, baseMusicas[atual].album);
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
	//const foto = document.getElementById('fotoAlbum');
	//foto.src = fotoAlbum;
	musica.innerText = nomeMusica;
	artist.innerText = nomeArtist;
}

// EVENTOS 
onOff.addEventListener('click', tocar);
pausarButton.addEventListener('click', pausar);
posterior.addEventListener('click', proxima);
anterior.addEventListener('click', voltar);
vol.addEventListener('input', ajustarVol);