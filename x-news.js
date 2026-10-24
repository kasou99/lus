window.LUS_X_NEWS = {
  "updatedAt": "2026-10-24T00:44:10.603Z",
  "items": [
    {
      "time": "07:15",
      "title": "強い台風30号は九州へ 警報級大雨",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599881?source=rss",
      "publishedAt": "2026-10-23T22:15:15.000Z",
      "xQuery": "強い台風30号は九州へ 警報級大雨"
    },
    {
      "time": "07:36",
      "title": "パリ近郊で銃乱射 1人死亡4人負傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599883?source=rss",
      "publishedAt": "2026-10-23T22:36:15.000Z",
      "xQuery": "パリ近郊で銃乱射 1人死亡4人負傷"
    },
    {
      "time": "08:07",
      "title": "県立高で威圧的指導か 精神疾患に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599889?source=rss",
      "publishedAt": "2026-10-23T23:07:02.000Z",
      "xQuery": "県立高で威圧的指導か 精神疾患に"
    },
    {
      "time": "08:14",
      "title": "パナG従業員情報 外部AIにアップ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599885?source=rss",
      "publishedAt": "2026-10-23T23:14:51.000Z",
      "xQuery": "パナG従業員情報 外部AIにアップ"
    },
    {
      "time": "09:37",
      "title": "9日間に3回 小学校給食に異物混入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599898?source=rss",
      "publishedAt": "2026-10-24T00:37:44.000Z",
      "xQuery": "9日間に3回 小学校給食に異物混入"
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
