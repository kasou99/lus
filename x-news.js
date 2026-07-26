window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T11:03:04.803Z",
  "items": [
    {
      "time": "18:20",
      "title": "週明け 九州で初の「酷暑日」か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589398?source=rss",
      "publishedAt": "2026-07-26T09:20:29.000Z",
      "xQuery": "週明け 九州で初の「酷暑日」か"
    },
    {
      "time": "18:22",
      "title": "障害者家族9割 殺傷事件「風化」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589399?source=rss",
      "publishedAt": "2026-07-26T09:22:33.000Z",
      "xQuery": "障害者家族9割 殺傷事件「風化」"
    },
    {
      "time": "17:51",
      "title": "難病の夫 認知症の妻が一番大好き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589394?source=rss",
      "publishedAt": "2026-07-26T08:51:34.000Z",
      "xQuery": "難病の夫 認知症の妻が一番大好き"
    },
    {
      "time": "16:43",
      "title": "ゴルフ場でカートから転落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589389?source=rss",
      "publishedAt": "2026-07-26T07:43:42.000Z",
      "xQuery": "ゴルフ場でカートから転落 死亡"
    },
    {
      "time": "17:44",
      "title": "26年前殺害された少女身元判明 米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589395?source=rss",
      "publishedAt": "2026-07-26T08:44:53.000Z",
      "xQuery": "26年前殺害された少女身元判明 米"
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
