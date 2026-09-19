window.LUS_X_NEWS = {
  "updatedAt": "2026-09-19T00:47:02.283Z",
  "items": [
    {
      "time": "07:13",
      "title": "台風 21日夕方〜夜に関東最接近か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595755?source=rss",
      "publishedAt": "2026-09-18T22:13:30.000Z",
      "xQuery": "台風 21日夕方〜夜に関東最接近か"
    },
    {
      "time": "09:09",
      "title": "内閣支持率が59%に上昇 読売調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595776?source=rss",
      "publishedAt": "2026-09-19T00:09:47.000Z",
      "xQuery": "内閣支持率が59%に上昇 読売調査"
    },
    {
      "time": "09:05",
      "title": "グリーンランド防衛 協定署名へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595777?source=rss",
      "publishedAt": "2026-09-19T00:05:57.000Z",
      "xQuery": "グリーンランド防衛 協定署名へ"
    },
    {
      "time": "07:15",
      "title": "円急騰 政府日銀が円買い介入準備",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595754?source=rss",
      "publishedAt": "2026-09-18T22:15:45.000Z",
      "xQuery": "円急騰 政府日銀が円買い介入準備"
    },
    {
      "time": "09:22",
      "title": "露 金獅子賞監督を「スパイ」指定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595778?source=rss",
      "publishedAt": "2026-09-19T00:22:00.000Z",
      "xQuery": "露 金獅子賞監督を「スパイ」指定"
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
