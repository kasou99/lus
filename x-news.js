window.LUS_X_NEWS = {
  "updatedAt": "2026-07-18T03:09:22.676Z",
  "items": [
    {
      "time": "11:20",
      "title": "土砂で住宅倒壊 夫婦と連絡取れず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588370?source=rss",
      "publishedAt": "2026-07-18T02:20:36.000Z",
      "xQuery": "土砂で住宅倒壊 夫婦と連絡取れず"
    },
    {
      "time": "11:41",
      "title": "京アニ事件現場 今も更地のまま",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588372?source=rss",
      "publishedAt": "2026-07-18T02:41:23.000Z",
      "xQuery": "京アニ事件現場 今も更地のまま"
    },
    {
      "time": "11:17",
      "title": "京大の総長選考が波紋 教員ら反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588369?source=rss",
      "publishedAt": "2026-07-18T02:17:40.000Z",
      "xQuery": "京大の総長選考が波紋 教員ら反発"
    },
    {
      "time": "10:45",
      "title": "子の口腔機能発達不全症が増 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588368?source=rss",
      "publishedAt": "2026-07-18T01:45:03.000Z",
      "xQuery": "子の口腔機能発達不全症が増 背景"
    },
    {
      "time": "09:40",
      "title": "マンゴーが長野で豊作 趣味で栽培",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588362?source=rss",
      "publishedAt": "2026-07-18T00:40:06.000Z",
      "xQuery": "マンゴーが長野で豊作 趣味で栽培"
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
