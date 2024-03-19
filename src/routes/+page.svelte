<script lang="ts">
	interface formInterface {
		name: string;
		number: string;
		email: string;
	}

	let modalIsOpen: boolean = false;
	let modalResultIsOpen: boolean = false;
	let form: formInterface = {
		name: '',
		number: '',
		email: ''
	};

	let messageForModal: string = '';

	let totalSeconds: number = 15;
	let minutes: number = Math.floor(totalSeconds / 60);
	let seconds: number = totalSeconds % 60;
	let intervalId: number | undefined;

	function formatTime(num: number) {
		return num < 10 ? '0' + num : num;
	}

	function startCountdown() {
		const interval = setInterval(() => {
			totalSeconds--;
			if (totalSeconds <= 0) {
				clearInterval(interval);
				result();
			} else {
				minutes = Math.floor(totalSeconds / 60);
				seconds = totalSeconds % 60;
			}
		}, 1000);

		intervalId = interval;
	}

	function stopCountdown() {
		if (intervalId) {
			clearInterval(intervalId);
		}

		totalSeconds = 15;
		minutes = Math.floor(totalSeconds / 60);
		seconds = totalSeconds % 60;
	}

	function toggleModal() {
		if (modalIsOpen == false) {
			modalIsOpen = !modalIsOpen;

			startCountdown();
		} else {
			modalIsOpen = !modalIsOpen;

			stopCountdown();
		}
	}

	function toggleModalResult() {
		if (modalResultIsOpen == false) {
			modalResultIsOpen = !modalResultIsOpen;
		} else {
			modalResultIsOpen = !modalResultIsOpen;

			messageForModal = '';
		}
	}

	function handleChange(e: Event) {
		const inputElement = e.target as HTMLInputElement;
		const { name, value } = inputElement;
		form = {
			...form,
			[name]: value
		};
	}

	function validationForm(): boolean {
		if (!form.name.trim()) {
			return false;
		}

		const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
		if (!phoneRegex.test(form.number)) {
			return false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(form.email)) {
			return false;
		}

		return true;
	}

	function result() {
		const validation = validationForm();

		if (!form.name || !form.number || !form.email || !validation) {
			messageForModal = 'Você falhou no desafio!';
			toggleModalResult();

			toggleModal();
		} else {
			messageForModal = 'Parabéns, você concluiu o desafio!';
			toggleModalResult();

			toggleModal();
		}

		form.name = '';
		form.number = '';
		form.email = '';
	}

	function handleSubmit(e: Event) {
		e.preventDefault();

		const validation = validationForm();

		if (!form.name || !form.number || !form.email || !validation) {
			alert('Preencha os campos de nome, número e email corretamente!');
		} else {
			result();
		}
	}
</script>

<div class="flex items-center justify-center h-screen">
	<button class="btn bg-green-600 text-white hover:bg-green-800" on:click={toggleModal}>
		Iniciar desafio
	</button>

	{#if modalResultIsOpen == true}
		<div
			class="absolute top-0 left-0 h-screen w-screen bg-black/25 flex justify-center items-center z-50"
		>
			<div
				class="bg-white border-4 border-gray-500 text-slate-900 modal-box flex flex-col items-center justify-center gap-4"
			>
				<p class="text-xl font-semibold">{messageForModal}</p>

				<button class="btn px-5 h-8 min-h-0 bg-gray-600 text-white" on:click={toggleModalResult}
					>OK</button
				>
			</div>
		</div>
	{/if}

	{#if modalIsOpen == true}
		<div class="absolute modal-box p-4 bg-white text-slate-900 border border-gray-500">
			<button
				class="absolute top-2 right-2 px-2 bg-red-700 text-white rounded-md hover:bg-red-600"
				on:click={toggleModal}
			>
				X
			</button>

			<form on:submit={handleSubmit} class="flex flex-col mt-4 gap-3">
				<div class="flex flex-col">
					<label for="inputName">Nome</label>

					<input
						class="bg-white border-2 border-gray-600 rounded-md p-1 outline-none focus:border-gray-900"
						placeholder="Guilherme Rodrigues"
						id="inputName"
						type="text"
						name="name"
						value={form.name}
						on:change={handleChange}
					/>
				</div>

				<div class="flex flex-col">
					<label for="inputNumber">Número</label>

					<input
						class="bg-white border-2 border-gray-600 rounded-md p-1 outline-none focus:border-gray-900"
						placeholder="+550093216631"
						id="inputNumber"
						type="text"
						name="number"
						value={form.number}
						on:change={handleChange}
					/>
				</div>

				<div class="flex flex-col">
					<label for="inputEmail">Email</label>

					<input
						class="bg-white border-2 border-gray-600 rounded-md p-1 outline-none focus:border-gray-900"
						placeholder="guilherme@hotmail.com"
						id="inputEmail"
						type="text"
						name="email"
						value={form.email}
						on:change={handleChange}
					/>
				</div>

				<button
					class="btn flex flex-col h-auto py-1 bg-blue-700 border-none hover:bg-blue-600"
					type="submit"
				>
					<span class="text-lg text-white">Enviar</span>
					<span class="-mt-2 text-white">Tempo: {formatTime(minutes)}:{formatTime(seconds)}</span>
				</button>
			</form>
		</div>
	{/if}
</div>
