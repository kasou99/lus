window.LUS_X_NEWS = {
  "updatedAt": "2026-05-21T13:38:40.814Z",
  "items": [
    {
      "time": "22:09",
      "title": "補正予算3兆円程度で調整へ 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581145?source=rss",
      "publishedAt": "2026-05-21T13:09:21.000Z",
      "xQuery": "補正予算3兆円程度で調整へ 政府"
    },
    {
      "time": "20:44",
      "title": "殺した日燃やした 動物園職員供述",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581140?source=rss",
      "publishedAt": "2026-05-21T11:44:10.000Z",
      "xQuery": "殺した日燃やした 動物園職員供述"
    },
    {
      "time": "22:02",
      "title": "NHK受信契約巡り 岐阜知事が要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581146?source=rss",
      "publishedAt": "2026-05-21T13:02:33.000Z",
      "xQuery": "NHK受信契約巡り 岐阜知事が要請"
    },
    {
      "time": "22:06",
      "title": "村上世彰氏長女 近鉄GHD大株主に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581147?source=rss",
      "publishedAt": "2026-05-21T13:06:28.000Z",
      "xQuery": "村上世彰氏長女 近鉄GHD大株主に"
    },
    {
      "time": "22:27",
      "title": "神戸殺傷 賠償金時効も再提訴せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581149?source=rss",
      "publishedAt": "2026-05-21T13:27:18.000Z",
      "xQuery": "神戸殺傷 賠償金時効も再提訴せず"
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
