window.LUS_X_NEWS = {
  "updatedAt": "2026-05-25T13:22:43.295Z",
  "items": [
    {
      "time": "21:38",
      "title": "米国の「正当な戦争」教皇が一蹴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581681?source=rss",
      "publishedAt": "2026-05-25T12:38:50.000Z",
      "xQuery": "米国の「正当な戦争」教皇が一蹴"
    },
    {
      "time": "21:12",
      "title": "強盗 標的情報出回っている可能性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581677?source=rss",
      "publishedAt": "2026-05-25T12:12:20.000Z",
      "xQuery": "強盗 標的情報出回っている可能性"
    },
    {
      "time": "21:00",
      "title": "習氏が高市氏巡り激高か 中国否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581674?source=rss",
      "publishedAt": "2026-05-25T12:00:21.000Z",
      "xQuery": "習氏が高市氏巡り激高か 中国否定"
    },
    {
      "time": "22:12",
      "title": "新宿2人逮捕 栃木強殺と関連捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581684?source=rss",
      "publishedAt": "2026-05-25T13:12:07.000Z",
      "xQuery": "新宿2人逮捕 栃木強殺と関連捜査"
    },
    {
      "time": "21:55",
      "title": "警察接触の指名手配の男 目撃複数",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581683?source=rss",
      "publishedAt": "2026-05-25T12:55:37.000Z",
      "xQuery": "警察接触の指名手配の男 目撃複数"
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
