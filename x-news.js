window.LUS_X_NEWS = {
  "updatedAt": "2026-09-22T12:26:21.206Z",
  "items": [
    {
      "time": "21:06",
      "title": "台風 千葉・神奈川で死者計7人に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596179?source=rss",
      "publishedAt": "2026-09-22T12:06:15.000Z",
      "xQuery": "台風 千葉・神奈川で死者計7人に"
    },
    {
      "time": "17:29",
      "title": "G7外相 フーシ派の攻撃強く非難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596159?source=rss",
      "publishedAt": "2026-09-22T08:29:59.000Z",
      "xQuery": "G7外相 フーシ派の攻撃強く非難"
    },
    {
      "time": "19:54",
      "title": "事故巻き添えで3歳死亡 両親心境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596173?source=rss",
      "publishedAt": "2026-09-22T10:54:20.000Z",
      "xQuery": "事故巻き添えで3歳死亡 両親心境"
    },
    {
      "time": "21:01",
      "title": "AIで鉄道運行支援 日立が本格展開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596176?source=rss",
      "publishedAt": "2026-09-22T12:01:07.000Z",
      "xQuery": "AIで鉄道運行支援 日立が本格展開"
    },
    {
      "time": "18:01",
      "title": "博士号授与されず 学生が大学提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596164?source=rss",
      "publishedAt": "2026-09-22T09:01:09.000Z",
      "xQuery": "博士号授与されず 学生が大学提訴"
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
