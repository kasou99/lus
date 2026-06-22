window.LUS_X_NEWS = {
  "updatedAt": "2026-06-22T23:03:07.260Z",
  "items": [
    {
      "time": "06:41",
      "title": "沖縄慰霊の日 問われる平和学習",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585281?source=rss",
      "publishedAt": "2026-06-22T21:41:11.000Z",
      "xQuery": "沖縄慰霊の日 問われる平和学習"
    },
    {
      "time": "07:17",
      "title": "「地域未来戦略」概要案が判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585282?source=rss",
      "publishedAt": "2026-06-22T22:17:54.000Z",
      "xQuery": "「地域未来戦略」概要案が判明"
    },
    {
      "time": "07:51",
      "title": "「ダブル台風」日本に接近の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585288?source=rss",
      "publishedAt": "2026-06-22T22:51:03.000Z",
      "xQuery": "「ダブル台風」日本に接近の恐れ"
    },
    {
      "time": "07:29",
      "title": "円 一時39年半ぶり安値に肉薄",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585285?source=rss",
      "publishedAt": "2026-06-22T22:29:36.000Z",
      "xQuery": "円 一時39年半ぶり安値に肉薄"
    },
    {
      "time": "07:22",
      "title": "駅員悩む トイレ紙の「持ち帰り」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585283?source=rss",
      "publishedAt": "2026-06-22T22:22:15.000Z",
      "xQuery": "駅員悩む トイレ紙の「持ち帰り」"
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
