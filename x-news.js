window.LUS_X_NEWS = {
  "updatedAt": "2026-08-18T21:08:44.982Z",
  "items": [
    {
      "time": "22:41",
      "title": "米朝首脳会談に含み 米大統領狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592223?source=rss",
      "publishedAt": "2026-08-18T13:41:34.000Z",
      "xQuery": "米朝首脳会談に含み 米大統領狙い"
    },
    {
      "time": "22:19",
      "title": "地震倒壊 工場煙突を国が全国調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592221?source=rss",
      "publishedAt": "2026-08-18T13:19:14.000Z",
      "xQuery": "地震倒壊 工場煙突を国が全国調査"
    },
    {
      "time": "21:42",
      "title": "ロシアが日本大使呼び出し抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592218?source=rss",
      "publishedAt": "2026-08-18T12:42:17.000Z",
      "xQuery": "ロシアが日本大使呼び出し抗議"
    },
    {
      "time": "21:33",
      "title": "放火し両親殺害未遂疑い 15歳逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592211?source=rss",
      "publishedAt": "2026-08-18T12:33:09.000Z",
      "xQuery": "放火し両親殺害未遂疑い 15歳逮捕"
    },
    {
      "time": "23:16",
      "title": "遭難女性8日ぶり救助 夫「感謝」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592227?source=rss",
      "publishedAt": "2026-08-18T14:16:42.000Z",
      "xQuery": "遭難女性8日ぶり救助 夫「感謝」"
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
