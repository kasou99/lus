window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T02:44:26.159Z",
  "items": [
    {
      "time": "11:13",
      "title": "消費減税法案 野党との間に隔たり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599213?source=rss",
      "publishedAt": "2026-10-18T02:13:29.000Z",
      "xQuery": "消費減税法案 野党との間に隔たり"
    },
    {
      "time": "09:39",
      "title": "医療機関の倒産 1-9月は過去最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599200?source=rss",
      "publishedAt": "2026-10-18T00:39:47.000Z",
      "xQuery": "医療機関の倒産 1-9月は過去最多"
    },
    {
      "time": "10:16",
      "title": "仏で55万人デモ 市庁舎ほぼ全焼",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599210?source=rss",
      "publishedAt": "2026-10-18T01:16:44.000Z",
      "xQuery": "仏で55万人デモ 市庁舎ほぼ全焼"
    },
    {
      "time": "08:30",
      "title": "シカ衝突し停車 追突され女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599195?source=rss",
      "publishedAt": "2026-10-17T23:30:31.000Z",
      "xQuery": "シカ衝突し停車 追突され女性死亡"
    },
    {
      "time": "08:50",
      "title": "海で「溺れている」通報 2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599197?source=rss",
      "publishedAt": "2026-10-17T23:50:24.000Z",
      "xQuery": "海で「溺れている」通報 2人死亡"
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
