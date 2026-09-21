window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T14:20:35.743Z",
  "items": [
    {
      "time": "23:14",
      "title": "大島町 土砂災害危険警報に切替",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596081?source=rss",
      "publishedAt": "2026-09-21T14:14:43.000Z",
      "xQuery": "大島町 土砂災害危険警報に切替"
    },
    {
      "time": "19:02",
      "title": "台風 最新情報や避難のポイント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596048?source=rss",
      "publishedAt": "2026-09-21T10:02:36.000Z",
      "xQuery": "台風 最新情報や避難のポイント"
    },
    {
      "time": "22:52",
      "title": "台風が連休直撃 観光客からため息",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596075?source=rss",
      "publishedAt": "2026-09-21T13:52:51.000Z",
      "xQuery": "台風が連休直撃 観光客からため息"
    },
    {
      "time": "21:14",
      "title": "8月に続き「またか」千葉で嘆き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596061?source=rss",
      "publishedAt": "2026-09-21T12:14:38.000Z",
      "xQuery": "8月に続き「またか」千葉で嘆き"
    },
    {
      "time": "22:53",
      "title": "東京・目黒区の住宅街 擁壁崩れる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596076?source=rss",
      "publishedAt": "2026-09-21T13:53:04.000Z",
      "xQuery": "東京・目黒区の住宅街 擁壁崩れる"
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
