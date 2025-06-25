import { _ as __nuxt_component_0 } from './RsCard-455c542d.mjs';
import { a as _export_sfc, u as useSiteSettings, n as navigateTo, _ as __nuxt_component_1$1 } from '../server.mjs';
import { _ as __nuxt_component_0$1 } from './RsButton-55c8bb6a.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-26e5a74c.mjs';
import { ref, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { siteSettings, loading: siteSettingsLoading } = useSiteSettings();
    const email = ref("");
    const getLoginLogo = () => {
      var _a;
      if (siteSettingsLoading.value) {
        return "/img/logo/corradAF-logo.svg";
      }
      return ((_a = siteSettings.value) == null ? void 0 : _a.siteLoginLogo) || "/img/logo/corradAF-logo.svg";
    };
    const getSiteName = () => {
      var _a;
      if (siteSettingsLoading.value) {
        return "Login Logo";
      }
      return ((_a = siteSettings.value) == null ? void 0 : _a.siteName) || "Login Logo";
    };
    const changePassword = () => {
      console.log("Password change requested for email:", email.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_rs_card = __nuxt_component_0;
      const _component_FormKit = resolveComponent("FormKit");
      const _component_Icon = __nuxt_component_1$1;
      const _component_rs_button = __nuxt_component_0$1;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-none md:flex justify-center text-center items-center h-screen" }, _attrs))} data-v-f0a635a3><div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6 relative" data-v-f0a635a3>`);
      _push(ssrRenderComponent(_component_rs_card, { class: "h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-8" data-v-f0a635a3${_scopeId}><div class="img-container flex justify-center items-center mb-5" data-v-f0a635a3${_scopeId}><img${ssrRenderAttr("src", getLoginLogo())}${ssrRenderAttr("alt", getSiteName())} class="max-w-[180px] max-h-[60px] object-contain" data-v-f0a635a3${_scopeId}></div><h2 class="mt-4 text-2xl font-bold text-gray-700" data-v-f0a635a3${_scopeId}> Tukar kata laluan </h2><p class="text-sm text-gray-500" data-v-f0a635a3${_scopeId}> Kata laluan sementara akan dihantar ke emel anda. </p></div>`);
            _push2(ssrRenderComponent(_component_FormKit, {
              type: "form",
              actions: false,
              onSubmit: changePassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "email",
                    name: "email",
                    placeholder: "Sila masukkan emel anda",
                    validation: "required|email",
                    "validation-messages": {
                      required: "Emel wajib diisi",
                      email: "Format emel tidak sah"
                    }
                  }, {
                    prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:envelope",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:envelope",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormKit, {
                      type: "email",
                      name: "email",
                      placeholder: "Sila masukkan emel anda",
                      validation: "required|email",
                      "validation-messages": {
                        required: "Emel wajib diisi",
                        email: "Format emel tidak sah"
                      }
                    }, {
                      prefix: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:envelope",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, {
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("reset-password"),
              class: "w-full mt-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:lock-fill",
                    class: "mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tukar kata laluan `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:lock-fill",
                      class: "mr-2"
                    }),
                    createTextVNode(" Tukar kata laluan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-4" data-v-f0a635a3${_scopeId}> Kembali ke `);
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/login",
              class: "text-sm text-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` log masuk `);
                } else {
                  return [
                    createTextVNode(" log masuk ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-center mb-8" }, [
                createVNode("div", { class: "img-container flex justify-center items-center mb-5" }, [
                  createVNode("img", {
                    src: getLoginLogo(),
                    alt: getSiteName(),
                    class: "max-w-[180px] max-h-[60px] object-contain",
                    onError: ($event) => $event.target.src = "/img/logo/corradAF-logo.svg"
                  }, null, 40, ["src", "alt", "onError"])
                ]),
                createVNode("h2", { class: "mt-4 text-2xl font-bold text-gray-700" }, " Tukar kata laluan "),
                createVNode("p", { class: "text-sm text-gray-500" }, " Kata laluan sementara akan dihantar ke emel anda. ")
              ]),
              createVNode(_component_FormKit, {
                type: "form",
                actions: false,
                onSubmit: changePassword
              }, {
                default: withCtx(() => [
                  createVNode(_component_FormKit, {
                    type: "email",
                    name: "email",
                    placeholder: "Sila masukkan emel anda",
                    validation: "required|email",
                    "validation-messages": {
                      required: "Emel wajib diisi",
                      email: "Format emel tidak sah"
                    }
                  }, {
                    prefix: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "ph:envelope",
                        class: "!w-5 !h-5 ml-3 text-gray-500"
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_rs_button, {
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("reset-password"),
                class: "w-full mt-6"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "ph:lock-fill",
                    class: "mr-2"
                  }),
                  createTextVNode(" Tukar kata laluan ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode("div", { class: "mt-4" }, [
                createTextVNode(" Kembali ke "),
                createVNode(_component_nuxt_link, {
                  to: "/login",
                  class: "text-sm text-blue-500"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" log masuk ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0a635a3"]]);

export { index as default };
//# sourceMappingURL=index-8c68465f.mjs.map
