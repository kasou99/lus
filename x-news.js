window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T23:36:28.765Z",
  "items": [
    {
      "time": "06:38",
      "title": "屋久島町に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594249?source=rss",
      "publishedAt": "2026-09-04T21:38:10.000Z",
      "xQuery": "屋久島町に特別警報 最新情報"
    },
    {
      "time": "07:43",
      "title": "太平洋側は大雨が長引く 備えを",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594256?source=rss",
      "publishedAt": "2026-09-04T22:43:05.000Z",
      "xQuery": "太平洋側は大雨が長引く 備えを"
    },
    {
      "time": "07:26",
      "title": "茂木外相留任へ 外交の継続性重視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594255?source=rss",
      "publishedAt": "2026-09-04T22:26:29.000Z",
      "xQuery": "茂木外相留任へ 外交の継続性重視"
    },
    {
      "time": "07:16",
      "title": "生後2カ月を殺害疑い 18歳男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594251?source=rss",
      "publishedAt": "2026-09-04T22:16:29.000Z",
      "xQuery": "生後2カ月を殺害疑い 18歳男逮捕"
    },
    {
      "time": "08:03",
      "title": "メルカトル図法やめて 国連採択",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594260?source=rss",
      "publishedAt": "2026-09-04T23:03:19.000Z",
      "xQuery": "メルカトル図法やめて 国連採択"
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
