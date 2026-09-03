window.LUS_X_NEWS = {
  "updatedAt": "2026-09-03T12:48:33.957Z",
  "items": [
    {
      "time": "19:59",
      "title": "維新が閣内協力へ 馬場氏推す方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594129?source=rss",
      "publishedAt": "2026-09-03T10:59:33.000Z",
      "xQuery": "維新が閣内協力へ 馬場氏推す方針"
    },
    {
      "time": "19:28",
      "title": "週明けにかけ大雨続く恐れ 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594126?source=rss",
      "publishedAt": "2026-09-03T10:28:38.000Z",
      "xQuery": "週明けにかけ大雨続く恐れ 警戒を"
    },
    {
      "time": "21:10",
      "title": "あべちか強殺未遂事件 容疑者逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594134?source=rss",
      "publishedAt": "2026-09-03T12:10:39.000Z",
      "xQuery": "あべちか強殺未遂事件 容疑者逮捕"
    },
    {
      "time": "19:29",
      "title": "麻布十番まつりで食中毒 店主謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594127?source=rss",
      "publishedAt": "2026-09-03T10:29:09.000Z",
      "xQuery": "麻布十番まつりで食中毒 店主謝罪"
    },
    {
      "time": "20:10",
      "title": "「純金」実は銅と鉄 偽サイト被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594130?source=rss",
      "publishedAt": "2026-09-03T11:10:45.000Z",
      "xQuery": "「純金」実は銅と鉄 偽サイト被害"
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
