window.LUS_X_NEWS = {
  "updatedAt": "2026-06-03T01:22:50.011Z",
  "items": [
    {
      "time": "09:29",
      "title": "台風接近 関東で危険警報相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582746?source=rss",
      "publishedAt": "2026-06-03T00:29:24.000Z",
      "xQuery": "台風接近 関東で危険警報相次ぐ"
    },
    {
      "time": "09:15",
      "title": "神奈川県東部 線状降水帯が発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582745?source=rss",
      "publishedAt": "2026-06-03T00:15:18.000Z",
      "xQuery": "神奈川県東部 線状降水帯が発生"
    },
    {
      "time": "10:00",
      "title": "日経平均株価 初の6万8000円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582750?source=rss",
      "publishedAt": "2026-06-03T01:00:45.000Z",
      "xQuery": "日経平均株価 初の6万8000円台"
    },
    {
      "time": "09:45",
      "title": "皇族数確保 養子は15歳以上を想定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582748?source=rss",
      "publishedAt": "2026-06-03T00:45:42.000Z",
      "xQuery": "皇族数確保 養子は15歳以上を想定"
    },
    {
      "time": "10:02",
      "title": "福島のマンホール事故 死者2人に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582749?source=rss",
      "publishedAt": "2026-06-03T01:02:24.000Z",
      "xQuery": "福島のマンホール事故 死者2人に"
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
