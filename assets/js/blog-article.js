/**
 * BlissMoney - Blog Article Formatter
 * The imported article bodies use "<p><strong>Heading</strong><br />text<br />text</p>".
 * This turns them into proper headings and paragraphs so the brand typographic
 * hierarchy (headline / sub-head / body) can be applied:
 *   - a line that is only <strong>Title</strong>      -> <h3>
 *   - a line that is only <strong>1. Title</strong>   -> <h4> with a number chip
 *   - every other <br /> separated line                 -> its own <p>
 * Content inside tables (newsletter-style posts) is left untouched.
 */

(function () {
  "use strict";

  function isBlank(node) {
    return node.nodeType === 3 && !node.textContent.replace(/ /g, " ").trim();
  }

  function soleStrong(nodes) {
    var meaningful = nodes.filter(function (n) {
      return !isBlank(n);
    });
    if (meaningful.length !== 1) return null;
    var el = meaningful[0];
    return el.nodeType === 1 && (el.tagName === "STRONG" || el.tagName === "B")
      ? el
      : null;
  }

  function buildHeading(strong) {
    var text = strong.textContent.replace(/ /g, " ").trim();
    var numbered = text.match(/^(\d+)[.)]\s*(.+)$/);
    var h;
    if (numbered) {
      h = document.createElement("h4");
      var chip = document.createElement("span");
      chip.className = "h-num";
      chip.textContent =
        numbered[1].length === 1 ? "0" + numbered[1] : numbered[1];
      h.appendChild(chip);
      h.appendChild(document.createTextNode(numbered[2]));
    } else {
      h = document.createElement("h3");
      h.textContent = text;
    }
    return h;
  }

  function splitParagraph(p) {
    var lines = [[]];
    Array.prototype.slice.call(p.childNodes).forEach(function (node) {
      if (node.nodeType === 1 && node.tagName === "BR") {
        lines.push([]);
      } else {
        lines[lines.length - 1].push(node);
      }
    });

    var out = [];
    lines.forEach(function (line) {
      if (!line.length || line.every(isBlank)) return;
      var strong = soleStrong(line);
      if (strong) {
        out.push(buildHeading(strong));
        return;
      }
      var para = document.createElement("p");
      line.forEach(function (n) {
        para.appendChild(n);
      });
      // Drop leading &nbsp; left over from the old CMS
      if (para.firstChild && para.firstChild.nodeType === 3) {
        para.firstChild.textContent = para.firstChild.textContent.replace(
          /^[\s ]+/,
          "",
        );
      }
      out.push(para);
    });
    return out;
  }

  function formatArticle(root) {
    if (!root || root.getAttribute("data-bm-formatted") === "true") return;

    Array.prototype.slice
      .call(root.querySelectorAll("p"))
      .forEach(function (p) {
        if (p.closest("table")) return;
        if (
          !p.textContent.replace(/ /g, " ").trim() &&
          !p.querySelector("img")
        ) {
          p.remove();
          return;
        }
        var hasBreak = !!p.querySelector(":scope > br");
        if (!hasBreak && !soleStrong(Array.prototype.slice.call(p.childNodes)))
          return;
        var parts = splitParagraph(p);
        parts.forEach(function (part) {
          p.parentNode.insertBefore(part, p);
        });
        p.remove();
      });

    // Opening paragraph reads as a standfirst
    var first = root.querySelector(":scope > p");
    if (first && first === root.firstElementChild) first.classList.add("lead");

    // Wide newsletter tables scroll on small screens instead of breaking the layout
    Array.prototype.slice
      .call(root.querySelectorAll(":scope > table"))
      .forEach(function (table) {
        var wrap = document.createElement("div");
        wrap.className = "table-scroll";
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
      });

    root.setAttribute("data-bm-formatted", "true");
  }

  window.bmFormatArticle = formatArticle;

  function init() {
    formatArticle(document.querySelector(".post-detail .info"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
