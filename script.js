document.getElementById('generate-btn').addEventListener('click', showQuote);

function showQuote() {
  const quoteEl = document.getElementById('quote');
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quote.textContent = randomQuote;
}


const quotes = [
  "未来を予測する最善の方法は、それを発明することだ。―アラン・ケイ",
  "人生とは自転車のようなものだ。バランスを取るためには動き続けなければならない。—アインシュタイン",
  "努力する人は希望を語り、怠ける人は不満を語る。—井上靖",
  "夢中で日を過ごしておれば、いつかはわかる時が来る。—坂本龍馬",
  "成功の秘訣は、成功するまで続けることにある。—ヘンリー・フォード",
  "自分を信じて、自分の道を進めばいい。—スティーブ・ジョブズ",
  "人は、自分が考えた通りの人生を生きる。—ジェームズ・アレン"
];