window.LUS_X_NEWS = {
  "updatedAt": "2026-07-17T10:37:41.838Z",
  "items": [
    {
      "time": "19:32",
      "title": "国会会期を8日間延長 25日まで",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588315?source=rss",
      "publishedAt": "2026-07-17T10:32:48.000Z",
      "xQuery": "国会会期を8日間延長 25日まで"
    },
    {
      "time": "16:22",
      "title": "子のSNSいつから? 禁止の是非",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588282?source=rss",
      "publishedAt": "2026-07-17T07:22:20.000Z",
      "xQuery": "子のSNSいつから? 禁止の是非"
    },
    {
      "time": "17:05",
      "title": "5歳不明 発見の遺体は身長115cm",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588289?source=rss",
      "publishedAt": "2026-07-17T08:05:37.000Z",
      "xQuery": "5歳不明 発見の遺体は身長115cm"
    },
    {
      "time": "18:38",
      "title": "台船で女性倒れ死亡 殺人で捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588309?source=rss",
      "publishedAt": "2026-07-17T09:38:20.000Z",
      "xQuery": "台船で女性倒れ死亡 殺人で捜査"
    },
    {
      "time": "17:58",
      "title": "トラック出火 郵便物4600通が焼損",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588301?source=rss",
      "publishedAt": "2026-07-17T08:58:02.000Z",
      "xQuery": "トラック出火 郵便物4600通が焼損"
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
