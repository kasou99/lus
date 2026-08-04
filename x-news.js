window.LUS_X_NEWS = {
  "updatedAt": "2026-08-04T13:11:03.648Z",
  "items": [
    {
      "time": "20:07",
      "title": "台風13号 週末は沖縄に直撃の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590534?source=rss",
      "publishedAt": "2026-08-04T11:07:29.000Z",
      "xQuery": "台風13号 週末は沖縄に直撃の恐れ"
    },
    {
      "time": "21:07",
      "title": "消費減税 財源示してと自民幹事長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590537?source=rss",
      "publishedAt": "2026-08-04T12:07:31.000Z",
      "xQuery": "消費減税 財源示してと自民幹事長"
    },
    {
      "time": "21:43",
      "title": "イオン爆発 告別式に飾ったドレス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590541?source=rss",
      "publishedAt": "2026-08-04T12:43:44.000Z",
      "xQuery": "イオン爆発 告別式に飾ったドレス"
    },
    {
      "time": "21:57",
      "title": "オンワード3人死亡「指導不徹底」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590542?source=rss",
      "publishedAt": "2026-08-04T12:57:09.000Z",
      "xQuery": "オンワード3人死亡「指導不徹底」"
    },
    {
      "time": "20:42",
      "title": "ルフィ事件 幹部の懲役20年確定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590536?source=rss",
      "publishedAt": "2026-08-04T11:42:31.000Z",
      "xQuery": "ルフィ事件 幹部の懲役20年確定へ"
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
