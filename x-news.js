window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T16:19:37.312Z",
  "items": [
    {
      "time": "20:06",
      "title": "ネパール土石流がれき220万t 試算",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594779?source=rss",
      "publishedAt": "2026-09-09T11:06:38.000Z",
      "xQuery": "ネパール土石流がれき220万t 試算"
    },
    {
      "time": "23:36",
      "title": "睡眠研究の柳沢氏らにラスカー賞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594795?source=rss",
      "publishedAt": "2026-09-09T14:36:01.000Z",
      "xQuery": "睡眠研究の柳沢氏らにラスカー賞"
    },
    {
      "time": "16:35",
      "title": "丸亀製麺の運営会社に勧告 公取委",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594758?source=rss",
      "publishedAt": "2026-09-09T07:35:17.000Z",
      "xQuery": "丸亀製麺の運営会社に勧告 公取委"
    },
    {
      "time": "17:42",
      "title": "毒物浴び院生死亡 北大に市が指導",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594767?source=rss",
      "publishedAt": "2026-09-09T08:42:53.000Z",
      "xQuery": "毒物浴び院生死亡 北大に市が指導"
    },
    {
      "time": "22:24",
      "title": "人工内耳つけた子 育児奔走した母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594793?source=rss",
      "publishedAt": "2026-09-09T13:24:57.000Z",
      "xQuery": "人工内耳つけた子 育児奔走した母"
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
