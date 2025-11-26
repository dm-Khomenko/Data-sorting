
export const bubbleSort = (arr) => {
	for(let i = 0; i < arr.length - 1; i++){
		for(let j = arr.length - 1; j > i; j--){
			if(arr[j] < arr[j-1]){
				let buffer = arr[j]
				arr[j] = arr[j-1]
				arr[j-1] = buffer;
			}
		}
	}
	return arr;
}

export const selectionSort = (arr) => {
	for(let i = 0; i < arr.length; i++){
		let min = i;
		for(let j = i + 1; j < arr.length; j++){
			if(arr[min] > arr[j]){
				min = j
			}
		}
		[arr[i] , arr[min]] = [arr[min], arr[i]]
	}
	return arr;
}

export const insertionSort = (arr) => {
	for(let i = 0; i < arr.length; i++){
		let j = i + 1;
		while(arr[j] !== 0 && arr[j] < arr[j - 1]){
			let buffer = arr[j];
			arr[j] = arr[j - 1];
			arr[j - 1] = buffer;
			j--;
		}
	}
	return arr;
}
export const quickSort = arr => {
	if(arr.length <= 1) return arr;

	const pivot = arr[0];
	const less = [];
	const more = [];
	for(let i = 1; i < arr.length; i++){
		arr[i] < pivot ? 	less.push(arr[i]) : more.push(arr[i]);
	} 
	return quickSort(less).concat(pivot, quickSort(more));
}

export const mergeSort = function merge(arr){
	if(arr.length <= 1) return arr;

	const left = merge(arr.slice(0, arr.length/2));
	const right = merge(arr.slice(arr.length/2, arr.length));

	let i = 0;
	let j = 0;
	const sorted = [];

	while(i < left.length && j < right.length){
		if(left[i] === right[j]){
			sorted.push(left[i], right[j]);
			i++;
			j++;
		} else if(left[i] < right[j]){
			sorted.push(left[i]);
			i++;
		} else {
			sorted.push(right[j]);
			j++;
		}
	}

	if(i !== left.length){
		return sorted.concat(left.slice(i, left.length));
	} else if(j !== right.length){
		return sorted.concat(right.slice(j, right.length))
	}

	return sorted;
}