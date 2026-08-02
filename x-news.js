window.LUS_X_NEWS = {
  "updatedAt": "2026-08-02T15:53:51.423Z",
  "items": [
    {
      "time": "21:01",
      "title": "災害関連死の抑制に軸足 官房長官",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590302?source=rss",
      "publishedAt": "2026-08-02T12:01:51.000Z",
      "xQuery": "災害関連死の抑制に軸足 官房長官"
    },
    {
      "time": "20:18",
      "title": "高額療養費見直し 政府の狙いは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590298?source=rss",
      "publishedAt": "2026-08-02T11:18:01.000Z",
      "xQuery": "高額療養費見直し 政府の狙いは"
    },
    {
      "time": "22:33",
      "title": "爆発前戻るよう指示 店舗運営謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590315?source=rss",
      "publishedAt": "2026-08-02T13:33:16.000Z",
      "xQuery": "爆発前戻るよう指示 店舗運営謝罪"
    },
    {
      "time": "20:15",
      "title": "落石で女性死亡 小学生の子が目撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590299?source=rss",
      "publishedAt": "2026-08-02T11:15:25.000Z",
      "xQuery": "落石で女性死亡 小学生の子が目撃"
    },
    {
      "time": "23:27",
      "title": "車2台が正面衝突 1人死亡2人重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590321?source=rss",
      "publishedAt": "2026-08-02T14:27:43.000Z",
      "xQuery": "車2台が正面衝突 1人死亡2人重体"
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
