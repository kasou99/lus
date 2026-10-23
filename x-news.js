window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T10:40:23.213Z",
  "items": [
    {
      "time": "18:48",
      "title": "滋賀銀と池田泉州HD 経営統合へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599846?source=rss",
      "publishedAt": "2026-10-23T09:48:57.000Z",
      "xQuery": "滋賀銀と池田泉州HD 経営統合へ"
    },
    {
      "time": "18:14",
      "title": "台風30号 24日にかけ先島諸島接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599838?source=rss",
      "publishedAt": "2026-10-23T09:14:24.000Z",
      "xQuery": "台風30号 24日にかけ先島諸島接近"
    },
    {
      "time": "19:17",
      "title": "三重・伊賀市長発言 パワハラ認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599849?source=rss",
      "publishedAt": "2026-10-23T10:17:47.000Z",
      "xQuery": "三重・伊賀市長発言 パワハラ認定"
    },
    {
      "time": "16:00",
      "title": "蔵内氏に金銭 実名で4人目の証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599815?source=rss",
      "publishedAt": "2026-10-23T07:00:44.000Z",
      "xQuery": "蔵内氏に金銭 実名で4人目の証言"
    },
    {
      "time": "16:59",
      "title": "パーク24 流出の146万人に見舞金",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599823?source=rss",
      "publishedAt": "2026-10-23T07:59:33.000Z",
      "xQuery": "パーク24 流出の146万人に見舞金"
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
