window.LUS_X_NEWS = {
  "updatedAt": "2026-11-16T05:36:21.928Z",
  "items": [
    {
      "time": "12:29",
      "title": "今週後半ほど気温低く 冬の空気に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602780?source=rss",
      "publishedAt": "2026-11-16T03:29:44.000Z",
      "xQuery": "今週後半ほど気温低く 冬の空気に"
    },
    {
      "time": "13:59",
      "title": "AI株下げ 日経平均一時6万円割れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602786?source=rss",
      "publishedAt": "2026-11-16T04:59:06.000Z",
      "xQuery": "AI株下げ 日経平均一時6万円割れ"
    },
    {
      "time": "13:54",
      "title": "斉藤被告 判決言い渡し静かに聞く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602788?source=rss",
      "publishedAt": "2026-11-16T04:54:20.000Z",
      "xQuery": "斉藤被告 判決言い渡し静かに聞く"
    },
    {
      "time": "13:30",
      "title": "分譲マンション賃料過去最高 東京",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602785?source=rss",
      "publishedAt": "2026-11-16T04:30:28.000Z",
      "xQuery": "分譲マンション賃料過去最高 東京"
    },
    {
      "time": "12:11",
      "title": "若者に広がる投資熱 その実態は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602779?source=rss",
      "publishedAt": "2026-11-16T03:11:43.000Z",
      "xQuery": "若者に広がる投資熱 その実態は"
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
