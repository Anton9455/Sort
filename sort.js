/*
Сортировка пузырьком	
 */
function BubbleSort() {
	var arrNumber = sessionStorage.getItem("arrNumber"); // получаем из сессии массив с числами
	var arrNumber = arrNumber.split(",").map(Number); // разбиваем массив из сессии на числа
	var i = 0; //инкрементирующая переменная
	var temp = 0; //переменная временного хранения заменяемых объектов
	var count = 0; //счетчик проходов (если он равен длинне массива то все отсортировано)
	var time = setInterval(SortBS, 1000);
		
	function SortBS(){
		if(i < arrNumber.length){
			if(arrNumber[i] > arrNumber[i+1]){
				temp = arrNumber[i];
				arrNumber[i] = arrNumber[i+1];
				arrNumber[i+1] = temp;
				MoveBS(arrNumber[i], arrNumber[i+1]);
				count = 0;
			}else{
				count++;
			}
			i++;
		}else{
			i = 0;
		}
		
		if(count == arrNumber.length){
			clearInterval(time);
		}
		
	}						
	return arrNumber;
}

/*
Сортировка вставками
 */

function InsertionSort(){
	var arrNumber = sessionStorage.getItem("arrNumber"); // получаем из сессии массив с числами
	var arrNumber = arrNumber.split(",").map(Number); // разбиваем массив из сессии на числа
	var i = 0; //инкрементирующая переменная
	var container = 0; //переменная временного хранения заменяемых объектов
	var temp; //переменная временного хранения заменяемых объектов
	var time = setInterval(SortIS, 1000);
	
	function SortIS(){
		if(i < arrNumber.length){
			container = arrNumber[i];
				for (var j = i-1; j >= 0; j--){
					if (arrNumber[j] < container){
						break;
					}
					temp = arrNumber[j+1];
					arrNumber[j+1] = arrNumber[j];
					arrNumber[j] = temp;
					MoveIS(arrNumber[j],arrNumber[j+1]);
				}
        arrNumber[j+1] = container;
		}else{
			clearInterval(time);
		}
		i++;
	}
	
}

/*
Сортировка выбором
 */

function SelectionSort(){
	var arrNumber = sessionStorage.getItem("arrNumber"); // получаем из сессии массив с числами
	var arrNumber = arrNumber.split(",").map(Number); // разбиваем массив из сессии на числа
	var i = 0; //инкрементирующая переменная
	var temp = 0; //переменная временного хранения заменяемых объектов
	var time = setInterval(SortSS, 1000);
	
	function SortSS(){
		if(i < arrNumber.length){
			var min = i;
			for (var j = i+1; j < arrNumber.length; j++){ 
				if (arrNumber[j] < arrNumber[min]){ 
					min = j; 
				} 
			}
		temp = arrNumber[min]; 
		arrNumber[min] = arrNumber[i]; 
		arrNumber[i] = temp;
		MoveSS(arrNumber[i], arrNumber[min]);
		}else{
			clearInterval(time);
		}
		i++;
	}
}
	
/*
Движение элементов в сортировке пузырьком
*/
function MoveBS(min, max) { // MoveBubbleSort
	
	var temp;
	var objFirst = document.getElementById(min + 'BS');
	var objTwo = document.getElementById(max + 'BS');
	
	var plof = objFirst.style.left; //positionLeftObjectFirst
	var plot = objTwo.style.left; //positionLeftObjectTwo
	
	plof = parseInt(plof.replace(/\D+/g,""));
	plot = parseInt(plot.replace(/\D+/g,""));
		
	temp = plof;
	objFirst.style.left = plot + 'px';
	objTwo.style.left = temp + 'px';
		
}

/*
Движение элементов в сортировке вставками
*/
function MoveIS(min, max) { // MoveInsertionSort
	var temp;
	var objFirst = document.getElementById(min + 'IS');
	var objTwo = document.getElementById(max + 'IS');
	var plof = objFirst.style.left; //positionLeftObjectFirst
	var plot = objTwo.style.left; //positionLeftObjectTwo
		
	plof = parseInt(plof.replace(/\D+/g,""));
	plot = parseInt(plot.replace(/\D+/g,""));
		
	temp = plof;
	objFirst.style.left = plot + 'px';
	objTwo.style.left = temp + 'px';
}

/*
Движение элементов в сортировке выбором
*/
function MoveSS(min, max){ // MoveSelectionSort
	var temp;
	var objFirst = document.getElementById(min + 'SS');
	var objTwo = document.getElementById(max + 'SS');
	var plof = objFirst.style.left; //positionLeftObjectFirst
	var plot = objTwo.style.left; //positionLeftObjectTwo
		
	plof = parseInt(plof.replace(/\D+/g,""));
	plot = parseInt(plot.replace(/\D+/g,""));
		
	temp = plof;
	objFirst.style.left = plot + 'px';
	objTwo.style.left = temp + 'px';
}

/*
Создание элемента и добавление его в контейнеры
*/
function CreateBlock(_index, arrNumber){

	var divContainerBubbleSort = document.getElementById("divContainer_BubbleSort");
	var divContainerInsertionSort = document.getElementById("divContainer_InsertionSort");
	var divContainerSelectionSort = document.getElementById("divContainer_SelectionSort");
	var _id = arrNumber[_index];
	
		function CreateButton(_nameButton){
			var button = document.createElement("button");
			button.setAttribute("id", _id + _nameButton);
			button.innerHTML = arrNumber[_index];
			button.style.backgroundColor = "#36d615";
			button.style.height = arrNumber[_index] * 10;
			button.style.left = _index * 110;
			button.classList.add('block');
			
			return button;
		}
	
	divContainerBubbleSort.appendChild(CreateButton('BS'));
	divContainerInsertionSort.appendChild(CreateButton('IS'));
	divContainerSelectionSort.appendChild(CreateButton('SS'));
}

/*
Добавление на страницу элементов массива
*/
function Show(arrNumber){
	
	for(var i=0; i<arrNumber.length; i++) {
		CreateBlock(i, arrNumber);
	}		
	alert (arrNumber);
	sessionStorage.setItem("arrNumber", arrNumber);
}

/*
Генерация массива. Если пользователь не ввел в текстовое поле числа,
то сгенерируется массив случайных чисел
*/
function GenArray(){ 
	ClearContainer();
	var inputString = document.getElementById('arrSort');
	var arrNumber;						
	if((inputString.value != "") && (inputString.value != " ")) {
		
		if(!(/[^\s[0-9]/.test(inputString.value))){
			arrNumber = inputString.value.split(' ');
		}else{
			alert("Введите числа");
		}
	} else {					
		arrNumber = [];
		var randNumber;
		
		while (arrNumber.length < 9) {					
			randNumber = Math.floor(Math.random() * 11);							
			if(arrNumber.indexOf(randNumber) == -1) {						
				arrNumber.push(randNumber);
			}
		}				
	}				
	Show(arrNumber);
}

function ClearContainer(){
	var containerBS = document.getElementById("divContainer_BubbleSort");
		while (containerBS.firstChild) {
		containerBS.removeChild(containerBS.firstChild);
	}
	
	var containerIS = document.getElementById("divContainer_InsertionSort");
		while (containerIS.firstChild) {
		containerIS.removeChild(containerIS.firstChild);
	}
	
	var containerSS = document.getElementById("divContainer_SelectionSort");
		while (containerSS.firstChild) {
		containerSS.removeChild(containerSS.firstChild);
	}
}