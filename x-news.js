window.LUS_X_NEWS = {
  "updatedAt": "2026-11-11T00:29:43.001Z",
  "items": [
    {
      "time": "08:01",
      "title": "日本のエンタメを排除 きしむ日中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602115?source=rss",
      "publishedAt": "2026-11-10T23:01:30.000Z",
      "xQuery": "日本のエンタメを排除 きしむ日中"
    },
    {
      "time": "08:24",
      "title": "障害者雇用ビジネス 登録制を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602117?source=rss",
      "publishedAt": "2026-11-10T23:24:17.000Z",
      "xQuery": "障害者雇用ビジネス 登録制を検討"
    },
    {
      "time": "07:40",
      "title": "生徒乗る遊覧船定員1.7倍で航行か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602112?source=rss",
      "publishedAt": "2026-11-10T22:40:19.000Z",
      "xQuery": "生徒乗る遊覧船定員1.7倍で航行か"
    },
    {
      "time": "08:03",
      "title": "イベ閑散 主催は集客「約束せず」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602113?source=rss",
      "publishedAt": "2026-11-10T23:03:13.000Z",
      "xQuery": "イベ閑散 主催は集客「約束せず」"
    },
    {
      "time": "08:41",
      "title": "「稼ぐ」マンション管理組合増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602118?source=rss",
      "publishedAt": "2026-11-10T23:41:27.000Z",
      "xQuery": "「稼ぐ」マンション管理組合増加"
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
