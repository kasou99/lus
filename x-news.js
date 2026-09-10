window.LUS_X_NEWS = {
  "updatedAt": "2026-09-10T12:26:44.609Z",
  "items": [
    {
      "time": "19:22",
      "title": "11日 関東甲信など警報級大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594891?source=rss",
      "publishedAt": "2026-09-10T10:22:32.000Z",
      "xQuery": "11日 関東甲信など警報級大雨恐れ"
    },
    {
      "time": "18:54",
      "title": "ニデック創業者らに株主代表訴訟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594887?source=rss",
      "publishedAt": "2026-09-10T09:54:25.000Z",
      "xQuery": "ニデック創業者らに株主代表訴訟"
    },
    {
      "time": "18:18",
      "title": "国家公務員宿舎をリノベ 初公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594877?source=rss",
      "publishedAt": "2026-09-10T09:18:58.000Z",
      "xQuery": "国家公務員宿舎をリノベ 初公開"
    },
    {
      "time": "17:43",
      "title": "鳥貴族 均一価格410円に値上げへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594875?source=rss",
      "publishedAt": "2026-09-10T08:43:17.000Z",
      "xQuery": "鳥貴族 均一価格410円に値上げへ"
    },
    {
      "time": "18:17",
      "title": "野生ラッコ巡り町議が違反 辞職へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594885?source=rss",
      "publishedAt": "2026-09-10T09:17:44.000Z",
      "xQuery": "野生ラッコ巡り町議が違反 辞職へ"
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
