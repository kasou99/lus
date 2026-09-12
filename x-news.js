window.LUS_X_NEWS = {
  "updatedAt": "2026-09-12T12:23:05.860Z",
  "items": [
    {
      "time": "17:10",
      "title": "秋雨前線が北上 激しい雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595071?source=rss",
      "publishedAt": "2026-09-12T08:10:29.000Z",
      "xQuery": "秋雨前線が北上 激しい雨の恐れ"
    },
    {
      "time": "17:09",
      "title": "ウ大統領 米は新たな対露制裁を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595070?source=rss",
      "publishedAt": "2026-09-12T08:09:40.000Z",
      "xQuery": "ウ大統領 米は新たな対露制裁を"
    },
    {
      "time": "21:18",
      "title": "陸上の大会で23人搬送 弁当原因か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595094?source=rss",
      "publishedAt": "2026-09-12T12:18:00.000Z",
      "xQuery": "陸上の大会で23人搬送 弁当原因か"
    },
    {
      "time": "19:27",
      "title": "海水浴場で2人溺れる 19歳が重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595084?source=rss",
      "publishedAt": "2026-09-12T10:27:29.000Z",
      "xQuery": "海水浴場で2人溺れる 19歳が重体"
    },
    {
      "time": "21:00",
      "title": "「時給100円」ブラックインターン",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595093?source=rss",
      "publishedAt": "2026-09-12T12:00:50.000Z",
      "xQuery": "「時給100円」ブラックインターン"
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
