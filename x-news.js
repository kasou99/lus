window.LUS_X_NEWS = {
  "updatedAt": "2026-08-07T04:20:16.429Z",
  "items": [
    {
      "time": "11:58",
      "title": "台風13号 沖縄・奄美に最接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590846?source=rss",
      "publishedAt": "2026-08-07T02:58:27.000Z",
      "xQuery": "台風13号 沖縄・奄美に最接近"
    },
    {
      "time": "11:58",
      "title": "広島が嫌いだった 86歳で初の式典",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590842?source=rss",
      "publishedAt": "2026-08-07T02:58:53.000Z",
      "xQuery": "広島が嫌いだった 86歳で初の式典"
    },
    {
      "time": "11:36",
      "title": "スクーターと車衝突 高校生が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590840?source=rss",
      "publishedAt": "2026-08-07T02:36:04.000Z",
      "xQuery": "スクーターと車衝突 高校生が死亡"
    },
    {
      "time": "10:30",
      "title": "従業員「退職」で倒産 最多ペース",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590833?source=rss",
      "publishedAt": "2026-08-07T01:30:52.000Z",
      "xQuery": "従業員「退職」で倒産 最多ペース"
    },
    {
      "time": "11:35",
      "title": "西鉄の駅で不適切音声 被害届検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590838?source=rss",
      "publishedAt": "2026-08-07T02:35:18.000Z",
      "xQuery": "西鉄の駅で不適切音声 被害届検討"
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
