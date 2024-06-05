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
		var idGerado = Math.random() * (maximo - minimo) + minimo;

		page.insertAdjacentHTML('beforeend',
			`
			<div class="rmodal-overlay" id="${idGerado}">
			<div class="rmodal" id="${idGerado}">
				<div class="rmodal-container" id="${idGerado}">
					<div class="rmodal-header" id="${idGerado}">
						<span class="rmodal-title" id="${idGerado}">${title}</span>
						<div class="rmodal-closeBut"id="${idGerado}">
							<button class="rmodal-closebutton" id="${idGerado}">X</button>
						</div>
					</div>
					<div class="rmodal-body" id="${idGerado}">
						${bodycontent}
					</div>
					<div class="rmodal-footer" id="${idGerado}">
						<div class="rmodal-groupbutton" id="${idGerado}">
							<button class="rmodal-primarybutton" id="${idGerado}">Salvar</button>
							<button class="rmodal-secondarybutton" id="${idGerado}">Fechar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
			`
		);

		const buttonClose = document.querySelector(`.rmodal-closebutton[id="${idGerado}"]`);
		const buttonPrimary = document.querySelector(`.rmodal-primarybutton[id="${idGerado}"]`);
		const buttonSecondary = document.querySelector(`.rmodal-secondarybutton[id="${idGerado}"]`);
		this.botaoFechar = buttonSecondary
		this.idModal = idGerado

		if (!havePrimaryButton) {
			buttonPrimary.remove();
		}

		buttonClose.addEventListener('click', () => { this.fechar(idGerado); });
		buttonSecondary.addEventListener('click', () => { this.fechar(idGerado); });
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