window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T14:20:00.960Z",
  "items": [
    {
      "time": "20:42",
      "title": "中道 結党から7カ月で分裂へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593775?source=rss",
      "publishedAt": "2026-08-31T11:42:19.000Z",
      "xQuery": "中道 結党から7カ月で分裂へ"
    },
    {
      "time": "22:30",
      "title": "障害者雇用で広がる「代行」実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593784?source=rss",
      "publishedAt": "2026-08-31T13:30:03.000Z",
      "xQuery": "障害者雇用で広がる「代行」実態"
    },
    {
      "time": "21:54",
      "title": "住宅ローン変動金利 2行引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593780?source=rss",
      "publishedAt": "2026-08-31T12:54:07.000Z",
      "xQuery": "住宅ローン変動金利 2行引き上げ"
    },
    {
      "time": "09:07",
      "title": "Googleマップ アメリカ湖に変更",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593707?source=rss",
      "publishedAt": "2026-08-31T00:07:15.000Z",
      "xQuery": "Googleマップ アメリカ湖に変更"
    },
    {
      "time": "22:54",
      "title": "ITパスポート試験 シラバス案公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593786?source=rss",
      "publishedAt": "2026-08-31T13:54:44.000Z",
      "xQuery": "ITパスポート試験 シラバス案公開"
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
