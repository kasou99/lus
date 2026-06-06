window.LUS_X_NEWS = {
  "updatedAt": "2026-06-06T09:04:30.677Z",
  "items": [
    {
      "time": "17:30",
      "title": "都構想挑戦 吉村氏連立入りで決断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583193?source=rss",
      "publishedAt": "2026-06-06T08:30:13.000Z",
      "xQuery": "都構想挑戦 吉村氏連立入りで決断"
    },
    {
      "time": "16:42",
      "title": "栃木 強殺未遂疑い少年3人再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583186?source=rss",
      "publishedAt": "2026-06-06T07:42:32.000Z",
      "xQuery": "栃木 強殺未遂疑い少年3人再逮捕"
    },
    {
      "time": "17:30",
      "title": "イランが湾岸地域へ攻撃 米が迎撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583191?source=rss",
      "publishedAt": "2026-06-06T08:30:56.000Z",
      "xQuery": "イランが湾岸地域へ攻撃 米が迎撃"
    },
    {
      "time": "15:25",
      "title": "週明けにかけて警報級大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583172?source=rss",
      "publishedAt": "2026-06-06T06:25:24.000Z",
      "xQuery": "週明けにかけて警報級大雨の恐れ"
    },
    {
      "time": "17:51",
      "title": "アクエリ新商品 青い色は「王道」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583195?source=rss",
      "publishedAt": "2026-06-06T08:51:48.000Z",
      "xQuery": "アクエリ新商品 青い色は「王道」"
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
