window.LUS_X_NEWS = {
  "updatedAt": "2026-05-31T09:12:01.821Z",
  "items": [
    {
      "time": "17:01",
      "title": "米大統領 和平提案の修正要求か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582436?source=rss",
      "publishedAt": "2026-05-31T08:01:32.000Z",
      "xQuery": "米大統領 和平提案の修正要求か"
    },
    {
      "time": "16:53",
      "title": "1号在留者受け入れ停止 外食悲鳴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582433?source=rss",
      "publishedAt": "2026-05-31T07:53:10.000Z",
      "xQuery": "1号在留者受け入れ停止 外食悲鳴"
    },
    {
      "time": "18:03",
      "title": "同乗者が事故死 酒気帯び疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582442?source=rss",
      "publishedAt": "2026-05-31T09:03:46.000Z",
      "xQuery": "同乗者が事故死 酒気帯び疑い逮捕"
    },
    {
      "time": "15:37",
      "title": "なぜ 街路樹の「やりすぎせん定」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582423?source=rss",
      "publishedAt": "2026-05-31T06:37:09.000Z",
      "xQuery": "なぜ 街路樹の「やりすぎせん定」"
    },
    {
      "time": "14:32",
      "title": "ヴィレヴァン本店閉店 ファンが列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582415?source=rss",
      "publishedAt": "2026-05-31T05:32:24.000Z",
      "xQuery": "ヴィレヴァン本店閉店 ファンが列"
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
