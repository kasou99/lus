window.LUS_X_NEWS = {
  "updatedAt": "2026-09-23T02:26:13.442Z",
  "items": [
    {
      "time": "09:43",
      "title": "台風25号の死者9人に 4人行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596221?source=rss",
      "publishedAt": "2026-09-23T00:43:06.000Z",
      "xQuery": "台風25号の死者9人に 4人行方不明"
    },
    {
      "time": "07:47",
      "title": "米大統領 質問したCNN記者を威圧",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596205?source=rss",
      "publishedAt": "2026-09-22T22:47:17.000Z",
      "xQuery": "米大統領 質問したCNN記者を威圧"
    },
    {
      "time": "08:20",
      "title": "とび職に逆風 倒産過去最多ペース",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596209?source=rss",
      "publishedAt": "2026-09-22T23:20:05.000Z",
      "xQuery": "とび職に逆風 倒産過去最多ペース"
    },
    {
      "time": "09:05",
      "title": "クジラが千葉漂着 爆発の危険性も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596217?source=rss",
      "publishedAt": "2026-09-23T00:05:33.000Z",
      "xQuery": "クジラが千葉漂着 爆発の危険性も"
    },
    {
      "time": "10:43",
      "title": "進化系おにぎり専門店 売れる訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596228?source=rss",
      "publishedAt": "2026-09-23T01:43:47.000Z",
      "xQuery": "進化系おにぎり専門店 売れる訳"
    }
  ]
};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
