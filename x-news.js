window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T12:48:52.437Z",
  "items": [
    {
      "time": "19:02",
      "title": "20-21日 西-東日本で警報級大雨か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584871?source=rss",
      "publishedAt": "2026-06-19T10:02:44.000Z",
      "xQuery": "20-21日 西-東日本で警報級大雨か"
    },
    {
      "time": "21:41",
      "title": "米イラン合意に暗雲 強硬派の動き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584884?source=rss",
      "publishedAt": "2026-06-19T12:41:41.000Z",
      "xQuery": "米イラン合意に暗雲 強硬派の動き"
    },
    {
      "time": "20:59",
      "title": "東海道新幹線 全線で運転再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584881?source=rss",
      "publishedAt": "2026-06-19T11:59:25.000Z",
      "xQuery": "東海道新幹線 全線で運転再開"
    },
    {
      "time": "20:02",
      "title": "都内小学校火事 校長ら会見で謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584876?source=rss",
      "publishedAt": "2026-06-19T11:02:34.000Z",
      "xQuery": "都内小学校火事 校長ら会見で謝罪"
    },
    {
      "time": "20:51",
      "title": "ホテルで高校生ら110人 食中毒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584880?source=rss",
      "publishedAt": "2026-06-19T11:51:56.000Z",
      "xQuery": "ホテルで高校生ら110人 食中毒"
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
