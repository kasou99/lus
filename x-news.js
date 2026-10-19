window.LUS_X_NEWS = {
  "updatedAt": "2026-10-19T14:42:51.756Z",
  "items": [
    {
      "time": "23:05",
      "title": "仏首相 一部に夜間外出禁止令要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599406?source=rss",
      "publishedAt": "2026-10-19T14:05:17.000Z",
      "xQuery": "仏首相 一部に夜間外出禁止令要請"
    },
    {
      "time": "22:32",
      "title": "特定技能「給食」受け入れ再開へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599400?source=rss",
      "publishedAt": "2026-10-19T13:32:39.000Z",
      "xQuery": "特定技能「給食」受け入れ再開へ"
    },
    {
      "time": "19:34",
      "title": "中国経済成長 テック産業が後押し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599384?source=rss",
      "publishedAt": "2026-10-19T10:34:59.000Z",
      "xQuery": "中国経済成長 テック産業が後押し"
    },
    {
      "time": "22:55",
      "title": "部屋に遺体 包丁所持疑いで女逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599402?source=rss",
      "publishedAt": "2026-10-19T13:55:38.000Z",
      "xQuery": "部屋に遺体 包丁所持疑いで女逮捕"
    },
    {
      "time": "22:41",
      "title": "ユニクロが値上げ 11商品を11月に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599401?source=rss",
      "publishedAt": "2026-10-19T13:41:25.000Z",
      "xQuery": "ユニクロが値上げ 11商品を11月に"
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
