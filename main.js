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
		addA[i].dataset.number = "1";
		addA[i].dataset.mark = mark[i];
		addA[i].innerHTML = '<img src="trump/' + mark[i] + '-1' + '.png" style="opacity:0.3;" draggable="false">';

	// 試行回数を初期化
	count = 0;
	}
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
			cardId.innerHTML += '<div class="cardAll" data-mark="' + sliceArray[j].mark + '" data-number="' + sliceArray[j].number + '" draggable="true"><img src="trump/' + sliceArray[j].mark + '-' + sliceArray[j].number + '.png"></div>';
			
			// CSSを挿入
			const cardStyle= cardId.children
			cardStyle[j].style.top = j * -120 + "px";
		}
	}
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


// box-aにドロップされたら
interact('.box-a').dropzone({
  	ondrop(event) {

		pos.x = 0
    		pos.y = 0
			
		const relatedTarget = event.relatedTarget;
    		const target = event.target;
    		const dragData = relatedTarget.dataset.interact;
    		const dropData = target.dataset.interact;

		// ドラッグ要素とドロップ範囲のdatasetを取得
		const targetH = target.dataset;
		const relatedH = relatedTarget.dataset;

		// ドラッグ要素の最後の子要素を取得
		const last = relatedTarget.parentNode.lastElementChild;

		// ドラッグ要素の兄弟要素を取得
		const brother = relatedTarget.parentElement.children;


   		if (dragData === dropData) {

			// box-aに固定させる
			// マークと数字が同じで最後尾にある場合
        		if ( targetH.mark == relatedH.mark && targetH.number && relatedH.number && relatedTarget == last) {

				// ドロップ範囲に書き加える
            			target.innerHTML = "<div class='cardAll' data-mark='"+relatedH.mark+"' data-number='"+relatedH.number+"' draggable='false'>"+"<img src='trump/" + relatedH.mark + "-" + relatedH.number + ".png' draggable='false'>"+"</div>";

				// ドラッグ要素を消す
				relatedTarget.remove();
			
				// 試行回数カウント
				count++;

				// ドラッグ要素の兄弟要素の位置を調節
				for (let k = 0; k < brother.length; k++){
					brother[k].style.top = k * - 120 +"px";
				}

				// ゲームクリアか判断
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

				// 詰みか判定
				judge();

			// それ以外は元の位置に戻す
			}else{
				relatedTarget.style.transform = "translate(0, 0)";
			}
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
			const relatedH = relatedTarget.dataset;

			// ドロップ範囲の最後の子要素のdatasetを取得
			let lastH = null;
			if (target.lastElementChild){
				lastH = target.lastElementChild.dataset;
			}

			// ドラッグ要素の兄弟要素を取得
			const brother = relatedTarget.parentElement.children;

			// ドラッグ要素が何番目の要素か調べる				
			const Count = parseInt(relatedTarget.style.top)
			const brotherNum = (Math.abs(Count) / 120) + 1;
	
				
			// box-kに移動させる
			// 同じ列だった場合
			if (target == relatedTarget.parentElement){
				relatedTarget.style.transform = "translate(0, 0)";

			// マークが同じで数字が1つ小さい場合
        		}else if ( lastH && lastH.mark == relatedH.mark && Number(lastH.number)-1 == Number(relatedH.number) ) {

				// ドロップ範囲に書き換える
            			target.innerHTML += "<div class='cardAll' data-mark='"+relatedH.mark+"' data-number='"+relatedH.number+"' draggable='true'>"+"<img src='trump/" + relatedH.mark + "-" + relatedH.number + ".png'>"+"</div>"

				// ドロップ範囲に弟要素を書き加える
				for (let k = brotherNum; k < brother.length; k++){
					const littleH = brother[k].dataset;
					target.innerHTML += "<div class='cardAll' data-mark='"+littleH.mark+"' data-number='"+littleH.number+"' draggable='true'>"+"<img src='trump/" + littleH.mark + "-" + littleH.number + ".png'>"+"</div>"
				}

				// ドラッグ要素の弟要素を消す
				const brotherMany = brother.length;
				for (let k = brotherNum; k < brotherMany; k++){
					brother[brotherNum].remove();
				}
								
				// ドラッグ要素を消す
				relatedTarget.remove();

				// 試行回数カウント
				count++;

				// ドロップ範囲の要素の位置を調節
				const targetC = target.children;
				for (let k = 0; k < targetC.length; k++){
					targetC[k].style.top =  k * - 120 +"px";
				}

			// 列が空の場合
			}else if (target.children.length == 0 && relatedH.number == "13"){

				// ドロップ範囲に書き換える
            			target.innerHTML = "<div class='cardAll' data-mark='"+relatedH.mark+"' data-number='"+relatedH.number+"' draggable='true'>"+"<img src='trump/" + relatedH.mark + "-" + relatedH.number + ".png'>"+"</div>"

				// ドロップ範囲に弟要素を書き加える
				for (let k = brotherNum; k < brother.length; k++){
					const littleH = brother[k].dataset;
					target.innerHTML += "<div class='cardAll' data-mark='"+littleH.mark+"' data-number='"+littleH.number+"' draggable='true'>"+"<img src='trump/" + littleH.mark + "-" + littleH.number + ".png'>"+"</div>"
				}

				// ドラッグ要素の弟要素を消す
				const brotherMany = brother.length;
				for (let k = brotherNum; k < brotherMany; k++){
					brother[brotherNum].remove();
				}
								
				// ドラッグ要素を消す
				relatedTarget.remove();
	
				// 試行回数カウント
				count++;

				// ドロップ範囲の要素の位置を調節
				const targetC = target.children;
				for (let k = 0; k < targetC.length; k++){
					targetC[k].style.top =  k * - 120 +"px";
				}

			// それ以外は元の位置に戻す
			}else{
				relatedTarget.style.transform = "translate(0, 0)";
			}
		}

		// 詰みか判定
		judge();
	}
})

//ドラッグ中は重なりを上にする
.on("dropactivate", (event) => {
	event.relatedTarget.style.zIndex = "52";
})

//ドラッグ中止は重なりを元に戻す
.on("dropdeactivate", (event) => {
	event.relatedTarget.style.zIndex = "0";
})

// 詰みだったら
function judge(){
	let howMany = 0;
	let check = 0;
	for (let i = 0; i < 7; i++){
		const row = document.getElementById("card" + i);
		if (row.children.length > 0){
			howMany++;
			const lastNum = Number(row.lastElementChild.dataset.number);
			const lastMark = row.lastElementChild.dataset.mark;
			for (let j = 0; j < row.children.length-1; j++){
				const searchNum = Number(row.children[j].dataset.number);
				const searchMark = row.children[j].dataset.mark;
				if (lastMark == searchMark && searchNum == lastNum-1){
					check++;
					break;
				}
			}
		}
	}
	console.log("試行回数" + count + "回　詰みの列：" + check + "列　現在使われている列：" + howMany + "列");
	if (howMany == check){
		console.log("ゲームオーバー");
	}
}

//もう一度を押したら関数を呼び出す
function restart(){
	document.getElementById("gameClear").style.display = "none";
	document.getElementById("continue").style.display = "none";
}
