window.LUS_X_NEWS = {
  "updatedAt": "2026-09-03T23:14:33.161Z",
  "items": [
    {
      "time": "07:21",
      "title": "四国や九州 災害危険度高まる恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594154?source=rss",
      "publishedAt": "2026-09-03T22:21:47.000Z",
      "xQuery": "四国や九州 災害危険度高まる恐れ"
    },
    {
      "time": "07:16",
      "title": "臨時国会 10月上旬に召集で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594153?source=rss",
      "publishedAt": "2026-09-03T22:16:03.000Z",
      "xQuery": "臨時国会 10月上旬に召集で調整"
    },
    {
      "time": "06:27",
      "title": "内閣改造 片山さつき財務相留任へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594150?source=rss",
      "publishedAt": "2026-09-03T21:27:22.000Z",
      "xQuery": "内閣改造 片山さつき財務相留任へ"
    },
    {
      "time": "06:06",
      "title": "日本製紙八代工場の火災鎮火",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594148?source=rss",
      "publishedAt": "2026-09-03T21:06:25.000Z",
      "xQuery": "日本製紙八代工場の火災鎮火"
    },
    {
      "time": "21:10",
      "title": "あべちか強殺未遂事件 容疑者逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594134?source=rss",
      "publishedAt": "2026-09-03T12:10:39.000Z",
      "xQuery": "あべちか強殺未遂事件 容疑者逮捕"
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
