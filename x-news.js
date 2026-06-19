window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T23:29:52.840Z",
  "items": [
    {
      "time": "07:33",
      "title": "台風7号が発生 今後の動向に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584898?source=rss",
      "publishedAt": "2026-06-19T22:33:11.000Z",
      "xQuery": "台風7号が発生 今後の動向に注意"
    },
    {
      "time": "08:19",
      "title": "戦略17分野 370兆円超の投資試算",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584905?source=rss",
      "publishedAt": "2026-06-19T23:19:19.000Z",
      "xQuery": "戦略17分野 370兆円超の投資試算"
    },
    {
      "time": "08:00",
      "title": "コンゴ避難民30人死亡 エボラ熱か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584901?source=rss",
      "publishedAt": "2026-06-19T23:00:18.000Z",
      "xQuery": "コンゴ避難民30人死亡 エボラ熱か"
    },
    {
      "time": "07:37",
      "title": "列車事故で1人死亡33人重傷 英",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584899?source=rss",
      "publishedAt": "2026-06-19T22:37:36.000Z",
      "xQuery": "列車事故で1人死亡33人重傷 英"
    },
    {
      "time": "08:00",
      "title": "高校部活で水たばこ 無期限謹慎",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584902?source=rss",
      "publishedAt": "2026-06-19T23:00:40.000Z",
      "xQuery": "高校部活で水たばこ 無期限謹慎"
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
