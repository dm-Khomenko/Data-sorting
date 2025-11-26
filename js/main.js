import * as algos from './algorithms.js'

document.addEventListener('DOMContentLoaded', () => {
	new Functionality()
})


class Functionality {
	constructor() {
		this.input = document.getElementById('txtInput')
		this.codeEl = document.querySelector('.current .readyArray')
		this.okBtn = document.getElementById('okBtn')
		this.randomBtn = document.getElementById('randomBtn')
		this.clearBtn = document.getElementById('clear')
		this.bubbleBtn = document.getElementById('bubble')
		this.selectionBtn = document.getElementById('selection')
		this.insertionBtn = document.getElementById('insertion')
		this.quickBtn = document.getElementById('quick')
		this.mergeBtn = document.getElementById('merge')
		this.compareBtn = document.getElementById('compare')

		this.currentArray = []
		this.bind()
		this.render()
	}

	bind() {
		if (this.okBtn) this.okBtn.addEventListener('click', (e) => this.onOk(e))
		if (this.randomBtn) this.randomBtn.addEventListener('click', (e) => this.onRandom(e))
		if (this.clearBtn) this.clearBtn.addEventListener('click', (e) => this.onClear(e))
		if (this.bubbleBtn) this.bubbleBtn.addEventListener('click', (e) => this.onBubble(e))
		if (this.selectionBtn) this.selectionBtn.addEventListener('click', (e) => this.onSelection(e))
		if (this.insertionBtn) this.insertionBtn.addEventListener('click', (e) => this.onInsertion(e))
		if (this.quickBtn) this.quickBtn.addEventListener('click', (e) => this.onQuick(e))
		if (this.mergeBtn) this.mergeBtn.addEventListener('click', (e) => this.onMerge(e))
		if (this.compareBtn) this.compareBtn.addEventListener('click', (e) => this.compareAll(e))
	}

	onOk(e) {
		e && e.preventDefault()
		const arr = this.parseInputToArray(this.input?.value || '')
		this.currentArray = arr
		this.render()
	}

	onRandom(e) {
		e && e.preventDefault()
		const len = Math.floor(Math.random() * 100) + 20
		const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 1000))
		this.currentArray = arr
		this.render()
	}
	onBubble(e) {
		e && e.preventDefault()
		const input = this.getArrayForAlgorithm()
		const sorted = algos.bubbleSort(input)
		this.currentArray = sorted
		this.render()
	}
	onSelection(e) {
		e && e.preventDefault()
		this.currentArray = algos.selectionSort(this.getArrayForAlgorithm())
		this.render()
	}
	onInsertion(e) {
		e && e.preventDefault()
		this.currentArray = algos.insertionSort(this.getArrayForAlgorithm())
		this.render()
	}
	onQuick(e) {
		e && e.preventDefault()
		this.currentArray = algos.quickSort(this.getArrayForAlgorithm())
		this.render()
	}
	onMerge(e) {
		e && e.preventDefault()
		this.currentArray = algos.mergeSort(this.getArrayForAlgorithm())
		this.render()
	}
	showTimes(results){
		const block = document.getElementById('timeOutput');
		if(!block) return;

		block.innerHTML = `
		<h3>Algorithm execution time: </h3>
		<p>If 0ms then < 0.1ms </p>
		<ul>
			${Object.entries(results)
				.map(([name, time]) => `<li><b>${name}</b>: ${time} ms</li>`)
				.join("")}
		</ul>
		`
	}
	compareAll() {
		const arr = this.getArrayForAlgorithm()

		const results = {}

		const measure = (name, fn) => {
		const copy = arr.slice()
		const start = performance.now()
		const sorted = fn(copy) || copy
		const end = performance.now()
		results[name] = +(end - start).toFixed(6)
	}


		measure("Bubble", algos.bubbleSort)
		measure("Selection", algos.selectionSort)
		measure("Insertion", algos.insertionSort)
		measure("Quick", algos.quickSort)
		measure("Merge", algos.mergeSort)

		this.drawChart(results)
		this.showTimes(results)
	}

	drawChart(results) {
		const ctx = document.getElementById("myChart")

		if (this.chart) {
			this.chart.destroy()
		}

		this.chart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: Object.keys(results),
				datasets: [
					{
						label: "Time (ms)",
						data: Object.values(results),
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		})
	}

	onClear(e) {
		e && e.preventDefault()
		this.currentArray = []
		this.render()
	}
	parseInputToArray(inputValue) {
		if (inputValue == null) return []
		if (Array.isArray(inputValue)) {
			return inputValue.map(v => {
				const n = Number(v)
				return Number.isNaN(n) ? v : n
			})
		}
		return String(inputValue)
			.trim()
			.split(/[\s,]+/)
			.filter(Boolean)
			.map(token => {
				const n = Number(token)
				return Number.isNaN(n) ? token : n
			})
	}
	render() {
		if (!this.codeEl) return
		this.codeEl.textContent = '[' + this.currentArray.join(', ') + ']'
	}
	getArrayForAlgorithm() {
		return Array.isArray(this.currentArray) ? this.currentArray.slice() : []
	}
}

