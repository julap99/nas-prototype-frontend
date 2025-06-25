import { unref, withCtx, renderSlot, useSSRContext, mergeProps, createVNode, ref, computed, resolveComponent, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, createTextVNode, onUnmounted, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { j as defineStore, u as useSiteSettings, a as _export_sfc, _ as __nuxt_component_1$1, h as _imports_0$1, b as useRoute, n as navigateTo } from '../server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-26e5a74c.mjs';
import { _ as __nuxt_component_0 } from './RsButton-55c8bb6a.mjs';
import __nuxt_component_1 from './NuxtScrollbar-ce765c06.mjs';
import { useWindowSize } from 'vue-window-size';
import { u as useUserStore } from './user-af469779.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import 'destr';
import 'klona';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue3-perfect-scrollbar';
import '@floating-ui/utils';
import '@formkit/core';
import '@formkit/utils';
import '@formkit/inputs';
import '@formkit/rules';
import '@formkit/validation';
import '@formkit/i18n';
import '@formkit/themes';
import '@formkit/observer';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'vue3-dropzone';
import '@formkit/addons';
import 'cookie-es';
import 'ohash';
import 'pinia-plugin-persistedstate';
import '@formkit/auto-animate/vue';
import 'maska';
import 'swiper/vue';
import '@shimyshack/uid';
import 'v-calendar';
import 'vue-code-highlight';
import 'codemirror';
import '@codemirror/state';
import '@codemirror/view';
import '@codemirror/commands';
import '@codemirror/language';
import 'vue-country-flag-next';
import 'sweetalert2';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'memory-cache';
import 'perf_hooks';
import 'xss';
import 'http-graceful-shutdown';
import './client-only-29ef7f45.mjs';

const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    theme: "default",
    layoutType: "vertical",
    codeTheme: "oneDark"
  }),
  persist: true,
  actions: {
    setTheme(theme) {
      this.theme = theme;
    },
    setLayoutType(layoutType) {
      this.layoutType = layoutType;
    },
    setCodeTheme(codeTheme) {
      this.codeTheme = codeTheme;
    }
  }
});
const useLayoutStore = defineStore({
  id: "layout",
  state: () => ({
    layoutType: "vertical",
    mobileWidth: "1024"
  }),
  actions: {
    setLayoutType(layoutType) {
      this.layoutType = layoutType;
    }
  }
});
function useVoiceReader() {
  const isReading = ref(false);
  const announceElement = ref(null);
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
  const toggleReading = () => {
    return;
  };
  const handleKeydown = (event) => {
    if (event.ctrlKey && event.key === "r") {
      event.preventDefault();
    }
  };
  return {
    isReading,
    toggleReading,
    announceElement
  };
}
const _sfc_main$8 = {
  __name: "VoiceReader",
  __ssrInlineRender: true,
  setup(__props) {
    const { isReading, toggleReading, announceElement } = useVoiceReader();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_rs_button = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "voice-reader" }, _attrs))} data-v-ae9c9c39>`);
      _push(ssrRenderComponent(_component_rs_button, {
        onClick: unref(toggleReading),
        variant: unref(isReading) ? "danger" : "primary",
        class: "p-2 rounded-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: unref(isReading) ? "ph:ear" : "ph:ear-slash",
              class: ["text-2xl", { "animate-pulse text-white": unref(isReading) }]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: unref(isReading) ? "ph:ear" : "ph:ear-slash",
                class: ["text-2xl", { "animate-pulse text-white": unref(isReading) }]
              }, null, 8, ["name", "class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="sr-only" aria-live="polite" data-v-ae9c9c39></span></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VoiceReader.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-ae9c9c39"]]);
function languageList() {
  return [
    {
      name: "English",
      value: "en",
      flagCode: "GB",
      default: true
    },
    {
      name: "Malay",
      value: "ms",
      flagCode: "MY"
    },
    {
      name: "Chinese",
      value: "cn",
      flagCode: "CN"
    }
  ];
}
function themeList() {
  return [
    {
      theme: "biasa",
      colors: [
        {
          name: "primary",
          value: "243, 88, 106"
        },
        {
          name: "secondary",
          value: "240, 122, 37"
        },
        {
          name: "accent",
          value: "243, 244, 246"
        }
      ]
    },
    {
      theme: "gelap",
      colors: [
        {
          name: "primary",
          value: "243, 88, 106"
        },
        {
          name: "secondary",
          value: "240, 122, 37"
        },
        {
          name: "accent",
          value: "15, 23, 42"
        }
      ]
    },
    {
      theme: "LZS",
      colors: [
        {
          name: "primary",
          value: "0, 90, 173"
          // #005AAD - Blue
        },
        {
          name: "secondary",
          value: "141, 199, 61"
          // #8DC73D - Green
        },
        {
          name: "accent",
          value: "255, 242, 0"
          // #FFF200 - Yellow
        }
      ]
    }
  ];
}
function themeList2() {
  return [
    {
      theme: "biru",
      colors: [
        {
          name: "primary",
          value: "0, 102, 204"
          // Strong blue
        },
        {
          name: "secondary",
          value: "51, 153, 255"
          // Lighter blue
        },
        {
          name: "accent",
          value: "255, 204, 0"
          // Gold
        },
        {
          name: "background",
          value: "240, 248, 255"
          // Alice blue
        },
        {
          name: "text",
          value: "0, 0, 0"
          // Black
        }
      ]
    },
    {
      theme: "merah",
      colors: [
        {
          name: "primary",
          value: "204, 0, 0"
          // Strong red
        },
        {
          name: "secondary",
          value: "255, 102, 102"
          // Lighter red
        },
        {
          name: "accent",
          value: "255, 255, 153"
          // Light yellow
        },
        {
          name: "background",
          value: "255, 240, 240"
          // Very light pink
        },
        {
          name: "text",
          value: "0, 0, 0"
          // Black
        }
      ]
    },
    {
      theme: "ungu",
      colors: [
        {
          name: "primary",
          value: "75, 0, 130"
          // Indigo
        },
        {
          name: "secondary",
          value: "138, 43, 226"
          // Blue violet
        },
        {
          name: "accent",
          value: "255, 215, 0"
          // Gold
        },
        {
          name: "background",
          value: "240, 248, 255"
          // Alice blue
        },
        {
          name: "text",
          value: "0, 0, 0"
          // Black
        }
      ]
    },
    {
      theme: "oren",
      colors: [
        {
          name: "primary",
          value: "255, 103, 0"
          // Dark orange
        },
        {
          name: "secondary",
          value: "255, 159, 64"
          // Lighter orange
        },
        {
          name: "accent",
          value: "0, 128, 128"
          // Teal
        },
        {
          name: "background",
          value: "255, 250, 240"
          // Floral white
        },
        {
          name: "text",
          value: "0, 0, 0"
          // Black
        }
      ]
    },
    {
      theme: "LZS",
      colors: [
        {
          name: "primary",
          value: "0, 90, 173"
          // #005AAD - Blue
        },
        {
          name: "secondary",
          value: "141, 199, 61"
          // #8DC73D - Green
        },
        {
          name: "accent",
          value: "255, 242, 0"
          // #FFF200 - Yellow
        },
        {
          name: "background",
          value: "245, 250, 255"
          // Very light blue background
        },
        {
          name: "text",
          value: "0, 0, 0"
          // Black
        }
      ]
    }
  ];
}
const _imports_0 = "" + __buildAssetsURL("default.3a64bd13.svg");
const _sfc_main$7 = {
  __name: "Header",
  __ssrInlineRender: true,
  emits: ["toggleMenu"],
  setup(__props, { emit }) {
    const isVertical = ref(true);
    const isDesktop = ref(true);
    const { siteSettings, setTheme, getCurrentTheme } = useSiteSettings();
    const langList = languageList();
    const locale = ref("en");
    const themes = themeList();
    const themes2 = themeList2();
    function setThemeLocal(theme) {
      setTheme(theme);
    }
    function rgbToHex(rgbString) {
      const rgbArray = rgbString.split(",");
      const r = parseInt(rgbArray[0].trim(), 10);
      const g = parseInt(rgbArray[1].trim(), 10);
      const b = parseInt(rgbArray[2].trim(), 10);
      const rHex = r.toString(16).padStart(2, "0");
      const gHex = g.toString(16).padStart(2, "0");
      const bHex = b.toString(16).padStart(2, "0");
      return `#${rHex}${gHex}${bHex}`;
    }
    computed(() => {
      return langList.find((lang) => lang.value == locale.value);
    });
    computed(() => {
      const theme = getCurrentTheme();
      return theme === "dark" ? "ic:outline-dark-mode" : "ic:outline-light-mode";
    });
    const currentLogo = computed(() => {
      var _a;
      const logoUrl = (_a = siteSettings.value) == null ? void 0 : _a.siteLogo;
      if (logoUrl && logoUrl.trim() !== "") {
        return logoUrl;
      }
      return "/img/logo/corradAF-logo.svg";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_Icon = __nuxt_component_1$1;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_VoiceReader = __nuxt_component_2;
      const _component_VDropdown = resolveComponent("VDropdown");
      const _component_NuxtScrollbar = __nuxt_component_1;
      const _component_FormKit = resolveComponent("FormKit");
      _push(`<!--[--><div class="w-header" data-v-a89262be><div class="flex items-stretch justify-between" data-v-a89262be>`);
      if (unref(isVertical)) {
        _push(`<div class="flex" data-v-a89262be><span class="flex items-center justify-center" data-v-a89262be><button class="icon-btn h-10 w-10 rounded-full" data-v-a89262be>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:round-menu",
          class: ""
        }, null, _parent));
        _push(`</button></span>`);
        if ((_b = (_a = unref(siteSettings)) == null ? void 0 : _a.value) == null ? void 0 : _b.showSiteNameInHeader) {
          _push(`<div class="flex items-center ml-4" data-v-a89262be><img${ssrRenderAttr("src", unref(currentLogo))}${ssrRenderAttr("alt", ((_d = (_c = unref(siteSettings)) == null ? void 0 : _c.value) == null ? void 0 : _d.siteName) || "Site Logo")} class="h-8 block" data-v-a89262be>`);
          if ((_f = (_e = unref(siteSettings)) == null ? void 0 : _e.value) == null ? void 0 : _f.siteName) {
            _push(`<span class="${ssrRenderClass([{ "ml-3": (_h = (_g = unref(siteSettings)) == null ? void 0 : _g.value) == null ? void 0 : _h.siteLogo }, "text-lg font-semibold"])}" style="${ssrRenderStyle({
              fontSize: (((_j = (_i = unref(siteSettings)) == null ? void 0 : _i.value) == null ? void 0 : _j.siteNameFontSize) || 18) + "px"
            })}" data-v-a89262be>${ssrInterpolate((_l = (_k = unref(siteSettings)) == null ? void 0 : _k.value) == null ? void 0 : _l.siteName)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="flex" data-v-a89262be>`);
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t;
            if (_push2) {
              _push2(`<div class="flex flex-auto gap-3 justify-center items-center" data-v-a89262be${_scopeId}><img${ssrRenderAttr("src", unref(currentLogo))}${ssrRenderAttr("alt", ((_b2 = (_a2 = unref(siteSettings)) == null ? void 0 : _a2.value) == null ? void 0 : _b2.siteName) || "Site Logo")} class="h-8 block" data-v-a89262be${_scopeId}>`);
              if (((_d2 = (_c2 = unref(siteSettings)) == null ? void 0 : _c2.value) == null ? void 0 : _d2.siteName) && ((_f2 = (_e2 = unref(siteSettings)) == null ? void 0 : _e2.value) == null ? void 0 : _f2.showSiteNameInHeader)) {
                _push2(`<span class="text-lg font-semibold" style="${ssrRenderStyle({
                  fontSize: (((_h2 = (_g2 = unref(siteSettings)) == null ? void 0 : _g2.value) == null ? void 0 : _h2.siteNameFontSize) || 18) + "px"
                })}" data-v-a89262be${_scopeId}>${ssrInterpolate((_j2 = (_i2 = unref(siteSettings)) == null ? void 0 : _i2.value) == null ? void 0 : _j2.siteName)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-auto gap-3 justify-center items-center" }, [
                  createVNode("img", {
                    src: unref(currentLogo),
                    alt: ((_l2 = (_k2 = unref(siteSettings)) == null ? void 0 : _k2.value) == null ? void 0 : _l2.siteName) || "Site Logo",
                    class: "h-8 block",
                    onError: ($event) => $event.target.src = "/img/logo/corradAF-logo.svg"
                  }, null, 40, ["src", "alt", "onError"]),
                  ((_n = (_m = unref(siteSettings)) == null ? void 0 : _m.value) == null ? void 0 : _n.siteName) && ((_p = (_o = unref(siteSettings)) == null ? void 0 : _o.value) == null ? void 0 : _p.showSiteNameInHeader) ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-lg font-semibold",
                    style: {
                      fontSize: (((_r = (_q = unref(siteSettings)) == null ? void 0 : _q.value) == null ? void 0 : _r.siteNameFontSize) || 18) + "px"
                    }
                  }, toDisplayString((_t = (_s = unref(siteSettings)) == null ? void 0 : _s.value) == null ? void 0 : _t.siteName), 5)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`<div class="flex gap-2 item-center justify-items-end" data-v-a89262be>`);
      _push(ssrRenderComponent(_component_VoiceReader, { class: "ml-4" }, null, _parent));
      _push(ssrRenderComponent(_component_VDropdown, {
        placement: "bottom-end",
        distance: "13",
        name: "theme"
      }, {
        popper: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="header-dropdown w-full md:w-52" data-v-a89262be${_scopeId}><!--[-->`);
            ssrRenderList(unref(themes), (val, index) => {
              _push2(`<li data-v-a89262be${_scopeId}><a class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-[rgb(var(--bg-1))]" data-v-a89262be${_scopeId}><span class="capitalize" data-v-a89262be${_scopeId}>${ssrInterpolate(val.theme)}</span><div class="flex items-center gap-x-1" data-v-a89262be${_scopeId}><!--[-->`);
              ssrRenderList(val.colors, (color, colorIndex) => {
                _push2(`<div class="h-[25px] w-[10px] rounded-lg" style="${ssrRenderStyle({
                  backgroundColor: rgbToHex(color.value)
                })}" data-v-a89262be${_scopeId}></div>`);
              });
              _push2(`<!--]--></div></a></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "header-dropdown w-full md:w-52" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (val, index) => {
                  return openBlock(), createBlock("li", { key: index }, [
                    createVNode("a", {
                      onClick: ($event) => setThemeLocal(val.theme),
                      class: "flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-[rgb(var(--bg-1))]"
                    }, [
                      createVNode("span", { class: "capitalize" }, toDisplayString(val.theme), 1),
                      createVNode("div", { class: "flex items-center gap-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(val.colors, (color, colorIndex) => {
                          return openBlock(), createBlock("div", {
                            key: colorIndex,
                            class: "h-[25px] w-[10px] rounded-lg",
                            style: {
                              backgroundColor: rgbToHex(color.value)
                            }
                          }, null, 4);
                        }), 128))
                      ])
                    ], 8, ["onClick"])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="icon-btn h-10 w-10 rounded-full" data-v-a89262be${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              size: "22px",
              name: "ph:paint-brush-broad"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "icon-btn h-10 w-10 rounded-full" }, [
                createVNode(_component_Icon, {
                  size: "22px",
                  name: "ph:paint-brush-broad"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_VDropdown, {
        placement: "bottom-end",
        distance: "13",
        name: "theme2"
      }, {
        popper: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="header-dropdown w-full md:w-52" data-v-a89262be${_scopeId}><!--[-->`);
            ssrRenderList(unref(themes2), (val, index) => {
              _push2(`<li data-v-a89262be${_scopeId}><a class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-[rgb(var(--bg-1))]" data-v-a89262be${_scopeId}><span class="capitalize" data-v-a89262be${_scopeId}>${ssrInterpolate(val.theme)}</span><div class="flex items-center gap-x-1" data-v-a89262be${_scopeId}><!--[-->`);
              ssrRenderList(val.colors, (color, colorIndex) => {
                _push2(`<div class="h-[25px] w-[10px] rounded-lg" style="${ssrRenderStyle({
                  backgroundColor: rgbToHex(color.value)
                })}" data-v-a89262be${_scopeId}></div>`);
              });
              _push2(`<!--]--></div></a></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "header-dropdown w-full md:w-52" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(themes2), (val, index) => {
                  return openBlock(), createBlock("li", { key: index }, [
                    createVNode("a", {
                      onClick: ($event) => setThemeLocal(val.theme),
                      class: "flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-[rgb(var(--bg-1))]"
                    }, [
                      createVNode("span", { class: "capitalize" }, toDisplayString(val.theme), 1),
                      createVNode("div", { class: "flex items-center gap-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(val.colors, (color, colorIndex) => {
                          return openBlock(), createBlock("div", {
                            key: colorIndex,
                            class: "h-[25px] w-[10px] rounded-lg",
                            style: {
                              backgroundColor: rgbToHex(color.value)
                            }
                          }, null, 4);
                        }), 128))
                      ])
                    ], 8, ["onClick"])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="icon-btn h-10 w-10 rounded-full" data-v-a89262be${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              size: "22px",
              name: "ph:wheelchair"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "icon-btn h-10 w-10 rounded-full" }, [
                createVNode(_component_Icon, {
                  size: "22px",
                  name: "ph:wheelchair"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_VDropdown, {
        placement: "bottom-end",
        distance: "13",
        name: "notification"
      }, {
        popper: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="header-dropdown w-full md:w-80 text-[#4B5563]" data-v-a89262be${_scopeId}><li class="d-head flex items-center justify-between py-2 px-4" data-v-a89262be${_scopeId}><span class="font-semibold" data-v-a89262be${_scopeId}>Notification</span><div class="flex items-center text-primary cursor-pointer hover:underline" data-v-a89262be${_scopeId}><a class="ml-2" data-v-a89262be${_scopeId}>View All</a></div></li>`);
            _push2(ssrRenderComponent(_component_NuxtScrollbar, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a89262be${_scopeId2}><div class="bg-[rgb(var(--bg-1))] py-2 px-4" data-v-a89262be${_scopeId2}>Today</div><a class="py-2 px-4 block" data-v-a89262be${_scopeId2}><div class="flex items-center" data-v-a89262be${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-circle",
                    class: "text-primary flex-none"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="mx-2" data-v-a89262be${_scopeId2}>Terdapat Satu Pembayaran yang berlaku menggunakan bil Kuih Raya Cik Kiah</span><div class="w-12 h-12 rounded-full ml-auto flex-none" data-v-a89262be${_scopeId2}><img class="rounded-full"${ssrRenderAttr("src", _imports_0)} data-v-a89262be${_scopeId2}></div></div></a><a class="py-2 px-4 block" data-v-a89262be${_scopeId2}><div class="flex items-center" data-v-a89262be${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-circle",
                    class: "text-primary flex-none"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="mx-2" data-v-a89262be${_scopeId2}>Terdapat Satu Pembayaran yang berlaku menggunakan bil Mercun</span><div class="w-12 h-12 rounded-full ml-auto flex-none" data-v-a89262be${_scopeId2}><img class="rounded-full"${ssrRenderAttr("src", _imports_0)} alt="" data-v-a89262be${_scopeId2}></div></div></a></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("div", { class: "bg-[rgb(var(--bg-1))] py-2 px-4" }, "Today"),
                      createVNode("a", { class: "py-2 px-4 block" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(_component_Icon, {
                            name: "ic:outline-circle",
                            class: "text-primary flex-none"
                          }),
                          createVNode("span", { class: "mx-2" }, "Terdapat Satu Pembayaran yang berlaku menggunakan bil Kuih Raya Cik Kiah"),
                          createVNode("div", { class: "w-12 h-12 rounded-full ml-auto flex-none" }, [
                            createVNode("img", {
                              class: "rounded-full",
                              src: _imports_0
                            })
                          ])
                        ])
                      ]),
                      createVNode("a", { class: "py-2 px-4 block" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(_component_Icon, {
                            name: "ic:outline-circle",
                            class: "text-primary flex-none"
                          }),
                          createVNode("span", { class: "mx-2" }, "Terdapat Satu Pembayaran yang berlaku menggunakan bil Mercun"),
                          createVNode("div", { class: "w-12 h-12 rounded-full ml-auto flex-none" }, [
                            createVNode("img", {
                              class: "rounded-full",
                              src: _imports_0,
                              alt: ""
                            })
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</ul>`);
          } else {
            return [
              createVNode("ul", { class: "header-dropdown w-full md:w-80 text-[#4B5563]" }, [
                createVNode("li", { class: "d-head flex items-center justify-between py-2 px-4" }, [
                  createVNode("span", { class: "font-semibold" }, "Notification"),
                  createVNode("div", { class: "flex items-center text-primary cursor-pointer hover:underline" }, [
                    createVNode("a", { class: "ml-2" }, "View All")
                  ])
                ]),
                createVNode(_component_NuxtScrollbar, null, {
                  default: withCtx(() => [
                    createVNode("li", null, [
                      createVNode("div", { class: "bg-[rgb(var(--bg-1))] py-2 px-4" }, "Today"),
                      createVNode("a", { class: "py-2 px-4 block" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(_component_Icon, {
                            name: "ic:outline-circle",
                            class: "text-primary flex-none"
                          }),
                          createVNode("span", { class: "mx-2" }, "Terdapat Satu Pembayaran yang berlaku menggunakan bil Kuih Raya Cik Kiah"),
                          createVNode("div", { class: "w-12 h-12 rounded-full ml-auto flex-none" }, [
                            createVNode("img", {
                              class: "rounded-full",
                              src: _imports_0
                            })
                          ])
                        ])
                      ]),
                      createVNode("a", { class: "py-2 px-4 block" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(_component_Icon, {
                            name: "ic:outline-circle",
                            class: "text-primary flex-none"
                          }),
                          createVNode("span", { class: "mx-2" }, "Terdapat Satu Pembayaran yang berlaku menggunakan bil Mercun"),
                          createVNode("div", { class: "w-12 h-12 rounded-full ml-auto flex-none" }, [
                            createVNode("img", {
                              class: "rounded-full",
                              src: _imports_0,
                              alt: ""
                            })
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="relative icon-btn h-10 w-10 rounded-full" data-v-a89262be${_scopeId}><span class="w-3 h-3 absolute top-1 right-2 rounded-full bg-primary" data-v-a89262be${_scopeId}></span>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:round-notifications-none",
              class: ""
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "relative icon-btn h-10 w-10 rounded-full" }, [
                createVNode("span", { class: "w-3 h-3 absolute top-1 right-2 rounded-full bg-primary" }),
                createVNode(_component_Icon, {
                  name: "ic:round-notifications-none",
                  class: ""
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_VDropdown, {
        placement: "bottom-end",
        distance: "13",
        name: "profile",
        class: "flex justify-center item-center"
      }, {
        popper: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="header-dropdown w-full md:w-52" data-v-a89262be${_scopeId}><li data-v-a89262be${_scopeId}><a href="/logout" class="flex items-center cursor-pointer py-2 px-4 hover:bg-[rgb(var(--bg-1))]" data-v-a89262be${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-logout",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Logout </a></li></ul>`);
          } else {
            return [
              createVNode("ul", { class: "header-dropdown w-full md:w-52" }, [
                createVNode("li", null, [
                  createVNode("a", {
                    href: "/logout",
                    class: "flex items-center cursor-pointer py-2 px-4 hover:bg-[rgb(var(--bg-1))]"
                  }, [
                    createVNode(_component_Icon, {
                      name: "ic:outline-logout",
                      class: "mr-2"
                    }),
                    createTextVNode(" Logout ")
                  ])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="icon-btn profile px-2" data-v-a89262be${_scopeId}><img class="w-8 h-8 object-cover rounded-full"${ssrRenderAttr("src", _imports_0)} data-v-a89262be${_scopeId}>`);
            if (unref(isDesktop)) {
              _push2(`<div class="grid grid-cols-1 text-left ml-3 flex-none" data-v-a89262be${_scopeId}><p class="font-semibold text-sm truncate w-24 mb-0" data-v-a89262be${_scopeId}>Johan</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-keyboard-arrow-down",
              class: "ml-3"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "icon-btn profile px-2" }, [
                createVNode("img", {
                  class: "w-8 h-8 object-cover rounded-full",
                  src: _imports_0
                }),
                unref(isDesktop) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "grid grid-cols-1 text-left ml-3 flex-none"
                }, [
                  createVNode("p", { class: "font-semibold text-sm truncate w-24 mb-0" }, "Johan")
                ])) : createCommentVNode("", true),
                createVNode(_component_Icon, {
                  name: "ic:outline-keyboard-arrow-down",
                  class: "ml-3"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div tabindex="0" class="w-header-search" data-v-a89262be>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:outline-search",
        class: "mr-3"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormKit, {
        id: "header-search",
        classes: {
          outer: "mb-0 flex-1"
        },
        type: "search",
        placeholder: "Search..."
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/Header.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const RSHeader = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-a89262be"]]);
const Menu = [
  {
    header: "Utama",
    description: "",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {}
      }
    ],
    meta: {}
  }
];
const _sfc_main$6 = {
  __name: "ItemChild",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true
    },
    indent: {
      type: Number,
      default: 0.5
    }
  },
  emits: ["openMenu"],
  setup(__props, { emit }) {
    const props = __props;
    const layoutStore = useLayoutStore();
    const mobileWidth = layoutStore.mobileWidth;
    const { width } = useWindowSize();
    const user = useUserStore();
    const route = useRoute();
    const indent = ref(props.indent);
    const menuItem = props.items ? props.items : [];
    const username = user.username;
    const roles = user.roles;
    function userExist(item) {
      var _a, _b, _c, _d;
      if ((_b = (_a = item.meta) == null ? void 0 : _a.auth) == null ? void 0 : _b.user) {
        if ((_d = (_c = item.meta) == null ? void 0 : _c.auth) == null ? void 0 : _d.user.includes(username)) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    function roleExist(item) {
      var _a, _b, _c, _d;
      if ((_b = (_a = item.meta) == null ? void 0 : _a.auth) == null ? void 0 : _b.role) {
        if ((_d = (_c = item.meta) == null ? void 0 : _c.auth) == null ? void 0 : _d.role.some((r) => roles.includes(r))) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    function openMenu(event) {
      emit("openMenu", event);
    }
    function activeMenu(routePath) {
      return route.path == routePath ? `bg-[rgb(var(--color-primary))] font-normal text-white active-menu` : `font-light text-white/90 md:transition-all md:duration-200 hover:md:ml-2`;
    }
    function toggleMenu() {
      document.querySelector(".v-layout").classList.toggle("menu-hide");
      document.getElementsByClassName("menu-overlay")[0].classList.toggle("hide");
    }
    function navigationPage(path, external) {
      if (width.value <= mobileWidth)
        toggleMenu();
      navigateTo(path, {
        external
      });
    }
    const indentStyle = computed(() => {
      return { "background-color": `rgba(var(--sidebar-menu), ${indent.value})` };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: "menu-content hide transition-all duration-300",
        style: unref(indentStyle)
      }, _attrs))}><!--[-->`);
      ssrRenderList(unref(menuItem), (item, index) => {
        var _a;
        _push(`<li>`);
        if (!item.meta || !((_a = item.meta) == null ? void 0 : _a.auth) || userExist(item) && roleExist(item)) {
          _push(`<div class="navigation-item-wrapper">`);
          if (item.child === void 0 || item.child && item.child.length === 0) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              class: ["flex items-center px-6 py-3 cursor-pointer", activeMenu(item.path)],
              onClick: ($event) => navigationPage(item.path, item.external)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (item.icon) {
                    _push2(ssrRenderComponent(_component_Icon, {
                      name: item.icon,
                      size: "18"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="mx-4 font-normal"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
                  if (item.child && item.child.length > 0) {
                    _push2(ssrRenderComponent(_component_Icon, {
                      class: "ml-auto side-menu-arrow",
                      name: "material-symbols:chevron-right-rounded",
                      size: "18"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    item.icon ? (openBlock(), createBlock(_component_Icon, {
                      key: 0,
                      name: item.icon,
                      size: "18"
                    }, null, 8, ["name"])) : createCommentVNode("", true),
                    createVNode("span", { class: "mx-4 font-normal" }, toDisplayString(item.title), 1),
                    item.child && item.child.length > 0 ? (openBlock(), createBlock(_component_Icon, {
                      key: 1,
                      class: "ml-auto side-menu-arrow",
                      name: "material-symbols:chevron-right-rounded",
                      size: "18"
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<a class="${ssrRenderClass([activeMenu(item.path), "flex items-center px-6 py-3 rounded-lg cursor-pointer"])}"><span class="mx-3 font-normal">${ssrInterpolate(item.title)}</span>`);
            if (item.child && item.child.length > 0) {
              _push(ssrRenderComponent(_component_Icon, {
                class: "ml-auto side-menu-arrow",
                name: "material-symbols:chevron-right-rounded",
                size: "18"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</a>`);
          }
          if (item.child) {
            _push(ssrRenderComponent(RSChildItem, {
              items: item.child,
              indent: unref(indent) + 0.1,
              onOpenMenu: openMenu,
              onActiveMenu: activeMenu
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/sidemenu/ItemChild.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const RSChildItem = _sfc_main$6;
const _sfc_main$5 = {
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const layoutStore = useLayoutStore();
    const mobileWidth = layoutStore.mobileWidth;
    const { width } = useWindowSize();
    const user = useUserStore();
    const route = useRoute();
    const username = user.username;
    const roles = user.roles;
    const menuItem = props.items ? props.items : [];
    function userExist(item) {
      var _a, _b, _c, _d;
      if ((_b = (_a = item.meta) == null ? void 0 : _a.auth) == null ? void 0 : _b.user) {
        if ((_d = (_c = item.meta) == null ? void 0 : _c.auth) == null ? void 0 : _d.user.some((e) => e === username)) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    function roleExist(item) {
      var _a, _b, _c, _d;
      if ((_b = (_a = item.meta) == null ? void 0 : _a.auth) == null ? void 0 : _b.role) {
        if ((_d = (_c = item.meta) == null ? void 0 : _c.auth) == null ? void 0 : _d.role.some((e) => roles == null ? void 0 : roles.includes(e))) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    function openMenu(event) {
      const target = event.currentTarget;
      try {
        target.querySelector("a").classList.toggle("nav-open");
        target.querySelector("ul").classList.toggle("hide");
      } catch (e) {
        return;
      }
    }
    function activeMenu(routePath) {
      return route.path == routePath ? `bg-[rgb(var(--color-primary))] font-normal text-white active-menu` : `font-light text-white/90 md:transition-all md:duration-200 hover:md:ml-2`;
    }
    function toggleMenu() {
      document.querySelector(".v-layout").classList.toggle("menu-hide");
      document.getElementsByClassName("menu-overlay")[0].classList.toggle("hide");
    }
    function navigationPage(path, external) {
      if (width.value <= mobileWidth)
        toggleMenu();
      navigateTo(path, {
        external
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<!--[-->`);
      ssrRenderList(unref(menuItem), (item, index) => {
        var _a;
        _push(`<div>`);
        if (!item.meta || !((_a = item.meta) == null ? void 0 : _a.auth) || userExist(item) && roleExist(item)) {
          _push(`<div class="navigation-wrapper">`);
          if (item.header) {
            _push(`<div class="text-left font-normal text-xs mx-6 mt-5 mb-2"><span class="uppercase text-gray-400">${ssrInterpolate(item.header ? item.header : "")}</span><p class="text-gray-400">${ssrInterpolate(item.description ? item.description : "")}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<ul class="navigation-menu"><!--[-->`);
          ssrRenderList(item.child, (item2, index2) => {
            var _a2;
            _push(`<li class="navigation-item">`);
            if (!item2.meta || !((_a2 = item2.meta) == null ? void 0 : _a2.auth) || userExist(item2) && roleExist(item2)) {
              _push(`<div class="navigation-item-wrapper">`);
              if (item2.child === void 0 || item2.child && item2.child.length === 0) {
                _push(ssrRenderComponent(_component_NuxtLink, {
                  class: ["flex items-center px-6 py-3 cursor-pointer", activeMenu(item2.path)],
                  onClick: ($event) => navigationPage(item2.path, item2.external)
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      if (item2.icon) {
                        _push2(ssrRenderComponent(_component_Icon, {
                          name: item2.icon,
                          size: "18"
                        }, null, _parent2, _scopeId));
                      } else {
                        _push2(ssrRenderComponent(_component_Icon, {
                          name: "mdi:circle-slice-8",
                          size: "18"
                        }, null, _parent2, _scopeId));
                      }
                      _push2(`<span class="mx-3 font-normal"${_scopeId}>${ssrInterpolate(item2.title)}</span>`);
                      if (item2.child && item2.child.length > 0) {
                        _push2(ssrRenderComponent(_component_Icon, {
                          class: "ml-auto side-menu-arrow",
                          name: "material-symbols:chevron-right-rounded",
                          size: "18"
                        }, null, _parent2, _scopeId));
                      } else {
                        _push2(`<!---->`);
                      }
                    } else {
                      return [
                        item2.icon ? (openBlock(), createBlock(_component_Icon, {
                          key: 0,
                          name: item2.icon,
                          size: "18"
                        }, null, 8, ["name"])) : (openBlock(), createBlock(_component_Icon, {
                          key: 1,
                          name: "mdi:circle-slice-8",
                          size: "18"
                        })),
                        createVNode("span", { class: "mx-3 font-normal" }, toDisplayString(item2.title), 1),
                        item2.child && item2.child.length > 0 ? (openBlock(), createBlock(_component_Icon, {
                          key: 2,
                          class: "ml-auto side-menu-arrow",
                          name: "material-symbols:chevron-right-rounded",
                          size: "18"
                        })) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else {
                _push(`<a class="${ssrRenderClass([activeMenu(item2.path), "flex items-center px-6 py-3 rounded-lg cursor-pointer"])}">`);
                if (item2.icon) {
                  _push(ssrRenderComponent(_component_Icon, {
                    name: item2.icon,
                    size: "18"
                  }, null, _parent));
                } else {
                  _push(ssrRenderComponent(_component_Icon, {
                    name: "mdi:circle-slice-8",
                    size: "18"
                  }, null, _parent));
                }
                _push(`<span class="mx-3 font-normal">${ssrInterpolate(item2.title)}</span>`);
                if (item2.child && item2.child.length > 0) {
                  _push(ssrRenderComponent(_component_Icon, {
                    class: "ml-auto side-menu-arrow",
                    name: "material-symbols:chevron-right-rounded",
                    size: "18"
                  }, null, _parent));
                } else {
                  _push(`<!---->`);
                }
                _push(`</a>`);
              }
              if (item2.child) {
                _push(ssrRenderComponent(RSChildItem, {
                  items: item2.child,
                  onOpenMenu: openMenu,
                  onActiveMenu: activeMenu
                }, null, _parent));
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/sidemenu/Item.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const RSItem = _sfc_main$5;
const _sfc_main$4 = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    menuItem: {
      type: Array,
      default: () => Menu,
      required: false
    },
    sidebarToggle: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { siteSettings } = useSiteSettings();
    computed(() => {
      var _a;
      if (((_a = siteSettings.value) == null ? void 0 : _a.siteLogo) && siteSettings.value.siteLogo.trim() !== "") {
        return siteSettings.value.siteLogo;
      }
      return "/img/logo/lzs-logo.png";
    });
    const siteNameToShow = computed(() => {
      return siteSettings.value.siteName || "Jabatan Imigresen Malaysia";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_NuxtScrollbar = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "vertical-menu" }, _attrs))}><div class="py-2 px-4 bg-[rgb(var(--header))]">`);
      _push(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-auto gap-3 justify-center items-center h-[48px]"${_scopeId}><div class="app-logo text-center h-20 flex justify-center items-center gap-3 px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/",
              class: "flex items-center justify-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d, _e, _f;
                if (_push3) {
                  _push3(`<img${ssrRenderAttr("src", _imports_0$1)} class="logo h-10" alt="logo"${_scopeId2}>`);
                  if (((_a = unref(siteSettings).value) == null ? void 0 : _a.showSiteNameInHeader) && ((_b = unref(siteSettings).value) == null ? void 0 : _b.siteName)) {
                    _push3(`<div class="title-text app-title font-semibold text-xl ml-3" style="${ssrRenderStyle({
                      fontSize: (((_c = unref(siteSettings).value) == null ? void 0 : _c.siteNameFontSize) || 18) + "px"
                    })}"${_scopeId2}>${ssrInterpolate(unref(siteNameToShow))}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("img", {
                      src: _imports_0$1,
                      class: "logo h-10",
                      alt: "logo"
                    }),
                    ((_d = unref(siteSettings).value) == null ? void 0 : _d.showSiteNameInHeader) && ((_e = unref(siteSettings).value) == null ? void 0 : _e.siteName) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "title-text app-title font-semibold text-xl ml-3",
                      style: {
                        fontSize: (((_f = unref(siteSettings).value) == null ? void 0 : _f.siteNameFontSize) || 18) + "px"
                      }
                    }, toDisplayString(unref(siteNameToShow)), 5)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-auto gap-3 justify-center items-center h-[48px]" }, [
                createVNode("div", { class: "app-logo text-center h-20 flex justify-center items-center gap-3 px-4" }, [
                  createVNode(_component_nuxt_link, {
                    to: "/",
                    class: "flex items-center justify-center"
                  }, {
                    default: withCtx(() => {
                      var _a, _b, _c;
                      return [
                        createVNode("img", {
                          src: _imports_0$1,
                          class: "logo h-10",
                          alt: "logo"
                        }),
                        ((_a = unref(siteSettings).value) == null ? void 0 : _a.showSiteNameInHeader) && ((_b = unref(siteSettings).value) == null ? void 0 : _b.siteName) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "title-text app-title font-semibold text-xl ml-3",
                          style: {
                            fontSize: (((_c = unref(siteSettings).value) == null ? void 0 : _c.siteNameFontSize) || 18) + "px"
                          }
                        }, toDisplayString(unref(siteNameToShow)), 5)) : createCommentVNode("", true)
                      ];
                    }),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtScrollbar, {
        class: "flex flex-col justify-between my-6",
        style: { "max-height": "82dvh" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(RSItem, { items: __props.menuItem }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(RSItem, { items: __props.menuItem }, null, 8, ["items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/sidemenu/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const RSSideMenu = _sfc_main$4;
const _sfc_main$3 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { width } = useWindowSize();
    const layoutStore = useLayoutStore();
    const mobileWidth = layoutStore.mobileWidth;
    watch(
      () => [width.value],
      ([width2]) => {
        if (width2 <= mobileWidth) {
          document.querySelector(".v-layout").classList.add("menu-hide");
          document.getElementsByClassName("menu-overlay")[0].classList.add("hide");
        } else
          document.querySelector(".v-layout").classList.remove("menu-hide");
      }
    );
    function toggleMenu(event) {
      document.querySelector(".v-layout").classList.toggle("menu-hide");
      document.getElementsByClassName("menu-overlay")[0].classList.toggle("hide");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(RSHeader, { onToggleMenu: toggleMenu }, null, _parent));
      _push(ssrRenderComponent(RSSideMenu, null, null, _parent));
      _push(`<div class="content-page duration-300">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="menu-overlay"></div><!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/vertical/index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const RSVertical = _sfc_main$3;
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/horizontal/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const RSHorizontal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeStore();
    const layoutType = themeStore.layoutType;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-wrapper" }, _attrs))}>`);
      if (unref(layoutType) === "vertical") {
        _push(`<div class="v-layout h-100">`);
        _push(ssrRenderComponent(RSVertical, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(layoutType) === "horizontal") {
        _push(`<div class="h-layout h-100">`);
        _push(ssrRenderComponent(RSHorizontal, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-107b83ed.mjs.map
