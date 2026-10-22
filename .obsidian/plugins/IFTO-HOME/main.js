var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// main.ts
var main_exports = {};
__export(main_exports, {
  IFTOView: () => IFTOView,
  IFTO_VIEW_TYPE: () => IFTO_VIEW_TYPE,
  default: () => IFTOPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var __IFTO_HOME_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IFTO-HOME \u9996\u9875</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --g1:#111;--g4:#9ca3af;--g5:#e5e7eb;--g6:#f2f2f2;--bg:#fff;
  --ifto-card-bg:#fff;
  --ifto-text:#111;
  --ifto-text-2:#6b7280;
  --ifto-text-3:#9ca3af;
  --ifto-divider:#e5e7eb;
  --ifto-accent:#000;
  --ifto-accent-text:#fff;
  --ifto-shadow:0 1px 3px rgba(0,0,0,.04),0 4px 12px rgba(0,0,0,.06);
  --ifto-shadow-strong:0 4px 16px rgba(0,0,0,.10);
  --font:'MiSans','Inter',-apple-system,sans-serif;
  --section-pad:clamp(20px,6vw,120px);
  /* \u2500\u2500 responsive tokens \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     --ifto-max   : content column cap (grows on 2K/4K)
     --ifto-scale : global type/UI scale multiplier
     Both are raised by the min-width media queries at the
     end of this stylesheet, so the whole dashboard grows
     smoothly from phones up to 4K without per-element rules. */
  --ifto-max:1600px;
  --ifto-scale:1;
}
.theme-dark{
  --g1:#f5f5f5;--g4:#666;--g5:#2a2a2a;--g6:#2a2a2a;--bg:#1e1e1e;
  --ifto-card-bg:#1c1c1c;
  --ifto-text:#f5f5f5;
  --ifto-text-2:#9ca3af;
  --ifto-text-3:#6b7280;
  --ifto-divider:#2a2a2a;
  --ifto-accent:#fff;
  --ifto-accent-text:#000;
  --ifto-shadow:0 1px 3px rgba(0,0,0,.3),0 4px 12px rgba(0,0,0,.4);
  --ifto-shadow-strong:0 4px 16px rgba(0,0,0,.5);
}
.theme-dark .nav-logo img{filter:brightness(0) invert(1)}
.theme-dark .section-title-watermark{color:var(--g1)}
html,body{height:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{font-family:var(--font);background:var(--bg);color:var(--g1)}
.ifto-container{overflow:hidden!important}
.page{width:100%;height:100%;overflow-y:auto;position:relative;background:var(--ifto-bg,var(--bg))}

/* ====== HEADER ====== */
.header{
  position:sticky;top:0;z-index:100;background:var(--ifto-bg,var(--bg));
  border-bottom:1px solid var(--g6);height:102px;
}
.nav{display:flex;align-items:center;justify-content:space-between;height:102px;padding:0 var(--section-pad);gap:10px;max-width:var(--ifto-max);margin:0 auto}
.nav-logo{flex-shrink:0;display:flex;align-items:center}
.nav-logo img{display:block;background:transparent!important;border:none!important;box-shadow:none!important;outline:none!important;height:48px;width:auto;max-width:min(35vw,400px);clip-path:inset(1px)}
.nav-items{display:flex;align-items:center;gap:clamp(6px,1.2vw,20px);flex-wrap:wrap;justify-content:flex-end}
.nav-item{
  font-size:clamp(11px,1.2vw,15px);letter-spacing:clamp(1px,0.2vw,2.4px);text-transform:uppercase;
  color:var(--g1);text-decoration:none;padding:4px clamp(2px,0.4vw,6px);position:relative;
  margin:0;cursor:pointer;transition:opacity .2s;display:inline-block
}
.nav-item:hover{color:var(--g1)}
.nav-item.active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;background:var(--g1)}
.nav-item.active::before{content:'';position:absolute;top:-2px;left:0;right:0;height:1px;background:var(--g1)}

/* ====== HERO ====== */
.hero{
  display:flex;gap:clamp(20px,3vw,60px);position:relative;padding:0 var(--section-pad);margin-bottom:0;
  margin-left:auto;margin-right:auto;max-width:var(--ifto-max);
  min-height:clamp(500px,60vw,846px);
}
.hero-watermark{
  position:absolute;left:var(--section-pad);top:clamp(120px,18vw,265px);
  font-size:clamp(40px,6vw,80px);color:var(--g4);opacity:.25;line-height:1;
  pointer-events:none;z-index:0;font-weight:350;
}
.hero-left{flex:0 0 clamp(280px,30vw,480px);position:relative;z-index:1;padding-top:17px;display:flex;flex-direction:column}
.hero-title{font-size:30px;letter-spacing:4.8px;color:var(--g1);display:flex;align-items:baseline;gap:12px}
.hero-title-sub{font-size:clamp(12px,1.2vw,15px);letter-spacing:2px;text-transform:uppercase;opacity:.8;font-weight:400}
.hero-brand{position:absolute;left:var(--section-pad);z-index:2;font-size:56px;font-weight:300;color:var(--g1);letter-spacing:0;line-height:1.2;top:calc(clamp(120px,18vw,265px) + clamp(40px,6vw,80px) - 56px)}
.shortcuts{display:grid;grid-template-columns:1fr 1fr;gap:24px 30px;margin-top:30px;width:340px}
.btn-s{
  width:160px;height:60px;border:none;
  background:var(--g6);cursor:pointer;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:4px;
  font-family:var(--font);transition:all .2s;box-shadow:0 1px 2px rgba(0,0,0,.08)
}
.btn-s:hover{filter:brightness(.93);transform:translateY(-1px)}
.btn-s .s-icon{font-size:18px;font-weight:700;color:var(--g1);line-height:1}
.btn-s .s-label{font-size:15px;color:var(--g1);letter-spacing:1px}

.hero-nav-row{display:flex;align-items:center;gap:24px;margin-top:auto}
.hero-divider{flex:1;height:1px;background:var(--g5)}
.hero-nav-area{display:flex;gap:24px;flex-shrink:0}
.btn-arrow{
  width:53px;height:53px;border:1px solid var(--g6);
  background:#fff;cursor:pointer;font-size:16px;
  display:flex;align-items:center;justify-content:center;color:var(--g1)
}
.btn-arrow:hover{background:var(--g6)}

.widget-dot{width:6px;height:6px;border-radius:50%;background:var(--g5);display:inline-block;cursor:pointer;transition:background .2s;margin:0 3px}
.widget-dot.active{background:var(--g1)}
.widget-indicators{display:flex;justify-content:center;align-items:center;gap:2px;margin-top:8px;width:340px}

.widget-card{
  width:340px;height:380px;padding:16px;margin-top:16px;border:1px solid var(--ifto-divider);background:var(--ifto-card-bg);
  display:flex;flex-direction:column;overflow:hidden;
  box-shadow:var(--ifto-shadow);
}
.widget-title{font-size:25px;font-weight:600;color:var(--g1);text-align:left;margin-bottom:12px}

/* ====== Widget redesign \u2014 Timespot / Crypto / Dribbble mix ====== */
.token-section{display:flex;flex-direction:column;padding:0}
.token-logo{text-align:center;padding:4px 0 10px;border-bottom:1px solid var(--ifto-divider);margin-bottom:10px}
.token-title{font-size:14px;font-weight:700;color:var(--ifto-text);letter-spacing:.4px;margin-bottom:10px;line-height:1;text-align:center}
.token-card{
  background:var(--ifto-card-bg);
  border-radius:var(--ifto-radius,16px);
  padding:14px 16px;
  display:flex;flex-direction:column;
  box-shadow:var(--ifto-shadow);
  border:1px solid var(--ifto-divider);
}
.token-label-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.token-label{font-size:10px;font-weight:600;color:var(--ifto-text-2);letter-spacing:.5px;text-transform:uppercase}
.token-status{
  display:inline-flex;align-items:center;gap:5px;
  font-size:10px;font-weight:700;color:var(--ifto-accent-text);
  background:var(--ifto-accent);
  border-radius:9999px;padding:3px 10px;line-height:1;
  letter-spacing:.5px;text-transform:uppercase;
}
.token-status.unavail{background:var(--ifto-accent);opacity:.55}
.token-status-dot{display:none}
.token-status-dot.unavail{display:none}
.token-big-amount{
  font-size:40px;
  font-weight:500;color:var(--ifto-text);
  line-height:1;margin-bottom:0;letter-spacing:-0.03em;
}
.token-big-unit{font-size:18px;font-weight:600;color:var(--ifto-text-2);margin-left:4px}
.token-divider{border:none;border-top:1px solid var(--ifto-divider);margin:6px 0}
.token-usage-row{display:flex;justify-content:space-between;align-items:center;min-height:24px}
.token-usage-label{font-size:11px;font-weight:500;color:var(--ifto-text-2);letter-spacing:.3px}
.token-usage-value{font-size:14px;font-weight:700;color:var(--ifto-text);line-height:1}
.token-usage-sub{font-size:11px;color:var(--ifto-text-3);font-weight:500;line-height:1}
.token-footer{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid var(--ifto-divider)}
.token-refresh{
  width:28px;height:28px;
  background:var(--ifto-accent);
  border-radius:9999px;
  display:inline-flex;align-items:center;justify-content:center;
  cursor:pointer;transition:transform .3s ease,opacity .2s;
}
.token-refresh:hover{opacity:.7;transform:rotate(90deg)}
.token-refresh svg{display:block}
.token-refresh svg path{stroke:var(--ifto-accent-text) !important}
.token-recharge{
  height:28px;padding:0 14px;
  background:var(--ifto-accent);
  color:var(--ifto-accent-text);
  border-radius:9999px;
  display:inline-flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:12px;font-weight:600;line-height:1;
  letter-spacing:.3px;transition:opacity .2s;
}
.token-recharge:hover{opacity:.7}
.token-error{font-size:13px;color:var(--ifto-text-2);text-align:center;padding:40px 20px;line-height:1.6}
.token-error-icon{
  width:56px;height:56px;
  background:var(--ifto-g6,var(--g6));
  border-radius:9999px;
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 14px;
}
.token-error-title{font-size:15px;font-weight:700;color:var(--ifto-text);margin-bottom:4px}
.token-setup-btn{
  display:inline-block;margin-top:14px;
  height:28px;padding:0 14px;
  background:var(--ifto-accent);
  color:var(--ifto-accent-text);
  border-radius:9999px;
  font-size:12px;font-weight:600;line-height:28px;
  letter-spacing:.3px;cursor:pointer;transition:opacity .2s;
}
.token-setup-btn:hover{opacity:.7}
.token-detail{font-size:12px;color:var(--ifto-text);font-weight:500}
.token-model-item{font-size:11px;padding:6px 8px;color:var(--ifto-text);display:flex;align-items:center;gap:6px}
.token-model-item:nth-child(odd){background:var(--ifto-g6,var(--g6))}
.token-model-list{display:flex;flex-direction:column;gap:2px}
.token-model-pg{display:inline-flex;align-items:center;gap:4px;margin-left:6px}
.token-model-pg-btn{width:18px;height:18px;border:1px solid var(--ifto-divider);border-radius:3px;background:var(--ifto-card-bg);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:var(--ifto-text);line-height:1;padding:0;transition:opacity .15s}
.token-model-pg-btn:hover{opacity:.6}
.token-model-pg-btn:disabled{opacity:.25;cursor:default}
.token-model-pg-num{font-size:10px;color:var(--ifto-text-2);min-width:24px;text-align:center}
.token-loading{text-align:center;color:var(--ifto-text-2);padding-top:60px;font-size:13px}
.token-bar-container{height:8px;background:var(--ifto-g6,var(--g6));border-radius:9999px;overflow:hidden;margin:8px 0 4px}
.token-bar-fill{height:100%;border-radius:9999px;transition:width .4s ease}
.token-bar-fill.normal{background:var(--ifto-accent)}
.token-bar-fill.warning{background:#f59e0b}
.token-bar-fill.danger{background:#ef4444}
.token-model-row{font-size:12px;margin-bottom:6px}
.token-model-row:last-child{margin-bottom:0}
.token-chart-wrap{margin-top:8px;padding-top:8px;border-top:1px solid var(--ifto-divider)}
.token-chart-title{font-size:11px;color:var(--ifto-text-2);margin-bottom:6px;font-weight:500;letter-spacing:.3px}
.token-chart{display:flex;align-items:flex-end;gap:2px;height:55px}
.token-chart-col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;min-width:0}
.token-chart-bar{width:100%;max-width:7px;border-radius:9999px;background:var(--ifto-accent);min-height:2px;transition:opacity .2s}
.token-chart-bar:hover{opacity:.5}
.token-chart-label{font-size:7px;color:var(--ifto-text-2);margin-top:2px;line-height:1;text-align:center}

/* Clock widget */
.clock-display{font-size:42px;font-weight:300;text-align:center;letter-spacing:4px;font-variant-numeric:tabular-nums;padding:8px 0}
.clock-date{font-size:13px;text-align:center;color:var(--g4);margin-bottom:4px}

/* Calendar widget \u2014 cleaner dot-style */
.cal-title{font-size:14px;font-weight:600;text-align:center;margin-bottom:8px;color:var(--ifto-text)}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;font-size:13px;text-align:center;flex:1;min-height:0;overflow:hidden}
.cal-header{font-weight:600;color:var(--ifto-text-2);padding:3px 0;font-size:11px;letter-spacing:.5px;text-transform:uppercase}
.cal-day{padding:2px 0;border-radius:9999px;cursor:default;transition:background .15s;color:var(--ifto-text);font-size:12px}
.cal-day:hover{background:var(--ifto-g6,var(--g6))}
.cal-day.today{background:var(--ifto-accent);color:var(--ifto-accent-text);font-weight:700;border-radius:9999px}
.cal-weather{margin-top:20px;padding-top:14px;border-top:1px solid var(--ifto-divider);flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0;gap:6px;overflow-y:auto}
.cal-weather-main{display:flex;align-items:center;justify-content:center;gap:8px}
.cal-weather-icon{font-size:32px;line-height:1;color:var(--ifto-text)}
.cal-weather-temp{font-size:32px;font-weight:300;letter-spacing:-0.02em}
.cal-weather-desc{font-size:12px;color:var(--ifto-text-2)}
.cal-weather-extra{text-align:center;font-size:10px;color:var(--ifto-text-3);margin-top:2px}
.cal-forecast{display:flex;justify-content:center;gap:12px;margin-top:6px}
.wf-day{display:flex;align-items:center;gap:3px;font-size:11px;color:var(--ifto-text)}
.wf-icon{font-size:16px;line-height:1;color:var(--ifto-text)}
.cal-weather-error{text-align:center;font-size:11px;color:var(--ifto-text-3);padding:8px 0}
.weather-temp{font-size:42px;font-weight:300;letter-spacing:-0.02em}
.weather-main{display:flex;align-items:center;gap:12px;justify-content:center}
.weather-desc{font-size:14px;color:var(--ifto-text)}
.weather-details{display:flex;justify-content:space-around;font-size:11px;color:var(--ifto-text-2);margin-top:6px}
.weather-detail-item{text-align:center}

/* Habit widget \u2014 dot-grid inspired */
.habit-header{display:flex;flex-direction:column;align-items:flex-start;margin-bottom:12px}
.habit-header-title{font-size:18px;font-weight:700;letter-spacing:-0.01em}
.habit-header-count{font-size:11px;color:var(--ifto-text-2);margin-top:2px;letter-spacing:.3px}
.habit-input-wrap{display:flex;gap:8px;margin-bottom:14px}
.habit-input{
  flex:1;min-width:0;padding:8px 14px;font-size:13px;
  border:1px solid var(--ifto-divider);
  background:var(--ifto-card-bg);
  color:var(--ifto-text);
  border-radius:0;outline:none;
  transition:border-color .2s;
}
.habit-input:focus{border-color:var(--ifto-accent)}
.habit-add-btn{
  padding:0 18px;font-size:12px;font-weight:600;letter-spacing:.3px;
  border:none;border-radius:0;
  background:var(--ifto-accent);
  color:var(--ifto-accent-text);
  cursor:pointer;line-height:34px;height:34px;
  transition:opacity .2s;
}
.habit-add-btn:hover{opacity:.7}
.habit-empty{text-align:center;color:var(--ifto-text-2);font-size:12px;padding:32px 0;line-height:1.8}
.habit-list{display:flex;flex-direction:column;gap:12px}
.habit-item{
  background:var(--ifto-card-bg);
  border:1px solid var(--ifto-divider);
  border-radius:var(--ifto-radius,12px);
  padding:12px 14px;
  box-shadow:var(--ifto-shadow);
}
.habit-topbar{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.habit-color-dot{width:14px;height:14px;border-radius:50%;flex-shrink:0;cursor:pointer;transition:transform .15s;border:none;padding:0}
.habit-color-dot:hover{transform:scale(1.4)}
.habit-name{flex:1;font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.habit-streak{font-size:14px;font-weight:700;color:var(--ifto-text);white-space:nowrap;margin-right:4px;display:flex;align-items:center;gap:3px}
.habit-del{cursor:pointer;font-size:10px;line-height:1;color:var(--ifto-text-3);opacity:0;transition:opacity .15s;flex-shrink:0;background:none;border:none;padding:2px 6px;border-radius:9999px}
.habit-item:hover .habit-del{opacity:.6}
.habit-del:hover{opacity:1!important;background:var(--ifto-g6,var(--g6))}
.habit-calendar{width:100%;user-select:none}
.habit-weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-size:9px;color:var(--ifto-text-2);margin-bottom:2px;letter-spacing:.3px}
.habit-month-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:1px}
.habit-day-cell{
  height:22px;display:flex;align-items:center;justify-content:center;
  font-size:10px;font-weight:600;
  border-radius:9999px;
  cursor:pointer;transition:background .1s,opacity .1s;
  line-height:1;color:var(--ifto-text);
}
.habit-day-cell:hover{background:var(--ifto-g6,var(--g6))}
.habit-day-cell.today{background:var(--ifto-card-bg);color:var(--ifto-accent);box-shadow:inset 0 0 0 1.5px var(--ifto-accent);font-weight:700}
.habit-day-cell.future{color:var(--ifto-text-3);cursor:default;opacity:.5}
.habit-day-cell.future:hover{background:transparent}
.habit-day-cell.done{background:var(--ifto-accent);color:var(--ifto-accent-text)}

/* Status widget \u2014 Timespot big status */
.status-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 0 10px}
.status-icon{font-size:48px;line-height:1}
.status-label{font-size:14px;font-weight:700;margin-top:2px;letter-spacing:.3px}
.status-detail{font-size:11px;color:var(--ifto-text-2);text-align:center}
.status-hint{font-size:10px;color:var(--ifto-text-3);margin-top:4px;text-align:center;line-height:1.6}
.status-divider{width:100%;height:1px;background:var(--ifto-divider);margin:8px 0}
.status-models{width:100%;margin-top:2px}
.status-models-title{font-size:11px;font-weight:600;margin-bottom:6px;letter-spacing:.3px;text-transform:uppercase;color:var(--ifto-text-2)}
.status-model-item{font-size:11px;padding:6px 8px;color:var(--ifto-text);display:flex;align-items:center;gap:6px}
.status-model-item:nth-child(odd){background:var(--ifto-g6,var(--g6))}

.hero-right{
  flex:1;margin-top:17px;position:relative;
  min-height:clamp(300px,50vw,829px);overflow:hidden;
  display:flex;align-items:stretch;
}
.hero-img-placeholder{
  width:100%;height:100%;min-height:inherit;
  background-color:var(--g4);
  position:relative;color:var(--g1);
  background-size:cover;background-position:center;background-repeat:no-repeat;
}
.hero-img-label{
  position:absolute;bottom:0;width:110px;height:70px;z-index:6;
  background:var(--ifto-bg,var(--bg));color:var(--g1);
  display:flex;align-items:center;justify-content:center;
  font-size:16px;letter-spacing:2px;cursor:pointer;
  transition:font-weight 0.15s;
}
.hero-img-label::after{
  content:'';position:absolute;bottom:12px;left:50%;transform:translateX(-50%);
  width:60%;height:1px;background:var(--g1);
}
.hero-img-label:hover{
  font-weight:700;
}
.hero-img-label.active{font-weight:700;z-index:10}

/* ====== SECTION ====== */
.section{padding:0 var(--section-pad);margin:0 auto;margin-bottom:0;position:relative;max-width:var(--ifto-max)}
.section-title{font-size:calc(80px * var(--ifto-scale));font-weight:350;letter-spacing:2px;margin:110px 0 20px;color:#BDBDBD;line-height:1;opacity:.25}
.section-title-wrap{display:grid;margin:110px 0 20px}
.section-title-wrap > *{grid-area:1/1;align-self:end}
.section-title-watermark{font-size:calc(56px * var(--ifto-scale));font-weight:300;color:#333;letter-spacing:4px;line-height:1;pointer-events:none;position:relative;z-index:1}
.section-title-wrap .section-title{margin:0}
.section{scroll-margin-top:120px}
#home{scroll-margin-top:0}

/* ====== TABS ====== */
.tabs{display:flex;align-items:center;gap:16px;margin-bottom:16px}
.tab{font-size:15px;letter-spacing:2px;color:var(--g4);cursor:pointer;padding:4px 0;position:relative}
.tab.active{color:var(--g1)}
.tab.active::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:var(--g1)}
.tab-badge{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:var(--g1);color:var(--bg);font-size:10px;margin-left:6px;line-height:1;vertical-align:middle;font-weight:600}
.link-back{margin-left:auto;font-size:12px;letter-spacing:2px;color:var(--g1);text-decoration:none;cursor:pointer}
.link-back:hover{opacity:.7}
.sort-toggle{font-size:12px;letter-spacing:1px;color:var(--g4);cursor:pointer;padding:4px 0;transition:color .2s;user-select:none}
.sort-toggle:hover{color:var(--g1)}

/* ====== CARD GRID ====== */
.card-grid{
  display:flex;flex-wrap:wrap;gap:12px;
  background:var(--g6);padding:12px;min-height:auto;
  align-content:flex-start;
}
#inboxGrid.card-grid{overflow-y:visible}
#reviewGrid.card-grid{height:auto;overflow-y:visible}
/* List view for \u6574\u7406\u6742\u9879 */
.inbox-list{background:var(--g6);padding:8px;min-height:auto}
.inbox-list-item{display:flex;align-items:center;padding:12px 16px;border-bottom:1px solid var(--ifto-divider);cursor:pointer;transition:background .15s;font-size:13px;gap:12px}
.inbox-list-item:hover{background:var(--ifto-g6,var(--g6))}
.inbox-list-item .ili-icon{width:20px;text-align:center;color:var(--ifto-text-2);flex-shrink:0}
.inbox-list-item .ili-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.inbox-list-item .ili-date{font-size:11px;color:var(--ifto-text-2);flex-shrink:0;white-space:nowrap}
.inbox-list-item .ili-action{font-size:11px;color:var(--ifto-text-2);padding:4px 12px;border:1px solid var(--ifto-divider);cursor:pointer;flex-shrink:0;transition:background .15s}
.inbox-list-item .ili-action:hover{background:var(--ifto-accent);color:var(--ifto-accent-text);border-color:var(--ifto-accent)}

/* Organize tab layout (\u6574\u7406\u6742\u9879) */
.organize-layout{display:flex;gap:16px;align-items:stretch}
.organize-main{flex:5;min-width:0;display:flex;flex-direction:column}
.organize-sidebar{flex:1;min-width:140px;max-width:180px;display:flex;flex-direction:column;gap:10px}
.side-box{background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);padding:12px;display:flex;flex-direction:column;box-shadow:var(--ifto-shadow)}
.side-box-title{font-size:12px;font-weight:600;margin-bottom:8px;color:var(--ifto-text);text-align:center;letter-spacing:0}
.side-folder-list{display:flex;flex-direction:column;gap:2px;overflow-y:auto;max-height:220px}
.side-folder-item{padding:4px 6px;font-size:11px;cursor:pointer;transition:background .15s;display:flex;align-items:center;gap:5px;color:var(--ifto-text)}
.side-folder-item:hover{background:var(--ifto-g6,var(--g6))}
.side-folder-item.drag-over{background:var(--ifto-g6,var(--g6));outline:1px dashed var(--ifto-accent)}
.side-folders-empty{font-size:11px;color:var(--ifto-text-2);padding:8px;text-align:center}
.folder-toggle{font-size:8px;width:12px;flex-shrink:0;color:var(--ifto-text-2);transition:transform .15s}
.folder-children{display:flex;flex-direction:column;gap:1px;padding:2px 0}
.side-drop-area{padding:12px 6px;border:1px dashed var(--ifto-divider);text-align:center;font-size:10px;color:var(--ifto-text-2);cursor:default;transition:all .15s;flex:1;display:flex;align-items:center;justify-content:center;min-height:50px}
.side-drop-area.drag-over{background:var(--ifto-g6,var(--g6));border-color:var(--ifto-accent);color:var(--ifto-accent)}
.side-row{display:flex;gap:6px;flex:1;background:transparent;padding:0}
.side-col{flex:1;display:flex;flex-direction:column;background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);padding:12px;box-shadow:var(--ifto-shadow);border-radius:var(--ifto-radius,8px)}
.card.dragging{opacity:.4}
.card.drag-over-target{outline:2px dashed var(--ifto-accent);transform:scale(1.02)}

.card{
  width:200px;height:100px;
  background:var(--ifto-card-bg);
  padding:14px;
  display:flex;flex-direction:column;justify-content:space-between;
  cursor:pointer;transition:all .2s;
  border:1px solid var(--ifto-divider);
  box-shadow:var(--ifto-shadow);
}
.card:hover{transform:translateY(-1px);box-shadow:var(--ifto-shadow-strong)}
.card-title{font-size:13px;font-weight:400;text-align:left;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3;color:var(--ifto-text);transition:color .15s}
.card-title:hover{color:#4b5563}
.card-date{font-size:11px;color:var(--ifto-text-2);text-align:left}
.card-detail{height:120px;justify-content:flex-start;gap:4px;padding:12px 14px}
.card-detail .card-title{font-size:15px;font-weight:400;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--ifto-text);transition:color .15s}
.card-detail .card-title:hover{color:#4b5563}
.card-detail .card-date{font-size:10px;color:var(--ifto-text-2);margin-top:2px;text-align:left}
.card-detail .card-tags{font-size:10px;color:var(--ifto-text-2);display:flex;flex-wrap:wrap;gap:2px;margin-top:auto;padding-top:2px}
/* Dashed add cards never have rounded corners */
.card-add,.todo-item.add,.card-sm.add-card,.note-add-btn,.project-archive-drop{border-radius:0!important}
.card-add:hover{background:var(--ifto-g6,var(--g6));color:var(--ifto-accent);border-color:var(--ifto-accent)}
/* Week notes cards */
.wn-card{
  background:var(--ifto-card-bg);
  border:1px solid var(--ifto-divider);
  padding:12px 14px;
  cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:8px;
  box-shadow:var(--ifto-shadow);
}
.wn-card:hover{transform:translateY(-1px);box-shadow:var(--ifto-shadow-strong)}
.wn-card-title{flex:1;font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wn-card-date{font-size:10px;color:var(--ifto-text-2);flex-shrink:0}
.todo-widget-item .cb{width:14px;height:14px;border:1.5px solid var(--ifto-text-2);flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;font-size:9px;color:var(--ifto-text);background:var(--ifto-card-bg);border-radius:3px}
.todo-widget-item .cb.checked{background:var(--ifto-accent);color:var(--ifto-accent-text);border-color:var(--ifto-accent)}
.todo-widget-item .cb.checked::after{content:"\\2713"}
.card-tag{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:10px;line-height:1.5;white-space:nowrap;margin:1px 0;background:var(--ifto-g6,var(--g6))}
.card-add{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:200px;height:120px;background:transparent;border:1.5px dashed var(--ifto-text-2)}
.card-add:hover{background:var(--ifto-g6,var(--g6))}
.card-add .ci{font-size:24px;font-weight:300;color:var(--ifto-text-2);opacity:.55}
.card-add .cl{font-size:12px;color:var(--ifto-text-2);opacity:.55}

.slide-nav{display:flex;align-items:center;gap:12px;justify-content:center;margin-top:20px}
.slide-btn{width:36px;height:36px;border:1px solid var(--ifto-divider);background:var(--ifto-card-bg);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;color:var(--ifto-text);box-shadow:var(--ifto-shadow);transition:background .15s}
.slide-btn:hover{background:var(--ifto-g6,var(--g6))}
.slide-num{font-size:14px;letter-spacing:2px;color:var(--ifto-text)}

/* ====== TODO ====== */
.todo-layout{display:flex;gap:0;min-height:520px}
.todo-panel{flex:1 1 0%;min-width:0}
.todo-panel:first-child{padding-right:20px}
.todo-panel:last-child{padding-left:20px}
.todo-list{display:flex;flex-direction:column;gap:10px;background:var(--g6);padding:12px;overflow-y:auto;height:380px}
.todo-item{height:70px;background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);padding:0 16px;display:flex;align-items:center;font-size:12px;cursor:pointer;transition:all .2s;gap:8px;box-shadow:var(--ifto-shadow)}
.todo-item:hover{transform:translateY(-1px);box-shadow:var(--ifto-shadow-strong)}
.todo-item.add{display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--ifto-text-2);border:1.5px dashed var(--ifto-text-2);background:transparent;gap:0}
.todo-item .cb{width:14px;height:14px;border:1.5px solid var(--ifto-text-2);flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;font-size:9px;color:var(--ifto-text);background:var(--ifto-card-bg);border-radius:3px}
.todo-item .cb.checked{background:var(--ifto-accent);color:var(--ifto-accent-text);border-color:var(--ifto-accent)}
.todo-item .todo-text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}
.todo-item .todo-text:hover{opacity:.7}
.todo-item .todo-inline-edit{flex:1;border:none;background:transparent;font-family:var(--font);font-size:12px;color:var(--ifto-text);outline:1px solid var(--ifto-text-2);padding:2px 4px;min-width:0}

/* Activity grid: CSS Grid (not flex) so cards always fill the full column width
   (1:1 with todo list) instead of centering with empty whitespace on the sides. */
.activity-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;background:var(--g6);padding:12px;align-content:flex-start;overflow-y:auto;height:380px;scrollbar-gutter:stable}
.card-sm{height:100px;background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);padding:12px 14px;font-size:12px;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;gap:6px;position:relative;box-shadow:var(--ifto-shadow)}
.card-sm:hover{transform:translateY(-1px);box-shadow:var(--ifto-shadow-strong)}
.card-sm .cb{width:12px;height:12px;border:1.5px solid var(--ifto-text-2);flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;font-size:7px;color:var(--ifto-text);border-radius:3px}
.card-sm .cb.checked{background:var(--ifto-accent);color:var(--ifto-accent-text);border-color:var(--ifto-accent)}
.card-sm .card-sm-title{font-size:15px;font-weight:400;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3;color:var(--ifto-text);transition:color .15s}
.card-sm .card-sm-title:hover{color:#4b5563}
.card-sm .todo-inline-edit{flex:1;border:none;background:transparent;font-family:var(--font);font-size:12px;color:var(--ifto-text);outline:1px solid var(--ifto-text-2);padding:2px 4px;min-width:0}
.card-sm.add-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1.5px dashed var(--ifto-text-2);background:transparent;transition:background .15s,color .15s,border-color .15s}
.card-sm.add-card:hover{background:var(--ifto-g6,var(--g6));border-color:var(--ifto-accent)}
.card-sm.add-card .ci{font-size:24px;font-weight:300;color:var(--ifto-text);opacity:.55}
.card-sm.add-card .cl{font-size:12px;color:var(--ifto-text);opacity:.55}
.todo-hint{font-size:11px;color:var(--g4);text-align:right;margin:8px 0;line-height:1.5}
.project-tabs{display:flex;gap:24px;margin-bottom:16px}
.project-cols{display:flex;gap:20px;align-items:stretch}
.project-col{flex:1;background:var(--g6);padding:12px;display:flex;flex-direction:column;gap:8px;min-height:395px;overflow-y:auto;max-height:400px}
.project-col-title{font-size:15px;font-weight:600;color:var(--ifto-text);margin-bottom:6px;text-align:center;flex-shrink:0}
.project-card{width:100%;height:80px;background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);padding:12px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;flex-shrink:0;cursor:pointer;transition:all .2s;box-shadow:var(--ifto-shadow)}
.project-card:hover{transform:translateY(-1px);box-shadow:var(--ifto-shadow-strong)}
.project-card .pc-title,.project-file-item .pc-title{font-size:13px;font-weight:600;color:var(--ifto-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}
.project-card .pc-title{text-align:center}
.project-file-item .pc-title{font-size:13px;font-weight:500}
.pc-date-badge{font-size:10px;padding:2px 8px;border-radius:9999px;font-weight:500;flex-shrink:0;white-space:nowrap;line-height:1.4}
.pc-date-badge.overdue{background:#ffeaea;color:#d32f2f}
.pc-date-badge.today{background:#fff3e0;color:#e65100}
.pc-date-badge.upcoming{background:#fff8e1;color:#f57f17}
.pc-date-badge.future{background:var(--ifto-g6,var(--g6));color:var(--ifto-text-2)}
.project-card .pc-date-badge{margin-top:2px}
.project-file-item .pc-date-badge{margin-left:auto}
.project-card.dragging{opacity:.4}
.project-folder{padding:6px 10px;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:5px;color:var(--ifto-text);flex-shrink:0;transition:background .15s}
.project-folder:hover{background:var(--ifto-g6,var(--g6))}
.project-folder.drag-over{background:var(--ifto-g6,var(--g6));outline:1px dashed var(--ifto-accent)}
.project-folder .folder-toggle{font-size:8px;width:12px;flex-shrink:0;color:var(--ifto-text-2)}
.project-folder-children{display:none;flex-direction:column;gap:4px;padding:2px 0 2px 16px}
.project-folder-children.open{display:flex}
.project-col.drag-over{outline:2px dashed var(--ifto-accent);background:var(--ifto-g6,var(--g6))}
.project-archive-zone{flex:0 0 auto;width:100px;display:flex;flex-direction:column;flex-shrink:0}
.project-archive-title{font-size:15px;font-weight:600;color:var(--ifto-text);text-align:center;flex-shrink:0}
.project-archive-drop{flex:1;padding:12px 8px;border:1.5px dashed var(--ifto-text-2);text-align:center;font-size:11px;color:var(--ifto-text-2);cursor:default;transition:all .15s;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.5;gap:8px}
.project-archive-drop.drag-over{background:var(--ifto-g6,var(--g6));border-color:var(--ifto-accent);color:var(--ifto-accent)}
.project-empty{font-size:11px;color:var(--ifto-text-2);text-align:center;padding:16px 0;flex-shrink:0}
.btn-project-new{padding:0 18px;height:32px;font-size:13px;border:1px solid var(--ifto-text-2);background:var(--ifto-card-bg);color:var(--ifto-text);cursor:pointer;border-radius:9999px;transition:all .15s;font-family:var(--font);line-height:1.4}
.btn-project-new:hover{background:var(--ifto-accent);color:var(--ifto-accent-text);border-color:var(--ifto-accent)}
.project-folder-card{background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);margin-bottom:8px;flex-shrink:0;box-shadow:var(--ifto-shadow)}
.project-folder-header{padding:10px 12px;display:flex;align-items:center;gap:8px;cursor:pointer;transition:background .15s;user-select:none}
.project-folder-header:hover{background:var(--ifto-g6,var(--g6))}
.project-folder-header .folder-toggle{font-size:10px;width:14px;flex-shrink:0;color:var(--ifto-text-2);transition:transform .2s}
.project-folder-name{font-size:13px;font-weight:600;color:var(--ifto-text);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.project-folder-count{font-size:11px;color:var(--ifto-text-2);background:var(--ifto-g6,var(--g6));padding:2px 8px;border-radius:9999px;flex-shrink:0}
.project-folder-body{display:none;padding:0 12px 12px;flex-direction:column;gap:4px;border-top:1px solid var(--ifto-divider)}
.project-folder-body.open{display:flex}
.project-subfolder{padding:6px 8px 2px 8px;font-size:11px;color:var(--ifto-text-2);font-weight:500;margin-top:4px}
.project-file-item{padding:8px 10px;font-size:12px;color:var(--ifto-text);cursor:pointer;display:flex;align-items:center;gap:6px;transition:background .15s}
.project-file-item:hover{background:var(--ifto-g6,var(--g6))}
.project-file-item.dragging{opacity:.4}
.project-folder-card.drag-over{outline:2px dashed var(--ifto-accent);background:var(--ifto-g6,var(--g6))}
.project-card .todo-inline-edit,
.project-folder-header .todo-inline-edit,
.project-file-item .todo-inline-edit{flex:1;border:none;background:transparent;font-family:var(--font);font-size:12px;color:var(--ifto-text);outline:1px solid var(--ifto-text-2);padding:2px 4px;min-width:0;user-select:text}

/* ====== NOTES ====== */
.note-layout{display:flex;gap:14px}
.note-sidebar{width:320px;display:flex;flex-direction:column;gap:10px;flex-shrink:0;background:var(--g6);padding:12px;justify-content:center}
.note-item{height:80px;background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);padding:0 16px;display:flex;gap:14px;align-items:center;cursor:pointer;transition:all .2s;flex-shrink:0;box-shadow:var(--ifto-shadow)}
.note-item:hover{transform:translateY(-1px);box-shadow:var(--ifto-shadow-strong)}
.note-item.active{background:var(--ifto-g6,var(--g6));border-color:var(--ifto-divider)}
.note-item.active .note-thumb,.note-item.active .nci-title,.note-item.active .nci-author,.note-item.active .nci-rating,.note-item.active .nci-type,.note-item.active .nci-desc{color:var(--ifto-text)}
.note-thumb{width:50px;height:50px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--ifto-g6,var(--g6))}
.note-main{flex:1;min-width:0}
.note-grid{display:flex;flex-wrap:wrap;gap:12px;background:var(--g6);padding:12px;height:300px;align-content:flex-start;overflow-y:auto}
.note-card{width:100%;max-width:220px;height:130px;background:var(--ifto-card-bg);border:1px solid var(--ifto-divider);padding:10px;display:flex;gap:8px;cursor:pointer;transition:all .2s;box-shadow:var(--ifto-shadow)}
.note-card:hover{transform:translateY(-1px);box-shadow:var(--ifto-shadow-strong)}
.note-card-thumb{width:70px;height:95px;background:var(--ifto-g6,var(--g6));flex-shrink:0;overflow:hidden}
.note-card-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.note-card-info{display:flex;flex-direction:column;gap:4px;font-size:11px;flex:1;min-width:0}
.note-card-info .nci-title{font-size:13px;font-weight:600;color:var(--ifto-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.note-card-info .nci-author{font-size:11px;color:var(--ifto-text-2)}
.note-card-info .nci-rating{font-size:11px;color:#f59e0b}
.note-card-info .nci-type{font-size:10px;color:var(--ifto-text-2)}
.note-card-info .nci-desc{font-size:10px;color:var(--ifto-text-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* Paper cards (no image) */
.note-card-paper{max-width:260px;height:150px;flex-direction:column;gap:4px;padding:12px;width:100%}
.note-card-paper .nci-title{font-size:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3;max-height:2.6em}
.note-card-paper .nci-detail{display:flex;flex-direction:column;gap:2px;margin-top:4px}
.note-card-paper .nci-row{font-size:11px;color:var(--ifto-text-2);display:flex;gap:6px}
.note-card-paper .nci-label{color:var(--ifto-text-2);flex-shrink:0;white-space:nowrap}
.note-card-paper .nci-label::after{content:''}
.note-card-paper .nci-tags{display:flex;flex-wrap:wrap;gap:3px;margin-top:auto;padding-top:4px}
.note-card-paper .nci-tag{font-size:9px;padding:2px 6px;border-radius:9999px;background:rgba(52,152,219,0.12);color:#3498db;border:1px solid rgba(52,152,219,0.25);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:80px}
.note-search{margin-bottom:8px;width:100%}
.paper-search-input{width:100%;padding:8px 16px;font-size:13px;border:1px solid var(--ifto-divider);background:var(--ifto-card-bg);color:var(--ifto-text);border-radius:9999px;font-family:var(--font);outline:none;transition:border-color .2s}
.paper-search-input:focus{border-color:var(--ifto-accent)}

/* Note add button */
.note-add-btn{width:100%;max-width:220px;height:130px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:transparent;border:1.5px dashed var(--ifto-text-2);cursor:pointer;transition:all .2s;font-family:var(--font);color:var(--ifto-text);flex-shrink:0}
.note-add-btn:hover{background:var(--ifto-g6,var(--g6));border-color:var(--ifto-accent);opacity:1}
.note-add-btn .ci{font-size:22px;font-weight:300;opacity:.55}
.note-add-btn .cl{font-size:12px;opacity:.55;letter-spacing:1px}
.note-empty{font-size:12px;color:var(--ifto-text-2);text-align:center;padding:40px 0;width:100%}

/* ====== FOOTER ====== */
.footer{margin-top:80px;background:#2C2C2C;padding:60px var(--section-pad) 40px;display:flex;flex-direction:column;align-items:center;gap:30px;min-height:250px}
.footer .link-back,.footer .footer-copy{color:#BDBDBD}
.footer-social{display:flex;align-items:center;gap:16px}
.footer-social-icon{width:48px;height:48px;background-size:contain;background-repeat:no-repeat;background-position:center}
.footer-social img{width:180px;height:auto}
.footer-copy{font-size:12px;color:var(--g4);letter-spacing:1px}
.icon-1{background-image:url('data:image/jpeg;base64,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')}
.icon-2{background-image:url('data:image/jpeg;base64,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')}

/* ====== RESPONSIVE ====== */
/* ====== Responsive 1200px ====== */
@media(max-width:1200px){
  .hero{min-height:clamp(450px,55vw,700px)}
  .hero-left{flex:0 0 clamp(240px,25vw,380px)}
  .shortcuts{width:clamp(240px,25vw,340px);gap:16px}
  .btn-s{width:clamp(110px,12vw,160px);height:clamp(48px,5vw,60px)}
  .widget-card{width:clamp(240px,25vw,340px)}
}
/* ====== Responsive 1000px ====== */
@media(max-width:1000px){
  .nav{height:clamp(60px,8vh,80px);gap:8px}
  .nav-logo img{height:clamp(28px,3.5vw,40px);max-width:min(30vw,300px)}
  .hero{flex-direction:column;min-height:auto}
  .hero-left{padding-top:17px;flex:auto}
  .hero-watermark{top:120px}
  .hero-right{min-height:clamp(250px,40vw,400px);margin-top:20px}
  .hero-brand{position:relative;top:auto;left:auto;margin:10px 0 0}
}
/* ====== Responsive 768px ====== */
@media(max-width:768px){
  .nav{flex-wrap:wrap;height:auto;min-height:56px;gap:6px;justify-content:space-between;padding:6px clamp(12px,3vw,20px)}
  .nav-logo img{height:28px;max-width:40vw}
  .nav-items{gap:clamp(4px,1vw,8px);flex:1;min-width:0}
  .nav-item{font-size:clamp(10px,1.5vw,12px);letter-spacing:clamp(0.8px,0.15vw,1.5px)}
  .hero-left{padding-top:20px}
  .hero-watermark{top:80px;font-size:32px}
  .hero-brand{position:relative;top:auto;left:auto;margin:8px 0 0;font-size:clamp(28px,6vw,36px)}
  .hero-title{font-size:clamp(20px,4vw,24px)}
  .hero-right{min-height:200px;margin-top:12px}
  .todo-layout{flex-direction:column}
  .project-cols{flex-direction:column}
  .note-layout{flex-direction:column}
  .note-sidebar{width:100%}
  .card-grid{gap:8px;padding:12px}
  .card{width:calc(50% - 6px);min-width:120px;height:80px}
  .shortcuts{grid-template-columns:repeat(2,1fr);width:auto;gap:10px}
  .btn-s{width:auto;height:clamp(44px,6vw,52px)}
  .section-title{font-size:clamp(32px,8vw,48px);margin:60px 0 16px}
  .section-title-wrap{margin:60px 0 16px}
  .section-title-watermark{font-size:clamp(28px,7vw,42px)}
}
/* ====== Responsive 480px ====== */
@media(max-width:480px){
  .nav{flex-wrap:wrap;min-height:auto;padding:8px 10px;gap:4px;justify-content:center}
  .nav-logo{flex:0 0 100%;justify-content:center;margin-bottom:2px}
  .nav-logo img{height:24px;max-width:none}
  .nav-items{flex:0 0 100%;justify-content:center;gap:2px;flex-wrap:wrap}
  .nav-item{font-size:10px;letter-spacing:0.8px;padding:3px 4px;margin:0 2px}
  .hero{padding:0 clamp(8px,2vw,12px)}
  .hero-left{padding-top:12px}
  .hero-watermark{top:60px;font-size:24px}
  .hero-brand{font-size:24px}
  .hero-title-sub{font-size:10px}
  .shortcuts{grid-template-columns:1fr 1fr;gap:6px}
  .btn-s{height:40px;padding:4px}
  .btn-s .s-icon{font-size:14px}
  .btn-s .s-label{font-size:12px}
  .widget-card{width:100%;height:auto;min-height:280px}
  .widget-indicators{width:100%}
  .hero-right{min-height:160px}
  .section{padding:0 clamp(8px,2vw,12px)}
  .section-title{font-size:28px;margin:40px 0 12px}
  .section-title-wrap{margin:40px 0 12px}
  .section-title-watermark{font-size:24px}
  .card{width:100%;min-width:0}
  .card-grid{padding:8px;gap:6px}
  .todo-list{height:auto;max-height:300px;padding:12px}
  .activity-grid{height:auto;max-height:250px;padding:12px}
  .project-col{min-height:auto;max-height:300px}
}

/* ====== Domain Skill Tree ====== */
.domain-tree-overlay {
  position: absolute; inset: 0 0 70px 0;
  z-index: 5; overflow: hidden;
  animation: domainFadeIn .3s ease;
}
@keyframes domainFadeIn { from { opacity: 0; } to { opacity: 1; } }
.domain-tree-inner {
  position: absolute; inset: 0;
  transform-origin: center center;
}
.dt-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%; font-size: 14px; color: var(--ifto-text-2, #6b7280); gap: 6px;
}
.st-sector { transition: opacity .15s; pointer-events: auto; }
.st-sector:hover { opacity: 0.15; }
.domain-tree-loading {
  display: flex; align-items: center; justify-content: center;
  height: 100%; font-size: 14px; color: var(--ifto-text-2, #6b7280);
}
/* Zoom controls */
.dt-zoom-ctrl {
  position: absolute; bottom: 0; right: 14px; z-index: 20;
  display: flex; align-items: center; gap: 6px;
  background: transparent;
  border: none; border-radius: 0; padding: 0;
  box-shadow: none;
  user-select: none; pointer-events: auto;
}
.dt-zoom-btn {
  width: 26px; height: 26px; border: none;
  background: var(--ifto-g6, var(--g6, #f2f2f2));
  border-radius: var(--ifto-radius, 4px); cursor: pointer;
  font-size: 16px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  color: var(--ifto-text, #111);
  transition: background .15s;
}
.dt-zoom-btn:hover { background: var(--ifto-divider, #e5e7eb); }
.dt-zoom-pct {
  font-size: 12px; font-weight: 600; color: var(--ifto-text, #111);
  min-width: 36px; text-align: center;
}

/* ====== Responsive scale-up: large desktops / 2K / 4K ====== */
/* The dashboard is a fixed-pixel design, so instead of forcing an OS/zoom
   change we raise --ifto-scale (typography) and --ifto-max (column width)
   and enlarge the main components at each step. */
@media (min-width: 1700px) {
  :root { --ifto-max: 1840px; --ifto-scale: 1.08; }
  .card { width: 224px; height: 110px; }
  .card-detail { height: 132px; }
  .card-sm { height: 110px; }
  .todo-item { height: 76px; }
  .note-card { max-width: 250px; height: 145px; }
}
@media (min-width: 2200px) {
  :root { --ifto-max: 2120px; --ifto-scale: 1.18; }
  .header, .nav { height: 118px; }
  .nav-logo img { height: 56px; }
  .nav-item { font-size: 17px; }
  .card { width: 248px; height: 120px; }
  .card-detail { height: 144px; }
  .card-sm { height: 120px; }
  .todo-item { height: 82px; }
  .note-card { max-width: 280px; height: 160px; }
}
@media (min-width: 2900px) {
  :root { --ifto-max: 2400px; --ifto-scale: 1.32; }
  .header, .nav { height: 132px; }
  .nav-logo img { height: 64px; }
  .nav-item { font-size: 19px; }
  .card { width: 280px; height: 134px; }
  .card-detail { height: 160px; }
  .card-sm { height: 134px; }
  .todo-item { height: 92px; }
  .note-card { max-width: 300px; height: 175px; }
}

/* ====== Mobile portrait polish ====== */
@media (max-width: 600px) {
  .widget-card { width: 100%; height: auto; min-height: 320px; }
  .widget-indicators, .shortcuts { width: 100%; }
  .section-title { font-size: 32px; }
  .section-title-watermark { font-size: 26px; }
  .section-title-wrap { margin: 48px 0 14px; }
  .card-detail { height: auto; min-height: 112px; }
  .card-sm { height: auto; min-height: 96px; }
  .note-sidebar { width: 100%; }
  .note-card, .note-card-paper { max-width: 100%; }
  .todo-item { height: auto; min-height: 60px; }
  .hero-right { min-height: 220px; }
  .footer { padding: 40px var(--section-pad) 30px; }

  /* \u5BFC\u822A\uFF1Alogo \u72EC\u5360\u4E00\u884C\uFF0C\u83DC\u5355\u6A2A\u5411\u6EDA\u52A8\uFF08\u4E0D\u6362\u884C\u3001\u4E0D\u6324\u538B\uFF09 */
  .nav { flex-wrap: wrap; min-height: auto; padding: 6px 8px; gap: 4px; justify-content: center; }
  .nav-logo { flex: 0 0 100%; justify-content: center; margin-bottom: 2px; }
  .nav-logo img { height: 26px; }
  .nav-items { flex: 0 0 100%; justify-content: flex-start; flex-wrap: nowrap; overflow-x: auto; gap: 2px; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 2px; }
  .nav-items::-webkit-scrollbar { display: none; }
  .nav-item { flex: 0 0 auto; white-space: nowrap; font-size: 11.5px; letter-spacing: .5px; padding: 4px 8px; }

  /* \u6807\u7B7E\u884C\uFF1A\u6A2A\u5411\u6EDA\u52A8\uFF0C\u907F\u514D\u6298\u6210\u591A\u884C */
  .tabs { gap: 12px; margin-bottom: 12px; flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 3px; }
  .tabs::-webkit-scrollbar { display: none; }
  .tab { flex: 0 0 auto; white-space: nowrap; font-size: 14px; letter-spacing: 1px; }

  /* \u533A\u5757\u6807\u9898\uFF1A\u7F29\u5C0F\uFF0C\u51CF\u5C11\u7559\u767D */
  .section-title { font-size: 28px; letter-spacing: 3px; }
  .section-title-wrap { margin: 36px 0 12px; }
  .section-title-watermark { font-size: 22px; }
}
@media (max-width: 400px) {
  .shortcuts { grid-template-columns: 1fr; gap: 8px; }
  .btn-s { width: 100%; }
  .section-title { font-size: 26px; }
  .section-title-watermark { font-size: 22px; }
  .nav-item { font-size: 9px; letter-spacing: .5px; padding: 3px 3px; }
  .hero-title { font-size: 22px; }
  .hero-title-sub { display: none; }
}
/* ====== Mobile portrait\uFF1A\u6309\u79FB\u52A8\u7AEF\u4E60\u60EF\u91CD\u6392\uFF08\u4EC5\u7A84\u5C4F\uFF0C\u4E0D\u5F71\u54CD\u5BBD\u5C4F\uFF09 ====== */
@media (max-width: 600px) {
  /* \u2460 \u9876\u90E8\u5BFC\u822A\uFF1A\u653E\u5927\u5B57\u4F53\u3001\u5438\u9876\u3001\u4E00\u884C\u6A2A\u5411\u6ED1\u52A8\u3001\u70B9\u51FB\u533A \u226544px */
  .nav { position: sticky; top: 0; z-index: 200; background: var(--bg); border-bottom: 1px solid var(--g6); flex-wrap: wrap; padding: 8px 8px 2px; gap: 2px; }
  .nav-logo { flex: 0 0 100%; justify-content: center; margin-bottom: 4px; }
  .nav-logo img { height: 30px; max-width: none; }
  .nav-items { flex: 0 0 100%; flex-wrap: nowrap !important; overflow-x: auto; justify-content: flex-start !important; gap: 2px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .nav-items::-webkit-scrollbar { display: none; }
  .nav-item { flex: 0 0 auto !important; font-size: 15px !important; letter-spacing: .5px !important; padding: 10px 12px !important; min-height: 44px; display: inline-flex; align-items: center; white-space: nowrap; margin: 0 !important; }

  /* \u2461 \u5FEB\u6377\u901A\u9053\uFF1A2\xD72 \u7F51\u683C */
  .shortcuts { grid-template-columns: 1fr 1fr !important; gap: 10px !important; width: 100% !important; margin-top: 20px !important; }
  .btn-s { width: 100% !important; height: 72px !important; padding: 10px !important; }
  .btn-s .s-icon { font-size: 20px !important; }
  .btn-s .s-label { font-size: 14px !important; }

  /* \u2462 \u5C0F\u7EC4\u4EF6\uFF1A\u5207\u6362\u7BAD\u5934\u5C45\u4E2D\u3001\u9690\u85CF\u5206\u9694\u7EBF\u3001\u5361\u7247\u6EE1\u5BBD */
  .hero-nav-row { justify-content: center; gap: 12px; margin-top: 16px; }
  .hero-nav-area { gap: 18px; margin: 0 auto; }
  .hero-divider { display: none; }
  .btn-arrow { width: 48px; height: 48px; font-size: 18px; }
  .widget-card { width: 100% !important; min-height: 260px !important; }
  .widget-indicators { width: 100% !important; margin-top: 8px; }
  .widget-dot { width: 8px; height: 8px; margin: 0 4px; }

  /* \u2463 \u9879\u76EE\u7BA1\u7406\uFF1A\u6A2A\u5411\u6ED1\u52A8\u770B\u677F\uFF08\u4FDD\u7559\u770B\u677F\u5F62\u6001\uFF0C\u4E00\u5C4F\u4E00\u5217\uFF09 */
  .project-cols { flex-direction: row !important; overflow-x: auto !important; gap: 10px !important; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 10px; }
  .project-col { flex: 0 0 80vw !important; min-height: auto !important; max-height: none !important; scroll-snap-align: center; }
  .project-col-title { font-size: 14px; }

  /* \u2464 \u6574\u4F53\u7559\u767D\u538B\u7F29 */
  .section-title { font-size: 26px !important; letter-spacing: 2px !important; }
  .section-title-wrap { margin: 32px 0 12px !important; }
  .section-title-watermark { font-size: 20px !important; }
}

</style>
<style id="ifto-mobile-styles">
/* All overrides require the phone class supplied by Obsidian Platform.isPhone.
   Desktop (including narrow windows) and tablets never match these rules. */
.ifto-container.ifto-phone {
  --section-pad: 13px;
  --ifto-scale: 1;
  --ifto-host-top-inset: max(52px, env(safe-area-inset-top, 0px));
  --ifto-host-bottom-inset: max(88px, calc(env(safe-area-inset-bottom, 0px) + 72px));
  --mobile-panel-bg: var(--g6, #f2f2f2);
  position: relative; overflow: hidden !important; overscroll-behavior-x: none;
  min-width: 0;
  min-height: 0;
  height: 100%;
}
.ifto-phone .page {
  display: flex; flex-direction: column;
  width: 100%; height: 100%; min-height: 0;
  overflow: hidden; overscroll-behavior: contain;
}
.ifto-phone [hidden] { display: none !important; }
.ifto-phone .header {
  position: relative; top: auto; z-index: 5;
  flex: 0 0 auto; height: auto; border: 0;
  padding: var(--ifto-host-top-inset) 0 6px;
}
.ifto-phone .header .nav {
  position: relative; top: auto; display: block;
  height: auto; min-height: 0; padding: 0 13px;
  border: 0; max-width: none;
}
.ifto-phone .nav-logo { display: none; }
.ifto-phone .nav-items {
  display: flex; flex-wrap: nowrap !important; justify-content: flex-start !important;
  overflow-x: auto; overflow-y: hidden; gap: 13px; padding: 5px 0;
  width: 100%; scrollbar-width: none; -webkit-overflow-scrolling: touch; touch-action: pan-y;
}
.ifto-phone .nav-items::-webkit-scrollbar { display: none; }
.ifto-phone .nav-item {
  flex: 0 0 auto !important; display: inline-flex; align-items: center; justify-content: center;
  min-height: 38px; padding: 0 4px !important; margin: 0 !important;
  font-size: 18px !important; font-weight: 400;
  letter-spacing: 1.2px !important; white-space: nowrap; line-height: 1.2;
}
.ifto-phone .nav-item.active::before { top: 5px; }
.ifto-phone .nav-item.active::after { bottom: 5px; }
.ifto-phone .mobile-pages { position: relative; flex: 1 1 0; min-height: 0; overflow: hidden; overscroll-behavior-x: none; }
.ifto-phone .mobile-panel {
  position: relative; display: block; width: 100%; height: 100%; max-width: none;
  min-width: 0; min-height: 0; margin: 0; padding: 0 13px 16px;
  overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
.ifto-phone .mobile-brand-mark {
  position: absolute; left: 50%; top: 50%; width: 132px; height: 50px; margin: 0;
  object-fit: contain; transform: rotate(-90deg); pointer-events: none;
  translate: -50% -50%;
  border: 0; box-shadow: none; background: transparent;
}
.theme-dark .ifto-phone .mobile-brand-mark { filter: brightness(0) invert(1); }
.ifto-phone .mobile-brand-toggle {
  position: absolute; z-index: 31; top: auto; right: 0; bottom: calc(var(--ifto-host-bottom-inset) + 8px);
  display: block; width: 58px; height: 142px; min-width: 58px; min-height: 142px;
  padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none;
  cursor: pointer; touch-action: manipulation;
}
.ifto-phone .mobile-brand-toggle:focus-visible { outline: 2px solid var(--g1); outline-offset: -2px; }
.ifto-phone .section-title-wrap {
  display: grid; height: 98px; align-content: center;
  margin: 0 0 12px !important; padding: 14px 30px 0 0;
}
.ifto-phone .section-title-wrap .section-title {
  margin: 0 !important; font-size: clamp(48px, 17vw, 64px) !important;
  font-weight: 400; letter-spacing: 0 !important; line-height: 1; opacity: .22;
  color: var(--g4); align-self: center; transform: translateY(-9px);
}
.ifto-phone .section-title-watermark {
  font-size: clamp(29px, 11.4vw, 48px) !important; font-weight: 300;
  color: var(--g1); letter-spacing: -1px; line-height: 1.25;
  white-space: nowrap; align-self: center;
}
.ifto-phone .link-back, .ifto-phone .todo-hint, .ifto-phone .page > .footer { display: none !important; }
.ifto-phone .tabs {
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px;
  overflow: visible; margin: 0 0 10px !important; padding: 0; min-height: 34px;
}
.ifto-phone .tab {
  flex: 0 0 auto; display: inline-flex; align-items: center;
  min-height: 34px; font-size: 12px; letter-spacing: 1px; color: var(--g1);
  white-space: nowrap; padding: 7px 1px;
}
.ifto-phone .tab.active::before { top: 2px; }
.ifto-phone .tab.active::after { bottom: 2px; }
.ifto-phone #inbox .tab[data-tab="organize"] { display: none !important; }
.ifto-phone .sort-toggle { font-size: 10px; letter-spacing: 0; min-height: 32px; display: inline-flex; align-items: center; white-space: nowrap; }
.ifto-phone #inbox > .tabs > div { margin-left: auto !important; gap: 0 !important; }
.ifto-phone .card-grid, .ifto-phone .note-grid, .ifto-phone .activity-grid {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  grid-auto-rows: minmax(80px, auto); align-content: start;
  justify-items: stretch; gap: 7px 9px; padding: 10px; min-width: 0; width: 100%;
  background: var(--mobile-panel-bg); border: 0; min-height: 0; height: auto; overflow: visible; border-radius: 0 !important;
}
.ifto-phone #inboxGrid.card-grid, .ifto-phone #reviewGrid { min-height: 358px; }
.ifto-phone .card, .ifto-phone .card-detail, .ifto-phone .card-sm,
.ifto-phone .note-card, .ifto-phone .note-card-paper, .ifto-phone .note-add-btn {
  position: relative; width: 100%; max-width: 100%; min-width: 0; margin-inline: auto;
  min-height: 80px; height: auto; padding: 12px 10px; border-radius: 0 !important;
  background: var(--ifto-card-bg); border: 0; box-shadow: 1px 1px 2px #00000014;
  overflow-wrap: anywhere; text-align: left;
}
.ifto-phone .card-add, .ifto-phone .note-add-btn {
  border: 1px dashed var(--ifto-text-2); background: transparent;
  align-items: center; justify-content: center; text-align: center; box-shadow: none;
}
.ifto-phone .card-title, .ifto-phone .card-sm-title, .ifto-phone .nci-title {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; font-size: 12px; line-height: 1.4; font-weight: 400; padding-right: 16px; white-space: normal;
}
.ifto-phone .card-date { font-size: 10px; letter-spacing: 0; line-height: 1.4; }
.ifto-phone .card-tags { display: none; }
.ifto-phone .slide-nav { justify-content: center; gap: 18px; margin: 16px 0 0; padding: 0; }
.ifto-phone .slide-btn { width: 48px; height: 48px; border-radius: 0 !important; box-shadow: none; background: var(--ifto-card-bg); }
.ifto-phone .slide-btn:disabled { opacity: .3; cursor: default; }
.ifto-phone .slide-num { font-size: 11px; }

/* Home: a single widget, then widget controls; creation lives in the dock. */
.ifto-phone #home { display: block; min-height: 0; padding-top: 110px; }
.ifto-phone .hero-watermark { top: 28px; left: 11px; font-size: 80px; line-height: 1; opacity: .22; }
.ifto-phone .hero-brand { position: absolute; margin: 0; top: 49px; left: 13px; font-size: clamp(36px, 12.8vw, 48px); line-height: 1; font-weight: 300; }
.ifto-phone .hero-left { display: flex; width: 100%; padding: 0; min-width: 0; }
.ifto-phone .hero-right { display: none !important; }
.ifto-phone .widget-card {
  order: 1; width: 100% !important; height: 380px; min-height: 320px !important;
  max-width: none; padding: 16px; margin: 0; flex-shrink: 0; border-radius: 0 !important;
}
.ifto-phone .hero-nav-row { order: 2; margin: 14px 0 0; justify-content: center; }
.ifto-phone .hero-nav-area { gap: 22px; margin: 0; }
.ifto-phone .hero-divider { display: none; }
.ifto-phone .btn-arrow { width: 53px; height: 53px; background: var(--ifto-card-bg); border-radius: 0 !important; }
.ifto-phone .widget-indicators { order: 3; width: 100%; margin: 10px 0 4px; }

/* TODO uses a vertical list followed by an activity grid. */
.ifto-phone .todo-layout { display: flex; flex-direction: column; gap: 16px; min-height: 0; }
.ifto-phone .todo-panel { width: 100%; min-width: 0; flex: 0 0 auto; padding: 0; }
.ifto-phone .todo-list { display: flex; flex-direction: column; gap: 5px; background: var(--mobile-panel-bg); padding: 10px; min-height: 0; height: 220px; max-height: 220px; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; border-radius: 0 !important; }
.ifto-phone .activity-grid { height: 220px; min-height: 0; max-height: 220px; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; scrollbar-gutter: auto; }
.ifto-phone .todo-item { position: relative; height: auto; min-height: 42px; padding: 2px 30px 2px 4px; gap: 0; box-shadow: none; border-radius: 0 !important; }
.ifto-phone .todo-list > .todo-item { flex: 0 0 auto; }
.ifto-phone .todo-item .cb, .ifto-phone .card-sm .cb { position: relative; flex: 0 0 38px; width: 38px; height: 38px; margin: 0; border: 0; background: transparent; font-size: 12px; color: var(--g1); }
.ifto-phone .todo-item .cb::before, .ifto-phone .card-sm .cb::before { content: ''; width: 13px; height: 13px; position: absolute; border: 1px solid var(--ifto-text-2); border-radius: 3px; pointer-events: none; }
.ifto-phone .todo-item .cb.checked::before, .ifto-phone .card-sm .cb.checked::before { background: var(--g1); opacity: .15; }
.ifto-phone .todo-item .cb.checked, .ifto-phone .card-sm .cb.checked { background: transparent; color: var(--g1); }
.ifto-phone .todo-item .todo-text { min-width: 0; white-space: normal; overflow-wrap: anywhere; }
.ifto-phone .tab-badge { font-size: 10px; }

/* PROJECT has vertically stacked status sections and a narrow archive rail. */
.ifto-phone #project > div:nth-child(2) { gap: 6px !important; margin-bottom: 10px !important; }
.ifto-phone .btn-project-new { padding: 0 9px; min-height: 36px; height: auto; font-size: 12px; border-radius: 0 !important; }
.ifto-phone .project-cols {
  position: relative; display: flex !important; flex-direction: column !important;
  overflow: visible !important; gap: 10px !important; padding: 0; scroll-snap-type: none;
}
.ifto-phone .project-col {
  flex: 0 0 auto !important; width: 100%; min-width: 0 !important; max-width: none;
  min-height: 200px !important; max-height: 280px !important; height: 260px;
  padding: 6px 9px 9px; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch;
  background: var(--mobile-panel-bg); border-radius: 0 !important;
}
.ifto-phone .project-col-title { justify-content: center; text-align: center; padding: 2px; min-height: 28px; font-size: 12px; }
.ifto-phone .project-col-title-toggle > span { display: inline-flex; align-items: center; min-height: 30px; }
.ifto-phone .project-card, .ifto-phone .project-file-item {
  position: relative; min-height: 36px; height: auto; width: 100%; padding: 8px 30px 8px 8px;
  margin: 0 0 5px; align-items: flex-start; justify-content: center;
  border: 0; background: var(--ifto-card-bg); box-shadow: none; border-radius: 0 !important;
}
.ifto-phone .pc-title { font-size: 12px; line-height: 1.4; white-space: normal; overflow-wrap: anywhere; text-align: left; }
.ifto-phone .project-folder-card { min-width: 0; max-width: 100%; border-radius: 0 !important; }
.ifto-phone .project-folder-header { position: relative; padding: 6px 30px 6px 5px; min-height: 38px; }
.ifto-phone .project-folder-name { min-width: 0; overflow-wrap: anywhere; white-space: normal; }
.ifto-phone .project-archive-zone { display: none !important; }
.ifto-phone .project-archive-drop, .ifto-phone .mobile-archive-button { display: none !important; }
.ifto-phone #project > div:nth-child(2) { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 12px !important; }
.ifto-phone .btn-project-new { position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 38px; height: auto; padding: 8px 2px; border: 0; border-radius: 0 !important; background: transparent; box-shadow: none; font-size: 12px; white-space: nowrap; }
.ifto-phone .btn-project-new::before, .ifto-phone .btn-project-new::after { position: absolute; left: 0; right: 0; height: 1px; content: ''; background: var(--g1); }
.ifto-phone .btn-project-new::before { top: 3px; }
.ifto-phone .btn-project-new::after { bottom: 3px; }

/* Reading tabs replace the desktop sidebar; all cards take two equal columns. */
.ifto-phone .note-layout { display: flex; flex-direction: column; gap: 8px; }
.ifto-phone .note-sidebar { display: flex; flex-direction: row; justify-content: flex-start; width: 100%; gap: 16px; overflow-x: auto; padding: 0; background: transparent; border-radius: 0 !important; }
.ifto-phone .note-item { position: relative; flex: 0 0 auto; width: auto; min-height: 34px; height: auto; padding: 6px 0; border: 0; box-shadow: none; background: transparent; }
.ifto-phone .note-item > div:not(.note-thumb) { font-size: 12px !important; font-weight: 400 !important; line-height: 1.6; white-space: nowrap; }
.ifto-phone .note-item .note-thumb, .ifto-phone .note-item span, .ifto-phone .note-item br { display: none; }
.ifto-phone .note-item.active::before, .ifto-phone .note-item.active::after { content: ''; position: absolute; left: 0; right: 0; height: 1px; background: var(--g1); }
.ifto-phone .note-item.active::before { top: 0; } .ifto-phone .note-item.active::after { bottom: 0; }
.ifto-phone .note-main { min-width: 0; width: 100%; }
.ifto-phone .note-card { gap: 6px; padding: 10px 6px; }
.ifto-phone .note-card-thumb { flex: 0 0 28px; width: 28px; height: 42px; border-radius: 0 !important; }
.ifto-phone .note-card-info { min-width: 0; flex: 1; }
.ifto-phone .nci-author, .ifto-phone .nci-type, .ifto-phone .nci-rating, .ifto-phone .nci-row { font-size: 10px; line-height: 1.4; }
.ifto-phone .nci-desc, .ifto-phone .nci-tags { display: none; }
.ifto-phone .note-search, .ifto-phone .note-empty, .ifto-phone .project-empty { grid-column: 1 / -1; min-width: 0; }
.ifto-phone .paper-search-input { width: 100%; min-width: 0; min-height: 40px; font-size: 16px; }

/* AREA reuses the dashboard and its statistics; the section owns scrolling. */
.ifto-phone #area .domain-tree-overlay { position: relative !important; inset: auto !important; width: 100%; height: auto !important; min-height: 350px; border-radius: 0 !important; overflow: visible; animation: none; }
.ifto-phone #area #domainTreeInner { position: relative !important; inset: auto !important; height: auto !important; min-height: 0; overflow: visible !important; }
.ifto-phone #area .dt-board { height: auto; padding: 0; overflow: visible; }
.ifto-phone #area .dt-title-wrap { display: none; }
.ifto-phone #area .dt-summary { padding: 0 0 10px; border: 0; }
.ifto-phone #area .dt-sum-left { width: 100%; align-items: center; flex-wrap: wrap; gap: 6px; }
.ifto-phone #area .dt-sum-meta { font-size: 11px; white-space: normal; }
.ifto-phone #area .dt-sum-bar { flex: 1 1 40px; width: auto; min-width: 30px; }
.ifto-phone #area .dt-view-toggle { margin-left: auto; }
.ifto-phone #area .dt-view-btn { min-width: 30px; min-height: 34px; }
.ifto-phone #area .dt-scroll { overflow: visible; padding: 12px; background: var(--mobile-panel-bg); }
.ifto-phone #area .dt-groups { justify-content: flex-start; padding: 0; gap: 16px; }
.ifto-phone #area .dt-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px 9px; }
.ifto-phone #area .dt-card { min-width: 0; padding: 10px; border-radius: 0; }
.ifto-phone #area .dt-card-name { overflow-wrap: anywhere; }
.ifto-phone #area .dt-tree { min-width: 0; width: 100%; overflow-x: auto; }
.ifto-phone #area .dt-tree-name { min-width: 65px; }
.ifto-phone #area .dt-sun-wrap { touch-action: none; min-height: 290px; overflow: hidden; }
.ifto-phone #area .dt-zoom-ctrl { position: relative !important; inset: auto !important; transform: none; justify-content: center; padding-top: 10px; }
.ifto-phone #area .dt-zoom-btn { min-width: 40px; min-height: 40px; }

/* The brand button opens a vertical, floating shortcut panel on demand. */
.ifto-phone .mobile-dock { position: absolute; z-index: 30; top: auto; bottom: calc(var(--ifto-host-bottom-inset) + 8px); right: 64px; width: min(150px, calc(100% - 78px)); max-height: calc(100% - var(--ifto-host-top-inset) - var(--ifto-host-bottom-inset) - 16px); overflow-x: hidden; overflow-y: auto; padding: 8px; background: var(--ifto-card-bg); border: 1px solid var(--ifto-divider); box-shadow: var(--ifto-shadow-strong); opacity: 0; visibility: hidden; transform: scale(.12,.12); transform-origin: bottom right; pointer-events: none; transition: opacity 160ms ease, transform 240ms cubic-bezier(.2,.8,.2,1), visibility 0s linear 240ms; }
.ifto-phone .mobile-dock[hidden] { display: none !important; }
.ifto-phone .mobile-dock.is-open { opacity: 1; visibility: visible; transform: scale(1); pointer-events: auto; transition-delay: 0s; }
.ifto-phone .mobile-dock .hero-title { display: flex; justify-content: flex-start; gap: 5px; font-size: 11px; font-weight: 400; letter-spacing: 1px; margin: 0 0 7px; line-height: 1.3; white-space: nowrap; }
.ifto-phone .mobile-dock .hero-title-sub { display: inline; font-size: 8px; letter-spacing: 0; }
.ifto-phone .mobile-dock .shortcuts { display: grid; grid-template-columns: minmax(0, 1fr) !important; gap: 7px !important; width: 100% !important; margin: 0 !important; }
.ifto-phone .mobile-dock .btn-s { display: flex; flex-direction: row; justify-content: flex-start; gap: 8px; width: 100% !important; height: 42px !important; min-height: 42px; padding: 0 8px !important; background: var(--ifto-card-bg); border: 1px solid var(--g6); border-radius: 0 !important; box-shadow: none; opacity: 0; transform: translateY(-4px); transition: opacity 150ms ease, transform 180ms ease; }
.ifto-phone .mobile-dock.is-open .btn-s { opacity: 1; transform: translateY(0); }
.ifto-phone .mobile-dock.is-open .btn-s:nth-child(1) { transition-delay: 45ms; }
.ifto-phone .mobile-dock.is-open .btn-s:nth-child(2) { transition-delay: 85ms; }
.ifto-phone .mobile-dock.is-open .btn-s:nth-child(3) { transition-delay: 125ms; }
.ifto-phone .mobile-dock.is-open .btn-s:nth-child(4) { transition-delay: 165ms; }
.ifto-phone .mobile-dock .s-label { font-size: 15px !important; letter-spacing: 0; }
.ifto-phone .mobile-dock .s-icon { font-size: 20px !important; font-weight: 300; }
.ifto-phone.mobile-keyboard .mobile-dock { display: none; }
.ifto-phone.mobile-keyboard .mobile-brand-toggle { display: none; }
@media (max-height: 600px) {
  .ifto-phone .mobile-brand-toggle { height: 88px; min-height: 88px; width: 46px; min-width: 46px; }
  .ifto-phone .mobile-brand-mark { width: 82px; height: 32px; }
  .ifto-phone .mobile-dock { bottom: calc(var(--ifto-host-bottom-inset) + 8px); max-height: calc(100% - var(--ifto-host-top-inset) - var(--ifto-host-bottom-inset) - 16px); }
}
.ifto-phone .mobile-more { position: absolute; top: 0; right: 0; width: 32px; height: 32px; min-width: 32px; min-height: 32px; display: inline-flex; align-items: center; justify-content: center; padding: 0; border: 0; border-radius: 0; box-shadow: none; background: transparent; color: var(--ifto-text-2); font-size: 20px; z-index: 2; }
.ifto-phone .mobile-empty { grid-column: 1 / -1; align-self: center; text-align: center; padding: 24px 8px; color: var(--ifto-text-2); font-size: 12px; }
.ifto-phone #area .dt-pin { opacity: 1; width: 28px; height: 28px; }
.ifto-phone .mobile-sheet-overlay { position: absolute; inset: 0; z-index: 1000; display: flex; align-items: flex-end; background: #0006; }
.ifto-phone .mobile-sheet { width: 100%; max-height: 85%; overflow-y: auto; padding: 16px 16px max(16px, env(safe-area-inset-bottom)); background: var(--ifto-card-bg); color: var(--g1); box-shadow: 0 -4px 24px #0002; }
.ifto-phone .mobile-sheet h3 { font-size: 15px; margin: 0 0 12px; overflow-wrap: anywhere; }
.ifto-phone .mobile-sheet button { display: block; width: 100%; min-height: 44px; height: auto; border: 0; border-bottom: 1px solid var(--ifto-divider); border-radius: 0; background: transparent; box-shadow: none; color: var(--g1); font-size: 14px; text-align: left; padding: 10px; white-space: normal; overflow-wrap: anywhere; }
.ifto-phone .mobile-sheet input { width: 100%; min-height: 44px; font-size: 16px; margin-bottom: 8px; }
.ifto-phone input:not([type="checkbox"]), .ifto-phone textarea, .ifto-phone select { font-size: 16px; }
.ifto-phone .mobile-sheet .mobile-sheet-danger { color: var(--text-error, #d44); }
.ifto-phone .mobile-sheet .mobile-sheet-cancel { text-align: center; margin-top: 10px; border: 0; background: var(--g6); }
.ifto-phone .ifto-confirm-overlay { z-index: 1100; }
@media (max-width: 350px) {
  .ifto-phone .mobile-panel { padding-right: 10px; padding-left: 10px; }
  .ifto-phone .tabs { gap: 4px 10px; }
  .ifto-phone .section-title-watermark { letter-spacing: -1.5px; }
}

</style>
</head>
<body>
<div class="page">

  <!-- ====== HEADER ====== -->
  <header class="header">
    <nav class="nav">
      <div class="nav-logo"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE1IiBoZWlnaHQ9IjQzIiB2aWV3Qm94PSIwIDAgMTE1IDQzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTE1IDQyLjM2ODRIMFYwSDExNVY0Mi4zNjg0Wk0zLjgzMzMzIDMuODUxNjhWMzguNTE2OEgxMi42NDU1VjMuODUxNjhIMy44MzMzM1pNMTcuMzE1OSAzLjg1MTY4VjM4LjUxNjhIMjYuMzA0OFYyMy4yNjhINDIuODcwNEw0MS4yODQ3IDE4LjQ4MDVIMjYuMzA0OFY4LjU1MDQySDQzLjkyODNMNDIuMzI2MSAzLjg1MTY4SDE3LjMxNTlaTTQ1LjQyNTcgMy44NTE2OEw0Ni45NTAxIDguNDYwOUg1Ni45NzA3VjM4LjUxNjhINjUuODcxMlY4LjQ2MDlINzcuNDEzMUw3NS44NzUzIDMuODUxNjhINDUuNDI1N1pNNzkuNzk1NSAzLjg1MTY4VjE1LjY2ODVMODcuMzY3OCAzOC41MTY4SDExMS4xNjdWMy44NTE2OEg3OS43OTU1WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMTA1LjMyIDE2LjkzOTNWMTcuOTQyNEgxMDcuMTk5VjE4LjY0MTVIMTA0LjU1NVYxNC42MjkySDEwNy4xMzhWMTUuMzIzMkgxMDUuMzJWMTYuMjQwMkgxMDcuMDM3VjE2LjkzOTNIMTA1LjMyWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMTAyLjI5NSAxNy45OTNDMTAyLjUzOCAxNy45OTMgMTAyLjczMSAxNy45MTIgMTAyLjg3MyAxNy43NDk5QzEwMy4wMTUgMTcuNTg0NCAxMDMuMDg1IDE3LjM2MTUgMTAzLjA4NSAxNy4wODExVjE0LjYyOTJIMTAzLjg1NVYxNy4xMTY2QzEwMy44NTUgMTcuNDQ0MiAxMDMuNzkxIDE3LjcyNzkgMTAzLjY2MyAxNy45Njc3QzEwMy41MzggMTguMjA3NSAxMDMuMzU3IDE4LjM5MTYgMTAzLjEyMSAxOC41MTk5QzEwMi44ODggMTguNjQ4MyAxMDIuNjEzIDE4LjcxMjQgMTAyLjI5NSAxOC43MTI0QzEwMS45NzggMTguNzEyNCAxMDEuNzAyIDE4LjY0ODMgMTAxLjQ2OSAxOC41MTk5QzEwMS4yMzYgMTguMzkxNiAxMDEuMDU2IDE4LjIwNzUgMTAwLjkyNyAxNy45Njc3QzEwMC44MDIgMTcuNzI3OSAxMDAuNzQgMTcuNDQ0MiAxMDAuNzQgMTcuMTE2NlYxNC42MjkySDEwMS41MDVWMTcuMDYwOUMxMDEuNTA1IDE3LjM0OCAxMDEuNTc2IDE3LjU3NTkgMTAxLjcxOCAxNy43NDQ4QzEwMS44NTkgMTcuOTEwMyAxMDIuMDUyIDE3Ljk5MyAxMDIuMjk1IDE3Ljk5M1oiIGZpbGw9IiMzMzMzMzMiLz4KPHBhdGggZD0iTTk4LjQ5MTIgMTQuNjI5MlYxNy45NDI0SDEwMC4zNTZWMTguNjQxNUg5Ny43MjYyVjE0LjYyOTJIOTguNDkxMloiIGZpbGw9IiMzMzMzMzMiLz4KPHBhdGggZD0iTTk3LjMyNjMgMTguNjQxNUg5Ni41MTU3TDk2LjE3MTIgMTcuNjQ4NUg5NC43NjI4TDk0LjQxODMgMTguNjQxNUg5My42MDc4TDk1LjA3NjkgMTQuNjI5Mkg5NS44NjIyTDk3LjMyNjMgMTguNjQxNVpNOTUuNDUxOCAxNS42NDc0TDk1LjAxMTEgMTYuOTI5Mkg5NS45MjNMOTUuNDgyMiAxNS42NDc0SDk1LjQ1MThaIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik05MS44MjIyIDE4LjY0MTVMOTAuMzQyOSAxNC42MjkySDkxLjE2MzZMOTIuMTk3MSAxNy41ODc4SDkyLjIyNzVMOTMuMjYxIDE0LjYyOTJIOTQuMDgxN0w5Mi42MDI0IDE4LjY0MTVIOTEuODIyMloiIGZpbGw9IiMzMzMzMzMiLz4KPHBhdGggZD0iTTEwNy4zMDUgMTEuODg2OEgxMDYuMzI3TDEwNSAxMC4xNDkxTDEwNC43MTEgMTAuNDQ4VjExLjg4NjhIMTAzLjk0NlY3Ljg3NDQ3SDEwNC43MTFWOS40NjUyMkwxMDYuMTYgNy44NzQ0N0gxMDcuMjE0TDEwNS41MzIgOS42MDJMMTA3LjMwNSAxMS44ODY4WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMTAwLjc5NyAxMS44ODY4SDEwMC4wMzJWNy44NzQ0N0gxMDAuNzQ3TDEwMi40NDkgMTAuNDUzMUgxMDIuNDc5VjcuODc0NDdIMTAzLjI0NFYxMS44ODY4SDEwMi41NkwxMDAuODI4IDkuMzAzMUgxMDAuNzk3VjExLjg4NjhaIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik05OS4zMzQyIDcuODc0NDdWMTEuODg2OEg5OC41NjkyVjcuODc0NDdIOTkuMzM0MloiIGZpbGw9IiMzMzMzMzMiLz4KPHBhdGggZD0iTTk2LjIxOTkgNy44NzQ0N1YxMS4xODc3SDk4LjA4NDNWMTEuODg2OEg5NS40NTVWNy44NzQ0N0g5Ni4yMTk5WiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K" alt="logo"></div>
      <div class="nav-items">
        <a class="nav-item active" href="#home">HOME\u9996\u9875</a>
        <a class="nav-item" href="#inbox">Inbox\u6536\u96C6</a>
        <a class="nav-item" href="#todo">TOdo\u5F85\u529E</a>
        <a class="nav-item" href="#project">project\u9879\u76EE</a>
        <a class="nav-item" href="#note">note\u9605\u8BFB\u7B14\u8BB0</a>
        <a class="nav-item" href="#review">review\u590D\u76D8</a>
      </div>
    </nav>
  </header>

  <!-- ====== HERO ====== -->
  <section class="hero" id="home">
    <div class="hero-watermark">IFTO</div>
    <div class="hero-brand">INFOTOOLS</div>
    <div class="hero-left">
      <div class="hero-title">
        \u5FEB\u6377\u901A\u9053
        <span class="hero-title-sub">express lane</span>
      </div>
      <div class="shortcuts">
        <button class="btn-s" id="s-collect"><span class="s-icon">+</span><span class="s-label">\u65B0\u5EFA\u6536\u96C6</span></button>
        <button class="btn-s" id="s-todo"><span class="s-icon">+</span><span class="s-label">\u65B0\u5EFA\u5F85\u529E</span></button>
        <button class="btn-s" id="s-task"><span class="s-icon">+</span><span class="s-label">\u65B0\u5EFA\u4EFB\u52A1</span></button>
        <button class="btn-s" id="s-note"><span class="s-icon">+</span><span class="s-label">\u65B0\u5EFA\u7B14\u8BB0</span></button>
      </div>
      <div class="hero-nav-row">
        <div class="hero-nav-area">
          <button class="btn-arrow" id="widgetPrev">&#9664;</button>
          <button class="btn-arrow" id="widgetNext">&#9654;</button>
        </div>
        <div class="hero-divider"></div>
      </div>
      <div class="widget-card" id="widgetCard"></div>
      <div class="widget-indicators" id="widgetDots"></div>
    </div>
    <div class="hero-right">
      <div class="hero-img-placeholder" id="heroImage" style="background-image:url('https://picsum.photos/1200/800');background-size:cover;background-position:center">
        <div class="hero-img-label" id="heroRefreshLabel" style="left:0">\u6362\u4E2A\u5FC3\u60C5</div>
        <div style="position:absolute;bottom:0;left:110px;width:30px;height:70px;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--g1);background:var(--ifto-bg,var(--bg));z-index:6;pointer-events:none">/</div>
        <div class="hero-img-label" id="heroDomainLabel" style="left:140px">Area\u9886\u57DF</div>
        <div class="domain-tree-overlay" id="domainTreeOverlay" style="display:none">
          <div class="domain-tree-inner" id="domainTreeInner"></div>
        </div>
        <div class="dt-zoom-ctrl" id="domainZoomCtrl" style="position:absolute;bottom:35px;right:14px;z-index:20;transform:translateY(50%);display:none">
          <span class="dt-zoom-pct" id="domainZoomPct">100%</span>
          <button class="dt-zoom-btn" id="domainResetBtn" title="\u91CD\u7F6E\u89C6\u89D2">&#x21BA;</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== INBOX \u6536\u96C6 ====== -->
  <section class="section" id="inbox">
    <div class="section-title-wrap">
      <div class="section-title-watermark">INBOX\u6536\u96C6</div>
      <h2 class="section-title">INBOX</h2>
    </div>
    <div class="tabs">
      <span class="tab active" data-tab="collect">\u6536\u96C6\u67E5\u770B</span>
      <span class="tab" data-tab="organize">\u6574\u7406\u6742\u9879</span>
      <span class="tab" data-tab="learn">\u5FEB\u901F\u5B66\u4E60</span>
      <div style="margin-left:auto;display:flex;align-items:center;gap:16px">
        <span class="sort-toggle" id="inboxSortBtn">\u6392\u5E8F\uFF1A\u4ECE\u65B0\u5230\u65E7</span>
        <a class="link-back" href="#home" style="margin-left:0">\u8FD4\u56DE\u9996\u9875 \u2192</a>
      </div>
    </div>
    <div class="card-grid" id="inboxGrid"></div>
    <div class="slide-nav">
      <button class="slide-btn">&#9664;</button>
      <span class="slide-num">01 / 05</span>
      <button class="slide-btn">&#9654;</button>
    </div>
  </section>

  <!-- ====== TODO \u5F85\u529E ====== -->
  <section class="section" id="todo">
    <div class="section-title-wrap">
      <div class="section-title-watermark">TODO\u5F85\u529E</div>
      <h2 class="section-title">TODO</h2>
    </div>
    <div class="todo-layout">
      <div class="todo-panel">
        <div class="tabs" style="margin-bottom:16px">
          <span class="tab active">\u4ECA\u65E5\u5F85\u529E</span><span class="tab-badge" id="todoBadge">0</span>
        </div>
        <div class="todo-list" id="todoList"></div>
      </div>

      <div class="todo-panel">
        <div class="tabs" style="margin-bottom:16px">
          <span class="tab active">\u6D3B\u52A8\u6E05\u5355</span><span class="tab-badge" id="activityBadge">0</span>
          <a class="link-back" href="#home">\u8FD4\u56DE\u9996\u9875 \u2192</a>
        </div>
        <div class="activity-grid" id="activityGrid"></div>
        <p class="todo-hint">\u5361\u7247\u6587\u4EF6\u53EF\u4EE5\u76F8\u4E92\u62D6\u62FD\u79FB\u52A8</p>
      </div>
    </div>
  </section>

  <!-- ====== PROJECT \u9879\u76EE ====== -->
  <section class="section" id="project">
    <div class="section-title-wrap" style="margin-top:80px">
      <div class="section-title-watermark">PROJECT\u9879\u76EE</div>
      <h2 class="section-title">PROJECT</h2>
    </div>
    <div style="margin-bottom:16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <button class="btn-project-new" onclick="createProjectFolder()">+ \u65B0\u5EFA\u9879\u76EE</button>
      <button class="btn-project-new" onclick="createProjectTask()">+ \u65B0\u5EFA\u4EFB\u52A1</button>
      <button class="btn-project-new" onclick="createProjectActivity()">+ \u65B0\u5EFA\u6D3B\u52A8\u6E05\u5355</button>
      <a class="link-back" href="#home" style="margin-left:auto">\u8FD4\u56DE\u9996\u9875 \u2192</a>
    </div>
    <div class="project-cols" id="projectCols"></div>
    <p class="todo-hint">\u53CC\u51FB\u91CD\u547D\u540D\uFF0C\u957F\u6309ctrl/cmd\u70B9\u51FB\u6253\u5F00\u6587\u4EF6</p>
  </section>

  <!-- ====== NOTE \u9605\u8BFB\u7B14\u8BB0 ====== -->
  <section class="section" id="note">
    <div class="section-title-wrap">
      <div class="section-title-watermark">NOTE\u9605\u8BFB\u7B14\u8BB0</div>
      <h2 class="section-title">NOTE</h2>
    </div>
    <div style="margin-bottom:16px;display:flex">
      <a class="link-back" href="#home">\u8FD4\u56DE\u9996\u9875 \u2192</a>
    </div>
    <div class="note-layout">
      <div class="note-sidebar" id="noteSidebar">
        <div class="note-item active" data-tab="reading" id="noteTab0">
          <div class="note-thumb"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
          <div style="font-size:15px;color:var(--g1);font-weight:600">\u6B63\u5728\u9605\u8BFB<br><span style="font-size:12px;color:var(--g4);font-weight:400">\u7EE7\u7EED\u9605\u8BFB\u4E2D\u7684\u4E66\u7C4D</span></div>
        </div>
        <div class="note-item" data-tab="read" id="noteTab1">
          <div class="note-thumb"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div style="font-size:15px;color:var(--g1);font-weight:600">\u5DF2\u8BFB\u4E66\u76EE<br><span style="font-size:12px;color:var(--g4);font-weight:400">\u5DF2\u5B8C\u6210\u9605\u8BFB\u7684\u4E66\u7C4D</span></div>
        </div>
        <div class="note-item" data-tab="paper" id="noteTab2">
          <div class="note-thumb"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
          <div style="font-size:15px;color:var(--g1);font-weight:600">\u5DF2\u8BFB\u6587\u732E<br><span style="font-size:12px;color:var(--g4);font-weight:400">\u5DF2\u9605\u8BFB\u7684\u8BBA\u6587\u6587\u732E</span></div>
        </div>
      </div>
      <div class="note-main">
        <div class="note-grid" id="noteGrid"></div>
      </div>
    </div>
  </section>

  <!-- ====== REVIEW \u590D\u76D8 ====== -->
  <section class="section" id="review">
    <div class="section-title-wrap">
      <div class="section-title-watermark">REVIEW\u590D\u76D8</div>
      <h2 class="section-title">REVIEW</h2>
    </div>
    <div class="tabs">
      <span class="tab active" data-tab="daily">\u65E5\u62A5</span>
      <span class="tab" data-tab="weekly">\u5468\u62A5</span>
      <span class="tab" data-tab="monthly">\u6708\u62A5</span>
      <span class="tab" data-tab="project">\u9879\u76EE\u603B\u7ED3</span>
      <a class="link-back" href="#home">\u8FD4\u56DE\u9996\u9875 \u2192</a>
    </div>
    <div class="card-grid" id="reviewGrid"></div>
    <div class="slide-nav">
      <button class="slide-btn">&#9664;</button>
      <span class="slide-num">01 / 05</span>
      <button class="slide-btn">&#9654;</button>
    </div>
  </section>

  <!-- ====== FOOTER ====== -->
  <footer class="footer">
    <a class="link-back" href="#home" style="margin-left:0">\u8FD4\u56DE\u9996\u9875 \u2192</a>
    <div class="footer-social">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc2IiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMTc2IDMxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNOTkuMTk2IDE2LjkwNUwxMDEuOTcxIDIwLjkyNUgxMDEuNTgxTDk4Ljk4NiAxNy4xNDVMOTYuNDIxIDIwLjkyNUg5Ni4wMzFMOTguODA2IDE2Ljg3NUw5Ni4yNDEgMTMuMTI1SDk2LjYxNkw5OS4wMDEgMTYuNjJMMTAxLjM1NiAxMy4xMjVIMTAxLjczMUw5OS4xOTYgMTYuOTA1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTgxLjYxNDUgMzAuMDY4NUgwVjBIODEuNjE0NVYzMC4wNjg1Wk0yLjcyMDQ4IDIuNzMzNVYyNy4zMzVIOC45NzQ0VjIuNzMzNUgyLjcyMDQ4Wk0xMi4yODg5IDIuNzMzNVYyNy4zMzVIMTguNjY4MlYxNi41MTMxSDMwLjQyNDhMMjkuMjk5NCAxMy4xMTU1SDE4LjY2ODJWNi4wNjgxNkgzMS4xNzU2TDMwLjAzODUgMi43MzM1SDEyLjI4ODlaTTMyLjIzODIgMi43MzM1TDMzLjMyMDEgNi4wMDQ2Mkg0MC40MzE2VjI3LjMzNUg0Ni43NDgyVjYuMDA0NjJINTQuOTM5NEw1My44NDggMi43MzM1SDMyLjIzODJaTTU2LjYzMDEgMi43MzM1VjExLjExOThMNjIuMDA0MSAyNy4zMzVINzguODk0VjIuNzMzNUg1Ni42MzAxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTc0Ljc0NDMgMTIuMDIxOFYxMi43MzM3SDc2LjA3ODJWMTMuMjI5OEg3NC4yMDE0VjEwLjM4MjNINzYuMDM1VjEwLjg3NDlINzQuNzQ0M1YxMS41MjU2SDc1Ljk2MzFWMTIuMDIxOEg3NC43NDQzWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcyLjU5OCAxMi43Njk2QzcyLjc3MDYgMTIuNzY5NiA3Mi45MDcyIDEyLjcxMjEgNzMuMDA3OCAxMi41OTcxQzczLjEwODUgMTIuNDc5NiA3My4xNTg4IDEyLjMyMTQgNzMuMTU4OCAxMi4xMjI1VjEwLjM4MjNINzMuNzA1M1YxMi4xNDc2QzczLjcwNTMgMTIuMzgwMSA3My42NTk4IDEyLjU4MTUgNzMuNTY4NyAxMi43NTE3QzczLjQ4IDEyLjkyMTggNzMuMzUxOCAxMy4wNTI1IDczLjE4NCAxMy4xNDM2QzczLjAxODYgMTMuMjM0NiA3Mi44MjMzIDEzLjI4MDIgNzIuNTk4IDEzLjI4MDJDNzIuMzcyNyAxMy4yODAyIDcyLjE3NzMgMTMuMjM0NiA3Mi4wMTE5IDEzLjE0MzZDNzEuODQ2NSAxMy4wNTI1IDcxLjcxODMgMTIuOTIxOCA3MS42MjcyIDEyLjc1MTdDNzEuNTM4NSAxMi41ODE1IDcxLjQ5NDIgMTIuMzgwMSA3MS40OTQyIDEyLjE0NzZWMTAuMzgyM0g3Mi4wMzcxVjEyLjEwODFDNzIuMDM3MSAxMi4zMTE4IDcyLjA4NzQgMTIuNDczNiA3Mi4xODgxIDEyLjU5MzVDNzIuMjg4OCAxMi43MTA5IDcyLjQyNTQgMTIuNzY5NiA3Mi41OTggMTIuNzY5NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik02OS44OTgzIDEwLjM4MjNWMTIuNzMzN0g3MS4yMjE0VjEzLjIyOThINjkuMzU1NFYxMC4zODIzSDY5Ljg5ODNaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNjkuMDcxNiAxMy4yMjk4SDY4LjQ5NjNMNjguMjUxOSAxMi41MjUySDY3LjI1MjRMNjcuMDA3OSAxMy4yMjk4SDY2LjQzMjZMNjcuNDc1MyAxMC4zODIzSDY4LjAzMjVMNjkuMDcxNiAxMy4yMjk4Wk02Ny43NDEzIDExLjEwNUw2Ny40Mjg1IDEyLjAxNDZINjguMDc1N0w2Ny43NjI5IDExLjEwNUg2Ny43NDEzWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTY1LjE2NTQgMTMuMjI5OEw2NC4xMTU1IDEwLjM4MjNINjQuNjk4TDY1LjQzMTQgMTIuNDgySDY1LjQ1M0w2Ni4xODY1IDEwLjM4MjNINjYuNzY4OUw2NS43MTkxIDEzLjIyOThINjUuMTY1NFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03Ni4xNTMyIDguNDM1OUg3NS40NTkzTDc0LjUxNzQgNy4yMDI2OUw3NC4zMTI0IDcuNDE0ODJWOC40MzU5SDczLjc2OTVWNS41ODgzOEg3NC4zMTI0VjYuNzE3MzJMNzUuMzQwNyA1LjU4ODM4SDc2LjA4ODVMNzQuODk0OSA2LjgxNDM5TDc2LjE1MzIgOC40MzU5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcxLjUzNTEgOC40MzU5SDcwLjk5MjJWNS41ODgzOEg3MS40OTkxTDcyLjcwNzIgNy40MTg0MUg3Mi43Mjg3VjUuNTg4MzhINzMuMjcxNlY4LjQzNTlINzIuNzg2M0w3MS41NTY3IDYuNjAyMjdINzEuNTM1MVY4LjQzNTlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNzAuNDk2NiA1LjU4ODM4VjguNDM1OUg2OS45NTM3VjUuNTg4MzhINzAuNDk2NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik02OC4yODY0IDUuNTg4MzhWNy45Mzk3NEg2OS42MDk1VjguNDM1OUg2Ny43NDM1VjUuNTg4MzhINjguMjg2NFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzcuNDg0IDAuMTk2NjYzQzEzOC40NTkgLTAuMTI1OTkgMTM5LjQxIC0wLjAyNjI5OTIgMTQwLjM1NyAwLjMxODQ1QzE0MS41MDQgMC43MzYwMTMgMTQyLjE5OSAxLjg1ODE2IDE0Mi41NjYgMy4yMzcxM0MxNDIuOTM4IDQuNjMzMDUgMTQzLjAxNyA2LjQyNjk5IDE0Mi44MjkgOC40NDAwN0MxNDIuNzk4IDguNzY3ODcgMTQyLjUwOCA5LjAwODg2IDE0Mi4xOCA4Ljk3ODMzQzE0MS44NTIgOC45NDc3OCAxNDEuNjExIDguNjU3MjcgMTQxLjY0MiA4LjMyOTQ2QzE0MS44MjIgNi4zOTQ3NyAxNDEuNzM3IDQuNzU0NyAxNDEuNDE0IDMuNTQ0MDRDMTQxLjA4NyAyLjMxNjQ2IDE0MC41NTYgMS42NTk0OSAxMzkuOTUgMS40Mzg3NUMxMzkuMTgzIDEuMTU5NjEgMTM4LjUxNSAxLjExMTI5IDEzNy44NTggMS4zMjg0OUMxMzcuMTg4IDEuNTUwNCAxMzYuNDUzIDIuMDc0NDggMTM1LjYxMSAzLjA4OTk2QzEzNS4wMzEgMy43OTA2OSAxMzQuNTUgNC41NzM5IDEzNC4xNTMgNS40MDc5OEMxMzMuNTU5IDYuNjU3MTIgMTMyLjU5NCA4LjY5Njc3IDEzMi40MzEgOS4wOTQ1M0wxMzIuNDI5IDkuMDk5NDJMMTI2LjUwNyAyMy4xODE2QzEyNS44NDQgMjQuNzkzNSAxMjQuOTE3IDI2LjI5NjcgMTIzLjcyMSAyNy41ODJDMTIyLjk1NCAyOC40MDYzIDEyMi4xNjYgMjkuMDUxMyAxMjEuMzggMjkuNDI5N0MxMjAuNTg2IDI5LjgxMTQgMTE5Ljc1NCAyOS45Mzc2IDExOC45NTkgMjkuNjQ3OEMxMTguMDIyIDI5LjMwNjUgMTE3LjM4NSAyOC40OTA4IDExNi45ODggMjcuNDY0QzExNi41ODkgMjYuNDM1NiAxMTYuMzk5IDI1LjEyNDUgMTE2LjM5IDIzLjY0MTZDMTE2LjM3MiAyMC42NzA4IDExNy4wODMgMTYuODc2OCAxMTguNTA2IDEyLjk0OTNMMTE4LjYzIDEyLjYxMTNDMTE5LjI1NyAxMC45Mjg0IDExOS45NjYgOS4zNTYwMiAxMjAuNzIzIDcuOTM2MDRDMTIwLjg3NyA3LjY0NTQ4IDEyMS4yMzkgNy41MzU0NiAxMjEuNTI5IDcuNjkwMjZDMTIxLjgyIDcuODQ1MDcgMTIxLjkzIDguMjA2MSAxMjEuNzc1IDguNDk2NjVDMTIwLjk5NiA5Ljk1OTUzIDEyMC4yNjUgMTEuNTk1OSAxMTkuNjI3IDEzLjM1NTVDMTE4LjIzOSAxNy4xODU3IDExNy41NjUgMjAuODM3OCAxMTcuNTgyIDIzLjYzNDRDMTE3LjU5IDI1LjAzNTEgMTE3Ljc3MiAyNi4xODgyIDExOC4wOTkgMjcuMDMzMkMxMTguNDI3IDI3Ljg4IDExOC44NzEgMjguMzQ3MiAxMTkuMzY3IDI4LjUyNzZDMTE5Ljc3NyAyOC42NzcgMTIwLjI2NyAyOC42NDIgMTIwLjg2MyAyOC4zNTUzQzEyMS40NjYgMjguMDY1MyAxMjIuMTM3IDI3LjUzNDcgMTIyLjg0OCAyNi43Njk5QzEyMy45MzkgMjUuNTk3OSAxMjQuNzkyIDI0LjIxNzcgMTI1LjQwNiAyMi43MjRMMTI1LjQwNyAyMi43MjE3TDEyNS40MDggMjIuNzE5NEwxMzEuMzMgOC42MzczQzEzMS41MTQgOC4xODk3MSAxMzIuNDk2IDYuMTE1NjIgMTMzLjA3NiA0Ljg5NTkyQzEzMy41MDkgMy45ODU1NCAxMzQuMDQyIDMuMTE2NDkgMTM0LjY5MyAyLjMyOTc5QzEzNS42MTQgMS4yMTgyNyAxMzYuNTIzIDAuNTE0NjI1IDEzNy40ODQgMC4xOTY2NjNaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTcwLjU1OSAwLjE5NjE3NUMxNzEuNTM0IC0wLjEyNjQ3OCAxNzIuNDg1IC0wLjAyNjc4NzUgMTczLjQzMiAwLjMxNzk2MUwxNzMuNDMyIDAuMzE3ODQ1QzE3NC41OCAwLjczNTQwOSAxNzUuMjc0IDEuODU3NjcgMTc1LjY0MSAzLjIzNjY0QzE3Ni4wMTMgNC42MzI1NiAxNzYuMDkyIDYuNDI2NSAxNzUuOTA0IDguNDM5NThDMTc1Ljg3MyA4Ljc2NzM4IDE3NS41ODMgOS4wMDgzNyAxNzUuMjU1IDguOTc3ODRDMTc0LjkyNyA4Ljk0NzI5IDE3NC42ODYgOC42NTY3OCAxNzQuNzE3IDguMzI4OTdDMTc0Ljg5NyA2LjM5NDI5IDE3NC44MTIgNC43NTQyMSAxNzQuNDg5IDMuNTQzNTZDMTc0LjE2MiAyLjMxNTk3IDE3My42MzEgMS42NTkgMTczLjAyNSAxLjQzODI2SDE3My4wMjRDMTcyLjI1OCAxLjE1OTEyIDE3MS41OSAxLjExMDggMTcwLjkzMyAxLjMyOEMxNzAuMjYzIDEuNTQ5OTIgMTY5LjUyOCAyLjA3NCAxNjguNjg3IDMuMDg5NDhMMTY4LjY4NyAzLjA4OTU5QzE2OC4xMDcgMy43OTAzMiAxNjcuNjI1IDQuNTczNDEgMTY3LjIyOCA1LjQwNzQ5VjUuNDA3NjFDMTY2LjYzNCA2LjY1Njc1IDE2NS42NjkgOC42OTYyOCAxNjUuNTA2IDkuMDk0MDRMMTY1LjUwNCA5LjA5ODkzTDE1OS41ODIgMjMuMTgxMUwxNTkuNTgyIDIzLjE4MUMxNTguOTE5IDI0Ljc5MjkgMTU3Ljk5MiAyNi4yOTYzIDE1Ni43OTYgMjcuNTgxNUMxNTYuMDI5IDI4LjQwNTggMTU1LjI0MiAyOS4wNTA4IDE1NC40NTUgMjkuNDI5MkMxNTMuNjYxIDI5LjgxMSAxNTIuODI5IDI5LjkzNzIgMTUyLjAzNCAyOS42NDczVjI5LjY0NzRDMTUxLjA5NyAyOS4zMDYyIDE1MC40NiAyOC40OTAzIDE1MC4wNjMgMjcuNDYzNUMxNDkuNjY0IDI2LjQzNTEgMTQ5LjQ3NCAyNS4xMjQgMTQ5LjQ2NSAyMy42NDExQzE0OS40NDcgMjAuNjcwMyAxNTAuMTU4IDE2Ljg3NjMgMTUxLjU4MSAxMi45NDg4TDE1MS43MDUgMTIuNjEwOEMxNTIuMzMyIDEwLjkyNzkgMTUzLjA0MSA5LjM1NTUzIDE1My43OTggNy45MzU1NUMxNTMuOTUzIDcuNjQ0OTkgMTU0LjMxNCA3LjUzNDk3IDE1NC42MDQgNy42ODk3N0MxNTQuODk1IDcuODQ0NTggMTU1LjAwNSA4LjIwNTYxIDE1NC44NSA4LjQ5NjE3QzE1NC4wNzEgOS45NTkwNCAxNTMuMzQgMTEuNTk1NCAxNTIuNzAyIDEzLjM1NUwxNTIuNzAyIDEzLjM1NTJDMTUxLjMxNCAxNy4xODUzIDE1MC42NCAyMC44MzczIDE1MC42NTcgMjMuNjMzOUMxNTAuNjY1IDI1LjAzNDcgMTUwLjg0NyAyNi4xODc3IDE1MS4xNzQgMjcuMDMyN0MxNTEuNTAyIDI3Ljg3OTUgMTUxLjk0NiAyOC4zNDY3IDE1Mi40NDIgMjguNTI3MUMxNTIuODUyIDI4LjY3NjUgMTUzLjM0MiAyOC42NDE1IDE1My45MzggMjguMzU0OEMxNTQuNTQxIDI4LjA2NDggMTU1LjIxMiAyNy41MzQyIDE1NS45MjMgMjYuNzY5NEMxNTcuMDE0IDI1LjU5NzQgMTU3Ljg2NyAyNC4yMTcyIDE1OC40ODEgMjIuNzIzNUwxNTguNDgyIDIyLjcyMTJMMTU4LjQ4MyAyMi43MTg5TDE2NC40MDUgOC42MzY4MUMxNjQuNTg5IDguMTg5MjIgMTY1LjU3MSA2LjExNTEzIDE2Ni4xNTEgNC44OTU0M0MxNjYuNTg0IDMuOTg1MDUgMTY3LjExNyAzLjExNiAxNjcuNzY4IDIuMzI5M0wxNjcuNzY4IDIuMzI5MThDMTY4LjY4OSAxLjIxNzY3IDE2OS41OTggMC41MTQxMzcgMTcwLjU1OSAwLjE5NjE3NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzkuNjkgMTYuNjFDMTM5LjgwMiAxNi4zMDA1IDE0MC4xNDQgMTYuMTQwNCAxNDAuNDU0IDE2LjI1MjZDMTQwLjc2MyAxNi4zNjQ4IDE0MC45MjMgMTYuNzA2OCAxNDAuODExIDE3LjAxNjNDMTM5LjM4NyAyMC45NDM4IDEzNy41MDMgMjQuMzEwNyAxMzUuNTg2IDI2LjU3NzVDMTM0LjYzIDI3LjcwOSAxMzMuNjQ0IDI4LjU5MjEgMTMyLjY3OSAyOS4xMjQ2QzEzMS43MTYgMjkuNjU2MyAxMzAuNzA1IDI5Ljg3MjggMTI5Ljc2OCAyOS41MzE0QzEyOC45NCAyOS4yMyAxMjguMzQ2IDI4LjU1NjcgMTI3Ljk0NiAyNy42OTg0QzEyNy41NDcgMjYuODQyOCAxMjcuMzE4IDI1Ljc1OTEgMTI3LjIzNSAyNC41MzIyQzEyNy4yMTMgMjQuMjAzOCAxMjcuNDYxIDIzLjkxOTMgMTI3Ljc4OSAyMy44OTdDMTI4LjExOCAyMy44NzQ2IDEyOC40MDIgMjQuMTIyOCAxMjguNDI0IDI0LjQ1MTNDMTI4LjUwMiAyNS41OTIzIDEyOC43MTEgMjYuNTE3OCAxMjkuMDI3IDI3LjE5NDdDMTI5LjM0MSAyNy44Njg5IDEyOS43MzcgMjguMjUxMyAxMzAuMTc2IDI4LjQxMTFDMTMwLjY3MSAyOC41OTE0IDEzMS4zMSAyOC41MTg3IDEzMi4xMDMgMjguMDgwOEMxMzIuODk1IDI3LjY0MzYgMTMzLjc3MiAyNi44NzY0IDEzNC42NzYgMjUuODA3N0MxMzYuNDggMjMuNjc0MSAxMzguMzAyIDIwLjQ0MDMgMTM5LjY5IDE2LjYxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEzOC42NzYgMTkuMjg0QzEzOC43MzEgMTguOTU5NCAxMzkuMDM5IDE4Ljc0MTMgMTM5LjM2NCAxOC43OTY3QzEzOS42ODggMTguODUyMSAxMzkuOTA2IDE5LjE2MDIgMTM5Ljg1MSAxOS40ODQ3QzEzOS40MzIgMjEuOTM0MiAxMzkuMzggMjQuMDcwMSAxMzkuNjY1IDI1LjY1OTlDMTM5Ljk0NyAyNy4yMzY3IDE0MC41MjIgMjguMDk3NiAxNDEuMjA1IDI4LjM4NTVMMTQxLjI3MiAyOC40MTE1QzE0MS44NzkgMjguNjMyNyAxNDIuNjc4IDI4LjQ2OTIgMTQzLjY3MyAyNy43MzI3QzE0NC42NTcgMjcuMDAzOSAxNDUuNzI1IDI1Ljc4NzUgMTQ2Ljc4NCAyNC4xNjYzQzE0Ni45NjQgMjMuODkwNiAxNDcuMzMzIDIzLjgxMzEgMTQ3LjYwOSAyMy45OTMxQzE0Ny44ODQgMjQuMTczMiAxNDcuOTYyIDI0LjU0MjUgMTQ3Ljc4MiAyNC44MTgyQzE0Ni42ODMgMjYuNTAwOSAxNDUuNTI1IDI3Ljg0NTQgMTQ0LjM4MiAyOC42OTExQzE0My4yNSAyOS41MjkgMTQyLjAyMSAyOS45NTM0IDE0MC44NjMgMjkuNTMxOVYyOS41MzE3QzEzOS41MjYgMjkuMDQ0NSAxMzguODAyIDI3LjYwNDggMTM4LjQ5MSAyNS44N0MxMzguMTc0IDI0LjA5NzIgMTM4LjI0NCAyMS44MTI1IDEzOC42NzYgMTkuMjg0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE1MC40NDIgMTYuNjEwNEMxNTAuNTU1IDE2LjMwMDggMTUwLjg5NyAxNi4xNDA5IDE1MS4yMDYgMTYuMjUzMUMxNTEuNTE2IDE2LjM2NTQgMTUxLjY3NiAxNi43MDcyIDE1MS41NjMgMTcuMDE2N0MxNTAuNDcxIDIwLjAzMDcgMTQ5LjE1OCAyMi43MTI0IDE0Ny43ODMgMjQuODE4MkMxNDcuNjAzIDI1LjA5MzggMTQ3LjIzMyAyNS4xNzEzIDE0Ni45NTggMjQuOTkxMkMxNDYuNjgyIDI0LjgxMTIgMTQ2LjYwNSAyNC40NDE3IDE0Ni43ODUgMjQuMTY2MUMxNDguMTAxIDIyLjE1MTIgMTQ5LjM3NSAxOS41NTUzIDE1MC40NDIgMTYuNjEwNFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNzUuMzE2IDcuNzg4MTFDMTc1LjY0NiA3Ljc5MDg5IDE3NS45MSA4LjA2MDA0IDE3NS45MDcgOC4zODkyNUwxNzUuMzExIDguMzg0MjVMMTc1LjkwNyA4LjM4OTg0QzE3NS45MDcgOC4zODk5NSAxNzUuOTA3IDguMzkwMiAxNzUuOTA3IDguMzkwNDJWOC4zOTY4MkMxNzUuOTA3IDguNDAwNTUgMTc1LjkwNyA4LjQwNTU2IDE3NS45MDcgOC40MTE3M0MxNzUuOTA3IDguNDI0MDYgMTc1LjkwNiA4LjQ0MTIzIDE3NS45MDYgOC40NjMxOUMxNzUuOTA0IDguNTA3MjEgMTc1LjkwMSA4LjU3MDU0IDE3NS44OTYgOC42NTI2M0MxNzUuODg2IDguODE2OCAxNzUuODY3IDkuMDU2MjYgMTc1LjgzMSA5LjM2Nzc2QzE3NS43NTggOS45OTA4NSAxNzUuNjE3IDEwLjkwMiAxNzUuMzQzIDEyLjA3NTFDMTc0Ljc5NCAxNC40MjE2IDE3My43MTEgMTcuODEzOCAxNzEuNTc4IDIyLjA0MzhDMTcxLjQzIDIyLjMzNzcgMTcxLjA3MiAyMi40NTU4IDE3MC43NzggMjIuMzA3NkMxNzAuNDg0IDIyLjE1OTQgMTcwLjM2NiAyMS44MDEgMTcwLjUxNCAyMS41MDdDMTcyLjYwNCAxNy4zNjIgMTczLjY1NCAxNC4wNTg2IDE3NC4xODIgMTEuODAzM0MxNzQuNDQ2IDEwLjY3NTUgMTc0LjU3OSA5LjgwOTE3IDE3NC42NDcgOS4yMzAwMkMxNzQuNjggOC45NDA0NiAxNzQuNjk3IDguNzIyNTkgMTc0LjcwNiA4LjU3OTc0QzE3NC43MTEgOC41MDgzMSAxNzQuNzEzIDguNDU1NTIgMTc0LjcxNCA4LjQyMTk3QzE3NC43MTUgOC40MDUyMyAxNzQuNzE1IDguMzkzMjUgMTc0LjcxNSA4LjM4NjExQzE3NC43MTUgOC4zODI1NCAxNzQuNzE1IDguMzgwMTYgMTc0LjcxNSA4LjM3OTAxQzE3NC43MTUgOC4zNzg0NyAxNzQuNzE1IDguMzc4MTkgMTc0LjcxNSA4LjM3ODE5QzE3NC43MTkgOC4wNDk0NCAxNzQuOTg3IDcuNzg1MzMgMTc1LjMxNiA3Ljc4ODExWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" alt="footer social">
    </div>
    <div class="footer-divider"></div>
    <p class="footer-copy">\xA9 2026 IFTO&IFUS Provide</p>
  </footer>

</div>


</body>
</html>
`;
var __IFTO_HOME_JS = `// inboxCards is also used by reviewGrid section below
window.__IFTO_MOBILE_ACTIVE = !!document.querySelector('.ifto-container.ifto-phone');
var inboxCards = [
  {add:true,title:'\u65B0\u5EFA\u6536\u96C6'},
  ...Array(9).fill().map(()=>({title:'\u6536\u96C6\u6587\u4EF6',date:'date\uFF1AYYYYMMDD'}))
];

// ============================================================
// IFTO Input Focus Guard \u2014 fixes intermittent "click input, no cursor"
// ============================================================
// Problem: IFTO-HOME runs inside an Obsidian ItemView. Obsidian's workspace
// fires events (vault change, leaf focus, metadata cache, etc.) that can yank
// focus back to whatever it considers the "active" element, intermittently
// stealing focus from our <input>s. This affects every input in the plugin
// (habit name, inline rename, etc.) \u2014 symptom is "click/double-click, input
// appears but no caret, can't type until alt-tab away and back".
//
// Fix: install ONE document-level guard that on mousedown into an IFTO input,
// force-focuses it across a 400ms window (microtask, 30ms, 100ms, 250ms).
// This wins the race against whatever else is grabbing focus during the
// click event tick (e.g. vault.on('create') triggering a re-render). After
// the window closes the input is on its own \u2014 user Enter/Esc/blur work
// normally without interference.
(function installIftoFocusGuard(){
  if(window.__IFTO_FOCUS_GUARD_INSTALLED) return;
  window.__IFTO_FOCUS_GUARD_INSTALLED = true;
  function isIftoEditable(el){
    if(!el) return false;
    var tag = el.tagName;
    if(tag !== 'INPUT' && tag !== 'TEXTAREA') return false;
    if(tag === 'INPUT' && el.type && !['text','search','url','email','tel',''].includes(el.type)) return false;
    return !!el.closest('.ifto-container, .widget-card, [id="widgetBody"]');
  }
  function pinFocus(el){
    if(!document.contains(el)) return;
    if(document.activeElement === el) return;
    try { el.focus({preventScroll:true}); } catch(_) {}
  }
  document.addEventListener('mousedown', function(e){
    var el = e.target.closest && e.target.closest('input, textarea');
    if(!el || !isIftoEditable(el)) return;
    setTimeout(function(){ pinFocus(el); }, 0);
    setTimeout(function(){ pinFocus(el); }, 30);
    setTimeout(function(){ pinFocus(el); }, 100);
    setTimeout(function(){ pinFocus(el); }, 250);
  }, true);

  // ====== Last-focused input tracking + focus restore ======
  // Tracks the most recent IFTO editable element that had focus, so that when
  // the user comes back to this tab (Obsidian tab switch) or the whole app
  // window regains OS focus (Alt-Tab back), we can put the caret back
  // automatically. This is the renderer-process equivalent of "blur/focus the
  // window" \u2014 it fixes the focus-loss-without-caret problem without needing
  // Electron main-process access (which Obsidian plugins don't have).
  var lastIftoEditable = null;
  document.addEventListener('focusin', function(e){
    if(e.target && isIftoEditable(e.target)) lastIftoEditable = e.target;
  }, true);

  function restoreFocus(){
    // Do not reopen the phone keyboard when returning from a note or menu.
    if(window.__IFTO_MOBILE_ACTIVE) return;
    var target = (lastIftoEditable && document.body.contains(lastIftoEditable)) ? lastIftoEditable : null;
    var doFocus = function(){
      if(target && document.body.contains(target)){
        try { target.focus({preventScroll:true}); } catch(_) {}
        if(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement){
          var len = target.value.length;
          try { target.setSelectionRange(0, len); } catch(_) { try { target.select(); } catch(_){} }
        }
      } else {
        var cont = document.querySelector('.ifto-container');
        if(cont){ try { cont.focus({preventScroll:true}); } catch(_) {} }
      }
    };
    doFocus();
    if(typeof requestAnimationFrame === 'function') requestAnimationFrame(doFocus);
    setTimeout(doFocus, 30);
    setTimeout(doFocus, 100);
    setTimeout(doFocus, 250);
  }
  window.__IFTO_restoreFocus = restoreFocus;

  // When the Obsidian window regains OS focus (e.g. Alt-Tab back to Obsidian)
  // and the IFTO-HOME leaf is the active one, restore the caret into the last
  // focused input \u2014 replicating the manual "click away and back" workaround.
  window.addEventListener('focus', function(){
    try {
      if(window.__IFTO_leafActive && window.__IFTO_leafActive()){
        setTimeout(restoreFocus, 0);
        setTimeout(restoreFocus, 60);
      }
    } catch(_) {}
  });
})();
// ============================================================


// Todo & Activity folder paths \u2014 read from settings
function _getFolder(key, fallback) {
  var s = window.__IFTO_SETTINGS || {};
  return s[key] || fallback;
}
// IMPORTANT: these three used to be \`var TODO_FOLDER = _getFolder(...)\` \u2014 i.e.
// resolved once at script-load time and frozen. That meant changing the path
// in settings (todoFolder / activityFolder / taskFolder) did NOT take effect
// until the user reloaded Obsidian, and even then only if main.ts had
// re-pushed __IFTO_SETTINGS. Defining them as getters on the global makes
// every reference (\`TODO_FOLDER\`, \`ACTIVITY_FOLDER\`, \`TASK_FOLDER\`) re-read
// __IFTO_SETTINGS at the moment of use, matching how getInboxFolder() etc.
// already work for the other folder fields.
Object.defineProperty(globalThis, 'TODO_FOLDER', {
  get: function() { return _getFolder('todoFolder', '000-\u4FE1\u7BB1INBOX/031-\u4ECA\u65E5\u5F85\u529E'); },
  configurable: true
});
Object.defineProperty(globalThis, 'ACTIVITY_FOLDER', {
  get: function() { return _getFolder('activityFolder', '000-\u4FE1\u7BB1INBOX/030-\u6D3B\u52A8\u6E05\u5355'); },
  configurable: true
});
Object.defineProperty(globalThis, 'TASK_FOLDER', {
  get: function() { return _getFolder('taskFolder', '100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406'); },
  configurable: true
});
var _organizeResourceExpanded = [];
var _organizeProjectExpanded = [];
function getInboxFolder() { return _getFolder('inboxFolder', '000-\u4FE1\u7BB1INBOX/010-\u6536\u96C6'); }
function getQuickLearnFolder() { return _getFolder('quickLearnFolder', '100-\u5DE5\u4F5C\u53F0WORKDESK/101-\u5FEB\u901F\u5B66\u4E60'); }
function getProjectBase() { return _getFolder('projectBase', '100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406'); }
function getProjectCols() { return (_getFolder('projectCols', '\u672A\u5F00\u59CB,\u63A8\u8FDB\u4E2D,\u5DF2\u5B8C\u6210')).split(',').map(function(s){return s.trim();}).filter(function(s){return s;}); }
function getDraftFolder() { return _getFolder('draftFolder', '100-\u5DE5\u4F5C\u53F0WORKDESK/110-\u8349\u7A3F\u7BB1'); }
function _isDraftPath(path) {
  if (!path) return false;
  return path.indexOf(getDraftFolder()) === 0;
}

// ====== Project Middle Column (\u63A8\u8FDB\u4E2D) View Toggle ======
// 'progress' = show \u63A8\u8FDB\u4E2D kanban column (default)
// 'draft'    = show \u8349\u7A3F\u7BB1 (drafts) folder contents
var projectMiddleView = 'progress';
function switchProjectMiddleView(view) {
  if(view !== 'progress' && view !== 'draft') return;
  projectMiddleView = view;
  renderProject();
}
function getBookFolder() { return _getFolder('bookFolder', '400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/421-\u4E66\u7C4D'); }
function getPaperFolder() { return _getFolder('paperFolder', '400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/422-\u8BBA\u6587'); }
function getResourceRoot() { return _getFolder('resourceRoot', '400-\u8D44\u6E90RESOURCE'); }
function getNoteFolder() { return _getFolder('notePath', '000-\u4FE1\u7BB1INBOX/040-\u7B14\u8BB0'); }

// ====== Inbox Tab State ======
var inboxTab = 'collect';
var inboxPage = 1;
var inboxPerPage = 17;
var inboxSortDesc = true; // true=\u4ECE\u65B0\u5230\u65E7, false=\u4ECE\u65E7\u5230\u65B0

function switchInboxTab(tab) {
  inboxTab = tab;
  inboxPage = 1;
  document.querySelectorAll('#inbox .tab').forEach(function(t){ t.classList.remove('active'); });
  var te = document.querySelector('#inbox .tab[data-tab="'+tab+'"]');
  if(te) te.classList.add('active');
  renderInbox();
}

async function renderInbox() {
  try {
    var grid = document.getElementById('inboxGrid');
    if(!grid) return;
    if(inboxTab === 'collect') await renderInboxCollect(grid);
    else if(inboxTab === 'organize') await renderInboxOrganize(grid);
    else if(inboxTab === 'learn') await renderInboxLearn(grid);
  } catch(e) { console.error('IFTO: renderInbox error', e); }
}

function fmtDate(ts){if(!ts)return'';var d=new Date(ts);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function tagColor(tag){var colors=['#e74c3c','#e67e22','#3498db','#2ecc71','#9b59b6','#1abc9c','#e84393','#00b894','#6c5ce7','#fd79a8','#0984e3','#00cec9'];var h=0;for(var i=0;i<tag.length;i++)h=((h<<5)-h)+tag.charCodeAt(i);return colors[Math.abs(h)%colors.length]}
function hexRgb(h){return parseInt(h.slice(1,3),16)+','+parseInt(h.slice(3,5),16)+','+parseInt(h.slice(5,7),16)}
function fmtTags(tags){if(!tags||!tags.length)return'';return tags.map(function(t){var c=tagColor(t),rgb=hexRgb(c);return'<span class="card-tag" style="background:rgba('+rgb+',0.12);color:'+c+';border:1px solid rgba('+rgb+',0.25)">'+t+'</span>'}).join(' ')}

async function renderInboxCollect(grid) {
  var all = (typeof window.__IFTO_getFilesDetail === 'function')
    ? await window.__IFTO_getFilesDetail(getInboxFolder(), 0, 999)
    : {files: [], total: 0};
  var totalFiles = all.total;
  var allDetails = all.files || [];
  // Filter out hidden files (starting with .)
  allDetails = allDetails.filter(function(f){ return f.name && f.name[0] !== '.'; });
  if(window.__IFTO_MOBILE_ACTIVE) totalFiles = allDetails.length;

  // Sort by creation time
  allDetails.sort(function(a, b) {
    var tA = a.ctime || 0;
    var tB = b.ctime || 0;
    return inboxSortDesc ? tB - tA : tA - tB;
  });

  // Page 1: add button + items (4 rows). Other pages: items only (4 rows)
  var gridWidth = grid.clientWidth - 48; // subtract padding (24px each side)
  var itemsPerRow = window.__IFTO_MOBILE_ACTIVE ? 2 : Math.max(1, Math.floor((gridWidth + 10) / 210)); // phones always use two columns, including hidden panels
  var rowsPerPage = 4;
  var itemsPerPage = itemsPerRow * rowsPerPage;
  var page1Slots = itemsPerPage - (window.__IFTO_MOBILE_ACTIVE ? 0 : 1); // phone creation lives in the shared dock
  var otherSlots = itemsPerPage;
  var totalPages = 1;
  if(totalFiles > page1Slots) totalPages = 1 + Math.ceil((totalFiles - page1Slots) / otherSlots);
  if(inboxPage > totalPages) inboxPage = totalPages;

  var start, count;
  if(inboxPage === 1) { start = 0; count = Math.min(allDetails.length, page1Slots); }
  else { start = page1Slots + (inboxPage - 2) * otherSlots; count = Math.min(allDetails.length - start, otherSlots); }
  var pf = allDetails.slice(start, start + count);

  var html = '';
  if(inboxPage === 1 && !window.__IFTO_MOBILE_ACTIVE) {
    html += '<div class="card card-add" id="collect-add-btn"><span class="ci">+</span><span class="cl">\u65B0\u5EFA\u6536\u96C6</span></div>';
  }
  for(var i=0;i<pf.length;i++) {
    var d = pf[i];
    var nm = d.name.replace(/\\.md$/i, '');
    html += '<div class="card card-detail" data-path="'+getInboxFolder()+'/'+d.name+'">'+
      '<span class="card-title">'+nm+'</span>'+
      '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
      (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
    '</div>';
  }

  grid.className = 'card-grid';
  grid.innerHTML = html;

  // Wire add button
  var ab = document.getElementById('collect-add-btn');
  var ct = grid.closest('.ifto-container');
  if(ab && ct && ct.__createNote) {
    ab.onclick = function(){ ct.__createNote(); };
  }

  // Wire file cards
  var cards = grid.querySelectorAll('.card[data-path]');
  for(var j=0;j<cards.length;j++) {
    (function(card){
      card.onclick = function(){
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      };
    })(cards[j]);
  }

  updateInboxNav(totalPages);
}

async function renderInboxOrganize(grid) {
  var all = (typeof window.__IFTO_getFilesDetail === 'function')
    ? await window.__IFTO_getFilesDetail(getInboxFolder(), 0, 999)
    : {files: [], total: 0};
  var allDetails = all.files || [];
  // Filter out hidden files (starting with .)
  allDetails = allDetails.filter(function(f){ return f.name && f.name[0] !== '.'; });

  // Sort by creation time
  allDetails.sort(function(a, b) {
    var tA = a.ctime || 0;
    var tB = b.ctime || 0;
    return inboxSortDesc ? tB - tA : tA - tB;
  });

  // 4 rows per page, calculated from grid width (estimate card area = total - sidebar 180px - gap 16px)
  var ogW = grid.clientWidth - 48 - 180 - 16;
  var itemsPerRow = window.__IFTO_MOBILE_ACTIVE ? 2 : Math.max(1, Math.floor((ogW + 10) / 210));
  var itemsPerPage = itemsPerRow * 4;
  var totalPages = Math.ceil(allDetails.length / itemsPerPage) || 1;
  if(inboxPage > totalPages) inboxPage = totalPages;
  var start = (inboxPage - 1) * itemsPerPage;
  var pf = allDetails.slice(start, start + itemsPerPage);

  // Build card grid HTML
  var cardHtml = '';
  for(var i=0;i<pf.length;i++) {
    var d = pf[i];
    var nm = d.name.replace(/\\.md$/i, '');
    cardHtml += '<div class="card card-detail" draggable="true" data-path="'+getInboxFolder()+'/'+d.name+'">'+
      '<span class="card-title">'+nm+'</span>'+
      '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
      (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
    '</div>';
  }

  // Build sidebar: 400-\u8D44\u6E90RESOURCE directory, \u5FEB\u901F\u5B66\u4E60, \u4ECA\u65E5\u5F85\u529E/\u6D3B\u52A8\u6E05\u5355
  var sidebarHtml = '<div class="organize-sidebar">';

  // 400-\u8D44\u6E90RESOURCE section
  sidebarHtml += '<div class="side-box" style="flex:1">';
  sidebarHtml += '<div class="side-box-title">\u8D44\u6E90\u6587\u4EF6\u76EE\u5F55</div>';
  sidebarHtml += '<div class="side-folder-list" id="resourceFolderList">';
  sidebarHtml += '<div class="side-folders-empty">\u52A0\u8F7D\u4E2D...</div>';
  sidebarHtml += '</div></div>';

  // \u9879\u76EE\u7BA1\u7406\u76EE\u5F55 section
  sidebarHtml += '<div class="side-box" style="flex:1">';
  sidebarHtml += '<div class="side-box-title">\u9879\u76EE\u7BA1\u7406\u76EE\u5F55</div>';
  sidebarHtml += '<div class="side-folder-list" id="projectFolderList">';
  sidebarHtml += '<div class="side-folders-empty">\u52A0\u8F7D\u4E2D...</div>';
  sidebarHtml += '</div></div>';

  // \u5FEB\u901F\u5B66\u4E60 section
  sidebarHtml += '<div class="side-box" style="flex:1;min-height:0">';
  sidebarHtml += '<div class="side-box-title">\u5FEB\u901F\u5B66\u4E60</div>';
  sidebarHtml += '<div class="side-drop-area" id="dropQuickLearn" data-target="__quicklearn__">\u62D6\u62FD\u81F3\u6B64 \u2192<br>\u79FB\u52A8\u5230\u5FEB\u901F\u5B66\u4E60</div>';
  sidebarHtml += '</div>';

  // \u4ECA\u65E5\u5F85\u529E / \u6D3B\u52A8\u6E05\u5355
  sidebarHtml += '<div class="side-row" style="flex:1;min-height:0">';
  sidebarHtml += '<div class="side-col"><div class="side-box-title">\u4ECA\u65E5\u5F85\u529E</div><div class="side-drop-area" id="dropTodo" data-target="__todo__" style="flex:1">\u62D6\u62FD\u81F3\u6B64</div></div>';
  sidebarHtml += '<div class="side-col"><div class="side-box-title">\u6D3B\u52A8\u6E05\u5355</div><div class="side-drop-area" id="dropActivity" data-target="__activity__" style="flex:1">\u62D6\u62FD\u81F3\u6B64</div></div>';
  sidebarHtml += '</div></div>';

  // Full layout: main + sidebar
  grid.className = '';
  grid.innerHTML = '<div class="organize-layout"><div class="organize-main"><div class="card-grid" id="organizeCardGrid">'+cardHtml+'</div></div>'+sidebarHtml+'</div>';

  // Setup card drag
  setupOrganizeCardDrag(grid);

  // Load 400-\u8D44\u6E90RESOURCE contents (also wires drop targets after render)
  await loadResourceFolder();

  // Load \u9879\u76EE\u7BA1\u7406\u76EE\u5F55 contents
  await loadProjectFolders();

  updateInboxNav(totalPages);
}

function setupOrganizeCardDrag(container) {
  // Cards: draggable + click to open
  var cards = container.querySelectorAll('#organizeCardGrid .card[data-path]');
  for(var i=0;i<cards.length;i++){(function(c){
    c.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      this.classList.add('dragging');
    };
    c.ondragend = function(){ this.classList.remove('dragging'); };
    c.onclick = function(){
      var p = this.getAttribute('data-path');
      if(window.__IFTO_openFile) window.__IFTO_openFile(p);
    };
  })(cards[i]);}

  // Card grid as drop target: files from resource tree drag back to \u6536\u96C6
  var grid = document.getElementById('organizeCardGrid');
  if(grid) {
    grid.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over-target'); };
    grid.ondragleave = function(){ this.classList.remove('drag-over-target'); };
    grid.ondrop = function(e){
      e.preventDefault(); this.classList.remove('drag-over-target');
      var path = e.dataTransfer.getData('text/plain');
      if(path && window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, getInboxFolder()).then(function(success){ if(success) renderInbox(); });
      }
    };
  }
}

function showToast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--g1);color:var(--bg);padding:8px 16px;font-size:12px;z-index:99999;transition:opacity .3s;font-family:var(--font)';
  document.body.appendChild(t);
  setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ t.remove(); },400); },2000);
}

async function loadResourceFolder() {
  try {
    var list = document.getElementById('resourceFolderList');
    if(!list) return;
    var items = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(getResourceRoot())
      : [];
    if(items.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">400-\u8D44\u6E90RESOURCE \u4E3A\u7A7A</div>';
      return;
    }
    // Only show folders at the top level
    var folders = items.filter(function(i){ return i.isFolder; });
    if(folders.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">\u65E0\u5B50\u6587\u4EF6\u5939</div>';
      return;
    }
    var html = '';
    for(var i=0;i<folders.length;i++) {
      var fp = getResourceRoot()+'/'+folders[i].name;
      html += '<div class="side-folder-item" data-folder="'+fp+'" data-expanded="false">'+
        '<span class="folder-toggle">\u25B6</span> \u{1F4C1} '+folders[i].name+
        '</div><div class="folder-children" id="fch_'+i+'" style="display:none"></div>';
    }
    list.innerHTML = html;

    // Restore previously expanded folders from module-level state
    _organizeResourceExpanded.forEach(function(fp){
      var items = list.querySelectorAll('.side-folder-item[data-folder]');
      for(var ei=0;ei<items.length;ei++){
        if(items[ei].getAttribute('data-folder') === fp){
          items[ei].setAttribute('data-expanded','true');
          var t = items[ei].querySelector('.folder-toggle');
          if(t) t.textContent = '\u25BC';
          var idx = Array.prototype.indexOf.call(list.querySelectorAll('.side-folder-item'), items[ei]);
          var children = document.getElementById('fch_'+idx);
          if(children){
            children.style.display = 'flex';
            loadFolderChildren(children, fp);
          }
        }
      }
    });


    // Wire expand/collapse on click + drag-drop on folder items
    var layout = list.closest('.organize-layout');
    list.querySelectorAll('.side-folder-item').forEach(function(item, idx){
      // Click to toggle expand
      item.onclick = function(e){
        e.stopPropagation();
        var isExpanded = this.getAttribute('data-expanded') === 'true';
        var children = document.getElementById('fch_'+idx);
        if(!children) return;
        var fp = this.getAttribute('data-folder');
        if(isExpanded) {
          children.style.display = 'none';
          children.innerHTML = '';
          this.setAttribute('data-expanded','false');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '\u25B6';
          _organizeResourceExpanded = _organizeResourceExpanded.filter(function(x){ return x !== fp; });
        } else {
          children.style.display = 'flex';
          this.setAttribute('data-expanded','true');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '\u25BC';
          if(_organizeResourceExpanded.indexOf(fp) === -1) _organizeResourceExpanded.push(fp);
          // Load children contents
          loadFolderChildren(children, fp);
        }
      };
      // Drag-drop for the folder item itself
      item.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      item.ondragleave = function(){ this.classList.remove('drag-over'); };
      item.ondrop = function(e){
        e.preventDefault(); this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        var target = this.getAttribute('data-folder');
        if(path && target && window.__IFTO_moveFile) {
          window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
        }
      };
    });

    // Wire sidebar drop areas (\u5FEB\u901F\u5B66\u4E60, \u4ECA\u65E5\u5F85\u529E, \u6D3B\u52A8\u6E05\u5355)
    var layout = list.closest('.organize-layout');
    if(layout) {
      layout.querySelectorAll('.side-drop-area').forEach(function(area){
        area.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
        area.ondragleave = function(){ this.classList.remove('drag-over'); };
        area.ondrop = function(e){
          e.preventDefault(); this.classList.remove('drag-over');
          var path = e.dataTransfer.getData('text/plain');
          var target = this.getAttribute('data-target');
          if(!path) return;
          if(target === '__todo__') {
            if(path && window.__IFTO_moveFile) {
              window.__IFTO_moveFile(path, TODO_FOLDER).then(function(success){ if(success){ renderInbox(); renderTodo(); } });
            }
            return;
          }
          if(target === '__activity__') {
            if(path && window.__IFTO_moveFile) {
              window.__IFTO_moveFile(path, ACTIVITY_FOLDER).then(function(success){ if(success){ renderInbox(); renderActivity(); } });
            }
            return;
          }
          if(target === '__quicklearn__') {
            if(path && window.__IFTO_moveFile) {
              window.__IFTO_moveFile(path, getQuickLearnFolder()).then(function(success){ if(success){ renderInbox(); } });
            }
            return;
          }
          if(path && target && window.__IFTO_moveFile) {
            window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
          }
        };
      });
    }
  } catch(e) { console.error('IFTO: loadResourceFolder error', e); }
}

async function loadProjectFolders() {
  try {
    var list = document.getElementById('projectFolderList');
    if(!list) return;
    var pBase = getProjectBase();
    var items = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(pBase) : [];
    if(items.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">\u9879\u76EE\u7BA1\u7406\u4E3A\u7A7A</div>';
      return;
    }
    // Only show project folders (exclude status columns)
    var pCols = getProjectCols();
    var statusMap = {};
    for(var si=0;si<pCols.length;si++) statusMap[pCols[si]] = true;
    var folders = items.filter(function(i){
      return i.isFolder && !statusMap[i.name];
    });
    if(folders.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">\u65E0\u9879\u76EE\u6587\u4EF6\u5939</div>';
      return;
    }
    var html = '';
    for(var i=0;i<folders.length;i++) {
      var fp = pBase+'/'+folders[i].name;
      html += '<div class="side-folder-item" data-folder="'+fp+'" data-expanded="false">'+
        '<span class="folder-toggle">\u25B6</span> \u{1F4C1} '+folders[i].name+
        '</div><div class="folder-children" id="pfch_'+i+'" style="display:none"></div>';
    }
    list.innerHTML = html;

    // Restore previously expanded folders from module-level state
    _organizeProjectExpanded.forEach(function(fp){
      var items = list.querySelectorAll('.side-folder-item[data-folder]');
      for(var ei=0;ei<items.length;ei++){
        if(items[ei].getAttribute('data-folder') === fp){
          items[ei].setAttribute('data-expanded','true');
          var t = items[ei].querySelector('.folder-toggle');
          if(t) t.textContent = '\u25BC';
          var idx = Array.prototype.indexOf.call(list.querySelectorAll('.side-folder-item'), items[ei]);
          var children = document.getElementById('pfch_'+idx);
          if(children){
            children.style.display = 'flex';
            loadFolderChildren(children, fp);
          }
        }
      }
    });

    // Wire expand/collapse on click + drag-drop on folder items
    list.querySelectorAll('.side-folder-item').forEach(function(item, idx){
      item.onclick = function(e){
        e.stopPropagation();
        var isExpanded = this.getAttribute('data-expanded') === 'true';
        var children = document.getElementById('pfch_'+idx);
        if(!children) return;
        var fp = this.getAttribute('data-folder');
        if(isExpanded) {
          children.style.display = 'none';
          children.innerHTML = '';
          this.setAttribute('data-expanded','false');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '\u25B6';
          _organizeProjectExpanded = _organizeProjectExpanded.filter(function(x){ return x !== fp; });
        } else {
          children.style.display = 'flex';
          this.setAttribute('data-expanded','true');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '\u25BC';
          if(_organizeProjectExpanded.indexOf(fp) === -1) _organizeProjectExpanded.push(fp);
          loadFolderChildren(children, fp);
        }
      };
      item.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      item.ondragleave = function(){ this.classList.remove('drag-over'); };
      item.ondrop = function(e){
        e.preventDefault(); this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        var target = this.getAttribute('data-folder');
        if(path && target && window.__IFTO_moveFile) {
          window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
        }
      };
    });
  } catch(e) { console.error('IFTO: loadProjectFolders error', e); }
}

async function loadFolderChildren(container, folderPath) {
  try {
    var items = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(folderPath)
      : [];
    if(items.length === 0) {
      container.innerHTML = '<div style="font-size:10px;color:var(--g4);padding:2px 0 2px 20px">\u7A7A</div>';
      return;
    }
    var html = '';
    for(var i=0;i<items.length;i++) {
      var fp = folderPath+'/'+items[i].name;
      if(items[i].isFolder) {
        // Subfolder: render with expand toggle + children container
        html += '<div class="side-folder-item" data-folder="'+fp+'" data-expanded="false" style="padding-left:20px">'+
          '<span class="folder-toggle">\u25B6</span> \u{1F4C1} '+items[i].name+
          '</div><div class="folder-children" style="display:none"></div>';
      } else {
        html += '<div class="side-folder-item" style="padding-left:20px" data-folder="'+fp+'" data-file="true" draggable="true">\u{1F4C4} '+items[i].name+'</div>';
      }
    }
    container.innerHTML = html;

    // Wire drag-drop + click handlers on child items
    container.querySelectorAll('.side-folder-item').forEach(function(item){
      var fp = item.getAttribute('data-folder');
      // Drag-drop
      item.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      item.ondragleave = function(){ this.classList.remove('drag-over'); };
      item.ondrop = function(e){
        e.preventDefault(); this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        var target = this.getAttribute('data-folder');
        if(!path) return;
        if(this.getAttribute('data-file') === 'true') {
          showToast('\u4E0D\u80FD\u79FB\u52A8\u5230\u6587\u4EF6\u4E0A');
          return;
        }
        if(target && window.__IFTO_moveFile) {
          window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
        }
      };
      // File items: draggable out + click to open
      if(item.getAttribute('data-file') === 'true') {
        item.ondragstart = function(e){
          e.dataTransfer.setData('text/plain', this.getAttribute('data-folder'));
          this.classList.add('drag-over');
        };
        item.onclick = function(){
          var p = this.getAttribute('data-folder');
          if(window.__IFTO_openFile) window.__IFTO_openFile(p);
        };
      } else {
        // Subfolder: click to toggle expand
        item.onclick = function(e){
          e.stopPropagation();
          var isExpanded = this.getAttribute('data-expanded') === 'true';
          // Find the sibling .folder-children container
          var children = this.nextElementSibling;
          while(children && !children.classList.contains('folder-children')) {
            children = children.nextElementSibling;
          }
          if(!children) return;
          if(isExpanded) {
            children.style.display = 'none';
            children.innerHTML = '';
            this.setAttribute('data-expanded','false');
            var t = this.querySelector('.folder-toggle');
            if(t) t.textContent = '\u25B6';
            _organizeResourceExpanded = _organizeResourceExpanded.filter(function(x){ return x !== fp; });
          } else {
            children.style.display = 'flex';
            this.setAttribute('data-expanded','true');
            var t = this.querySelector('.folder-toggle');
            if(t) t.textContent = '\u25BC';
            if(_organizeResourceExpanded.indexOf(fp) === -1) _organizeResourceExpanded.push(fp);
            loadFolderChildren(children, fp);
          }
        };
      }
    });

    // Restore expanded subfolder state
    container.querySelectorAll('.side-folder-item[data-expanded]').forEach(function(item){
      var fp = item.getAttribute('data-folder');
      if(_organizeResourceExpanded.indexOf(fp) !== -1) {
        var children = item.nextElementSibling;
        while(children && !children.classList.contains('folder-children')) {
          children = children.nextElementSibling;
        }
        if(children) {
          item.setAttribute('data-expanded','true');
          var t = item.querySelector('.folder-toggle');
          if(t) t.textContent = '\u25BC';
          children.style.display = 'flex';
          loadFolderChildren(children, fp);
        }
      }
    });
  } catch(e) { console.error('IFTO: loadFolderChildren error', e); }
}

async function renderInboxLearn(grid) {
  var all = (typeof window.__IFTO_getFilesDetail === 'function')
    ? await window.__IFTO_getFilesDetail(getQuickLearnFolder(), 0, 999)
    : {files: [], total: 0};
  var allDetails = all.files || [];
  // Filter out hidden files (starting with .)
  allDetails = allDetails.filter(function(f){ return f.name && f.name[0] !== '.'; });

  // Sort by creation time
  allDetails.sort(function(a, b) {
    var tA = a.ctime || 0;
    var tB = b.ctime || 0;
    return inboxSortDesc ? tB - tA : tA - tB;
  });

  // 4 rows per page, calculated from grid width
  var gridW = grid.clientWidth - 48;
  var itemsPerRow = window.__IFTO_MOBILE_ACTIVE ? 2 : Math.max(1, Math.floor((gridW + 10) / 210));
  var itemsPerPage = itemsPerRow * 4;
  var totalPages = Math.ceil(allDetails.length / itemsPerPage) || 1;
  if(inboxPage > totalPages) inboxPage = totalPages;

  var start = (inboxPage - 1) * itemsPerPage;
  var pf = allDetails.slice(start, start + itemsPerPage);

  var html = '';
  for(var i=0;i<pf.length;i++) {
    var d = pf[i];
    var nm = d.name.replace(/\\.md$/i, '');
    html += '<div class="card card-detail" data-path="'+getQuickLearnFolder()+'/'+d.name+'">'+
      '<span class="card-title">'+nm+'</span>'+
      '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
      (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
    '</div>';
  }

  grid.className = 'card-grid';
  grid.innerHTML = html;

  // Wire file cards
  var cards = grid.querySelectorAll('.card[data-path]');
  for(var j=0;j<cards.length;j++) {
    (function(card){
      card.onclick = function(){
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      };
    })(cards[j]);
  }

  updateInboxNav(totalPages);
}

function updateInboxNav(tp) {
  var nav = document.querySelector('#inbox .slide-nav');
  if(!nav) return;
  var btns = nav.querySelectorAll('.slide-btn');
  var num = nav.querySelector('.slide-num');
  if(num) num.textContent = String(inboxPage).padStart(2,'0')+' / '+String(tp).padStart(2,'0');
  if(btns.length >= 2) {
    btns[0].onclick = function(){
      if(inboxPage > 1) { inboxPage--; renderInbox(); }
    };
    btns[1].onclick = function(){
      if(inboxPage < tp) { inboxPage++; renderInbox(); }
    };
  }
}

// ====== Todo & Activity ======

// Helper: apply custom sort order (from _order.json) to a file list
function _applyListOrder(files, order) {
  if(!order || order.length===0) return files.sort().reverse();
  var ordered = [];
  var fileSet = {};
  for(var fi=0;fi<files.length;fi++) fileSet[files[fi]] = true;
  for(var oi=0;oi<order.length;oi++) {
    if(fileSet[order[oi]]) { ordered.push(order[oi]); delete fileSet[order[oi]]; }
  }
  // Append remaining files not in the order list, sorted reverse
  var remaining = [];
  for(var name in fileSet) remaining.push(name);
  remaining.sort().reverse();
  for(var ri=0;ri<remaining.length;ri++) ordered.push(remaining[ri]);
  return ordered;
}

// Helper: reorder items on same-folder drop, save to _order.json
function _reorderOnDrop(e, folder, renderFn) {
  e.preventDefault();
  var srcPath = e.dataTransfer.getData('text/plain');
  if(!srcPath) return;
  var srcFolder = srcPath.substring(0, srcPath.lastIndexOf('/'));
  if(srcFolder !== folder) return; // not same folder \u2192 handled by container drop
  var targetItem = e.target.closest('[data-path]');
  if(!targetItem) return;
  var tgtPath = targetItem.getAttribute('data-path');
  if(srcPath === tgtPath) return;
  var srcName = srcPath.split('/').pop();
  var tgtName = tgtPath.split('/').pop();
  window.__IFTO_readListOrder(folder).then(function(order){
    var all = Array.from(targetItem.parentNode.querySelectorAll('[data-path]')).map(function(el){ return el.getAttribute('data-path').split('/').pop(); });
    if(order.length===0) order = all.slice().sort().reverse();
    // Remove src from order, insert before tgt
    var idx = order.indexOf(srcName);
    if(idx>=0) order.splice(idx,1);
    var tgtIdx = order.indexOf(tgtName);
    if(tgtIdx>=0) order.splice(tgtIdx, 0, srcName);
    else order.push(srcName);
    window.__IFTO_writeListOrder(folder, order).then(function(){ renderFn(); });
  });
}

async function renderTodo() {
  try {
    // Skip re-render if user is currently editing an inline rename input.
    // Otherwise grid.innerHTML would obliterate the input mid-edit, which
    // is the root cause of "double-click on freshly created card shows no cursor"
    // \u2014 vault.on('create') fires renderActivity right when the dblclick handler
    // is mounting its input, and the re-render wipes it before focus lands.
    if(window.__IFTO_renaming) return;
    // Clean up any orphaned rename inputs before re-render
    (function(){
      document.querySelectorAll('.todo-inline-edit').forEach(function(oi){
        var els = oi.parentNode ? Array.from(oi.parentNode.children) : [];
        for(var ei=0;ei<els.length;ei++) {
          if(els[ei] !== oi && els[ei].style && els[ei].style.display === 'none') els[ei].style.display = '';
        }
        oi.remove();
      });
    })();

    var list = document.getElementById('todoList');
    if(!list) return;
    var all = (typeof window.__IFTO_listFiles === 'function')
      ? await window.__IFTO_listFiles(TODO_FOLDER)
      : [];

    // Apply custom order if exists, filter out hidden dotfiles
    var order = (typeof window.__IFTO_readListOrder === 'function')
      ? await window.__IFTO_readListOrder(TODO_FOLDER) : [];
    all = _applyListOrder(all, order);
    all = all.filter(function(n){ return !n.startsWith('.'); });

    // Bug fix: badge count must be taken AFTER filtering out hidden files
    // (e.g. .ifto_order.json) so it matches what is actually displayed.
    var badge = document.getElementById('todoBadge');
    if(badge) badge.textContent = all.length;

    // Bug 1 fix: read the persisted checkbox state from each file so that
    // a full re-render (e.g. after dragging in a new todo from activity) does
    // not wipe out the user's previously checked items. File is the source of
    // truth; the DOM is just a reflection.
    var stateMap = {};
    if(typeof window.__IFTO_getFilesCheckboxState === 'function') {
      try {
        var states = await window.__IFTO_getFilesCheckboxState(TODO_FOLDER);
        for(var si=0; si<states.length; si++) {
          stateMap[states[si].name] = states[si].checked;
        }
      } catch(e) { console.error('IFTO: read todo checkbox states error', e); }
    }

    var html = '';
    for(var i=0;i<all.length;i++) {
      var nm = all[i].replace(/\\.md$/i, '');
      var checkedCls = stateMap[all[i]] ? ' checked' : '';
      html += '<div class="todo-item" draggable="true" data-path="'+TODO_FOLDER+'/'+all[i]+'" data-folder="'+TODO_FOLDER+'">'+
        '<span class="cb'+checkedCls+'"></span>'+
        '<span class="todo-text">'+nm+'</span>'+
      '</div>';
    }
    list.innerHTML = html;

    // Wire checkbox toggle \u2014 persist the new state to the file so it survives
    // any future re-render (Bug 1 fix).
    list.querySelectorAll('.todo-item .cb').forEach(function(cb){
      cb.onclick = function(e){
        e.stopPropagation();
        var cbEl = this;
        var item = cbEl.closest('.todo-item');
        var filePath = item ? item.getAttribute('data-path') : null;
        var newChecked = !cbEl.classList.contains('checked');
        cbEl.classList.toggle('checked', newChecked);
        if(filePath && typeof window.__IFTO_setCheckboxState === 'function') {
          // Fire-and-forget: file write happens in background, UI is already
          // updated optimistically.
          window.__IFTO_setCheckboxState(filePath, newChecked).then(function(ok){
            if(!ok) {
              // Revert visual state if write failed.
              cbEl.classList.toggle('checked', !newChecked);
            }
          }).catch(function(){
            cbEl.classList.toggle('checked', !newChecked);
          });
        }
      };
    });

    // Wire drag & reorder drop on items
    list.querySelectorAll('.todo-item[draggable]').forEach(function(item){
      item.ondragstart = function(e){
        e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
        this.classList.add('dragging');
      };
      item.ondragend = function(){ this.classList.remove('dragging'); };
      item.onclick = function(){ /* just a tap, do nothing special */ };
      // Accept drops from same-folder items for reorder
      item.ondragover = function(e){ e.preventDefault(); };
      item.ondrop = function(e){
        e.stopPropagation();
        _reorderOnDrop(e, TODO_FOLDER, function(){ renderTodo(); renderActivity(); });
      };
    });

    // Wire double-click rename
    list.querySelectorAll('.todo-item .todo-text').forEach(function(txt){
      txt.ondblclick = function(e){
        e.preventDefault();
        e.stopPropagation();
        var item = this.closest('.todo-item');
        if(!item) return;
        var oldPath = item.getAttribute('data-path');
        var oldName = oldPath.split('/').pop();
        var input = document.createElement('input');
        input.className = 'todo-inline-edit';
        input.value = this.textContent;
        this.style.display = 'none';
        this.parentNode.insertBefore(input, this);
        protectInlineEditInput(input);
        focusInlineEditInput(input);
        input.onblur = function(){
          finishRename(oldPath, oldName, input, item.querySelector('.todo-text'));
        };
        input.onkeydown = function(e){
          e.stopPropagation();
          if(e.key === 'Enter') { input.blur(); }
          if(e.key === 'Escape') { input.value = oldName.replace(/\\.md$/i,''); input.blur(); }
        };
      };
    });

    // Make todo list a drop target (for drag from activity)
    list.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over-target'); };
    list.ondragleave = function(){ this.classList.remove('drag-over-target'); };
    list.ondrop = function(e){
      e.preventDefault(); this.classList.remove('drag-over-target');
      var path = e.dataTransfer.getData('text/plain');
      // if same folder, reorder was already handled by item.ondrop
      if(path && !path.startsWith(TODO_FOLDER) && window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, TODO_FOLDER).then(function(success){ if(success) { renderTodo(); renderActivity(); } });
      }
    };
  } catch(e) { console.error('IFTO: renderTodo error', e); }
}

// Helper: finish inline rename (titleEl is the element that was hidden during edit)
function protectInlineEditInput(input) {
  // Mark a global "renaming in progress" flag so background re-renders
  // (triggered by vault.on create/rename/modify events) don't wipe the input.
  window.__IFTO_renaming = true;
  input.__iftoCreatedAt = Date.now();
  input.draggable = false;
  input.style.cursor = 'text';
  input.style.userSelect = 'text';
  input.style.webkitUserSelect = 'text';
  var draggableParent = null;
  function disableParentDrag() {
    draggableParent = input.closest('[draggable="true"]');
    if(draggableParent) draggableParent.draggable = false;
  }
  // Disable parent drag SYNCHRONOUSLY before focus runs. The previous
  // setTimeout(0) deferred this until after focusInlineEditInput, so the
  // parent .card-sm still had draggable="true" when input.focus() ran \u2014
  // Chromium swallows focus on inputs inside live draggable ancestors,
  // which is why the cursor only appeared after alt-tabbing back.
  disableParentDrag();
  ['pointerdown','mousedown','mousemove','mouseup','click','dblclick'].forEach(function(evt){
    input.addEventListener(evt, function(e){ disableParentDrag(); e.stopPropagation(); });
  });
  input.addEventListener('focus', disableParentDrag);
  input.addEventListener('dragstart', function(e){ e.preventDefault(); e.stopPropagation(); });

  // ====== Grace-period blur bouncer ======
  // During the first ~700ms after the input is created, any blur event is
  // intercepted and bounced back to the input. This wins the focus race
  // against Obsidian's leaf-focus / vault-event-driven focus theft.
  //
  // Crucially this listener is registered BEFORE the dblclick handler sets
  // \`input.onblur = ...\` (which calls finishRename). Because it uses
  // capture-phase + stopImmediatePropagation, it prevents the user-supplied
  // onblur from running during the grace window \u2014 so the rename isn't
  // committed prematurely on a transient focus blip, and the {once:true}
  // teardown handler below also stays unfired.
  //
  // After the grace expires, blur events flow through normally and
  // finishRename / cleanup run as expected.
  function bounceBlur(ev) {
    var elapsed = Date.now() - (input.__iftoCreatedAt || 0);
    if(elapsed < 700 && document.body.contains(input)) {
      ev.stopImmediatePropagation();
      // Aggressively refocus across the same retry schedule used by
      // focusInlineEditInput, so even multiple yank attempts lose.
      setTimeout(function(){ try { input.focus({preventScroll:true}); } catch(_){} }, 0);
      setTimeout(function(){ try { input.focus({preventScroll:true}); } catch(_){} }, 30);
      setTimeout(function(){ try { input.focus({preventScroll:true}); } catch(_){} }, 100);
    }
  }
  input.addEventListener('blur', bounceBlur, true);

  // Real teardown blur handler \u2014 runs only after grace expires (because
  // bounceBlur swallows earlier blurs via stopImmediatePropagation).
  // Replaces the previous {once:true} handler that could clear
  // __IFTO_renaming on a transient focus blip and let a background
  // re-render wipe the still-active rename input.
  input.addEventListener('blur', function(){
    if(draggableParent) draggableParent.draggable = true;
    window.__IFTO_renaming = false;
  });
}

function focusInlineEditInput(input) {
  // First ask the Obsidian plugin host to make the IFTO-HOME leaf active.
  // This is the important part: it replaces the user's manual Alt-Tab workaround
  // by making Obsidian itself route keyboard focus back into this ItemView.
  try {
    if(window.__IFTO_forceInputFocus) window.__IFTO_forceInputFocus(input);
  } catch(e) {}

  // Force Electron BrowserWindow OS-level focus first.
  // Fixes the "new card double-click rename has no cursor until you alt-tab away
  // and back" bug. Root cause: vault.create event triggers re-render concurrent
  // with the dblclick, leaving Electron's window-focus state out of sync;
  // input.focus() then becomes a no-op until the OS sends a real focus event.
  try {
    if (window.__IFTO_refocusWindow) window.__IFTO_refocusWindow();
  } catch(e) {}

  var focusInput = function(){
    if(!input || !document.body.contains(input)) return;
    try {
      // Release any stuck focus elsewhere so the browser will accept ours
      if(document.activeElement && document.activeElement !== input
         && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    } catch(e) {}
    try { window.focus(); } catch(e) {}
    try {
      input.focus({preventScroll:true});
      var len = input.value.length;
      try { input.setSelectionRange(0, len); } catch(e2) { input.select(); }
    } catch(e3) {}
  };
  focusInput();
  if(typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function(){ focusInput(); requestAnimationFrame(focusInput); });
  }
  setTimeout(focusInput, 30);
  setTimeout(focusInput, 100);
  setTimeout(focusInput, 250);
  setTimeout(focusInput, 500);
  // Extra retries near the tail of the 700ms grace period \u2014 the blur
  // bouncer in protectInlineEditInput keeps fighting until 700ms, so we
  // make sure focus is asserted one more time right before the grace
  // ends. Without this, a yank-and-no-bounce-back at ~600ms can leave the
  // input visible but cursor-less.
  setTimeout(focusInput, 650);
}

function finishRename(oldPath, oldName, input, titleEl) {
  var newName = input.value.trim();
  input.remove();
  if(titleEl) titleEl.style.display = '';
  if(!newName || newName === oldName.replace(/\\.md$/i,'')) return;
  var newFullName = newName + '.md';
  if(window.__IFTO_renameFile) {
    window.__IFTO_renameFile(oldPath, newFullName).then(function(ok){
      if(ok) {
        // Update order file if exists: replace old name with new name
        var folder = oldPath.substring(0, oldPath.lastIndexOf('/'));
        var oldFile = oldPath.split('/').pop();
        if(window.__IFTO_readListOrder) {
          window.__IFTO_readListOrder(folder).then(function(order){
            if(order && order.length) {
              var idx = order.indexOf(oldFile);
              if(idx >= 0) {
                order[idx] = newFullName;
                window.__IFTO_writeListOrder(folder, order);
              }
            }
          });
        }
        renderTodo(); renderActivity();
      }
    });
  }
}


// Helper: create a new todo file with checkbox
async function createTodoFile() {
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  if(window.__IFTO_createFile) {
    var ok = await window.__IFTO_createFile(TODO_FOLDER, fn, '- [ ] \\n');
    if(ok) renderTodo();
  }
}

async function renderActivity() {
  try {
    // Skip re-render if user is currently editing \u2014 otherwise grid.innerHTML
    // would obliterate the inline rename input under the cursor.
    if(window.__IFTO_renaming) return;
    var grid = document.getElementById('activityGrid');
    if(!grid) return;
    var all = (typeof window.__IFTO_listFiles === 'function')
      ? await window.__IFTO_listFiles(ACTIVITY_FOLDER)
      : [];

    // Apply custom order if exists, filter out hidden dotfiles
    var order = (typeof window.__IFTO_readListOrder === 'function')
      ? await window.__IFTO_readListOrder(ACTIVITY_FOLDER) : [];
    all = _applyListOrder(all, order);
    all = all.filter(function(n){ return !n.startsWith('.'); });

    // Bug fix: badge count must be taken AFTER filtering out hidden files
    // (e.g. .ifto_order.json) so it matches what is actually displayed.
    var badge = document.getElementById('activityBadge');
    if(badge) badge.textContent = all.length;

    // Bug 1 fix: read persisted checkbox state from files (mirror of renderTodo).
    var stateMap = {};
    if(typeof window.__IFTO_getFilesCheckboxState === 'function') {
      try {
        var states = await window.__IFTO_getFilesCheckboxState(ACTIVITY_FOLDER);
        for(var si=0; si<states.length; si++) {
          stateMap[states[si].name] = states[si].checked;
        }
      } catch(e) { console.error('IFTO: read activity checkbox states error', e); }
    }

    var html = '';
    // Add button always first (top-left)
    html += '<div class="card-sm add-card" id="activityAddBtn"><span class="ci">+</span><span class="cl">\u65B0\u5EFA\u6D3B\u52A8\u4E8B\u4EF6</span></div>';
    for(var i=0;i<all.length;i++) {
      var nm = all[i].replace(/\\.md$/i, '');
      var checkedCls = stateMap[all[i]] ? ' checked' : '';
      html += '<div class="card-sm" draggable="true" data-path="'+ACTIVITY_FOLDER+'/'+all[i]+'" data-folder="'+ACTIVITY_FOLDER+'">'+
        '<div style="display:flex;align-items:flex-start;gap:6px"><span class="cb'+checkedCls+'"></span><span class="card-sm-title">'+nm+'</span></div>'+
      '</div>';
    }
    grid.innerHTML = html;

    // Wire checkbox toggle \u2014 persist to file (Bug 1 fix).
    grid.querySelectorAll('.card-sm .cb').forEach(function(cb){
      cb.onclick = function(e){
        e.stopPropagation();
        var cbEl = this;
        var card = cbEl.closest('.card-sm');
        var filePath = card ? card.getAttribute('data-path') : null;
        var newChecked = !cbEl.classList.contains('checked');
        cbEl.classList.toggle('checked', newChecked);
        if(filePath && typeof window.__IFTO_setCheckboxState === 'function') {
          window.__IFTO_setCheckboxState(filePath, newChecked).then(function(ok){
            if(!ok) cbEl.classList.toggle('checked', !newChecked);
          }).catch(function(){
            cbEl.classList.toggle('checked', !newChecked);
          });
        }
      };
    });

    // Wire drag & reorder drop on cards
    grid.querySelectorAll('.card-sm[draggable]').forEach(function(item){
      item.ondragstart = function(e){
        e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
        this.classList.add('dragging');
      };
      item.ondragend = function(){ this.classList.remove('dragging'); };
      // Accept drops from same-folder items for reorder
      item.ondragover = function(e){ e.preventDefault(); };
      item.ondrop = function(e){
        e.stopPropagation();
        _reorderOnDrop(e, ACTIVITY_FOLDER, function(){ renderActivity(); renderTodo(); });
      };
    });

    // Wire double-click rename
    grid.querySelectorAll('.card-sm .card-sm-title').forEach(function(txt){
      txt.ondblclick = function(e){
        e.preventDefault();
        e.stopPropagation();
        var item = this.closest('.card-sm');
        if(!item) return;
        var oldPath = item.getAttribute('data-path');
        var oldName = oldPath.split('/').pop();
        var input = document.createElement('input');
        input.className = 'todo-inline-edit';
        input.value = this.textContent;
        this.style.display = 'none';
        this.parentNode.insertBefore(input, this);
        protectInlineEditInput(input);
        focusInlineEditInput(input);
        input.onblur = function(){
          finishRename(oldPath, oldName, input, item.querySelector('.card-sm-title'));
        };
        input.onkeydown = function(e){
          e.stopPropagation();
          if(e.key === 'Enter') { input.blur(); }
          if(e.key === 'Escape') { input.value = oldName.replace(/\\.md$/i,''); input.blur(); }
        };
      };
    });

    // Wire add button
    var addBtn = document.getElementById('activityAddBtn');
    if(addBtn) {
      addBtn.onclick = async function(){
        await createActivityFile();
      };
    }

    // Make activity grid a drop target (for drag from todo)
    grid.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over-target'); };
    grid.ondragleave = function(){ this.classList.remove('drag-over-target'); };
    grid.ondrop = function(e){
      e.preventDefault(); this.classList.remove('drag-over-target');
      var path = e.dataTransfer.getData('text/plain');
      if(path && !path.startsWith(ACTIVITY_FOLDER) && window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, ACTIVITY_FOLDER).then(function(success){ if(success) { renderTodo(); renderActivity(); } });
      }
    };
  } catch(e) { console.error('IFTO: renderActivity error', e); }
}

// Prepend a new activity card to the grid (avoids full re-render race conditions)
function prependActivityCard(title, filename) {
  var grid = document.getElementById('activityGrid');
  if(!grid) return;
  var card = document.createElement('div');
  card.className = 'card-sm';
  card.draggable = true;
  card.setAttribute('data-path', ACTIVITY_FOLDER+'/'+filename);
  card.setAttribute('data-folder', ACTIVITY_FOLDER);
  card.innerHTML = '<div style="display:flex;align-items:flex-start;gap:6px"><span class="cb"></span><span class="card-sm-title">'+title+'</span></div>';
  // New files are created with \`- [ ] \` content, so visually unchecked is correct.
  // On click, persist to file (Bug 1 fix) \u2014 same as renderActivity's handler.
  card.querySelector('.cb').onclick = function(e){
    e.stopPropagation();
    var cbEl = this;
    var fp = card.getAttribute('data-path');
    var newChecked = !cbEl.classList.contains('checked');
    cbEl.classList.toggle('checked', newChecked);
    if(fp && typeof window.__IFTO_setCheckboxState === 'function') {
      window.__IFTO_setCheckboxState(fp, newChecked).then(function(ok){
        if(!ok) cbEl.classList.toggle('checked', !newChecked);
      }).catch(function(){
        cbEl.classList.toggle('checked', !newChecked);
      });
    }
  };
  card.ondragstart = function(e){ e.dataTransfer.setData('text/plain', this.getAttribute('data-path')); this.classList.add('dragging'); };
  card.ondragend = function(){ this.classList.remove('dragging'); };
  card.ondragover = function(e){ e.preventDefault(); };
  card.ondrop = function(e){
    e.stopPropagation();
    _reorderOnDrop(e, ACTIVITY_FOLDER, function(){ renderActivity(); renderTodo(); });
  };
  card.querySelector('.card-sm-title').ondblclick = function(e){
    e.preventDefault();
    e.stopPropagation();
    var item = this.closest('.card-sm');
    if(!item) return;
    var oldPath = item.getAttribute('data-path');
    var oldName = oldPath.split('/').pop();
    var input = document.createElement('input');
    input.className = 'todo-inline-edit';
    input.value = this.textContent;
    this.style.display = 'none';
    this.parentNode.insertBefore(input, this);
    protectInlineEditInput(input);
    focusInlineEditInput(input);
    input.onblur = function(){ finishRename(oldPath, oldName, input, item.querySelector('.card-sm-title')); };
    input.onkeydown = function(e){
      e.stopPropagation();
      if(e.key === 'Enter') input.blur();
      if(e.key === 'Escape') { input.value = oldName.replace(/\\.md$/i,''); input.blur(); }
    };
  };
  var addBtn = grid.querySelector('.add-card');
  if(addBtn) addBtn.after(card);
  else grid.insertBefore(card, grid.firstChild);
  var badge = document.getElementById('activityBadge');
  if(badge) badge.textContent = grid.querySelectorAll('.card-sm:not(.add-card)').length;
}

async function createActivityFile() {
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  if(window.__IFTO_createFile) {
    var ok = await window.__IFTO_createFile(ACTIVITY_FOLDER, fn, '- [ ] \\n');
    if(ok) {
      prependActivityCard(ts, fn);
      // Prepend to order file so re-render keeps it at the top
      if(window.__IFTO_readListOrder) {
        try {
          var order = await window.__IFTO_readListOrder(ACTIVITY_FOLDER);
          if(order && order.length > 0) {
            order.unshift(fn);
            if(window.__IFTO_writeListOrder) window.__IFTO_writeListOrder(ACTIVITY_FOLDER, order);
          }
        } catch(e) {}
      }
    }
  }
}

// Initialize todo & activity
try { renderTodo(); } catch(e){console.error('IFTO: init todo error',e)}
try { renderActivity(); } catch(e){console.error('IFTO: init activity error',e)}

// ====== Project ======
// Reads all .md files recursively under projectBase, categorizes by frontmatter["status"]
// Drag & drop updates the frontmatter field instead of moving files

function getProjectColTitle(folderName) {
  return folderName.replace(/^\\d+-/, '');
}

function matchProjectStatus(status, colKey) {
  var title = getProjectColTitle(colKey);
  return status === colKey || status === title;
}

// ====== Folder Card Expand/Collapse ======
function toggleProjectFolder(headerEl) {
  var card = headerEl.closest('.project-folder-card');
  if(!card) return;
  var body = card.querySelector('.project-folder-body');
  var toggle = headerEl.querySelector('.folder-toggle');
  if(!body) return;
  body.classList.toggle('open');
  if(toggle) toggle.textContent = body.classList.contains('open') ? '\u25BC' : '\u25B6';
}

// ====== Create New Project Folder ======
async function createProjectFolder() {
  var pBase = getProjectBase();
  var items = (typeof window.__IFTO_listFolderContents === 'function')
    ? await window.__IFTO_listFolderContents(pBase) : [];
  var folders = items.filter(function(i){ return i.isFolder; });
  var maxN = 0;
  for(var i=0;i<folders.length;i++) {
    var m = folders[i].name.match(/^\u672A\u547D\u540D\u9879\u76EE(\\d+)/);
    if(m) { var n = parseInt(m[1],10); if(n>maxN) maxN=n; }
  }
  var name = '\u672A\u547D\u540D\u9879\u76EE' + (maxN+1);
  var fullPath = pBase + '/' + name;
  if(window.__IFTO_createFolder) {
    var ok = await window.__IFTO_createFolder(fullPath);
    if(ok) { showToast('\u5DF2\u521B\u5EFA\u9879\u76EE: '+name); renderProject(); }
    else { showToast('\u521B\u5EFA\u5931\u8D25\u6216\u5DF2\u5B58\u5728'); }
  }
}

// ====== Create New Task in Project Root ======
async function createProjectTask() {
  var pBase = getProjectBase();
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.shortcutTaskTemplate || '';
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var content = '';
  if(tpl && window.__IFTO_readFile) {
    content = (await window.__IFTO_readFile(tpl)) || '';
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  // Ensure frontmatter has status: \u672A\u5F00\u59CB
  var fmMatch = content.match(/^---\\n[\\s\\S]*?\\n---/);
  if(fmMatch) {
    if(!fmMatch[0].match(/^status:/m)) {
      content = content.replace(/^---\\n/, '---\\nstatus: \u672A\u5F00\u59CB\\n');
    }
  } else {
    content = '---\\nstatus: \u672A\u5F00\u59CB\\n---\\n' + (content || '# \\n\\n## \u4EFB\u52A1\u63CF\u8FF0\\n\\n## \u5B8C\u6210\u6807\u51C6\\n\\n');
  }
  if(window.__IFTO_createFile) {
    var ok = await window.__IFTO_createFile(pBase, fn, content);
    if(ok) {
      renderProject();
      if(window.__IFTO_openFile) await window.__IFTO_openFile(pBase+'/'+fn);
    }
  }
}

// ====== Create Activity from PROJECT Section ======
async function createProjectActivity() {
  var now=new Date();
  var ts=now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn=ts+'.md';
  if(window.__IFTO_createFile){
    var ok=await window.__IFTO_createFile(ACTIVITY_FOLDER, fn, '- [ ] \\n');
    if(ok){
      prependActivityCard(ts, fn);
      if(window.__IFTO_openFile) window.__IFTO_openFile(ACTIVITY_FOLDER+'/'+fn);
    }
  }
}

// Helper: get frontmatter status for project files
function _projectFileStatus(fm, pCols) {
  var status = (fm && fm['status']) || '';
  for(var ci=0;ci<pCols.length;ci++) {
    if(matchProjectStatus(status, pCols[ci])) return pCols[ci];
  }
  return pCols[0] || '';
}

// Parse a due date string and return {cls, text} for badge rendering
function formatDueDate(dueStr) {
  if(!dueStr) return null;
  var s = dueStr.replace(/[\u5E74\u6708]/g,'-').replace(/[\u65E5\u53F7]/g,'').replace(/[\\/\\.]/g,'-').replace(/\\s+/g,'').trim();
  // Handle compact YYYYMMDD
  if(/^\\d{8}$/.test(s)) s = s.substring(0,4)+'-'+s.substring(4,6)+'-'+s.substring(6,8);
  var dt = new Date(s);
  if(isNaN(dt.getTime())) {
    // Try other parsers
    var parts = s.split('-');
    if(parts.length === 3) dt = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
  }
  if(isNaN(dt.getTime())) return {cls:'', text:dueStr};

  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var target = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  var diff = Math.floor((target.getTime() - today.getTime()) / 86400000);

  var cls, label;
  if(diff < 0) { cls = 'overdue'; label = '\u5DF2\u8FC7\u671F' + Math.abs(diff) + '\u5929'; }
  else if(diff === 0) { cls = 'today'; label = '\u4ECA\u5929\u5230\u671F'; }
  else if(diff <= 3) { cls = 'upcoming'; label = '\u8FD8\u6709' + diff + '\u5929'; }
  else { cls = 'future'; label = dueStr; }

  return {cls: 'pc-date-badge '+cls, text: label};
}

// Render the body of the middle column when in \u8349\u7A3F\u7BB1 (draft) view.
// Reads the draft folder (default 100-\u5DE5\u4F5C\u53F0WORKDESK/110-\u8349\u7A3F\u7BB1), lists its
// subfolders + files, and renders them in the same kanban-card style as the
// normal project columns.
async function _renderDraftColumnBody() {
  var dBase = getDraftFolder();
  if(typeof window.__IFTO_listFolderContents !== 'function') {
    return '<div class="project-empty">\u8349\u7A3F\u7BB1\u4E0D\u53EF\u7528</div>';
  }
  var contents = await window.__IFTO_listFolderContents(dBase);
  var subFolders = contents.filter(function(i){ return i.isFolder; }).map(function(i){ return i.name; });
  subFolders.sort();

  // Recursively gather all files under the draft folder
  var allFiles = (typeof window.__IFTO_getFilesFrontmatterRecursive === 'function')
    ? await window.__IFTO_getFilesFrontmatterRecursive(dBase) : [];

  // Group files: top-level files go to root, files inside subfolders are
  // grouped by their top-level folder (matches project-column logic).
  var folderMap = {};
  var rootFiles = [];
  for(var fi=0;fi<allFiles.length;fi++) {
    var f = allFiles[fi];
    var slashIdx = f.name.indexOf('/');
    if(slashIdx === -1) {
      rootFiles.push(f);
    } else {
      var folName = f.name.substring(0, slashIdx);
      var relPath = f.name.substring(slashIdx + 1);
      if(!folderMap[folName]) folderMap[folName] = [];
      folderMap[folName].push({ name: f.name, relPath: relPath, fm: f.fm });
    }
  }

  var html = '';

  // Root-level draft files
  for(var ri=0;ri<rootFiles.length;ri++) {
    var rf = rootFiles[ri];
    var rnm = rf.name.replace(/\\.md$/i,'');
    var dueInfo = formatDueDate(rf.fm && (rf.fm['due'] || rf.fm['\u622A\u6B62'] || rf.fm['\u622A\u6B62\u65F6\u95F4'] || rf.fm['end_time'] || rf.fm['endTime'] || ''));
    html += '<div class="project-card" draggable="true" data-path="'+dBase+'/'+rf.name+'">'+
      '<span class="pc-title">'+rnm+'</span>'+
      (dueInfo ? '<span class="'+dueInfo.cls+'">'+dueInfo.text+'</span>' : '')+
    '</div>';
  }

  // Subfolders as project-folder-cards
  var hasAnyFolderContent = false;
  for(var folIdx=0;folIdx<subFolders.length;folIdx++) {
    var folName = subFolders[folIdx];
    var folFiles = folderMap[folName] || [];
    if(folFiles.length === 0) continue;
    hasAnyFolderContent = true;

    html += '<div class="project-folder-card" data-folder="'+dBase+'/'+folName+'">';
    html += '<div class="project-folder-header" draggable="true" data-path="'+dBase+'/'+folName+'" onclick="toggleProjectFolder(this)">';
    html += '<span class="folder-toggle">\u25B6</span>';
    html += '<span class="project-folder-name">'+folName+'</span>';
    html += '<span class="project-folder-count">'+folFiles.length+'\u4E2A\u4EFB\u52A1</span>';
    html += '</div>';
    html += '<div class="project-folder-body">';

    // Group files within folder by their immediate subdir
    var subGroups = {};
    for(var sfi=0;sfi<folFiles.length;sfi++) {
      var sf = folFiles[sfi];
      var subPath = sf.relPath;
      var subDir = '';
      var fileName;
      var subSlash = subPath.lastIndexOf('/');
      if(subSlash >= 0) {
        subDir = subPath.substring(0, subSlash);
        fileName = subPath.substring(subSlash + 1);
      } else {
        fileName = subPath;
      }
      if(!subGroups[subDir]) subGroups[subDir] = [];
      subGroups[subDir].push({
        name: fileName,
        fullPath: dBase+'/'+sf.name,
        fm: sf.fm
      });
    }

    var subdirNames = Object.keys(subGroups).sort();
    for(var sdi=0;sdi<subdirNames.length;sdi++) {
      var sd = subdirNames[sdi];
      var sFiles = subGroups[sd];
      if(sd) {
        html += '<div class="project-subfolder">'+sd+'/</div>';
      }
      for(var fi2=0;fi2<sFiles.length;fi2++) {
        var fileItem = sFiles[fi2];
        var fileNm = fileItem.name.replace(/\\.md$/i,'');
        var fileDueInfo = formatDueDate(fileItem.fm && (fileItem.fm['due'] || fileItem.fm['\u622A\u6B62'] || fileItem.fm['\u622A\u6B62\u65F6\u95F4'] || fileItem.fm['end_time'] || fileItem.fm['endTime'] || ''));
        html += '<div class="project-file-item" draggable="true" data-path="'+fileItem.fullPath+'" data-folder="'+dBase+'/'+folName+'">'+
          '<span class="pc-title">\u{1F4C4} '+fileNm+'</span>'+
          (fileDueInfo ? '<span class="'+fileDueInfo.cls+'">'+fileDueInfo.text+'</span>' : '')+
        '</div>';
      }
    }

    html += '</div>'; // project-folder-body
    html += '</div>'; // project-folder-card
  }

  if(rootFiles.length === 0 && !hasAnyFolderContent) {
    html += '<div class="project-empty">\u8349\u7A3F\u7BB1\u4E3A\u7A7A</div>';
  }

  return html;
}

// Check whether a file's frontmatter marks it as \u63A8\u8FDB\u4E2D (status=\u63A8\u8FDB\u4E2D, with
// optional number prefix like "122-\u63A8\u8FDB\u4E2D").
function _isProgressFileFm(fm) {
  var status = (fm && fm['status']) || '';
  if(!status) return false;
  return status === '\u63A8\u8FDB\u4E2D' || /^\\d+-\u63A8\u8FDB\u4E2D$/.test(status);
}

// Copy a single .md file to a target folder. If a file with the same name
// exists, append a timestamp suffix to avoid overwriting. Returns the final
// name written, or null on failure.
async function _copySingleFileToDraft(srcPath, dstFolder) {
  if(!window.__IFTO_readFile || !window.__IFTO_createFile) return null;
  var fileName = srcPath.split('/').pop();
  var content = await window.__IFTO_readFile(srcPath);
  if(content === null || content === undefined) return null;
  // If a file with the same name exists, add a timestamp suffix
  var finalName = fileName;
  if(window.__IFTO_listFolderContents) {
    try {
      var existing = await window.__IFTO_listFolderContents(dstFolder);
      var taken = {};
      for(var ei=0;ei<existing.length;ei++) taken[existing[ei].name] = true;
      if(taken[fileName]) {
        var stem = fileName.replace(/\\.md$/i, '');
        var n = new Date();
        var ts = '_'+n.getFullYear()+
          String(n.getMonth()+1).padStart(2,'0')+
          String(n.getDate()).padStart(2,'0')+'_'+
          String(n.getHours()).padStart(2,'0')+
          String(n.getMinutes()).padStart(2,'0')+
          String(n.getSeconds()).padStart(2,'0');
        finalName = stem + ts + '.md';
      }
    } catch(_) {}
  }
  var ok = await window.__IFTO_createFile(dstFolder, finalName, content);
  return ok ? finalName : null;
}

// Handle a drop on the \u8349\u7A3F\u7BB1 toggle. Path may be a single .md file or a
// folder. Files are COPIED (never moved) so the user can edit the drafts
// without touching the originals.
async function _handleDraftDrop(rawPath) {
  if(!rawPath) { showToast('\u65E0\u6CD5\u8BC6\u522B\u62D6\u62FD\u5185\u5BB9'); return; }
  var path = rawPath;
  // Normalize
  try { path = decodeURIComponent(path); } catch(_) {}
  path = path.replace(/\\\\/g, '/');
  if(path.indexOf('obsidian://') !== -1) {
    var fm = path.match(/[?&]file=([^&]+)/);
    if(fm) path = decodeURIComponent(fm[1]);
  }
  if(path.startsWith('file:///')) path = path.substring(8);
  else if(path.startsWith('file://')) path = path.substring(7);
  while(path.startsWith('/')) path = path.substring(1);
  // Bare name \u2014 try to find in vault
  if(path.indexOf('/') === -1 && path.length > 0) {
    if(window.__IFTO_findItemByName) {
      var found = await window.__IFTO_findItemByName(path);
      if(found && found.path) {
        path = found.path;
      } else {
        showToast('\u672A\u627E\u5230\u300C' + path + '\u300D\u5728\u5E93\u4E2D\u7684\u4F4D\u7F6E');
        return;
      }
    } else {
      showToast('\u65E0\u6CD5\u8BC6\u522B\u8DEF\u5F84');
      return;
    }
  }
  if(!window.__IFTO_createFile) {
    showToast('\u8349\u7A3F\u7BB1\u4E0D\u53EF\u7528');
    return;
  }

  var dBase = getDraftFolder();
  var isFolder = !path.endsWith('.md');
  var pBase = getProjectBase();

  if(isFolder) {
    // ---- FOLDER DROP ----
    // Copy \u63A8\u8FDB\u4E2D files (preserving subdirectory structure) into a same-named
    // folder under the draft box.
    var folderName = path.split('/').pop();
    var targetFolder = dBase + '/' + folderName;
    if(window.__IFTO_createFolder) {
      await window.__IFTO_createFolder(targetFolder);
    }
    if(!window.__IFTO_getFilesFrontmatterRecursive) {
      showToast('\u8349\u7A3F\u7BB1\u4E0D\u652F\u6301\u9012\u5F52\u590D\u5236');
      return;
    }
    var allFiles = await window.__IFTO_getFilesFrontmatterRecursive(path);
    var copied = 0;
    var skipped = 0;
    for(var fi=0;fi<allFiles.length;fi++) {
      var f = allFiles[fi];
      if(!_isProgressFileFm(f.fm)) { skipped++; continue; }
      var relPath = f.name; // e.g. "subdir/file.md"
      var srcFull = path + '/' + relPath;
      var dstFull = targetFolder + '/' + relPath;
      var dstDir = dstFull.substring(0, dstFull.lastIndexOf('/'));
      // Ensure intermediate folders exist
      if(window.__IFTO_createFolder && dstDir !== targetFolder) {
        var built = targetFolder;
        var subParts = relPath.split('/');
        for(var spi=0; spi<subParts.length-1; spi++) {
          built += '/' + subParts[spi];
          await window.__IFTO_createFolder(built);
        }
      }
      var written = await _copySingleFileToDraft(srcFull, dstDir);
      if(written) copied++;
    }
    showToast('\u5DF2\u590D\u5236 ' + copied + ' \u4E2A\u63A8\u8FDB\u4E2D\u6587\u4EF6\u5230\u8349\u7A3F\u7BB1/' + folderName +
              (skipped ? '\uFF08\u8DF3\u8FC7 ' + skipped + ' \u4E2A\u975E\u63A8\u8FDB\u4E2D\u6587\u4EF6\uFF09' : ''));
  } else {
    // ---- SINGLE FILE DROP ----
    // Find the project folder the file belongs to (first subfolder under
    // projectBase). Create a same-named project folder in the draft box and
    // place the copy inside. Files at the project base root, or outside
    // projectBase, go straight into the draft box.
    var projectLeaf = null;
    if(path.indexOf(pBase + '/') === 0) {
      var afterBase = path.substring(pBase.length + 1);
      var firstSlash = afterBase.indexOf('/');
      if(firstSlash > 0) projectLeaf = afterBase.substring(0, firstSlash);
    } else {
      // Outside project base \u2014 use the immediate parent folder name
      var parentPath2 = path.substring(0, path.lastIndexOf('/'));
      projectLeaf = parentPath2.split('/').pop();
    }
    var targetFolder = projectLeaf ? dBase + '/' + projectLeaf : dBase;
    if(projectLeaf && window.__IFTO_createFolder) {
      await window.__IFTO_createFolder(targetFolder);
    }
    var written = await _copySingleFileToDraft(path, targetFolder);
    if(written) {
      var displayFolder = projectLeaf ? '\u8349\u7A3F\u7BB1/' + projectLeaf : '\u8349\u7A3F\u7BB1';
      showToast('\u5DF2\u590D\u5236\u5230 ' + displayFolder + '/' + written);
    } else {
      showToast('\u590D\u5236\u5931\u8D25');
    }
  }

  // Switch to draft view so the user can see the result
  projectMiddleView = 'draft';
  if(typeof path === 'string' && path) {
    console.log('[IFTO] \u62D6\u62FD\u5230\u8349\u7A3F\u7BB1: src="' + path + '" \u76EE\u6807=' + dBase);
  }
  renderProject();
}

async function renderProject() {
  // Concurrency guard: if a render is already in flight, queue another
  if (window.__ifto_renderProjectBusy) {
    window.__ifto_renderProjectQueued = true;
    return;
  }
  window.__ifto_renderProjectBusy = true;
  window.__ifto_renderProjectQueued = false;
  try {
    // Clean up any orphaned rename inputs before re-render
    (function(){
      document.querySelectorAll('.todo-inline-edit').forEach(function(oi){
        var els = oi.parentNode ? Array.from(oi.parentNode.children) : [];
        for(var ei=0;ei<els.length;ei++) {
          if(els[ei] !== oi && els[ei].style && els[ei].style.display === 'none') els[ei].style.display = '';
        }
        oi.remove();
      });
    })();

    var cols = document.getElementById('projectCols');
    if(!cols) return;

    // Save folder expand/collapse states before re-render (per column)
    (function(){
      var states = [];
      cols.querySelectorAll('.project-folder-card[data-folder]').forEach(function(card){
        var body = card.querySelector('.project-folder-body');
        if(body && body.classList.contains('open')){
          var colEl = card.closest('.project-col');
          var colIdx = colEl ? colEl.getAttribute('data-col') : '';
          states.push(card.getAttribute('data-folder') + '||' + colIdx);
        }
      });
      window.__ifto_folderState = states;
    })();
    var pBase = getProjectBase();
    var pCols = getProjectCols();

    // Get all project folders (subdirectories of projectBase, excluding status columns)
    var contents = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(pBase) : [];
    var statusFolderMap = {};
    for(var sci=0;sci<pCols.length;sci++) statusFolderMap[pCols[sci]] = true;
    var projectFolders = contents.filter(function(i){
      return i.isFolder && !statusFolderMap[i.name];
    }).map(function(i){ return i.name; });
    projectFolders.sort();

    // Get all files recursively from projectBase with frontmatter
    var allFiles = (typeof window.__IFTO_getFilesFrontmatterRecursive === 'function')
      ? await window.__IFTO_getFilesFrontmatterRecursive(pBase) : [];

    // Group files by top-level folder vs root
    var folderMap = {};
    var rootFiles = [];
    for(var fi=0;fi<allFiles.length;fi++) {
      var f = allFiles[fi];
      var slashIdx = f.name.indexOf('/');
      if(slashIdx === -1) {
        rootFiles.push(f);
      } else {
        var folName = f.name.substring(0, slashIdx);
        var relPath = f.name.substring(slashIdx + 1);
        if(!folderMap[folName]) folderMap[folName] = [];
        folderMap[folName].push({ name: f.name, relPath: relPath, fm: f.fm });
      }
    }

    // Group root files by status
    var rootByStatus = {};
    for(var ci=0;ci<pCols.length;ci++) rootByStatus[pCols[ci]] = [];
    for(var ri=0;ri<rootFiles.length;ri++) {
      var s = _projectFileStatus(rootFiles[ri].fm, pCols);
      if(rootByStatus[s]) rootByStatus[s].push(rootFiles[ri]);
      else if(pCols.length>0) rootByStatus[pCols[0]].push(rootFiles[ri]);
    }

    // Build column HTML
    var html = '';
    for(var ci=0;ci<pCols.length;ci++) {
      var colKey = pCols[ci];
      var colTitle = getProjectColTitle(colKey);
      var isMiddleCol = (colTitle === '\u63A8\u8FDB\u4E2D');

      html += '<div class="project-col" data-col="'+ci+'" data-status="'+colTitle+'">';

      // Middle column gets a view toggle: \u63A8\u8FDB\u4E2D <-> \u8349\u7A3F\u7BB1
      if(isMiddleCol) {
        html += '<div class="project-col-title project-col-title-toggle">'+
          '<span class="'+(projectMiddleView === 'draft' ? 'project-view-toggle' : 'project-view-active')+'" onclick="switchProjectMiddleView(\\'progress\\')">\u63A8\u8FDB\u4E2D</span>'+
          '<span class="project-view-sep">|</span>'+
          '<span class="'+(projectMiddleView === 'draft' ? 'project-view-active' : 'project-view-toggle project-view-drop')+'" data-draft-drop="1" title="\u62D6\u5165\u6587\u4EF6/\u6587\u4EF6\u5939\u53EF\u590D\u5236\u5230\u8349\u7A3F\u7BB1" onclick="switchProjectMiddleView(\\'draft\\')">\u8349\u7A3F\u7BB1</span>'+
        '</div>';
      } else {
        html += '<div class="project-col-title">'+colTitle+'</div>';
      }

      // Draft view replaces the normal column body for the middle column
      if(isMiddleCol && projectMiddleView === 'draft') {
        html += await _renderDraftColumnBody();
        html += '</div>'; // project-col
        continue;
      }

      // Root-level cards (files directly in projectBase, not in subfolders)
      var rootCol = rootByStatus[colKey] || [];
      for(var ri2=0;ri2<rootCol.length;ri2++) {
        var rf = rootCol[ri2];
        var rnm = rf.name.replace(/\\.md$/i,'');
        var rfStatus = _projectFileStatus(rf.fm, pCols);
        var rfCompleted = pCols.length > 0 && rfStatus === pCols[pCols.length - 1];
        var dueInfo = rfCompleted ? null : formatDueDate(rf.fm && (rf.fm['due'] || rf.fm['\u622A\u6B62'] || rf.fm['\u622A\u6B62\u65F6\u95F4'] || rf.fm['end_time'] || rf.fm['endTime'] || ''));
        html += '<div class="project-card" draggable="true" data-path="'+pBase+'/'+rf.name+'" data-status="'+colTitle+'">'+
          '<span class="pc-title">'+rnm+'</span>'+
          (dueInfo ? '<span class="'+dueInfo.cls+'">'+dueInfo.text+'</span>' : '')+
        '</div>';
      }

      // Project folder cards \u2014 show for each project folder, filtered by status
      var hasAnyFolderContent = false;
      for(var folIdx=0;folIdx<projectFolders.length;folIdx++) {
        var folName = projectFolders[folIdx];
        var folFiles = folderMap[folName] || [];

        // Filter files in this folder by current column's status
        var statusFiles = folFiles.filter(function(f){
          return _projectFileStatus(f.fm, pCols) === colKey;
        });

        // Always show folder in first column (even if empty), otherwise show only with content
        if(statusFiles.length === 0 && (colKey !== pCols[0] || folFiles.length > 0)) continue;
        hasAnyFolderContent = true;

        var folTitle = getProjectColTitle(folName);
        html += '<div class="project-folder-card" data-folder="'+pBase+'/'+folName+'">';
        html += '<div class="project-folder-header" draggable="true" data-path="'+pBase+'/'+folName+'" onclick="toggleProjectFolder(this)">';
        html += '<span class="folder-toggle">\u25B6</span>';
        html += '<span class="project-folder-name">'+folTitle+'</span>';
        html += '<span class="project-folder-count">'+statusFiles.length+'\u4E2A\u4EFB\u52A1</span>';
        html += '</div>';
        html += '<div class="project-folder-body">';

        if(statusFiles.length > 0) {
          // Group files within folder by subdirectory
          var subGroups = {};
          for(var sfi=0;sfi<statusFiles.length;sfi++) {
            var sf = statusFiles[sfi];
            var subPath = sf.relPath;
            var subDir = '';
            var fileName;
            var subSlash = subPath.lastIndexOf('/');
            if(subSlash >= 0) {
              subDir = subPath.substring(0, subSlash);
              fileName = subPath.substring(subSlash + 1);
            } else {
              fileName = subPath;
            }
            if(!subGroups[subDir]) subGroups[subDir] = [];
            subGroups[subDir].push({
              name: fileName,
              fullPath: pBase+'/'+sf.name,
              fm: sf.fm
            });
          }

          var subdirNames = Object.keys(subGroups).sort();
          for(var sdi=0;sdi<subdirNames.length;sdi++) {
            var sd = subdirNames[sdi];
            var sFiles = subGroups[sd];
            if(sd) {
              html += '<div class="project-subfolder">'+sd+'/</div>';
            }
            for(var fi2=0;fi2<sFiles.length;fi2++) {
              var fileItem = sFiles[fi2];
              var fileNm = fileItem.name.replace(/\\.md$/i,'');
              var fiStatus = _projectFileStatus(fileItem.fm, pCols);
              var fiCompleted = pCols.length > 0 && fiStatus === pCols[pCols.length - 1];
              var fileDueInfo = fiCompleted ? null : formatDueDate(fileItem.fm && (fileItem.fm['due'] || fileItem.fm['\u622A\u6B62'] || fileItem.fm['\u622A\u6B62\u65F6\u95F4'] || fileItem.fm['end_time'] || fileItem.fm['endTime'] || ''));
              html += '<div class="project-file-item" draggable="true" data-path="'+fileItem.fullPath+'" data-folder="'+pBase+'/'+folName+'">'+
                '<span class="pc-title">\u{1F4C4} '+fileNm+'</span>'+
                (fileDueInfo ? '<span class="'+fileDueInfo.cls+'">'+fileDueInfo.text+'</span>' : '')+
              '</div>';
            }
          }
        } else {
          html += '<div style="font-size:11px;color:var(--g4);padding:8px 8px 4px 16px">\u7A7A\u6587\u4EF6\u5939</div>';
        }

        html += '</div>'; // project-folder-body
        html += '</div>'; // project-folder-card
      }

      if(rootCol.length === 0 && !hasAnyFolderContent) {
        html += '<div class="project-empty">\u6682\u65E0\u6587\u4EF6</div>';
      }

      html += '</div>'; // project-col
    }

    // Archive drop zone on the right
    html += '<div class="project-archive-zone" id="projectArchiveZone">';
    html += '<div class="project-archive-drop" data-archive="1"><div class="project-archive-title">\u5F52\u6863</div>\u62D6\u62FD\u81F3\u6B64<br>\u5F52\u6863\u9879\u76EE</div>';
    html += '</div>';

    cols.innerHTML = html;
    // Restore folder expand/collapse states after re-render (per column)
    (function(){
      var saved = window.__ifto_folderState;
      if(!saved) return;
      saved.forEach(function(entry){
        var parts = entry.split('||');
        var folderPath = parts[0];
        var colIdx = parts[1] || '';
        var container = colIdx ? cols.querySelector('.project-col[data-col="' + colIdx + '"]') : cols;
        if(!container) container = cols;
        var card = container.querySelector('.project-folder-card[data-folder="' + folderPath + '"]');
        if(card){
          var body = card.querySelector('.project-folder-body');
          var toggle = card.querySelector('.folder-toggle');
          if(body){ body.classList.add('open'); if(toggle) toggle.textContent = '\\u25bc'; }
        }
      });
    })();
    wireProjectColumns(cols);
  } catch(e) { console.error('IFTO: renderProject error', e); }
  window.__ifto_renderProjectBusy = false;
  if (window.__ifto_renderProjectQueued) {
    window.__ifto_renderProjectQueued = false;
    renderProject();
  }
}

function wireProjectColumns(container) {
  // Wire \u8349\u7A3F\u7BB1 toggle as a drop target: dragging a file/folder onto the
  // "\u8349\u7A3F\u7BB1" label copies it (and its \u63A8\u8FDB\u4E2D contents if a folder) into the
  // draft box, then switches the view to show the result.
  container.querySelectorAll('.project-view-toggle[data-draft-drop]').forEach(function(toggle){
    toggle.ondragover = function(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
      this.classList.add('drag-over');
    };
    toggle.ondragleave = function(e){
      e.stopPropagation();
      this.classList.remove('drag-over');
    };
    toggle.ondrop = async function(e){
      e.preventDefault();
      e.stopPropagation();
      this.classList.remove('drag-over');
      var path = e.dataTransfer.getData('text/plain');
      if(!path) return;
      await _handleDraftDrop(path);
    };
  });

  // Wire project-card: Ctrl+Click to open, double-click to rename
  container.querySelectorAll('.project-card[draggable]').forEach(function(card){
    card.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      this.classList.add('dragging');
    };
    card.ondragend = function(){ this.classList.remove('dragging'); };
    card.onclick = function(e){
      if(e.ctrlKey || e.metaKey) {
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      }
    };
    card.ondblclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      // Remove any existing rename input in this card to prevent duplicates
      var _old = this.querySelector('.todo-inline-edit');
      if(_old) { var _t = _old.parentNode ? _old.parentNode.querySelector('.pc-title') : null; if(_t) _t.style.display=''; _old.onblur=null; _old.remove(); return; }
      var titleEl = this.querySelector('.pc-title');
      if(!titleEl) return;
      var oldPath = this.getAttribute('data-path');
      var oldName = oldPath.split('/').pop();
      var input = document.createElement('input');
      input.className = 'todo-inline-edit';
      input.value = titleEl.textContent;
      titleEl.style.display = 'none';
      titleEl.parentNode.insertBefore(input, titleEl);
      protectInlineEditInput(input);
      // Use setTimeout to ensure focus works after DOM update in Obsidian
      focusInlineEditInput(input);
      input.onblur = function(){
        var newName = input.value.trim();
        input.remove();
        titleEl.style.display = '';
        if(!newName || newName === oldName.replace(/\\.md$/i,'')) return;
        if(window.__IFTO_renameFile) {
          window.__IFTO_renameFile(oldPath, newName + '.md').then(function(ok){
            if(_isDraftPath(oldPath)) console.log('[IFTO] \u8349\u7A3F\u7BB1\u91CD\u547D\u540D: "' + oldPath + '" -> "' + newName + '.md" \u7ED3\u679C:', ok);
            if(ok) renderProject();
          });
        }
      };
      input.onkeydown = function(e){
        e.stopPropagation();
        if(e.key === 'Enter') { input.blur(); }
        if(e.key === 'Escape') { input.value = oldName.replace(/\\.md$/i,''); input.blur(); }
      };
    };
  });

  // Wire file items: Ctrl+Click to open, double-click to rename
  container.querySelectorAll('.project-file-item[draggable]').forEach(function(item){
    item.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      this.classList.add('dragging');
    };
    item.ondragend = function(){ this.classList.remove('dragging'); };
    item.onclick = function(e){
      e.stopPropagation();
      if(e.ctrlKey || e.metaKey) {
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      }
    };
    item.ondblclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      // Remove any existing rename input in this item to prevent duplicates
      var _old = this.querySelector('.todo-inline-edit');
      if(_old) { _old.onblur=null; this.innerHTML = _old._oldHtml || ''; return; }
      var oldPath = this.getAttribute('data-path');
      var oldName = oldPath.split('/').pop();
      var oldHtml = this.innerHTML;
      var input = document.createElement('input');
      input.className = 'todo-inline-edit';
      input._oldHtml = oldHtml;
      input.value = oldName.replace(/\\.md$/i,'');
      input.style.width = 'calc(100% - 20px)';
      this.innerHTML = '';
      this.appendChild(input);
      protectInlineEditInput(input);
      focusInlineEditInput(input);
      input.onblur = function(){
        var newName = input.value.trim();
        if(!newName || newName === oldName.replace(/\\.md$/i,'')) {
          item.innerHTML = oldHtml;
          return;
        }
        if(window.__IFTO_renameFile) {
          window.__IFTO_renameFile(oldPath, newName + '.md').then(function(ok){
            if(ok) renderProject();
            else item.innerHTML = oldHtml;
          });
        } else {
          item.innerHTML = oldHtml;
        }
      };
      input.onkeydown = function(e){
        e.stopPropagation();
        if(e.key === 'Enter') { input.blur(); }
        if(e.key === 'Escape') { input.value = oldName.replace(/\\.md$/i,''); input.blur(); }
      };
    };
  });

  // Double-click rename for folder headers
  container.querySelectorAll('.project-folder-header').forEach(function(header){
    header.ondblclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      // Remove any existing rename input in this header to prevent duplicates
      var _old = this.querySelector('.todo-inline-edit');
      if(_old) { var _n = _old.parentNode ? _old.parentNode.querySelector('.project-folder-name') : null; if(_n) _n.style.display=''; _old.onblur=null; _old.remove(); return; }
      var card = this.closest('.project-folder-card');
      if(!card) return;
      var oldPath = card.getAttribute('data-folder');
      if(!oldPath) return;
      var oldName = oldPath.split('/').pop();
      var nameEl = this.querySelector('.project-folder-name');
      if(!nameEl) return;
      var input = document.createElement('input');
      input.className = 'todo-inline-edit';
      input.value = nameEl.textContent;
      input.style.fontSize = '13px';
      input.style.fontWeight = '500';
      nameEl.style.display = 'none';
      nameEl.parentNode.insertBefore(input, nameEl.nextSibling);
      protectInlineEditInput(input);
      focusInlineEditInput(input);
      input.onblur = function(){
        var newName = input.value.trim();
        input.remove();
        nameEl.style.display = '';
        if(!newName || newName === oldName) return;
        if(window.__IFTO_renameFolder) {
          window.__IFTO_renameFolder(oldPath, newName).then(function(ok){
            if(ok) renderProject();
          });
        }
      };
      input.onkeydown = function(e){
        e.stopPropagation();
        if(e.key === 'Enter') { input.blur(); }
        if(e.key === 'Escape') { input.value = oldName; input.blur(); }
      };
    };
  });

  // Wire folder header drag \u2014 draggable to columns (update all files' status)
  container.querySelectorAll('.project-folder-header[draggable]').forEach(function(header){
    header.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      var srcCol = this.closest('.project-col');
      var srcStatus = srcCol ? (srcCol.getAttribute('data-status') || '') : '';
      if(srcCol) e.dataTransfer.setData('text/x-ifto-src-col', srcStatus);
      // Store in global as reliable fallback (dataTransfer custom types can be lost)
      window.__ifto_dragSrcStatus = srcStatus;
      console.log('[IFTO dragstart] FOLDER HEADER. path:', this.getAttribute('data-path'), 'srcStatus:', srcStatus);
      this.classList.add('dragging');
    };
    header.ondragend = function(){ this.classList.remove('dragging'); delete window.__ifto_dragSrcStatus; };
  });

  // Wire folder cards as drop targets (move file into folder + update status)
  container.querySelectorAll('.project-folder-card').forEach(function(fc){
    fc.ondragover = function(e){
      e.preventDefault();
      e.stopPropagation();
      this.classList.add('drag-over');
    };
    fc.ondragleave = function(){ this.classList.remove('drag-over'); };
    fc.ondrop = function(e){
      e.preventDefault();
      e.stopPropagation();
      this.classList.remove('drag-over');
      var path = e.dataTransfer.getData('text/plain');
      var targetFolder = this.getAttribute('data-folder');
      if(!path || !targetFolder) return;
      // Skip if already inside this folder, or if dropping folder onto itself
      if(path.indexOf(targetFolder + '/') === 0 || path === targetFolder) return;
      var col = this.closest('.project-col');
      var targetStatus = col ? col.getAttribute('data-status') : '';

      // Folder-to-folder: move folder into another folder
      if(window.__IFTO_moveFolder && !path.endsWith('.md')) {
        window.__IFTO_moveFolder(path, targetFolder).then(function(success){
          if(success) renderProject();
        });
        return;
      }

      // File-to-folder: move file and update status
      if(window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, targetFolder).then(function(success){
          if(success) {
            var fileName = path.split('/').pop();
            var newPath = targetFolder + '/' + fileName;
            if(targetStatus && window.__IFTO_updateFileFrontmatter) {
              window.__IFTO_updateFileFrontmatter(newPath, 'status', targetStatus).then(function(){ renderProject(); });
            } else {
              renderProject();
            }
          }
        });
      }
    };
  });

  // Wire column drop targets (update frontmatter status \u2014 supports file and folder drops)
  var _dropHandler = async function(e, col){
    var targetStatus = col.getAttribute('data-status');
    if(!targetStatus) return;

    // DEBUG: log drop event details
    console.log('[IFTO _dropHandler] targetStatus:', targetStatus, 'col data-col:', col.getAttribute('data-col'));

    // IMPORTANT: capture srcStatus SYNCHRONOUSLY before any await \u2014 dragend fires
    // after drop and clears window.__ifto_dragSrcStatus, and dataTransfer values
    // are not reliably readable after the first await on some platforms.
    var _capturedSrcStatus = '';
    try { _capturedSrcStatus = e.dataTransfer.getData('text/x-ifto-src-col') || ''; } catch(_ex){}
    if(!_capturedSrcStatus && window.__ifto_dragSrcStatus) _capturedSrcStatus = window.__ifto_dragSrcStatus;

    // Extract path from drag data \u2014 support multiple sources
    var path = '';
    try {
      // Try text/plain first (standard for Obsidian file explorer and internal IFTO drags)
      if(e.dataTransfer.getData('text/plain')) {
        path = e.dataTransfer.getData('text/plain');
      }
      // Try all other available types as fallback
      if(!path && e.dataTransfer.types) {
        for(var ti=0;ti<e.dataTransfer.types.length;ti++) {
          var t = e.dataTransfer.types[ti];
          try {
            var v = e.dataTransfer.getData(t);
            if(v && typeof v === 'string' && v.length > 0) {
              path = v;
              break;
            }
          } catch(ex) {}
        }
      }
    } catch(e2) { console.error('IFTO: drag data error', e2); }

    // Debug: show all available drag types and values
    var debugInfo = '\u539F\u59CB: ' + (path ? path.substring(0,120) : '(\u7A7A)');
    try {
      var typesList = [];
      if(e.dataTransfer.types) {
        for(var _ti=0;_ti<e.dataTransfer.types.length;_ti++) {
          try {
            var _tv = e.dataTransfer.getData(e.dataTransfer.types[_ti]);
            typesList.push(e.dataTransfer.types[_ti] + '=[' + (_tv ? _tv.substring(0,80) : '\u7A7A') + ']');
          } catch(ex) { typesList.push(e.dataTransfer.types[_ti] + '=(\u8BFB\u53D6\u5931\u8D25)'); }
        }
      }
      if(typesList.length > 0) debugInfo += ' | types: ' + typesList.join(', ');
    } catch(ex) {}
    // showToast(debugInfo); // \u8C03\u8BD5\u65F6\u53D6\u6D88\u6CE8\u91CA

    if(!path) { showToast('\u65E0\u6CD5\u8BC6\u522B\u62D6\u62FD\u5185\u5BB9'); return; }

    // Normalize path \u2014 handle obsidian:// URLs and various path formats
    try { path = decodeURIComponent(path); } catch(e3) {}
    path = path.replace(/\\\\/g, '/');

    // Handle obsidian://open?vault=xxx&file=path (used by Obsidian file explorer)
    if(path.indexOf('obsidian://') !== -1) {
      var fm = path.match(/[?&]file=([^&]+)/);
      if(fm) {
        path = decodeURIComponent(fm[1]);
      }
    }
    // Handle file:// URLs
    if(path.startsWith('file:///')) path = path.substring(8);
    else if(path.startsWith('file://')) path = path.substring(7);
    while(path.startsWith('/')) path = path.substring(1);

    var pBase = getProjectBase();
    var isInProject = path.indexOf(pBase + '/') === 0 || path === pBase;
    var isExternalDrag = false; // track if this came from outside the project

    // If path is just a name (no slashes), search vault for full path
    if(path.indexOf('/') === -1 && path.length > 0) {
      var foundItem = null;
      if(window.__IFTO_findItemByName) {
        foundItem = await window.__IFTO_findItemByName(path);
      }
      if(foundItem && foundItem.path) {
        path = foundItem.path;
        isInProject = path.indexOf(pBase + '/') === 0 || path === pBase;
        isExternalDrag = !isInProject;
        showToast('\u627E\u5230\u5B8C\u6574\u8DEF\u5F84: ' + path + (foundItem.isFolder ? ' (\u6587\u4EF6\u5939)' : ' (\u6587\u4EF6)'));
      } else {
        showToast('\u672A\u627E\u5230\u300C' + path + '\u300D\u5728\u5E93\u4E2D\u7684\u4F4D\u7F6E');
        return;
      }
    }

    if(!path.endsWith('.md')) {
      // EARLY GUARD: For folders already in the project, check if source column
      // matches target column. If same, this is a no-op drag \u2014 just refresh.
      // Also: dropping a \u8349\u7A3F\u7BB1 folder while the middle column is showing the
      // draft view is always a no-op \u2014 the user is dragging "in place" and we
      // must not move/delete the folder from \u8349\u7A3F\u7BB1.
      if(isInProject) {
        var _earlySrc = _capturedSrcStatus;
        if(_earlySrc && _earlySrc === targetStatus) {
          console.log('[IFTO _dropHandler] EARLY SAME-COLUMN GUARD: src="'+_earlySrc+'" target="'+targetStatus+'" \u2014 no-op');
          renderProject();
          return;
        }
      } else if(_isDraftPath(path) && projectMiddleView === 'draft') {
        console.log('[IFTO _dropHandler] DRAFT-VIEW NO-OP: folder="' + path + '" dropped in \u8349\u7A3F\u7BB1 view');
        renderProject();
        return;
      }
      // Folder drop \u2014 move into projectBase if not already there
      if(!isInProject && window.__IFTO_moveFolder && window.__IFTO_createFolder) {
        await window.__IFTO_createFolder(pBase);
        var moved = await window.__IFTO_moveFolder(path, pBase);
        if(!moved) {
          if(window.__IFTO_moveFolderByFiles) {
            moved = await window.__IFTO_moveFolderByFiles(path, pBase);
          }
        }
        if(!moved) {
          var parts = path.split('/');
          if(parts.length > 1) {
            var altPath = parts.slice(1).join('/');
            moved = await window.__IFTO_moveFolder(altPath, pBase);
            if(!moved && window.__IFTO_moveFolderByFiles) {
              moved = await window.__IFTO_moveFolderByFiles(altPath, pBase);
            }
            if(moved) path = altPath;
          }
        }
        if(moved) {
          var folderName = path.split('/').pop();
          path = pBase + '/' + folderName;
          isExternalDrag = true;
        }
      }
      // If folder move failed because target already exists, merge contents
      if(!isInProject && !moved && window.__IFTO_listFolderContents && window.__IFTO_moveFile) {
        var folderName = path.split('/').pop();
        var targetPath = pBase + '/' + folderName;
        var created = await window.__IFTO_createFolder(targetPath);
        if(!created) {
          // Target folder exists \u2014 merge files
          showToast('\u5408\u5E76\u6587\u4EF6\u5939: ' + folderName);
          try {
            var mergeOK = await (async function(){
              var mergeRec = async function(src, dst){
                var items = await window.__IFTO_listFolderContents(src);
                for(var mi=0;mi<items.length;mi++){
                  var it = items[mi];
                  var srcItem = src + '/' + it.name;
                  var dstItem = dst + '/' + it.name;
                  if(it.isFolder){
                    await window.__IFTO_createFolder(dstItem);
                    await mergeRec(srcItem, dstItem);
                  } else {
                    await window.__IFTO_moveFile(srcItem, dst);
                  }
                }
                // Clean up empty source folder
                try { await window.__IFTO_deleteFolder(src); } catch(e){}
              };
              await mergeRec(path, targetPath);
              return true;
            })();
            if(mergeOK){
              path = targetPath;
              moved = true;
              isExternalDrag = true;
              // \u5408\u5E76\u540E\u76F4\u63A5\u5237\u65B0\uFF0C\u4E0D\u6279\u91CF\u66F4\u65B0\u72B6\u6001\uFF0C\u907F\u514D\u5F71\u54CD\u539F\u6709\u7684\u6587\u4EF6
              renderProject();
              return;
            }
          } catch(e){
            console.error('IFTO: merge error', e);
            showToast('\u5408\u5E76\u5931\u8D25: ' + e.message);
          }
        }
      }
      // If all folder moves failed, maybe it's a file without .md extension (Obsidian URL strips it)
      if(!isInProject && !moved && path.indexOf('.') === -1) {
        var filePathMd = path + '.md';
        if(window.__IFTO_moveFile) {
          var fileMoved2 = await window.__IFTO_moveFile(filePathMd, pBase);
          if(!fileMoved2) {
            var parts2 = filePathMd.split('/');
            if(parts2.length > 1) {
              var altPath2 = parts2.slice(1).join('/');
              fileMoved2 = await window.__IFTO_moveFile(altPath2, pBase);
              if(fileMoved2) filePathMd = altPath2;
            }
          }
          if(fileMoved2) {
            path = pBase + '/' + filePathMd.split('/').pop();
            if(window.__IFTO_updateFileFrontmatter) {
              window.__IFTO_updateFileFrontmatter(path, 'status', targetStatus).then(function(success){ if(success) renderProject(); });
            }
            return;
          }
        }
      }
      // Update files inside the folder (only files from the source column)
      if(typeof window.__IFTO_getFilesFrontmatterRecursive !== 'function') { renderProject(); return; }
      var files = await window.__IFTO_getFilesFrontmatterRecursive(path);
      if(files.length === 0) { renderProject(); return; }
      // Use srcStatus captured synchronously at the start of the handler \u2014 by now
      // the dragend event has cleared window.__ifto_dragSrcStatus and dataTransfer
      // values may no longer be readable. Re-read defensively as a last-resort
      // fallback, but prefer the captured value.
      var srcStatus = _capturedSrcStatus;
      if(!srcStatus) {
        try { srcStatus = e.dataTransfer.getData('text/x-ifto-src-col') || ''; } catch(ex) {}
        if(!srcStatus && window.__ifto_dragSrcStatus) srcStatus = window.__ifto_dragSrcStatus;
      }
      // DEBUG
      console.log('[IFTO _dropHandler] FOLDER DROP. path:', path, 'targetStatus:', targetStatus, 'srcStatus:', srcStatus, 'isInProject:', isInProject);
      // Build key maps
      var _allCols = getProjectCols();
      var targetColKey = '', srcColKey = '';
      for(var _ci2=0;_ci2<_allCols.length;_ci2++) {
        var _ct = getProjectColTitle(_allCols[_ci2]);
        if(_ct === targetStatus) targetColKey = _allCols[_ci2];
        if(_ct === srcStatus) srcColKey = _allCols[_ci2];
      }
      console.log('[IFTO _dropHandler] allCols:', _allCols, 'targetColKey:', targetColKey, 'srcColKey:', srcColKey);
      // If source and target column are the same, nothing to do
      // Check both the mapped key AND the raw status string
      if((srcColKey && srcColKey === targetColKey) || (srcStatus && srcStatus === targetStatus)) {
        console.log('[IFTO _dropHandler] SAME COLUMN - skipping update');
        showToast('\u6587\u4EF6\u5939\u5DF2\u5728\u300C' + targetStatus + '\u300D\u5217');
        renderProject();
        return;
      }
      // BUG FIX: if we still don't have srcStatus for an internal drag, refuse to
      // touch files in non-source columns. Only allow the bulk "update all
      // non-target files" behavior for true external drags (folder originally
      // outside the project). This prevents collateral damage when dragging a
      // project folder card from one status column to another.
      var _isInternalProjectDrag = isInProject && !isExternalDrag;
      if(_isInternalProjectDrag && !srcColKey) {
        console.warn('[IFTO _dropHandler] srcColKey missing on internal drag \u2014 aborting bulk update to avoid moving non-source files');
        showToast('\u672A\u80FD\u8BC6\u522B\u6E90\u72B6\u6001\u5217\uFF0C\u5DF2\u53D6\u6D88\u6279\u91CF\u66F4\u65B0\u4EE5\u9632\u8BEF\u6539');
        renderProject();
        return;
      }
      // If no source column recorded (e.g. external drag), update all non-target files
      console.log('[IFTO _dropHandler] Proceeding to update files. srcColKey empty?', !srcColKey);
      var updatedCount = 0;
      for(var fi=0;fi<files.length;fi++) {
        var fullPath = path + '/' + files[fi].name;
        if(window.__IFTO_updateFileFrontmatter) {
          var currentCol = _projectFileStatus(files[fi].fm, _allCols);
          console.log('[IFTO _dropHandler] file:', files[fi].name, 'currentCol:', currentCol, 'targetColKey:', targetColKey, 'srcColKey:', srcColKey);
          if(currentCol === targetColKey) continue; // already in target
          if(srcColKey && currentCol !== srcColKey) continue; // not from source column, leave alone
          console.log('[IFTO _dropHandler] UPDATING file:', files[fi].name, 'from', currentCol, 'to', targetStatus);
          await window.__IFTO_updateFileFrontmatter(fullPath, 'status', targetStatus);
          updatedCount++;
        }
      }
      if(updatedCount > 0) showToast('\u5DF2\u66F4\u65B0 ' + updatedCount + ' \u4E2A\u6587\u4EF6\u7684\u72B6\u6001');
      else showToast('\u6587\u4EF6\u5939\u5DF2\u5728\u300C' + targetStatus + '\u300D\u5217\uFF0C\u65E0\u9700\u66F4\u65B0');
      renderProject();
      return;
    }

    // File drop
    var fileMoved = isInProject;
    if(!isInProject && window.__IFTO_moveFile && window.__IFTO_createFolder) {
      await window.__IFTO_createFolder(pBase);
      var moved = await window.__IFTO_moveFile(path, pBase);
      if(!moved) {
        var parts = path.split('/');
        if(parts.length > 1) {
          var altPath = parts.slice(1).join('/');
          moved = await window.__IFTO_moveFile(altPath, pBase);
          if(moved) path = altPath;
        }
      }
      if(moved) {
        path = pBase + '/' + path.split('/').pop();
        fileMoved = true;
      }
    }
    if(fileMoved && window.__IFTO_updateFileFrontmatter) {
      window.__IFTO_updateFileFrontmatter(path, 'status', targetStatus).then(function(success){ if(success) renderProject(); });
    } else {
      renderProject();
    }
  };

  // Store globally so the document-level drop listener always uses the latest version
  window.__ifto_dropHandler = _dropHandler;

  // Standard column-level drop handlers (works for internal IFTO drags)
  container.querySelectorAll('.project-col').forEach(function(col){
    col.ondragover = function(e){ e.preventDefault(); e.dataTransfer.dropEffect = 'move'; this.classList.add('drag-over'); };
    col.ondragleave = function(){ this.classList.remove('drag-over'); };
    col.ondrop = async function(e){
      e.preventDefault();
      // Skip if dropped on the \u8349\u7A3F\u7BB1 toggle \u2014 handled by its own drop handler
      if(e.target && e.target.closest && e.target.closest('.project-view-toggle[data-draft-drop]')) return;
      if(this.__dropHandled) return; // already processed by document handler
      // Allow folder header drags through for batch status update
      if(e.target && e.target.closest('.project-folder-card')) {
        var _dragP = e.dataTransfer.getData('text/plain');
        if(_dragP && _dragP.endsWith('.md')) return; // file drops handled by folder card
      }
      this.classList.remove('drag-over');
      this.__dropHandled = true;
      setTimeout(function(){ delete this.__dropHandled; }, 1000);
      await window.__ifto_dropHandler(e, this);
    };
  });

  // Document-level capture handlers to intercept Obsidian file explorer drags
  // Remove old listeners first to ensure fresh closure references
  if(window.__ifto_dragOverHandler) document.removeEventListener('dragover', window.__ifto_dragOverHandler, true);
  if(window.__ifto_dropListener) document.removeEventListener('drop', window.__ifto_dropListener, true);

  window.__ifto_dragOverHandler = function(e){
    var cols = document.getElementById('projectCols');
    if(cols && cols.contains(e.target)) {
      e.preventDefault();
      if(e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    }
  };
  window.__ifto_dropListener = async function(e){
    var cols = document.getElementById('projectCols');
    if(!cols || !cols.contains(e.target)) return;
    // Skip if dropped on the \u8349\u7A3F\u7BB1 toggle \u2014 handled by its own drop handler
    if(e.target.closest && e.target.closest('.project-view-toggle[data-draft-drop]')) return;
    var col = e.target.closest('.project-col');
    if(!col) return;
    // Allow folder header drags through for batch status update
    if(e.target.closest('.project-folder-card')) {
      var _dp2 = e.dataTransfer.getData('text/plain');
      if(_dp2 && _dp2.endsWith('.md')) return;
    }
    // Avoid double-handling if column handler already got it
    if(col.__dropHandled) return;
    console.log('[IFTO doc drop] target col status:', col.getAttribute('data-status'), 'path:', e.dataTransfer.getData('text/plain'));
    e.preventDefault();
    e.stopPropagation();
    col.classList.remove('drag-over');
    col.__dropHandled = true;
    setTimeout(function(){ delete col.__dropHandled; }, 1000);
    // Use global reference to always get the latest _dropHandler
    if(window.__ifto_dropHandler) await window.__ifto_dropHandler(e, col);
  };
  document.addEventListener('dragover', window.__ifto_dragOverHandler, true);
  document.addEventListener('drop', window.__ifto_dropListener, true);

  // Wire archive drop zone
  var archiveZone = document.getElementById('projectArchiveZone');
  if(archiveZone) {
    var archiveDrop = archiveZone.querySelector('.project-archive-drop');
    if(archiveDrop) {
      archiveDrop.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      archiveDrop.ondragleave = function(){ this.classList.remove('drag-over'); };
      archiveDrop.ondrop = function(e){
        e.preventDefault();
        this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        if(!path) return;
        var s2 = window.__IFTO_SETTINGS || {};
var archiveRoot = s2.archivePath || '500-\u5F52\u6863\u8D44\u6599/510-\u5F52\u6863\u9879\u76EE';

        // Folder drop \u2014 archive only completed files, not the whole folder
        if(!path.endsWith('.md')) {
          if(!window.__IFTO_listFolderContents || !window.__IFTO_readFile || !window.__IFTO_createFolder) return;
          var folderName = path.split('/').pop();
          var targetDir = archiveRoot + '/' + folderName;

          (async function(){
            // Recursively scan folder: find files with "status: \u5DF2\u5B8C\u6210"
            var completedFiles = [];
            var hasIncomplete = false;

            var scanFolder = async function(dir){
              var contents = await window.__IFTO_listFolderContents(dir);
              for(var si=0;si<contents.length;si++){
                var item = contents[si];
                var itemPath = dir + '/' + item.name;
                if(item.isFolder){
                  await scanFolder(itemPath);
                } else if(item.name.endsWith('.md')){
                  var content = await window.__IFTO_readFile(itemPath);
                  // Parse frontmatter for status
                  var fm = content.match(/^---\\n([\\s\\S]*?)\\n---/);
                  var status = '';
                  if(fm){
                    var lines = fm[1].split('\\n');
                    for(var li=0;li<lines.length;li++){
                      var kv = lines[li].match(/^\\s*([^:]+?)\\s*:\\s*(.+)/);
                      if(kv && kv[1].trim() === 'status'){
                        status = kv[2].trim().replace(/^['"]|['"]$/g, '');
                        break;
                      }
                    }
                  }
                  if(status === '\u5DF2\u5B8C\u6210'){
                    completedFiles.push({
                      fullPath: itemPath,
                      relPath: itemPath.substring(path.length + 1)
                    });
                  } else {
                    hasIncomplete = true; // includes \u672A\u5F00\u59CB, \u63A8\u8FDB\u4E2D, or no status
                  }
                }
              }
            };

            try {
              await scanFolder(path);
            } catch(e){
              console.error('IFTO: archive scan error', e);
              showToast('\u5F52\u6863\u626B\u63CF\u5931\u8D25');
              renderProject();
              return;
            }

            if(completedFiles.length === 0){
              showToast('\u6587\u4EF6\u5939\u4E2D\u6CA1\u6709\u5DF2\u5B8C\u6210\u6587\u4EF6');
              renderProject();
              return;
            }

            await window.__IFTO_createFolder(targetDir);
            var movedCount = 0;

            for(var ci=0;ci<completedFiles.length;ci++){
              var cf = completedFiles[ci];
              var lastSlash = cf.relPath.lastIndexOf('/');
              var fileTargetDir = targetDir;

              // Maintain subfolder structure in archive
              if(lastSlash >= 0){
                var subDir = cf.relPath.substring(0, lastSlash);
                fileTargetDir = targetDir + '/' + subDir;
                await window.__IFTO_createFolder(fileTargetDir);
              }

              if(window.__IFTO_moveFile){
                var ok = await window.__IFTO_moveFile(cf.fullPath, fileTargetDir);
                if(ok) movedCount++;
              }
            }

            if(movedCount > 0){
              showToast('\u5DF2\u5F52\u6863 ' + movedCount + ' \u4E2A\u5DF2\u5B8C\u6210\u6587\u4EF6' + (hasIncomplete ? '\uFF0C\u672A\u5F00\u59CB/\u63A8\u8FDB\u4E2D\u7684\u7559\u5728\u539F\u5904' : ''));
              // If all files were archived, clean up empty folder
              if(!hasIncomplete){
                try { await window.__IFTO_deleteFolder(path); } catch(e){}
              }
            } else {
              showToast('\u5F52\u6863\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5');
            }
            renderProject();
          })();
          return;
        }

        // File drop \u2014 archive individual .md file
        if(!window.__IFTO_createFolder || !window.__IFTO_moveFile) return;
        var pBase = getProjectBase();
        // Compute relative path to determine project subfolder
        var relPath = path.substring(pBase.length + 1);
        var slashIdx = relPath.indexOf('/');
        var targetFolder = archiveRoot;
        if(slashIdx > -1) {
          // File is inside a project subfolder \u2014 use that as archive subfolder name
          var projName = relPath.substring(0, slashIdx);
          targetFolder = archiveRoot + '/' + projName;
        }
        // Create target folder (if subfolder, creates recursively) then move file
        window.__IFTO_createFolder(targetFolder).then(function(){
          window.__IFTO_moveFile(path, targetFolder).then(function(ok){ if(ok) renderProject(); });
        });
      };
    }
  }
}

// Initialize project
try { renderProject(); } catch(e){console.error('IFTO: init project error',e)}

// ====== Note ======
// getBookFolder() and getPaperFolder() are now read from settings via getBookFolder()/getPaperFolder()
var NOTE_TABS = ['reading', 'read', 'paper'];
var noteTab = 'reading';
var paperQuery = ''; // search query for paper tab

function getNoteTabDisplay(tab) {
  return tab === 'reading' ? '\u6B63\u5728\u9605\u8BFB' : tab === 'read' ? '\u5DF2\u8BFB\u4E66\u76EE' : '\u5DF2\u8BFB\u6587\u732E';
}

async function renderNote() {
  try {
    var grid = document.getElementById('noteGrid');
    if(!grid) return;

    // Update sidebar active state
    document.querySelectorAll('#noteSidebar .note-item').forEach(function(item){
      item.classList.toggle('active', item.getAttribute('data-tab') === noteTab);
    });

    if(noteTab === 'paper') {
      // Load papers (no status filter)
      var all = (typeof window.__IFTO_getFilesFrontmatterRecursive === 'function')
        ? await window.__IFTO_getFilesFrontmatterRecursive(getPaperFolder()) : [];

      // Filter by search query across all frontmatter fields
      if(paperQuery) {
        var q = paperQuery.toLowerCase();
        all = all.filter(function(item){
          var fm = item.fm;
          for(var k in fm) {
            if(String(fm[k]).toLowerCase().indexOf(q) >= 0) return true;
          }
          return false;
        });
      }

      if(all.length === 0) {
        grid.innerHTML = '<div class="note-search"><input class="paper-search-input" id="paperSearchInput" type="text" placeholder="\u68C0\u7D22\u4F5C\u8005\u3001\u65E5\u671F\u3001\u53D1\u8868\u3001\u5173\u952E\u8BCD..." value="'+paperQuery+'"></div><div class="note-empty">\u6682\u65E0\u6587\u732E</div>';
        wirePaperSearch();
        return;
      }
      var html = '<div class="note-search"><input class="paper-search-input" id="paperSearchInput" type="text" placeholder="\u68C0\u7D22\u4F5C\u8005\u3001\u65E5\u671F\u3001\u53D1\u8868\u3001\u5173\u952E\u8BCD..." value="'+paperQuery+'"></div>';
      for(var i=0;i<all.length;i++) {
        var f = all[i].fm;
        var nm = all[i].name.replace(/\\.md$/i,'');
        // Support multiple possible field names
        var title = f.title || f.Title || f.\u9898\u76EE || nm;
        var author = f.author || f.Author || f.authors || f.Authors || f.\u4F5C\u8005 || '';
        var journal = f.journal || f.Journal || f.publication || f.Publication || f.\u53D1\u8868 || f.source || f.Source || '';
        var date = f.date || f.Date || f.year || f.Year || f.\u65E5\u671F || f.published || f.Published || '';
        // Parse keywords: extract #tag from text fields like \u5173\u952E\u8BCD/keywords
        var kwText = f.\u5173\u952E\u8BCD || f.keywords || f.Keywords || f.tags || f.Tags || '';
        var kwTags = [];
        var kwRe = /#([^\\s,#]+)/g;
        var kwMatch;
        while ((kwMatch = kwRe.exec(kwText)) !== null) {
          var t = kwMatch[1].trim();
          if(t) kwTags.push(t);
        }
        html += '<div class="note-card note-card-paper" data-path="'+getPaperFolder()+'/'+all[i].name+'">'+
          '<span class="nci-title">'+title+'</span>'+
          '<div class="nci-detail">'+
            (author?'<span class="nci-row"><span class="nci-label">\u4F5C\u8005</span><span>'+author+'</span></span>':'')+
            (journal?'<span class="nci-row"><span class="nci-label">\u53D1\u8868</span><span>'+journal+'</span></span>':'')+
            '<span class="nci-row"><span class="nci-label">\u65E5\u671F</span><span>'+date+'</span></span>'+
          '</div>'+
          (kwTags.length ? '<div class="nci-tags">'+kwTags.map(function(t){return '<span class="nci-tag">#'+t+'</span>';}).join('')+'</div>' : '')+
        '</div>';
      }
      grid.innerHTML = html;
      wirePaperSearch();
    } else {
      var statusFilter = noteTab === 'reading' ? '\u5728\u8BFB' : '\u5DF2\u8BFB';
      var all = (typeof window.__IFTO_getFilesFrontmatter === 'function')
        ? await window.__IFTO_getFilesFrontmatter(getBookFolder()) : [];
      var filtered = all.filter(function(item){ return item.fm.status === statusFilter; });
      if(filtered.length === 0) {
        if(noteTab === 'reading') {
          // Show just the add button when empty
          grid.innerHTML = '<div class="note-add-btn" id="readingAddBtn"><span class="ci">+</span><span class="cl">\u65B0\u589E\u5728\u8BFB</span></div>';
        } else {
          grid.innerHTML = '<div class="note-empty">\u6682\u65E0\u5DF2\u8BFB\u4E66\u76EE</div>';
        }
        // Wire add reading note button (even when empty)
        var emptyBtn = document.getElementById('readingAddBtn');
        if(emptyBtn) {
          emptyBtn.onclick = async function(){
            if(window.__IFTO_createReadingNote) {
              var path = await window.__IFTO_createReadingNote();
              if(path) {
                renderNote();
                if(window.__IFTO_openFile) window.__IFTO_openFile(path);
              }
            }
          };
        }
        return;
      }
      var html = '';
      // Add "+\u65B0\u589E\u5728\u8BFB" button for reading tab
      if(noteTab === 'reading') {
        html += '<div class="note-add-btn" id="readingAddBtn"><span class="ci">+</span><span class="cl">\u65B0\u589E\u5728\u8BFB</span></div>';
      }
      // Pre-resolve covers: vault paths \u2192 bridge; HTTP URLs \u2192 fetch directly in webview
      async function _fetchAsDataURL(url) {
        try {
          var r = await fetch(url, { mode: 'cors', credentials: 'omit' });
          if(!r.ok) return '';
          var blob = await r.blob();
          return await new Promise(function(rs){
            var rd = new FileReader();
            rd.onloadend = function(){ rs(rd.result); };
            rd.readAsDataURL(blob);
          });
        } catch(e) { return ''; }
      }
      // Resolve a single cover URL to a data URL
      async function _resolveCover(cv) {
        if(!cv) return '';
        if(cv.match(/^https?:\\/\\//)) {
          // HTTP URL: use bridge (server-side, no CORS) first; fallback to webview fetch
          if(typeof window.__IFTO_resolveImageUrl === 'function') {
            try { var data = await window.__IFTO_resolveImageUrl(cv); if(data) return data; } catch(e) {}
          }
          try { var d2 = await _fetchAsDataURL(cv); if(d2) return d2; } catch(e) {}
          return '';
        }
        // Vault path: try resolveImageUrl (uses vault.readBinary) first, then readFileAsDataURL (uses adapter.readBinary)
        if(typeof window.__IFTO_resolveImageUrl === 'function') {
          try { var data = await window.__IFTO_resolveImageUrl(cv); if(data) return data; } catch(e) {}
        }
        if(typeof window.__IFTO_readFileAsDataURL === 'function') {
          try { return await window.__IFTO_readFileAsDataURL(cv); } catch(e) {}
        }
        return '';
      }
      var resolvedCovers = [];
      for(var ri=0;ri<filtered.length;ri++) {
        resolvedCovers[ri] = await _resolveCover(filtered[ri].fm.cover);
      }
      for(var i=0;i<filtered.length;i++) {
        var f = filtered[i].fm;
        var nm = filtered[i].name.replace(/\\.md$/i,'');
        var coverSrc = resolvedCovers[i];
        html += '<div class="note-card" data-path="'+getBookFolder()+'/'+filtered[i].name+'">'+
          '<div class="note-card-thumb">'+
            (coverSrc ? '<img src="'+coverSrc+'" onerror="this.style.display=\\'none\\'">' : '')+
          '</div>'+
          '<div class="note-card-info">'+
            '<span class="nci-title">'+(f.title||nm)+'</span>'+
            '<span class="nci-author">'+(f.author||'')+'</span>'+
            (f.rating ? '<span class="nci-rating">' + '\u2605'.repeat(parseInt(f.rating)||0) + '</span>' : '')+
            (f.type ? '<span class="nci-type">\u7C7B\u578B: '+f.type+'</span>' : '')+
            (f.description ? '<span class="nci-desc">'+f.description+'</span>' : '')+
          '</div>'+
        '</div>';
      }
      grid.innerHTML = html;
    }

    // Wire click-to-open
    grid.querySelectorAll('.note-card').forEach(function(card){
      card.onclick = function(){
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      };
    });

    // Wire add reading note button
    var readingBtn = document.getElementById('readingAddBtn');
    if(readingBtn) {
      readingBtn.onclick = async function(){
        if(window.__IFTO_createReadingNote) {
          var path = await window.__IFTO_createReadingNote();
          if(path) {
            renderNote();
            if(window.__IFTO_openFile) window.__IFTO_openFile(path);
          }
        }
      };
    }
  } catch(e) { console.error('IFTO: renderNote error', e); }
}

// Wire paper search input
function wirePaperSearch() {
  var input = document.getElementById('paperSearchInput');
  if(input) {
    var composing = false;
    input.addEventListener('compositionstart', function(){ composing = true; });
    input.addEventListener('compositionend', function(){
      composing = false;
      paperQuery = this.value;
      var cp = this.selectionStart;
      renderNote().then(function(){
        var ni = document.getElementById('paperSearchInput');
        if(ni){ ni.focus(); ni.setSelectionRange(cp, cp); }
      });
    });
    input.oninput = function(){
      if(composing) return;
      paperQuery = this.value;
      var cp = this.selectionStart;
      renderNote().then(function(){
        var ni = document.getElementById('paperSearchInput');
        if(ni){ ni.focus(); ni.setSelectionRange(cp, cp); }
      });
    };
  }
}

// Wire sidebar tab clicks
document.querySelectorAll('#noteSidebar .note-item').forEach(function(item){
  item.addEventListener('click', function(){
    var tab = this.getAttribute('data-tab');
    if(tab && tab !== noteTab) {
      noteTab = tab;
      renderNote();
    }
  });
});

// Initialize note
try { renderNote(); } catch(e){console.error('IFTO: init note error',e)}

// ====== Review ======
var REVIEW_TABS = ['daily','weekly','monthly','project'];
var reviewTab = 'daily';
var reviewPage = 1;
var reviewPerPage = window.__IFTO_MOBILE_ACTIVE ? 7 : 12;

function getReviewFolder(tab) {
  var s = window.__IFTO_SETTINGS || {};
  return tab === 'daily' ? (s.reviewDailyPath || '600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/602-\u65E5\u62A5')
    : tab === 'weekly' ? (s.reviewWeeklyPath || '600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/603-\u5468\u62A5')
    : tab === 'monthly' ? (s.reviewMonthlyPath || '600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/604-\u6708\u62A5')
    : (s.reviewProjectPath || '600-\u590D\u76D8\u603B\u7ED3/610-\u9879\u76EE\u603B\u7ED3');
}

function getReviewTemplate(tab) {
  var s = window.__IFTO_SETTINGS || {};
  return tab === 'daily' ? (s.reviewDailyTemplate || '')
    : tab === 'weekly' ? (s.reviewWeeklyTemplate || '')
    : tab === 'monthly' ? (s.reviewMonthlyTemplate || '')
    : (s.reviewProjectTemplate || '');
}

function switchReviewTab(tab) {
  reviewTab = tab;
  reviewPage = 1;
  document.querySelectorAll('#review .tab').forEach(function(t){ t.classList.remove('active'); });
  var te = document.querySelector('#review .tab[data-tab="'+tab+'"]');
  if(te) te.classList.add('active');
  renderReview();
}

async function renderReview() {
  try {
    var grid = document.getElementById('reviewGrid');
    if(!grid) return;
    var folder = getReviewFolder(reviewTab);
    var all = (typeof window.__IFTO_getFilesDetail === 'function')
      ? await window.__IFTO_getFilesDetail(folder, 0, 999)
      : {files: [], total: 0};
    var allDetails = all.files || [];

    var totalPages = Math.ceil(allDetails.length / reviewPerPage) || 1;
    if(reviewPage > totalPages) reviewPage = totalPages;
    var start = (reviewPage - 1) * reviewPerPage;
    var pf = allDetails.slice(start, start + reviewPerPage);

    var html = '';
    html += '<div class="card card-add" id="reviewAddBtn"><span class="ci">+</span><span class="cl">\u65B0\u589E\u590D\u76D8</span></div>';
    for(var i=0;i<pf.length;i++) {
      var d = pf[i];
      var nm = d.name.replace(/\\.md$/i, '');
      html += '<div class="card card-detail" data-path="'+folder+'/'+d.name+'">'+
        '<span class="card-title">'+(d.title || nm)+'</span>'+
        '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
        (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
      '</div>';
    }

    grid.className = 'card-grid';
    grid.innerHTML = html;

    // Wire file cards
    var cards = grid.querySelectorAll('.card[data-path]');
    for(var j=0;j<cards.length;j++) {
      (function(card){
        card.onclick = function(){
          var p = this.getAttribute('data-path');
          if(window.__IFTO_openFile) window.__IFTO_openFile(p);
        };
      })(cards[j]);
    }

    // Wire add button
    var addBtn = document.getElementById('reviewAddBtn');
    if(addBtn){
      addBtn.onclick = async function(){
        var folder = getReviewFolder(reviewTab);
        var tpl = getReviewTemplate(reviewTab);
        var now = new Date();
        var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
        var fn = ts+'.md';
        var content = '';
        if(tpl && window.__IFTO_readFile){
          content = (await window.__IFTO_readFile(tpl)) || '';
        }
        if(content && window.__IFTO_processTemplate){
          content = await window.__IFTO_processTemplate(content, ts);
        }
        if(window.__IFTO_createFile){
          var ok = await window.__IFTO_createFile(folder, fn, content);
          if(ok){
            renderReview();
            if(window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
          }
        }
      };
    }

    updateReviewNav(totalPages);
  } catch(e) { console.error('IFTO: renderReview error', e); }
}

function updateReviewNav(tp) {
  var nav = document.querySelector('#review .slide-nav');
  if(!nav) return;
  var btns = nav.querySelectorAll('.slide-btn');
  var num = nav.querySelector('.slide-num');
  if(num) num.textContent = String(reviewPage).padStart(2,'0')+' / '+String(tp).padStart(2,'0');
  if(btns.length >= 2) {
    btns[0].onclick = function(){
      if(reviewPage > 1) { reviewPage--; renderReview(); }
    };
    btns[1].onclick = function(){
      if(reviewPage < tp) { reviewPage++; renderReview(); }
    };
  }
}

// Wire review tab clicks
document.querySelectorAll('#review .tab[data-tab]').forEach(function(t){
  t.addEventListener('click', function(){
    switchReviewTab(this.getAttribute('data-tab'));
  });
});

// Initialize review
try { renderReview(); } catch(e){console.error('IFTO: init review error',e)}

// ====== Shortcut buttons ======
function _getSC(k, fb) { var s = window.__IFTO_SETTINGS || {}; return s[k] || fb; }
// Prefer the primary settings field (the one actually exposed by the settings
// panel), then fall back to a legacy "shortcut*"-prefixed override if the user
// has manually set one, then the hardcoded default. Previously the shortcut
// buttons ONLY read shortcut*-prefixed keys, which don't exist in the settings
// panel \u2014 so user paths typed into \u8BBE\u7F6E were ignored and every shortcut wrote
// to the hardcoded default folder.
function _getSCPath(primaryKey, legacyKey, fb) {
  var s = window.__IFTO_SETTINGS || {};
  return s[primaryKey] || s[legacyKey] || fb;
}

// \u65B0\u5EFA\u6536\u96C6 shortcut
try{
var _sbtn = document.getElementById('s-collect');
if(_sbtn){_sbtn.onclick = async function(e){
  e.preventDefault();
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var folder = _getSCPath('inboxFolder', 'shortcutCollectPath', '000-\u4FE1\u7BB1INBOX/010-\u6536\u96C6');
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.collectionTemplate || s.shortcutCollectTemplate || '';
  var content = '';
  if(tpl && window.__IFTO_readFile){
    content = (await window.__IFTO_readFile(tpl)) || '';
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok && window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
  }
}}
}catch(e){console.error('IFTO: shortcut collect btn error',e)}

// \u65B0\u5EFA\u5F85\u529E shortcut (creates an activity item \u2014 handler calls renderActivity)
try{
var _st = document.getElementById('s-todo');
if(_st){_st.onclick = async function(e){
  e.preventDefault();
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var folder = _getSCPath('activityFolder', 'shortcutTodoPath', '000-\u4FE1\u7BB1INBOX/030-\u6D3B\u52A8\u6E05\u5355');
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.shortcutTodoTemplate || '';
  var content = '- [ ] \\n';
  if(tpl && window.__IFTO_readFile){
    var tplContent = (await window.__IFTO_readFile(tpl)) || '';
    if(tplContent) content = tplContent;
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok) {
      if(window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
      // If creating in activity folder, prepend to order
      if(folder === ACTIVITY_FOLDER && window.__IFTO_readListOrder) {
        try {
          var o2 = await window.__IFTO_readListOrder(folder);
          if(o2 && o2.length > 0) { o2.unshift(fn); window.__IFTO_writeListOrder(folder, o2); }
        } catch(e) {}
      }
      renderActivity();
    }
  }
}}
}catch(e){console.error('IFTO: shortcut todo btn error',e)}

// \u65B0\u5EFA\u4EFB\u52A1 shortcut
try{
var _stask = document.getElementById('s-task');
if(_stask){_stask.onclick = async function(e){
  e.preventDefault();
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.projectTaskTemplate || '';
  var folder = _getSCPath('taskFolder', 'shortcutTaskPath', '100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406');
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var content = '';
  if(tpl && window.__IFTO_readFile){
    content = (await window.__IFTO_readFile(tpl)) || '';
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  var fmMatch = content.match(/^---\\n[\\s\\S]*?\\n---/);
  if(fmMatch){
    if(!fmMatch[0].match(/^status:/m)){
      content = content.replace(/^---\\n/, '---\\nstatus: \u672A\u5F00\u59CB\\n');
    }
  } else {
    content = '---\\nstatus: \u672A\u5F00\u59CB\\n---\\n' + (content || '# \\n\\n## \u4EFB\u52A1\u63CF\u8FF0\\n\\n## \u5B8C\u6210\u6807\u51C6\\n\\n');
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok && window.__IFTO_openFile) await window.__IFTO_openFile(folder+'/'+fn);
  }
}}
}catch(e){console.error('IFTO: shortcut task btn error',e)}

// \u65B0\u5EFA\u7B14\u8BB0 shortcut
try{
var _sn = document.getElementById('s-note');
if(_sn){_sn.onclick = async function(e){
  e.preventDefault();
  var s = window.__IFTO_SETTINGS || {};
  var folder = _getSCPath('shortcutNotePath', 'notePath', '000-\u4FE1\u7BB1INBOX/040-\u7B14\u8BB0');
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var content = '';
  var tpl = s.shortcutNoteTemplate || s.noteTemplate;
  if(tpl && window.__IFTO_readFile){
    content = (await window.__IFTO_readFile(tpl)) || '';
    if(content && window.__IFTO_processTemplate){
      content = await window.__IFTO_processTemplate(content, ts);
    }
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok && window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
  }
}}
}catch(e){console.error('IFTO: shortcut note btn error',e)}
// ====== Week Notes Widget ======
function renderWeekNotesPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var s3 = window.__IFTO_SETTINGS || {};
  var notePath = s3.widgetWeeknotesPath || getNoteFolder();
  var now = new Date();
  var day = now.getDay();
  var diff = day === 0 ? 6 : day - 1;
  var monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0,0,0,0);
  var sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23,59,59,999);
  var msMon = monday.getTime();
  var msSun = sunday.getTime();
  var dateRange = (monday.getMonth()+1)+'/'+monday.getDate()+' - '+(sunday.getMonth()+1)+'/'+sunday.getDate();
  body.innerHTML = '<div class="token-loading">\u52A0\u8F7D\u4E2D...</div>';
  window.__IFTO_getFilesDetail(notePath, 0, 999).then(function(result){
    var weekFiles = [];
    for(var i=0;i<result.files.length;i++){
      var f = result.files[i];
      if(f.ctime && f.ctime >= msMon && f.ctime <= msSun) weekFiles.push(f);
    }
    weekFiles.sort(function(a,b){return b.ctime - a.ctime});
    var html = '<div style="display:flex;flex-direction:column;gap:0">';
    html += '<div class="habit-header"><span class="habit-header-title">\u672C\u5468\u7B14\u8BB0</span><span class="habit-header-count">'+dateRange+'</span></div>';
    if(weekFiles.length===0){
      html += '<div class="habit-empty">\u672C\u5468\u8FD8\u6CA1\u6709\u521B\u5EFA\u7B14\u8BB0</div>';
    } else {
      html += '<div style="display:flex;flex-direction:column;gap:4px">';
      for(var i=0;i<weekFiles.length;i++){
        var f = weekFiles[i];
        var d = new Date(f.ctime);
        var dateStr = (d.getMonth()+1)+'/'+d.getDate();
        var name = f.name.replace('.md','');
        var fullPath = notePath+'/'+f.name;
        html += '<div class="wn-card" data-path="'+fullPath+'" onclick="window.__IFTO_openFile(\\''+fullPath+'\\')">';
        html += '<span class="wn-card-title">'+escHtml(name)+'</span>';
        html += '<span class="wn-card-date">'+dateStr+'</span>';
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    body.innerHTML = html;
  }).catch(function(){
    body.innerHTML = '<div style="text-align:center;color:#ef4444;font-size:12px;padding:20px">\u52A0\u8F7D\u5931\u8D25</div>';
  });
}

// ====== Today Todo Widget ======
function renderTodoWidgetPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var s4 = window.__IFTO_SETTINGS || {};
  var todoFolder = s4.widgetTodotodoPath || TODO_FOLDER;
  var now = new Date();
  var dateStr = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  body.innerHTML = '<div class="token-loading">\u52A0\u8F7D\u4E2D...</div>';

  var pListFiles = (typeof window.__IFTO_listFiles === 'function')
    ? window.__IFTO_listFiles(todoFolder) : Promise.resolve([]);
  var pStates = (typeof window.__IFTO_getFilesCheckboxState === 'function')
    ? window.__IFTO_getFilesCheckboxState(todoFolder) : Promise.resolve([]);

  Promise.all([pListFiles, pStates]).then(function(res){
    var files = (res[0] || []).filter(function(n){ return n && !n.startsWith('.'); });
    var stateMap = {};
    (res[1] || []).forEach(function(s){ stateMap[s.name] = s.checked; });

    var html = '<div style="display:flex;flex-direction:column;gap:0">';
    html += '<div class="habit-header"><span class="habit-header-title">\u4ECA\u65E5\u5F85\u529E</span><span class="habit-header-count">'+dateStr+' \\u00B7 '+files.length+'\\u9879</span></div>';
    if(files.length === 0) {
      html += '<div class="habit-empty">\\u4ECA\\u65E5\\u8FD8\\u6CA1\\u6709\\u5F85\\u529E</div>';
    } else {
      html += '<div style="display:flex;flex-direction:column;gap:4px">';
      for(var i=0;i<files.length;i++){
        var fn = files[i];
        var nm = fn.replace(/\\.md$/i, '');
        var fullPath = todoFolder+'/'+fn;
        var checkedCls = stateMap[fn] ? ' checked' : '';
        html += '<div class="wn-card todo-widget-item" data-path="'+fullPath+'" data-name="'+escHtml(fn)+'">';
        html += '<span class="cb'+checkedCls+'" data-toggle="1"></span>';
        html += '<span class="wn-card-title" style="flex:1">'+escHtml(nm)+'</span>';
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    body.innerHTML = html;

    // Wire click: cb toggles, title opens file
    body.querySelectorAll('.todo-widget-item').forEach(function(item){
      var cb = item.querySelector('.cb');
      if(cb){
        cb.onclick = function(e){
          e.stopPropagation();
          var fp = item.getAttribute('data-path');
          var newChecked = !cb.classList.contains('checked');
          cb.classList.toggle('checked', newChecked);
          if(fp && typeof window.__IFTO_setCheckboxState === 'function'){
            window.__IFTO_setCheckboxState(fp, newChecked).then(function(ok){
              if(!ok) cb.classList.toggle('checked', !newChecked);
              if(typeof renderTodo === 'function') { try { renderTodo(); } catch(e){} }
            }).catch(function(){
              cb.classList.toggle('checked', !newChecked);
            });
          }
        };
      }
      item.onclick = function(){
        var fp = this.getAttribute('data-path');
        if(fp && window.__IFTO_openFile) window.__IFTO_openFile(fp);
      };
    });
  }).catch(function(e){
    console.error('IFTO: renderTodoWidgetPage error', e);
    body.innerHTML = '<div style="text-align:center;color:#ef4444;font-size:12px;padding:20px">\u52A0\u8F7D\u5931\u8D25</div>';
  });
}

// ====== Theme detection ======
// IFTO-HOME's dark-mode styles are scoped to \`.theme-dark{...}\` on the root.
// Obsidian toggles \`body.theme-dark\` / \`body.theme-light\` when the user
// switches theme \u2014 we mirror that onto <html> so our scoped rules update.
// Previously this was a one-shot check on script load, so switching from
// dark back to light left <html class="theme-dark"> stuck, making IFTO
// keep rendering dark colors (white text on light cards, etc.) until reload.
(function syncIftoTheme(){
  function apply(){
    var isDark = document.body.classList.contains('theme-dark');
    document.documentElement.classList.toggle('theme-dark', isDark);
    document.documentElement.classList.toggle('theme-light', !isDark);
  }
  apply();
  try {
    var mo = new MutationObserver(apply);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.__IFTO_THEME_OBSERVER = mo;
  } catch(e) { console.error('IFTO: theme observer error', e); }
})();

// ====== Widget Carousel (Dynamic) ======
var widgetRenderers = {
  deepseek: renderDeepSeekPage,
  minimax: renderMinimaxPage,
  calendar: renderCalPage,
  habits: renderHabitPage,
  weeknotes: renderWeekNotesPage,
  todotoday: renderTodoWidgetPage
};
var widgetTitles = {
  deepseek: '',
  minimax: 'MiniMax',
  calendar: '\\u65E5\\u5386',
  habits: '\\u4E60\\u60EF\\u6253\\u5361',
  weeknotes: '\\u672C\\u5468\\u7B14\\u8BB0',
  todotoday: '\\u4ECA\\u65E5\\u5F85\\u529E'
};

function getWidgetList() {
  var order = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.widgetOrder) || 'deepseek,minimax,calendar,habits,weeknotes,todotoday';
  var ids = order.split(',').map(function(s){return s.trim()}).filter(function(s){return s});
  // Append any known widget renderer not present in saved order (forward-compat)
  Object.keys(widgetRenderers).forEach(function(k){
    if(ids.indexOf(k) === -1) ids.push(k);
  });
  var list = [];
  for(var i=0;i<ids.length;i++) {
    var id = ids[i];
    var key = 'widget'+id.charAt(0).toUpperCase()+id.slice(1)+'Enabled';
    var enabled = true;
    if(window.__IFTO_SETTINGS && window.__IFTO_SETTINGS[key] !== undefined) {
      enabled = window.__IFTO_SETTINGS[key];
    }
    if(enabled && widgetRenderers[id]) list.push(id);
  }
  return list;
}

var curWidget = 0;
var _widgetList = getWidgetList();

function renderWidget() {
  if(window.__IFTO_refreshSettings) window.__IFTO_refreshSettings();
  _widgetList = getWidgetList();
  if(_widgetList.length===0) {
    var card = document.getElementById('widgetCard');
    if(card) card.innerHTML='<div style="display:flex;align-items:center;justify-content:center;flex:1;padding:20px;text-align:center;color:var(--g4);font-size:12px">\u6240\u6709\u7EC4\u4EF6\u5DF2\u5173\u95ED\uFF0C\u8BF7\u5728\u63D2\u4EF6\u8BBE\u7F6E\u4E2D\u542F\u7528</div>';
    var dotsEl = document.getElementById('widgetDots');
    if(dotsEl) dotsEl.innerHTML='';
    return;
  }
  if(curWidget >= _widgetList.length) curWidget = 0;
  var card = document.getElementById('widgetCard');
  if(!card) return;
  var id = _widgetList[curWidget];
  card.innerHTML = '<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div id="widgetBody" style="display:flex;flex-direction:column;flex:1;overflow-y:auto;overflow-x:hidden;padding:0 2px;min-height:0"></div></div>';
  renderPage();
  updateWidgetDots();
}

function renderPage() {
  var id = _widgetList[curWidget];
  if(id && widgetRenderers[id]) widgetRenderers[id]();
}

function widgetPrev() {
  if(_widgetList.length<=1) return;
  curWidget = (curWidget-1+_widgetList.length)%_widgetList.length;
  renderWidget();
  updateWidgetDots();
}
function widgetNext() {
  if(_widgetList.length<=1) return;
  curWidget = (curWidget+1)%_widgetList.length;
  renderWidget();
  updateWidgetDots();
}
function goToWidget(i) {
  curWidget = i;
  renderWidget();
  updateWidgetDots();
}
function updateWidgetDots() {
  var dotsEl = document.getElementById('widgetDots');
  if(!dotsEl) return;
  if(_widgetList.length<=1){dotsEl.innerHTML='';return}
  dotsEl.innerHTML = _widgetList.map(function(_,i){
    return '<span class="widget-dot'+(i===curWidget?' active':'')+'" onclick="goToWidget('+i+')"></span>';
  }).join('');
}

// ====== DeepSeek Token - balance fetch ======
function fetchDeepSeek(apiKey) {
  return new Promise(function(resolve){
    var url = 'https://api.deepseek.com/user/balance';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
    xhr.timeout = 10000;
    xhr.onload = function(){
      try {
        if (xhr.status < 200 || xhr.status >= 300) {
          resolve({error: 'HTTP ' + xhr.status + ': ' + xhr.statusText});
          return;
        }
        var data = JSON.parse(xhr.responseText);
        var total = 0;
        if (data && data.balance_infos && data.balance_infos[0]) {
          var raw = data.balance_infos[0].total_balance;
          if (raw !== undefined && raw !== null) total = parseFloat(raw);
        } else if (data && data.balance !== undefined) {
          total = parseFloat(data.balance);
        }
        var avail = data ? data.is_available !== false : true;
        var today = new Date();
        var ymd = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
        var midnightKey = 'ds_' + ymd + '_midnight';
        var midnight = localStorage.getItem(midnightKey);
        var usage = null;
        if (midnight !== null) {
          midnight = parseFloat(midnight);
          usage = Math.max(0, midnight - total);
        } else {
          localStorage.setItem(midnightKey, String(total));
          midnight = total;
          usage = 0;
        }
        var monthly = 0;
        var monthPrefix = 'ds_' + today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0');
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.indexOf(monthPrefix) === 0 && key.indexOf('_midnight') < 0) {
            var val = parseFloat(localStorage.getItem(key));
            if (!isNaN(val)) monthly += val;
          }
        }
        resolve({
          balance: total,
          avail: avail,
          usage: usage,
          midnight: midnight,
          monthly: monthly
        });
      } catch(e) {
        resolve({error: '\\u89E3\\u6790\\u5931\\u8D25: ' + e.message});
      }
    };
    xhr.onerror = function(){ resolve({error: '\\u7F51\\u7EDC\\u8BF7\\u6C42\\u5931\\u8D25'}); };
    xhr.ontimeout = function(){ resolve({error: '\\u8BF7\\u6C42\\u8D85\\u65F6'}); };
    xhr.send();
  });
}

// ====== DeepSeek Token ======
function renderDeepSeekPage() {
  var dsKey = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.deepseekKey) || localStorage.getItem('ifto_deepseek_key');
  var body = document.getElementById('widgetBody');
  if(!body) return;
  if(!dsKey) {
    body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">\u672A\u914D\u7F6E API \u5BC6\u94A5</div><div style="font-size:12px;color:var(--g4);margin-top:6px">\u8BF7\u5728\u63D2\u4EF6\u8BBE\u7F6E\u4E2D\u586B\u5199 DeepSeek API Key</div><span class="token-setup-btn" onclick="setTokenKey()">\u8BBE\u7F6E API Key</span></div>';
    return;
  }
  body.innerHTML = '<div class="token-loading">\u67E5\u8BE2\u4E2D...</div>';
  fetchDeepSeek(dsKey).then(function(data){
    if(!data || data.error) {
      body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">\u67E5\u8BE2\u5931\u8D25</div><div style="font-size:12px;color:var(--g4);margin-top:6px">'+(data&&data.error||'\u65E0\u6CD5\u83B7\u53D6\u4F59\u989D\u4FE1\u606F')+'</div><span class="token-setup-btn" onclick="renderDeepSeekPage()">\u91CD\u65B0\u67E5\u8BE2</span></div>';
      return;
    }
    var b = data;
    var html = '<div class="token-section">'+
'<div class="token-logo"><svg width="121" height="26" viewBox="0 0 121 26" fill="none" style="width:240px;height:auto;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg"><path d="M24.1325 0C24.9975 0.0793117 24.8022 1.26571 25.2204 1.66113C26.7587 3.11549 27.6878 2.48738 28.4411 4.80859C29.8863 3.35444 30.6801 3.83209 32.4225 3.47949C32.9369 3.37048 33.8403 2.24753 34.2155 2.15332C35.2445 1.895 34.6814 4.06635 34.5934 4.42871C33.903 7.27267 31.9302 8.42088 29.2252 8.86816C29.3134 13.6312 27.4165 17.1715 24.2623 20.5781C25.0139 21.0084 27.1242 21.5466 27.5641 22.1572C28.1433 24.1638 22.7763 23.4761 21.7213 22.8955C20.5384 23.8392 19.0972 24.8237 17.5504 25.1084C15.1529 25.5496 11.8539 25.5804 9.50942 24.9004C8.27118 24.5412 6.98621 23.7888 5.93227 23.1143C3.03868 21.1559 1.01693 18.1518 0.292622 14.7344C-1.1699 7.85142 2.95924 1.43343 10.2311 1.58301C10.7182 1.59319 12.5211 1.82506 12.7956 1.77441C14.605 1.43819 16.9496 -0.137631 18.7614 1.05957C17.7863 1.6865 16.556 2.61789 17.8825 3.85254C18.5287 4.45389 19.3737 4.91331 20.0426 5.54395C20.9411 6.3911 24.3821 10.2461 25.5211 9.85938C25.8091 9.52909 26.0056 8.65407 26.1247 8.21582C24.2773 6.78237 23.2004 5.47129 23.2165 2.99902C23.2227 2.03961 23.4279 0.694291 24.1325 0ZM4.16567 9.15039C3.72576 9.18801 2.74291 9.20489 2.43715 9.54492C2.14702 9.92535 2.31398 10.5488 2.36098 10.9814C2.75726 14.6271 4.52232 18.228 7.48891 20.458C8.5146 21.2289 9.83114 22.0457 11.1862 21.875C13.1386 21.6289 10.7942 19.8205 11.32 18.7773C11.3658 18.6833 11.4653 18.6398 11.567 18.6162C12.8145 18.6926 14.3977 20.0086 15.4176 20.707C15.7713 20.9491 16.2236 21.3084 16.4704 21.5088C17.8797 22.5945 19.2806 22.885 21.0436 22.6621C21.0928 22.6559 21.1419 22.6496 21.1911 22.6426C19.974 21.757 19.1109 20.9957 18.1286 19.835C16.9041 18.3881 15.9469 16.7874 14.8434 15.2559C13.0862 12.817 10.6656 10.8444 7.80239 9.86816C6.78248 9.52043 5.25605 9.12231 4.16567 9.15039ZM22.8209 13.3555C21.9771 11.9609 20.5849 9.99977 18.734 10.2129C18.4131 10.3663 17.9831 10.5439 18.1022 10.9551C18.7435 11.5511 19.461 11.1095 20.0368 12.1094C19.9934 12.5673 19.8744 13.3218 20.0348 13.7383C20.3551 14.5695 21.3956 15.1447 22.276 14.917C23.2747 14.5687 23.411 14.3307 22.8209 13.3555ZM18.6051 11.9971C18.4454 12.0363 18.3209 12.1616 18.2819 12.3213C18.243 12.4811 18.2958 12.6495 18.4196 12.7578C18.5434 12.8661 18.7174 12.8966 18.8707 12.8369C19.0872 12.7525 19.2014 12.5145 19.1315 12.293C19.0613 12.0714 18.8308 11.9416 18.6051 11.9971Z" fill="currentColor"/><path d="M69.561 9.35254L71.5799 9.3546C71.5721 9.63977 71.5305 9.9425 71.6813 10.1671C71.8617 10.1371 72.0506 10.0176 72.2105 9.92355C72.9454 9.45314 73.3358 9.36761 74.1667 9.35985C77.0455 9.34866 78.3875 11.2711 78.3271 14.0743C78.2384 18.2018 76.4596 18.8739 72.972 18.8559L72.9708 16.9624C75.0235 16.9966 76.1326 17.0265 76.6388 14.6883C76.6479 14.5622 76.6545 14.4361 76.6594 14.3098C76.7197 12.5821 75.9823 11.2645 74.174 11.2445C72.9967 11.1859 71.8756 11.8728 71.6771 13.1496C71.5148 14.1955 71.5745 15.4181 71.5745 16.499L71.5781 21.9201L69.5652 21.9202L69.561 9.35254Z" fill="currentColor"/><path d="M44.6193 6.42993L46.7639 6.43707L46.7611 18.984L44.6256 18.9852C44.64 18.7051 44.7202 18.4181 44.5067 18.2284C44.226 18.1762 43.5128 18.7265 43.138 18.816C40.163 19.5256 37.5911 18.136 37.4371 14.9905C37.3614 13.4435 37.4131 12.5843 38.1243 11.1899C39.24 9.41347 41.2697 9.49989 43.1134 9.50941L43.108 11.4018C42.1333 11.3933 40.8616 11.286 40.0659 11.9304C38.9301 12.8503 38.9258 15.3479 39.8716 16.3787C40.7494 17.3354 42.9628 17.3358 43.8887 16.4258C44.6104 15.7163 44.6298 14.4883 44.6216 13.5469C44.6176 12.991 44.624 12.4195 44.624 11.8597L44.6193 6.42993Z" fill="currentColor"/><path d="M105.198 9.39515C106.391 9.20961 108.136 9.63905 108.966 10.507C110.139 11.7321 110.2 13.371 110.185 14.9446L104.643 14.948L104.641 13.4314L108.365 13.4279C108.294 13.2066 108.194 12.8805 108.103 12.6725C107.866 12.1291 107.42 11.7007 106.862 11.4819C106.151 11.2033 105.083 11.2173 104.388 11.5308C102.675 12.304 102.698 14.59 103.381 16.0282C104.328 17.4814 106.841 17.4083 107.92 16.1049L109.965 16.1066C109.311 17.8156 108.536 18.678 106.573 18.9378C105.311 19.1046 103.673 18.949 102.656 18.1229C100.725 16.5553 100.692 12.6154 102.163 10.735C102.922 9.77215 104.044 9.51624 105.198 9.39515Z" fill="currentColor"/><path d="M62.82 9.39597C64.0113 9.20775 65.7563 9.64108 66.5861 10.5066C67.7669 11.7374 67.8086 13.3667 67.8073 14.946L62.2632 14.9476L62.2601 13.43L65.979 13.4297C65.9143 13.2127 65.8309 12.9223 65.7457 12.7168C65.5087 12.1552 65.0533 11.7104 64.481 11.4818C63.7718 11.2031 62.7024 11.2213 62.0094 11.5323C60.3142 12.2929 60.3086 14.558 60.9829 15.9911C61.8551 17.4667 64.4617 17.4279 65.5323 16.1053L67.5921 16.108C66.9482 17.7945 66.1563 18.6651 64.2396 18.9319C62.9761 19.1078 61.3114 18.9583 60.2893 18.132C58.344 16.56 58.3118 12.6313 59.7829 10.7353C60.5344 9.77552 61.6716 9.5162 62.82 9.39597Z" fill="currentColor"/><path d="M52.4196 9.38934C53.6898 9.22785 55.3975 9.59808 56.2902 10.496C57.5013 11.7143 57.5893 13.3641 57.5769 14.9423L51.8664 14.9455L51.8639 13.428L55.6721 13.426C55.6157 13.2197 55.5122 12.8761 55.4259 12.6833C55.172 12.1229 54.6927 11.6839 54.0963 11.4653C53.3494 11.19 52.288 11.2176 51.5596 11.5353C49.8497 12.2811 49.8169 14.5448 50.5103 15.9722C51.2935 17.2458 53.3207 17.3579 54.5502 16.6802C54.8281 16.5271 55.0263 16.3243 55.2421 16.1033L57.3362 16.1042C56.659 17.8262 55.8031 18.707 53.8035 18.9409C52.4848 19.102 50.8659 18.9464 49.795 18.1179C47.8037 16.5771 47.786 12.5649 49.2951 10.7211C50.0717 9.77214 51.2368 9.50922 52.4196 9.38934Z" fill="currentColor"/><path d="M94.5135 9.39192C95.7652 9.21999 97.4993 9.61496 98.375 10.4987C99.5799 11.7145 99.6721 13.3704 99.6645 14.9441L93.96 14.9472L93.9568 13.4302L97.7574 13.4272C97.5031 12.5817 97.1482 11.7617 96.2059 11.4757C92.8704 10.463 91.3285 13.3587 92.5872 15.9502C93.3598 17.2473 95.4231 17.3693 96.6569 16.6689C96.9227 16.5179 97.122 16.3154 97.334 16.1046L99.4172 16.1063C98.7286 17.8323 97.9099 18.6946 95.8907 18.9416C94.5807 19.102 92.9383 18.9434 91.8845 18.1197C89.8967 16.566 89.8698 12.6025 91.3752 10.7404C92.1651 9.76845 93.3047 9.51472 94.5135 9.39192Z" fill="currentColor"/><path d="M83.7924 9.40524C84.7186 9.22225 86.6001 9.53111 87.3645 10.0941C88.1682 10.6861 88.3087 11.315 88.4593 12.2199C88.1501 12.2224 86.5622 12.3181 86.3208 12.0783C86.2027 11.8644 86.0664 11.6481 85.9004 11.4689C85.4202 10.949 83.0715 10.9911 82.7076 11.5808C81.5215 13.5024 84.7484 13.3588 85.8375 13.4432C88.3541 13.6382 89.7387 15.7175 88.2167 17.8849C87.6003 18.7444 85.8108 18.944 84.6949 18.995C82.4165 19.0223 80.1481 18.8672 79.7905 16.1821L82.2268 16.1813C82.5167 17.3737 83.7308 17.2598 84.7416 17.2657C85.4158 17.2696 86.5889 16.9914 86.5 16.1004C86.3774 14.87 84.0574 15.0745 83.064 14.9716C80.5854 14.715 79.4191 12.598 80.8286 10.5128C81.3902 9.68867 82.7642 9.49704 83.7924 9.40524Z" fill="currentColor"/><path d="M111.648 6.1377L113.986 6.13925L113.985 18.9966L111.649 18.9976L111.648 6.1377Z" fill="currentColor"/><path d="M118.349 9.64502L121.001 9.64926C119.868 10.8968 118.592 12.5086 117.484 13.8204L120.969 18.9961L118.326 18.9977C118.056 18.5295 117.51 17.7631 117.197 17.2934L114.863 13.8228L118.349 9.64502Z" fill="currentColor"/></svg> </div>'+
      '<div class="token-title">Token \u989D\u5EA6</div>'+
      '<div class="token-card">'+
        '<div class="token-label-row">'+
          '<span class="token-label">\u4F59\u989D</span>'+
          '<span class="token-status'+(b.avail?'':' unavail')+'"><span class="token-status-dot'+(b.avail?'':' unavail')+'"></span>'+(b.avail?'\u53EF\u7528':'\u4E0D\u53EF\u7528')+'</span>'+
        '</div>'+
        '<div class="token-big-amount">\xA5'+b.balance.toFixed(2)+'</div>'+
        '<hr class="token-divider">'+
        '<div class="token-label-row" style="margin-bottom:6px">'+
          '<span class="token-label">\u4ECA\u65E5\u6D88\u8017</span>'+
          (b.usage!==null?'<span class="token-usage-value">-\xA5'+b.usage.toFixed(2)+'</span>':'<span class="token-usage-value" style="color:#999">\u2014</span>')+
        '</div>'+
        (b.usage!==null?'<div class="token-usage-row"><span class="token-usage-sub">0\u70B9\u4F59\u989D \xA5'+b.midnight.toFixed(2)+'</span></div>':'')+
        '<hr class="token-divider">'+
        '<div class="token-usage-row">'+
          '<span class="token-usage-label">\u672C\u6708\u6D88\u8D39</span>'+
          (b.monthly!==null?'<span class="token-usage-value">-\xA5'+b.monthly.toFixed(2)+'</span>':'<span class="token-usage-value" style="color:#999">\xA50.00</span>')+
        '</div>'+
      '</div>'+
      '<div class="token-footer">'+
        '<span class="token-refresh" onclick="renderWidget()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
        '<span class="token-recharge" onclick="window.open(\\'https://platform.deepseek.com/top_up\\',\\'_blank\\')">\u524D\u5F80\u5145\u503C</span>'+
      '</div>'+
    '</div>';
  body.innerHTML = html;
});
}

// ====== MiniMax Token - balance fetch ======
function fetchMinimax(apiKey, apiUrl) {
  return new Promise(function(resolve){
    var url = apiUrl || 'https://www.minimaxi.com/v1/token_plan/remains';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 10000;
    xhr.onload = function(){
      try {
        if (xhr.status < 200 || xhr.status >= 300) {
          resolve({error: 'HTTP ' + xhr.status + ': ' + xhr.statusText});
          return;
        }
        var data;
        try { data = JSON.parse(xhr.responseText); }
        catch(e) { resolve({error: '\\u8FD4\\u56DE\\u975E JSON: ' + (xhr.responseText||'').substring(0, 200)}); return; }
        if (data && data.base_resp && data.base_resp.status_code !== undefined && data.base_resp.status_code !== 0) {
          resolve({error: '\\u540E\\u7AEF\\u62A5\\u9519: ' + (data.base_resp.status_msg || ('code ' + data.base_resp.status_code))}); return;
        }
        var total = 0;
        var totalCredits = null;
        var usedCredits = null;
        var windows = [];
        var weekly = null;
        if (data && data.remaining_credits !== undefined) {
          total = parseFloat(data.remaining_credits);
          if (data.total_credits !== undefined) totalCredits = parseFloat(data.total_credits);
          if (data.used_credits !== undefined) usedCredits = parseFloat(data.used_credits);
        } else if (data && Array.isArray(data.model_remains) && data.model_remains.length > 0) {
          var nowMs = Date.now();
          // Token Plan \u5171\u4EAB 5h \u989D\u5EA6,API \u6309 model \u5217\u4E3E,\u53D6\u7B2C\u4E00\u6761(general = \u6587\u672C\u4E3B\u989D\u5EA6)
          var entry = data.model_remains[0] || {};
          var usedPct2 = 0;
          // MiniMax \u771F\u5B9E\u5B57\u6BB5: current_interval_remaining_percent (0-100, \u76F4\u63A5\u7ED9\u5269\u4F59\u767E\u5206\u6BD4)
          if (entry.current_interval_remaining_percent !== undefined && entry.current_interval_remaining_percent !== null) {
            usedPct2 = 100 - parseFloat(entry.current_interval_remaining_percent);
          } else {
            // fallback: \u65E7\u542F\u53D1\u5F0F (\u4ECE used/total/remaining \u63A8\u65AD)
            var usedVal = null, totalVal = null, remainsVal = null;
            for (var k2 in entry) {
              if (typeof entry[k2] !== 'number') continue;
              if (/used/i.test(k2)) usedVal = entry[k2];
              else if (/total/i.test(k2)) totalVal = entry[k2];
              else if (/remain|current|left/i.test(k2)) remainsVal = entry[k2];
            }
            if (usedVal !== null && totalVal !== null && totalVal > 0) {
              usedPct2 = (usedVal / totalVal) * 100;
            } else if (usedVal !== null) {
              usedPct2 = usedVal;
            } else if (remainsVal !== null && totalVal !== null && totalVal > 0) {
              usedPct2 = ((totalVal - remainsVal) / totalVal) * 100;
            } else if (remainsVal !== null) {
              usedPct2 = 100 - remainsVal;
            }
          }
          usedPct2 = Math.max(0, Math.min(100, usedPct2));
          // \u91CD\u7F6E\u5012\u8BA1\u65F6: \u4F18\u5148 end_time - now, \u5907\u9009 remains_time \u5B57\u6BB5
          var startMs2 = entry.start_time || entry.startTime || 0;
          var endMs2 = entry.end_time || entry.endTime || 0;
          var resetInMin2 = 0;
          if (endMs2 > nowMs) {
            resetInMin2 = Math.ceil((endMs2 - nowMs) / 60000);
          } else if (typeof entry.remains_time === 'number' && entry.remains_time > 0) {
            resetInMin2 = Math.ceil(entry.remains_time / 60000);
          }
          windows.push({
            model: '5h \\u7A97\\u53E3',
            startTime: startMs2,
            endTime: endMs2,
            usedPct: usedPct2,
            resetInMin: resetInMin2
          });
          // \u5468\u9650\u989D: status=3 \u2192 \u65E0\u9650\u5236;\u5426\u5219\u6309 remaining \u7B97
          if (entry.current_weekly_remaining_percent !== undefined || entry.current_weekly_status !== undefined) {
            var wStatus = entry.current_weekly_status;
            var wRemain = entry.current_weekly_remaining_percent !== undefined ? parseFloat(entry.current_weekly_remaining_percent) : null;
            var wUnlimited = (wStatus === 3) || (wRemain === 100 && wStatus === undefined);
            if (wUnlimited) {
              weekly = { unlimited: true, usedPct: 0 };
            } else if (wRemain !== null) {
              weekly = { unlimited: false, usedPct: Math.max(0, Math.min(100, 100 - wRemain)) };
            }
          }
          total = usedPct2;
        } else if (data && (data.remains !== undefined || data.total_remains !== undefined)) {
          if (data.remains !== undefined) total = parseFloat(data.remains);
          else total = parseFloat(data.total_remains);
          if (data.total !== undefined) totalCredits = parseFloat(data.total);
          else if (data.total_remains !== undefined) totalCredits = parseFloat(data.total_remains);
          if (data.used !== undefined) usedCredits = parseFloat(data.used);
        } else if (data && data.data && (data.data.remains !== undefined || data.data.remaining_credits !== undefined)) {
          var d2 = data.data;
          if (d2.remains !== undefined) total = parseFloat(d2.remains);
          else total = parseFloat(d2.remaining_credits);
          if (d2.total !== undefined) totalCredits = parseFloat(d2.total);
          if (d2.used !== undefined) usedCredits = parseFloat(d2.used);
        } else if (data && data.balance_breakdown && data.balance_breakdown.total_balance !== undefined) {
          total = parseFloat(data.balance_breakdown.total_balance);
        } else if (data && data.balance_infos && data.balance_infos[0]) {
          var raw = data.balance_infos[0].total_balance;
          if (raw !== undefined && raw !== null) total = parseFloat(raw);
        } else if (data && data.credit_grants && data.credit_grants.total_available !== undefined) {
          total = parseFloat(data.credit_grants.total_available);
        } else if (data && data.total_available !== undefined) {
          total = parseFloat(data.total_available);
        } else if (data && data.balance !== undefined) {
          total = parseFloat(data.balance);
        } else {
          resolve({error: '\\u672A\\u80FD\\u89E3\\u6790\\u4F59\\u989D\\u5B57\\u6BB5,\\u539F\\u6587: ' + (xhr.responseText||'').substring(0, 1000)});
          return;
        }
        if (isNaN(total)) { resolve({error: '\\u4F59\\u989D\\u975E\\u6570\\u5B57: ' + total}); return; }
        var today = new Date();
        var ymd = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
        var midnightKey = 'mn_' + ymd + '_midnight';
        var midnight = localStorage.getItem(midnightKey);
        var usage = null;
        if (midnight !== null) {
          midnight = parseFloat(midnight);
          usage = Math.max(0, midnight - total);
        } else {
          localStorage.setItem(midnightKey, String(total));
          midnight = total;
          usage = 0;
        }
        var monthly = 0;
        var monthPrefix = 'mn_' + today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0');
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.indexOf(monthPrefix) === 0 && key.indexOf('_midnight') < 0) {
            var val = parseFloat(localStorage.getItem(key));
            if (!isNaN(val)) monthly += val;
          }
        }
        resolve({
          mode: 'plan',
          windows: windows,
          weekly: weekly,
          balance: total,
          total: totalCredits,
          used: usedCredits,
          avail: true,
          usage: null,
          midnight: null,
          monthly: null
        });
      } catch(e) {
        resolve({error: '\\u89E3\\u6790\\u5931\\u8D25: ' + e.message});
      }
    };
    xhr.onerror = function(){ resolve({error: '\\u7F51\\u7EDC\\u8BF7\\u6C42\\u5931\\u8D25 (\\u53EF\\u80FD CORS \\u88AB\\u62D2)'}); };
    xhr.ontimeout = function(){ resolve({error: '\\u8BF7\\u6C42\\u8D85\\u65F6'}); };
    xhr.send();
  });
}

// ====== MiniMax Token ======
function renderMinimaxPage() {
  var mnKey = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.minimaxKey) || localStorage.getItem('ifto_minimax_key');
  var mnUrl = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.minimaxApiUrl) || 'https://www.minimaxi.com/v1/token_plan/remains';
  var body = document.getElementById('widgetBody');
  if(!body) return;
  if(!mnKey) {
    body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">\\u672A\\u914D\\u7F6E API \\u5BC6\\u94A5</div><div style="font-size:12px;color:var(--g4);margin-top:6px">\\u8BF7\\u5728\\u63D2\\u4EF6\\u8BBE\\u7F6E\\u4E2D\\u586B\\u5199 MiniMax API Key</div><span class="token-setup-btn" onclick="setTokenKey()">\\u8BBE\\u7F6E API Key</span></div>';
    return;
  }
  body.innerHTML = '<div class="token-loading">\\u67E5\\u8BE2\\u4E2D...</div>';
  fetchMinimax(mnKey, mnUrl).then(function(data){
    if(!data || data.error) {
      body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">\\u67E5\\u8BE2\\u5931\\u8D25</div><div style="font-size:12px;color:var(--g4);margin-top:6px">'+(data&&data.error||'\\u65E0\\u6CD5\\u83B7\\u53D6\\u4F59\\u989D\\u4FE1\\u606F')+'</div><span class="token-setup-btn" onclick="renderMinimaxPage()">\\u91CD\\u65B0\\u67E5\\u8BE2</span></div>';
      return;
    }
    var b = data;
    if (b.mode !== 'plan') {
      // \u515C\u5E95:\u65E7 balance \u6E32\u67D3
      var balText2 = (b.balance % 1 === 0) ? b.balance.toFixed(0) : b.balance.toFixed(2);
      var totalRow2 = '';
      if(b.total !== null && b.used !== null) {
        totalRow2 = '<div class="token-usage-row"><span class="token-usage-sub">\\u603B\\u989D '+b.total+' \\u00B7 \\u5DF2\\u7528 '+b.used+'</span></div>';
      }
      var htmlLegacy = '<div class="token-section">'+
'<div class="token-logo" style="display:block;text-align:center;margin:0 auto 6px"><svg width="200" viewBox="0 0 532 127" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:200px;height:auto;display:inline-block"><path d="M242.658 32.0206C246.102 31.8118 251.125 31.9255 254.625 32.0228C254.922 34.5364 254.801 39.568 254.803 42.2778L254.811 60.6297L254.809 79.7618C254.808 83.0451 254.95 88.1395 254.575 91.2595C253.366 92.0215 244.708 91.7531 242.509 91.8146C241.998 88.0545 242.276 74.9741 242.284 70.4965C242.303 65.1999 242.03 57.9428 242.36 52.8424C239.846 56.1117 235.15 64.0186 232.793 67.7782C230.284 67.9348 228.399 67.9212 225.91 67.8635C223.675 65.052 218.249 55.7856 216.156 52.3627C215.856 61.0924 216.219 70.4905 216.072 79.2795C216.002 83.4331 216.241 87.6513 215.941 91.8056C212.354 91.6031 207.553 91.7228 203.874 91.7058C203.202 78.802 204.138 65.0947 203.778 52.1097C203.599 45.6435 203.675 38.4952 203.881 32.0179C207.472 31.8301 212.151 31.9288 215.771 32.0182C217.243 33.7558 218.774 36.3848 220.073 38.3102C223.186 42.9258 226.183 48.1281 229.513 52.5431C230.563 50.4761 232.931 46.9507 234.231 44.9299C236.989 40.5939 239.798 36.2905 242.658 32.0206Z" fill="currentColor"/><path d="M405.846 32.0108C409.304 31.8018 414.432 31.9346 417.95 32.0456L417.945 91.8545C415.326 91.6323 407.16 92.2178 405.876 91.2156C405.039 88.9296 405.386 73.3174 405.397 69.8098C405.386 63.8372 405.419 58.4537 405.665 52.4789L395.994 67.7821C393.457 67.9436 391.325 67.9108 388.799 67.8646C386.068 62.9673 382.411 57.2588 379.248 52.5642C379.056 65.3688 379.543 79.1232 379.106 91.766L367.108 91.743C366.794 89.2439 366.892 85.5568 366.889 82.9443L366.878 69.259C366.876 57.5291 366.837 45.7258 366.93 33.9912C366.936 33.1896 366.968 32.4921 367.515 31.9838C370.776 31.9327 375.754 31.7952 378.876 32.1103C380.265 33.6925 382.465 37.3039 383.69 39.201C386.511 43.6594 389.381 48.0877 392.298 52.4849C396.098 46.3058 401.688 38.0244 405.846 32.0108Z" fill="currentColor"/><path d="M284.748 31.9931C288.288 31.8969 292.003 31.963 295.559 31.9788C297.177 33.9931 299.963 39.017 301.546 41.4721C307.436 50.6098 312.813 60.3028 318.743 69.4011C318.931 65.5093 318.647 60.8358 318.557 56.9201C318.486 51.9719 318.458 47.0232 318.477 42.0745C318.477 39.2922 318.335 34.5665 318.803 31.9685C322.072 31.9389 327.635 31.7782 330.691 32.1748C331.383 50.9216 330.472 72.12 330.653 91.0945C330.656 91.4634 330.478 91.5238 330.213 91.7654L319.278 91.7086C317.042 88.6864 314.281 83.654 312.215 80.3167C306.767 71.5671 301.401 62.7675 296.114 53.919C296.015 64.3431 296.256 74.7382 296.24 85.1618C296.234 87.4439 296.3 89.7102 296.081 91.9846C293.829 91.5449 286.934 91.7529 284.256 91.7898C283.763 72.6677 284.403 52.0602 284.329 32.816C284.329 32.3773 284.477 32.3139 284.748 31.9931Z" fill="currentColor"/><path d="M444.042 32.0152C448.189 31.843 455.162 31.8329 459.238 32.0699C460.285 34.3919 461.114 37.4067 461.923 39.8566C465.974 52.122 469.779 64.4571 473.885 76.7077C475.533 81.622 477.316 86.8364 478.639 91.8327C474.749 91.5878 469.26 91.7297 465.293 91.7398C464.181 89.1491 463.246 85.269 462.491 82.4739L459.55 82.2408C453.38 82.1828 447.21 82.2197 441.041 82.3515C440.013 84.9421 438.922 89.1562 438.124 91.9554C435.131 91.6089 427.026 92.1126 425.265 91.3006C425.115 88.8069 442.022 38.2583 444.042 32.0152ZM443.963 72.7658C446.574 72.7429 449.184 72.7401 451.795 72.7579C454.318 72.753 456.838 72.733 459.361 72.6978C458.582 70.1771 452.011 47.6942 451.191 47.1118C450.939 49.1296 450.34 51.0922 449.788 53.0433C447.916 59.6363 445.729 66.1423 443.963 72.7658Z" fill="currentColor"/><path d="M519.087 32.0512C520.864 31.8959 530.76 31.6787 531.834 32.4393C531.594 34.6287 517.125 58.5271 514.954 61.7193C517.871 67.0766 531.555 87.809 531.949 91.7957C527.928 91.63 523.139 91.7386 519.036 91.7159C516.89 88.7549 514.282 83.4981 512.543 80.225C510.859 77.0525 509.4 74.6717 507.508 71.5905C503.856 77.4994 499.288 86.4077 495.639 91.7323C493.69 91.7427 484.672 91.9378 483.283 91.5431C482.619 89.9295 486.541 83.9868 487.564 82.2647L495.811 68.5339C497.022 66.4764 498.711 63.7701 499.537 61.5957C496.626 56.4565 493.646 51.3572 490.598 46.2988C489.196 44.002 482.794 34.0217 482.917 32.2723L483.398 32.0047C487.49 31.9282 491.585 31.9238 495.68 31.9911C496.82 33.5634 498.785 37.2672 499.848 39.1126C502.372 43.483 504.919 47.8389 507.494 52.1806C509.637 48.7075 511.66 45.1619 513.563 41.5504C514.924 38.9773 517.316 34.2617 519.087 32.0512Z" fill="currentColor"/><path d="M344.865 32.0127C348.344 31.8326 353.186 31.9149 356.69 32.0379C356.955 41.028 356.676 51.4802 356.761 60.4938C356.794 64.0192 357.029 90.8783 356.406 91.7985C352.543 91.6698 348.317 91.7485 344.427 91.7477C343.998 73.5245 344.597 55.1086 344.356 36.8669C344.34 35.687 344.173 32.8709 344.865 32.0127Z" fill="currentColor"/><path d="M265.855 31.9962C269.611 31.9361 273.368 31.9358 277.124 31.9954C277.367 36.9947 277.553 89.9965 277.066 91.3125C276.949 91.6254 276.705 91.6505 276.416 91.7839C272.624 91.7038 268.692 91.7369 264.89 91.7164C264.75 86.2836 264.494 33.9187 265.11 32.313L265.855 31.9962Z" fill="currentColor"/><path d="M90.152 117.149C90.5071 108.307 90.2821 98.1757 90.2824 89.2285L90.2807 39.7923L90.284 21.4893C90.2854 17.9381 90.0426 13.9707 90.5675 10.5246C92.8495 -4.45876 115.5 -3.10579 115.683 12.4296C115.763 19.1578 115.771 25.9425 115.77 32.6341L115.784 80.4275C115.793 83.4645 115.676 86.5632 115.722 89.5977C115.805 95.127 115.419 97.473 121.167 99.0992L124.347 98.03C125.01 97.1743 125.751 96.2688 126.296 95.3402L126.294 61.1664C126.291 55.2384 125.971 48.79 126.707 42.9391C127.771 34.4707 137.785 29.7057 145.149 33.89C148.025 35.5246 150.964 38.4998 151.532 41.9008C152.458 47.4443 151.803 53.3556 151.998 58.9755C151.95 68.1149 152.097 77.3518 151.974 86.458C151.96 87.2148 151.934 87.9713 151.894 88.7273C151.057 89.8678 150.208 91.0228 148.701 91.2693C147.893 91.4002 147.066 91.1999 146.407 90.7134C143.707 88.6882 144.581 79.4084 144.602 75.9956L144.675 54.4529C144.687 48.8791 145.901 36.0043 136.047 40.9814C135.083 42.2736 134.434 43.1924 134.239 44.8498C133.718 49.2735 133.929 54.4611 133.937 58.9556L133.985 85.2014C133.991 89.0694 134.379 95.1609 133.099 98.6031C130.331 106.054 119.727 108.764 113.53 103.927C111.404 102.268 108.974 99.2536 108.669 96.4725C108.056 89.8905 108.301 82.5394 108.303 75.8953L108.309 32.296C108.309 26.5367 108.66 15.611 108.146 10.4443C106.908 9.01598 106.299 8.4258 104.595 7.441C101.213 7.58752 99.9265 7.83377 98.0234 10.8889C97.5871 19.495 97.8744 30.3578 97.8738 39.1027L97.8722 90.0479L97.9001 107.013C97.9222 113.579 99.037 119.81 93.7098 124.634C92.7702 125.498 91.7656 126.288 90.7055 126.999H79.2266C70.2468 120.495 72.4596 114.363 72.1964 104.318C72.16 102.931 72.6302 101.212 73.3869 100.079C74.2835 98.6452 76.8427 98.7168 78.1089 99.6228C82.9014 104.619 74.442 121.65 85.98 120.452C87.5682 120.287 88.961 118.801 89.9125 117.497C89.9956 117.383 90.0754 117.267 90.152 117.149Z" fill="currentColor"/><path d="M54.1038 104.615L54.0669 40.4261L54.071 21.8738C54.0727 18.0539 53.8504 13.8619 54.4081 10.1282C55.8872 0.22075 68.6299 -3.02492 75.7361 3.24176C77.2336 4.56232 78.7983 7.70773 79.2261 9.72221C79.8832 17.0421 79.6194 25.5635 79.6216 32.9113L79.6225 82.4877C79.6203 83.9196 79.7405 87.9724 79.1796 89.0156C77.3664 92.3885 74.4478 91.6025 72.5392 89.0389C71.9145 85.3025 72.2163 72.7201 72.2234 68.3417L72.2357 27.1659C72.2349 22.2011 72.4028 16.3243 72.0305 11.3922C71.7265 7.36531 64.7391 6.06593 62.6165 9.52387C61.9583 10.4054 61.7579 11.7878 61.7409 12.8655C61.619 20.6982 61.7144 28.5668 61.7144 36.4011L61.7051 84.4331C61.7048 90.2496 62.5268 102.697 60.8091 107.788C56.9793 119.139 38.5822 118.021 36.3628 105.77C35.7275 101.962 36.0889 96.8997 36.0941 92.9572L36.1403 60.0177C36.1438 54.7566 36.389 49.2861 35.8205 44.0744C35.4963 41.1028 33.1019 40.3296 30.6351 39.6043C24.6296 41.6019 25.2765 44.3469 25.3004 50.1282L25.3626 62.5089C25.4012 70.4582 26.1158 78.2179 17.032 81.5861C13.7767 82.793 9.66831 82.4528 6.56839 80.9223C3.13562 79.2272 1.75859 76.4928 0 73.3736V59.277C3.33753 55.4983 7.20821 56.5197 7.43193 61.4714C7.6428 66.1386 5.70722 74.7005 12.6884 75.1501C18.1363 75.5007 17.9462 67.2401 17.9311 64.1175L17.8683 52.0137C17.8443 46.7187 17.3132 39.8338 21.467 35.9138C29.5403 28.2952 43.3955 33.515 43.4341 44.9441C43.4516 50.1191 43.4827 55.2857 43.4759 60.4118L43.4701 88.1203C43.4701 92.8728 43.1366 98.4786 43.5371 103.119C44.1062 109.717 50.0841 109.227 53.7843 104.992C53.8939 104.869 54.0002 104.743 54.1038 104.615Z" fill="currentColor"/></svg></div>'+
        '<div class="token-title">Token \\u989D\\u5EA6</div>'+
        '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">\\u4F59\\u989D (credits)</span>'+
            '<span class="token-status'+(b.avail?'':' unavail')+'"><span class="token-status-dot'+(b.avail?'':' unavail')+'"></span>'+(b.avail?'\\u53EF\\u7528':'\\u4E0D\\u53EF\\u7528')+'</span>'+
          '</div>'+
          '<div class="token-big-amount">'+balText2+'</div>'+
          totalRow2+
        '</div>'+
        '<div class="token-footer">'+
          '<span class="token-refresh" onclick="renderWidget()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
          '<span class="token-recharge" onclick="window.open(\\'https://platform.minimaxi.com/console/usage\\',\\'_blank\\')">\\u524D\\u5F80\\u67E5\\u770B</span>'+
        '</div>'+
      '</div>';
      body.innerHTML = htmlLegacy;
      return;
    }
    // \u5957\u9910\u6A21\u5F0F:\u9010\u6A21\u578B\u5C55\u793A 5h \u7A97\u53E3 + \u5468\u9650\u989D
    var cards = '';
    for (var wi2 = 0; wi2 < (b.windows||[]).length; wi2++) {
      var win = b.windows[wi2];
      var used = win.usedPct || 0;
      var resetTxt = '';
      if (win.endTime) {
        if (win.resetInMin <= 0) resetTxt = '\\u7A97\\u53E3\\u5DF2\\u91CD\\u7F6E';
        else if (win.resetInMin < 60) resetTxt = win.resetInMin + ' \\u5206\\u949F\\u540E\\u91CD\\u7F6E';
        else if (win.resetInMin < 60 * 24) {
          var hh = Math.floor(win.resetInMin / 60);
          var mm = win.resetInMin % 60;
          resetTxt = hh + ' \\u5C0F\\u65F6' + (mm > 0 ? (' ' + mm + ' \\u5206\\u949F') : '') + ' \\u540E\\u91CD\\u7F6E';
        } else {
          var dd = Math.floor(win.resetInMin / 1440);
          resetTxt = dd + ' \\u5929\\u540E\\u91CD\\u7F6E';
        }
      }
      var barColor = used >= 90 ? '#e74c3c' : (used >= 70 ? '#e67e22' : '#4a90e2');
      cards += '<div class="token-card">'+
        '<div class="token-label-row">'+
          '<span class="token-label">'+win.model+'</span>'+
          '<span class="token-status"><span class="token-status-dot"></span>5h \\u7A97\\u53E3</span>'+
        '</div>'+
        '<div style="display:flex;align-items:center;gap:8px;margin:8px 0 4px">'+
          '<div style="flex:1;height:10px;background:var(--ifto-g6,var(--g6));border-radius:9999px;overflow:hidden">'+
            '<div style="height:100%;width:'+used.toFixed(1)+'%;background:'+barColor+';border-radius:9999px;transition:width 0.3s"></div>'+
          '</div>'+
          '<div style="min-width:54px;text-align:right;font-size:14px;font-weight:600;color:'+barColor+'">'+used.toFixed(0)+'%</div>'+
        '</div>'+
        '<div class="token-usage-row">'+
          '<span class="token-usage-sub">\\u5DF2\\u7528 '+used.toFixed(1)+'% \\u00B7 '+resetTxt+'</span>'+
        '</div>'+
      '</div>';
    }
    if (b.weekly) {
      if (b.weekly.unlimited) {
        cards += '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">\\u5468\\u9650\\u989D</span>'+
            '<span class="token-status"><span class="token-status-dot"></span>\\u65E0\\u9650\\u5236</span>'+
          '</div>'+
          '<div class="token-usage-row"><span class="token-usage-sub">\\u221E \\u00B7 \\u4E0D\\u53D7\\u5468\\u9650\\u989D\\u7EA6\\u675F</span></div>'+
        '</div>';
      } else {
        var wUsed = b.weekly.usedPct || 0;
        var wColor = wUsed >= 90 ? '#e74c3c' : (wUsed >= 70 ? '#e67e22' : '#4a90e2');
        cards += '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">\\u5468\\u9650\\u989D</span>'+
            '<span class="token-status"><span class="token-status-dot"></span>\\u672C\\u5468</span>'+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px;margin:8px 0 4px">'+
            '<div style="flex:1;height:10px;background:var(--ifto-g6,var(--g6));border-radius:9999px;overflow:hidden">'+
              '<div style="height:100%;width:'+wUsed.toFixed(1)+'%;background:'+wColor+';border-radius:9999px;transition:width 0.3s"></div>'+
            '</div>'+
            '<div style="min-width:54px;text-align:right;font-size:14px;font-weight:600;color:'+wColor+'">'+wUsed.toFixed(0)+'%</div>'+
          '</div>'+
          '<div class="token-usage-row"><span class="token-usage-sub">\\u5DF2\\u7528 '+wUsed.toFixed(1)+'%</span></div>'+
        '</div>';
      }
    }
    var html2 = '<div class="token-section">'+
'<div class="token-logo" style="display:block;text-align:center;margin:0 auto 6px"><svg width="200" viewBox="0 0 532 127" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:200px;height:auto;display:inline-block"><path d="M242.658 32.0206C246.102 31.8118 251.125 31.9255 254.625 32.0228C254.922 34.5364 254.801 39.568 254.803 42.2778L254.811 60.6297L254.809 79.7618C254.808 83.0451 254.95 88.1395 254.575 91.2595C253.366 92.0215 244.708 91.7531 242.509 91.8146C241.998 88.0545 242.276 74.9741 242.284 70.4965C242.303 65.1999 242.03 57.9428 242.36 52.8424C239.846 56.1117 235.15 64.0186 232.793 67.7782C230.284 67.9348 228.399 67.9212 225.91 67.8635C223.675 65.052 218.249 55.7856 216.156 52.3627C215.856 61.0924 216.219 70.4905 216.072 79.2795C216.002 83.4331 216.241 87.6513 215.941 91.8056C212.354 91.6031 207.553 91.7228 203.874 91.7058C203.202 78.802 204.138 65.0947 203.778 52.1097C203.599 45.6435 203.675 38.4952 203.881 32.0179C207.472 31.8301 212.151 31.9288 215.771 32.0182C217.243 33.7558 218.774 36.3848 220.073 38.3102C223.186 42.9258 226.183 48.1281 229.513 52.5431C230.563 50.4761 232.931 46.9507 234.231 44.9299C236.989 40.5939 239.798 36.2905 242.658 32.0206Z" fill="currentColor"/><path d="M405.846 32.0108C409.304 31.8018 414.432 31.9346 417.95 32.0456L417.945 91.8545C415.326 91.6323 407.16 92.2178 405.876 91.2156C405.039 88.9296 405.386 73.3174 405.397 69.8098C405.386 63.8372 405.419 58.4537 405.665 52.4789L395.994 67.7821C393.457 67.9436 391.325 67.9108 388.799 67.8646C386.068 62.9673 382.411 57.2588 379.248 52.5642C379.056 65.3688 379.543 79.1232 379.106 91.766L367.108 91.743C366.794 89.2439 366.892 85.5568 366.889 82.9443L366.878 69.259C366.876 57.5291 366.837 45.7258 366.93 33.9912C366.936 33.1896 366.968 32.4921 367.515 31.9838C370.776 31.9327 375.754 31.7952 378.876 32.1103C380.265 33.6925 382.465 37.3039 383.69 39.201C386.511 43.6594 389.381 48.0877 392.298 52.4849C396.098 46.3058 401.688 38.0244 405.846 32.0108Z" fill="currentColor"/><path d="M284.748 31.9931C288.288 31.8969 292.003 31.963 295.559 31.9788C297.177 33.9931 299.963 39.017 301.546 41.4721C307.436 50.6098 312.813 60.3028 318.743 69.4011C318.931 65.5093 318.647 60.8358 318.557 56.9201C318.486 51.9719 318.458 47.0232 318.477 42.0745C318.477 39.2922 318.335 34.5665 318.803 31.9685C322.072 31.9389 327.635 31.7782 330.691 32.1748C331.383 50.9216 330.472 72.12 330.653 91.0945C330.656 91.4634 330.478 91.5238 330.213 91.7654L319.278 91.7086C317.042 88.6864 314.281 83.654 312.215 80.3167C306.767 71.5671 301.401 62.7675 296.114 53.919C296.015 64.3431 296.256 74.7382 296.24 85.1618C296.234 87.4439 296.3 89.7102 296.081 91.9846C293.829 91.5449 286.934 91.7529 284.256 91.7898C283.763 72.6677 284.403 52.0602 284.329 32.816C284.329 32.3773 284.477 32.3139 284.748 31.9931Z" fill="currentColor"/><path d="M444.042 32.0152C448.189 31.843 455.162 31.8329 459.238 32.0699C460.285 34.3919 461.114 37.4067 461.923 39.8566C465.974 52.122 469.779 64.4571 473.885 76.7077C475.533 81.622 477.316 86.8364 478.639 91.8327C474.749 91.5878 469.26 91.7297 465.293 91.7398C464.181 89.1491 463.246 85.269 462.491 82.4739L459.55 82.2408C453.38 82.1828 447.21 82.2197 441.041 82.3515C440.013 84.9421 438.922 89.1562 438.124 91.9554C435.131 91.6089 427.026 92.1126 425.265 91.3006C425.115 88.8069 442.022 38.2583 444.042 32.0152ZM443.963 72.7658C446.574 72.7429 449.184 72.7401 451.795 72.7579C454.318 72.753 456.838 72.733 459.361 72.6978C458.582 70.1771 452.011 47.6942 451.191 47.1118C450.939 49.1296 450.34 51.0922 449.788 53.0433C447.916 59.6363 445.729 66.1423 443.963 72.7658Z" fill="currentColor"/><path d="M519.087 32.0512C520.864 31.8959 530.76 31.6787 531.834 32.4393C531.594 34.6287 517.125 58.5271 514.954 61.7193C517.871 67.0766 531.555 87.809 531.949 91.7957C527.928 91.63 523.139 91.7386 519.036 91.7159C516.89 88.7549 514.282 83.4981 512.543 80.225C510.859 77.0525 509.4 74.6717 507.508 71.5905C503.856 77.4994 499.288 86.4077 495.639 91.7323C493.69 91.7427 484.672 91.9378 483.283 91.5431C482.619 89.9295 486.541 83.9868 487.564 82.2647L495.811 68.5339C497.022 66.4764 498.711 63.7701 499.537 61.5957C496.626 56.4565 493.646 51.3572 490.598 46.2988C489.196 44.002 482.794 34.0217 482.917 32.2723L483.398 32.0047C487.49 31.9282 491.585 31.9238 495.68 31.9911C496.82 33.5634 498.785 37.2672 499.848 39.1126C502.372 43.483 504.919 47.8389 507.494 52.1806C509.637 48.7075 511.66 45.1619 513.563 41.5504C514.924 38.9773 517.316 34.2617 519.087 32.0512Z" fill="currentColor"/><path d="M344.865 32.0127C348.344 31.8326 353.186 31.9149 356.69 32.0379C356.955 41.028 356.676 51.4802 356.761 60.4938C356.794 64.0192 357.029 90.8783 356.406 91.7985C352.543 91.6698 348.317 91.7485 344.427 91.7477C343.998 73.5245 344.597 55.1086 344.356 36.8669C344.34 35.687 344.173 32.8709 344.865 32.0127Z" fill="currentColor"/><path d="M265.855 31.9962C269.611 31.9361 273.368 31.9358 277.124 31.9954C277.367 36.9947 277.553 89.9965 277.066 91.3125C276.949 91.6254 276.705 91.6505 276.416 91.7839C272.624 91.7038 268.692 91.7369 264.89 91.7164C264.75 86.2836 264.494 33.9187 265.11 32.313L265.855 31.9962Z" fill="currentColor"/><path d="M90.152 117.149C90.5071 108.307 90.2821 98.1757 90.2824 89.2285L90.2807 39.7923L90.284 21.4893C90.2854 17.9381 90.0426 13.9707 90.5675 10.5246C92.8495 -4.45876 115.5 -3.10579 115.683 12.4296C115.763 19.1578 115.771 25.9425 115.77 32.6341L115.784 80.4275C115.793 83.4645 115.676 86.5632 115.722 89.5977C115.805 95.127 115.419 97.473 121.167 99.0992L124.347 98.03C125.01 97.1743 125.751 96.2688 126.296 95.3402L126.294 61.1664C126.291 55.2384 125.971 48.79 126.707 42.9391C127.771 34.4707 137.785 29.7057 145.149 33.89C148.025 35.5246 150.964 38.4998 151.532 41.9008C152.458 47.4443 151.803 53.3556 151.998 58.9755C151.95 68.1149 152.097 77.3518 151.974 86.458C151.96 87.2148 151.934 87.9713 151.894 88.7273C151.057 89.8678 150.208 91.0228 148.701 91.2693C147.893 91.4002 147.066 91.1999 146.407 90.7134C143.707 88.6882 144.581 79.4084 144.602 75.9956L144.675 54.4529C144.687 48.8791 145.901 36.0043 136.047 40.9814C135.083 42.2736 134.434 43.1924 134.239 44.8498C133.718 49.2735 133.929 54.4611 133.937 58.9556L133.985 85.2014C133.991 89.0694 134.379 95.1609 133.099 98.6031C130.331 106.054 119.727 108.764 113.53 103.927C111.404 102.268 108.974 99.2536 108.669 96.4725C108.056 89.8905 108.301 82.5394 108.303 75.8953L108.309 32.296C108.309 26.5367 108.66 15.611 108.146 10.4443C106.908 9.01598 106.299 8.4258 104.595 7.441C101.213 7.58752 99.9265 7.83377 98.0234 10.8889C97.5871 19.495 97.8744 30.3578 97.8738 39.1027L97.8722 90.0479L97.9001 107.013C97.9222 113.579 99.037 119.81 93.7098 124.634C92.7702 125.498 91.7656 126.288 90.7055 126.999H79.2266C70.2468 120.495 72.4596 114.363 72.1964 104.318C72.16 102.931 72.6302 101.212 73.3869 100.079C74.2835 98.6452 76.8427 98.7168 78.1089 99.6228C82.9014 104.619 74.442 121.65 85.98 120.452C87.5682 120.287 88.961 118.801 89.9125 117.497C89.9956 117.383 90.0754 117.267 90.152 117.149Z" fill="currentColor"/><path d="M54.1038 104.615L54.0669 40.4261L54.071 21.8738C54.0727 18.0539 53.8504 13.8619 54.4081 10.1282C55.8872 0.22075 68.6299 -3.02492 75.7361 3.24176C77.2336 4.56232 78.7983 7.70773 79.2261 9.72221C79.8832 17.0421 79.6194 25.5635 79.6216 32.9113L79.6225 82.4877C79.6203 83.9196 79.7405 87.9724 79.1796 89.0156C77.3664 92.3885 74.4478 91.6025 72.5392 89.0389C71.9145 85.3025 72.2163 72.7201 72.2234 68.3417L72.2357 27.1659C72.2349 22.2011 72.4028 16.3243 72.0305 11.3922C71.7265 7.36531 64.7391 6.06593 62.6165 9.52387C61.9583 10.4054 61.7579 11.7878 61.7409 12.8655C61.619 20.6982 61.7144 28.5668 61.7144 36.4011L61.7051 84.4331C61.7048 90.2496 62.5268 102.697 60.8091 107.788C56.9793 119.139 38.5822 118.021 36.3628 105.77C35.7275 101.962 36.0889 96.8997 36.0941 92.9572L36.1403 60.0177C36.1438 54.7566 36.389 49.2861 35.8205 44.0744C35.4963 41.1028 33.1019 40.3296 30.6351 39.6043C24.6296 41.6019 25.2765 44.3469 25.3004 50.1282L25.3626 62.5089C25.4012 70.4582 26.1158 78.2179 17.032 81.5861C13.7767 82.793 9.66831 82.4528 6.56839 80.9223C3.13562 79.2272 1.75859 76.4928 0 73.3736V59.277C3.33753 55.4983 7.20821 56.5197 7.43193 61.4714C7.6428 66.1386 5.70722 74.7005 12.6884 75.1501C18.1363 75.5007 17.9462 67.2401 17.9311 64.1175L17.8683 52.0137C17.8443 46.7187 17.3132 39.8338 21.467 35.9138C29.5403 28.2952 43.3955 33.515 43.4341 44.9441C43.4516 50.1191 43.4827 55.2857 43.4759 60.4118L43.4701 88.1203C43.4701 92.8728 43.1366 98.4786 43.5371 103.119C44.1062 109.717 50.0841 109.227 53.7843 104.992C53.8939 104.869 54.0002 104.743 54.1038 104.615Z" fill="currentColor"/></svg></div>'+
      '<div class="token-title">\\u5957\\u9910\\u7528\\u91CF</div>'+
      cards+
      '<div class="token-footer">'+
        '<span class="token-refresh" onclick="renderWidget()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
        '<span class="token-recharge" onclick="window.open(\\'https://platform.minimaxi.com/console/usage\\',\\'_blank\\')">\\u524D\\u5F80\\u67E5\\u770B</span>'+
      '</div>'+
    '</div>';
  body.innerHTML = html2;
});
}
function renderCalPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var now = new Date();
  var y = now.getFullYear(), m = now.getFullYear() + '/' + String(now.getMonth()+1).padStart(2,'0');
  var title = y + '\\u5E74' + (now.getMonth()+1) + '\\u6708';
  var first = new Date(y, now.getMonth(), 1).getDay();
  first = first === 0 ? 6 : first - 1;
  var days = new Date(y, now.getMonth()+1, 0).getDate();
  var today = now.getDate();
  var wds = ['\\u4E00','\\u4E8C','\\u4E09','\\u56DB','\\u4E94','\\u516D','\\u65E5'];
  var html = '<div class="cal-title" style="margin-bottom:12px">' + title + '</div><div class="cal-grid">';
  for(var i=0;i<7;i++) html += '<div class="cal-header">' + wds[i] + '</div>';
  for(var i=0;i<first;i++) html += '<div class="cal-day" style="visibility:hidden"></div>';
  for(var d=1;d<=days;d++) {
    html += '<div class="cal-day' + (d===today?' today':'') + '">' + d + '</div>';
  }
  html += '</div>';
  html += '<div id="calWeather" class="cal-weather"><div class="cal-weather-main" style="justify-content:center;font-size:12px;color:var(--g4)">\\u52A0\\u8F7D\\u5929\\u6C14...</div></div>';
  body.innerHTML = html;
  fetchWeather();
}
async function fetchWeather() {
  var el = document.getElementById('calWeather');
  if(!el) return;
  if(typeof window.__IFTO_fetchWeatherUrl !== 'function') {
    el.innerHTML = '<div class="cal-weather-main" style="justify-content:center;font-size:12px;color:var(--g4)">\u63D2\u4EF6\u672A\u52A0\u8F7D</div>';
    return;
  }
  el.innerHTML = '<div class="cal-weather-main" style="justify-content:center;font-size:12px;color:var(--g4)">\u52A0\u8F7D\u5929\u6C14...</div>';

  var cityCoords = {
    '\u5317\u4EAC':{lat:39.9,lon:116.4,code:'101010100'},'\u4E0A\u6D77':{lat:31.2,lon:121.5,code:'101020100'},'\u5929\u6D25':{lat:39.1,lon:117.2,code:'101030100'},
    '\u91CD\u5E86':{lat:29.6,lon:106.5,code:'101040100'},'\u5E7F\u5DDE':{lat:23.1,lon:113.3,code:'101280101'},'\u6DF1\u5733':{lat:22.5,lon:114.1,code:'101280601'},
    '\u676D\u5DDE':{lat:30.3,lon:120.2,code:'101210101'},'\u5357\u4EAC':{lat:32.1,lon:118.8,code:'101190101'},'\u6210\u90FD':{lat:30.6,lon:104.1,code:'101270101'},
    '\u6B66\u6C49':{lat:30.6,lon:114.3,code:'101200101'},'\u897F\u5B89':{lat:34.3,lon:108.9,code:'101110101'},'\u957F\u6C99':{lat:28.2,lon:112.9,code:'101250101'},
    '\u82CF\u5DDE':{lat:31.3,lon:120.6,code:'101190401'},'\u9752\u5C9B':{lat:36.1,lon:120.4,code:'101120201'},'\u5927\u8FDE':{lat:38.9,lon:121.6,code:'101070201'},
    '\u53A6\u95E8':{lat:24.5,lon:118.1,code:'101230201'},'\u6606\u660E':{lat:25.0,lon:102.7,code:'101290101'},'\u5B81\u6CE2':{lat:29.9,lon:121.5,code:'101210401'},
    '\u90D1\u5DDE':{lat:34.8,lon:113.7,code:'101180101'},'\u6C88\u9633':{lat:41.8,lon:123.4,code:'101070101'},'\u6D4E\u5357':{lat:36.7,lon:117.0,code:'101120101'},
    '\u54C8\u5C14\u6EE8':{lat:45.8,lon:126.5,code:'101050101'},'\u798F\u5DDE':{lat:26.1,lon:119.3,code:'101230101'},'\u5408\u80A5':{lat:31.8,lon:117.3,code:'101220101'},
    '\u4E1C\u839E':{lat:23.0,lon:113.8,code:'101281601'},'\u4F5B\u5C71':{lat:23.0,lon:113.1,code:'101280301'},'\u73E0\u6D77':{lat:22.3,lon:113.6,code:'101280701'},
    '\u957F\u6625':{lat:43.9,lon:125.3,code:'101060101'},'\u8D35\u9633':{lat:26.6,lon:106.6,code:'101260101'},'\u5357\u5B81':{lat:22.8,lon:108.4,code:'101300101'},
    '\u592A\u539F':{lat:37.9,lon:112.5,code:'101100101'},'\u77F3\u5BB6\u5E84':{lat:38.0,lon:114.5,code:'101090101'},'\u5357\u660C':{lat:28.7,lon:115.9,code:'101240101'},
    '\u5170\u5DDE':{lat:36.1,lon:103.8,code:'101160101'},'\u547C\u548C\u6D69\u7279':{lat:40.8,lon:111.7,code:'101080101'},'\u4E4C\u9C81\u6728\u9F50':{lat:43.8,lon:87.6,code:'101130101'},
    '\u62C9\u8428':{lat:29.7,lon:91.1,code:'101140101'},'\u897F\u5B81':{lat:36.6,lon:101.8,code:'101150101'},'\u94F6\u5DDD':{lat:38.5,lon:106.2,code:'101170101'},
    '\u6D77\u53E3':{lat:20.0,lon:110.3,code:'101310101'},'\u4E09\u4E9A':{lat:18.3,lon:109.5,code:'101310201'},'\u6842\u6797':{lat:25.3,lon:110.3,code:'101300501'},
    '\u6D1B\u9633':{lat:34.6,lon:112.4,code:'101180901'},'\u5F90\u5DDE':{lat:34.3,lon:117.2,code:'101190801'},'\u6E29\u5DDE':{lat:28.0,lon:120.7,code:'101210701'},
    '\u65E0\u9521':{lat:31.5,lon:120.3,code:'101190201'},'\u5E38\u5DDE':{lat:31.8,lon:119.9,code:'101191101'},'\u5510\u5C71':{lat:39.6,lon:118.2,code:'101090501'}
  };

  // Get location: manual lat/lon > manual city name (with geocoding) > IP auto-detect
  var lat, lon, displayCity, weatherCode;
  // Priority 1: Manual lat/lon coordinates
  var manualLat = localStorage.getItem('ifto_weather_manual_lat');
  var manualLon = localStorage.getItem('ifto_weather_manual_lon');
  if(manualLat && manualLon && !isNaN(parseFloat(manualLat)) && !isNaN(parseFloat(manualLon))) {
    lat = parseFloat(manualLat);
    lon = parseFloat(manualLon);
    displayCity = localStorage.getItem('ifto_weather_manual_city_name') || '';
    if(!displayCity) displayCity = lat.toFixed(2) + ', ' + lon.toFixed(2);
  } else {
  var manualCity = localStorage.getItem('ifto_weather_city') || '';
  if(manualCity && cityCoords[manualCity]) {
    lat = cityCoords[manualCity].lat;
    lon = cityCoords[manualCity].lon;
    weatherCode = cityCoords[manualCity].code;
    displayCity = manualCity;
  } else if(manualCity) {
    // Manual city set but not in cityCoords \u2014 try Open-Meteo Geocoding API
    try {
      var geoRes = await window.__IFTO_fetchWeatherUrl('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(manualCity)+'&count=1&language=zh&format=json');
      if(geoRes && geoRes.indexOf('__IFTO_ERROR__') !== 0) {
        var geoData = JSON.parse(geoRes);
        if(geoData.results && geoData.results.length > 0) {
          lat = geoData.results[0].latitude;
          lon = geoData.results[0].longitude;
          displayCity = geoData.results[0].name;
          // Cache geocoding result so next load doesn't re-query
          localStorage.setItem('ifto_weather_manual_lat', String(lat));
          localStorage.setItem('ifto_weather_manual_lon', String(lon));
          localStorage.setItem('ifto_weather_manual_city_name', displayCity);
          localStorage.removeItem('ifto_weather_city');
        }
      }
    } catch(e){console.error('IFTO: geocoding error', e)}
    if(!lat || !lon) {
      // Geocoding failed, fall through to IP detection below
    }
  }
  if(!lat || !lon) {
    var cachedLat = localStorage.getItem('ifto_weather_lat');
    var cachedLon = localStorage.getItem('ifto_weather_lon');
    var cachedCity = localStorage.getItem('ifto_weather_auto_city');
    if(cachedLat && cachedLon) {
      lat = parseFloat(cachedLat);
      lon = parseFloat(cachedLon);
      displayCity = cachedCity || '\u5317\u4EAC';
      // Try to find city code for auto-detected city
      if(cachedCity && cityCoords[cachedCity]) weatherCode = cityCoords[cachedCity].code;
    } else {
      var _ipSuccess = false;
      // Attempt 1: ip-api.com (works outside China)
      try {
        var ipRes = await window.__IFTO_fetchWeatherUrl('https://ip-api.com/json/?lang=zh-CN');
        if(ipRes && ipRes.indexOf('__IFTO_ERROR__') !== 0) {
          var ipData = JSON.parse(ipRes);
          if(ipData.lat && ipData.lon) {
            lat = ipData.lat; lon = ipData.lon;
            displayCity = ipData.city || '\u5317\u4EAC';
            if(displayCity && cityCoords[displayCity]) weatherCode = cityCoords[displayCity].code;
            _ipSuccess = true;
          }
        }
      } catch(e){console.error('IFTO: ip-api error',e)}
      // Attempt 2: China-friendly API
      if(!_ipSuccess) {
        try {
          var ipRes2 = await window.__IFTO_fetchWeatherUrl('https://ip.useragentinfo.com/json');
          if(ipRes2 && ipRes2.indexOf('__IFTO_ERROR__') !== 0) {
            var ipData2 = JSON.parse(ipRes2);
            var cnCity = (ipData2.city || '').replace(/\u5E02$/g, '');
            if(cnCity && cityCoords[cnCity]) {
              lat = cityCoords[cnCity].lat; lon = cityCoords[cnCity].lon;
              displayCity = cnCity;
              weatherCode = cityCoords[cnCity].code;
              _ipSuccess = true;
            }
          }
        } catch(e2){console.error('IFTO: useragentinfo error',e2)}
      }
      if(_ipSuccess) {
        localStorage.setItem('ifto_weather_lat', String(lat));
        localStorage.setItem('ifto_weather_lon', String(lon));
        localStorage.setItem('ifto_weather_auto_city', displayCity);
      }
    }
  }
}
  // Fallback
  if(!lat || !lon) { lat = 39.9; lon = 116.4; displayCity = displayCity || '\u5317\u4EAC'; weatherCode = weatherCode || '101010100'; }

  // Fetch weather \u2014 try Open-Meteo first, fallback to scraping weather.com.cn
  var weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=4';
  var text = await window.__IFTO_fetchWeatherUrl(weatherUrl);
  var isFallback = false;
  if(text && text.indexOf('__IFTO_ERROR__') === 0 && weatherCode) {
    // Fallback: scrape weather.com.cn 7-day page directly
    isFallback = true;
    weatherUrl = 'https://www.weather.com.cn/weather/' + weatherCode + '.shtml';
    text = await window.__IFTO_fetchWeatherUrl(weatherUrl);
    if(text && text.indexOf('__IFTO_ERROR__') === 0) {
      var errMsg = text.replace('__IFTO_ERROR__: ','');
      el.innerHTML = '<div style="text-align:center;font-size:20px;font-weight:600;color:var(--g1);margin-bottom:6px;cursor:pointer" onclick="setWeatherCity()" title="\u70B9\u51FB\u4FEE\u6539\u57CE\u5E02">'+displayCity+'</div><div class="cal-weather-main" style="justify-content:center;font-size:11px;color:var(--g4);padding:8px">\u8FDE\u63A5\u5931\u8D25: '+errMsg+'</div>';
      return;
    }
  } else if(text && text.indexOf('__IFTO_ERROR__') === 0) {
    var errMsg = text.replace('__IFTO_ERROR__: ','');
    el.innerHTML = '<div style="text-align:center;font-size:20px;font-weight:600;color:var(--g1);margin-bottom:6px;cursor:pointer" onclick="setWeatherCity()" title="\u70B9\u51FB\u4FEE\u6539\u57CE\u5E02">'+displayCity+'</div><div class="cal-weather-main" style="justify-content:center;font-size:11px;color:var(--g4);padding:8px">\u8FDE\u63A5\u5931\u8D25: '+errMsg+'</div>';
    return;
  }
  var temp = '--', desc = '--', icon = '\\u2600', hi = '--', lo = '--', fHtml = '';
  try {
    if(text) {
      if(isFallback) {
        // Scrape weather.com.cn HTML for current + forecast
        var dayN = ['\u65E5','\u4E00','\u4E8C','\u4E09','\u56DB','\u4E94','\u516D'];
        var liRegex = /<li>([\\s\\S]*?)<\\/li>/g;
        var lis = [], m;
        while((m = liRegex.exec(text)) !== null) lis.push(m[1]);
        if(lis.length >= 1) {
          var tWea = lis[0].match(/<p class="wea">\\s*([^<]+)/);
          var tHi = lis[0].match(/<span>\\s*(\\d+)/);
          var tLo = lis[0].match(/<i>\\s*(\\d+)/);
          if(tWea) { desc = tWea[1]; icon = getWeatherEmoji(desc); }
          if(tHi) { hi = tHi[1]; temp = tHi[1]; }
          if(tLo) lo = tLo[1];
        }
        if(lis.length >= 4) {
          fHtml = '<div class="cal-forecast">';
          for(var fi=1;fi<=3&&fi<lis.length;fi++) {
            var fWea = lis[fi].match(/<p class="wea">\\s*([^<]+)/);
            var fHi = lis[fi].match(/<span>\\s*(\\d+)/);
            var fLo = lis[fi].match(/<i>\\s*(\\d+)/);
            var fIcon = fWea ? getWeatherEmoji(fWea[1]) : '\\u2600';
            var d = new Date(); d.setDate(d.getDate() + fi);
            var dn = dayN[d.getDay()] || '';
            fHtml += '<div class="wf-day"><span class="wf-icon">'+fIcon+'</span><span>'+dn+'</span><span>'+(fHi?fHi[1]+'\xB0':'--')+'</span><span style="color:var(--g4)">'+(fLo?fLo[1]+'\xB0':'--')+'</span></div>';
          }
          fHtml += '</div>';
        }
      } else {
        // Parse Open-Meteo JSON
        var data = JSON.parse(text);
        if(data.current) {
          temp = data.current.temperature_2m !== undefined ? data.current.temperature_2m : '--';
          var wCode = data.current.weather_code !== undefined ? data.current.weather_code : -1;
          desc = getWeatherDesc(wCode);
          icon = getWeatherEmoji(wCode);
          hi = data.daily && data.daily.temperature_2m_max ? data.daily.temperature_2m_max[0] : '--';
          lo = data.daily && data.daily.temperature_2m_min ? data.daily.temperature_2m_min[0] : '--';
        }
        if(data.daily && data.daily.time) {
          var dayN = ['\u65E5','\u4E00','\u4E8C','\u4E09','\u56DB','\u4E94','\u516D'];
          fHtml = '<div class="cal-forecast">';
          for(var fi=1;fi<=3 && fi<data.daily.time.length;fi++) {
            var fcHi = data.daily.temperature_2m_max ? data.daily.temperature_2m_max[fi] : '--';
            var fcLo = data.daily.temperature_2m_min ? data.daily.temperature_2m_min[fi] : '--';
            var fcCode = data.daily.weather_code ? data.daily.weather_code[fi] : -1;
            var fcIcon = getWeatherEmoji(fcCode);
            var d = new Date(data.daily.time[fi] + 'T12:00:00');
            var dn = dayN[d.getDay()] || '';
            fHtml += '<div class="wf-day"><span class="wf-icon">'+fcIcon+'</span><span>'+dn+'</span><span>'+(fcHi!=='--'?fcHi+'\xB0':'--')+'</span><span style="color:var(--g4)">'+(fcLo!=='--'?fcLo+'\xB0':'--')+'</span></div>';
          }
          fHtml += '</div>';
        }
      }
    }
  } catch(e){console.error('IFTO: weather parse error',e)}
  el.innerHTML = '<div style="text-align:center;font-size:20px;font-weight:600;color:var(--g1);margin-bottom:6px;cursor:pointer" onclick="setWeatherCity()" title="\u70B9\u51FB\u4FEE\u6539\u57CE\u5E02">'+displayCity+'</div><div class="cal-weather-main"><span class="cal-weather-icon">'+icon+'</span><span class="cal-weather-temp">'+temp+'\xB0</span><span class="cal-weather-desc">'+desc+'</span></div>'+(fHtml||'');
}
function getWeatherDesc(code){
  if(code===0) return '\u6674\u5929';
  if(code===1) return '\u5C11\u4E91';
  if(code>=2&&code<=3) return '\u591A\u4E91';
  if(code===45||code===48) return '\u96FE';
  if(code>=51&&code<=57) return '\u6BDB\u6BDB\u96E8';
  if(code>=61&&code<=67) return '\u96E8';
  if(code>=71&&code<=77) return '\u96EA';
  if(code>=80&&code<=82) return '\u9635\u96E8';
  if(code>=85&&code<=86) return '\u9635\u96EA';
  if(code>=95&&code<=99) return '\u96F7\u66B4';
  return '\u672A\u77E5';
}
function setWeatherCity(){
  var el = document.getElementById('calWeather');
  if(!el) return;
  // Check current manual setting
  var curLat = localStorage.getItem('ifto_weather_manual_lat');
  var curLon = localStorage.getItem('ifto_weather_manual_lon');
  var curCity = localStorage.getItem('ifto_weather_city');
  var hint = '\u8F93\u5165\u57CE\u5E02\u540D\uFF08\u5982 \u4E0A\u6D77\uFF09\u6216\u7ECF\u7EAC\u5EA6\uFF08\u5982 31.2,121.5\uFF09';
  var curVal = '';
  if(curLat && curLon) {
    curVal = curLat + ',' + curLon;
    var cn = localStorage.getItem('ifto_weather_manual_city_name');
    if(cn) hint = '\u5F53\u524D: ' + cn + ' (' + curLat + ',' + curLon + ')';
    else hint = '\u5F53\u524D: ' + curLat + ',' + curLon;
  } else if(curCity) {
    curVal = curCity;
    hint = '\u5F53\u524D: ' + curCity;
  }
  el.innerHTML = '<div style="display:flex;flex-direction:column;gap:4px;padding:4px 0">'+
    '<div style="display:flex;gap:6px;align-items:center">'+
    '<input id="cityInput" style="flex:1;min-width:0;padding:6px 14px;font-size:12px;border:1px solid var(--ifto-divider,var(--ifto-g5,var(--g5)));background:var(--ifto-card-bg,var(--bg));color:var(--ifto-text,var(--g1));border-radius:9999px" placeholder="'+hint+'" value="'+curVal+'" />'+
    '<button onclick="saveCity()" style="padding:0 14px;font-size:12px;font-weight:600;border:none;border-radius:9999px;background:var(--ifto-accent,var(--g1));color:var(--ifto-accent-text,var(--bg));cursor:pointer;white-space:nowrap;height:28px">\u786E\u5B9A</button>'+
    '<button onclick="cancelCity()" style="padding:0 12px;font-size:12px;border:1px solid var(--ifto-divider,var(--ifto-g5,var(--g5)));border-radius:9999px;background:transparent;color:var(--ifto-text-2,var(--g4));cursor:pointer;height:28px">\u53D6\u6D88</button>'+
    '</div>'+
    '<div style="display:flex;gap:6px;font-size:10px;color:var(--g4)">'+
    '<span>\u652F\u6301\u57CE\u5E02\u540D\uFF08\u4E2D\u6587/\u82F1\u6587\uFF09\u6216 \u7EAC\u5EA6,\u7ECF\u5EA6 \u5750\u6807</span>'+
    '<span style="cursor:pointer;text-decoration:underline" onclick="clearCity()">\u91CD\u7F6E\u4E3A\u81EA\u52A8\u5B9A\u4F4D</span>'+
    '</div>'+
    '</div>';
  var inp = document.getElementById('cityInput');
  if(inp) { inp.focus(); inp.select(); }
}
function saveCity(){
  var inp = document.getElementById('cityInput');
  if(inp && inp.value && inp.value.trim()){
    var val = inp.value.trim();
    // Detect coordinate input: contains digits and comma or common coordinate separators
    var coordMatch = val.match(/^([\\d.-]+)\\s*[,\uFF0C\\s]\\s*([\\d.-]+)$/);
    if(coordMatch) {
      var lat = parseFloat(coordMatch[1]);
      var lon = parseFloat(coordMatch[2]);
      if(!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        // Save as manual lat/lon
        localStorage.setItem('ifto_weather_manual_lat', String(lat));
        localStorage.setItem('ifto_weather_manual_lon', String(lon));
        localStorage.removeItem('ifto_weather_manual_city_name');
        localStorage.removeItem('ifto_weather_city');
        localStorage.removeItem('ifto_weather_lat');
        localStorage.removeItem('ifto_weather_lon');
        localStorage.removeItem('ifto_weather_auto_city');
        fetchWeather();
        return;
      }
    }
    // Treat as city name
    localStorage.setItem('ifto_weather_city', val);
    localStorage.removeItem('ifto_weather_manual_lat');
    localStorage.removeItem('ifto_weather_manual_lon');
    localStorage.removeItem('ifto_weather_manual_city_name');
    localStorage.removeItem('ifto_weather_lat');
    localStorage.removeItem('ifto_weather_lon');
    localStorage.removeItem('ifto_weather_auto_city');
    fetchWeather();
  } else { fetchWeather(); }
}
function cancelCity(){
  fetchWeather();
}
function clearCity(){
  localStorage.removeItem('ifto_weather_manual_lat');
  localStorage.removeItem('ifto_weather_manual_lon');
  localStorage.removeItem('ifto_weather_manual_city_name');
  localStorage.removeItem('ifto_weather_city');
  localStorage.removeItem('ifto_weather_lat');
  localStorage.removeItem('ifto_weather_lon');
  localStorage.removeItem('ifto_weather_auto_city');
  fetchWeather();
}

function getWeatherEmoji(code){
  var vs = '\\uFE0E'; // \u53D8\u4F53\u9009\u62E9\u7B26\uFF0C\u5F3A\u5236\u6587\u672C\u6837\u5F0F\uFF08\u975E\u5F69\u8272emoji\uFF09
  // Chinese weather descriptions (weather.com.cn)
  if(typeof code === 'string' || code !== +code) {
    if(code.indexOf('\u6674')>=0) return '\\u2600'+vs;
    if(code.indexOf('\u4E91')>=0||code.indexOf('\u9634')>=0) return '\\u26C5'+vs;
    if(code.indexOf('\u96FE')>=0) return '\\u2601'+vs+'\\u2601'+vs;
    if(code.indexOf('\u96E8')>=0) return '\\u2602'+vs;
    if(code.indexOf('\u96EA')>=0) return '\\u2603'+vs;
    if(code.indexOf('\u96F7')>=0||code.indexOf('\u95EA')>=0) return '\\u26A1'+vs;
    return '\\u2600'+vs;
  }
  // WMO weather codes (Open-Meteo)
  if(code===0) return '\\u2600'+vs;
  if(code>=1&&code<=3) return '\\u26C5'+vs;
  if(code===45||code===48) return '\\u2601'+vs+'\\u2601'+vs;
  if(code>=51&&code<=67) return '\\u2602'+vs;
  if(code>=71&&code<=77) return '\\u2603'+vs;
  if(code>=80&&code<=82) return '\\u2602'+vs;
  if(code>=85&&code<=86) return '\\u2603'+vs;
  if(code>=95&&code<=99) return '\\u26A1'+vs;
  // OpenWeather condition codes
  if(code>=200&&code<300) return '\\u26A1'+vs;
  if(code>=300&&code<400) return '\\u2602'+vs;
  if(code>=500&&code<600) return '\\u2602'+vs;
  if(code>=600&&code<700) return '\\u2603'+vs;
  if(code>=700&&code<800) return '\\u2601'+vs+'\\u2601'+vs;
  if(code===800) return '\\u2600'+vs;
  if(code>=801&&code<=804) return '\\u26C5'+vs;
  // Legacy wttr.in codes
  if(code===113) return '\\u2600'+vs;
  if(code===116) return '\\u26C5'+vs;
  if(code>=119&&code<=122) return '\\u2601'+vs;
  if(code===143||(code>=248&&code<=260)) return '\\u2601'+vs+'\\u2601'+vs;
  if(code===200) return '\\u26A1'+vs;
  if(code>=176&&code<=199) return '\\u2602'+vs;
  if(code>=227&&code<=230) return '\\u2603'+vs;
  if(code>=263&&code<=284) return '\\u2602'+vs;
  if(code>=293&&code<=308) return '\\u2602'+vs;
  if(code>=311&&code<=317) return '\\u2602'+vs;
  if(code>=320&&code<=338) return '\\u2603'+vs;
  if(code===350) return '\\u2602'+vs;
  if(code>=353&&code<=359) return '\\u2602'+vs;
  if(code>=362&&code<=377) return '\\u2602'+vs;
  if(code>=386&&code<=392) return '\\u26A1'+vs;
  if(code>=393&&code<=395) return '\\u2603'+vs;
  return '\\u2600'+vs;
}
// ====== Page 2: Habit Tracking - Calendar View ======
var HABIT_COLORS = ['#22c55e','#3b82f6','#a855f7','#f59e0b','#ef4444','#ec4899','#14b8a6','#f97316'];
var curHabitIdx = 0;

function renderHabitPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  // Auto-assign colorIdx for old data
  for(var i=0;i<habits.length;i++) {
    if(habits[i].colorIdx===undefined) habits[i].colorIdx = i % HABIT_COLORS.length;
  }
  // Clamp curHabitIdx
  if(habits.length===0) curHabitIdx = 0;
  else if(curHabitIdx >= habits.length) curHabitIdx = habits.length - 1;
  else if(curHabitIdx < 0) curHabitIdx = 0;

  var now = new Date();
  var y = now.getFullYear(), mon = now.getMonth();
  var firstDay = new Date(y, mon, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  var daysInMonth = new Date(y, mon + 1, 0).getDate();
  var todayDate = now.getDate();
  // FIX: use local time for todayStr to match calendar cell date strings
  var pad = function(n) { return String(n).padStart(2,'0'); };
  var todayStr = y + '-' + pad(mon+1) + '-' + pad(todayDate);
  var monthStr = y + '\\u5E74' + (mon+1) + '\\u6708';

  var html = '<div style="display:flex;flex-direction:column;gap:0">';
  // Header
  html += '<div class="habit-header">';
  html += '<span class="habit-header-title">\\u4E60\\u60EF\\u6253\\u5361</span>';
  html += '<span class="habit-header-count">' + monthStr + (habits.length > 0 ? ' \\u00B7 ' + habits.length + '\\u4E2A\\u4E60\\u60EF' : '');
  html += '</span>';
  html += '</div>';
  // Input
  html += '<div class="habit-input-wrap">';
  html += '<input id="habitInput" class="habit-input" placeholder="\\u65B0\\u4E60\\u60EF\\u540D\\u79F0..." onkeydown="if(event.key==\\'Enter\\')addHabit()" />';
  html += '<button class="habit-add-btn" onclick="addHabit()">+ \\u6DFB\\u52A0</button>';
  html += '</div>';

  if(habits.length === 0) {
    html += '<div class="habit-empty">\\u8FD8\\u6CA1\\u6709\\u4E60\\u60EF<br>\\u8F93\\u5165\\u540D\\u79F0\\u5F00\\u59CB\\u6DFB\\u52A0\\u5427</div>';
  } else {
    html += '<div class="habit-list">';
    var hi = curHabitIdx;
    var h = habits[hi];
    var dates = h.dates || [];
    var streak = dates.length;
    var color = HABIT_COLORS[h.colorIdx % HABIT_COLORS.length];
    html += '<div class="habit-item">';
    // Top bar
    html += '<div class="habit-topbar">';
    html += '<span class="habit-color-dot" style="background:'+color+'" onclick="cycleHabitColor('+hi+')" title="\\u70B9\\u51FB\\u5207\\u6362\\u989C\\u8272"></span>';
    html += '<span class="habit-name">' + escHtml(h.name) + '</span>';
    html += '<span class="habit-streak"><span style="filter:grayscale(1) brightness(0);display:inline-block">\\uD83D\\uDD25</span> ' + streak + '</span>';
    html += '<span class="habit-del" onclick="removeHabit('+hi+')">\\u2715</span>';
    html += '</div>';
    // Calendar grid
    html += '<div class="habit-calendar">';
    html += '<div class="habit-weekdays"><span>\\u4E00</span><span>\\u4E8C</span><span>\\u4E09</span><span>\\u56DB</span><span>\\u4E94</span><span>\\u516D</span><span>\\u65E5</span></div>';
    html += '<div class="habit-month-grid">';
    for(var e=0; e<firstDay; e++) {
      html += '<div class="habit-day-cell" style="cursor:default"></div>';
    }
    for(var d=1; d<=daysInMonth; d++) {
      var dateStr = y + '-' + pad(mon+1) + '-' + pad(d);
      var isDone = dates.indexOf(dateStr) >= 0;
      var isToday = d === todayDate;
      var isFuture = dateStr > todayStr;
      var cls = 'habit-day-cell';
      if(isDone) cls += ' done';
      if(isToday) cls += ' today';
      if(isFuture) cls += ' future';
      var bgStyle = isDone ? 'background:' + color : '';
      if(isFuture) {
        html += '<div class="'+cls+'">' + d + '</div>';
      } else {
        html += '<div class="'+cls+'" style="'+bgStyle+'" onclick="toggleHabitDate('+hi+',\\''+dateStr+'\\')">' + d + '</div>';
      }
    }
    html += '</div></div></div>';
    // Habit navigation below calendar
    if(habits.length > 1) {
      html += '<div style="display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 0 2px">';
      html += '<span style="cursor:pointer;user-select:none;font-size:11px;font-weight:600;padding:0 12px;background:var(--ifto-accent,var(--g1));color:var(--ifto-accent-text,var(--bg));border-radius:var(--ifto-radius,9999px);height:28px;display:inline-flex;align-items:center;transition:opacity .15s" onclick="navHabit(-1)" onmouseenter="this.style.opacity=.7" onmouseleave="this.style.opacity=1">\\u25C0</span>';
      html += '<span style="font-size:11px;color:var(--g4);min-width:32px;text-align:center">' + (curHabitIdx+1) + '/' + habits.length + '</span>';
      html += '<span style="cursor:pointer;user-select:none;font-size:11px;font-weight:600;padding:0 12px;background:var(--ifto-accent,var(--g1));color:var(--ifto-accent-text,var(--bg));border-radius:var(--ifto-radius,9999px);height:28px;display:inline-flex;align-items:center;transition:opacity .15s" onclick="navHabit(1)" onmouseenter="this.style.opacity=.7" onmouseleave="this.style.opacity=1">\\u25B6</span>';
      html += '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  body.innerHTML = html;
}
function navHabit(dir) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(habits.length <= 1) return;
  curHabitIdx = (curHabitIdx + dir + habits.length) % habits.length;
  renderHabitPage();
}
function addHabit() {
  var input = document.getElementById('habitInput');
  if(!input||!input.value.trim()) return;
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  var colorIdx = habits.length % HABIT_COLORS.length;
  habits.push({name: input.value.trim(), dates: [], colorIdx: colorIdx});
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  curHabitIdx = habits.length - 1;
  renderHabitPage();
}
function toggleHabitDate(idx, dateStr) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(idx<0||idx>=habits.length) return;
  var pos = habits[idx].dates.indexOf(dateStr);
  if(pos >= 0) habits[idx].dates.splice(pos, 1);
  else habits[idx].dates.push(dateStr);
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  renderHabitPage();
}
function cycleHabitColor(idx) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(idx<0||idx>=habits.length) return;
  habits[idx].colorIdx = ((habits[idx].colorIdx || 0) + 1) % HABIT_COLORS.length;
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  renderHabitPage();
}
function removeHabit(idx) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(idx<0||idx>=habits.length) return;
  habits.splice(idx,1);
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  if(curHabitIdx >= habits.length && habits.length > 0) curHabitIdx = habits.length - 1;
  else if(habits.length === 0) curHabitIdx = 0;
  renderHabitPage();
}
function calcStreak(dates) {
  if(!dates||dates.length===0) return 0;
  dates.sort().reverse();
  var streak = 0, today = new Date();
  var check = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  for(var i=0;i<dates.length;i++) {
    var y = check.getFullYear(), m = String(check.getMonth()+1).padStart(2,'0'), d = String(check.getDate()).padStart(2,'0');
    var dStr = y + '-' + m + '-' + d;
    if(dates.indexOf(dStr)>=0) {
      streak++;
      check.setDate(check.getDate()-1);
    } else break;
  }
  return streak;
}
function escHtml(s) {
  if(!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}


// ====== Initialization ======

// Inbox tab switching
document.querySelectorAll('#inbox .tab[data-tab]').forEach(function(t){
  t.addEventListener('click', function(){
    switchInboxTab(this.getAttribute('data-tab'));
  });
});
// Init first inbox tab
switchInboxTab('collect');

// Sort toggle for inbox collect
(function(){
  var btn = document.getElementById('inboxSortBtn');
  if(btn) {
    btn.onclick = function(){
      inboxSortDesc = !inboxSortDesc;
      btn.textContent = inboxSortDesc ? '\u6392\u5E8F\uFF1A\u4ECE\u65B0\u5230\u65E7' : '\u6392\u5E8F\uFF1A\u4ECE\u65E7\u5230\u65B0';
      renderInbox();
    };
  }
})();

// Init widget carousel
try { renderWidget(); } catch(e){console.error('IFTO: renderWidget error',e)}

// Widget carousel navigation
document.getElementById('widgetPrev')?.addEventListener('click',widgetPrev);
document.getElementById('widgetNext')?.addEventListener('click',widgetNext);

// Handle "\u8FD4\u56DE\u9996\u9875" links (link-back) \u2014 scroll page to top
document.querySelectorAll('a.link-back[href="#home"]').forEach(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();
    var page = document.querySelector('.page');
    if(page) page.scrollTo({top: 0, behavior: 'smooth'});
    // Also update nav active state
    document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
    var homeNav = document.querySelector('.nav-item[href="#home"]');
    if(homeNav) homeNav.classList.add('active');
  });
});

// ====== Hero image: random from folder or single URL ======
function loadHeroImage() {
  try {
    var heroImg = document.getElementById('heroImage');
    var settings = window.__IFTO_SETTINGS || {};
    if(!heroImg) return;
    if(settings.heroImageFolder && typeof window.__IFTO_getRandomImageFromFolder === 'function') {
      window.__IFTO_getRandomImageFromFolder(settings.heroImageFolder).then(function(url){
        if(url) {
          heroImg.style.backgroundImage = 'url("' + url + '")';
        } else if(settings.heroImageUrl) {
          if(typeof window.__IFTO_resolveImageUrl === 'function') {
            window.__IFTO_resolveImageUrl(settings.heroImageUrl).then(function(url2){
              if(url2) heroImg.style.backgroundImage = 'url("' + url2 + '")';
            });
          } else {
            heroImg.style.backgroundImage = 'url("' + settings.heroImageUrl + '")';
          }
        }
      });
    } else if(settings.heroImageUrl) {
      if(typeof window.__IFTO_resolveImageUrl === 'function') {
        window.__IFTO_resolveImageUrl(settings.heroImageUrl).then(function(url){
          if(url) heroImg.style.backgroundImage = 'url("' + url + '")';
        });
      } else {
        heroImg.style.backgroundImage = 'url("' + settings.heroImageUrl + '")';
      }
    }
  } catch(e) { console.error('IFTO: loadHeroImage error', e); }
}

// Load hero image on page load
loadHeroImage();

// Click "\u6362\u4E2A\u5FC3\u60C5" to randomly switch hero image
document.getElementById('heroRefreshLabel')?.addEventListener('click', function(e) {
  e.stopPropagation();
  if(typeof domainMode !== 'undefined' && domainMode) toggleDomainMode();
  loadHeroImage();
});

// ====== Domain Skill Tree ======
var domainMode = false;
var domainTreeData = null;

// Zoom/pan state
var dZoom = 1, dPanX = 0, dPanY = 0;
var dPanning = false, dPanStartX = 0, dPanStartY = 0;

function applyDomainTransform() {
  // Pan uses transform; zoom scales the SVG's rendered SIZE (not a bitmap
  // scale and not the viewBox). The browser re-renders the vector at the new
  // size -> always crisp, AND the element itself grows, so whatever overflows
  // the viewport stays reachable by panning.
  var sun = document.querySelector('#domainTreeInner .dt-sun');
  if(sun) {
    sun.style.transform = 'translate(' + dPanX + 'px,' + dPanY + 'px)';
    var svg = sun.querySelector('svg');
    if(svg) {
      var base = parseFloat(svg.getAttribute('data-base-width'));
      if(!base || !isFinite(base) || base <= 0) {
        var r = svg.getBoundingClientRect();
        base = r.width || 720;
        svg.setAttribute('data-base-width', base);
      }
      svg.style.width = (base * dZoom) + 'px';
      svg.style.height = 'auto';
      svg.style.maxWidth = 'none';
      svg.style.maxHeight = 'none';
      svg.style.flexShrink = '0';
    }
  }
  var pctEl = document.getElementById('domainZoomPct');
  if(pctEl) pctEl.textContent = Math.round(dZoom * 100) + '%';
}

function resetDomainView() {
  dZoom = 1; dPanX = 0; dPanY = 0;
  applyDomainTransform();
}

// Setup zoom/pan (called once on first domainMode enter)
var _domainZoomSetup = false;
function setupDomainZoom() {
  if(_domainZoomSetup) return;
  _domainZoomSetup = true;
  var overlay = document.getElementById('domainTreeOverlay');
  if(!overlay) return;

  // Wheel \u2192 zoom. In the sunburst view a plain wheel zooms (there is nothing
  // to scroll); elsewhere Ctrl/Cmd + wheel zooms. Only while over the panel.
  document.addEventListener('wheel', function(e) {
    if(!domainMode) return;
    var sunView = (window._domainView === 'sun');
    if(!sunView && !e.ctrlKey && !e.metaKey) return;
    var ov = document.getElementById('domainTreeOverlay');
    if(!ov || !e.target || !ov.contains(e.target)) return;
    e.preventDefault();
    var delta = e.deltaY > 0 ? -0.1 : 0.1;
    dZoom = Math.round(Math.max(0.3, Math.min(3, dZoom + delta)) * 100) / 100;
    applyDomainTransform();
  }, { passive: false });

  // ---- Pan / zoom helpers (mouse + touch) ----
  var _dragStartX = 0, _dragStartY = 0;
  function panStart(x, y) {
    dPanning = true;
    _dragStartX = x; _dragStartY = y;
    dPanStartX = x - dPanX; dPanStartY = y - dPanY;
  }
  function panMove(x, y) {
    dPanX = x - dPanStartX;
    dPanY = y - dPanStartY;
    applyDomainTransform();
  }
  function panEnd() {
    dPanning = false;
    var ov = document.getElementById('domainTreeOverlay');
    if(ov) ov.style.cursor = '';
  }

  // Mouse drag \u2192 pan (left or middle button)
  overlay.addEventListener('mousedown', function(e) {
    if(!domainMode) return;
    if(e.button !== 0 && e.button !== 1) return;
    e.preventDefault();
    panStart(e.clientX, e.clientY);
    overlay.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', function(e) {
    if(!dPanning || !domainMode) return;
    panMove(e.clientX, e.clientY);
  });
  document.addEventListener('mouseup', function() { if(dPanning) panEnd(); });

  // Touch: one finger pans, two fingers pinch-zoom.
  // Small movements stay as taps so sector clicks still work.
  var _pinchDist0 = 0, _pinchZoom0 = 1;
  overlay.addEventListener('touchstart', function(e) {
    if(!domainMode) return;
    if(e.touches.length === 1) {
      panStart(e.touches[0].clientX, e.touches[0].clientY);
    } else if(e.touches.length === 2) {
      dPanning = false;
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      _pinchDist0 = Math.sqrt(dx*dx + dy*dy) || 1;
      _pinchZoom0 = dZoom;
    }
  }, { passive: true });
  overlay.addEventListener('touchmove', function(e) {
    if(!domainMode) return;
    if(e.touches.length === 1 && dPanning) {
      var mx = e.touches[0].clientX - _dragStartX;
      var my = e.touches[0].clientY - _dragStartY;
      if(Math.abs(mx) + Math.abs(my) > 6) {
        e.preventDefault();
        panMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    } else if(e.touches.length === 2 && _pinchDist0 > 0) {
      e.preventDefault();
      var px = e.touches[0].clientX - e.touches[1].clientX;
      var py = e.touches[0].clientY - e.touches[1].clientY;
      var d = Math.sqrt(px*px + py*py) || 1;
      dZoom = Math.round(Math.max(0.3, Math.min(3, _pinchZoom0 * d / _pinchDist0)) * 100) / 100;
      applyDomainTransform();
    }
  }, { passive: false });
  overlay.addEventListener('touchend', function(e) {
    if(e.touches.length === 0) { dPanning = false; _pinchDist0 = 0; }
    else if(e.touches.length === 1) {
      _pinchDist0 = 0;
      panStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  // Reset button
  var resetBtn = document.getElementById('domainResetBtn');
  if(resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      resetDomainView();
    });
  }

  // Watch theme changes \u2192 re-render domain tree
  var themeObserver = new MutationObserver(function() {
    if(domainMode && window._domainTreeCache) {
      renderDomainTree(window._domainTreeCache);
    }
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

function toggleDomainMode() {
  var overlay = document.getElementById('domainTreeOverlay');
  var heroImg = document.getElementById('heroImage');
  var domainLabel = document.getElementById('heroDomainLabel');
  if(!overlay || !heroImg) return;
  if(!domainMode) {
    domainMode = true;
    setupDomainZoom();
    // Card dashboard needs no zoom/pan \u2014 keep controls hidden
    var zc = document.getElementById('domainZoomCtrl');
    if(zc) zc.style.display = 'none';
    // Always start from the overview level
    window._domainNav = { stack: [] };
    if(domainLabel) domainLabel.classList.add('active');
    heroImg.style.backgroundImage = 'none';
    heroImg.style.backgroundColor = 'var(--ifto-bg, #fff)';
    // Expand container to give the dashboard a comfortable height
    var _expandH = (window.innerWidth < 700) ? 620 : 660;
    heroImg.style.minHeight = _expandH + 'px';
    var heroRight = heroImg.parentElement;
    if(heroRight) heroRight.style.minHeight = _expandH + 'px';
    // Show cached data instantly (if any), then always refetch so recent
    // edits to titles / progress are reflected.
    if(domainTreeData) {
      renderDomainTree(domainTreeData);
    } else {
      renderDomainTreeLoading();
    }
    fetchDomainTree();
  } else {
    domainMode = false;
    if(domainLabel) domainLabel.classList.remove('active');
    overlay.style.display = 'none';
    var zc = document.getElementById('domainZoomCtrl');
    if(zc) zc.style.display = 'none';
    heroImg.style.backgroundImage = '';
    heroImg.style.backgroundColor = '';
    heroImg.style.minHeight = '';
    var heroRight = heroImg.parentElement;
    if(heroRight) heroRight.style.minHeight = '';
    loadHeroImage();
  }
}

function fetchDomainTree() {
  if (typeof window.__IFTO_getDomainTree !== 'function') {
    var inner = document.getElementById('domainTreeInner');
    if (inner && !domainTreeData) inner.innerHTML = '<div class="dt-empty">Bridge \u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u8F7D\u63D2\u4EF6</div>';
    return;
  }
  var domainFolder = (window.__IFTO_SETTINGS && window.__IFTO_SETTINGS.domainFolder) || '300-\u9886\u57DFAREA';
  window.__IFTO_getDomainTree(domainFolder).then(function(data) {
    domainTreeData = data;
    window._domainTreeCache = data;
    if (domainMode) renderDomainTree(data);
  }).catch(function(err) {
    console.error('IFTO: bridge failed', err);
    if (domainMode && !domainTreeData) {
      var inner = document.getElementById('domainTreeInner');
      if (inner) inner.innerHTML = '<div class="dt-empty">\u52A0\u8F7D\u5931\u8D25: ' + escHtml(String(err)) + '</div>';
    }
  });
}

// Called from main.js when anything under 300-\u9886\u57DFAREA changes \u2192 live refresh.
window.__IFTO_refreshDomainTree = function() {
  domainTreeData = null;
  window._domainTreeCache = null;
  if (domainMode) fetchDomainTree();
};

function renderDomainTreeLoading() {
  var overlay = document.getElementById('domainTreeOverlay');
  var inner = document.getElementById('domainTreeInner');
  if(!overlay || !inner) return;
  inner.innerHTML = '<div class="domain-tree-loading">\u52A0\u8F7D\u9886\u57DF\u6570\u636E\u4E2D\u2026</div>';
  overlay.style.display = 'block';
}

function _renderDomainTreeLegacy(treeData) {
  var overlay = document.getElementById('domainTreeOverlay');
  var inner = document.getElementById('domainTreeInner');
  if(!overlay || !inner) return;
  overlay.style.display = 'block';
  if(!treeData || treeData.length === 0) {
    inner.innerHTML = '<div class="dt-empty">\u6682\u65E0\u9886\u57DF\u6570\u636E</div>';
    return;
  }
  try {
  var oRect = overlay.getBoundingClientRect();
  var W = oRect.width, H = oRect.height;
  if(W < 100) W = 800; if(H < 100) H = 600;
  var cx = W / 2, cy = H / 2;

  var dark = document.body.classList.contains('theme-dark');
  // Force overlay background \u2014 use backgroundColor to beat CSS background shorthand
  overlay.style.backgroundColor = dark ? '#1e1e1e' : '#fff';
  var accent = dark ? '#fff' : '#111';
  var bg = dark ? '#1e1e1e' : '#fff';
  var textColor = dark ? '#e8e8e8' : '#111';
  var text2 = dark ? '#aaa' : '#666';
  var lineColor = dark ? '#444' : '#d4d4d4';

  function sectorPath(cx, cy, r1, r2, a1, a2) {
    var large = (a2 - a1) > Math.PI ? 1 : 0;
    var x1o = cx + r2 * Math.cos(a1), y1o = cy + r2 * Math.sin(a1);
    var x2o = cx + r2 * Math.cos(a2), y2o = cy + r2 * Math.sin(a2);
    var x1i = cx + r1 * Math.cos(a1), y1i = cy + r1 * Math.sin(a1);
    var x2i = cx + r1 * Math.cos(a2), y2i = cy + r1 * Math.sin(a2);
    return 'M '+x1o+' '+y1o+' A '+r2+' '+r2+' 0 '+large+' 1 '+x2o+' '+y2o+
           ' L '+x2i+' '+y2i+' A '+r1+' '+r1+' 0 '+large+' 0 '+x1i+' '+y1i+' Z';
  }

  if(!window._stExpanded) window._stExpanded = {};
  var sectorColors = dark
    ? ['rgba(255,255,255,0.55)','rgba(255,255,255,0.35)','rgba(255,255,255,0.2)']
    : ['rgba(0,0,0,0.45)','rgba(0,0,0,0.28)','rgba(0,0,0,0.13)'];
  var lightColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.035)';

  var donutInner = 55, donutOuter = 180;
  var r2in = donutOuter + 18, r2out = donutOuter + 65;
  var r3in = r2out + 8, r3out = r2out + 50;
  // Auto-scale: ensure r3out fits within the container
  var maxR = r3out + 10;
  var baseR3out = r3out;
  var _scale = maxR / baseR3out;
  var n = treeData.length;
  var sectorAngle = 2 * Math.PI / n;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="position:absolute;top:0;left:0;width:'+W+'px;height:'+H+'px;z-index:1">';
  var labelDivs = '';
  var arcDefs = '';
  var arcIdCounter = 0;
  function arcTextPath(r, a1, a2, midA) {
    var top = Math.sin(midA) < 0.5;
    var startA = top ? a1 : a2;
    var endA = top ? a2 : a1;
    var sx = cx + r * Math.cos(startA);
    var sy = cy + r * Math.sin(startA);
    var ex = cx + r * Math.cos(endA);
    var ey = cy + r * Math.sin(endA);
    var sweep = top ? 1 : 0;
    var id = 'ap' + (arcIdCounter++);
    var d = 'M ' + sx + ' ' + sy + ' A ' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + ex + ' ' + ey;
    arcDefs += '<path id="'+id+'" d="'+d+'" fill="none" stroke="none"/>';
    return id;
  }

  // === Ring 1: major sectors ===
  for(var i = 0; i < n; i++) {
    var branch = treeData[i];
    var pct = branch.totalTasks > 0 ? Math.round(branch.completedTasks / branch.totalTasks * 100) : 0;
    var a1 = -Math.PI/2 + i * sectorAngle;
    var a2 = a1 + sectorAngle;
    var fillR = donutInner + (donutOuter - donutInner) * Math.max(0.04, pct / 100);
    var color = sectorColors[i];

    svg += '<path d="'+sectorPath(cx, cy, donutInner, donutOuter, a1, a2)+'" fill="'+lightColor+'" stroke="'+lineColor+'" stroke-width="1.5"/>';
    svg += '<path d="'+sectorPath(cx, cy, donutInner, fillR, a1, a2)+'" fill="'+color+'"/>';
    svg += '<path class="st-sector" data-path="'+escHtml(branch.path||'')+'" data-ring="1" d="'+sectorPath(cx, cy, donutInner, donutOuter, a1, a2)+'" fill="transparent" stroke="none" style="cursor:pointer"><title>'+escHtml(branch.name)+'</title></path>';

    var midA = (a1 + a2) / 2;
    var labelR = donutInner + (donutOuter - donutInner) * 0.55;
    var lx = cx + labelR * Math.cos(midA);
    var ly = cy + labelR * Math.sin(midA);
    var lw = labelR * sectorAngle * 0.78;
    labelDivs += '<div style="position:absolute;left:'+(lx-lw/2)+'px;top:'+(ly-22)+'px;width:'+lw+'px;height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;z-index:2;text-align:center;line-height:1.3;overflow:hidden">';
    labelDivs += '<span style="font-size:13px;font-weight:700;color:'+textColor+';word-break:break-all">'+escHtml(branch.name)+'</span>';
    labelDivs += '<span style="font-size:10px;color:'+text2+'">'+pct+'% \\u00b7 '+branch.fileCount+'\u6587\u4EF6</span>';
    labelDivs += '</div>';
  }

  // === Center ===
  svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+donutInner+'" fill="'+bg+'" stroke="'+accent+'" stroke-width="2"/>';
  svg += '<text x="'+cx+'" y="'+(cy-6)+'" text-anchor="middle" font-size="15" font-weight="700" fill="'+textColor+'" style="pointer-events:none">\u9886\u57DF</text>';
  svg += '<text x="'+cx+'" y="'+(cy+14)+'" text-anchor="middle" font-size="11" fill="'+text2+'" style="pointer-events:none">\u6280\u80FD\u6811</text>';

  // === Ring 2: sub-folders + Ring 3: files ===
  var activeSub = window._stActiveSub || null;

  for(var ei = 0; ei < n; ei++) {
    var eb = treeData[ei];
    if(!window._stExpanded[eb.path || '']) continue;
    var subs = eb.subfolders || [];
    var ea1 = -Math.PI/2 + ei * sectorAngle;
    var ea2 = ea1 + sectorAngle;
    var childAngle = sectorAngle / Math.max(1, subs.length);

    for(var sj = 0; sj < subs.length; sj++) {
      var sub = subs[sj];
      var subPct = sub.totalTasks > 0 ? Math.round(sub.completedTasks / sub.totalTasks * 100) : 0;
      var sa1 = ea1 + sj * childAngle + childAngle * 0.05;
      var sa2 = ea1 + (sj + 1) * childAngle - childAngle * 0.05;
      var subFillR = r2in + (r2out - r2in) * Math.max(0.04, subPct / 100);
      var isActiveSub = (activeSub === sub.path);

      svg += '<path d="'+sectorPath(cx, cy, r2in, r2out, sa1, sa2)+'" fill="'+lightColor+'" stroke="'+lineColor+'" stroke-width="1"/>';
      svg += '<path d="'+sectorPath(cx, cy, r2in, subFillR, sa1, sa2)+'" fill="'+color+'"/>';
      svg += '<path class="st-sector" data-path="'+escHtml(sub.path||'')+'" data-ring="2" d="'+sectorPath(cx, cy, r2in, r2out, sa1, sa2)+'" fill="transparent" stroke="none" style="cursor:pointer"><title>'+escHtml(sub.name)+'</title></path>';

      var smid = (sa1 + sa2) / 2;
      var slR = r2in + (r2out - r2in) * 0.5;
      var sPathId = arcTextPath(slR, sa1, sa2, smid);
      var sPathId2 = arcTextPath(slR - 12, sa1, sa2, smid);
      svg += '<text style="pointer-events:none"><textPath href="#'+sPathId+'" startOffset="50%" text-anchor="middle" fill="'+textColor+'" font-size="9" font-weight="600">'+escHtml(sub.name)+'</textPath></text>';
      svg += '<text style="pointer-events:none"><textPath href="#'+sPathId2+'" startOffset="50%" text-anchor="middle" fill="'+text2+'" font-size="8">'+subPct+'% \\u00b7 '+sub.fileCount+'</textPath></text>';

      // === Ring 3: only the active sub-folder's children ===
      if(isActiveSub) {
        var items = [];
        // Deeper sub-folders first
        var deeperSubs = sub.subfolders || [];
        for(var ds = 0; ds < deeperSubs.length; ds++) {
          items.push({ name: deeperSubs[ds].name, path: deeperSubs[ds].path, leaf: false, total: deeperSubs[ds].totalTasks||0, done: deeperSubs[ds].completedTasks||0, fileCount: deeperSubs[ds].fileCount||0 });
        }
        // Then files
        var fls = sub.files || [];
        for(var fi = 0; fi < fls.length; fi++) {
          var f = fls[fi];
          var fname = (f.name || f.path || '').split('/').pop().replace(/\\.md$/i, '');
          items.push({ name: fname, path: f.path, leaf: true, total: f.totalTasks||0, done: f.completedTasks||0, fileCount: 0 });
        }
        var itemCount = items.length;
        // Wider spread for Ring 3: use at least 50% of parent Ring 1 sector
        var midAngle = (sa1 + sa2) / 2;
        var spreadAngle = Math.max(sa2 - sa1, sectorAngle * 0.5);
        var r3a1 = midAngle - spreadAngle / 2;
        for(var ii = 0; ii < itemCount; ii++) {
          var item = items[ii];
          var ia1 = r3a1 + ii * (spreadAngle / itemCount) + (spreadAngle / itemCount) * 0.05;
          var ia2 = r3a1 + (ii + 1) * (spreadAngle / itemCount) - (spreadAngle / itemCount) * 0.05;
          var ipct = item.total > 0 ? Math.round(item.done / item.total * 100) : 0;
          var ifillR = r3in + (r3out - r3in) * Math.max(0.04, ipct / 100);

          svg += '<path d="'+sectorPath(cx, cy, r3in, r3out, ia1, ia2)+'" fill="'+lightColor+'" stroke="'+lineColor+'" stroke-width="0.5"/>';
          if(item.total > 0) {
            svg += '<path d="'+sectorPath(cx, cy, r3in, ifillR, ia1, ia2)+'" fill="'+color+'"/>';
          }
          svg += '<path class="st-sector" data-path="'+escHtml(item.path||'')+'"'+(item.leaf?' data-leaf="1"':'')+' data-ring="3" d="'+sectorPath(cx, cy, r3in, r3out, ia1, ia2)+'" fill="transparent" stroke="none" style="cursor:pointer"><title>'+escHtml(item.name+(item.total>0?' '+Math.round(item.done/item.total*100)+'%':''))+'</title></path>';

          var imid = (ia1 + ia2) / 2;
          var ilR = r3in + (r3out - r3in) * 0.5;
          var iPathId = arcTextPath(ilR, ia1, ia2, imid);
          var fullName = item.name + (item.total > 0 ? ' ' + ipct + '%' : '');
          svg += '<text style="pointer-events:none"><textPath href="#'+iPathId+'" startOffset="50%" text-anchor="middle" fill="'+text2+'" font-size="8">'+escHtml(fullName)+'</textPath></text>';
        }
      }
    }
  }

  svg += '<defs>' + arcDefs + '</defs>';
  svg += '</svg>';
  inner.style.position = 'absolute';
  inner.style.top = '0px';
  inner.style.left = '0px';
  inner.style.width = W + 'px';
  inner.style.height = H + 'px';
  inner.innerHTML = svg + labelDivs;
  applyDomainTransform();

  var sectors = inner.querySelectorAll('.st-sector');
  for(var k = 0; k < sectors.length; k++) {
    sectors[k].addEventListener('click', function(e) {
      e.stopPropagation();
      var path = this.getAttribute('data-path');
      var ring = this.getAttribute('data-ring');
      if(this.getAttribute('data-leaf') === '1' && path) {
        if(typeof window.__IFTO_openFile === 'function') window.__IFTO_openFile(path);
        return;
      }
      if(!path) return;
      if(ring === '2') {
        // Single expand: only one Ring 2 active at a time
        window._stActiveSub = (window._stActiveSub === path) ? null : path;
      } else {
        // Ring 1 toggle
        window._stExpanded[path] = window._stExpanded[path] ? false : true;
      }
      renderDomainTree(window._domainTreeCache || treeData);
    });
  }
  } catch(err) {
    inner.innerHTML = '<div class="dt-empty">\u6E32\u67D3\u51FA\u9519: '+escHtml(String(err))+'</div>';
    console.error('IFTO: renderDomainTree error', err);
  }
}

// ====== Domain Dashboard (\u9886\u57DF\u5065\u5EB7\u5EA6\u5361\u7247\u7F51\u683C) ======
function renderDomainTree(treeData) {
  var overlay = document.getElementById('domainTreeOverlay');
  var inner = document.getElementById('domainTreeInner');
  if(!overlay || !inner) return;
  overlay.style.display = 'block';
  if(!treeData || treeData.length === 0) {
    inner.innerHTML = '<div class="dt-empty">\u6682\u65E0\u9886\u57DF\u6570\u636E</div>';
    return;
  }
  try {
    overlay.style.backgroundColor = 'var(--ifto-bg, #fff)';

    if(!window._domainNav) window._domainNav = { stack: [] };
    if(!window._domainView) window._domainView = 'cards';
    var stack = window._domainNav.stack;
    var view = window._domainView;

    function countFiles(b){
      var n = b.fileCount || 0;
      var subs = b.subfolders || [];
      for(var i=0;i<subs.length;i++) n += countFiles(subs[i]);
      return n;
    }
    function pctOf(b){
      if(b && b.progress !== null && b.progress !== undefined) return b.progress;
      return (b && b.totalTasks > 0) ? Math.round(b.completedTasks / b.totalTasks * 100) : null;
    }
    function sortPinned(arr){
      return arr.slice().sort(function(a, b){ return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0); });
    }
    var STALE_MS = 60 * 24 * 3600 * 1000;
    function isStale(b){ return !!(b && b.mtime && (Date.now() - b.mtime > STALE_MS)); }
    function relTime(ms){
      if(!ms) return '';
      var d = Math.floor((Date.now() - ms) / 86400000);
      if(d <= 0) return '\u4ECA\u5929';
      if(d === 1) return '\u6628\u5929';
      if(d < 30) return d + '\u5929\u524D';
      return Math.floor(d / 30) + '\u4E2A\u6708\u524D';
    }
    function findByPath(list, path){
      for(var i=0;i<list.length;i++){
        if(list[i].path === path) return list[i];
        var r = findByPath(list[i].subfolders || [], path);
        if(r) return r;
      }
      return null;
    }
    function childrenOf(b){
      var out = [];
      var subs = b.subfolders || [];
      for(var i=0;i<subs.length;i++) out.push(subs[i]);
      var fls = b.files || [];
      for(var j=0;j<fls.length;j++){
        var f = fls[j];
        out.push({
          name: f.title || (f.name || '').replace(/\\.md$/i, ''),
          path: f.path, leaf: true,
          fileCount: 0, subfolders: [], files: [],
          totalTasks: f.totalTasks || 0, completedTasks: f.completedTasks || 0,
          pinned: !!f.pinned, mtime: f.mtime || 0
        });
      }
      return out;
    }
    function metaText(b, leaf){
      var p = pctOf(b);
      if(leaf){
        if(b.totalTasks > 0) return b.completedTasks + '/' + b.totalTasks + ' \u4EFB\u52A1';
        return b.status || '\u65E0\u4EFB\u52A1';
      }
      return (p === null ? '\u65E0\u4EFB\u52A1' : p + '%') + ' \xB7 ' + countFiles(b) + ' \u76EE\u6807';
    }
    function cardHtml(b, leaf){
      var p = pctOf(b);
      var stale = isStale(b);
      var pinned = !!b.pinned;
      var tip = b.mtime ? ('\u6700\u8FD1\u66F4\u65B0 ' + relTime(b.mtime)) : '';
      return '<div class="dt-card' + (leaf ? ' dt-leaf' : '') + (pinned ? ' pinned' : '') + '"'
        + ' data-path="' + escHtml(b.path || '') + '" data-leaf="' + (leaf ? '1' : '0') + '"'
        + ' style="--p:' + (p || 0) + '"'
        + (tip ? ' title="' + escHtml(tip) + '"' : '') + '>'
        + '<div class="dt-card-top"><span class="dt-card-name">' + escHtml(b.name) + '</span>'
        + '<span class="dt-pin' + (pinned ? ' active' : '') + '" data-path="' + escHtml(b.path || '') + '" title="' + (pinned ? '\u53D6\u6D88\u7F6E\u9876' : '\u7F6E\u9876') + '">'
        + '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>'
        + '</span>'
        + (stale ? '<span class="dt-stale" title="60\u5929\u4EE5\u4E0A\u672A\u66F4\u65B0">\u505C</span>' : '')
        + '</div>'
        + '<div class="dt-bar"><i style="width:' + (p || 0) + '%"></i></div>'
        + '<div class="dt-card-meta"><span>' + escHtml(metaText(b, leaf)) + '</span></div>'
        + '</div>';
    }

    // ---- totals ----
    var totalTopics = 0, totalAreas = 0, progSum = 0, progN = 0;
    for(var i=0;i<treeData.length;i++){
      var bp = pctOf(treeData[i]);
      if(bp !== null){ progSum += bp; progN++; }
      totalTopics += countFiles(treeData[i]);
      totalAreas += (treeData[i].subfolders && treeData[i].subfolders.length) ? treeData[i].subfolders.length : 1;
    }
    var gp = progN > 0 ? Math.round(progSum / progN) : 0;

    // ---- header (kept visible in every view / drill level) ----
    function summaryHtml(){
      function vb(v, label, glyph){
        return '<button class="dt-view-btn' + (view === v ? ' active' : '') + '" data-view="' + v + '" title="' + label + '">' + glyph + '</button>';
      }
      return '<div class="dt-summary">'
        + '<span class="dt-sum-left">'
        + '<span class="dt-sum-meta">' + totalAreas + ' \u9886\u57DF \xB7 ' + totalTopics + ' \u76EE\u6807 \xB7 \u603B\u8FDB\u5EA6 ' + gp + '%</span>'
        + '<span class="dt-sum-bar"><i style="width:' + gp + '%"></i></span>'
        + '<span class="dt-view-toggle">'
        + vb('cards', '\u5361\u7247\u89C6\u56FE', '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>')
        + vb('sun', '\u5706\u6247\u5F62\u89C6\u56FE', '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9h-9V3z"/></svg>')
        + vb('tree', '\u6811\u72B6\u56FE\u89C6\u56FE', '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z"/></svg>')
        + '</span>'
        + '</span>'
        + '<span class="dt-title-wrap">'
        + '<span class="dt-title-ghost">AREA</span>'
        + '<span class="dt-title-main">AREA\u9886\u57DF</span>'
        + '</span>'
        + '</div>';
    }

    // ---- pinned row: pinned nodes + all goals nested under them ----
    function buildPinnedRow(){
      var pinnedNodes = [];
      (function collect(list){
        for(var i=0;i<list.length;i++){
          var node = list[i];
          if(node.pinned) pinnedNodes.push({ node: node, leaf: false });
          var fls = node.files || [];
          for(var j=0;j<fls.length;j++){
            if(fls[j].pinned) pinnedNodes.push({ node: fls[j], leaf: true });
          }
          collect(node.subfolders || []);
        }
      })(treeData);
      if(pinnedNodes.length === 0) return '';
      var seen = {}, entries = [];
      function addFolder(node){
        if(!seen[node.path]){ seen[node.path] = 1; entries.push({ node: node, leaf: false }); }
      }
      function addFile(f){
        if(seen[f.path]) return;
        seen[f.path] = 1;
        entries.push({ node: f, leaf: true });
      }
      // Only the pinned nodes themselves \u2014 never their descendants.
      for(var i=0;i<pinnedNodes.length;i++){
        if(pinnedNodes[i].leaf) addFile(pinnedNodes[i].node);
        else addFolder(pinnedNodes[i].node);
      }
      var h = '<div class="dt-group dt-pinned-group">';
      h += '<div class="dt-group-head"><span class="dt-group-name">\u7F6E\u9876\u76EE\u6807</span><span class="dt-group-line"></span></div>';
      h += '<div class="dt-grid">';
      for(var c=0;c<entries.length;c++){
        if(entries[c].leaf){
          var f = entries[c].node;
          h += cardHtml({
            name: f.title || (f.name || '').replace(/\\.md$/i, ''),
            path: f.path, leaf: true, fileCount: 0, subfolders: [], files: [],
            totalTasks: f.totalTasks || 0, completedTasks: f.completedTasks || 0,
            progress: (f.progress !== undefined ? f.progress : null),
            pinned: !!f.pinned, mtime: f.mtime || 0
          }, true);
        } else {
          h += cardHtml(entries[c].node, false);
        }
      }
      h += '</div></div>';
      return h;
    }

    // ---- radial sunburst view ----
    function buildSunburst(){
      var W = 900, H = 600, cx = 450, cy = 300, R0 = 58, R1 = 175, R2 = 235, R3a = 245, R3b = 292;
      var sectorAngle = 2 * Math.PI / treeData.length;
      function sector(r1, r2, a1, a2){
        var large = (a2 - a1) > Math.PI ? 1 : 0;
        var x1o = cx + r2*Math.cos(a1), y1o = cy + r2*Math.sin(a1);
        var x2o = cx + r2*Math.cos(a2), y2o = cy + r2*Math.sin(a2);
        var x1i = cx + r1*Math.cos(a1), y1i = cy + r1*Math.sin(a1);
        var x2i = cx + r1*Math.cos(a2), y2i = cy + r1*Math.sin(a2);
        return 'M '+x1o+' '+y1o+' A '+r2+' '+r2+' 0 '+large+' 1 '+x2o+' '+y2o+' L '+x2i+' '+y2i+' A '+r1+' '+r1+' 0 '+large+' 0 '+x1i+' '+y1i+' Z';
      }
      var defs = '', arcId = 0;
      function arcPath(r, a1, a2){
        var midA = (a1 + a2) / 2;
        var top = Math.sin(midA) < 0.5;
        var s = top ? a1 : a2, e = top ? a2 : a1;
        var id = 'dsa' + (arcId++);
        defs += '<path id="'+id+'" d="M '+(cx + r*Math.cos(s))+' '+(cy + r*Math.sin(s))+' A '+r+' '+r+' 0 0 '+(top?1:0)+' '+(cx + r*Math.cos(e))+' '+(cy + r*Math.sin(e))+'" fill="none" stroke="none"/>';
        return id;
      }
      function alpha(p){ return (0.14 + 0.86 * Math.max(0, Math.min(100, p||0)) / 100).toFixed(3); }
      var svg = '<svg class="dt-sun-svg" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">';
      for(var i=0;i<treeData.length;i++){
        var branch = treeData[i];
        var a1 = -Math.PI/2 + i*sectorAngle, a2 = a1 + sectorAngle;
        var bpc = pctOf(branch) || 0;
        var fillR = R0 + (R1 - R0) * Math.max(0.03, bpc/100);
        svg += '<path d="'+sector(R0,R1,a1,a2)+'" style="fill:var(--ifto-divider,#eee)"/>';
        svg += '<path d="'+sector(R0,fillR,a1,a2)+'" style="fill:var(--ifto-text,#111);fill-opacity:'+alpha(bpc)+'"/>';
        svg += '<path class="dt-sun-sector" data-path="'+escHtml(branch.path||'')+'" data-leaf="0" d="'+sector(R0,R1,a1,a2)+'" fill="transparent" style="cursor:pointer"><title>'+escHtml(branch.name+' '+bpc+'%')+'</title></path>';
        var m1 = (a1+a2)/2, lr1 = R0 + (R1-R0)*0.5;
        svg += '<text x="'+(cx+lr1*Math.cos(m1))+'" y="'+(cy+lr1*Math.sin(m1))+'" text-anchor="middle" dominant-baseline="middle" style="fill:var(--ifto-text,#111);font-size:12px;font-weight:600;pointer-events:none">'+escHtml(branch.name)+'</text>';
        var subs = branch.subfolders || [];
        var childAngle = sectorAngle / Math.max(1, subs.length);
        for(var s2=0;s2<subs.length;s2++){
          var sub = subs[s2];
          var sa1 = a1 + s2*childAngle + childAngle*0.04, sa2 = a1 + (s2+1)*childAngle - childAngle*0.04;
          var spc = pctOf(sub) || 0;
          var sFillR = (R1+10) + (R2 - (R1+10)) * Math.max(0.03, spc/100);
          svg += '<path d="'+sector(R1+10,R2,sa1,sa2)+'" style="fill:var(--ifto-divider,#eee)"/>';
          svg += '<path d="'+sector(R1+10,sFillR,sa1,sa2)+'" style="fill:var(--ifto-text,#111);fill-opacity:'+alpha(spc)+'"/>';
          svg += '<path class="dt-sun-sector" data-path="'+escHtml(sub.path||'')+'" data-leaf="0" d="'+sector(R1+10,R2,sa1,sa2)+'" fill="transparent" style="cursor:pointer"><title>'+escHtml(sub.name+' '+spc+'%')+'</title></path>';
          var pid = arcPath(R1+10 + (R2-(R1+10))*0.55, sa1, sa2);
          svg += '<text style="fill:var(--ifto-text-2,#666);font-size:9px;font-weight:600;pointer-events:none"><textPath href="#'+pid+'" startOffset="50%" text-anchor="middle">'+escHtml(sub.name)+' '+spc+'%</textPath></text>';
          var fls = sub.files || [];
          for(var f3=0; f3<fls.length; f3++){
            var ff = fls[f3];
            var fa1 = sa1 + f3*(sa2-sa1)/fls.length, fa2 = sa1 + (f3+1)*(sa2-sa1)/fls.length;
            var fpc = pctOf(ff) || 0;
            var fFillR = R3a + (R3b - R3a) * Math.max(0.03, fpc/100);
            svg += '<path d="'+sector(R3a,R3b,fa1,fa2)+'" style="fill:var(--ifto-divider,#eee)"/>';
            svg += '<path d="'+sector(R3a,fFillR,fa1,fa2)+'" style="fill:var(--ifto-text,#111);fill-opacity:'+alpha(fpc)+'"/>';
            var fname = (ff.title || ff.name || '').replace(/\\.md$/i, '');
            svg += '<path class="dt-sun-sector" data-path="'+escHtml(ff.path||'')+'" data-leaf="1" d="'+sector(R3a,R3b,fa1,fa2)+'" fill="transparent" style="cursor:pointer"><title>'+escHtml(fname+' '+fpc+'%')+'</title></path>';
          }
        }
      }
      svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R0+'" style="fill:var(--ifto-bg,#fff);pointer-events:none"/>';
      svg += '<text x="'+cx+'" y="'+(cy-3)+'" text-anchor="middle" style="fill:var(--ifto-text,#111);font-size:14px;font-weight:600">AREA</text>';
      svg += '<text x="'+cx+'" y="'+(cy+14)+'" text-anchor="middle" style="fill:var(--ifto-text-2,#666);font-size:10px">'+gp+'%</text>';
      svg += '<defs>'+defs+'</defs></svg>';
      return '<div class="dt-visual dt-sun-wrap"><div class="dt-sun">'+svg+'</div></div>';
    }

    // ---- hierarchical tree view ----
    function buildTree(){
      function rowHtml(name, path, p, depth, leaf){
        return '<div class="dt-tree-row'+(leaf?' dt-tree-leaf':'')+'" data-path="'+escHtml(path||'')+'" data-leaf="'+(leaf?'1':'0')+'" style="padding-left:'+(6 + depth*18)+'px">'
          + '<span class="dt-tree-name">'+escHtml(name)+'</span>'
          + '<span class="dt-tree-track"><i style="width:'+((p||0))+'%"></i></span>'
          + '<span class="dt-tree-pct">'+(p===null||p===undefined?'\u2014':p+'%')+'</span>'
          + '</div>';
      }
      function walk(b, depth, leaf){
        var h = rowHtml(b.name, b.path, pctOf(b), depth, leaf);
        if(!leaf){
          var subs = b.subfolders || [];
          for(var i=0;i<subs.length;i++) h += walk(subs[i], depth+1, false);
          var fls = b.files || [];
          for(var j=0;j<fls.length;j++){
            var f = fls[j];
            h += rowHtml(f.title || (f.name||'').replace(/\\.md$/i,''), f.path, pctOf(f), depth+1, true);
          }
        }
        return h;
      }
      var h = '<div class="dt-visual dt-tree">';
      for(var i=0;i<treeData.length;i++) h += walk(treeData[i], 0, false);
      h += '</div>';
      return h;
    }

    var body = '';
    if(view !== 'cards' && stack.length) stack.length = 0;
    if(view === 'sun'){
      body = buildSunburst();
    } else if(view === 'tree'){
      body = buildTree();
    } else if(stack.length === 0) {
      // ---- Overview (cards) ----
      var groupsHtml = '';
      for(var g=0; g<treeData.length; g++){
        var group = treeData[g];
        var gpct = pctOf(group);
        var gRawName = (group.path || '').split('/').pop() || group.name;
        var cards = sortPinned((group.subfolders && group.subfolders.length) ? group.subfolders : childrenOf(group));
        groupsHtml += '<div class="dt-group">';
        groupsHtml += '<div class="dt-group-head"><span class="dt-group-name">' + escHtml(gRawName) + '</span>'
          + '<span class="dt-group-line"></span>'
          + '<span class="dt-group-pct">' + (gpct === null ? '\u2014' : gpct + '%') + '</span></div>';
        groupsHtml += '<div class="dt-grid">';
        if(cards.length === 0) groupsHtml += '<div class="dt-none">\u6682\u65E0\u5B50\u9886\u57DF</div>';
        for(var c=0;c<cards.length;c++) groupsHtml += cardHtml(cards[c], false);
        groupsHtml += '</div></div>';
      }
      body = '<div class="dt-groups">' + buildPinnedRow() + groupsHtml + '</div>';
    } else {
      // ---- Drilldown (cards) ----
      var node = findByPath(treeData, stack[stack.length - 1]);
      if(!node) {
        window._domainNav.stack.length = 0;
        return renderDomainTree(treeData);
      }
      var kids = sortPinned(childrenOf(node));
      var npct = pctOf(node);
      var gridHtml = '';
      if(kids.length === 0) gridHtml += '<div class="dt-none">\u6682\u65E0\u76EE\u6807</div>';
      for(var k=0;k<kids.length;k++) gridHtml += cardHtml(kids[k], !!kids[k].leaf);
      body = '<div class="dt-groups">'
        + buildPinnedRow()
        + '<div class="dt-detail-head">'
        + '<button class="dt-back" id="dtBack">\\u2190 \u8FD4\u56DE</button>'
        + '<span class="dt-detail-title">' + escHtml(node.name) + '</span>'
        + '<span class="dt-group-line"></span>'
        + '<span class="dt-group-pct">' + (npct === null ? '\u2014' : npct + '%') + '</span>'
        + '</div>'
        + '<div class="dt-grid">' + gridHtml + '</div></div>';
    }

    var html = '<div class="dt-board">' + summaryHtml() + '<div class="dt-scroll">' + body + '</div></div>';

    inner.style.position = 'absolute';
    inner.style.top = '0px';
    inner.style.left = '0px';
    inner.style.right = '0px';
    inner.style.bottom = '0px';
    inner.style.width = 'auto';
    inner.style.height = 'auto';
    inner.style.transform = 'none';
    inner.style.overflow = 'hidden';
    inner.innerHTML = html;

    var back = document.getElementById('dtBack');
    if(back) back.addEventListener('click', function(e){
      e.stopPropagation();
      window._domainNav.stack.pop();
      renderDomainTree(window._domainTreeCache || treeData);
    });

    var cardsEls = inner.querySelectorAll('.dt-card');
    for(var ci=0; ci<cardsEls.length; ci++){
      cardsEls[ci].addEventListener('click', function(e){
        e.stopPropagation();
        var path = this.getAttribute('data-path');
        var leaf = this.getAttribute('data-leaf') === '1';
        if(!path) return;
        if(leaf) {
          if(typeof window.__IFTO_openFile === 'function') window.__IFTO_openFile(path);
          return;
        }
        window._domainNav.stack.push(path);
        renderDomainTree(window._domainTreeCache || treeData);
      });
    }

    var pinEls = inner.querySelectorAll('.dt-pin');
    for(var pi=0; pi<pinEls.length; pi++){
      pinEls[pi].addEventListener('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        var path = this.getAttribute('data-path');
        if(!path || typeof window.__IFTO_togglePin !== 'function') return;
        window.__IFTO_togglePin(path).then(function(){
          domainTreeData = null;
          window._domainTreeCache = null;
          fetchDomainTree();
        });
      });
    }

    var vbtns = inner.querySelectorAll('.dt-view-btn');
    for(var vi=0; vi<vbtns.length; vi++){
      vbtns[vi].addEventListener('click', function(e){
        e.stopPropagation();
        window._domainView = this.getAttribute('data-view') || 'cards';
        window._domainNav.stack = [];
        dZoom = 1; dPanX = 0; dPanY = 0;
        renderDomainTree(window._domainTreeCache || treeData);
      });
    }

    var sunSecs = inner.querySelectorAll('.dt-sun-sector');
    for(var ssi=0; ssi<sunSecs.length; ssi++){
      sunSecs[ssi].addEventListener('click', function(e){
        e.stopPropagation();
        var p = this.getAttribute('data-path');
        var leaf = this.getAttribute('data-leaf') === '1';
        if(!p) return;
        if(leaf){ if(typeof window.__IFTO_openFile === 'function') window.__IFTO_openFile(p); return; }
        window._domainView = 'cards';
        window._domainNav.stack = [p];
        renderDomainTree(window._domainTreeCache || treeData);
      });
    }

    var zc = document.getElementById('domainZoomCtrl');
    if(zc) zc.style.display = (view === 'sun') ? 'flex' : 'none';
    if(view === 'sun') applyDomainTransform();

    var treeLeaves = inner.querySelectorAll('.dt-tree-leaf');
    for(var tli=0; tli<treeLeaves.length; tli++){
      treeLeaves[tli].addEventListener('click', function(e){
        e.stopPropagation();
        var p = this.getAttribute('data-path');
        if(p && typeof window.__IFTO_openFile === 'function') window.__IFTO_openFile(p);
      });
    }
  } catch(err) {
    inner.innerHTML = '<div class="dt-empty">\u6E32\u67D3\u51FA\u9519: ' + escHtml(String(err)) + '</div>';
    console.error('IFTO: renderDomainTree error', err);
  }
}

// Click "\u9886\u57DF" to toggle domain skill tree
document.getElementById('heroDomainLabel')?.addEventListener('click', function(e) {
  e.stopPropagation();
  toggleDomainMode();
});

// \u6EDA\u52A8\u5230\u6307\u5B9A\u533A\u5757\uFF1A\u5B9A\u4F4D\u6700\u8FD1\u7684\u6EDA\u52A8\u5BB9\u5668\u5E76\u7528\u5BB9\u5668\u5750\u6807\u8BA1\u7B97
// \uFF08scrollIntoView \u5728 Obsidian \u7684\u5D4C\u5957\u5BB9\u5668\u91CC\u7ECF\u5E38\u5931\u6548\uFF0C\u5BFC\u81F4"\u70B9\u4E86\u6CA1\u53CD\u5E94"\uFF09
function scrollToSection(id){
  if(window.__IFTO_MOBILE_ACTIVE && window.__IFTO_mobileNavigate) { window.__IFTO_mobileNavigate(id); return; }
  var el = document.getElementById(id);
  if(id === 'home' || !el){
    var pg = document.querySelector('.page') || document.scrollingElement || document.documentElement;
    try { pg.scrollTo({top: 0, behavior: 'smooth'}); } catch(e) { pg.scrollTop = 0; }
    return;
  }
  var sc = el.parentElement, container = null;
  while(sc && sc !== document.body){
    var st = window.getComputedStyle(sc);
    if((st.overflowY === 'auto' || st.overflowY === 'scroll') && sc.scrollHeight > sc.clientHeight + 4){ container = sc; break; }
    sc = sc.parentElement;
  }
  if(container){
    var top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 8;
    try { container.scrollTo({top: top, behavior: 'smooth'}); } catch(e) { container.scrollTop = top; }
  } else {
    try { el.scrollIntoView({behavior:'smooth', block:'start'}); } catch(e) { el.scrollIntoView(); }
  }
}

// Nav active state
var navClickActive = false;
document.querySelectorAll('.nav-item').forEach(item=>{
  item.addEventListener('click',function(e){
    e.preventDefault();
    navClickActive = true;
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    this.classList.add('active');
    const id = this.getAttribute('href')?.replace('#','');
    if(id) scrollToSection(id);
    setTimeout(function(){navClickActive=false},600);
  });
});
// Update active nav on scroll
var navItems = document.querySelectorAll('.nav-item');
var navSections = ['home','inbox','todo','project','note','review'];
var navScrollPending = false;
function updateActiveNav(){
  if(window.__IFTO_MOBILE_ACTIVE) return;
  if(navClickActive) return;
  let cur = navSections[0];
  for(const id of navSections){
    const el = document.getElementById(id);
    if(el && el.getBoundingClientRect().top <= 120) cur = id;
  }
  navItems.forEach(n=>n.classList.remove('active'));
  const link = document.querySelector('.nav-item[href="#'+cur+'"]');
  if(link) link.classList.add('active');
  navScrollPending = false;
}
var scrollContainer = document.querySelector('.page') || window;
scrollContainer.addEventListener('scroll',()=>{
  if(!navScrollPending){navScrollPending=true;requestAnimationFrame(updateActiveNav)}
},{passive:true});
setTimeout(updateActiveNav,200);

// ====== In-page confirm (avoids native dialog focus loss) ======
function iftoConfirm(message, okText) {
  return new Promise(function(resolve){
    var root = document.querySelector('.ifto-container') || document.body;
    var overlay = document.createElement('div');
    overlay.className = 'ifto-confirm-overlay';
    var box = document.createElement('div');
    box.className = 'ifto-confirm-box';
    var msg = document.createElement('div');
    msg.className = 'ifto-confirm-msg';
    msg.textContent = message || '';
    var row = document.createElement('div');
    row.className = 'ifto-confirm-actions';
    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'ifto-confirm-btn';
    cancelBtn.textContent = '\u53D6\u6D88';
    var okBtn = document.createElement('button');
    okBtn.className = 'ifto-confirm-btn ifto-confirm-ok';
    okBtn.textContent = okText || '\u786E\u5B9A';
    row.appendChild(cancelBtn);
    row.appendChild(okBtn);
    box.appendChild(msg);
    box.appendChild(row);
    overlay.appendChild(box);
    root.appendChild(overlay);

    var prevFocus = document.activeElement;
    var done = false;
    function close(val){
      if(done) return;
      done = true;
      document.removeEventListener('keydown', onKey, true);
      try { overlay.parentNode && overlay.parentNode.removeChild(overlay); } catch(e) {}
      try {
        if(prevFocus && document.body.contains(prevFocus)) prevFocus.focus({preventScroll:true});
        else { var c = document.querySelector('.ifto-container'); if(c) c.focus({preventScroll:true}); }
      } catch(e) {}
      resolve(val);
    }
    function onKey(e){
      if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); close(false); }
      else if(e.key === 'Enter'){ e.preventDefault(); e.stopPropagation(); close(true); }
    }
    cancelBtn.onclick = function(e){ e.preventDefault(); e.stopPropagation(); close(false); };
    okBtn.onclick = function(e){ e.preventDefault(); e.stopPropagation(); close(true); };
    overlay.onclick = function(e){ if(e.target === overlay) close(false); };
    document.addEventListener('keydown', onKey, true);
    setTimeout(function(){ try { okBtn.focus(); } catch(e) {} }, 0);
  });
}

// ====== Right-click delete cards & folders ======
document.querySelector('.ifto-container')?.addEventListener('contextmenu', function(e) {
  var card = e.target.closest('.card-detail, .todo-item, .card-sm, .project-card, .project-file-item, .project-folder-card, .project-folder-header, .note-card, .habit-row, .wn-card');
  if(!card) return;
  e.preventDefault();

  // Check if this is a folder (project-folder-header or project-folder-card)
  if(card.classList.contains('project-folder-card') || card.classList.contains('project-folder-header')) {
    var folderPath = card.getAttribute('data-path') || card.getAttribute('data-folder');
    if(!folderPath) return;
    var folName = folderPath.split('/').pop();
    iftoConfirm('\u786E\u5B9A\u8981\u5220\u9664\u9879\u76EE\u6587\u4EF6\u5939\u300C' + folName + '\u300D\u53CA\u5176\u6240\u6709\u5185\u5BB9\u5417\uFF1F').then(function(ok){
      if(!ok) return;
      if(window.__IFTO_deleteFolder) {
        window.__IFTO_deleteFolder(folderPath).then(function(res){
          if(res) { renderInbox(); renderProject(); renderTodo(); renderActivity(); renderNote(); }
        });
      }
    });
    return;
  }

  var path = card.getAttribute('data-path');
  if(!path) return;
  var name = path.split('/').pop().replace(/\\.md$/i,'');
  iftoConfirm('\u786E\u5B9A\u8981\u5220\u9664\u300C' + name + '\u300D\u5417\uFF1F').then(function(ok){
    if(!ok) return;
    if(window.__IFTO_deleteFile) {
      if(_isDraftPath(path)) console.log('[IFTO] \u8349\u7A3F\u7BB1\u53F3\u952E\u5220\u9664: "' + path + '"');
      window.__IFTO_deleteFile(path).then(function(success){
        if(success) {
          // Remove from order file if exists
          var folder = path.substring(0, path.lastIndexOf('/'));
          var fileName = path.split('/').pop();
          if(window.__IFTO_readListOrder) {
            window.__IFTO_readListOrder(folder).then(function(order){
              if(order && order.length) {
                var idx = order.indexOf(fileName);
                if(idx >= 0) { order.splice(idx,1); window.__IFTO_writeListOrder(folder, order); }
              }
            });
          }
          renderInbox();
          renderTodo();
          renderActivity();
          renderProject();
          renderNote();
          renderReview();
          if(typeof renderWeekNotesPage==='function') renderWeekNotesPage();
        }
      });
    }
  });
});

;
/* Phone presentation only. Business operations continue to use the host bridges. */
(function installPhoneHome() {
  var root = document.querySelector('.ifto-container.ifto-phone');
  if (!root) return;
  if (window.__IFTO_mobileCleanup) window.__IFTO_mobileCleanup();
  window.__IFTO_MOBILE_ACTIVE = true;
  var page = root.querySelector('.page');
  if (!page) return;
  var controller = new AbortController();
  var signal = controller.signal;
  var ids = ['home', 'inbox', 'todo', 'project', 'area', 'note', 'review'];
  var current = 'home', frame = 0, gesture = null, navGesture = null, suppressClickUntil = 0;
  var notePages = { reading: 1, read: 1, paper: 1 };
  var sheet = null, sheetTrigger = null;
  var viewportBase = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  var organizeTab = root.querySelector('#inbox .tab[data-tab="organize"]');
  if (organizeTab) organizeTab.remove();
  function on(el, event, handler, options) {
    el.addEventListener(event, handler, Object.assign({}, options, { signal: signal }));
  }
  function button(label, action, className) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = label;
    b.className = className || '';
    b.onclick = action;
    return b;
  }

  var rail = document.createElement('main');
  rail.className = 'mobile-pages';
  rail.setAttribute('aria-label', 'IFTO \u9875\u9762');
  var area = document.createElement('section');
  area.id = 'area'; area.className = 'section';
  area.innerHTML = '<div class="section-title-wrap"><div class="section-title-watermark">AREA\u9886\u57DF</div><h2 class="section-title">AREA</h2></div>';
  var domain = root.querySelector('#domainTreeOverlay');
  var zoom = root.querySelector('#domainZoomCtrl');
  if (domain) area.appendChild(domain);
  if (zoom) area.appendChild(zoom);
  ids.forEach(function(id) {
    var section = id === 'area' ? area : root.querySelector('#' + id);
    if (!section) return;
    section.classList.add('mobile-panel');
    section.setAttribute('aria-label', id.toUpperCase());
    section.hidden = id !== current;
    rail.appendChild(section);
  });
  var header = root.querySelector('.header');
  header.after(rail);
  var nav = root.querySelector('.nav-items');
  var areaLink = document.createElement('a');
  areaLink.href = '#area'; areaLink.className = 'nav-item'; areaLink.textContent = 'AREA\u9886\u57DF';
  nav.querySelector('[href="#note"]').before(areaLink);
  nav.setAttribute('aria-label', '\u5207\u6362\u9875\u9762');

  // Move existing buttons, preserving their handlers and their unique IDs.
  var dock = document.createElement('footer');
  dock.className = 'mobile-dock';
  dock.id = 'mobile-shortcuts';
  dock.hidden = true;
  var shortcutTitle = root.querySelector('.hero-title');
  var shortcuts = root.querySelector('.shortcuts');
  dock.appendChild(shortcutTitle); dock.appendChild(shortcuts);
  shortcuts.querySelectorAll('.btn-s').forEach(function(b) {
    b.setAttribute('aria-label', b.textContent.replace('+', '').trim());
    b.querySelector('.s-label').textContent = b.querySelector('.s-label').textContent.replace(/^\u65B0\u5EFA/, '');
  });
  root.appendChild(dock);

  var shortcutOpen = false, shortcutHideTimer = 0;
  var brandToggle = button('', function(e) {
    e.preventDefault(); e.stopPropagation();
    setShortcutsOpen(!shortcutOpen);
  }, 'mobile-brand-toggle');
  brandToggle.setAttribute('aria-label', '\u6253\u5F00\u5FEB\u6377\u901A\u9053');
  brandToggle.setAttribute('aria-expanded', 'false');
  brandToggle.setAttribute('aria-controls', dock.id);
  var brandImage = root.querySelector('.nav-logo img');
  if (brandImage) {
    var brandMark = brandImage.cloneNode(true);
    brandMark.className = 'mobile-brand-mark'; brandMark.alt = '';
    brandMark.setAttribute('aria-hidden', 'true');
    brandToggle.appendChild(brandMark);
  }
  root.appendChild(brandToggle);
  function setShortcutsOpen(open) {
    shortcutOpen = open;
    window.clearTimeout(shortcutHideTimer);
    if (open) {
      dock.hidden = false;
      dock.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(function() { if (shortcutOpen) dock.classList.add('is-open'); });
    } else {
      dock.classList.remove('is-open');
      dock.setAttribute('aria-hidden', 'true');
      shortcutHideTimer = window.setTimeout(function() { if (!shortcutOpen) dock.hidden = true; }, 260);
    }
    brandToggle.setAttribute('aria-expanded', String(open));
    brandToggle.setAttribute('aria-label', open ? '\u5173\u95ED\u5FEB\u6377\u901A\u9053' : '\u6253\u5F00\u5FEB\u6377\u901A\u9053');
  }
  on(root, 'click', function(e) {
    if (shortcutOpen && !dock.contains(e.target) && !brandToggle.contains(e.target)) setShortcutsOpen(false);
  });
  on(root, 'keydown', function(e) {
    if (e.key === 'Escape' && !dock.hidden) { setShortcutsOpen(false); brandToggle.focus(); }
  });

  function navigate(id) {
    if (ids.indexOf(id) < 0 || sheet) return;
    setShortcutsOpen(false);
    var active = document.activeElement;
    if (active && /^(INPUT|TEXTAREA)$/.test(active.tagName)) active.blur();
    current = id;
    rail.querySelectorAll('.mobile-panel').forEach(function(panel) { panel.hidden = panel.id !== id; });
    nav.querySelectorAll('.nav-item').forEach(function(link) {
      var selected = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', selected);
      if (selected) {
        link.setAttribute('aria-current', 'page');
        nav.scrollTo({ left: Math.max(0, link.offsetLeft - nav.offsetLeft - 12), behavior: 'smooth' });
      } else link.removeAttribute('aria-current');
    });
    root.setAttribute('data-mobile-page', id);
    // AREA reuses its existing renderer but lives outside heroImage on phones.
    domainMode = id === 'area';
    if (domainMode) {
      if (domainTreeData) renderDomainTree(domainTreeData);
      else renderDomainTreeLoading();
      fetchDomainTree();
    }
  }
  window.__IFTO_mobileNavigate = navigate;
  on(root, 'click', function(e) {
    if (Date.now() < suppressClickUntil) { e.preventDefault(); e.stopImmediatePropagation(); return; }
    var link = e.target.closest('a[href^="#"]');
    if (link && root.contains(link)) {
      var id = link.getAttribute('href').slice(1);
      if (ids.indexOf(id) >= 0) { e.preventDefault(); e.stopImmediatePropagation(); navigate(id); }
    }
  }, { capture: true });

  // Swiping directly across the top navigation changes the selected page as
  // well as keeping the selected label in view. The outer edge lanes remain
  // available to Obsidian's own sidebar gestures.
  on(nav, 'touchstart', function(e) {
    navGesture = null;
    if (sheet || e.touches.length !== 1 || e.target.closest('input,button,[contenteditable="true"]')) return;
    var t = e.touches[0], bounds = root.getBoundingClientRect();
    var edgeReserve = Math.min(64, Math.max(48, bounds.width * 0.16));
    if (t.clientX - bounds.left < edgeReserve || bounds.right - t.clientX < edgeReserve) return;
    navGesture = { x: t.clientX, y: t.clientY, lastX: t.clientX, start: Date.now(), axis: '' };
  }, { passive: true });
  on(nav, 'touchmove', function(e) {
    if (!navGesture) return;
    if (e.touches.length !== 1) { navGesture = null; return; }
    var t = e.touches[0], dx = t.clientX - navGesture.x, dy = t.clientY - navGesture.y;
    navGesture.lastX = t.clientX;
    if (!navGesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 10) navGesture.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y';
    if (navGesture.axis === 'x') {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });
  on(nav, 'touchend', function(e) {
    if (!navGesture) return;
    var g = navGesture; navGesture = null;
    var t = e.changedTouches[0], dx = t ? t.clientX - g.x : g.lastX - g.x;
    var dy = t ? t.clientY - g.y : 0;
    if (g.axis === 'x' && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - g.start < 900) {
      suppressClickUntil = Date.now() + 350;
      var next = ids.indexOf(current) + (dx < 0 ? 1 : -1);
      if (next >= 0 && next < ids.length) navigate(ids[next]);
    }
  }, { passive: true });
  on(nav, 'touchcancel', function() { navGesture = null; }, { passive: true });

  // Reserve broad edge zones for Obsidian's sidebar gestures. Inside the
  // center lane, require a deliberate horizontal swipe before changing pages.
  var excluded = 'input,textarea,select,button,a,[contenteditable="true"],.tabs,.note-sidebar,.slide-nav,.hero-nav-row,.mobile-note-nav,.dt-visual,.dt-zoom-ctrl,.mobile-sheet-overlay';
  on(rail, 'touchstart', function(e) {
    gesture = null;
    if (sheet || e.touches.length !== 1 || e.target.closest(excluded)) return;
    if (document.activeElement && /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
    var t = e.touches[0], bounds = root.getBoundingClientRect();
    var edgeReserve = Math.min(64, Math.max(48, bounds.width * 0.16));
    if (t.clientX - bounds.left < edgeReserve || bounds.right - t.clientX < edgeReserve) return;
    gesture = { x: t.clientX, y: t.clientY, lastX: t.clientX, start: Date.now(), axis: '' };
  }, { passive: true });
  on(rail, 'touchmove', function(e) {
    if (!gesture) return;
    if (e.touches.length !== 1) { gesture = null; return; }
    var t = e.touches[0], dx = t.clientX - gesture.x, dy = t.clientY - gesture.y;
    gesture.lastX = t.clientX;
    if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 10) gesture.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y';
    if (gesture.axis === 'x') {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });
  on(rail, 'touchend', function(e) {
    if (!gesture) return;
    var g = gesture; gesture = null;
    var t = e.changedTouches[0];
    var dx = t ? t.clientX - g.x : g.lastX - g.x;
    var dy = t ? t.clientY - g.y : 0;
    if (g.axis === 'x' && Math.abs(dx) >= 80 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - g.start < 900) {
      suppressClickUntil = Date.now() + 350;
      var next = ids.indexOf(current) + (dx < 0 ? 1 : -1);
      if (next >= 0 && next < ids.length) navigate(ids[next]);
    }
  }, { passive: true });
  on(rail, 'touchcancel', function() { gesture = null; }, { passive: true });

  // The desktop domain handler pans on its entire overlay. Phones only pan
  // the sun chart, leaving cards and the tree free to scroll vertically.
  var domainGesture = null;
  on(area, 'touchstart', function(e) {
    if (!e.target.closest('.dt-sun-wrap')) { domainGesture = null; return; }
    if (e.touches.length === 1) {
      domainGesture = { x: e.touches[0].clientX, y: e.touches[0].clientY, px: dPanX, py: dPanY, moved: false };
    } else if (e.touches.length === 2) {
      domainGesture = { distance: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY), zoom: dZoom, moved: false };
    }
  }, { passive: true });
  on(area, 'touchmove', function(e) {
    if (!domainGesture) return;
    var g = domainGesture;
    if (e.touches.length === 2 && g.distance) {
      if (e.cancelable) e.preventDefault();
      var distance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      dZoom = Math.max(.3, Math.min(3, g.zoom * distance / Math.max(1, g.distance))); g.moved = true;
      applyDomainTransform();
    } else if (e.touches.length === 1 && g.x !== undefined) {
      var dx = e.touches[0].clientX - g.x, dy = e.touches[0].clientY - g.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) {
        if (e.cancelable) e.preventDefault();
        dPanX = g.px + dx; dPanY = g.py + dy; g.moved = true; applyDomainTransform();
      }
    }
  }, { passive: false });
  on(area, 'touchend', function() {
    if (domainGesture && domainGesture.moved) suppressClickUntil = Date.now() + 350;
    domainGesture = null;
  }, { passive: true });
  on(area, 'touchcancel', function() { domainGesture = null; }, { passive: true });
  var resetDomain = root.querySelector('#domainResetBtn');
  if (resetDomain) on(resetDomain, 'click', function(e) { e.preventDefault(); e.stopPropagation(); resetDomainView(); });

  var noteNav = document.createElement('div');
  noteNav.className = 'slide-nav mobile-note-nav';
  var prev = button('\u2190', function() { notePages[noteTab]--; paginateNotes(); }, 'slide-btn');
  prev.setAttribute('aria-label', '\u4E0A\u4E00\u9875\u9605\u8BFB\u7B14\u8BB0');
  var number = document.createElement('span'); number.className = 'slide-num';
  var next = button('\u2192', function() { notePages[noteTab]++; paginateNotes(); }, 'slide-btn');
  next.setAttribute('aria-label', '\u4E0B\u4E00\u9875\u9605\u8BFB\u7B14\u8BB0');
  noteNav.append(prev, number, next);
  root.querySelector('#note .note-main').appendChild(noteNav);
  function paginateNotes() {
    var grid = root.querySelector('#noteGrid');
    var cards = Array.from(grid.children).filter(function(el) { return el.matches('.note-card,.note-add-btn'); });
    var total = Math.max(1, Math.ceil(cards.length / 8));
    var index = Math.max(1, Math.min(total, notePages[noteTab] || 1));
    notePages[noteTab] = index;
    cards.forEach(function(card, i) { card.hidden = i < (index - 1) * 8 || i >= index * 8; });
    noteNav.hidden = cards.length === 0;
    var countLabel = String(index).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    if (number.textContent !== countLabel) number.textContent = countLabel;
    prev.disabled = index === 1; next.disabled = index === total;
  }

  function closeSheet() {
    if (!sheet) return;
    sheet.remove(); sheet = null;
    if (sheetTrigger && sheetTrigger.isConnected && sheetTrigger.focus) sheetTrigger.focus({ preventScroll: true });
    sheetTrigger = null;
  }
  function openSheet(title, items, trigger) {
    closeSheet(); sheetTrigger = trigger || document.activeElement;
    sheet = document.createElement('div'); sheet.className = 'mobile-sheet-overlay';
    var box = document.createElement('div'); box.className = 'mobile-sheet';
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', title); box.tabIndex = -1;
    var heading = document.createElement('h3'); heading.textContent = title; box.appendChild(heading);
    items.forEach(function(item) {
      var b = button(item.label, async function() {
        closeSheet();
        try { await item.action(); } catch (err) { console.error('IFTO mobile action:', err); showToast('\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5'); }
      }, item.danger ? 'mobile-sheet-danger' : '');
      box.appendChild(b);
    });
    box.appendChild(button('\u53D6\u6D88', closeSheet, 'mobile-sheet-cancel'));
    sheet.appendChild(box); root.appendChild(sheet);
    sheet.onclick = function(e) { if (e.target === sheet) closeSheet(); };
    box.focus({ preventScroll: true });
  }
  on(root, 'keydown', function(e) {
    if (!sheet) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closeSheet(); }
    if (e.key === 'Tab') {
      var controls = sheet.querySelectorAll('button,input');
      var first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet.firstChild)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, { capture: true });

  function refreshLists() { renderInbox(); renderTodo(); renderActivity(); renderProject(); renderNote(); renderReview(); }
  function pathOf(card) { return card.getAttribute('data-path') || card.getAttribute('data-folder'); }
  function dropEvent(path, source) {
    return { preventDefault: function() {}, stopPropagation: function() {}, dataTransfer: {
      types: ['text/plain', 'text/x-ifto-src-col'],
      getData: function(type) { return type === 'text/plain' ? path : type === 'text/x-ifto-src-col' ? source || '' : ''; }
    } };
  }
  function rename(path, folder) {
    openSheet('\u91CD\u547D\u540D', []);
    var box = sheet.querySelector('.mobile-sheet'), input = document.createElement('input');
    var oldName = path.split('/').pop();
    input.type = 'text'; input.value = folder ? oldName : oldName.replace(/\\.md$/i, '');
    input.setAttribute('aria-label', '\u540D\u79F0'); box.insertBefore(input, box.lastChild);
    var save = button('\u4FDD\u5B58', async function() {
      var name = input.value.trim();
      if (!name || /[\\\\/:*?"<>|]/.test(name) || name === '.' || name === '..') { input.setCustomValidity('\u8BF7\u8F93\u5165\u6709\u6548\u540D\u79F0'); input.reportValidity(); return; }
      save.disabled = true;
      try {
        var fn = folder ? window.__IFTO_renameFolder : window.__IFTO_renameFile;
        var ok = fn && await fn(path, folder ? name : name.replace(/\\.md$/i, '') + '.md');
        if (ok) { closeSheet(); refreshLists(); } else { showToast('\u91CD\u547D\u540D\u5931\u8D25'); save.disabled = false; }
      } catch (err) { showToast('\u91CD\u547D\u540D\u5931\u8D25'); save.disabled = false; }
    });
    input.oninput = function() { input.setCustomValidity(''); };
    input.onkeydown = function(e) { if (e.key === 'Enter') save.click(); };
    box.insertBefore(save, box.lastChild); input.focus(); input.select();
  }
  async function move(path, folder) {
    if (!window.__IFTO_moveFile) return;
    if (window.__IFTO_createFolder) await window.__IFTO_createFolder(folder);
    if (await window.__IFTO_moveFile(path, folder)) refreshLists(); else showToast('\u79FB\u52A8\u5931\u8D25');
  }
  function showActions(card, trigger) {
    var path = pathOf(card); if (!path) return;
    var isFolder = card.matches('.project-folder-card');
    var project = !!card.closest('#project');
    var column = card.closest('.project-col');
    var source = column ? column.getAttribute('data-status') : '';
    var items = [];
    if (!isFolder) items.push({ label: '\u6253\u5F00\u6587\u4EF6', action: function() { if (window.__IFTO_openFile) window.__IFTO_openFile(path); } });
    items.push({ label: '\u91CD\u547D\u540D', action: function() { rename(path, isFolder); } });
    if (card.matches('.todo-item,.card-sm')) {
      [-1, 1].forEach(function(direction) {
        items.push({ label: direction < 0 ? '\u4E0A\u79FB' : '\u4E0B\u79FB', action: async function() {
          var folder = path.slice(0, path.lastIndexOf('/'));
          var files = await window.__IFTO_listFiles(folder);
          var order = await window.__IFTO_readListOrder(folder);
          var names = _applyListOrder(files.filter(function(name) { return name[0] !== '.'; }), order);
          var index = names.indexOf(path.split('/').pop()), destination = index + direction;
          if (index < 0 || destination < 0 || destination >= names.length) return;
          var movedName = names.splice(index, 1)[0]; names.splice(destination, 0, movedName);
          if (window.__IFTO_writeListOrder) await window.__IFTO_writeListOrder(folder, names);
          renderTodo(); renderActivity();
        } });
      });
    }
    if (project) {
      root.querySelectorAll('#project .project-col').forEach(function(col) {
        var status = col.getAttribute('data-status');
        if (status === source) return;
        items.push({ label: '\u79FB\u81F3\u300C' + status + '\u300D', action: async function() {
          // A destination may currently show drafts; switch it back to status view.
          if (projectMiddleView === 'draft') { projectMiddleView = 'progress'; }
          if (window.__ifto_dropHandler) await window.__ifto_dropHandler(dropEvent(path, source), col);
        } });
      });
      if (!_isDraftPath(path)) items.push({ label: '\u590D\u5236\u5230\u8349\u7A3F\u7BB1', action: async function() { await _handleDraftDrop(path); } });
      if (!_isDraftPath(path)) items.push({ label: isFolder ? '\u5F52\u6863\u5DF2\u5B8C\u6210\u5185\u5BB9' : '\u5F52\u6863', action: function() {
        var target = root.querySelector('.project-archive-drop');
        if (target && target.ondrop) target.ondrop(dropEvent(path, source));
      } });
    } else if (!isFolder && card.closest('#inbox,#todo')) {
      var inboxCard = !!card.closest('#inbox');
      var destinations = inboxCard ? [
        ['\u8D44\u6E90\u6587\u4EF6\u76EE\u5F55', getResourceRoot()],
        ['\u9879\u76EE\u7BA1\u7406\u76EE\u5F55', getProjectBase()],
        ['\u5FEB\u901F\u5B66\u4E60', getQuickLearnFolder()],
        ['\u4ECA\u65E5\u5F85\u529E', TODO_FOLDER],
        ['\u6D3B\u52A8\u6E05\u5355', ACTIVITY_FOLDER]
      ] : [
        ['\u6536\u96C6', getInboxFolder()], ['\u4ECA\u65E5\u5F85\u529E', TODO_FOLDER],
        ['\u6D3B\u52A8\u6E05\u5355', ACTIVITY_FOLDER], ['\u5FEB\u901F\u5B66\u4E60', getQuickLearnFolder()]
      ];
      destinations.forEach(function(dest) {
        if (path.substring(0, path.lastIndexOf('/')) !== dest[1]) items.push({ label: '\u79FB\u81F3' + dest[0], action: function() { return move(path, dest[1]); } });
      });
      if (!inboxCard) items.push({ label: '\u9009\u62E9\u76EE\u6807\u6587\u4EF6\u5939\u2026', action: function() {
        openSheet('\u9009\u62E9\u5206\u7C7B\u4F4D\u7F6E', [getResourceRoot(), getProjectBase(), getNoteFolder()].map(function(folder) {
          return { label: folder, action: function() { pickFolder(path, folder); } };
        }));
      } });
    }
    items.push({ label: '\u5220\u9664', danger: true, action: async function() {
      if (!await iftoConfirm('\u786E\u5B9A\u8981\u5220\u9664\u300C' + path.split('/').pop() + '\u300D' + (isFolder ? '\u53CA\u5176\u6240\u6709\u5185\u5BB9' : '') + '\u5417\uFF1F')) return;
      var fn = isFolder ? window.__IFTO_deleteFolder : window.__IFTO_deleteFile;
      if (fn && await fn(path)) refreshLists(); else showToast('\u5220\u9664\u5931\u8D25');
    } });
    openSheet(path.split('/').pop().replace(/\\.md$/i, ''), items, trigger);
  }
  async function pickFolder(path, folder) {
    var contents = window.__IFTO_listFolderContents ? await window.__IFTO_listFolderContents(folder) : [];
    var items = [{ label: '\u79FB\u5230\u6B64\u6587\u4EF6\u5939', action: function() { return move(path, folder); } }];
    contents.filter(function(item) { return item.isFolder && item.name[0] !== '.'; }).forEach(function(item) {
      items.push({ label: item.name + ' \u2192', action: function() { return pickFolder(path, folder + '/' + item.name); } });
    });
    items.push({ label: '\u91CD\u65B0\u9009\u62E9\u5206\u7C7B\u4F4D\u7F6E', action: function() { showActionsForPath(path); } });
    openSheet(folder, items);
  }
  function showActionsForPath(path) {
    openSheet('\u9009\u62E9\u5206\u7C7B\u4F4D\u7F6E', [getResourceRoot(), getProjectBase(), getNoteFolder()].map(function(folder) {
      return { label: folder, action: function() { return pickFolder(path, folder); } };
    }));
  }

  var cardsSelector = '.card-detail[data-path],.todo-item[data-path],.card-sm[data-path],.project-card[data-path],.project-file-item[data-path],.project-folder-card[data-folder],.note-card[data-path],.inbox-list-item[data-path],.side-folder-item[data-file="true"]';
  function decorate() {
    frame = 0;
    ['#inboxGrid', '#todoList'].forEach(function(selector) {
      var grid = root.querySelector(selector);
      if (grid && grid.children.length === 0) {
        var empty = document.createElement('div'); empty.className = 'mobile-empty';
        empty.textContent = selector === '#todoList' ? '\u6682\u65E0\u4ECA\u65E5\u5F85\u529E' : '\u6682\u65E0\u5185\u5BB9'; grid.appendChild(empty);
      }
    });
    rail.querySelectorAll(cardsSelector).forEach(function(card) {
      card.setAttribute('draggable', 'false');
      // Nested project items get their own menus; folder menus live in the header.
      var holder = card.matches('.project-folder-card') ? card.querySelector('.project-folder-header') : card;
      if (!holder || Array.from(holder.children).some(function(el) { return el.classList.contains('mobile-more'); })) return;
      var more = button('\u22EF', function(e) { e.preventDefault(); e.stopPropagation(); showActions(card, more); }, 'mobile-more');
      more.setAttribute('aria-label', '\u66F4\u591A\u64CD\u4F5C\uFF1A' + pathOf(card).split('/').pop());
      holder.appendChild(more);
    });
    rail.querySelectorAll('.cb').forEach(function(cb) {
      cb.setAttribute('role', 'checkbox');
      cb.setAttribute('aria-label', '\u5B8C\u6210\u5F85\u529E');
      cb.setAttribute('aria-checked', String(cb.classList.contains('checked') || !!cb.querySelector('svg') || cb.textContent.trim() === '\u2713'));
    });
    var archive = root.querySelector('#projectArchiveZone');
    if (archive && !archive.querySelector('.mobile-archive-button')) {
      archive.appendChild(button('\u5F52\u6863', function() {
        var entries = Array.from(root.querySelectorAll('#project .project-card[data-path],#project .project-folder-card[data-folder]'));
        var seen = {};
        var items = entries.filter(function(card) { var p = pathOf(card); if (seen[p] || _isDraftPath(p)) return false; seen[p] = true; return true; }).map(function(card) {
          return { label: pathOf(card).split('/').pop(), action: function() { showActions(card); } };
        });
        openSheet('\u9009\u62E9\u8981\u5F52\u6863\u7684\u9879\u76EE\u6216\u6587\u4EF6', items.length ? items : [{ label: '\u6682\u65E0\u9879\u76EE', action: function() {} }]);
      }, 'mobile-archive-button'));
    }
    paginateNotes();
  }
  function scheduleDecorate() { if (!frame) frame = requestAnimationFrame(decorate); }
  var observer = new MutationObserver(scheduleDecorate);
  observer.observe(rail, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  decorate();

  // Project cards previously required Ctrl/Cmd; use tap on phones, without
  // interfering with checkboxes, folder expansion, menus or form controls.
  on(rail, 'click', function(e) {
    if (e.target.closest('button,input,textarea,.cb,.project-view-toggle,.project-view-active')) return;
    var card = e.target.closest('.project-card[data-path],.project-file-item[data-path],.todo-item[data-path],.card-sm[data-path]');
    if (card) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (window.__IFTO_openFile) window.__IFTO_openFile(pathOf(card));
    }
  }, { capture: true });
  on(rail, 'contextmenu', function(e) {
    var card = e.target.closest(cardsSelector);
    if (card) { e.preventDefault(); e.stopImmediatePropagation(); showActions(card); }
  }, { capture: true });
  on(rail, 'dblclick', function(e) { e.preventDefault(); e.stopPropagation(); }, { capture: true });

  function keyboardLayout() {
    var active = document.activeElement;
    var editing = !!active && root.contains(active) && (active.matches('input,textarea,[contenteditable="true"]'));
    var height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    if (!editing) viewportBase = Math.max(viewportBase, height);
    root.classList.toggle('mobile-keyboard', editing && viewportBase - height > 120);
  }
  on(root, 'focusin', keyboardLayout); on(root, 'focusout', function() { requestAnimationFrame(keyboardLayout); });
  if (window.visualViewport) on(window.visualViewport, 'resize', keyboardLayout);
  on(window, 'resize', function() { if (!root.querySelector('input:focus,textarea:focus')) viewportBase = window.visualViewport ? window.visualViewport.height : window.innerHeight; keyboardLayout(); });
  navigate('home');
  window.__IFTO_mobileCleanup = function() {
    controller.abort(); observer.disconnect(); if (frame) cancelAnimationFrame(frame);
    window.clearTimeout(shortcutHideTimer);
    closeSheet(); gesture = null; domainGesture = null; domainMode = false;
    dock.remove(); brandToggle.remove();
    window.__IFTO_mobileNavigate = null; window.__IFTO_MOBILE_ACTIVE = false;
    window.__IFTO_mobileCleanup = null;
  };
  root.__IFTO_mobileCleanup = window.__IFTO_mobileCleanup;
})();
`;
var DEFAULT_SETTINGS = {
  deepseekApiKey: "",
  minimaxApiKey: "",
  collectionTemplate: "",
  readingTemplate: "",
  notePath: "000-\u4FE1\u7BB1INBOX/040-\u7B14\u8BB0",
  noteTemplate: "",
  reviewDailyPath: "600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/602-\u65E5\u62A5",
  reviewWeeklyPath: "600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/603-\u5468\u62A5",
  reviewMonthlyPath: "600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/604-\u6708\u62A5",
  reviewProjectPath: "600-\u590D\u76D8\u603B\u7ED3/610-\u9879\u76EE\u603B\u7ED3",
  reviewDailyTemplate: "",
  reviewWeeklyTemplate: "",
  reviewMonthlyTemplate: "",
  reviewProjectTemplate: "",
  heroImageUrl: "",
  heroImageFolder: "",
  inboxFolder: "000-\u4FE1\u7BB1INBOX/010-\u6536\u96C6",
  quickLearnFolder: "100-\u5DE5\u4F5C\u53F0WORKDESK/101-\u5FEB\u901F\u5B66\u4E60",
  todoFolder: "000-\u4FE1\u7BB1INBOX/031-\u4ECA\u65E5\u5F85\u529E",
  activityFolder: "000-\u4FE1\u7BB1INBOX/030-\u6D3B\u52A8\u6E05\u5355",
  taskFolder: "100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406",
  projectBase: "100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406",
  projectCols: "\u672A\u5F00\u59CB,\u63A8\u8FDB\u4E2D,\u5DF2\u5B8C\u6210",
  archivePath: "500-\u5F52\u6863\u8D44\u6599/510-\u5F52\u6863\u9879\u76EE",
  bookFolder: "400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/421-\u4E66\u7C4D",
  paperFolder: "400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/422-\u8BBA\u6587",
  resourceRoot: "400-\u8D44\u6E90RESOURCE",
  domainFolder: "300-\u9886\u57DFAREA",
  inboxRoot: "000-\u4FE1\u7BB1INBOX",
  workfileRoot: "200-\u5DE5\u4F5C\u5E93WORKFILE",
  projectFilesFolder: "200-\u5DE5\u4F5C\u5E93WORKFILE/201-\u9879\u76EE\u6587\u4EF6",
  archiveRoot: "500-\u5F52\u6863\u8D44\u6599",
  draftFolder: "100-\u5DE5\u4F5C\u53F0WORKDESK/110-\u8349\u7A3F\u7BB1",
  shortcutCollectPath: "000-\u4FE1\u7BB1INBOX/010-\u6536\u96C6",
  shortcutTodoPath: "000-\u4FE1\u7BB1INBOX/030-\u6D3B\u52A8\u6E05\u5355",
  shortcutTaskPath: "100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406",
  shortcutNotePath: "000-\u4FE1\u7BB1INBOX/040-\u7B14\u8BB0",
  shortcutCollectTemplate: "",
  shortcutTodoTemplate: "",
  shortcutTaskTemplate: "",
  shortcutNoteTemplate: "",
  pinnedAreas: [],
  projectTaskTemplate: "",
  minimaxApiUrl: "https://www.minimaxi.com/v1/token_plan/remains",
  widgetOrder: "deepseek,minimax,calendar,habits,weeknotes,todotoday",
  widgetDeepseekEnabled: true,
  widgetCalendarEnabled: true,
  widgetHabitsEnabled: true,
  widgetWeeknotesEnabled: true,
  widgetTodotodayEnabled: true,
  widgetMinimaxEnabled: true,
  widgetWeeknotesPath: "",
  widgetTodotodoPath: "",
  zoom: 1,
  bgColor: "",
  borderRadius: 8
};
var IFTO_VIEW_TYPE = "ifto-homepage";
var IFTOView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    __publicField(this, "plugin");
    __publicField(this, "isActive", false);
    this.plugin = plugin;
  }
  getViewType() {
    return IFTO_VIEW_TYPE;
  }
  getDisplayText() {
    return "IFTO-HOME \u9996\u9875";
  }
  getIcon() {
    return "blocks";
  }
  async onOpen() {
    this.containerEl.empty();
    this.containerEl.addClass("ifto-container");
    this.containerEl.toggleClass("ifto-phone", !!import_obsidian.Platform.isPhone);
    this.containerEl.style.height = "100%";
    this.containerEl.style.overflow = "auto";
    this.isActive = false;
    window.__IFTO_leafActive = () => !!this.isActive;
    this.registerEvent(this.app.workspace.on("active-leaf-change", (leaf) => {
      const act = !!leaf && leaf.view === this;
      this.isActive = act;
      if (act && typeof window.__IFTO_restoreFocus === "function") {
        setTimeout(() => {
          window.__IFTO_restoreFocus();
        }, 0);
        setTimeout(() => {
          window.__IFTO_restoreFocus();
        }, 60);
        setTimeout(() => {
          window.__IFTO_restoreFocus();
        }, 200);
      }
    }));
    try {
      window.__IFTO_SETTINGS = {
        heroImageUrl: this.plugin.settings.heroImageUrl,
        heroImageFolder: this.plugin.settings.heroImageFolder,
        deepseekKey: this.plugin.settings.deepseekApiKey,
        minimaxKey: this.plugin.settings.minimaxApiKey,
        minimaxApiUrl: this.plugin.settings.minimaxApiUrl,
        widgetMinimaxEnabled: this.plugin.settings.widgetMinimaxEnabled,
        readingTemplate: this.plugin.settings.readingTemplate,
        notePath: this.plugin.settings.notePath,
        noteTemplate: this.plugin.settings.noteTemplate,
        reviewDailyPath: this.plugin.settings.reviewDailyPath,
        reviewWeeklyPath: this.plugin.settings.reviewWeeklyPath,
        reviewMonthlyPath: this.plugin.settings.reviewMonthlyPath,
        reviewProjectPath: this.plugin.settings.reviewProjectPath,
        reviewDailyTemplate: this.plugin.settings.reviewDailyTemplate,
        reviewWeeklyTemplate: this.plugin.settings.reviewWeeklyTemplate,
        reviewMonthlyTemplate: this.plugin.settings.reviewMonthlyTemplate,
        reviewProjectTemplate: this.plugin.settings.reviewProjectTemplate,
        inboxFolder: this.plugin.settings.inboxFolder,
        quickLearnFolder: this.plugin.settings.quickLearnFolder,
        todoFolder: this.plugin.settings.todoFolder,
        activityFolder: this.plugin.settings.activityFolder,
        taskFolder: this.plugin.settings.taskFolder,
        projectBase: this.plugin.settings.projectBase,
        projectCols: this.plugin.settings.projectCols,
        archivePath: this.plugin.settings.archivePath,
        bookFolder: this.plugin.settings.bookFolder,
        paperFolder: this.plugin.settings.paperFolder,
        resourceRoot: this.plugin.settings.resourceRoot,
        domainFolder: this.plugin.settings.domainFolder,
        inboxRoot: this.plugin.settings.inboxRoot,
        workfileRoot: this.plugin.settings.workfileRoot,
        projectFilesFolder: this.plugin.settings.projectFilesFolder,
        archiveRoot: this.plugin.settings.archiveRoot,
        draftFolder: this.plugin.settings.draftFolder,
        shortcutCollectPath: this.plugin.settings.shortcutCollectPath,
        shortcutTodoPath: this.plugin.settings.shortcutTodoPath,
        shortcutTaskPath: this.plugin.settings.shortcutTaskPath,
        shortcutNotePath: this.plugin.settings.shortcutNotePath,
        shortcutCollectTemplate: this.plugin.settings.shortcutCollectTemplate,
        shortcutTodoTemplate: this.plugin.settings.shortcutTodoTemplate,
        shortcutTaskTemplate: this.plugin.settings.shortcutTaskTemplate,
        shortcutNoteTemplate: this.plugin.settings.shortcutNoteTemplate,
        projectTaskTemplate: this.plugin.settings.projectTaskTemplate,
        widgetOrder: this.plugin.settings.widgetOrder,
        widgetDeepseekEnabled: this.plugin.settings.widgetDeepseekEnabled,
        widgetCalendarEnabled: this.plugin.settings.widgetCalendarEnabled,
        widgetHabitsEnabled: this.plugin.settings.widgetHabitsEnabled,
        widgetWeeknotesEnabled: this.plugin.settings.widgetWeeknotesEnabled,
        widgetTodotodayEnabled: this.plugin.settings.widgetTodotodayEnabled,
        widgetWeeknotesPath: this.plugin.settings.widgetWeeknotesPath,
        widgetTodotodoPath: this.plugin.settings.widgetTodotodoPath,
        zoom: this.plugin.settings.zoom,
        bgColor: this.plugin.settings.bgColor,
        borderRadius: this.plugin.settings.borderRadius
      };
      const pluginDir = this.app.vault.configDir + "/plugins/IFTO-HOME";
      let htmlContent = __IFTO_HOME_HTML;
      if (!htmlContent) {
        try {
          htmlContent = await this.app.vault.adapter.read(pluginDir + "/home.html");
        } catch (e) {
        }
      }
      this.containerEl.innerHTML = htmlContent;
      this.plugin.applyAppearance(this.containerEl);
      const oldScript = document.getElementById("ifto-home-script");
      if (oldScript) oldScript.remove();
      let jsContent = __IFTO_HOME_JS;
      if (!jsContent) {
        try {
          jsContent = await this.app.vault.adapter.read(pluginDir + "/home.js");
        } catch (e) {
        }
      }
      const scriptEl = document.createElement("script");
      scriptEl.id = "ifto-home-script";
      scriptEl.textContent = jsContent;
      this.containerEl.__createNote = () => this.createCollectionNote();
      window.__IFTO_forceInputFocus = (target) => {
        const focusTarget = () => {
          try {
            if (target && document.body.contains(target)) {
              target.focus({ preventScroll: true });
              if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
                const len = target.value.length;
                try {
                  target.setSelectionRange(0, len);
                } catch (_) {
                  target.select();
                }
              }
              return;
            }
            this.containerEl.focus({ preventScroll: true });
          } catch (_) {
          }
        };
        try {
          this.app.workspace.setActiveLeaf(this.leaf, false, true);
        } catch (_) {
        }
        try {
          this.containerEl.setAttribute("tabindex", "-1");
          this.containerEl.focus({ preventScroll: true });
        } catch (_) {
        }
        focusTarget();
        requestAnimationFrame(() => focusTarget());
        setTimeout(focusTarget, 30);
        setTimeout(focusTarget, 100);
        setTimeout(focusTarget, 250);
      };
      const iftoGetWindow = () => {
        try {
          const electron = require("electron");
          if (electron && electron.remote && electron.remote.getCurrentWindow) return electron.remote.getCurrentWindow();
          if (electron && electron.BrowserWindow) {
            if (electron.BrowserWindow.getFocusedWindow) {
              const w = electron.BrowserWindow.getFocusedWindow();
              if (w) return w;
            }
            if (electron.BrowserWindow.getAllWindows && electron.BrowserWindow.getAllWindows().length) return electron.BrowserWindow.getAllWindows()[0];
          }
        } catch (e) {
        }
        try {
          const remote = require("@electron/remote");
          if (remote && remote.getCurrentWindow) return remote.getCurrentWindow();
        } catch (e) {
        }
        return null;
      };
      window.__IFTO_refocusWindow = () => {
        const win = iftoGetWindow();
        if (!win) return false;
        try {
          if (typeof win.blur === "function") win.blur();
          if (typeof win.focus === "function") win.focus();
          return true;
        } catch (e) {
          return false;
        }
      };
      try {
        const _fixWin = iftoGetWindow();
        if (_fixWin && _fixWin.on) {
          let _needsFix = false, _suppress = false;
          _fixWin.on("blur", () => {
            if (_suppress) return;
            _needsFix = true;
          });
          _fixWin.on("focus", () => {
            if (!_needsFix) return;
            _needsFix = false;
            if (_suppress) return;
            if (!(window.__IFTO_leafActive && window.__IFTO_leafActive())) return;
            _suppress = true;
            setTimeout(() => {
              try {
                if (typeof _fixWin.blur === "function") _fixWin.blur();
              } catch (e) {
              }
              setTimeout(() => {
                try {
                  if (typeof _fixWin.focus === "function") _fixWin.focus();
                } catch (e) {
                }
                setTimeout(() => {
                  _suppress = false;
                }, 60);
              }, 30);
            }, 100);
          });
        }
      } catch (e) {
      }
      window.__IFTO_togglePin = async (path) => {
        try {
          const s = this.plugin.settings;
          if (!Array.isArray(s.pinnedAreas)) s.pinnedAreas = [];
          const i = s.pinnedAreas.indexOf(path);
          if (i >= 0) s.pinnedAreas.splice(i, 1);
          else s.pinnedAreas.push(path);
          await this.plugin.saveSettings();
          return i < 0;
        } catch (e) {
          console.error("IFTO: togglePin error", e);
          return false;
        }
      };
      window.__IFTO_listFiles = async (folder) => {
        try {
          if (!await this.app.vault.adapter.exists(folder)) return [];
          const result = await this.app.vault.adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          return (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length));
        } catch (e) {
          console.error("IFTO: list files error", e);
          return [];
        }
      };
      const findFile = (path) => {
        const vault = this.app.vault;
        if (vault.getFileByPath) {
          const f = vault.getFileByPath(path);
          if (f) return f;
        }
        if (vault.getAbstractByPath) {
          const f = vault.getAbstractByPath(path);
          if (f && "stat" in f) return f;
        }
        const all = vault.getFiles();
        for (const f of all) {
          if (f.path === path) return f;
        }
        return null;
      };
      window.__IFTO_openFile = async (filePath) => {
        try {
          const file = findFile(filePath);
          if (file) {
            const leaf = this.app.workspace.getLeaf(true);
            await leaf.openFile(file);
            this.app.workspace.setActiveLeaf(leaf, false, true);
            setTimeout(() => {
              try {
                const view = leaf.view;
                if (view && view.editor && typeof view.editor.focus === "function") {
                  view.editor.focus();
                }
              } catch (e) {
              }
            }, 60);
          }
        } catch (e) {
          console.error("IFTO: open file error", e);
        }
      };
      window.__IFTO_moveFile = async (filePath, targetFolder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const fileName = filePath.split("/").pop() || "untitled";
          const newPath = (targetFolder.endsWith("/") ? targetFolder : targetFolder + "/") + fileName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice(`\u76EE\u6807\u6587\u4EF6\u5DF2\u5B58\u5728: ${fileName}`);
            return false;
          }
          const file = findFile(filePath);
          if (!file) return false;
          console.log(`[IFTO] moveFile: "${filePath}" -> "${newPath}"`);
          await this.app.vault.rename(file, newPath);
          new import_obsidian.Notice(`\u5DF2\u79FB\u52A8: ${fileName}`);
          return true;
        } catch (e) {
          console.error("IFTO: move file error", e);
          new import_obsidian.Notice(`\u79FB\u52A8\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_listFolderContents = async (folder) => {
        try {
          const result = await this.app.vault.adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const items = [];
          (result.folders || []).forEach((f) => {
            if (f.startsWith(prefix) && !f.substring(prefix.length).includes("/")) {
              items.push({ name: f.substring(prefix.length), isFolder: true });
            }
          });
          (result.files || []).forEach((f) => {
            if (f.startsWith(prefix) && !f.substring(prefix.length).includes("/")) {
              items.push({ name: f.substring(prefix.length), isFolder: false });
            }
          });
          return items;
        } catch (e) {
          console.error("IFTO: list folder error", e);
          return [];
        }
      };
      window.__IFTO_getFilesDetail = async (folder, start, count) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return { files: [], total: 0 };
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length)).sort().reverse();
          const pageFiles = files.slice(start, start + count);
          const details = [];
          for (const f of pageFiles) {
            try {
              const fp = folder + "/" + f;
              const stat = await adapter.stat(fp);
              const content = await adapter.read(fp);
              const tags = [];
              const fm = content.match(/^---\n([\s\S]*?)\n---/);
              if (fm) {
                const fmLines = fm[1].split(/\r?\n/);
                for (let li = 0; li < fmLines.length; li++) {
                  const lineMatch = fmLines[li].match(/^tags\s*:\s*(.*)$/);
                  if (!lineMatch) continue;
                  const rest = lineMatch[1].trim();
                  const inlineArr = rest.match(/^\[([^\]]*)\]$/);
                  if (inlineArr) {
                    tags.push(...inlineArr[1].split(/[,，]/).map((t) => t.trim().replace(/^['"]|['"]$/g, "")).filter((t) => t));
                  } else if (rest) {
                    tags.push(rest.replace(/^['"]|['"]$/g, ""));
                  } else {
                    for (let lj = li + 1; lj < fmLines.length; lj++) {
                      const item = fmLines[lj].match(/^\s+-\s+(.+)$/);
                      if (!item) break;
                      const v = item[1].trim().replace(/^['"]|['"]$/g, "");
                      if (v) tags.push(v);
                    }
                  }
                  break;
                }
              }
              details.push({ name: f, ctime: stat.ctime, tags });
            } catch (e) {
              details.push({ name: f, ctime: null, tags: [] });
            }
          }
          return { files: details, total: files.length };
        } catch (e) {
          console.error("IFTO: getFilesDetail error", e);
          return { files: [], total: 0 };
        }
      };
      window.__IFTO_createFolder = async (folderPath) => {
        try {
          if (!await this.app.vault.adapter.exists(folderPath)) {
            await this.app.vault.createFolder(folderPath);
            return true;
          }
          return false;
        } catch (e) {
          console.error("IFTO: create folder error", e);
          return false;
        }
      };
      window.__IFTO_createFile = async (folder, fileName, content) => {
        try {
          const fullPath = (folder.endsWith("/") ? folder : folder + "/") + fileName;
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) await this.app.vault.createFolder(folder);
          await this.app.vault.create(fullPath, content || "");
          return true;
        } catch (e) {
          console.error("IFTO: create file error", e);
          new import_obsidian.Notice(`\u521B\u5EFA\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_readFile = async (filePath) => {
        try {
          return await this.app.vault.adapter.read(filePath);
        } catch (e) {
          try {
            return await this.app.vault.adapter.read(filePath + ".md");
          } catch (e2) {
            console.error("IFTO: read file error", e, e2);
            return "";
          }
        }
      };
      const _bufToDataUrl = (path, buf) => {
        const ext = (path.split("?")[0].split(".").pop() || "png").toLowerCase();
        const bytes = new Uint8Array(buf);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", bmp: "image/bmp", svg: "image/svg+xml" };
        return `data:${mime[ext] || "image/png"};base64,${btoa(binary)}`;
      };
      window.__IFTO_resolveImageUrl = async (path) => {
        if (!path) return "";
        try {
          if (path.startsWith("http://") || path.startsWith("https://")) {
            try {
              const resp = await (0, import_obsidian.requestUrl)({ url: path });
              if (resp && resp.arrayBuffer) {
                return _bufToDataUrl(path, resp.arrayBuffer);
              }
            } catch (e) {
              console.warn("IFTO: requestUrl failed, trying https fallback", e);
            }
            try {
              const mod = path.startsWith("https") ? require("https") : require("http");
              const buf = await new Promise((resolve, reject) => {
                mod.get(path, (res) => {
                  const chunks = [];
                  res.on("data", (c) => chunks.push(c));
                  res.on("end", () => resolve(Buffer.concat(chunks)));
                  res.on("error", reject);
                }).on("error", reject);
              });
              return _bufToDataUrl(path, buf);
            } catch (e2) {
              console.error("IFTO: https fallback also failed", e2);
            }
            return "";
          }
          const file = findFile(path);
          if (!file) return "";
          const arrayBuffer = await this.app.vault.readBinary(file);
          return _bufToDataUrl(path, arrayBuffer);
        } catch (e) {
          console.error("IFTO: resolve image url error", e);
        }
        return "";
      };
      window.__IFTO_fetchWeatherUrl = async (url) => {
        try {
          const resp = await (0, import_obsidian.requestUrl)({
            url,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
          });
          if (resp.status !== 200) {
            return `__IFTO_ERROR__: HTTP ${resp.status}`;
          }
          return resp.text || "";
        } catch (e) {
          console.error("IFTO: fetchWeatherUrl error", e);
          return `__IFTO_ERROR__: ${e.message || "Unknown error"}`;
        }
      };
      window.__IFTO_renameFile = async (filePath, newName) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const dir = filePath.substring(0, filePath.lastIndexOf("/") + 1);
          const newPath = dir + newName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5DF2\u5B58\u5728");
            return false;
          }
          const file = findFile(filePath);
          if (!file) return false;
          console.log(`[IFTO] renameFile: "${filePath}" -> "${newPath}"`);
          await this.app.vault.rename(file, newPath);
          return true;
        } catch (e) {
          console.error("IFTO: rename file error", e);
          new import_obsidian.Notice(`\u91CD\u547D\u540D\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_renameFolder = async (folderPath, newName) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return false;
          const parent = folderPath.substring(0, folderPath.lastIndexOf("/") + 1);
          const newPath = parent + newName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5939\u5DF2\u5B58\u5728");
            return false;
          }
          await adapter.rename(folderPath, newPath);
          return true;
        } catch (e) {
          console.error("IFTO: rename folder error", e);
          new import_obsidian.Notice(`\u91CD\u547D\u540D\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_moveFolder = async (srcPath, targetFolder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(srcPath)) return false;
          const folderName = srcPath.split("/").pop();
          const newPath = (targetFolder.endsWith("/") ? targetFolder : targetFolder + "/") + folderName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5939\u5DF2\u5B58\u5728");
            return false;
          }
          await adapter.rename(srcPath, newPath);
          new import_obsidian.Notice(`\u5DF2\u79FB\u52A8\u6587\u4EF6\u5939: ${folderName}`);
          return true;
        } catch (e) {
          console.error("IFTO: move folder error", e);
          new import_obsidian.Notice(`\u79FB\u52A8\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_moveFolderByFiles = async (srcPath, destParent) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(srcPath)) return false;
          const folderName = srcPath.split("/").pop();
          const targetPath = (destParent.endsWith("/") ? destParent : destParent + "/") + folderName;
          if (await adapter.exists(targetPath)) {
            new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5939\u5DF2\u5B58\u5728");
            return false;
          }
          await this.app.vault.createFolder(targetPath);
          const moveRec = async (from, to) => {
            const contents = await adapter.list(from);
            for (const f of contents.files || []) {
              const fileName = f.split("/").pop();
              const file = findFile(f);
              if (file) await this.app.vault.rename(file, to + "/" + fileName);
            }
            for (const sub of contents.folders || []) {
              const subName = sub.split("/").pop();
              const newSub = to + "/" + subName;
              await this.app.vault.createFolder(newSub);
              await moveRec(sub, newSub);
            }
          };
          await moveRec(srcPath, targetPath);
          const delRec = async (p) => {
            const c = await adapter.list(p);
            for (const f of c.files || []) await adapter.remove(f);
            for (const d of c.folders || []) await delRec(d);
            await adapter.rmdir(p);
          };
          await delRec(srcPath);
          new import_obsidian.Notice(`\u5DF2\u79FB\u52A8\u6587\u4EF6\u5939: ${folderName}`);
          return true;
        } catch (e) {
          console.error("IFTO: moveFolderByFiles error", e);
          new import_obsidian.Notice(`\u6587\u4EF6\u5939\u79FB\u52A8\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_deleteFile = async (filePath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const file = findFile(filePath);
          if (!file) return false;
          console.log(`[IFTO] deleteFile: "${filePath}"`);
          await this.app.vault.delete(file);
          return true;
        } catch (e) {
          console.error("IFTO: delete file error", e);
          new import_obsidian.Notice(`\u5220\u9664\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_deleteFolder = async (folderPath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return false;
          const delRec = async (p) => {
            const c = await adapter.list(p);
            for (const f of c.files || []) await adapter.remove(f);
            for (const d of c.folders || []) await delRec(d);
            await adapter.rmdir(p);
          };
          await delRec(folderPath);
          console.log(`[IFTO] deleteFolder: "${folderPath}"`);
          new import_obsidian.Notice("\u5DF2\u5220\u9664\u9879\u76EE\u6587\u4EF6\u5939");
          return true;
        } catch (e) {
          console.error("IFTO: delete folder error", e);
          new import_obsidian.Notice(`\u5220\u9664\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_getFilesWithMeta = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length));
          const out = [];
          for (const f of files) {
            try {
              const fp = folder + "/" + f;
              const content = await adapter.read(fp);
              let due = "";
              const fm = content.match(/^---\n([\s\S]*?)\n---/);
              if (fm) {
                const dm = fm[1].match(/due:\s*(.+)/) || fm[1].match(/deadline:\s*(.+)/);
                if (dm) due = dm[1].trim();
              }
              out.push({ name: f, due });
            } catch (e) {
              out.push({ name: f, due: "" });
            }
          }
          return out;
        } catch (e) {
          console.error("IFTO: getFilesWithMeta error", e);
          return [];
        }
      };
      window.__IFTO_getFilesCheckboxState = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/") && f.toLowerCase().endsWith(".md")).map((f) => f.substring(prefix.length));
          const out = [];
          for (const f of files) {
            let checked = false;
            try {
              const fp = folder + "/" + f;
              const content = await adapter.read(fp);
              const m = content.match(/^\s*[-*+]\s+\[( |x|X)\]/m);
              if (m) checked = m[1].toLowerCase() === "x";
            } catch (e) {
            }
            out.push({ name: f, checked });
          }
          return out;
        } catch (e) {
          console.error("IFTO: getFilesCheckboxState error", e);
          return [];
        }
      };
      window.__IFTO_setCheckboxState = async (filePath, checked) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          let content = await adapter.read(filePath);
          const want = checked ? "x" : " ";
          const re = /^(\s*[-*+]\s+)\[( |x|X)\]/m;
          if (re.test(content)) {
            content = content.replace(re, (_full, prefix) => prefix + "[" + want + "]");
          } else {
            content = "- [" + want + "] " + (checked ? "" : "") + "\n" + content.replace(/^\n+/, "");
          }
          await adapter.write(filePath, content);
          return true;
        } catch (e) {
          console.error("IFTO: setCheckboxState error", e);
          return false;
        }
      };
      window.__IFTO_createReadingNote = async () => {
        const folder = this.plugin.settings.bookFolder || "400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/421-\u4E66\u7C4D";
        const adapter = this.app.vault.adapter;
        const vault = this.app.vault;
        const tpl = this.plugin.settings.readingTemplate;
        let content = "";
        const now = /* @__PURE__ */ new Date();
        const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
        if (tpl) {
          try {
            content = await adapter.read(tpl);
          } catch (e) {
            try {
              content = await adapter.read(tpl + ".md");
            } catch (e2) {
              console.error("IFTO: reading template error", e, e2);
            }
          }
          if (content) {
            content = this.processTemplateVars(content, ts);
          }
        }
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (fmMatch) {
          if (fmMatch[1].match(/^status:/m)) {
            content = content.replace(/^status:.*$/m, "status: \u5728\u8BFB");
          } else {
            content = content.replace(/^---\n/, "---\nstatus: \u5728\u8BFB\n");
          }
        } else {
          content = "---\nstatus: \u5728\u8BFB\n---\n" + content;
        }
        const fileName = `${ts}.md`;
        const fullPath = `${folder}/${fileName}`;
        try {
          if (!await adapter.exists(folder)) await vault.createFolder(folder);
          await vault.create(fullPath, content);
          return fullPath;
        } catch (e) {
          console.error("IFTO: create reading note error", e);
          new import_obsidian.Notice(`\u521B\u5EFA\u5931\u8D25: ${e.message}`);
          return "";
        }
      };
      window.__IFTO_getFilesFrontmatter = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length));
          const out = [];
          for (const f of files) {
            try {
              const fp = folder + "/" + f;
              const content = await adapter.read(fp);
              const fm = {};
              const m = content.match(/^---\n([\s\S]*?)\n---/);
              if (m) {
                let _ck = null;
                m[1].split("\n").forEach((line) => {
                  const li = line.match(/^\s+[-]\s+(.+)/);
                  if (li && _ck && !(_ck in fm)) {
                    fm[_ck] = li[1].trim().replace(/^['"]|['"]$/g, "");
                    return;
                  }
                  const kv = line.match(/^\s*([^:]+?)\s*:\s*(.*)/);
                  if (kv) {
                    _ck = kv[1].trim();
                    const _v = kv[2].trim().replace(/^['"]|['"]$/g, "");
                    if (_v) fm[_ck] = _v;
                  }
                });
              }
              out.push({ name: f, fm });
            } catch (e) {
              out.push({ name: f, fm: {} });
            }
          }
          return out;
        } catch (e) {
          console.error("IFTO: getFilesFrontmatter error", e);
          return [];
        }
      };
      window.__IFTO_getFilesFrontmatterRecursive = async (folder) => {
        const recList = async (base, dir) => {
          try {
            const adapter = this.app.vault.adapter;
            const result = await adapter.list(dir);
            const out = [];
            for (const f of result.files || []) {
              if (!f.endsWith(".md")) continue;
              const content = await adapter.read(f);
              const fm = {};
              const m = content.match(/^---\n([\s\S]*?)\n---/);
              if (m) {
                m[1].split("\n").forEach((line) => {
                  const kv = line.match(/^\s*([^:]+?)\s*:\s*(.+)/);
                  if (kv) fm[kv[1].trim()] = kv[2].trim().replace(/^['"]|['"]$/g, "");
                });
              }
              if (!m) {
                const bqRegex = /> \*\*([^*]+)\*\*:\s*(.+)/g;
                let match;
                while ((match = bqRegex.exec(content)) !== null) {
                  const key = match[1].trim();
                  const val = match[2].trim().replace(/^['"]|['"]$/g, "");
                  if (key && val) fm[key] = val;
                }
              }
              out.push({ name: f.substring(base.length + 1), fm });
            }
            for (const sub of result.folders || []) {
              const subOut = await recList(base, sub);
              out.push(...subOut);
            }
            return out;
          } catch (e) {
            return [];
          }
        };
        try {
          if (!await this.app.vault.adapter.exists(folder)) return [];
          return await recList(folder, folder);
        } catch (e) {
          console.error("IFTO: getFilesFrontmatterRecursive error", e);
          return [];
        }
      };
      window.__IFTO_getDomainTree = async (folder) => {
        const stripPrefix = (name) => name.replace(/^\d+-/, "");
        const _pins = this.plugin.settings.pinnedAreas || [];
        const buildTree = async (dir) => {
          try {
            const adapter = this.app.vault.adapter;
            const result = await adapter.list(dir);
            const files = [];
            let totalTasks = 0, completedTasks = 0, maxMtime = 0, progSum = 0, progW = 0;
            for (const f of result.files || []) {
              if (!f.endsWith(".md")) continue;
              const fname = f.split("/").pop() || "";
              if (fname === "_INDEX-300-\u9886\u57DF.md") continue;
              const content = await adapter.read(f);
              const fm = {};
              const m = content.match(/^---\n([\s\S]*?)\n---/);
              if (m) {
                m[1].split("\n").forEach((line) => {
                  const kv = line.match(/^\s*([^:]+?)\s*:\s*(.+)/);
                  if (kv) fm[kv[1].trim()] = kv[2].trim().replace(/^['"]|['"]$/g, "");
                });
              }
              const taskMatches = content.match(/- \[( |x|\/)\]/g);
              const total = taskMatches ? taskMatches.length : 0;
              let done = 0, score = 0;
              if (taskMatches) {
                for (const t of taskMatches) {
                  if (t === "- [x]") {
                    done++;
                    score += 1;
                  } else if (t === "- [/]") {
                    score += 0.5;
                  }
                }
              }
              const status = fm["status"] || "";
              const weight = parseFloat(fm["weight"]) || 1;
              const progRaw = (fm["progress"] || "").trim();
              let progress = null;
              if (/^\d+(\.\d+)?$/.test(progRaw)) progress = Math.round(parseFloat(progRaw));
              else if (total > 0) progress = Math.round(score / total * 100);
              else if (status === "\u5DF2\u8FBE\u6210" || status === "\u5B8C\u6210" || status === "\u5DF2\u5B8C\u6210") progress = 100;
              else if (status === "\u672A\u5F00\u59CB") progress = 0;
              if (progress !== null) {
                progSum += progress * weight;
                progW += weight;
              }
              totalTasks += total;
              completedTasks += done;
              let _mt = 0;
              try {
                const _st = await adapter.stat(f);
                _mt = _st && _st.mtime ? _st.mtime : 0;
              } catch (e) {
              }
              if (_mt > maxMtime) maxMtime = _mt;
              files.push({
                name: fname,
                path: f,
                title: fm["title"] || fname.replace(".md", ""),
                description: fm["description"] || "",
                tags: fm["tags"] || "",
                status,
                progress,
                weight,
                totalTasks: total,
                completedTasks: done,
                pinned: _pins.indexOf(f) >= 0,
                mtime: _mt
              });
            }
            const subfolders = [];
            for (const sub of result.folders || []) {
              const subInfo = await buildTree(sub);
              if (subInfo) {
                totalTasks += subInfo.totalTasks;
                completedTasks += subInfo.completedTasks;
                if (subInfo.mtime && subInfo.mtime > maxMtime) maxMtime = subInfo.mtime;
                if (subInfo.progress !== null && subInfo.progress !== void 0) {
                  progSum += subInfo.progress;
                  progW += 1;
                }
                subfolders.push(subInfo);
              }
            }
            const dirName = dir.split("/").pop() || "";
            return {
              name: stripPrefix(dirName),
              path: dir,
              files,
              subfolders,
              fileCount: files.length,
              totalTasks,
              completedTasks,
              progress: progW > 0 ? Math.round(progSum / progW) : null,
              pinned: _pins.indexOf(dir) >= 0,
              mtime: maxMtime
            };
          } catch (e) {
            return null;
          }
        };
        try {
          if (!await this.app.vault.adapter.exists(folder)) return [];
          const result = await this.app.vault.adapter.list(folder);
          const branches = [];
          for (const sub of result.folders || []) {
            const info = await buildTree(sub);
            if (info) branches.push(info);
          }
          return branches;
        } catch (e) {
          console.error("IFTO: getDomainTree error", e);
          return [];
        }
      };
      window.__IFTO_refreshSettings = () => {
        window.__IFTO_SETTINGS = {
          ...window.__IFTO_SETTINGS,
          heroImageUrl: this.plugin.settings.heroImageUrl,
          heroImageFolder: this.plugin.settings.heroImageFolder,
          deepseekKey: this.plugin.settings.deepseekApiKey,
          minimaxKey: this.plugin.settings.minimaxApiKey,
          minimaxApiUrl: this.plugin.settings.minimaxApiUrl,
          widgetMinimaxEnabled: this.plugin.settings.widgetMinimaxEnabled,
          readingTemplate: this.plugin.settings.readingTemplate,
          collectionTemplate: this.plugin.settings.collectionTemplate,
          notePath: this.plugin.settings.notePath,
          noteTemplate: this.plugin.settings.noteTemplate,
          reviewDailyPath: this.plugin.settings.reviewDailyPath,
          reviewWeeklyPath: this.plugin.settings.reviewWeeklyPath,
          reviewMonthlyPath: this.plugin.settings.reviewMonthlyPath,
          reviewProjectPath: this.plugin.settings.reviewProjectPath,
          reviewDailyTemplate: this.plugin.settings.reviewDailyTemplate,
          reviewWeeklyTemplate: this.plugin.settings.reviewWeeklyTemplate,
          reviewMonthlyTemplate: this.plugin.settings.reviewMonthlyTemplate,
          reviewProjectTemplate: this.plugin.settings.reviewProjectTemplate,
          inboxFolder: this.plugin.settings.inboxFolder,
          quickLearnFolder: this.plugin.settings.quickLearnFolder,
          todoFolder: this.plugin.settings.todoFolder,
          activityFolder: this.plugin.settings.activityFolder,
          taskFolder: this.plugin.settings.taskFolder,
          projectBase: this.plugin.settings.projectBase,
          projectCols: this.plugin.settings.projectCols,
          bookFolder: this.plugin.settings.bookFolder,
          paperFolder: this.plugin.settings.paperFolder,
          resourceRoot: this.plugin.settings.resourceRoot,
          domainFolder: this.plugin.settings.domainFolder,
          projectTaskTemplate: this.plugin.settings.projectTaskTemplate,
          widgetOrder: this.plugin.settings.widgetOrder,
          widgetDeepseekEnabled: this.plugin.settings.widgetDeepseekEnabled,
          widgetCalendarEnabled: this.plugin.settings.widgetCalendarEnabled,
          widgetHabitsEnabled: this.plugin.settings.widgetHabitsEnabled,
          widgetWeeknotesEnabled: this.plugin.settings.widgetWeeknotesEnabled,
          widgetTodotodayEnabled: this.plugin.settings.widgetTodotodayEnabled,
          widgetWeeknotesPath: this.plugin.settings.widgetWeeknotesPath,
          widgetTodotodoPath: this.plugin.settings.widgetTodotodoPath,
          zoom: this.plugin.settings.zoom,
          bgColor: this.plugin.settings.bgColor,
          borderRadius: this.plugin.settings.borderRadius
        };
      };
      window.__IFTO_refreshWidgetDisplay = () => {
        window.__IFTO_refreshSettings();
        if (typeof window.renderWidget === "function") {
          window.renderWidget();
        }
      };
      window.__IFTO_updateFileFrontmatter = async (filePath, key, value) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          let content = await adapter.read(filePath);
          const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (fmMatch) {
            const fmLines = fmMatch[1].split("\n");
            const keyRegex = new RegExp("^\\s*" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*:\\s*.+", "m");
            if (keyRegex.test(fmMatch[1])) {
              content = content.replace(keyRegex, key + ": " + value);
            } else {
              content = content.replace(/^---\n/, "---\n" + key + ": " + value + "\n");
            }
          } else {
            content = "---\n" + key + ": " + value + "\n---\n" + content;
          }
          await adapter.write(filePath, content);
          return true;
        } catch (e) {
          console.error("IFTO: update frontmatter error", e);
          return false;
        }
      };
      window.__IFTO_getRandomImageFromFolder = async (folderPath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return "";
          const result = await adapter.list(folderPath);
          const prefix = folderPath.endsWith("/") ? folderPath : folderPath + "/";
          const imgExts = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"]);
          const images = (result.files || []).filter(
            (f) => f.startsWith(prefix) && imgExts.has(f.substring(f.lastIndexOf(".")))
          );
          if (images.length === 0) return "";
          const chosen = images[Math.floor(Math.random() * images.length)];
          const buf = await adapter.readBinary(chosen);
          const ext = (chosen.split(".").pop() || "png").toLowerCase();
          const m = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", bmp: "image/bmp", svg: "image/svg+xml" };
          const b = new Uint8Array(buf);
          let s = "";
          for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
          return "data:" + (m[ext] || "image/png") + ";base64," + btoa(s);
        } catch (e) {
          console.error("IFTO: getRandomImageFromFolder error", e);
          return "";
        }
      };
      window.__IFTO_readListOrder = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          const orderPath = (folder.endsWith("/") ? folder : folder + "/") + ".ifto_order.json";
          if (!await adapter.exists(orderPath)) return [];
          const raw = await adapter.read(orderPath);
          const arr = JSON.parse(raw);
          return Array.isArray(arr) ? arr : [];
        } catch (e) {
          return [];
        }
      };
      window.__IFTO_writeListOrder = async (folder, order) => {
        try {
          const adapter = this.app.vault.adapter;
          const orderPath = (folder.endsWith("/") ? folder : folder + "/") + ".ifto_order.json";
          await adapter.write(orderPath, JSON.stringify(order, null, 2));
          return true;
        } catch (e) {
          console.error("IFTO: writeListOrder error", e);
          return false;
        }
      };
      window.__IFTO_processTemplate = async (content) => {
        try {
          const now = /* @__PURE__ */ new Date();
          const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
          return this.processTemplateVars(content || "", ts);
        } catch (e) {
          console.error("IFTO: processTemplate error", e);
          return content || "";
        }
      };
      window.__IFTO_readFileAsDataURL = async (filePath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) {
            console.warn("IFTO: file not found", filePath);
            return "";
          }
          const buf = await adapter.readBinary(filePath);
          const ext = (filePath.split(".").pop() || "png").toLowerCase();
          const m = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", bmp: "image/bmp", svg: "image/svg+xml" };
          const b = new Uint8Array(buf);
          let s = "";
          for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
          return "data:" + (m[ext] || "image/png") + ";base64," + btoa(s);
        } catch (e) {
          console.error("IFTO: readFileAsDataURL error", e);
          return "";
        }
      };
      window.__IFTO_findFolderByName = async (name, searchRoot) => {
        try {
          const adapter = this.app.vault.adapter;
          const searchDirs = searchRoot ? [searchRoot] : [
            this.plugin.settings.archivePath,
            this.plugin.settings.projectFilesFolder,
            this.plugin.settings.projectBase,
            this.plugin.settings.inboxRoot,
            this.plugin.settings.workfileRoot,
            this.plugin.settings.resourceRoot
          ].filter(Boolean);
          for (const dir of searchDirs) {
            if (!await adapter.exists(dir)) continue;
            const result = await adapter.list(dir);
            for (const folder of result.folders || []) {
              const folderName = folder.split("/").pop();
              if (folderName === name) return folder;
            }
          }
          return "";
        } catch (e) {
          console.error("IFTO: findFolderByName error", e);
          return "";
        }
      };
      window.__IFTO_findItemByName = async (name) => {
        try {
          const adapter = this.app.vault.adapter;
          const searchRoots = [
            this.plugin.settings.archiveRoot,
            this.plugin.settings.projectFilesFolder,
            this.plugin.settings.projectBase,
            this.plugin.settings.workfileRoot,
            this.plugin.settings.inboxRoot,
            this.plugin.settings.resourceRoot
          ].filter(Boolean);
          for (const root of searchRoots) {
            if (!await adapter.exists(root)) continue;
            const result = await _searchItem(adapter, root, name, 0, 3);
            if (result) return result;
          }
          return null;
        } catch (e) {
          console.error("IFTO: findItemByName error", e);
          return null;
        }
      };
      const _searchItem = async (adapter, dir, name, depth, maxDepth) => {
        if (depth > maxDepth) return null;
        try {
          const result = await adapter.list(dir);
          for (const folder of result.folders || []) {
            const folderName = folder.split("/").pop();
            if (folderName === name) return { path: folder, isFolder: true };
            const sub = await _searchItem(adapter, folder, name, depth + 1, maxDepth);
            if (sub) return sub;
          }
          for (const file of result.files || []) {
            if (!file.endsWith(".md")) continue;
            const fileName = file.split("/").pop();
            if (fileName === name) return { path: file, isFolder: false };
          }
          return null;
        } catch (e) {
          return null;
        }
      };
      document.body.appendChild(scriptEl);
      const tryRefresh = (fn, ...args) => {
        try {
          if (typeof window[fn] === "function") window[fn](...args);
        } catch (e) {
        }
      };
      const iftoDomainFolder = () => this.plugin.settings.domainFolder || "300-\u9886\u57DFAREA";
      let __iftoDomainTimer = null;
      const refreshDomain = () => {
        if (__iftoDomainTimer) clearTimeout(__iftoDomainTimer);
        __iftoDomainTimer = setTimeout(() => {
          __iftoDomainTimer = null;
          tryRefresh("__IFTO_refreshDomainTree");
        }, 300);
      };
      this.registerEvent(this.app.vault.on("rename", (file, oldPath) => {
        const pBase = this.plugin.settings.projectBase;
        const actFolder = this.plugin.settings.activityFolder;
        const todoFolder = this.plugin.settings.todoFolder;
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const newPath = file.path;
        if (iftoDomainFolder() && (newPath && newPath.startsWith(iftoDomainFolder()) || oldPath && oldPath.startsWith(iftoDomainFolder()))) refreshDomain();
        if (pBase && (newPath.startsWith(pBase) || oldPath && oldPath.startsWith(pBase))) tryRefresh("renderProject");
        if (actFolder && (newPath.startsWith(actFolder) || oldPath && oldPath.startsWith(actFolder))) tryRefresh("renderActivity");
        if (todoFolder && (newPath.startsWith(todoFolder) || oldPath && oldPath.startsWith(todoFolder))) tryRefresh("renderTodo");
        if (inboxFolder && (newPath.startsWith(inboxFolder) || oldPath && oldPath.startsWith(inboxFolder))) tryRefresh("renderInbox");
        if (bookFolder && (newPath.startsWith(bookFolder) || oldPath && oldPath.startsWith(bookFolder))) tryRefresh("renderNote");
        if (paperFolder && (newPath.startsWith(paperFolder) || oldPath && oldPath.startsWith(paperFolder))) tryRefresh("renderNote");
      }));
      this.registerEvent(this.app.vault.on("create", (file) => {
        const actFolder = this.plugin.settings.activityFolder;
        const pBase = this.plugin.settings.projectBase;
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const newPath = file.path;
        if (iftoDomainFolder() && newPath.startsWith(iftoDomainFolder())) refreshDomain();
        if (pBase && newPath.startsWith(pBase)) tryRefresh("renderProject");
        if (actFolder && newPath.startsWith(actFolder)) tryRefresh("renderActivity");
        if (inboxFolder && newPath.startsWith(inboxFolder)) tryRefresh("renderInbox");
        if (bookFolder && newPath.startsWith(bookFolder)) tryRefresh("renderNote");
        if (paperFolder && newPath.startsWith(paperFolder)) tryRefresh("renderNote");
      }));
      this.registerEvent(this.app.vault.on("delete", (file) => {
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const pBase = this.plugin.settings.projectBase;
        if (iftoDomainFolder() && file.path.startsWith(iftoDomainFolder())) refreshDomain();
        if (inboxFolder && file.path.startsWith(inboxFolder)) tryRefresh("renderInbox");
        if (bookFolder && file.path.startsWith(bookFolder)) tryRefresh("renderNote");
        if (paperFolder && file.path.startsWith(paperFolder)) tryRefresh("renderNote");
        if (pBase && file.path.startsWith(pBase)) tryRefresh("renderProject");
      }));
      let __iftoProjectModifyTimer = null;
      this.registerEvent(this.app.vault.on("modify", (file) => {
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const pBase = this.plugin.settings.projectBase;
        if (iftoDomainFolder() && file.path.startsWith(iftoDomainFolder())) refreshDomain();
        if (bookFolder && file.path.startsWith(bookFolder)) tryRefresh("renderNote");
        if (paperFolder && file.path.startsWith(paperFolder)) tryRefresh("renderNote");
        if (pBase && file.path.startsWith(pBase)) {
          if (__iftoProjectModifyTimer) clearTimeout(__iftoProjectModifyTimer);
          __iftoProjectModifyTimer = setTimeout(() => {
            __iftoProjectModifyTimer = null;
            tryRefresh("renderProject");
          }, 600);
        }
      }));
    } catch (e) {
      console.error("IFTO: Failed to load home.html", e);
      this.containerEl.innerHTML = `
        <div style="padding:40px;text-align:center;color:var(--text-muted);">
          <h2>IFTO-HOME \u9996\u9875</h2>
          <p>\u52A0\u8F7D\u9875\u9762\u5931\u8D25: ${e.message}</p>
          <p style="font-size:12px;margin-top:20px;">\u8BF7\u786E\u8BA4 home.html \u6587\u4EF6\u5B58\u5728\u4E8E\u63D2\u4EF6\u76EE\u5F55\u4E2D</p>
        </div>
      `;
    }
  }
  async onClose() {
    const cleanup = this.containerEl.__IFTO_mobileCleanup;
    if (typeof cleanup === "function") cleanup();
  }
  async createCollectionNote() {
    const folder = this.plugin.settings.inboxFolder || "000-\u4FE1\u7BB1INBOX/010-\u6536\u96C6";
    const templatePath = this.plugin.settings.collectionTemplate;
    let content = "";
    const now = /* @__PURE__ */ new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
    if (templatePath) {
      try {
        content = await this.app.vault.adapter.read(templatePath);
      } catch (e) {
        try {
          content = await this.app.vault.adapter.read(templatePath + ".md");
        } catch (e2) {
          console.error("IFTO: template read failed", e, e2);
          new import_obsidian.Notice(`\u6A21\u677F\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84: ${templatePath}`);
        }
      }
      if (content) {
        content = this.processTemplateVars(content, ts);
      }
    }
    const fileName = `${ts}.md`;
    const fullPath = `${folder}/${fileName}`;
    try {
      const exists = await this.app.vault.adapter.exists(folder);
      if (!exists) await this.app.vault.createFolder(folder);
      const file = await this.app.vault.create(fullPath, content);
      new import_obsidian.Notice(`\u5DF2\u521B\u5EFA: ${fileName}`);
      await this.app.workspace.getLeaf(true).openFile(file);
    } catch (e) {
      new import_obsidian.Notice(`\u521B\u5EFA\u5931\u8D25: ${e.message}`);
    }
  }
  processTemplateVars(text, fileTitle) {
    const now = /* @__PURE__ */ new Date();
    const y = now.getFullYear();
    const M = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    text = text.replace(/\{\{date:([^}]+)\}\}/g, (_, fmt) => {
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2, "0")).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2, "0")).replace(/D/g, String(d));
    });
    text = text.replace(/\{\{time:([^}]+)\}\}/g, (_, fmt) => {
      return fmt.replace(/HH/g, String(h).padStart(2, "0")).replace(/H/g, String(h)).replace(/hh/g, String(h % 12 || 12).padStart(2, "0")).replace(/h/g, String(h % 12 || 12)).replace(/mm/g, String(m).padStart(2, "0")).replace(/ss/g, String(s).padStart(2, "0")).replace(/A/g, h < 12 ? "AM" : "PM");
    });
    text = text.replace(/\{\{date\}\}/g, `${y}-${String(M).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    text = text.replace(/\{\{time\}\}/g, `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    text = text.replace(/<%\s*tp\.file\.creation_date\s*\(\s*(?:"([^"]*)"|'([^']*)')?\s*\)\s*%>/g, (_, fmt1, fmt2) => {
      const fmt = (fmt1 || fmt2 || "YYYY-MM-DD").replace(/HH/, String(h).padStart(2, "0")).replace(/mm/, String(m).padStart(2, "0")).replace(/ss/, String(s).padStart(2, "0"));
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2, "0")).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2, "0")).replace(/D/g, String(d));
    });
    text = text.replace(/<%\s*tp\.date\.now\s*\(\s*(?:"([^"]*)"|'([^']*)')?\s*\)\s*%>/g, (_, fmt1, fmt2) => {
      const fmt = (fmt1 || fmt2 || "YYYY-MM-DD").replace(/HH/, String(h).padStart(2, "0")).replace(/mm/, String(m).padStart(2, "0")).replace(/ss/, String(s).padStart(2, "0"));
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2, "0")).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2, "0")).replace(/D/g, String(d));
    });
    text = text.replace(/<%\s*tp\.date\.now\s*\(\s*(?:"([^"]*)"|'([^']*)')\s*,\s*(-?\d+)\s*\)\s*%>/g, (_, fmt1, fmt2, offset) => {
      const fmt = (fmt1 || fmt2 || "YYYY-MM-DD").replace(/HH/, String(h).padStart(2, "0")).replace(/mm/, String(m).padStart(2, "0")).replace(/ss/, String(s).padStart(2, "0"));
      const od = new Date(now.getTime() + parseInt(offset) * 864e5);
      const oy = od.getFullYear(), oM = od.getMonth() + 1, oDate = od.getDate();
      return fmt.replace(/YYYY/g, String(oy)).replace(/YY/g, String(oy).slice(-2)).replace(/MM/g, String(oM).padStart(2, "0")).replace(/M/g, String(oM)).replace(/DD/g, String(oDate).padStart(2, "0")).replace(/D/g, String(oDate));
    });
    text = text.replace(/<%\s*tp\.file\.title\s*\(\s*\)\s*%>/g, fileTitle || "");
    text = text.replace(/<%\s*tp\.file\.folder\s*\(\s*\)\s*%>/g, "");
    return text;
  }
};
var IFTOPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings");
  }
  applyAppearance(container) {
    var _a, _b, _c;
    const target = container || ((_c = (_b = (_a = this.app.workspace.getLeavesOfType(IFTO_VIEW_TYPE)) == null ? void 0 : _a[0]) == null ? void 0 : _b.view) == null ? void 0 : _c.containerEl);
    if (!target) return;
    target.style.zoom = target.classList.contains("ifto-phone") ? "1" : String(this.settings.zoom);
    if (this.settings.bgColor) {
      target.style.background = this.settings.bgColor;
      target.style.setProperty("--bg", this.settings.bgColor);
      target.style.setProperty("--ifto-bg", this.settings.bgColor);
    } else {
      target.style.background = "";
      target.style.removeProperty("--bg");
      target.style.removeProperty("--ifto-bg");
    }
  }
  async onload() {
    await this.loadSettings();
    this.registerView(IFTO_VIEW_TYPE, (leaf) => new IFTOView(leaf, this));
    this.addRibbonIcon("blocks", "IFTO-HOME \u9996\u9875", () => {
      this.activateView();
    });
    this.addCommand({
      id: "open-ifto-homepage",
      name: "\u6253\u5F00 IFTO-HOME \u9996\u9875",
      callback: () => this.activateView()
    });
    this.addSettingTab(new IFTOSettingsTab(this.app, this));
    window.__IFTO_applyRadius = (radius) => {
      const v = typeof radius === "number" && radius >= 0 ? radius : 8;
      document.documentElement.style.setProperty("--ifto-radius", v + "px");
    };
    window.__IFTO_applyRadius(this.settings.borderRadius);
    this.registerEvent(this.app.workspace.on("css-change", () => {
      this.applyAppearance();
    }));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    const known = DEFAULT_SETTINGS.widgetOrder.split(",").map((s) => s.trim()).filter((s) => s);
    const cur = (this.settings.widgetOrder || "").split(",").map((s) => s.trim()).filter((s) => s);
    let changed = false;
    known.forEach((id) => {
      if (cur.indexOf(id) === -1) {
        cur.push(id);
        changed = true;
      }
    });
    if (changed) {
      this.settings.widgetOrder = cur.join(",");
      await this.saveSettings();
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
    try {
      if (typeof window.__IFTO_refreshSettings === "function") {
        window.__IFTO_refreshSettings();
      }
    } catch (e) {
    }
  }
  async activateView() {
    const { workspace } = this.app;
    const existing = workspace.getLeavesOfType(IFTO_VIEW_TYPE);
    if (existing.length > 0) {
      workspace.revealLeaf(existing[0]);
      return;
    }
    const leaf = workspace.getLeaf(true);
    await leaf.setViewState({ type: IFTO_VIEW_TYPE, active: true });
    workspace.revealLeaf(leaf);
  }
};
var IFTOSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    __publicField(this, "plugin");
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("ifto-settings-tab");
    containerEl.style.padding = "0";
    containerEl.style.boxSizing = "border-box";
    const settingsRoot = containerEl.createDiv({ cls: "ifto-settings-root" });
    settingsRoot.style.padding = "24px clamp(24px, 5vw, 48px)";
    settingsRoot.style.boxSizing = "border-box";
    settingsRoot.style.maxWidth = "960px";
    settingsRoot.style.margin = "0 auto";
    settingsRoot.style.width = "100%";
    settingsRoot.createEl("h2", { text: "IFTO-HOME \u8BBE\u7F6E" });
    new import_obsidian.Setting(settingsRoot).setName("\u9996\u9875\u56FE\u7247\u6587\u4EF6\u5939\u8DEF\u5F84").setDesc("\u8BBE\u7F6E\u9996\u9875\u9876\u90E8\u5927\u56FE\u968F\u673A\u663E\u793A\u7684\u56FE\u7247\u6587\u4EF6\u5939\u8DEF\u5F84\uFF0C\u6BCF\u6B21\u52A0\u8F7D\u968F\u673A\u9009\u53D6\u4E00\u5F20\u3002\u7559\u7A7A\u5219\u4F7F\u7528\u4E0B\u65B9\u5355\u5F20\u56FE\u7247 URL").addText((text) => text.setPlaceholder("900-\u6570\u636E\u5E93/930-\u56FE\u7247\u8D44\u6E90").setValue(this.plugin.settings.heroImageFolder).onChange(async (value) => {
      this.plugin.settings.heroImageFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9996\u9875\u5355\u5F20\u56FE\u7247 URL\uFF08\u5907\u9009\uFF09").setDesc("\u5F53\u4E0A\u65B9\u6587\u4EF6\u5939\u65E0\u56FE\u7247\u6216\u672A\u8BBE\u7F6E\u65F6\uFF0C\u4F7F\u7528\u6B64\u5355\u5F20\u56FE\u7247 URL\u3002\u82E5\u4E8C\u8005\u5747\u672A\u8BBE\u7F6E\u5219\u663E\u793A\u9ED8\u8BA4\u80CC\u666F").addText((text) => text.setPlaceholder("https://example.com/hero.jpg").setValue(this.plugin.settings.heroImageUrl).onChange(async (value) => {
      this.plugin.settings.heroImageUrl = value.trim();
      await this.plugin.saveSettings();
    }));
    settingsRoot.createEl("h3", { text: "\u5916\u89C2" });
    new import_obsidian.Setting(settingsRoot).setName("\u7F29\u653E\u6BD4\u4F8B").setDesc("\u8C03\u6574\u9996\u9875\u6574\u4F53\u7F29\u653E\uFF08Mac \u4E0A\u663E\u793A\u8FC7\u5927\u53EF\u8C03\u5C0F\uFF0C\u5982 0.85\uFF1BWindows \u663E\u793A\u6B63\u5E38\u4FDD\u6301 1.0\uFF09").addSlider((sl) => sl.setLimits(0.5, 1.5, 0.05).setValue(this.plugin.settings.zoom).setDynamicTooltip().onChange(async (value) => {
      this.plugin.settings.zoom = value;
      await this.plugin.saveSettings();
      this.plugin.applyAppearance();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u80CC\u666F\u989C\u8272").setDesc("\u81EA\u5B9A\u4E49\u9996\u9875\u80CC\u666F\u8272\uFF0C\u8F93\u5165 # \u516D\u8FDB\u5236\u989C\u8272\u4EE3\u7801\uFF08\u5982 #fbfbfb\uFF09\uFF0C\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4").addText((text) => text.setPlaceholder("#fbfbfb").setValue(this.plugin.settings.bgColor).onChange(async (value) => {
      var v = value.trim();
      this.plugin.settings.bgColor = v;
      await this.plugin.saveSettings();
      this.plugin.applyAppearance();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u5706\u89D2\u5927\u5C0F").setDesc("\u5168\u5C40\u8C03\u6574\u77E9\u5F62\u5706\u89D2(0=\u786C\u8FB9, 16=\u5F88\u5706);\u4FDD\u5B58\u540E\u7ACB\u5373\u751F\u6548").addSlider((slider) => slider.setLimits(0, 16, 1).setValue(this.plugin.settings.borderRadius).setDynamicTooltip().onChange(async (value) => {
      this.plugin.settings.borderRadius = value;
      await this.plugin.saveSettings();
      if (typeof window.__IFTO_applyRadius === "function") {
        window.__IFTO_applyRadius(value);
      }
    }));
    settingsRoot.createEl("h3", { text: "\u7EC4\u4EF6\u7BA1\u7406" });
    new import_obsidian.Setting(settingsRoot).setName("\u7EC4\u4EF6\u987A\u5E8F\u4E0E\u5F00\u5173").setDesc("\u542F\u7528/\u7981\u7528\u7EC4\u4EF6\uFF0C\u4F7F\u7528 \u25B2 \u25BC \u8C03\u6574\u663E\u793A\u987A\u5E8F");
    const widgetDefs = [
      { id: "deepseek", label: "DeepSeek Token" },
      { id: "minimax", label: "MiniMax Token" },
      { id: "calendar", label: "\u65E5\u5386" },
      { id: "habits", label: "\u4E60\u60EF\u6253\u5361" },
      { id: "weeknotes", label: "\u672C\u5468\u7B14\u8BB0" },
      { id: "todotoday", label: "\u4ECA\u65E5\u5F85\u529E" }
    ];
    const widgetSelf = this;
    widgetDefs.forEach((def) => {
      const curOrder = widgetSelf.plugin.settings.widgetOrder.split(",").map((s) => s.trim()).filter((s) => s);
      const pos = curOrder.indexOf(def.id);
      const ek = "widget" + def.id.charAt(0).toUpperCase() + def.id.slice(1) + "Enabled";
      const st = new import_obsidian.Setting(settingsRoot).setName(pos + 1 + ". " + def.label).addToggle((tg) => tg.setValue(widgetSelf.plugin.settings[ek]).onChange(async (v) => {
        widgetSelf.plugin.settings[ek] = v;
        await widgetSelf.plugin.saveSettings();
        if (typeof window.__IFTO_refreshWidgetDisplay === "function") window.__IFTO_refreshWidgetDisplay();
      }));
      if (pos > 0) {
        (function(wid) {
          st.addButton((btn) => {
            btn.setButtonText("\u25B2");
            btn.onClick(async () => {
              try {
                const arr = widgetSelf.plugin.settings.widgetOrder.split(",").map((s) => s.trim()).filter((s) => s);
                const i = arr.indexOf(wid);
                if (i > 0) {
                  const t = arr[i - 1];
                  arr[i - 1] = arr[i];
                  arr[i] = t;
                  widgetSelf.plugin.settings.widgetOrder = arr.join(",");
                  await widgetSelf.plugin.saveSettings();
                  widgetSelf.display();
                  if (typeof window.__IFTO_refreshWidgetDisplay === "function") window.__IFTO_refreshWidgetDisplay();
                }
              } catch (e) {
                console.error("IFTO up err", e);
              }
            });
            return btn;
          });
        })(def.id);
      }
      if (pos >= 0 && pos < curOrder.length - 1) {
        (function(wid) {
          st.addButton((btn) => {
            btn.setButtonText("\u25BC");
            btn.onClick(async () => {
              try {
                const arr = widgetSelf.plugin.settings.widgetOrder.split(",").map((s) => s.trim()).filter((s) => s);
                const i = arr.indexOf(wid);
                if (i >= 0 && i < arr.length - 1) {
                  const t = arr[i + 1];
                  arr[i + 1] = arr[i];
                  arr[i] = t;
                  widgetSelf.plugin.settings.widgetOrder = arr.join(",");
                  await widgetSelf.plugin.saveSettings();
                  widgetSelf.display();
                  if (typeof window.__IFTO_refreshWidgetDisplay === "function") window.__IFTO_refreshWidgetDisplay();
                }
              } catch (e) {
                console.error("IFTO down err", e);
              }
            });
            return btn;
          });
        })(def.id);
      }
      if (def.id === "deepseek") {
        new import_obsidian.Setting(settingsRoot).setName("DeepSeek API Key").setDesc("\u7528\u4E8E\u67E5\u8BE2 DeepSeek Token \u989D\u5EA6\u3002\u6CE8\u610F\uFF1AAPI Key \u4EE5\u660E\u6587\u5B58\u50A8\u4E8E Vault \u914D\u7F6E\u4E2D\uFF0C\u8BF7\u52FF\u5C06 Vault \u5206\u4EAB\u7ED9\u4ED6\u4EBA\uFF0C\u4EE5\u514D\u6CC4\u9732").addText((text) => {
          text.inputEl.type = "password";
          return text.setPlaceholder("sk-...").setValue(widgetSelf.plugin.settings.deepseekApiKey).onChange(async (value) => {
            widgetSelf.plugin.settings.deepseekApiKey = value.trim();
            await widgetSelf.plugin.saveSettings();
          });
        });
      }
      if (def.id === "minimax") {
        new import_obsidian.Setting(settingsRoot).setName("MiniMax API Key").setDesc("\u7528\u4E8E\u67E5\u8BE2 MiniMax Token \u989D\u5EA6\u3002\u6CE8\u610F\uFF1AAPI Key \u4EE5\u660E\u6587\u5B58\u50A8\u4E8E Vault \u914D\u7F6E\u4E2D\uFF0C\u8BF7\u52FF\u5C06 Vault \u5206\u4EAB\u7ED9\u4ED6\u4EBA\uFF0C\u4EE5\u514D\u6CC4\u9732").addText((text) => {
          text.inputEl.type = "password";
          return text.setPlaceholder("sk-...").setValue(widgetSelf.plugin.settings.minimaxApiKey).onChange(async (value) => {
            widgetSelf.plugin.settings.minimaxApiKey = value.trim();
            await widgetSelf.plugin.saveSettings();
          });
        });
        new import_obsidian.Setting(settingsRoot).setName("MiniMax API URL").setDesc("\u67E5\u8BE2\u4F59\u989D\u7684\u63A5\u53E3\u5730\u5740(MiniMax \u5B98\u65B9 https://www.minimaxi.com/v1/token_plan/remains,Bearer API key \u8BA4\u8BC1);\u82E5\u6539,\u786E\u4FDD\u8BE5\u7AEF\u70B9\u652F\u6301 Bearer \u800C\u975E cookie session").addText((text) => text.setPlaceholder("https://www.minimaxi.com/v1/token_plan/remains").setValue(widgetSelf.plugin.settings.minimaxApiUrl).onChange(async (value) => {
          widgetSelf.plugin.settings.minimaxApiUrl = value.trim();
          await widgetSelf.plugin.saveSettings();
        }));
      }
    });
    new import_obsidian.Setting(settingsRoot).setName("\u672C\u5468\u7B14\u8BB0\u8DEF\u5F84").setDesc("\u5C0F\u7EC4\u4EF6-\u672C\u5468\u7B14\u8BB0 \u8BFB\u53D6\u7684\u6587\u4EF6\u5939\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u4F7F\u7528\u7B14\u8BB0\u529F\u80FD\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/040-\u7B14\u8BB0").setValue(this.plugin.settings.widgetWeeknotesPath).onChange(async (value) => {
      this.plugin.settings.widgetWeeknotesPath = value.trim();
      await this.plugin.saveSettings();
      if (typeof window.__IFTO_refreshWidgetDisplay === "function") window.__IFTO_refreshWidgetDisplay();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u4ECA\u65E5\u5F85\u529E\u8DEF\u5F84").setDesc("\u5C0F\u7EC4\u4EF6-\u4ECA\u65E5\u5F85\u529E \u8BFB\u53D6\u7684\u6587\u4EF6\u5939\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u4F7F\u7528\u4ECA\u65E5\u5F85\u529E\u529F\u80FD\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/031-\u4ECA\u65E5\u5F85\u529E").setValue(this.plugin.settings.widgetTodotodoPath).onChange(async (value) => {
      this.plugin.settings.widgetTodotodoPath = value.trim();
      await this.plugin.saveSettings();
      if (typeof window.__IFTO_refreshWidgetDisplay === "function") window.__IFTO_refreshWidgetDisplay();
    }));
    settingsRoot.createEl("h3", { text: "\u6536\u96C6\u529F\u80FD" });
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u6536\u96C6\u6A21\u677F").setDesc("\u65B0\u5EFA\u6536\u96C6\u6587\u4EF6\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF08\u5982 Templates/\u6536\u96C6\u6A21\u677F.md\uFF09\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u6536\u96C6\u6A21\u677F.md").setValue(this.plugin.settings.collectionTemplate).onChange(async (value) => {
      this.plugin.settings.collectionTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    settingsRoot.createEl("h3", { text: "\u9605\u8BFB\u529F\u80FD" });
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u9605\u8BFB\u6A21\u677F").setDesc("\u65B0\u5EFA\u9605\u8BFB\u8BB0\u5F55\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF08\u81EA\u52A8\u6DFB\u52A0 status: \u5728\u8BFB\uFF09\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u9605\u8BFB\u6A21\u677F.md").setValue(this.plugin.settings.readingTemplate).onChange(async (value) => {
      this.plugin.settings.readingTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    settingsRoot.createEl("h3", { text: "\u7B14\u8BB0\u529F\u80FD" });
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u7B14\u8BB0\u8DEF\u5F84").setDesc("\u65B0\u5EFA\u7B14\u8BB0\u6587\u4EF6\u65F6\u4FDD\u5B58\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/040-\u7B14\u8BB0").setValue(this.plugin.settings.notePath).onChange(async (value) => {
      this.plugin.settings.notePath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u7B14\u8BB0\u6A21\u677F").setDesc("\u65B0\u5EFA\u7B14\u8BB0\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u7B14\u8BB0\u6A21\u677F.md").setValue(this.plugin.settings.noteTemplate).onChange(async (value) => {
      this.plugin.settings.noteTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    settingsRoot.createEl("h3", { text: "\u590D\u76D8\u8DEF\u5F84" });
    new import_obsidian.Setting(settingsRoot).setName("\u65E5\u62A5\u6587\u4EF6\u5939").setDesc("\u65E5\u62A5\u6587\u4EF6\u6240\u5728\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/602-\u65E5\u62A5").setValue(this.plugin.settings.reviewDailyPath).onChange(async (value) => {
      this.plugin.settings.reviewDailyPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65E5\u62A5\u6A21\u677F").setDesc("\u65B0\u5EFA\u65E5\u62A5\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u65E5\u62A5\u6A21\u677F.md").setValue(this.plugin.settings.reviewDailyTemplate).onChange(async (value) => {
      this.plugin.settings.reviewDailyTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u5468\u62A5\u6587\u4EF6\u5939").setDesc("\u5468\u62A5\u6587\u4EF6\u6240\u5728\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/603-\u5468\u62A5").setValue(this.plugin.settings.reviewWeeklyPath).onChange(async (value) => {
      this.plugin.settings.reviewWeeklyPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u5468\u62A5\u6A21\u677F").setDesc("\u65B0\u5EFA\u5468\u62A5\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u5468\u62A5\u6A21\u677F.md").setValue(this.plugin.settings.reviewWeeklyTemplate).onChange(async (value) => {
      this.plugin.settings.reviewWeeklyTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u6708\u62A5\u6587\u4EF6\u5939").setDesc("\u6708\u62A5\u6587\u4EF6\u6240\u5728\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/604-\u6708\u62A5").setValue(this.plugin.settings.reviewMonthlyPath).onChange(async (value) => {
      this.plugin.settings.reviewMonthlyPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u6708\u62A5\u6A21\u677F").setDesc("\u65B0\u5EFA\u6708\u62A5\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u6708\u62A5\u6A21\u677F.md").setValue(this.plugin.settings.reviewMonthlyTemplate).onChange(async (value) => {
      this.plugin.settings.reviewMonthlyTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9879\u76EE\u603B\u7ED3\u6587\u4EF6\u5939").setDesc("\u9879\u76EE\u603B\u7ED3\u6587\u4EF6\u6240\u5728\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("600-\u590D\u76D8\u603B\u7ED3/610-\u9879\u76EE\u603B\u7ED3").setValue(this.plugin.settings.reviewProjectPath).onChange(async (value) => {
      this.plugin.settings.reviewProjectPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9879\u76EE\u603B\u7ED3\u6A21\u677F").setDesc("\u65B0\u5EFA\u9879\u76EE\u603B\u7ED3\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u9879\u76EE\u603B\u7ED3\u6A21\u677F.md").setValue(this.plugin.settings.reviewProjectTemplate).onChange(async (value) => {
      this.plugin.settings.reviewProjectTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    settingsRoot.createEl("h3", { text: "\u7248\u5757\u6587\u4EF6\u5939\u8DEF\u5F84" });
    new import_obsidian.Setting(settingsRoot).setName("\u6536\u96C6\u7BB1").setDesc("\u65B0\u5EFA\u6536\u96C6\u6587\u4EF6\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/010-\u6536\u96C6").setValue(this.plugin.settings.inboxFolder).onChange(async (value) => {
      this.plugin.settings.inboxFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u5FEB\u901F\u5B66\u4E60").setDesc("\u5FEB\u901F\u5B66\u4E60\u6587\u4EF6\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("100-\u5DE5\u4F5C\u53F0WORKDESK/101-\u5FEB\u901F\u5B66\u4E60").setValue(this.plugin.settings.quickLearnFolder).onChange(async (value) => {
      this.plugin.settings.quickLearnFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9886\u57DF").setDesc("\u9886\u57DF\u6280\u80FD\u6811\u8BFB\u53D6\u7684\u6839\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("300-\u9886\u57DFAREA").setValue(this.plugin.settings.domainFolder).onChange(async (value) => {
      this.plugin.settings.domainFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u4ECA\u65E5\u5F85\u529E").setDesc("\u4ECA\u65E5\u5F85\u529E\u6587\u4EF6\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/031-\u4ECA\u65E5\u5F85\u529E").setValue(this.plugin.settings.todoFolder).onChange(async (value) => {
      this.plugin.settings.todoFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u6D3B\u52A8\u6E05\u5355").setDesc("\u6D3B\u52A8\u6E05\u5355\u6587\u4EF6\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/030-\u6D3B\u52A8\u6E05\u5355").setValue(this.plugin.settings.activityFolder).onChange(async (value) => {
      this.plugin.settings.activityFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u4EFB\u52A1\u5B58\u653E").setDesc("\u65B0\u5EFA\u4EFB\u52A1\u6587\u4EF6\u9ED8\u8BA4\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406").setValue(this.plugin.settings.taskFolder).onChange(async (value) => {
      this.plugin.settings.taskFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9879\u76EE\u4EFB\u52A1\u6A21\u677F").setDesc("PROJECT\u677F\u5757\u65B0\u5EFA\u4EFB\u52A1\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF0C\u7559\u7A7A\u5219\u521B\u5EFA\u7A7A\u767D\u6587\u4EF6").addText((text) => text.setPlaceholder("Templates/\u4EFB\u52A1\u6A21\u677F.md").setValue(this.plugin.settings.projectTaskTemplate).onChange(async (value) => {
      this.plugin.settings.projectTaskTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9879\u76EE\u7BA1\u7406\u57FA\u7840\u8DEF\u5F84").setDesc("\u9879\u76EE\u7BA1\u7406\u770B\u677F\u8BFB\u53D6\u7684\u7236\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406").setValue(this.plugin.settings.projectBase).onChange(async (value) => {
      this.plugin.settings.projectBase = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9879\u76EE\u9636\u6BB5\u5217\u8868").setDesc("\u770B\u677F\u5217\u540D\u79F0\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF0C\u9700\u4E0E\u7B14\u8BB0 frontmatter \u7684 status \u5BF9\u5E94\uFF1B\u7559\u7A7A\u65F6\u4F7F\u7528\u9ED8\u8BA4 \u672A\u5F00\u59CB,\u63A8\u8FDB\u4E2D,\u5DF2\u5B8C\u6210").addText((text) => text.setPlaceholder("\u672A\u5F00\u59CB,\u63A8\u8FDB\u4E2D,\u5DF2\u5B8C\u6210").setValue(this.plugin.settings.projectCols).onChange(async (value) => {
      this.plugin.settings.projectCols = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9879\u76EE\u5F52\u6863\u8DEF\u5F84").setDesc("\u5F52\u6863\u9879\u76EE\u6587\u4EF6\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("500-\u5F52\u6863\u8D44\u6599/510-\u5F52\u6863\u9879\u76EE").setValue(this.plugin.settings.archivePath).onChange(async (value) => {
      this.plugin.settings.archivePath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u4E66\u7C4D\u6587\u4EF6\u5939").setDesc("\u9605\u8BFB\u7B14\u8BB0-\u4E66\u7C4D\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/421-\u4E66\u7C4D").setValue(this.plugin.settings.bookFolder).onChange(async (value) => {
      this.plugin.settings.bookFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u8BBA\u6587\u6587\u4EF6\u5939").setDesc("\u9605\u8BFB\u7B14\u8BB0-\u8BBA\u6587\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/422-\u8BBA\u6587").setValue(this.plugin.settings.paperFolder).onChange(async (value) => {
      this.plugin.settings.paperFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u6574\u7406-\u8D44\u6E90\u6839\u76EE\u5F55").setDesc("\u6574\u7406\u6742\u9879\u4E2D\u663E\u793A\u7684\u6587\u4EF6\u5939\u6839\u76EE\u5F55\u8DEF\u5F84").addText((text) => text.setPlaceholder("400-\u8D44\u6E90RESOURCE").setValue(this.plugin.settings.resourceRoot).onChange(async (value) => {
      this.plugin.settings.resourceRoot = value.trim();
      await this.plugin.saveSettings();
    }));
    settingsRoot.createEl("h3", { text: "\u5FEB\u6377\u901A\u9053\uFF08\u65B0\u5EFA\u6587\u4EF6\u8DEF\u5F84\uFF09" });
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u6536\u96C6\u8DEF\u5F84").setDesc("\u70B9\u51FB\u300C\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u6536\u96C6\u300D\u65F6\u521B\u5EFA\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/010-\u6536\u96C6").setValue(this.plugin.settings.shortcutCollectPath).onChange(async (value) => {
      this.plugin.settings.shortcutCollectPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u6536\u96C6\u6A21\u677F").setDesc("\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u6536\u96C6 \u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84").addText((text) => text.setPlaceholder("Templates/\u6536\u96C6\u6A21\u677F.md").setValue(this.plugin.settings.shortcutCollectTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutCollectTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u5F85\u529E\u8DEF\u5F84").setDesc("\u70B9\u51FB\u300C\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u5F85\u529E\u300D\u65F6\u521B\u5EFA\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/030-\u6D3B\u52A8\u6E05\u5355").setValue(this.plugin.settings.shortcutTodoPath).onChange(async (value) => {
      this.plugin.settings.shortcutTodoPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u5F85\u529E\u6A21\u677F").setDesc("\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u5F85\u529E \u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84").addText((text) => text.setPlaceholder("Templates/\u5F85\u529E\u6A21\u677F.md").setValue(this.plugin.settings.shortcutTodoTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutTodoTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u4EFB\u52A1\u8DEF\u5F84").setDesc("\u70B9\u51FB\u300C\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u4EFB\u52A1\u300D\u65F6\u521B\u5EFA\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406").setValue(this.plugin.settings.shortcutTaskPath).onChange(async (value) => {
      this.plugin.settings.shortcutTaskPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u4EFB\u52A1\u6A21\u677F").setDesc("\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u4EFB\u52A1 \u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84").addText((text) => text.setPlaceholder("Templates/\u4EFB\u52A1\u6A21\u677F.md").setValue(this.plugin.settings.shortcutTaskTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutTaskTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u7B14\u8BB0\u8DEF\u5F84").setDesc("\u70B9\u51FB\u300C\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u7B14\u8BB0\u300D\u65F6\u521B\u5EFA\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX/040-\u7B14\u8BB0").setValue(this.plugin.settings.shortcutNotePath).onChange(async (value) => {
      this.plugin.settings.shortcutNotePath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u65B0\u5EFA\u7B14\u8BB0\u6A21\u677F").setDesc("\u5FEB\u6377\u901A\u9053 > \u65B0\u5EFA\u7B14\u8BB0 \u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84").addText((text) => text.setPlaceholder("Templates/\u7B14\u8BB0\u6A21\u677F.md").setValue(this.plugin.settings.shortcutNoteTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutNoteTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    settingsRoot.createEl("h3", { text: "\u6587\u4EF6\u5939\u7ED3\u6784\uFF08\u6839\u76EE\u5F55\uFF09" });
    new import_obsidian.Setting(settingsRoot).setName("INBOX \u6839\u76EE\u5F55").setDesc("\u6536\u96C6\u7BB1\u3001\u5F85\u529E\u3001\u6D3B\u52A8\u6E05\u5355\u3001\u7B14\u8BB0\u7B49\u6240\u5728\u7684\u9876\u5C42\u6587\u4EF6\u5939").addText((text) => text.setPlaceholder("000-\u4FE1\u7BB1INBOX").setValue(this.plugin.settings.inboxRoot).onChange(async (value) => {
      this.plugin.settings.inboxRoot = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u5DE5\u4F5C\u5E93\u6839\u76EE\u5F55").setDesc("\u5DE5\u4F5C\u5E93\u9876\u5C42\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("200-\u5DE5\u4F5C\u5E93WORKFILE").setValue(this.plugin.settings.workfileRoot).onChange(async (value) => {
      this.plugin.settings.workfileRoot = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9879\u76EE\u6587\u4EF6\u76EE\u5F55").setDesc("\u9879\u76EE\u6587\u4EF6\u5B58\u653E\u7684\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("200-\u5DE5\u4F5C\u5E93WORKFILE/201-\u9879\u76EE\u6587\u4EF6").setValue(this.plugin.settings.projectFilesFolder).onChange(async (value) => {
      this.plugin.settings.projectFilesFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u5F52\u6863\u6839\u76EE\u5F55").setDesc("\u5F52\u6863\u8D44\u6599\u9876\u5C42\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("500-\u5F52\u6863\u8D44\u6599").setValue(this.plugin.settings.archiveRoot).onChange(async (value) => {
      this.plugin.settings.archiveRoot = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u8349\u7A3F\u7BB1").setDesc("\u8349\u7A3F\u7BB1\u6587\u4EF6\u5939\u8DEF\u5F84").addText((text) => text.setPlaceholder("100-\u5DE5\u4F5C\u53F0WORKDESK/110-\u8349\u7A3F\u7BB1").setValue(this.plugin.settings.draftFolder).onChange(async (value) => {
      this.plugin.settings.draftFolder = value.trim();
      await this.plugin.saveSettings();
    }));
  }
};
