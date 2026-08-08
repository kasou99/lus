window.LUS_X_NEWS = {
  "updatedAt": "2026-08-08T12:13:33.920Z",
  "items": [
    {
      "time": "17:34",
      "title": "夏休みに被災 ストレス感じる子も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591001?source=rss",
      "publishedAt": "2026-08-08T08:34:27.000Z",
      "xQuery": "夏休みに被災 ストレス感じる子も"
    },
    {
      "time": "19:51",
      "title": "避難で留守の家から窃盗疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591015?source=rss",
      "publishedAt": "2026-08-08T10:51:16.000Z",
      "xQuery": "避難で留守の家から窃盗疑い 逮捕"
    },
    {
      "time": "19:16",
      "title": "台風15号 11-12日に東北上陸恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591011?source=rss",
      "publishedAt": "2026-08-08T10:16:08.000Z",
      "xQuery": "台風15号 11-12日に東北上陸恐れ"
    },
    {
      "time": "20:25",
      "title": "露軍がウ首都や周辺攻撃 4人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591019?source=rss",
      "publishedAt": "2026-08-08T11:25:38.000Z",
      "xQuery": "露軍がウ首都や周辺攻撃 4人死亡"
    },
    {
      "time": "18:14",
      "title": "2歳がん診断 希望の薬は5500万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591002?source=rss",
      "publishedAt": "2026-08-08T09:14:55.000Z",
      "xQuery": "2歳がん診断 希望の薬は5500万円"
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
