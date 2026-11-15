window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T06:38:42.727Z",
  "items": [
    {
      "time": "13:19",
      "title": "米中露が会談へ 日本は蚊帳の外か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602660?source=rss",
      "publishedAt": "2026-11-15T04:19:08.000Z",
      "xQuery": "米中露が会談へ 日本は蚊帳の外か"
    },
    {
      "time": "13:46",
      "title": "大阪3歳死亡 平均体重5キロ下回る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602664?source=rss",
      "publishedAt": "2026-11-15T04:46:23.000Z",
      "xQuery": "大阪3歳死亡 平均体重5キロ下回る"
    },
    {
      "time": "15:20",
      "title": "福岡市HPが閲覧不可に 原因不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602673?source=rss",
      "publishedAt": "2026-11-15T06:20:58.000Z",
      "xQuery": "福岡市HPが閲覧不可に 原因不明"
    },
    {
      "time": "15:15",
      "title": "東京自由が丘「らしさ」消えた?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602670?source=rss",
      "publishedAt": "2026-11-15T06:15:25.000Z",
      "xQuery": "東京自由が丘「らしさ」消えた?"
    },
    {
      "time": "15:24",
      "title": "豊洲の公園にポケカ袋が散乱 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602672?source=rss",
      "publishedAt": "2026-11-15T06:24:54.000Z",
      "xQuery": "豊洲の公園にポケカ袋が散乱 波紋"
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
