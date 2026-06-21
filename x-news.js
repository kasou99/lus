window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T03:50:00.334Z",
  "items": [
    {
      "time": "11:46",
      "title": "森保J チュニジア戦のスタメン",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585067?source=rss",
      "publishedAt": "2026-06-21T02:46:35.000Z",
      "xQuery": "森保J チュニジア戦のスタメン"
    },
    {
      "time": "12:38",
      "title": "イスラエル当局 戦闘停止を命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585070?source=rss",
      "publishedAt": "2026-06-21T03:38:55.000Z",
      "xQuery": "イスラエル当局 戦闘停止を命令"
    },
    {
      "time": "11:46",
      "title": "東北北部が梅雨入り 気象庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585065?source=rss",
      "publishedAt": "2026-06-21T02:46:58.000Z",
      "xQuery": "東北北部が梅雨入り 気象庁"
    },
    {
      "time": "10:13",
      "title": "マレーシア EV輸入規制策導入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585057?source=rss",
      "publishedAt": "2026-06-21T01:13:56.000Z",
      "xQuery": "マレーシア EV輸入規制策導入へ"
    },
    {
      "time": "12:33",
      "title": "中道落選議員 スキマバイトで収入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585069?source=rss",
      "publishedAt": "2026-06-21T03:33:00.000Z",
      "xQuery": "中道落選議員 スキマバイトで収入"
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
