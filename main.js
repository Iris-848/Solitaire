// スマホでスクロール禁止
document.addEventListener("touchmove", function(e) {e.preventDefault();}, {passive: false});


// カードを作成
const mark = ["spade","dia","clover","heart"];
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const card = [];
for (let i = 0; i < mark.length; i++){
	for (let j = 0; j < number.length; j++){
		let result = { number: number[j], mark: mark[i] };
		card.push(result);
	}
}

// カードをシャッフル
function shuffleCard(){

	// シャッフル
	for (let i = card.length - 1; i > 0; i--){
		let j = Math.floor(Math.random() * i);
		let temp = card[i];
		card[i] = card[j];
		card[j] = temp;
	}

}

// 試行回数をカウントしてコンソールに表示
let count = 0;

// 組札と場札を初期化
function resetCard(){

	// box-k(場札)を初期化
	for (let i = 0; i < 7; i++){
		const addK = document.getElementsByClassName("box-k");
		addK[i].innerHTML = "";
	}

	// box-a(組札)を初期化
	for (let i = 0; i < 4; i++){
		const addA = document.getElementsByClassName("box-a");
		addA[i].innerHTML = '<img src="trump/' + mark[i] + '-1' + '.png" style="opacity:0.3;" draggable="false" data-mark="' + mark[i] + '" data-number="1" data-card="sample">';
	}

	// 試行回数を初期化
	count = 0;
}


// カードを並べる
function makeCard(){

	// カードを分ける
	const slice = [card.slice(0, 1), card.slice(1, 7), card.slice(7, 14), card.slice(14, 22), card.slice(22, 31), card.slice(31, 41), card.slice(41)];
	
	// divを挿入
	for (let i = 0; i < 7; i++){
		cardId = document.getElementById("card"+i);
		for (let j = 0; j < slice[i].length; j++) {
			const sliceArray = slice[i];
			cardId.innerHTML += '<div class="cardAll" draggable="true"><img src="trump/' + sliceArray[j].mark + '-' + sliceArray[j].number + '.png" draggable="false" data-mark="' + sliceArray[j].mark + '" data-number="' + sliceArray[j].number + '"></div>';
			
			// CSSを挿入
			const cardStyle= cardId.children
			cardStyle[j].style.top = j * -120 + "px";
		}
	}

	// 自動で移動できるカードがないか、詰み＆ゲームオーバーか判断
	animation();
}




//ストップウォッチの初期値
let intervalId = null;
let passedTime = 0;
let previously = null;


//ストップウォッチをリセット
function resetStopwatch(){
		clearInterval(intervalId);
		passedTime = 0;
		previously = new Date();
		intervalId = setInterval(stopwatch, 1000);
}

//ストップウォッチを開始
function stopwatch(){
	const now = new Date();
	passedTime += now - previously;
	previously = now;
	const h = String(Math.floor(passedTime / (1000 * 60 * 60))).padStart(2, "0");	
	const m = String(Math.floor(passedTime / (1000 * 60) % 60)).padStart(2, "0");
	const s = String(Math.floor(passedTime / 1000) % 60).padStart(2, "0");
	document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
	document.getElementById("record").innerHTML = "記録　" + h + ":" + m + ":" + s;
}

// ストップウォッチを一時停止
function pauseStopwatch(){
	clearInterval(intervalId);
}

// ストップウォッチの再開
function restartStopwatch(){
	previously = new Date();
	intervalId =  setInterval(stopwatch, 1000);
}




// 設定と一時停止とクリアのモーダル非表示
document.getElementById("set").style.display = "none";
document.getElementById("information").style.display = "none";
document.getElementById("continue").style.display = "none";
document.getElementById("gameClear").style.display = "none";



// インフォメーションを開く
function information(){
	document.getElementById("information").style.display = "block";
}
// インフォメーションを閉じる
function closeInfo(){
	document.getElementById("information").style.display = "none";
}
	

// 設定を開く
function set(){
	document.getElementById("set").style.display = "block";
}
// 設定を閉じる
function closeS(){
	document.getElementById("set").style.display = "none";
}


// BGMの再生
document.querySelector("#classic").play();
function play(){
	document.querySelector("#classic").play();
}
// BGMのミュート
function pause(){
	document.querySelector("#classic").pause();
}
	

// ライトモード
const mode = document.querySelector("body");
function light(){
	mode.removeAttribute("id");
}
// ダークモード
function dark(){
	mode.id = "dark";
}



	
// スタートを押して関数を呼び出す
function start(){

	//モーダルを非表示
	document.getElementById("modalMusk").style.display = "none";
	document.getElementById("modal").style.display = "none";

	//組札と場札を初期化
	resetCard();

	//カードをシャッフル
	shuffleCard();

	//カードを並べる
	makeCard();

	//ストップウォッチをリセットする関数を呼び出す
	resetStopwatch();
}	



// 一時停止ボタンを押したら関数を呼び出す
function stop(){

	// ストップウォッチを一時停止
	pauseStopwatch();

	// モーダルを表示
	document.getElementById("modalMusk").style.display = "grid";
	document.getElementById("modal").style.display = "grid";
	document.getElementById("continue").style.display = "block";

	// STARTを書き換える
	document.getElementById("start").innerHTML = "最初から";
}



// 続きからを押したら関数を呼び出す
function continueGame(){

	// モーダルを非表示
	document.getElementById("modalMusk").style.display = "none";
	document.getElementById("modal").style.display = "none";
	document.getElementById("gameClear").style.display = "none";

	// ストップウォッチの再開
	restartStopwatch();
}



// ゲームクリアの関数を呼び出す
function gameClear(){
	document.getElementById("modalMusk").style.display = "grid";
	document.getElementById("modal").style.display = "grid";
	document.getElementById("gameClear").style.display = "grid";

	// ストップウォッチを一時停止
	pauseStopwatch();
		
	// 紙吹雪のjs
	confetti({
	       	particleCount: 150,
	       	spread: 800,
	       	origin: { y: 0.5 }
	});
}

//もう一度を押したら関数を呼び出す
function restart(){
	document.getElementById("gameClear").style.display = "none";
	document.getElementById("continue").style.display = "none";
}


// ドラッグ要素の位置
const pos = { x: 0, y: 0 }

//ドラッグする要素を指定
interact('.cardAll[draggable="true"]').draggable({

	//画面の外に要素が出たら画面内に戻す
	modifiers: [
      		interact.modifiers.restrictRect({
      			restriction: 'body',
        		endOnly: true
      		})
    	],
  	listeners: {
    		move(event) {
     	 		pos.x += event.dx
      			pos.y += event.dy
      			event.target.style.transform =`translate(${pos.x}px, ${pos.y}px)`
    		}
  	}
})

// box-kにドロップされたら
interact('.box-k').dropzone({
  	ondrop(event) {

		pos.x = 0
    		pos.y = 0
			
    		const relatedTarget = event.relatedTarget;
    		const target = event.target;
    		const dragData = relatedTarget.dataset.interact;
    		const dropData = target.dataset.interact;

   		if (dragData === dropData) {
				
			// ドラッグ要素のdatasetを取得
			const relatedH = relatedTarget.querySelector("img").dataset;

			// ドロップ範囲の最後の子要素のdatasetを取得
			let lastH = null;
			if (target.lastElementChild){
				lastH = target.lastElementChild.querySelector("img").dataset;
			}

			// ドラッグ要素の兄弟要素を取得
			const brother = relatedTarget.parentElement.children;

			// ドラッグ要素が何番目の要素か調べる				
			const Count = parseInt(relatedTarget.style.top)
			const brotherNum = (Math.abs(Count) / 120) + 1;
	
				
			// box-kに移動させる
			// マークが同じで数字が1つ小さい場合
        		if ( lastH && lastH.mark == relatedH.mark && Number(lastH.number)-1 == Number(relatedH.number) ) {
				moveBoxK(target, relatedTarget, brother, brotherNum);

			// 列が空の場合
			}else if (target.children.length == 0 && relatedH.number == "13"){
				moveBoxK(target, relatedTarget, brother, brotherNum);
			}
		}
		// 自動で移動できるカードがないか、詰み＆ゲームオーバーか判断
		overJudge();
		animation();
	}
})
//ドラッグ中は重なりを上にする
.on("dropactivate", (event) => {
	event.relatedTarget.style.zIndex = "52";
})

//ドラッグ中止は重なりを元に戻す
.on("dropdeactivate", (event) => {
	event.relatedTarget.style.zIndex = "0";
	event.relatedTarget.style.transform = "translate(0, 0)";
})

// box-kの移動
function moveBoxK(target, relatedTarget, brother, brotherNum){

	// 試行回数カウント
	count++;

	// ドロップ範囲に書き換える
        target.innerHTML += "<div class='cardAll' draggable='true'>" + relatedTarget.innerHTML + "</div>";

	// ドロップ範囲に弟要素を書き加える
	for (let k = brotherNum; k < brother.length; k++){
		target.innerHTML += "<div class='cardAll' draggable='true'>" + brother[k].innerHTML + "</div>";
	}

	// 弟要素を消す
	const brotherMany = brother.length;
	for (let k = brotherNum; k < brotherMany; k++){
		brother[brotherNum].remove();
	}
		
	// ドラッグ要素を消す
	relatedTarget.remove();

	// ドロップ範囲の要素の位置を調節
	const targetC = target.children;
	for (let k = 0; k < targetC.length; k++){
		targetC[k].style.top =  k * - 120 +"px";
	}
}

// 詰みだったら
function overJudge(){
	let howMany = 0;
	let check = 0;
	let countK = 0;
	for (let i = 0; i < 7; i++){
		const row = document.getElementById("card" + i);
		if (row.children.length > 0){
			howMany++;

			const last = row.lastElementChild.querySelector("img").dataset;
			for (let j = 0; j < row.children.length-1; j++){
				const search = row.children[j].querySelector("img").dataset;
				if (last.mark == search.mark && Number(search.number) == Number(last.number)-1){
					check++;
					break;
				}
			}
			for (let j = 0; j < row.children.length-1; j++){
				if (row.children[j+1].querySelector("img").dataset.number == "13"){
					countK++;
				}
			}
		}
	}
	console.log("試行回数：" + count + "回　最後尾が詰みの列：" + check + "列　現在の列：" + howMany + "列　動かせるKの数：" + countK + "個");

	if (howMany == check && howMany != 0 && !(countK > 0 && howMany < 7)){
		console.log("ゲームオーバー");
	}
}

// ゲームクリアか判断
function clearJudge(){

	const cardIds = ['card0', 'card1', 'card2', 'card3', 'card4', 'card5', 'card6'];

	// すべての子要素が0かどうかをチェック
	const allEmpty = cardIds.every(id => {
    		const cardElement = document.getElementById(id);
    		return cardElement && cardElement.children.length === 0;
	});

	// すべてのカード要素が空の場合にゲームクリアのを呼び出す
	if (allEmpty) {
    		gameClear();
	}
}

// 自動で移動判定
function animation(){
	// 組み札の位置を取得
	const spot = document.getElementsByClassName("box-a");
	let moved = false;
	for (let i = 0; i < 4; i++){
		const spotX = spot[i].getBoundingClientRect().left;
		const spotY = spot[i].getBoundingClientRect().top;
		const spotData = spot[i].lastElementChild.dataset;

		// 最後尾のカードを取得
		for (let j = 0; j < 7; j++){
			let lastCard = null;
			lastCard = document.getElementById("card" + j).lastElementChild;
			if (lastCard){
				const lastX = lastCard.getBoundingClientRect().left;
				const lastY = lastCard.getBoundingClientRect().top;
				const X = spotX - lastX;
				const Y = spotY - lastY;
				const lastData = lastCard.querySelector("img").dataset;

				// 最後尾のカードがAの場合 || 最後尾のカードがAより大きい場合
				if ((lastData.mark ==  spotData.mark && lastData.number == 1) || (lastData.mark ==  spotData.mark && Number(lastData.number) == Number(spotData.number) + 1 && spotData.card !== "sample")){

					// 試行回数カウント
					count++;
					moveAnimation(lastCard, spot, i, X, Y);
					moved = true;
					return;
				}
			}
		}
	}
}
// 自動で移動
function moveAnimation(lastCard, spot, i, X, Y){
	lastCard.style.transition = "transform 0.5s ease-in-out";
	lastCard.style.transform = `translate(${X}px, ${Y}px)`;
					
	lastCard.addEventListener("transitionend", () => {

		// 組札に書き加える
        	spot[i].innerHTML = lastCard.innerHTML;
		lastCard.remove();

		// 詰みか判定
		overJudge();

		// ゲームクリアか判断
		clearJudge();
			
		// 他にも自動で動かせるカードがないか判断
		animation();
	});
}

