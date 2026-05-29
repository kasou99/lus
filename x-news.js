window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T03:51:00.121Z",
  "items": [
    {
      "time": "11:25",
      "title": "台風6号 沖縄・奄美は大荒れ警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582142?source=rss",
      "publishedAt": "2026-05-29T02:25:33.000Z",
      "xQuery": "台風6号 沖縄・奄美は大荒れ警戒"
    },
    {
      "time": "12:08",
      "title": "飲食料品 夏以降値上げラッシュか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582147?source=rss",
      "publishedAt": "2026-05-29T03:08:59.000Z",
      "xQuery": "飲食料品 夏以降値上げラッシュか"
    },
    {
      "time": "12:32",
      "title": "JAL機が緊急着陸 タイヤ不具合か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582152?source=rss",
      "publishedAt": "2026-05-29T03:32:01.000Z",
      "xQuery": "JAL機が緊急着陸 タイヤ不具合か"
    },
    {
      "time": "12:37",
      "title": "山梨女児不明 母苦しんだ「正論」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582151?source=rss",
      "publishedAt": "2026-05-29T03:37:15.000Z",
      "xQuery": "山梨女児不明 母苦しんだ「正論」"
    },
    {
      "time": "10:26",
      "title": "ハーバード卒業式ゲスト 政権批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582131?source=rss",
      "publishedAt": "2026-05-29T01:26:04.000Z",
      "xQuery": "ハーバード卒業式ゲスト 政権批判"
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
