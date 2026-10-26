window.LUS_X_NEWS = {
  "updatedAt": "2026-10-26T22:17:33.398Z",
  "items": [
    {
      "time": "20:49",
      "title": "スパイ防止へ登録制度案 政府提示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600226?source=rss",
      "publishedAt": "2026-10-26T11:49:19.000Z",
      "xQuery": "スパイ防止へ登録制度案 政府提示"
    },
    {
      "time": "23:20",
      "title": "露拘束の記者 大使館員が領事面会",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600239?source=rss",
      "publishedAt": "2026-10-26T14:20:32.000Z",
      "xQuery": "露拘束の記者 大使館員が領事面会"
    },
    {
      "time": "06:08",
      "title": "GMOに予告 正午に顧客情報公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600241?source=rss",
      "publishedAt": "2026-10-26T21:08:19.000Z",
      "xQuery": "GMOに予告 正午に顧客情報公開"
    },
    {
      "time": "00:02",
      "title": "米Anthropic IPO申請書類を公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600240?source=rss",
      "publishedAt": "2026-10-26T15:02:06.000Z",
      "xQuery": "米Anthropic IPO申請書類を公開"
    },
    {
      "time": "06:58",
      "title": "iPhone Duo画面不具合 交換対応",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600246?source=rss",
      "publishedAt": "2026-10-26T21:58:24.000Z",
      "xQuery": "iPhone Duo画面不具合 交換対応"
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
