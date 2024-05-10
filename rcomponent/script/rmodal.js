export class Rmodal {
	constructor(titulo, corpo, botaoSalvar, idModal) {
		this.titulo = titulo,
			this.corpo = corpo,
			this.botaoSalvar = botaoSalvar,
			this.botaoFechar = 
			this.idModal = idModal;
	}

	fechar(idModal = this.idModal) {
		document.querySelector(`.rmodal-overlay[id="${idModal}"]`).remove();
	}


	abrir(title = this.titulo, bodycontent = this.corpo, havePrimaryButton = this.botaoSalvar) {
		const page = document.querySelector('body');
		var minimo = 1;
		var maximo = 1000;
		var numeroIntervalo = Math.random() * (maximo - minimo) + minimo;

		page.insertAdjacentHTML('beforeend',
			`
			<div class="rmodal-overlay" id="${numeroIntervalo}">
			<div class="rmodal" id="${numeroIntervalo}">
				<div class="rmodal-container" id="${numeroIntervalo}">
					<div class="rmodal-header" id="${numeroIntervalo}">
						<span class="rmodal-title" id="${numeroIntervalo}">${title}</span>
						<div class="rmodal-closeBut"id="${numeroIntervalo}">
							<button class="rmodal-closebutton" id="${numeroIntervalo}">X</button>
						</div>
					</div>
					<div class="rmodal-body" id="${numeroIntervalo}">
						${bodycontent}
					</div>
					<div class="rmodal-footer" id="${numeroIntervalo}">
						<div class="rmodal-groupbutton" id="${numeroIntervalo}">
							<button class="rmodal-primarybutton" id="${numeroIntervalo}">Salvar</button>
							<button class="rmodal-secondarybutton" id="${numeroIntervalo}">Fechar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
			`
		);

		const buttonClose = document.querySelector(`.rmodal-closebutton[id="${numeroIntervalo}"]`);
		const buttonPrimary = document.querySelector(`.rmodal-primarybutton[id="${numeroIntervalo}"]`);
		const buttonSecondary = document.querySelector(`.rmodal-secondarybutton[id="${numeroIntervalo}"]`);
		this.botaoFechar = buttonSecondary

		if (!havePrimaryButton) {
			buttonPrimary.remove();
		}

		buttonClose.addEventListener('click', () => { this.fechar(numeroIntervalo); });
		buttonSecondary.addEventListener('click', () => { this.fechar(numeroIntervalo); });
	};
}
export class Rloader {
	constructor() {
		this.page = document.querySelector('body');
	}

	mostrar() {
		const loader = document.querySelector('.rloader-backdrop');

		this.page.style.display = 'flex'
		this.page.style.flexDirection = 'column'

		if (!loader) {
			const element = `
			<div class="rloader-backdrop">
			<div class="rloader-grouploader">
				<div class="rloader-loader"></div>
				<p>Carregando...</p> 
			</div>
		</div>`;

			this.page.insertAdjacentHTML('beforeend', element);
		}
	}

	ocultar() {
		const loader = document.querySelector('.rloader-backdrop');

		if (loader) {
			this.page.style.display = ''
			this.page.style.flexDirection = ''
			loader.remove();
		}
	}
}