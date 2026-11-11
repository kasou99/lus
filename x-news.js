window.LUS_X_NEWS = {
  "updatedAt": "2026-11-11T23:35:17.951Z",
  "items": [
    {
      "time": "07:55",
      "title": "核「持ち込ませず」例外検討 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602246?source=rss",
      "publishedAt": "2026-11-11T22:55:34.000Z",
      "xQuery": "核「持ち込ませず」例外検討 政府"
    },
    {
      "time": "06:28",
      "title": "Amazon出品者「安値強要された」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602237?source=rss",
      "publishedAt": "2026-11-11T21:28:30.000Z",
      "xQuery": "Amazon出品者「安値強要された」"
    },
    {
      "time": "08:20",
      "title": "エヌビディアがCEO解任準備 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602248?source=rss",
      "publishedAt": "2026-11-11T23:20:47.000Z",
      "xQuery": "エヌビディアがCEO解任準備 報道"
    },
    {
      "time": "07:26",
      "title": "厚労省 残業タクシー「半減」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602242?source=rss",
      "publishedAt": "2026-11-11T22:26:36.000Z",
      "xQuery": "厚労省 残業タクシー「半減」"
    },
    {
      "time": "21:30",
      "title": "月収5万円 受診遅れ死亡した男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602222?source=rss",
      "publishedAt": "2026-11-11T12:30:08.000Z",
      "xQuery": "月収5万円 受診遅れ死亡した男性"
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
