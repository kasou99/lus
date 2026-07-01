window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T05:42:29.829Z",
  "items": [
    {
      "time": "12:02",
      "title": "旧宮家男系養子案 国民の理解焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586326?source=rss",
      "publishedAt": "2026-07-01T03:02:50.000Z",
      "xQuery": "旧宮家男系養子案 国民の理解焦点"
    },
    {
      "time": "13:29",
      "title": "中国で拘束の邦人2人 6月に逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586335?source=rss",
      "publishedAt": "2026-07-01T04:29:41.000Z",
      "xQuery": "中国で拘束の邦人2人 6月に逮捕"
    },
    {
      "time": "12:31",
      "title": "女性と女児死亡 父親を発見し逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586330?source=rss",
      "publishedAt": "2026-07-01T03:31:50.000Z",
      "xQuery": "女性と女児死亡 父親を発見し逮捕"
    },
    {
      "time": "13:53",
      "title": "不明の10歳 1.5km離れた滝で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586334?source=rss",
      "publishedAt": "2026-07-01T04:53:43.000Z",
      "xQuery": "不明の10歳 1.5km離れた滝で発見"
    },
    {
      "time": "12:05",
      "title": "死亡事例複数の薬 米誌が論文撤回",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586328?source=rss",
      "publishedAt": "2026-07-01T03:05:24.000Z",
      "xQuery": "死亡事例複数の薬 米誌が論文撤回"
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
