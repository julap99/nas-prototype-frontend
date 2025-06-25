import { _ as __nuxt_component_0 } from './RsCard-455c542d.mjs';
import { h as _imports_0$1, n as navigateTo, i as useApi, _ as __nuxt_component_1$1, g as useNuxtApp } from '../server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-26e5a74c.mjs';
import { _ as __nuxt_component_0$2 } from './RsButton-55c8bb6a.mjs';
import { ref, resolveComponent, mergeProps, withCtx, unref, isRef, createVNode, openBlock, createBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { u as useUserStore } from './user-af469779.mjs';
import { RecaptchaV2 } from 'vue3-recaptcha-v2';
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
    const { $swal } = useNuxtApp();
    const username = ref("");
    const password = ref("");
    const userStore = useUserStore();
    const togglePasswordVisibility = ref(false);
    const login = async () => {
      const { auth } = useApi();
      try {
        const res = await auth.login(username.value, password.value);
        const data = res.data;
        if (data.statusCode === 200) {
          userStore.setUsername(data.data.username);
          userStore.setRoles(data.data.roles);
          userStore.setIsAuthenticated(true);
          $swal.fire({
            position: "center",
            title: "Success",
            text: "Login Success",
            icon: "success",
            timer: 2e3,
            showConfirmButton: false
          });
          window.location.href = "/dashboard";
        } else {
          $swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error"
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    const handleWidgetId = (widgetId) => {
      console.log("Widget ID: ", widgetId);
    };
    const handleErrorCalback = () => {
      console.log("Error callback");
    };
    const handleExpiredCallback = () => {
      console.log("Expired callback");
    };
    const handleLoadCallback = (response) => {
      console.log("Load callback", response);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_rs_card = __nuxt_component_0;
      const _component_FormKit = resolveComponent("FormKit");
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_rs_button = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-none md:flex justify-center text-center items-center h-screen" }, _attrs))}><div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6 relative">`);
      _push(ssrRenderComponent(_component_rs_card, { class: "h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="img-container flex justify-center items-center mb-5"${_scopeId}><img${ssrRenderAttr("src", _imports_0$1)} alt="New Agihan Sistem" class="max-w-[180px] max-h-[60px] object-contain"${_scopeId}></div><p class="text-slate-500 text-lg mb-6"${_scopeId}>Log masuk ke akaun anda</p><div class="grid grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_FormKit, {
              type: "text",
              modelValue: unref(username),
              "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
              validation: "required",
              placeholder: "Masukkan ID Pengguna",
              classes: {
                outer: "col-span-2",
                label: "text-left",
                messages: "text-left"
              },
              "validation-messages": {
                required: "ID Pengguna wajib diisi."
              }
            }, {
              prefixIcon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:user-fill",
                    class: "!w-5 !h-5 ml-3 text-gray-500"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:user-fill",
                      class: "!w-5 !h-5 ml-3 text-gray-500"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormKit, {
              type: unref(togglePasswordVisibility) ? "text" : "password",
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              validation: "required",
              placeholder: "Masukkan Kata Laluan",
              classes: {
                outer: "col-span-2",
                label: "text-left",
                messages: "text-left"
              },
              "validation-messages": {
                required: "Kata Laluan wajib diisi."
              }
            }, {
              prefixIcon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:lock-key-fill",
                    class: "!w-5 !h-5 ml-3 text-gray-500"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:lock-key-fill",
                      class: "!w-5 !h-5 ml-3 text-gray-500"
                    })
                  ];
                }
              }),
              suffix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-gray-100 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-900 h-full rounded-r-md p-3 flex justify-center items-center cursor-pointer"${_scopeId2}>`);
                  if (!unref(togglePasswordVisibility)) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "ion:eye-outline",
                      size: "19"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "ion:eye-off-outline",
                      size: "19"
                    }, null, _parent3, _scopeId2));
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "bg-gray-100 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-900 h-full rounded-r-md p-3 flex justify-center items-center cursor-pointer",
                      onClick: ($event) => togglePasswordVisibility.value = !unref(togglePasswordVisibility)
                    }, [
                      !unref(togglePasswordVisibility) ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        name: "ion:eye-outline",
                        size: "19"
                      })) : (openBlock(), createBlock(_component_Icon, {
                        key: 1,
                        name: "ion:eye-off-outline",
                        size: "19"
                      }))
                    ], 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="col-span-2 mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(RecaptchaV2), {
              onWidgetId: handleWidgetId,
              onErrorCallback: handleErrorCalback,
              onExpiredCallback: handleExpiredCallback,
              onLoadCallback: handleLoadCallback
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "col-span-2 flex items-center justify-end h-5 mt-1 text-primary hover:underline mb-5",
              to: "forgot-password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lupa Kata Laluan? `);
                } else {
                  return [
                    createTextVNode(" Lupa Kata Laluan? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormKit, {
              type: "button",
              "input-class": "w-full",
              "outer-class": "col-span-2",
              onClick: login
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Masuk `);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:caret-circle-right",
                    class: "!w-5 !h-5 ml-1"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Log Masuk "),
                    createVNode(_component_Icon, {
                      name: "ph:caret-circle-right",
                      class: "!w-5 !h-5 ml-1"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-center items-center"${_scopeId}><hr class="w-full"${_scopeId}><p class="w-full !text-gray-400"${_scopeId}>Tiada akaun?</p><hr class="w-full"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/register"),
              class: "w-full !bg-gray-100 !text-gray-600 border mt-5"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Daftar / Log masuk kali pertama `);
                } else {
                  return [
                    createTextVNode(" Daftar / Log masuk kali pertama ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "img-container flex justify-center items-center mb-5" }, [
                createVNode("img", {
                  src: _imports_0$1,
                  alt: "New Agihan Sistem",
                  class: "max-w-[180px] max-h-[60px] object-contain"
                })
              ]),
              createVNode("p", { class: "text-slate-500 text-lg mb-6" }, "Log masuk ke akaun anda"),
              createVNode("div", { class: "grid grid-cols-2" }, [
                createVNode(_component_FormKit, {
                  type: "text",
                  modelValue: unref(username),
                  "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                  validation: "required",
                  placeholder: "Masukkan ID Pengguna",
                  classes: {
                    outer: "col-span-2",
                    label: "text-left",
                    messages: "text-left"
                  },
                  "validation-messages": {
                    required: "ID Pengguna wajib diisi."
                  }
                }, {
                  prefixIcon: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "ph:user-fill",
                      class: "!w-5 !h-5 ml-3 text-gray-500"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "validation-messages"]),
                createVNode(_component_FormKit, {
                  type: unref(togglePasswordVisibility) ? "text" : "password",
                  modelValue: unref(password),
                  "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                  validation: "required",
                  placeholder: "Masukkan Kata Laluan",
                  classes: {
                    outer: "col-span-2",
                    label: "text-left",
                    messages: "text-left"
                  },
                  "validation-messages": {
                    required: "Kata Laluan wajib diisi."
                  }
                }, {
                  prefixIcon: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "ph:lock-key-fill",
                      class: "!w-5 !h-5 ml-3 text-gray-500"
                    })
                  ]),
                  suffix: withCtx(() => [
                    createVNode("div", {
                      class: "bg-gray-100 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-900 h-full rounded-r-md p-3 flex justify-center items-center cursor-pointer",
                      onClick: ($event) => togglePasswordVisibility.value = !unref(togglePasswordVisibility)
                    }, [
                      !unref(togglePasswordVisibility) ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        name: "ion:eye-outline",
                        size: "19"
                      })) : (openBlock(), createBlock(_component_Icon, {
                        key: 1,
                        name: "ion:eye-off-outline",
                        size: "19"
                      }))
                    ], 8, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["type", "modelValue", "onUpdate:modelValue", "validation-messages"]),
                createVNode("div", { class: "col-span-2 mb-4" }, [
                  createVNode(unref(RecaptchaV2), {
                    onWidgetId: handleWidgetId,
                    onErrorCallback: handleErrorCalback,
                    onExpiredCallback: handleExpiredCallback,
                    onLoadCallback: handleLoadCallback
                  })
                ]),
                createVNode(_component_NuxtLink, {
                  class: "col-span-2 flex items-center justify-end h-5 mt-1 text-primary hover:underline mb-5",
                  to: "forgot-password"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Lupa Kata Laluan? ")
                  ]),
                  _: 1
                }),
                createVNode(_component_FormKit, {
                  type: "button",
                  "input-class": "w-full",
                  "outer-class": "col-span-2",
                  onClick: login
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Log Masuk "),
                    createVNode(_component_Icon, {
                      name: "ph:caret-circle-right",
                      class: "!w-5 !h-5 ml-1"
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("hr", { class: "w-full" }),
                createVNode("p", { class: "w-full !text-gray-400" }, "Tiada akaun?"),
                createVNode("hr", { class: "w-full" })
              ]),
              createVNode(_component_rs_button, {
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/register"),
                class: "w-full !bg-gray-100 !text-gray-600 border mt-5"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Daftar / Log masuk kali pertama ")
                ]),
                _: 1
              }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-1470c0e5.mjs.map
