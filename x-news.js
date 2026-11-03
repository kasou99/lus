window.LUS_X_NEWS = {
  "updatedAt": "2026-11-03T07:35:45.017Z",
  "items": [
    {
      "time": "14:58",
      "title": "トランプ政権に審判 民主優勢保つ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601173?source=rss",
      "publishedAt": "2026-11-03T05:58:52.000Z",
      "xQuery": "トランプ政権に審判 民主優勢保つ"
    },
    {
      "time": "14:46",
      "title": "米巨大IT5社とも増収 7～9月期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601172?source=rss",
      "publishedAt": "2026-11-03T05:46:47.000Z",
      "xQuery": "米巨大IT5社とも増収 7～9月期"
    },
    {
      "time": "16:22",
      "title": "無免許疑いの車にはねられる 重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601187?source=rss",
      "publishedAt": "2026-11-03T07:22:32.000Z",
      "xQuery": "無免許疑いの車にはねられる 重体"
    },
    {
      "time": "15:29",
      "title": "離婚後極貧 50歳で教員免許を取得",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601175?source=rss",
      "publishedAt": "2026-11-03T06:29:13.000Z",
      "xQuery": "離婚後極貧 50歳で教員免許を取得"
    },
    {
      "time": "15:46",
      "title": "夫より高学歴・高収入 妻の悩み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601184?source=rss",
      "publishedAt": "2026-11-03T06:46:01.000Z",
      "xQuery": "夫より高学歴・高収入 妻の悩み"
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
