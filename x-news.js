window.LUS_X_NEWS = {
  "updatedAt": "2026-08-15T23:06:52.570Z",
  "items": [
    {
      "time": "21:53",
      "title": "戦地へ向かった父 1度の抱っこ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591872?source=rss",
      "publishedAt": "2026-08-15T12:53:53.000Z",
      "xQuery": "戦地へ向かった父 1度の抱っこ"
    },
    {
      "time": "07:42",
      "title": "熊本地震 なお3205人が避難所に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591894?source=rss",
      "publishedAt": "2026-08-15T22:42:46.000Z",
      "xQuery": "熊本地震 なお3205人が避難所に"
    },
    {
      "time": "00:08",
      "title": "花火が地上付近で爆発 3人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591887?source=rss",
      "publishedAt": "2026-08-15T15:08:56.000Z",
      "xQuery": "花火が地上付近で爆発 3人けが"
    },
    {
      "time": "07:14",
      "title": "行方不明の英国籍12歳少女 保護",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591888?source=rss",
      "publishedAt": "2026-08-15T22:14:20.000Z",
      "xQuery": "行方不明の英国籍12歳少女 保護"
    },
    {
      "time": "07:52",
      "title": "SAトイレに急病人 対応に反響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591896?source=rss",
      "publishedAt": "2026-08-15T22:52:38.000Z",
      "xQuery": "SAトイレに急病人 対応に反響"
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
