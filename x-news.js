window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T23:24:09.555Z",
  "items": [
    {
      "time": "07:21",
      "title": "利根川進さん死去 ノーベル賞受賞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588101?source=rss",
      "publishedAt": "2026-07-15T22:21:38.000Z",
      "xQuery": "利根川進さん死去 ノーベル賞受賞"
    },
    {
      "time": "07:20",
      "title": "皇室典範改正 あす成立の公算大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588099?source=rss",
      "publishedAt": "2026-07-15T22:20:11.000Z",
      "xQuery": "皇室典範改正 あす成立の公算大"
    },
    {
      "time": "06:51",
      "title": "容疑者「便注入、死ぬか」と検索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588098?source=rss",
      "publishedAt": "2026-07-15T21:51:36.000Z",
      "xQuery": "容疑者「便注入、死ぬか」と検索"
    },
    {
      "time": "06:36",
      "title": "障害者に「クズ」 施設で虐待か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588096?source=rss",
      "publishedAt": "2026-07-15T21:36:31.000Z",
      "xQuery": "障害者に「クズ」 施設で虐待か"
    },
    {
      "time": "07:57",
      "title": "温泉施設で5歳不明 父が海上捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588104?source=rss",
      "publishedAt": "2026-07-15T22:57:50.000Z",
      "xQuery": "温泉施設で5歳不明 父が海上捜索"
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
