window.LUS_X_NEWS = {
  "updatedAt": "2026-07-13T09:14:35.037Z",
  "items": [
    {
      "time": "17:26",
      "title": "SNS規制法成立 選挙の偽情報対策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587793?source=rss",
      "publishedAt": "2026-07-13T08:26:51.000Z",
      "xQuery": "SNS規制法成立 選挙の偽情報対策"
    },
    {
      "time": "16:50",
      "title": "東北-北海道 15日から大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587791?source=rss",
      "publishedAt": "2026-07-13T07:50:38.000Z",
      "xQuery": "東北-北海道 15日から大雨恐れ"
    },
    {
      "time": "16:34",
      "title": "県議会の現金授受疑惑 音声を分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587788?source=rss",
      "publishedAt": "2026-07-13T07:34:33.000Z",
      "xQuery": "県議会の現金授受疑惑 音声を分析"
    },
    {
      "time": "17:03",
      "title": "ダンプ逆走か 正面衝突し1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587792?source=rss",
      "publishedAt": "2026-07-13T08:03:53.000Z",
      "xQuery": "ダンプ逆走か 正面衝突し1人死亡"
    },
    {
      "time": "17:47",
      "title": "窓割れるほどの衝撃音 都内で火災",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587800?source=rss",
      "publishedAt": "2026-07-13T08:47:03.000Z",
      "xQuery": "窓割れるほどの衝撃音 都内で火災"
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
