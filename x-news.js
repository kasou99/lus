window.LUS_X_NEWS = {
  "updatedAt": "2026-08-07T01:51:38.324Z",
  "items": [
    {
      "time": "09:56",
      "title": "4/30に6兆円超の介入 政府・日銀",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590832?source=rss",
      "publishedAt": "2026-08-07T00:56:22.000Z",
      "xQuery": "4/30に6兆円超の介入 政府・日銀"
    },
    {
      "time": "07:58",
      "title": "女性研究者支援 新制度設ける方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590820?source=rss",
      "publishedAt": "2026-08-06T22:58:11.000Z",
      "xQuery": "女性研究者支援 新制度設ける方針"
    },
    {
      "time": "08:09",
      "title": "イオン爆発遺族 本当のこと言って",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590821?source=rss",
      "publishedAt": "2026-08-06T23:09:41.000Z",
      "xQuery": "イオン爆発遺族 本当のこと言って"
    },
    {
      "time": "10:07",
      "title": "全東信破産 539億円超焦げ付くか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590831?source=rss",
      "publishedAt": "2026-08-07T01:07:51.000Z",
      "xQuery": "全東信破産 539億円超焦げ付くか"
    },
    {
      "time": "10:30",
      "title": "従業員「退職」で倒産 最多ペース",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590833?source=rss",
      "publishedAt": "2026-08-07T01:30:52.000Z",
      "xQuery": "従業員「退職」で倒産 最多ペース"
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
