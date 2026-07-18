window.LUS_X_NEWS = {
  "updatedAt": "2026-07-18T10:33:16.914Z",
  "items": [
    {
      "time": "17:41",
      "title": "連休明け 名古屋など40℃迫る予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588413?source=rss",
      "publishedAt": "2026-07-18T08:41:23.000Z",
      "xQuery": "連休明け 名古屋など40℃迫る予想"
    },
    {
      "time": "16:59",
      "title": "米イランが攻撃応酬 原油は大幅高",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588408?source=rss",
      "publishedAt": "2026-07-18T07:59:02.000Z",
      "xQuery": "米イランが攻撃応酬 原油は大幅高"
    },
    {
      "time": "19:06",
      "title": "iPhone値上げ 廉価版も10万円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588420?source=rss",
      "publishedAt": "2026-07-18T10:06:35.000Z",
      "xQuery": "iPhone値上げ 廉価版も10万円台"
    },
    {
      "time": "09:39",
      "title": "小6が拾った石 国内2例目の発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588363?source=rss",
      "publishedAt": "2026-07-18T00:39:34.000Z",
      "xQuery": "小6が拾った石 国内2例目の発見"
    },
    {
      "time": "16:15",
      "title": "3時間の格闘「幻の魚」釣り上げる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588404?source=rss",
      "publishedAt": "2026-07-18T07:15:23.000Z",
      "xQuery": "3時間の格闘「幻の魚」釣り上げる"
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
