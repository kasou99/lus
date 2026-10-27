window.LUS_X_NEWS = {
  "updatedAt": "2026-10-27T09:45:25.018Z",
  "items": [
    {
      "time": "18:28",
      "title": "北日本 今季一番強い寒気襲来へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600325?source=rss",
      "publishedAt": "2026-10-27T09:28:41.000Z",
      "xQuery": "北日本 今季一番強い寒気襲来へ"
    },
    {
      "time": "15:55",
      "title": "武部農相 選挙運動費報告「訂正」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600308?source=rss",
      "publishedAt": "2026-10-27T06:55:16.000Z",
      "xQuery": "武部農相 選挙運動費報告「訂正」"
    },
    {
      "time": "16:56",
      "title": "猪苗代湖ボート事故 禁錮2年確定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600313?source=rss",
      "publishedAt": "2026-10-27T07:56:30.000Z",
      "xQuery": "猪苗代湖ボート事故 禁錮2年確定"
    },
    {
      "time": "17:45",
      "title": "ニデック 創業者ら9人を提訴へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600319?source=rss",
      "publishedAt": "2026-10-27T08:45:36.000Z",
      "xQuery": "ニデック 創業者ら9人を提訴へ"
    },
    {
      "time": "18:22",
      "title": "ユニクロ ソックス価格改定を中止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600324?source=rss",
      "publishedAt": "2026-10-27T09:22:21.000Z",
      "xQuery": "ユニクロ ソックス価格改定を中止"
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
