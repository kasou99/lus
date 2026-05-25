window.LUS_X_NEWS = {
  "updatedAt": "2026-05-25T01:12:30.085Z",
  "items": [
    {
      "time": "09:46",
      "title": "日経平均6万5000円台 史上最高値",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581567?source=rss",
      "publishedAt": "2026-05-25T00:46:36.000Z",
      "xQuery": "日経平均6万5000円台 史上最高値"
    },
    {
      "time": "09:07",
      "title": "イラン合意急ぐな トランプ氏指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581563?source=rss",
      "publishedAt": "2026-05-25T00:07:01.000Z",
      "xQuery": "イラン合意急ぐな トランプ氏指示"
    },
    {
      "time": "08:12",
      "title": "ナフサ説明「納得せず」64% 読売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581559?source=rss",
      "publishedAt": "2026-05-24T23:12:54.000Z",
      "xQuery": "ナフサ説明「納得せず」64% 読売"
    },
    {
      "time": "09:48",
      "title": "母娘殺害 遺体発見前「人殺した」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581568?source=rss",
      "publishedAt": "2026-05-25T00:48:56.000Z",
      "xQuery": "母娘殺害 遺体発見前「人殺した」"
    },
    {
      "time": "08:32",
      "title": "日本語「要指導」の子 10年で倍増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581561?source=rss",
      "publishedAt": "2026-05-24T23:32:05.000Z",
      "xQuery": "日本語「要指導」の子 10年で倍増"
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
