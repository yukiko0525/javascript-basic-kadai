// untypedの変数
let untyped = '';
let typed = '';
let score = 0;

// untypedのHTMLからの呼び出し
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');


//untypedの文字リスト
const textLists = [
  'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];


const createText = () => {
  // 文字が正しかったらクリアする
  typed = '';
  typedfield.textContent = typed;

  // ランダムに文字を出力する
  let random = Math.floor(Math.random() * textLists.length);
  untyped= textLists[random];
  untypedfield.textContent = untyped;
};


// キーボードの入力判定 e.keyは何のキーが入力されたかの情報を得る
const keyPress = e => {

  // 間違えているとき
  if(e.key !== untyped.substring(0, 1)) {
   wrap.classList.add('mistyped');

  //  100ms後に背景色を元に戻す
  setTimeout(() => {
    wrap.classList.remove('mistyped');
  }, 100);
    return;
  }

  // 正しいとき
  score++;
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};


// タイピングのランク
const rankCheck = score => {
  let text = '';

  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
  text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;

  }

  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;

};

// ゲームオーバー
const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

  if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // タイマーの「６０」をHTMLから取得
  let time = count.textContent;

  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが０になったら停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート
start.addEventListener('click', ()  => {

  // カウントダウンタイマーの開始
  timer();

  // ランダムなテキストの表示
  createText();

  // スタートボタンを非表示
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);

});

untypedfield.textContent = 'スタートボタンで開始';