window.LUS_X_NEWS = {
  "updatedAt": "2026-10-22T18:45:43.274Z",
  "items": [
    {
      "time": "23:28",
      "title": "初の核最終処分場の操業決定 北欧",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599748?source=rss",
      "publishedAt": "2026-10-22T14:28:24.000Z",
      "xQuery": "初の核最終処分場の操業決定 北欧"
    },
    {
      "time": "22:50",
      "title": "免税制度変更へ「転売ヤー」防ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599745?source=rss",
      "publishedAt": "2026-10-22T13:50:19.000Z",
      "xQuery": "免税制度変更へ「転売ヤー」防ぐ"
    },
    {
      "time": "23:06",
      "title": "三菱自 ホンダに車両供給で合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599746?source=rss",
      "publishedAt": "2026-10-22T14:06:31.000Z",
      "xQuery": "三菱自 ホンダに車両供給で合意"
    },
    {
      "time": "23:54",
      "title": "ゴルフで80万円負担 福岡県議証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599750?source=rss",
      "publishedAt": "2026-10-22T14:54:19.000Z",
      "xQuery": "ゴルフで80万円負担 福岡県議証言"
    },
    {
      "time": "22:43",
      "title": "大阪で14歳が行方不明 14日朝から",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599744?source=rss",
      "publishedAt": "2026-10-22T13:43:09.000Z",
      "xQuery": "大阪で14歳が行方不明 14日朝から"
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
