window.LUS_X_NEWS = {
  "updatedAt": "2026-05-26T08:44:34.978Z",
  "items": [
    {
      "time": "16:39",
      "title": "1票の格差訴訟 広島高裁2件は合憲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581777?source=rss",
      "publishedAt": "2026-05-26T07:39:12.000Z",
      "xQuery": "1票の格差訴訟 広島高裁2件は合憲"
    },
    {
      "time": "13:50",
      "title": "防衛巡る中国の日本批判 対策3つ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581765?source=rss",
      "publishedAt": "2026-05-26T04:50:31.000Z",
      "xQuery": "防衛巡る中国の日本批判 対策3つ"
    },
    {
      "time": "16:21",
      "title": "中道離党の亀井亜紀子氏 立憲復党",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581776?source=rss",
      "publishedAt": "2026-05-26T07:21:37.000Z",
      "xQuery": "中道離党の亀井亜紀子氏 立憲復党"
    },
    {
      "time": "16:48",
      "title": "小学生10人に性加害 被告側が上告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581782?source=rss",
      "publishedAt": "2026-05-26T07:48:36.000Z",
      "xQuery": "小学生10人に性加害 被告側が上告"
    },
    {
      "time": "15:44",
      "title": "松下幸之助氏の「AI偽動画」注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581773?source=rss",
      "publishedAt": "2026-05-26T06:44:07.000Z",
      "xQuery": "松下幸之助氏の「AI偽動画」注意"
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
