window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T15:37:48.296Z",
  "items": [
    {
      "time": "22:55",
      "title": "関東～九州 大雨の終わり見えず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594240?source=rss",
      "publishedAt": "2026-09-04T13:55:37.000Z",
      "xQuery": "関東～九州 大雨の終わり見えず"
    },
    {
      "time": "22:21",
      "title": "米8月雇用16.2万人増 予想上回る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594237?source=rss",
      "publishedAt": "2026-09-04T13:21:22.000Z",
      "xQuery": "米8月雇用16.2万人増 予想上回る"
    },
    {
      "time": "17:14",
      "title": "24年の体外受精児8万6473人 最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594216?source=rss",
      "publishedAt": "2026-09-04T08:14:52.000Z",
      "xQuery": "24年の体外受精児8万6473人 最多"
    },
    {
      "time": "21:32",
      "title": "家事支援の国家資格化 懸念の声も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594232?source=rss",
      "publishedAt": "2026-09-04T12:32:11.000Z",
      "xQuery": "家事支援の国家資格化 懸念の声も"
    },
    {
      "time": "22:59",
      "title": "濁流で両親死亡 遺品は朱印帳だけ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594241?source=rss",
      "publishedAt": "2026-09-04T13:59:27.000Z",
      "xQuery": "濁流で両親死亡 遺品は朱印帳だけ"
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
