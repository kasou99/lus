window.LUS_X_NEWS = {
  "updatedAt": "2026-09-06T13:37:15.664Z",
  "items": [
    {
      "time": "22:34",
      "title": "東海-東北の太平洋側で大雨 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594468?source=rss",
      "publishedAt": "2026-09-06T13:34:42.000Z",
      "xQuery": "東海-東北の太平洋側で大雨 警戒"
    },
    {
      "time": "20:49",
      "title": "大雨予想で一部運休を発表 JR東",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594460?source=rss",
      "publishedAt": "2026-09-06T11:49:55.000Z",
      "xQuery": "大雨予想で一部運休を発表 JR東"
    },
    {
      "time": "18:55",
      "title": "ケーキ店火事 死亡の男性が関与か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594451?source=rss",
      "publishedAt": "2026-09-06T09:55:47.000Z",
      "xQuery": "ケーキ店火事 死亡の男性が関与か"
    },
    {
      "time": "20:06",
      "title": "IT各社 サイバー防御支援に商機",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594458?source=rss",
      "publishedAt": "2026-09-06T11:06:59.000Z",
      "xQuery": "IT各社 サイバー防御支援に商機"
    },
    {
      "time": "22:13",
      "title": "息子を亡くし 病気の子支える女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594467?source=rss",
      "publishedAt": "2026-09-06T13:13:14.000Z",
      "xQuery": "息子を亡くし 病気の子支える女性"
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
