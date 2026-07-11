window.LUS_X_NEWS = {
  "updatedAt": "2026-07-11T07:37:08.427Z",
  "items": [
    {
      "time": "14:51",
      "title": "台風 沖縄は暴風や大雨などに警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587554?source=rss",
      "publishedAt": "2026-07-11T05:51:18.000Z",
      "xQuery": "台風 沖縄は暴風や大雨などに警戒"
    },
    {
      "time": "15:18",
      "title": "全東信が破産 契約店から憤りの声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587556?source=rss",
      "publishedAt": "2026-07-11T06:18:31.000Z",
      "xQuery": "全東信が破産 契約店から憤りの声"
    },
    {
      "time": "12:39",
      "title": "首切断事件 現場ホテル厳しい現実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587533?source=rss",
      "publishedAt": "2026-07-11T03:39:02.000Z",
      "xQuery": "首切断事件 現場ホテル厳しい現実"
    },
    {
      "time": "15:19",
      "title": "多頭飼育の男性急死 保護団体奔走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587557?source=rss",
      "publishedAt": "2026-07-11T06:19:14.000Z",
      "xQuery": "多頭飼育の男性急死 保護団体奔走"
    },
    {
      "time": "14:18",
      "title": "唇縫う事件前 女性関係者警察相談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587549?source=rss",
      "publishedAt": "2026-07-11T05:18:47.000Z",
      "xQuery": "唇縫う事件前 女性関係者警察相談"
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
