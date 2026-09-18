window.LUS_X_NEWS = {
  "updatedAt": "2026-09-18T10:17:46.512Z",
  "items": [
    {
      "time": "18:58",
      "title": "茨城・神栖市長 当選無効巡り上告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595726?source=rss",
      "publishedAt": "2026-09-18T09:58:02.000Z",
      "xQuery": "茨城・神栖市長 当選無効巡り上告"
    },
    {
      "time": "16:36",
      "title": "北サイバー攻撃 世界で17億円被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595710?source=rss",
      "publishedAt": "2026-09-18T07:36:28.000Z",
      "xQuery": "北サイバー攻撃 世界で17億円被害"
    },
    {
      "time": "17:22",
      "title": "日銀総裁 会見で利上げペース言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595713?source=rss",
      "publishedAt": "2026-09-18T08:22:23.000Z",
      "xQuery": "日銀総裁 会見で利上げペース言及"
    },
    {
      "time": "16:53",
      "title": "副大臣に今井絵理子氏ら 名簿発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595712?source=rss",
      "publishedAt": "2026-09-18T07:53:50.000Z",
      "xQuery": "副大臣に今井絵理子氏ら 名簿発表"
    },
    {
      "time": "18:13",
      "title": "ヘルメットさせず子死亡 親の後悔",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595723?source=rss",
      "publishedAt": "2026-09-18T09:13:50.000Z",
      "xQuery": "ヘルメットさせず子死亡 親の後悔"
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
