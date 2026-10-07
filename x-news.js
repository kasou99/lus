window.LUS_X_NEWS = {
  "updatedAt": "2026-10-07T14:19:27.477Z",
  "items": [
    {
      "time": "23:16",
      "title": "硤合氏ら化学賞 1世紀超え謎解く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597926?source=rss",
      "publishedAt": "2026-10-07T14:16:51.000Z",
      "xQuery": "硤合氏ら化学賞 1世紀超え謎解く"
    },
    {
      "time": "18:07",
      "title": "盲導犬との賃貸入居拒否 国調査へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597904?source=rss",
      "publishedAt": "2026-10-07T09:07:35.000Z",
      "xQuery": "盲導犬との賃貸入居拒否 国調査へ"
    },
    {
      "time": "20:13",
      "title": "首相を中国側呼び捨て 外務省批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597919?source=rss",
      "publishedAt": "2026-10-07T11:13:02.000Z",
      "xQuery": "首相を中国側呼び捨て 外務省批判"
    },
    {
      "time": "22:44",
      "title": "複数の自治体など HP閲覧できず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597928?source=rss",
      "publishedAt": "2026-10-07T13:44:42.000Z",
      "xQuery": "複数の自治体など HP閲覧できず"
    },
    {
      "time": "22:23",
      "title": "愛知・大村知事の発言 タイで波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597927?source=rss",
      "publishedAt": "2026-10-07T13:23:29.000Z",
      "xQuery": "愛知・大村知事の発言 タイで波紋"
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
