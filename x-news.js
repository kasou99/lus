window.LUS_X_NEWS = {
  "updatedAt": "2026-10-22T22:38:26.513Z",
  "items": [
    {
      "time": "06:30",
      "title": "台風30号が先島諸島接近へ 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599757?source=rss",
      "publishedAt": "2026-10-22T21:30:26.000Z",
      "xQuery": "台風30号が先島諸島接近へ 警戒を"
    },
    {
      "time": "07:36",
      "title": "ANAが追加出資検討 中堅航空2社",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599762?source=rss",
      "publishedAt": "2026-10-22T22:36:33.000Z",
      "xQuery": "ANAが追加出資検討 中堅航空2社"
    },
    {
      "time": "06:21",
      "title": "NHKがBS再編検討 8Kの存廃焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599756?source=rss",
      "publishedAt": "2026-10-22T21:21:59.000Z",
      "xQuery": "NHKがBS再編検討 8Kの存廃焦点"
    },
    {
      "time": "07:16",
      "title": "大成建設・鹿島 国交省が処分方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599759?source=rss",
      "publishedAt": "2026-10-22T22:16:08.000Z",
      "xQuery": "大成建設・鹿島 国交省が処分方針"
    },
    {
      "time": "06:12",
      "title": "シャモンダウイルス 仏でヒト感染",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599754?source=rss",
      "publishedAt": "2026-10-22T21:12:14.000Z",
      "xQuery": "シャモンダウイルス 仏でヒト感染"
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
