window.LUS_X_NEWS = {
  "updatedAt": "2026-11-06T03:36:16.155Z",
  "items": [
    {
      "time": "11:53",
      "title": "財務相 JT資産管理巡り露に抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601509?source=rss",
      "publishedAt": "2026-11-06T02:53:28.000Z",
      "xQuery": "財務相 JT資産管理巡り露に抗議"
    },
    {
      "time": "12:08",
      "title": "支援金対象は現役の3割以上 首相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601510?source=rss",
      "publishedAt": "2026-11-06T03:08:30.000Z",
      "xQuery": "支援金対象は現役の3割以上 首相"
    },
    {
      "time": "07:52",
      "title": "コロナ融資 918億円が回収困難に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601485?source=rss",
      "publishedAt": "2026-11-05T22:52:02.000Z",
      "xQuery": "コロナ融資 918億円が回収困難に"
    },
    {
      "time": "11:32",
      "title": "解体現場 10人が体調不良訴え搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601506?source=rss",
      "publishedAt": "2026-11-06T02:32:54.000Z",
      "xQuery": "解体現場 10人が体調不良訴え搬送"
    },
    {
      "time": "10:42",
      "title": "Suicaペンギンのバッグ 販売休止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601502?source=rss",
      "publishedAt": "2026-11-06T01:42:59.000Z",
      "xQuery": "Suicaペンギンのバッグ 販売休止"
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
