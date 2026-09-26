window.LUS_X_NEWS = {
  "updatedAt": "2026-09-26T17:37:29.321Z",
  "items": [
    {
      "time": "22:45",
      "title": "首相 米と電話会談で「連携確認」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596665?source=rss",
      "publishedAt": "2026-09-26T13:45:00.000Z",
      "xQuery": "首相 米と電話会談で「連携確認」"
    },
    {
      "time": "21:31",
      "title": "合同結婚 在韓女性債権申し立てへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596652?source=rss",
      "publishedAt": "2026-09-26T12:31:14.000Z",
      "xQuery": "合同結婚 在韓女性債権申し立てへ"
    },
    {
      "time": "22:59",
      "title": "群馬殺人 事件前日に娘へ避難指導",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596664?source=rss",
      "publishedAt": "2026-09-26T13:59:09.000Z",
      "xQuery": "群馬殺人 事件前日に娘へ避難指導"
    },
    {
      "time": "23:03",
      "title": "トキエア再延期 県からの融資返済",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596667?source=rss",
      "publishedAt": "2026-09-26T14:03:46.000Z",
      "xQuery": "トキエア再延期 県からの融資返済"
    },
    {
      "time": "21:42",
      "title": "がん社内公表の役員 自ら平社員に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596655?source=rss",
      "publishedAt": "2026-09-26T12:42:56.000Z",
      "xQuery": "がん社内公表の役員 自ら平社員に"
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
