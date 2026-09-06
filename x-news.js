window.LUS_X_NEWS = {
  "updatedAt": "2026-09-06T02:42:25.644Z",
  "items": [
    {
      "time": "11:10",
      "title": "1都3県 あすにかけ線状降水帯恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594400?source=rss",
      "publishedAt": "2026-09-06T02:10:33.000Z",
      "xQuery": "1都3県 あすにかけ線状降水帯恐れ"
    },
    {
      "time": "07:56",
      "title": "内閣改造 林芳正氏の去就焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594375?source=rss",
      "publishedAt": "2026-09-05T22:56:47.000Z",
      "xQuery": "内閣改造 林芳正氏の去就焦点"
    },
    {
      "time": "09:31",
      "title": "電子図書館 全国自治体3割超導入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594388?source=rss",
      "publishedAt": "2026-09-06T00:31:03.000Z",
      "xQuery": "電子図書館 全国自治体3割超導入"
    },
    {
      "time": "10:44",
      "title": "ケーキ店2人死亡火災 知人関与か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594397?source=rss",
      "publishedAt": "2026-09-06T01:44:24.000Z",
      "xQuery": "ケーキ店2人死亡火災 知人関与か"
    },
    {
      "time": "10:35",
      "title": "「自分は臭い」と思い込み 対処法",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594398?source=rss",
      "publishedAt": "2026-09-06T01:35:51.000Z",
      "xQuery": "「自分は臭い」と思い込み 対処法"
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
