window.LUS_X_NEWS = {
  "updatedAt": "2026-05-27T10:51:11.776Z",
  "items": [
    {
      "time": "19:23",
      "title": "台風6号北上 今後の進路に注意を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581932?source=rss",
      "publishedAt": "2026-05-27T10:23:06.000Z",
      "xQuery": "台風6号北上 今後の進路に注意を"
    },
    {
      "time": "18:54",
      "title": "高市陣営動画問題 AIを駆使と証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581927?source=rss",
      "publishedAt": "2026-05-27T09:54:26.000Z",
      "xQuery": "高市陣営動画問題 AIを駆使と証言"
    },
    {
      "time": "19:28",
      "title": "東大シンクタンク 次々研究者去る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581930?source=rss",
      "publishedAt": "2026-05-27T10:28:19.000Z",
      "xQuery": "東大シンクタンク 次々研究者去る"
    },
    {
      "time": "18:28",
      "title": "子と会えず自殺 遺族が妻と市提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581925?source=rss",
      "publishedAt": "2026-05-27T09:28:39.000Z",
      "xQuery": "子と会えず自殺 遺族が妻と市提訴"
    },
    {
      "time": "18:18",
      "title": "トクリュウの標的か 住人語る恐怖",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581923?source=rss",
      "publishedAt": "2026-05-27T09:18:06.000Z",
      "xQuery": "トクリュウの標的か 住人語る恐怖"
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
