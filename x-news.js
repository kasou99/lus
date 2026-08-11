window.LUS_X_NEWS = {
  "updatedAt": "2026-08-11T12:50:19.257Z",
  "items": [
    {
      "time": "20:24",
      "title": "台風15号が茨城に上陸 災害に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591354?source=rss",
      "publishedAt": "2026-08-11T11:24:07.000Z",
      "xQuery": "台風15号が茨城に上陸 災害に警戒"
    },
    {
      "time": "15:51",
      "title": "仏全土の7割近くで水の使用制限",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591325?source=rss",
      "publishedAt": "2026-08-11T06:51:32.000Z",
      "xQuery": "仏全土の7割近くで水の使用制限"
    },
    {
      "time": "21:15",
      "title": "茨城県に台風上陸 現地のSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591349?source=rss",
      "publishedAt": "2026-08-11T12:15:18.000Z",
      "xQuery": "茨城県に台風上陸 現地のSNS投稿"
    },
    {
      "time": "21:22",
      "title": "子供2人死亡 海の流れに識者驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591355?source=rss",
      "publishedAt": "2026-08-11T12:22:54.000Z",
      "xQuery": "子供2人死亡 海の流れに識者驚き"
    },
    {
      "time": "20:59",
      "title": "YouTube 収益化ハードル引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591352?source=rss",
      "publishedAt": "2026-08-11T11:59:38.000Z",
      "xQuery": "YouTube 収益化ハードル引き上げ"
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
