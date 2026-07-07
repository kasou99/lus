window.LUS_X_NEWS = {
  "updatedAt": "2026-07-07T11:06:33.922Z",
  "items": [
    {
      "time": "18:45",
      "title": "西日本豪雨8年 亡き義母への思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587079?source=rss",
      "publishedAt": "2026-07-07T09:45:00.000Z",
      "xQuery": "西日本豪雨8年 亡き義母への思い"
    },
    {
      "time": "16:39",
      "title": "広島知事 首相は原爆資料館視察を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587060?source=rss",
      "publishedAt": "2026-07-07T07:39:14.000Z",
      "xQuery": "広島知事 首相は原爆資料館視察を"
    },
    {
      "time": "18:58",
      "title": "立花孝志被告の保釈 地裁が認めず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587083?source=rss",
      "publishedAt": "2026-07-07T09:58:31.000Z",
      "xQuery": "立花孝志被告の保釈 地裁が認めず"
    },
    {
      "time": "18:02",
      "title": "白タク疑い逮捕 120km/hで事故か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587069?source=rss",
      "publishedAt": "2026-07-07T09:02:16.000Z",
      "xQuery": "白タク疑い逮捕 120km/hで事故か"
    },
    {
      "time": "19:25",
      "title": "激しく光る物体 沖縄で目撃20分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587086?source=rss",
      "publishedAt": "2026-07-07T10:25:25.000Z",
      "xQuery": "激しく光る物体 沖縄で目撃20分"
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
