window.LUS_X_NEWS = {
  "updatedAt": "2026-05-20T22:07:45.139Z",
  "items": [
    {
      "time": "06:07",
      "title": "米 キューバのカストロ氏を起訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581031?source=rss",
      "publishedAt": "2026-05-20T21:07:06.000Z",
      "xQuery": "米 キューバのカストロ氏を起訴"
    },
    {
      "time": "06:37",
      "title": "OpenAI 数週間内IPO非公開申請へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581033?source=rss",
      "publishedAt": "2026-05-20T21:37:39.000Z",
      "xQuery": "OpenAI 数週間内IPO非公開申請へ"
    },
    {
      "time": "23:17",
      "title": "栃木強殺 被害者の飼い犬も殺害か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581029?source=rss",
      "publishedAt": "2026-05-20T14:17:22.000Z",
      "xQuery": "栃木強殺 被害者の飼い犬も殺害か"
    },
    {
      "time": "23:38",
      "title": "クマ追い払おうとし 女性転び骨折",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581030?source=rss",
      "publishedAt": "2026-05-20T14:38:08.000Z",
      "xQuery": "クマ追い払おうとし 女性転び骨折"
    },
    {
      "time": "06:21",
      "title": "全国最年少の女性市長 産休取得へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581032?source=rss",
      "publishedAt": "2026-05-20T21:21:39.000Z",
      "xQuery": "全国最年少の女性市長 産休取得へ"
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
