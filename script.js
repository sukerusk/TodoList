const quotes = [
    "成功とは、失敗を重ねても情熱を失わないことだ。 - ウィンストン・チャーチル",
    "人生は一度きり。それをどう生きるかが大事だ。 - スティーブ・ジョブズ",
    "できると思えばできる、できないと思えばできない。それが現実だ。 - ヘンリー・フォード",
    "何事も始めなければ、何も起こらない。 - マイケル・ジョーダン",
    "最も大切なのは、自分を信じることだ。 - ブルース・リー"
];

const quoteElement = document.getElementById("quote");
const button = document.getElementById("nextQuote");

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

button.addEventListener("click", getRandomQuote);

// 初回読み込み時にランダムな名言を表示
getRandomQuote();