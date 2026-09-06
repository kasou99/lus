window.LUS_X_NEWS = {
  "updatedAt": "2026-09-06T04:39:44.053Z",
  "items": [
    {
      "time": "13:34",
      "title": "東海・関東 災害級大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594412?source=rss",
      "publishedAt": "2026-09-06T04:34:55.000Z",
      "xQuery": "東海・関東 災害級大雨の恐れ"
    },
    {
      "time": "10:12",
      "title": "衛星監視網100基超に増強 国検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594393?source=rss",
      "publishedAt": "2026-09-06T01:12:38.000Z",
      "xQuery": "衛星監視網100基超に増強 国検討"
    },
    {
      "time": "10:28",
      "title": "子どもの肥満 貧困と深い関係",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594394?source=rss",
      "publishedAt": "2026-09-06T01:28:10.000Z",
      "xQuery": "子どもの肥満 貧困と深い関係"
    },
    {
      "time": "12:35",
      "title": "ケーキ店火災で3人死亡 放火か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594408?source=rss",
      "publishedAt": "2026-09-06T03:35:22.000Z",
      "xQuery": "ケーキ店火災で3人死亡 放火か"
    },
    {
      "time": "12:53",
      "title": "海水浴場で不明の男性 遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594409?source=rss",
      "publishedAt": "2026-09-06T03:53:04.000Z",
      "xQuery": "海水浴場で不明の男性 遺体で発見"
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
