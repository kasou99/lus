window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T01:43:02.478Z",
  "items": [
    {
      "time": "08:27",
      "title": "正恩氏と「会うかも」トランプ氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598577?source=rss",
      "publishedAt": "2026-10-12T23:27:12.000Z",
      "xQuery": "正恩氏と「会うかも」トランプ氏"
    },
    {
      "time": "08:10",
      "title": "英基地事件はイラン関与 共同声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598574?source=rss",
      "publishedAt": "2026-10-12T23:10:20.000Z",
      "xQuery": "英基地事件はイラン関与 共同声明"
    },
    {
      "time": "09:05",
      "title": "九州新幹線が全線運休 再開は午後",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598582?source=rss",
      "publishedAt": "2026-10-13T00:05:57.000Z",
      "xQuery": "九州新幹線が全線運休 再開は午後"
    },
    {
      "time": "09:33",
      "title": "熟年離婚 修復経ず別れるケース増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598584?source=rss",
      "publishedAt": "2026-10-13T00:33:55.000Z",
      "xQuery": "熟年離婚 修復経ず別れるケース増"
    },
    {
      "time": "09:48",
      "title": "5年前から閉鎖 東大「赤門」は今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598585?source=rss",
      "publishedAt": "2026-10-13T00:48:04.000Z",
      "xQuery": "5年前から閉鎖 東大「赤門」は今"
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
