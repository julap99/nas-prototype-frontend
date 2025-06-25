import { _ as __nuxt_component_0 } from './RsCard-455c542d.mjs';
import { u as useSiteSettings, _ as __nuxt_component_1$1 } from '../server.mjs';
import { _ as __nuxt_component_0$1 } from './RsButton-55c8bb6a.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-26e5a74c.mjs';
import { ref, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
    const { siteSettings, loading: siteSettingsLoading } = useSiteSettings();
    const formData = ref({
      fullName: "",
      idNumber: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      email: "",
      confirmEmail: "",
      subscribeNewsletter: false,
      agreeTerms: false
    });
    const register = () => {
      console.log("Registration attempted with:", formData.value);
    };
    const handleRecaptcha = (response) => {
      console.log("reCAPTCHA response:", response);
    };
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_rs_card = __nuxt_component_0;
      const _component_FormKit = resolveComponent("FormKit");
      const _component_Icon = __nuxt_component_1$1;
      const _component_rs_button = __nuxt_component_0$1;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-none md:flex justify-center text-center items-center h-screen" }, _attrs))}><div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6 relative">`);
      _push(ssrRenderComponent(_component_rs_card, { class: "h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-8"${_scopeId}><div class="img-container flex justify-center items-center mb-5"${_scopeId}><img${ssrRenderAttr("src", getLoginLogo())}${ssrRenderAttr("alt", getSiteName())} class="max-w-[180px] max-h-[60px] object-contain"${_scopeId}></div><h2 class="mt-4 text-2xl font-bold text-gray-700"${_scopeId}>Daftar Akaun</h2><p class="text-sm text-gray-500"${_scopeId}>Semua medan adalah wajib</p></div>`);
            _push2(ssrRenderComponent(_component_FormKit, {
              type: "form",
              actions: false,
              onSubmit: register
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "text",
                    name: "fullName",
                    placeholder: "Nama Penuh",
                    validation: "required",
                    "validation-messages": {
                      required: "Nama Penuh wajib diisi"
                    }
                  }, {
                    prefixIcon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:user-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "text",
                    name: "idNumber",
                    placeholder: "Nombor Mykad / Nombor Pasport",
                    validation: "required",
                    "validation-messages": {
                      required: "Nombor Mykad / Nombor Pasport wajib diisi"
                    }
                  }, {
                    prefixIcon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:identification-card-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:identification-card-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "tel",
                    name: "phoneNumber",
                    placeholder: "Nombor Telefon",
                    validation: "required",
                    "validation-messages": {
                      required: "Nombor Telefon wajib diisi"
                    }
                  }, {
                    prefixIcon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:device-mobile-camera-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:device-mobile-camera-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "password",
                    name: "password",
                    placeholder: "Kata Laluan",
                    validation: "required",
                    "validation-messages": {
                      required: "Kata Laluan wajib diisi"
                    }
                  }, {
                    prefixIcon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:lock-key-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:lock-key-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "password",
                    name: "confirmPassword",
                    placeholder: "Pengesahan Kata Laluan",
                    validation: "required|confirm",
                    "validation-messages": {
                      required: "Pengesahan Kata Laluan wajib diisi",
                      confirm: "Kata Laluan tidak sepadan"
                    },
                    "validation-rules": {
                      confirm: (value) => value === value.password
                    }
                  }, {
                    prefixIcon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:lock-key-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:lock-key-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "email",
                    name: "email",
                    placeholder: "Emel",
                    validation: "required|email",
                    "validation-messages": {
                      required: "Emel wajib diisi",
                      email: "Format emel tidak sah"
                    }
                  }, {
                    prefixIcon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:envelope-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:envelope-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "email",
                    name: "confirmEmail",
                    placeholder: "Pengesahan Emel",
                    validation: "required|confirm",
                    "validation-messages": {
                      required: "Pengesahan Emel wajib diisi",
                      confirm: "Emel tidak sepadan"
                    },
                    "validation-rules": {
                      confirm: (value) => value === value.email
                    }
                  }, {
                    prefixIcon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:envelope-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:envelope-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex justify-start mb-4 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(RecaptchaV2), { onVerify: handleRecaptcha }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "checkbox",
                    name: "subscribeNewsletter",
                    label: "Melanggan ke newsletter bulanan"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "checkbox",
                    name: "agreeTerms",
                    label: "Setuju dengan terma perkhidmatan",
                    validation: "accepted",
                    "validation-messages": {
                      accepted: "Anda mesti bersetuju dengan terma perkhidmatan"
                    }
                  }, {
                    label: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Setuju dengan <a href="#" class="text-blue-600 ml-1"${_scopeId3}>terma perkhidmatan</a>`);
                      } else {
                        return [
                          createTextVNode(" Setuju dengan "),
                          createVNode("a", {
                            href: "#",
                            class: "text-blue-600 ml-1"
                          }, "terma perkhidmatan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_button, {
                    "btn-type": "submit",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Daftar Akaun `);
                      } else {
                        return [
                          createTextVNode(" Daftar Akaun ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormKit, {
                      type: "text",
                      name: "fullName",
                      placeholder: "Nama Penuh",
                      validation: "required",
                      "validation-messages": {
                        required: "Nama Penuh wajib diisi"
                      }
                    }, {
                      prefixIcon: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:user-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4" }, [
                      createVNode(_component_FormKit, {
                        type: "text",
                        name: "idNumber",
                        placeholder: "Nombor Mykad / Nombor Pasport",
                        validation: "required",
                        "validation-messages": {
                          required: "Nombor Mykad / Nombor Pasport wajib diisi"
                        }
                      }, {
                        prefixIcon: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:identification-card-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_FormKit, {
                        type: "tel",
                        name: "phoneNumber",
                        placeholder: "Nombor Telefon",
                        validation: "required",
                        "validation-messages": {
                          required: "Nombor Telefon wajib diisi"
                        }
                      }, {
                        prefixIcon: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:device-mobile-camera-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4" }, [
                      createVNode(_component_FormKit, {
                        type: "password",
                        name: "password",
                        placeholder: "Kata Laluan",
                        validation: "required",
                        "validation-messages": {
                          required: "Kata Laluan wajib diisi"
                        }
                      }, {
                        prefixIcon: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:lock-key-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_FormKit, {
                        type: "password",
                        name: "confirmPassword",
                        placeholder: "Pengesahan Kata Laluan",
                        validation: "required|confirm",
                        "validation-messages": {
                          required: "Pengesahan Kata Laluan wajib diisi",
                          confirm: "Kata Laluan tidak sepadan"
                        },
                        "validation-rules": {
                          confirm: (value) => value === value.password
                        }
                      }, {
                        prefixIcon: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:lock-key-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ]),
                        _: 1
                      }, 8, ["validation-rules"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4" }, [
                      createVNode(_component_FormKit, {
                        type: "email",
                        name: "email",
                        placeholder: "Emel",
                        validation: "required|email",
                        "validation-messages": {
                          required: "Emel wajib diisi",
                          email: "Format emel tidak sah"
                        }
                      }, {
                        prefixIcon: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:envelope-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_FormKit, {
                        type: "email",
                        name: "confirmEmail",
                        placeholder: "Pengesahan Emel",
                        validation: "required|confirm",
                        "validation-messages": {
                          required: "Pengesahan Emel wajib diisi",
                          confirm: "Emel tidak sepadan"
                        },
                        "validation-rules": {
                          confirm: (value) => value === value.email
                        }
                      }, {
                        prefixIcon: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:envelope-fill",
                            class: "!w-5 !h-5 ml-3 text-gray-500"
                          })
                        ]),
                        _: 1
                      }, 8, ["validation-rules"])
                    ]),
                    createVNode("div", { class: "flex justify-start mb-4 mt-2" }, [
                      createVNode(unref(RecaptchaV2), { onVerify: handleRecaptcha })
                    ]),
                    createVNode(_component_FormKit, {
                      type: "checkbox",
                      name: "subscribeNewsletter",
                      label: "Melanggan ke newsletter bulanan"
                    }),
                    createVNode(_component_FormKit, {
                      type: "checkbox",
                      name: "agreeTerms",
                      label: "Setuju dengan terma perkhidmatan",
                      validation: "accepted",
                      "validation-messages": {
                        accepted: "Anda mesti bersetuju dengan terma perkhidmatan"
                      }
                    }, {
                      label: withCtx(() => [
                        createTextVNode(" Setuju dengan "),
                        createVNode("a", {
                          href: "#",
                          class: "text-blue-600 ml-1"
                        }, "terma perkhidmatan")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, {
                      "btn-type": "submit",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Daftar Akaun ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-center mt-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}> Sudah mempunyai akaun? `);
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/login",
              class: "text-blue-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log Masuk`);
                } else {
                  return [
                    createTextVNode("Log Masuk")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div>`);
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
                createVNode("h2", { class: "mt-4 text-2xl font-bold text-gray-700" }, "Daftar Akaun"),
                createVNode("p", { class: "text-sm text-gray-500" }, "Semua medan adalah wajib")
              ]),
              createVNode(_component_FormKit, {
                type: "form",
                actions: false,
                onSubmit: register
              }, {
                default: withCtx(() => [
                  createVNode(_component_FormKit, {
                    type: "text",
                    name: "fullName",
                    placeholder: "Nama Penuh",
                    validation: "required",
                    "validation-messages": {
                      required: "Nama Penuh wajib diisi"
                    }
                  }, {
                    prefixIcon: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "ph:user-fill",
                        class: "!w-5 !h-5 ml-3 text-gray-500"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4" }, [
                    createVNode(_component_FormKit, {
                      type: "text",
                      name: "idNumber",
                      placeholder: "Nombor Mykad / Nombor Pasport",
                      validation: "required",
                      "validation-messages": {
                        required: "Nombor Mykad / Nombor Pasport wajib diisi"
                      }
                    }, {
                      prefixIcon: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:identification-card-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_FormKit, {
                      type: "tel",
                      name: "phoneNumber",
                      placeholder: "Nombor Telefon",
                      validation: "required",
                      "validation-messages": {
                        required: "Nombor Telefon wajib diisi"
                      }
                    }, {
                      prefixIcon: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:device-mobile-camera-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4" }, [
                    createVNode(_component_FormKit, {
                      type: "password",
                      name: "password",
                      placeholder: "Kata Laluan",
                      validation: "required",
                      "validation-messages": {
                        required: "Kata Laluan wajib diisi"
                      }
                    }, {
                      prefixIcon: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:lock-key-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_FormKit, {
                      type: "password",
                      name: "confirmPassword",
                      placeholder: "Pengesahan Kata Laluan",
                      validation: "required|confirm",
                      "validation-messages": {
                        required: "Pengesahan Kata Laluan wajib diisi",
                        confirm: "Kata Laluan tidak sepadan"
                      },
                      "validation-rules": {
                        confirm: (value) => value === value.password
                      }
                    }, {
                      prefixIcon: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:lock-key-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    }, 8, ["validation-rules"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4" }, [
                    createVNode(_component_FormKit, {
                      type: "email",
                      name: "email",
                      placeholder: "Emel",
                      validation: "required|email",
                      "validation-messages": {
                        required: "Emel wajib diisi",
                        email: "Format emel tidak sah"
                      }
                    }, {
                      prefixIcon: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:envelope-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_FormKit, {
                      type: "email",
                      name: "confirmEmail",
                      placeholder: "Pengesahan Emel",
                      validation: "required|confirm",
                      "validation-messages": {
                        required: "Pengesahan Emel wajib diisi",
                        confirm: "Emel tidak sepadan"
                      },
                      "validation-rules": {
                        confirm: (value) => value === value.email
                      }
                    }, {
                      prefixIcon: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:envelope-fill",
                          class: "!w-5 !h-5 ml-3 text-gray-500"
                        })
                      ]),
                      _: 1
                    }, 8, ["validation-rules"])
                  ]),
                  createVNode("div", { class: "flex justify-start mb-4 mt-2" }, [
                    createVNode(unref(RecaptchaV2), { onVerify: handleRecaptcha })
                  ]),
                  createVNode(_component_FormKit, {
                    type: "checkbox",
                    name: "subscribeNewsletter",
                    label: "Melanggan ke newsletter bulanan"
                  }),
                  createVNode(_component_FormKit, {
                    type: "checkbox",
                    name: "agreeTerms",
                    label: "Setuju dengan terma perkhidmatan",
                    validation: "accepted",
                    "validation-messages": {
                      accepted: "Anda mesti bersetuju dengan terma perkhidmatan"
                    }
                  }, {
                    label: withCtx(() => [
                      createTextVNode(" Setuju dengan "),
                      createVNode("a", {
                        href: "#",
                        class: "text-blue-600 ml-1"
                      }, "terma perkhidmatan")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, {
                    "btn-type": "submit",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Daftar Akaun ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "text-center mt-4" }, [
                createVNode("p", { class: "text-sm text-gray-500" }, [
                  createTextVNode(" Sudah mempunyai akaun? "),
                  createVNode(_component_nuxt_link, {
                    to: "/login",
                    class: "text-blue-600"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Log Masuk")
                    ]),
                    _: 1
                  })
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-15f94c31.mjs.map
