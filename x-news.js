window.LUS_X_NEWS = {
  "updatedAt": "2026-10-14T19:39:13.668Z",
  "items": [
    {
      "time": "23:12",
      "title": "農相辞表 内閣改造後わずか1カ月",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598790?source=rss",
      "publishedAt": "2026-10-14T14:12:54.000Z",
      "xQuery": "農相辞表 内閣改造後わずか1カ月"
    },
    {
      "time": "00:05",
      "title": "海峡で機雷接触の貨物船沈没 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598794?source=rss",
      "publishedAt": "2026-10-14T15:05:35.000Z",
      "xQuery": "海峡で機雷接触の貨物船沈没 報道"
    },
    {
      "time": "23:34",
      "title": "道新記者の拘束 日本政府に衝撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598791?source=rss",
      "publishedAt": "2026-10-14T14:34:55.000Z",
      "xQuery": "道新記者の拘束 日本政府に衝撃"
    },
    {
      "time": "22:01",
      "title": "新宿109KENZO 池田容疑者を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598783?source=rss",
      "publishedAt": "2026-10-14T13:01:56.000Z",
      "xQuery": "新宿109KENZO 池田容疑者を逮捕"
    },
    {
      "time": "00:20",
      "title": "万博未払い アンゴラ異例対応の訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598795?source=rss",
      "publishedAt": "2026-10-14T15:20:27.000Z",
      "xQuery": "万博未払い アンゴラ異例対応の訳"
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
