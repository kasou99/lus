window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T01:12:33.213Z",
  "items": [
    {
      "time": "10:01",
      "title": "森保Jドロー 決勝Tはブラジル戦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585709?source=rss",
      "publishedAt": "2026-06-26T01:01:18.000Z",
      "xQuery": "森保Jドロー 決勝Tはブラジル戦"
    },
    {
      "time": "08:49",
      "title": "台風遠い地域も大雨 土砂災害警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585693?source=rss",
      "publishedAt": "2026-06-25T23:49:44.000Z",
      "xQuery": "台風遠い地域も大雨 土砂災害警戒"
    },
    {
      "time": "08:01",
      "title": "法人の実質的支配者 新法で把握へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585684?source=rss",
      "publishedAt": "2026-06-25T23:01:05.000Z",
      "xQuery": "法人の実質的支配者 新法で把握へ"
    },
    {
      "time": "08:51",
      "title": "ホルムズ海峡 船舶に飛翔体直撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585689?source=rss",
      "publishedAt": "2026-06-25T23:51:39.000Z",
      "xQuery": "ホルムズ海峡 船舶に飛翔体直撃"
    },
    {
      "time": "08:54",
      "title": "MacもiPadも Appleが一斉値上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585690?source=rss",
      "publishedAt": "2026-06-25T23:54:09.000Z",
      "xQuery": "MacもiPadも Appleが一斉値上げ"
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
