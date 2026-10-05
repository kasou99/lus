window.LUS_X_NEWS = {
  "updatedAt": "2026-10-05T05:32:01.871Z",
  "items": [
    {
      "time": "12:09",
      "title": "人手不足倒産 上半期で過去最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597600?source=rss",
      "publishedAt": "2026-10-05T03:09:24.000Z",
      "xQuery": "人手不足倒産 上半期で過去最多"
    },
    {
      "time": "13:05",
      "title": "大和証券 顧客情報11万人分漏洩か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597607?source=rss",
      "publishedAt": "2026-10-05T04:05:47.000Z",
      "xQuery": "大和証券 顧客情報11万人分漏洩か"
    },
    {
      "time": "13:52",
      "title": "安川電機前社長 小川昌寛さん死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597610?source=rss",
      "publishedAt": "2026-10-05T04:52:30.000Z",
      "xQuery": "安川電機前社長 小川昌寛さん死去"
    },
    {
      "time": "13:00",
      "title": "ごみ袋1枚135円 財政危機の北見市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597606?source=rss",
      "publishedAt": "2026-10-05T04:00:48.000Z",
      "xQuery": "ごみ袋1枚135円 財政危機の北見市"
    },
    {
      "time": "11:38",
      "title": "就活生の公安庁ツアー応募増 驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597592?source=rss",
      "publishedAt": "2026-10-05T02:38:10.000Z",
      "xQuery": "就活生の公安庁ツアー応募増 驚き"
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
