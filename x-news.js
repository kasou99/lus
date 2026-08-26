window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T10:15:17.810Z",
  "items": [
    {
      "time": "18:26",
      "title": "ICC赤根所長 制裁受ける理由ない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593168?source=rss",
      "publishedAt": "2026-08-26T09:26:10.000Z",
      "xQuery": "ICC赤根所長 制裁受ける理由ない"
    },
    {
      "time": "17:42",
      "title": "ひかりんちょ 夏休み明けに不登校",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593162?source=rss",
      "publishedAt": "2026-08-26T08:42:57.000Z",
      "xQuery": "ひかりんちょ 夏休み明けに不登校"
    },
    {
      "time": "17:49",
      "title": "トランプ氏の息子殺害示唆 イラン",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593160?source=rss",
      "publishedAt": "2026-08-26T08:49:46.000Z",
      "xQuery": "トランプ氏の息子殺害示唆 イラン"
    },
    {
      "time": "10:18",
      "title": "TikTokに罰金47億円 ブラジル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593102?source=rss",
      "publishedAt": "2026-08-26T01:18:05.000Z",
      "xQuery": "TikTokに罰金47億円 ブラジル"
    },
    {
      "time": "18:02",
      "title": "左右の足間違え手術 患者側と和解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593163?source=rss",
      "publishedAt": "2026-08-26T09:02:47.000Z",
      "xQuery": "左右の足間違え手術 患者側と和解"
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
