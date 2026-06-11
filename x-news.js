window.LUS_X_NEWS = {
  "updatedAt": "2026-06-11T09:02:45.574Z",
  "items": [
    {
      "time": "17:04",
      "title": "日英 洋上風力発電で連携強化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583825?source=rss",
      "publishedAt": "2026-06-11T08:04:46.000Z",
      "xQuery": "日英 洋上風力発電で連携強化へ"
    },
    {
      "time": "17:25",
      "title": "安野氏 国会議員にAI勉強会開催へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583830?source=rss",
      "publishedAt": "2026-06-11T08:25:25.000Z",
      "xQuery": "安野氏 国会議員にAI勉強会開催へ"
    },
    {
      "time": "17:29",
      "title": "車の誘導中に挟まれ機動隊員死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583832?source=rss",
      "publishedAt": "2026-06-11T08:29:51.000Z",
      "xQuery": "車の誘導中に挟まれ機動隊員死亡"
    },
    {
      "time": "17:40",
      "title": "女子部室に男 教員追跡取り押さえ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583837?source=rss",
      "publishedAt": "2026-06-11T08:40:27.000Z",
      "xQuery": "女子部室に男 教員追跡取り押さえ"
    },
    {
      "time": "17:35",
      "title": "京都三千院 あじさい開花せず謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583833?source=rss",
      "publishedAt": "2026-06-11T08:35:25.000Z",
      "xQuery": "京都三千院 あじさい開花せず謝罪"
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
