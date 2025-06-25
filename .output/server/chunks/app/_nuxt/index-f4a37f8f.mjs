import { _ as __nuxt_component_0 } from './Breadcrumb-ad3969ad.mjs';
import { _ as __nuxt_component_0$1 } from './RsCard-455c542d.mjs';
import { a as _export_sfc, _ as __nuxt_component_1$1 } from '../server.mjs';
import { _ as __nuxt_component_0$2 } from './RsButton-55c8bb6a.mjs';
import { _ as __nuxt_component_4 } from './RsBadge-e0a22fbb.mjs';
import { ref, withCtx, createVNode, createTextVNode, toDisplayString, unref, openBlock, createBlock, Fragment, renderList, Transition, createCommentVNode, isRef, withDirectives, vModelText, vModelSelect, vModelRadio, vModelCheckbox, useSSRContext, nextTick, mergeProps, watch, renderSlot, useSlots, provide, inject, resolveDirective, getCurrentInstance, onUnmounted } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderAttr, ssrLooseEqual, ssrLooseContain, ssrRenderSlot, ssrRenderTeleport, ssrRenderStyle, ssrGetDirectiveProps } from 'vue/server-renderer';
import __nuxt_component_1 from './NuxtScrollbar-ce765c06.mjs';
import { _ as __nuxt_component_0$3 } from './client-only-29ef7f45.mjs';
import { directive } from 'vue3-click-away';
import './nuxt-link-26e5a74c.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
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

const _sfc_main$9 = {
  __name: "RsAlert",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: null
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    autoDismiss: {
      type: Boolean,
      default: false
    },
    timer: {
      type: Number,
      default: 1e3
    }
  },
  setup(__props) {
    const props = __props;
    const showComponent = ref(props.show);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      if (unref(showComponent)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["alert", {
            "alert-primary": __props.variant === "primary",
            "alert-secondary": __props.variant === "secondary",
            "alert-info": __props.variant === "info",
            "alert-success": __props.variant === "success",
            "alert-warning": __props.variant === "warning",
            "alert-danger": __props.variant === "danger"
          }]
        }, _attrs))}><div class="flex items-center gap-2">`);
        if (__props.icon) {
          _push(ssrRenderComponent(_component_Icon, { name: __props.icon }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div><button>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-close",
          size: "14"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsAlert.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_5 = _sfc_main$9;
const _sfc_main$8 = {
  __name: "RsModal",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    dialogClass: {
      type: String,
      default: ""
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "top"
    },
    hideOverlay: {
      type: Boolean,
      default: false
    },
    okOnly: {
      type: Boolean,
      default: false
    },
    okTitle: {
      type: String,
      default: "OK"
    },
    cancelOnly: {
      type: Boolean,
      default: false
    },
    cancelTitle: {
      type: String,
      default: "Cancel"
    },
    okCallback: {
      type: Function,
      default: () => {
      }
    },
    cancelCallback: {
      type: Function,
      default: () => {
      }
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    overlayClose: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: "70vh"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const closeModal = () => {
      emits("update:modelValue", false);
    };
    const validateCancelCallback = () => {
      if (props.cancelCallback == "() => {}")
        closeModal();
      else
        props.cancelCallback();
    };
    watch(
      () => props.modelValue,
      (val) => {
        if (val)
          document.body.style.overflow = "hidden";
        else
          document.body.style.overflow = "auto";
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtScrollbar = __nuxt_component_1;
      const _component_rs_button = __nuxt_component_0$2;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<!--[-->`);
        if (__props.modelValue) {
          _push2(`<div style="${ssrRenderStyle({ "z-index": "1000" })}" class="${ssrRenderClass([{
            "modal-top": __props.position == "top",
            "modal-center": __props.position == "center",
            "modal-end": __props.position == "bottom",
            "modal-hide-overlay": __props.hideOverlay
          }, "modal"])}"><div style="${ssrRenderStyle([
            __props.modelValue ? null : { display: "none" },
            {
              width: __props.size == "sm" ? "300px" : __props.size == "md" ? "500px" : "800px"
            }
          ])}" class="${ssrRenderClass([__props.dialogClass, "modal-dialog"])}"><div class="modal-content"><div class="modal-header">`);
          if (!_ctx.$slots.header) {
            _push2(`<h4>${ssrInterpolate(__props.title)}</h4>`);
          } else {
            _push2(`<!---->`);
          }
          ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent);
          _push2(ssrRenderComponent(_component_Icon, {
            onClick: closeModal,
            class: "hover:text-gray-800 cursor-pointer",
            name: "ic:round-close"
          }, null, _parent));
          _push2(`</div><div class="modal-body">`);
          _push2(ssrRenderComponent(_component_NuxtScrollbar, {
            style: {
              "max-height": __props.height
            }
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "body", {}, null, _push3, _parent2, _scopeId);
                if (!_ctx.$slots.body) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent2, _scopeId);
                } else {
                  _push3(`<!---->`);
                }
              } else {
                return [
                  renderSlot(_ctx.$slots, "body"),
                  !_ctx.$slots.body ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true)
                ];
              }
            }),
            _: 3
          }, _parent));
          _push2(`</div>`);
          if (!__props.hideFooter) {
            _push2(`<div class="modal-footer">`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent);
            if (!_ctx.$slots.footer && !__props.okOnly) {
              _push2(ssrRenderComponent(_component_rs_button, {
                onClick: validateCancelCallback,
                variant: "primary-text"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.cancelTitle)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.cancelTitle), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push2(`<!---->`);
            }
            if (!_ctx.$slots.footer && !__props.cancelOnly) {
              _push2(ssrRenderComponent(_component_rs_button, { onClick: __props.okCallback }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.okTitle)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.okTitle), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<!--]-->`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsModal.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_6 = _sfc_main$8;
const _sfc_main$7 = {
  __name: "RsTab",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary"
    },
    type: {
      type: String,
      default: "default"
    },
    vertical: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: false
    },
    justify: {
      type: String,
      default: "left"
    }
  },
  setup(__props) {
    var _a;
    const slots = useSlots();
    const tabs = ref(((_a = slots.default()) == null ? void 0 : _a.map((tab) => tab.props).filter((props) => props && props.title)) || []);
    const selectedTitle = ref(tabs.value.length > 0 ? tabs.value[0]["title"] : "");
    tabs.value.forEach((tab) => {
      if (typeof tab.active !== "undefined" && tab.active) {
        selectedTitle.value = tab.title;
      }
    });
    provide("selectedTitle", selectedTitle);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsTab.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_7 = _sfc_main$7;
const _sfc_main$6 = {
  __name: "RsTabItem",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const selectedTitle = inject("selectedTitle");
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(selectedTitle) === __props.title) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "tab-pane" }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsTabItem.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_8 = _sfc_main$6;
const _sfc_main$5 = {
  __name: "RsCollapse",
  __ssrInlineRender: true,
  props: {
    accordion: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_uid = resolveDirective("uid");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["accordion", {
          "accordion-border": __props.type === "border"
        }]
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_uid)))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsCollapse.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_9 = _sfc_main$5;
const _sfc_main$4 = {
  __name: "RsCollapseItem",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    const collapseGroup = ref(null);
    ref(null);
    const instance = getCurrentInstance();
    instance.parent.props.accordion;
    const type = ref(instance.parent.props.type);
    ref(0);
    const maxHeight = ref(60);
    watch(
      () => instance.parent.props.type,
      (newValue) => {
        type.value = newValue;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_uid = resolveDirective("uid");
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "collapseGroup",
        ref: collapseGroup,
        class: ["accordion-group", {
          "accordion-default": unref(type) === "default",
          "accordion-border": unref(type) === "border",
          "accordion-card": unref(type) === "card"
        }],
        style: `max-height: ${unref(maxHeight)}px; transition-property: max-height`
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_uid)))}><div class="accordion-header">`);
      if (!!_ctx.$slots.title) {
        ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      } else {
        _push(`<span>${ssrInterpolate(__props.title)}</span>`);
      }
      _push(`</div><div class="accordion-body">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsCollapseItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_10 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "RsDropdown",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Default"
    },
    variant: {
      type: String,
      default: "primary"
    },
    position: {
      type: String,
      default: "bottom"
    },
    textAlign: {
      type: String,
      default: "left"
    },
    size: {
      type: String,
      default: "md"
    },
    itemSize: {
      type: String,
      default: "10rem"
    }
  },
  setup(__props) {
    const props = __props;
    const isOpen = ref(false);
    const dropdownRef = ref(null);
    let originalPosition = null;
    let lastKnownPosition = null;
    const closeMenu = (event) => {
      isOpen.value = false;
    };
    watch(isOpen, (newValue) => {
      if (newValue) {
        positionDropdown();
      }
    });
    const positionDropdown = () => {
      const dropdownElement = dropdownRef.value;
      const dropdownSection = dropdownElement.querySelector(".dropdown-section");
      if (!dropdownElement || !dropdownSection)
        return;
      const dropdownRect = dropdownElement.getBoundingClientRect();
      const dropdownSectionRect = dropdownSection.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const rightOverflow = dropdownRect.right + dropdownSectionRect.width - viewportWidth;
      const leftOverflow = dropdownRect.left - dropdownSectionRect.width;
      if (rightOverflow > 0) {
        dropdownSection.style.right = "0";
        dropdownSection.style.left = "unset";
      } else if (leftOverflow < 0) {
        dropdownSection.style.left = "0";
        dropdownSection.style.right = "unset";
      }
      const bottomOverflow = dropdownRect.bottom + dropdownSectionRect.height - viewportHeight;
      const topOverflow = dropdownRect.top - dropdownSectionRect.height;
      if (bottomOverflow > 0) {
        dropdownSection.style.bottom = "100%";
        dropdownSection.style.top = "unset";
      } else if (topOverflow < 0) {
        dropdownSection.style.top = "100%";
        dropdownSection.style.bottom = "unset";
      }
      const newPosition = dropdownSection.getBoundingClientRect();
      if (!lastKnownPosition || JSON.stringify(lastKnownPosition) !== JSON.stringify(newPosition)) {
        lastKnownPosition = newPosition;
      }
      if (isOpen.value && originalPosition && isOutOfViewport(dropdownSection, originalPosition)) {
        dropdownSection.style.top = originalPosition.top + "px";
        dropdownSection.style.left = originalPosition.left + "px";
        lastKnownPosition = originalPosition;
      }
    };
    const isOutOfViewport = (element, position) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      return position.left < 0 || position.right > viewportWidth || position.top < 0 || position.bottom > viewportHeight;
    };
    const handleResize = () => {
      if (isOpen.value) {
        positionDropdown();
      }
    };
    const handleScroll = () => {
      if (isOpen.value) {
        positionDropdown();
      }
    };
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "dropdown",
        ref_key: "dropdownRef",
        ref: dropdownRef
      }, _attrs, ssrGetDirectiveProps(_ctx, unref(directive), closeMenu)))}><button class="${ssrRenderClass([{
        "button-sm": __props.size === "sm",
        "button-md": __props.size === "md",
        "button-lg": __props.size === "lg",
        // Filled Button
        "button-primary": __props.variant === "primary",
        "button-secondary": __props.variant === "secondary",
        "button-info": __props.variant === "info",
        "button-success": __props.variant === "success",
        "button-warning": __props.variant === "warning",
        "button-danger": __props.variant === "danger",
        // Outline Button
        "outline-primary": __props.variant === "primary-outline",
        "outline-secondary": __props.variant === "secondary-outline",
        "outline-info": __props.variant === "info-outline",
        "outline-success": __props.variant === "success-outline",
        "outline-warning": __props.variant === "warning-outline",
        "outline-danger": __props.variant === "danger-outline",
        //Text Button
        "texts-primary": __props.variant === "primary-text",
        "texts-secondary": __props.variant === "secondary-text",
        "texts-info": __props.variant === "info-text",
        "texts-success": __props.variant === "success-text",
        "texts-warning": __props.variant === "warning-text",
        "texts-danger": __props.variant === "danger-text"
      }, "button"])}" type="button">`);
      if (_ctx.$slots.title) {
        ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      } else {
        _push(`<span>${ssrInterpolate(props.title)}</span>`);
      }
      if (__props.position === "bottom") {
        _push(ssrRenderComponent(_component_Icon, { name: "ic:outline-keyboard-arrow-down" }, null, _parent));
      } else if (__props.position === "top") {
        _push(ssrRenderComponent(_component_Icon, { name: "ic:outline-keyboard-arrow-up" }, null, _parent));
      } else if (__props.position === "left") {
        _push(ssrRenderComponent(_component_Icon, { name: "ic:outline-chevron-left" }, null, _parent));
      } else if (__props.position === "right") {
        _push(ssrRenderComponent(_component_Icon, { name: "ic:outline-chevron-right" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button><section class="${ssrRenderClass([{
        "list-bottom-sm": __props.position == "bottom" && __props.size == "sm",
        "list-bottom-md": __props.position == "bottom" && __props.size == "md",
        "list-bottom-lg": __props.position == "bottom" && __props.size == "lg",
        "list-top-sm": __props.position == "top" && __props.size == "sm",
        "list-top-md": __props.position == "top" && __props.size == "md",
        "list-top-lg": __props.position == "top" && __props.size == "lg",
        "list-left": __props.position == "left",
        "list-right": __props.position == "right",
        "list-align-right": (__props.position == "bottom" || __props.position == "top") && __props.textAlign == "right"
      }, "dropdown-section"])}" style="${ssrRenderStyle([
        `min-width: ${__props.itemSize}`,
        unref(isOpen) ? null : { display: "none" }
      ])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsDropdown.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_11 = _sfc_main$3;
const _sfc_main$2 = {
  __name: "RsDropdownItem",
  __ssrInlineRender: true,
  props: {
    divider: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(__props, { emit: emits }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.divider) {
        _push(`<hr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="dropdown-item">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsDropdownItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_12 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "RsProgressBar",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    variant: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "md"
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "progress-wrapper" }, _attrs))}><div class="progress-label">${ssrInterpolate(__props.label)}</div><div class="${ssrRenderClass([{
        "progress-sm": __props.size === "sm",
        "progress-md": __props.size === "md",
        "progress-lg": __props.size === "lg",
        "progress-primary": __props.variant == "primary",
        "progress-secondary": __props.variant == "secondary",
        "progress-success": __props.variant == "info",
        "progress-info": __props.variant == "success",
        "progress-warning": __props.variant == "warning",
        "progress-danger": __props.variant == "danger"
      }, "progress"])}"><div class="${ssrRenderClass([{
        primary: __props.variant == "primary",
        secondary: __props.variant == "secondary",
        info: __props.variant == "info",
        success: __props.variant == "success",
        warning: __props.variant == "warning",
        danger: __props.variant == "danger"
      }, "progress-bar"])}" style="${ssrRenderStyle({ width: __props.value / __props.max * 100 + "%" })}">`);
      if (__props.showValue) {
        _push(`<span class="text-xs">${ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsProgressBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_13 = _sfc_main$1;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const tooltips = ref({});
    ref({});
    const showModal = ref(false);
    const showFormModal = ref(false);
    const showColumnMenu = ref(false);
    const currentPage = ref(1);
    const tableFields = ref([
      { key: "id", label: "ID", visible: true, sortable: true },
      { key: "nama", label: "Nama", visible: true, sortable: true },
      { key: "tarikh", label: "Tarikh", visible: true, sortable: true },
      { key: "jenisBantuan", label: "Jenis Bantuan", visible: true, sortable: true },
      { key: "status", label: "Status", visible: true, sortable: true },
      { key: "actions", label: "Tindakan", visible: true, sortable: false }
    ]);
    const sortConfig = ref({ key: "id", direction: "asc" });
    const tableData = ref([
      { id: "APP-001", nama: "Ahmad bin Hassan", tarikh: "2023-05-12", jenisBantuan: "Bantuan Perubatan", status: "LULUS" },
      { id: "APP-002", nama: "Siti Aminah", tarikh: "2023-05-13", jenisBantuan: "Bantuan Pendidikan", status: "MENUNGGU" },
      { id: "APP-003", nama: "Mohammed Ismail", tarikh: "2023-05-14", jenisBantuan: "Bantuan Rumah", status: "DALAM PROSES" },
      { id: "APP-004", nama: "Roslinda Othman", tarikh: "2023-05-15", jenisBantuan: "Bantuan Perubatan", status: "DITOLAK" }
    ]);
    const searchTerm = ref("");
    const advancedSearchVisible = ref(false);
    const advancedSearch = ref({
      type: "all",
      status: "all",
      year: "all",
      minAmount: "",
      maxAmount: ""
    });
    const appliedFilters = ref([
      { id: 1, label: "Bantuan Perubatan", type: "jenis" },
      { id: 2, label: "Aktif", type: "status" }
    ]);
    const personalInfo = ref({
      fullName: "",
      idNumber: "",
      birthDate: "",
      gender: "lelaki"
    });
    const addressInfo = ref({
      street: "",
      city: "",
      postalCode: "",
      state: ""
    });
    const contactInfo = ref({
      email: "",
      phone: "",
      preferredContact: []
    });
    const stateOptions = [
      { label: "Selangor", value: "selangor" },
      { label: "Kuala Lumpur", value: "kuala_lumpur" },
      { label: "Johor", value: "johor" },
      { label: "Pulau Pinang", value: "pulau_pinang" },
      { label: "Sabah", value: "sabah" },
      { label: "Sarawak", value: "sarawak" },
      { label: "Perak", value: "perak" },
      { label: "Negeri Sembilan", value: "negeri_sembilan" },
      { label: "Pahang", value: "pahang" },
      { label: "Terengganu", value: "terengganu" },
      { label: "Kelantan", value: "kelantan" },
      { label: "Perlis", value: "perlis" },
      { label: "Melaka", value: "melaka" },
      { label: "Kedah", value: "kedah" }
    ];
    const contactMethodOptions = [
      { label: "Email", value: "email" },
      { label: "SMS", value: "sms" },
      { label: "Panggilan Telefon", value: "phone" },
      { label: "WhatsApp", value: "whatsapp" }
    ];
    const longContentRadioOptions = [
      {
        label: "Permohonan Secara Bulanan: Pemohon akan menerima bantuan secara bulanan selama tempoh yang diluluskan. Bayaran akan dibuat pada 1hb setiap bulan. Pemohon perlu mengemukakan laporan penggunaan pada setiap 3 bulan.",
        value: "monthly"
      },
      {
        label: "Permohonan Sekali Bayar: Pemohon akan menerima jumlah bantuan sekaligus dalam satu bayaran. Laporan penggunaan perlu dikemukakan dalam tempoh 30 hari selepas menerima bayaran.",
        value: "one_time"
      },
      {
        label: "Permohonan Berperingkat: Bantuan akan diberi dalam 3 peringkat berdasarkan kemajuan yang dicapai. Setiap peringkat perlu dilengkapkan dan disahkan sebelum pembayaran berikutnya dibuat.",
        value: "staged"
      }
    ];
    ref(1);
    const draftSaved = ref(false);
    const savingDraft = ref(false);
    const autosaveEnabled = ref(true);
    const lastSaved = ref(null);
    const failedToSave = ref(false);
    const saveDraft = () => {
      savingDraft.value = true;
      setTimeout(() => {
        savingDraft.value = false;
        draftSaved.value = true;
        lastSaved.value = /* @__PURE__ */ new Date();
        failedToSave.value = false;
        setTimeout(() => {
          draftSaved.value = false;
        }, 3e3);
      }, 1e3);
    };
    const simulateFailedSave = () => {
      savingDraft.value = true;
      setTimeout(() => {
        savingDraft.value = false;
        failedToSave.value = true;
        setTimeout(() => {
          failedToSave.value = false;
        }, 5e3);
      }, 1e3);
    };
    const toggleColumn = (key) => {
      const field = tableFields.value.find((f) => f.key === key);
      if (field) {
        field.visible = !field.visible;
      }
    };
    const sortTable = (key) => {
      var _a;
      if (!((_a = tableFields.value.find((f) => f.key === key)) == null ? void 0 : _a.sortable))
        return;
      if (sortConfig.value.key === key) {
        sortConfig.value.direction = sortConfig.value.direction === "asc" ? "desc" : "asc";
      } else {
        sortConfig.value.key = key;
        sortConfig.value.direction = "asc";
      }
    };
    const getSortIcon = (key) => {
      if (sortConfig.value.key !== key)
        return "ic:outline-unfold-more";
      return sortConfig.value.direction === "asc" ? "ic:outline-arrow-drop-up" : "ic:outline-arrow-drop-down";
    };
    const changePage = (page) => {
      currentPage.value = page;
    };
    const removeFilter = (filterId) => {
      appliedFilters.value = appliedFilters.value.filter((f) => f.id !== filterId);
    };
    const clearAllFilters = () => {
      appliedFilters.value = [];
      advancedSearch.value = {
        type: "all",
        status: "all",
        year: "all",
        minAmount: "",
        maxAmount: ""
      };
    };
    const modalDemoOpen = ref(false);
    const modalFormOpen = ref(false);
    const modalHasChanges = ref(false);
    const modalWarningOpen = ref(false);
    const returnFocusElement = ref(null);
    const modalFormData = ref({
      name: "",
      email: "",
      status: "active"
    });
    const originalFormData = ref({});
    const openModalDemo = (modalType, event) => {
      if (modalType === "form") {
        originalFormData.value = { ...modalFormData.value };
        modalFormOpen.value = true;
        returnFocusElement.value = event == null ? void 0 : event.target;
        nextTick(() => {
          var _a;
          (_a = document.getElementById("modal-form-name")) == null ? void 0 : _a.focus();
        });
      } else if (modalType === "info") {
        modalDemoOpen.value = true;
        returnFocusElement.value = event == null ? void 0 : event.target;
      }
    };
    const tryCloseModalForm = () => {
      const hasChanges = modalFormData.value.name !== originalFormData.value.name || modalFormData.value.email !== originalFormData.value.email || modalFormData.value.status !== originalFormData.value.status;
      if (hasChanges) {
        modalWarningOpen.value = true;
        modalHasChanges.value = true;
      } else {
        closeModalForm();
      }
    };
    const closeModalForm = () => {
      modalFormOpen.value = false;
      modalWarningOpen.value = false;
      modalHasChanges.value = false;
      nextTick(() => {
        var _a;
        (_a = returnFocusElement.value) == null ? void 0 : _a.focus();
      });
    };
    const saveModalForm = () => {
      originalFormData.value = { ...modalFormData.value };
      modalFormOpen.value = false;
      nextTick(() => {
        var _a;
        (_a = returnFocusElement.value) == null ? void 0 : _a.focus();
      });
    };
    const closeModalDemo = () => {
      modalDemoOpen.value = false;
      nextTick(() => {
        var _a;
        (_a = returnFocusElement.value) == null ? void 0 : _a.focus();
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutsBreadcrumb = __nuxt_component_0;
      const _component_rs_card = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      const _component_rs_button = __nuxt_component_0$2;
      const _component_rs_badge = __nuxt_component_4;
      const _component_rs_alert = __nuxt_component_5;
      const _component_RsCard = __nuxt_component_0$1;
      const _component_rs_modal = __nuxt_component_6;
      const _component_RsBadge = __nuxt_component_4;
      const _component_RsButton = __nuxt_component_0$2;
      const _component_rs_tab = __nuxt_component_7;
      const _component_rs_tab_item = __nuxt_component_8;
      const _component_rs_collapse = __nuxt_component_9;
      const _component_rs_collapse_item = __nuxt_component_10;
      const _component_rs_dropdown = __nuxt_component_11;
      const _component_rs_dropdown_item = __nuxt_component_12;
      const _component_rs_progress_bar = __nuxt_component_13;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ebdcd06d>`);
      _push(ssrRenderComponent(_component_LayoutsBreadcrumb, null, null, _parent));
      _push(`<h1 class="text-2xl font-bold mb-6" data-v-ebdcd06d>Kitchen Sink</h1><p class="mb-8" data-v-ebdcd06d>A comprehensive showcase of all UI components and styles following the LZS Zakat Management UI/UX System Guidelines.</p>`);
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-text-fields",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Typography Standards </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-text-fields",
                  class: "mr-2"
                }),
                createTextVNode(" Typography Standards ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Typography establishes a clear hierarchy and maximizes readability using the Inter font family with sans-serif fallback.</p><div class="space-y-6" data-v-ebdcd06d${_scopeId}><div class="p-4 border border-gray-200 rounded-md" data-v-ebdcd06d${_scopeId}><h1 class="text-2xl font-bold mb-4" data-v-ebdcd06d${_scopeId}>Page Titles (H1): 24px, Bold (font-weight: 700)</h1><h2 class="text-xl font-semibold mb-3" data-v-ebdcd06d${_scopeId}>Section Headers (H2): 20px, Semibold (font-weight: 600)</h2><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Subsection Headers (H3): 16px, Semibold (font-weight: 600)</h3><p class="text-sm mb-2" data-v-ebdcd06d${_scopeId}>Body Text: 14px, Regular (font-weight: 400)</p><p class="text-xs text-gray-600" data-v-ebdcd06d${_scopeId}>Captions/Helper Text: 12px, Regular with increased line height (1.5) for legibility</p><div class="mt-6 p-3 bg-gray-50 rounded" data-v-ebdcd06d${_scopeId}><p class="text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Font Family:</p><code class="text-xs bg-gray-100 p-1 rounded" data-v-ebdcd06d${_scopeId}>font-family: &#39;Inter&#39;, -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, Helvetica, Arial, sans-serif;</code><p class="text-sm font-medium mt-3 mb-1" data-v-ebdcd06d${_scopeId}>Line Heights:</p><ul class="text-xs space-y-1" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Headings: 1.2-1.3 (tight)</li><li data-v-ebdcd06d${_scopeId}>Body text: 1.5 (improved readability)</li><li data-v-ebdcd06d${_scopeId}>Small text: 1.5-1.6 (enhanced legibility)</li></ul><p class="text-sm font-medium mt-3 mb-1" data-v-ebdcd06d${_scopeId}>Letter Spacing:</p><ul class="text-xs space-y-1" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Headings: -0.01em (slightly tighter)</li><li data-v-ebdcd06d${_scopeId}>Body text: normal</li><li data-v-ebdcd06d${_scopeId}>All-caps text: 0.05em (slightly wider)</li></ul></div></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Typography establishes a clear hierarchy and maximizes readability using the Inter font family with sans-serif fallback."),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "p-4 border border-gray-200 rounded-md" }, [
                  createVNode("h1", { class: "text-2xl font-bold mb-4" }, "Page Titles (H1): 24px, Bold (font-weight: 700)"),
                  createVNode("h2", { class: "text-xl font-semibold mb-3" }, "Section Headers (H2): 20px, Semibold (font-weight: 600)"),
                  createVNode("h3", { class: "text-base font-semibold mb-2" }, "Subsection Headers (H3): 16px, Semibold (font-weight: 600)"),
                  createVNode("p", { class: "text-sm mb-2" }, "Body Text: 14px, Regular (font-weight: 400)"),
                  createVNode("p", { class: "text-xs text-gray-600" }, "Captions/Helper Text: 12px, Regular with increased line height (1.5) for legibility"),
                  createVNode("div", { class: "mt-6 p-3 bg-gray-50 rounded" }, [
                    createVNode("p", { class: "text-sm font-medium mb-1" }, "Font Family:"),
                    createVNode("code", { class: "text-xs bg-gray-100 p-1 rounded" }, "font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"),
                    createVNode("p", { class: "text-sm font-medium mt-3 mb-1" }, "Line Heights:"),
                    createVNode("ul", { class: "text-xs space-y-1" }, [
                      createVNode("li", null, "Headings: 1.2-1.3 (tight)"),
                      createVNode("li", null, "Body text: 1.5 (improved readability)"),
                      createVNode("li", null, "Small text: 1.5-1.6 (enhanced legibility)")
                    ]),
                    createVNode("p", { class: "text-sm font-medium mt-3 mb-1" }, "Letter Spacing:"),
                    createVNode("ul", { class: "text-xs space-y-1" }, [
                      createVNode("li", null, "Headings: -0.01em (slightly tighter)"),
                      createVNode("li", null, "Body text: normal"),
                      createVNode("li", null, "All-caps text: 0.05em (slightly wider)")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-touch-app",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Button Types and Variants </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-touch-app",
                  class: "mr-2"
                }),
                createTextVNode(" Button Types and Variants ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Buttons are a primary means of user interaction and must be implemented using the framework&#39;s <code data-v-ebdcd06d${_scopeId}>&lt;Button&gt;</code> component.</p><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Button Colors</h3><div class="flex flex-wrap items-center gap-4 mb-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary`);
                } else {
                  return [
                    createTextVNode("Primary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "secondary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Secondary`);
                } else {
                  return [
                    createTextVNode("Secondary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Info`);
                } else {
                  return [
                    createTextVNode("Info")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "success" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Success`);
                } else {
                  return [
                    createTextVNode("Success")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Warning`);
                } else {
                  return [
                    createTextVNode("Warning")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger`);
                } else {
                  return [
                    createTextVNode("Danger")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Button Styles</h3><div class="mb-4" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-2" data-v-ebdcd06d${_scopeId}>Filled (Default)</h4><div class="flex flex-wrap items-center gap-4 mb-2" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary`);
                } else {
                  return [
                    createTextVNode("Primary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger`);
                } else {
                  return [
                    createTextVNode("Danger")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-4" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-2" data-v-ebdcd06d${_scopeId}>Outline</h4><div class="flex flex-wrap items-center gap-4 mb-2" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary-outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary Outline`);
                } else {
                  return [
                    createTextVNode("Primary Outline")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "danger-outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger Outline`);
                } else {
                  return [
                    createTextVNode("Danger Outline")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-4" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-2" data-v-ebdcd06d${_scopeId}>Text</h4><div class="flex flex-wrap items-center gap-4 mb-2" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary-text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary Text`);
                } else {
                  return [
                    createTextVNode("Primary Text")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "danger-text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger Text`);
                } else {
                  return [
                    createTextVNode("Danger Text")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Button Sizes</h3><div class="flex flex-wrap items-center gap-4 mb-2" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { size: "sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Small`);
                } else {
                  return [
                    createTextVNode("Small")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { size: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Medium (Default)`);
                } else {
                  return [
                    createTextVNode("Medium (Default)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { size: "lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Large`);
                } else {
                  return [
                    createTextVNode("Large")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Buttons with Icons</h3><div class="flex flex-wrap items-center gap-4 mb-2" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:baseline-add",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Add User `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ic:baseline-add",
                      class: "mr-1"
                    }),
                    createTextVNode(" Add User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-delete",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Delete `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ic:outline-delete",
                      class: "mr-1"
                    }),
                    createTextVNode(" Delete ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "info-outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-edit",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Edit `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ic:outline-edit",
                      class: "mr-1"
                    }),
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, [
                createTextVNode("Buttons are a primary means of user interaction and must be implemented using the framework's "),
                createVNode("code", null, "<Button>"),
                createTextVNode(" component.")
              ]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Button Colors"),
                createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-4" }, [
                  createVNode(_component_rs_button, { variant: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Primary")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "secondary" }, {
                    default: withCtx(() => [
                      createTextVNode("Secondary")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "info" }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "success" }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "warning" }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "danger" }, {
                    default: withCtx(() => [
                      createTextVNode("Danger")
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Button Styles"),
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h4", { class: "text-sm font-medium mb-2" }, "Filled (Default)"),
                  createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-2" }, [
                    createVNode(_component_rs_button, { variant: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Primary")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, { variant: "danger" }, {
                      default: withCtx(() => [
                        createTextVNode("Danger")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h4", { class: "text-sm font-medium mb-2" }, "Outline"),
                  createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-2" }, [
                    createVNode(_component_rs_button, { variant: "primary-outline" }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Outline")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, { variant: "danger-outline" }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Outline")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h4", { class: "text-sm font-medium mb-2" }, "Text"),
                  createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-2" }, [
                    createVNode(_component_rs_button, { variant: "primary-text" }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Text")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, { variant: "danger-text" }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Text")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Button Sizes"),
                createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-2" }, [
                  createVNode(_component_rs_button, { size: "sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Small")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { size: "md" }, {
                    default: withCtx(() => [
                      createTextVNode("Medium (Default)")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { size: "lg" }, {
                    default: withCtx(() => [
                      createTextVNode("Large")
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Buttons with Icons"),
                createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-2" }, [
                  createVNode(_component_rs_button, { variant: "primary" }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "ic:baseline-add",
                        class: "mr-1"
                      }),
                      createTextVNode(" Add User ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "danger" }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "ic:outline-delete",
                        class: "mr-1"
                      }),
                      createTextVNode(" Delete ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "info-outline" }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "ic:outline-edit",
                        class: "mr-1"
                      }),
                      createTextVNode(" Edit ")
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
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-local-offer",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Badge Usage </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-local-offer",
                  class: "mr-2"
                }),
                createTextVNode(" Badge Usage ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Badges are used to display status indicators in tables, cards, and lists.</p><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Status Badges</h3><div class="flex flex-wrap items-center gap-4 mb-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_badge, { variant: "success" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`APPROVED`);
                } else {
                  return [
                    createTextVNode("APPROVED")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_badge, { variant: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`PENDING`);
                } else {
                  return [
                    createTextVNode("PENDING")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_badge, { variant: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`REJECTED`);
                } else {
                  return [
                    createTextVNode("REJECTED")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_badge, { variant: "disabled" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`DRAFT`);
                } else {
                  return [
                    createTextVNode("DRAFT")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_badge, { variant: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`NEW`);
                } else {
                  return [
                    createTextVNode("NEW")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_badge, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`ACTIVE`);
                } else {
                  return [
                    createTextVNode("ACTIVE")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Badges with Icons</h3><div class="flex flex-wrap items-center gap-4 mb-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_badge, {
              variant: "success",
              icon: "ic:outline-check-circle"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`APPROVED`);
                } else {
                  return [
                    createTextVNode("APPROVED")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_badge, {
              variant: "warning",
              icon: "ic:outline-access-time"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`PENDING`);
                } else {
                  return [
                    createTextVNode("PENDING")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_badge, {
              variant: "danger",
              icon: "ic:outline-cancel"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`REJECTED`);
                } else {
                  return [
                    createTextVNode("REJECTED")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Badges are used to display status indicators in tables, cards, and lists."),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Status Badges"),
                createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-4" }, [
                  createVNode(_component_rs_badge, { variant: "success" }, {
                    default: withCtx(() => [
                      createTextVNode("APPROVED")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_badge, { variant: "warning" }, {
                    default: withCtx(() => [
                      createTextVNode("PENDING")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_badge, { variant: "danger" }, {
                    default: withCtx(() => [
                      createTextVNode("REJECTED")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_badge, { variant: "disabled" }, {
                    default: withCtx(() => [
                      createTextVNode("DRAFT")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_badge, { variant: "info" }, {
                    default: withCtx(() => [
                      createTextVNode("NEW")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_badge, { variant: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("ACTIVE")
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Badges with Icons"),
                createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-4" }, [
                  createVNode(_component_rs_badge, {
                    variant: "success",
                    icon: "ic:outline-check-circle"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("APPROVED")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_badge, {
                    variant: "warning",
                    icon: "ic:outline-access-time"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("PENDING")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_badge, {
                    variant: "danger",
                    icon: "ic:outline-cancel"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("REJECTED")
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
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-notifications",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Alert Components </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-notifications",
                  class: "mr-2"
                }),
                createTextVNode(" Alert Components ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Alerts are used to provide feedback messages to users.</p><div class="space-y-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_alert, {
              variant: "primary",
              icon: "ic:outline-info"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This is a primary alert with information.`);
                } else {
                  return [
                    createTextVNode("This is a primary alert with information.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_alert, {
              variant: "success",
              icon: "ic:outline-check-circle"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Success! Your changes have been saved.`);
                } else {
                  return [
                    createTextVNode("Success! Your changes have been saved.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_alert, {
              variant: "warning",
              icon: "ic:outline-warning"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Warning: This action cannot be undone.`);
                } else {
                  return [
                    createTextVNode("Warning: This action cannot be undone.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_alert, {
              variant: "danger",
              icon: "ic:outline-error"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Error! Failed to save changes.`);
                } else {
                  return [
                    createTextVNode("Error! Failed to save changes.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_alert, {
              variant: "info",
              icon: "ic:outline-info"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Information: Your session will expire in 10 minutes.`);
                } else {
                  return [
                    createTextVNode("Information: Your session will expire in 10 minutes.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Alerts are used to provide feedback messages to users."),
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_rs_alert, {
                  variant: "primary",
                  icon: "ic:outline-info"
                }, {
                  default: withCtx(() => [
                    createTextVNode("This is a primary alert with information.")
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_alert, {
                  variant: "success",
                  icon: "ic:outline-check-circle"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Success! Your changes have been saved.")
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_alert, {
                  variant: "warning",
                  icon: "ic:outline-warning"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Warning: This action cannot be undone.")
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_alert, {
                  variant: "danger",
                  icon: "ic:outline-error"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Error! Failed to save changes.")
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_alert, {
                  variant: "info",
                  icon: "ic:outline-info"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Information: Your session will expire in 10 minutes.")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-dashboard",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Card Components </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-dashboard",
                  class: "mr-2"
                }),
                createTextVNode(" Card Components ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Cards are used as containers for grouping related content blocks.</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_RsCard, { class: "p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><p class="text-sm font-medium text-gray-600" data-v-ebdcd06d${_scopeId2}>Jumlah Permohonan</p><p class="text-2xl font-bold mt-1" data-v-ebdcd06d${_scopeId2}>1,254</p><p class="text-sm mt-1 text-green-600" data-v-ebdcd06d${_scopeId2}>+12% bulan ini</p></div><div class="p-3 rounded-full bg-blue-50" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-assignment",
                    size: "24",
                    class: "text-blue-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Jumlah Permohonan"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "1,254"),
                        createVNode("p", { class: "text-sm mt-1 text-green-600" }, "+12% bulan ini")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-assignment",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_RsCard, { class: "p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><p class="text-sm font-medium text-gray-600" data-v-ebdcd06d${_scopeId2}>Permohonan Baru</p><p class="text-2xl font-bold mt-1" data-v-ebdcd06d${_scopeId2}>154</p><p class="text-sm mt-1 text-blue-600" data-v-ebdcd06d${_scopeId2}>43 hari ini</p></div><div class="p-3 rounded-full bg-blue-50" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-fiber-new",
                    size: "24",
                    class: "text-blue-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Permohonan Baru"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "154"),
                        createVNode("p", { class: "text-sm mt-1 text-blue-600" }, "43 hari ini")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-fiber-new",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_RsCard, { class: "p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><p class="text-sm font-medium text-gray-600" data-v-ebdcd06d${_scopeId2}>Permohonan Menunggu</p><p class="text-2xl font-bold mt-1" data-v-ebdcd06d${_scopeId2}>367</p><p class="text-sm mt-1 text-yellow-600" data-v-ebdcd06d${_scopeId2}>Perlu tindakan</p></div><div class="p-3 rounded-full bg-blue-50" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-pending",
                    size: "24",
                    class: "text-blue-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Permohonan Menunggu"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "367"),
                        createVNode("p", { class: "text-sm mt-1 text-yellow-600" }, "Perlu tindakan")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-pending",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_RsCard, { class: "p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><p class="text-sm font-medium text-gray-600" data-v-ebdcd06d${_scopeId2}>Permohonan Ditolak</p><p class="text-2xl font-bold mt-1" data-v-ebdcd06d${_scopeId2}>89</p><p class="text-sm mt-1 text-red-600" data-v-ebdcd06d${_scopeId2}>Bulan ini</p></div><div class="p-3 rounded-full bg-blue-50" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-cancel",
                    size: "24",
                    class: "text-blue-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Permohonan Ditolak"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "89"),
                        createVNode("p", { class: "text-sm mt-1 text-red-600" }, "Bulan ini")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-cancel",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_rs_card, { class: "mb-4" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Card with Footer`);
                } else {
                  return [
                    createTextVNode("Card with Footer")
                  ];
                }
              }),
              body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ebdcd06d${_scopeId2}>This card includes a footer section with action buttons.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This card includes a footer section with action buttons.")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-2" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_rs_button, { variant: "secondary-outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save`);
                      } else {
                        return [
                          createTextVNode("Save")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode(_component_rs_button, { variant: "secondary-outline" }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_rs_button, { variant: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("Save")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Cards are used as containers for grouping related content blocks."),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                createVNode(_component_RsCard, { class: "p-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Jumlah Permohonan"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "1,254"),
                        createVNode("p", { class: "text-sm mt-1 text-green-600" }, "+12% bulan ini")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-assignment",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_RsCard, { class: "p-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Permohonan Baru"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "154"),
                        createVNode("p", { class: "text-sm mt-1 text-blue-600" }, "43 hari ini")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-fiber-new",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_RsCard, { class: "p-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Permohonan Menunggu"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "367"),
                        createVNode("p", { class: "text-sm mt-1 text-yellow-600" }, "Perlu tindakan")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-pending",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_RsCard, { class: "p-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Permohonan Ditolak"),
                        createVNode("p", { class: "text-2xl font-bold mt-1" }, "89"),
                        createVNode("p", { class: "text-sm mt-1 text-red-600" }, "Bulan ini")
                      ]),
                      createVNode("div", { class: "p-3 rounded-full bg-blue-50" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-cancel",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_rs_card, { class: "mb-4" }, {
                header: withCtx(() => [
                  createTextVNode("Card with Footer")
                ]),
                body: withCtx(() => [
                  createVNode("p", null, "This card includes a footer section with action buttons.")
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode(_component_rs_button, { variant: "secondary-outline" }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, { variant: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Save")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between" data-v-ebdcd06d${_scopeId}><div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-people",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` User Management Example </div>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:baseline-add",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Add User `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ic:baseline-add",
                      class: "mr-1"
                    }),
                    createTextVNode(" Add User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("div", { class: "flex items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ic:outline-people",
                    class: "mr-2"
                  }),
                  createTextVNode(" User Management Example ")
                ]),
                createVNode(_component_rs_button, {
                  variant: "primary",
                  class: "flex items-center"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "ic:baseline-add",
                      class: "mr-1"
                    }),
                    createTextVNode(" Add User ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>A user management interface with action buttons in the table rows, including tooltips for icon buttons.</p><div class="overflow-x-auto" data-v-ebdcd06d${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-ebdcd06d${_scopeId}><thead class="bg-gray-50" data-v-ebdcd06d${_scopeId}><tr data-v-ebdcd06d${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>ID</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Name</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Email</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Role</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Status</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-ebdcd06d${_scopeId}><!--[-->`);
            ssrRenderList([
              { id: "USR-001", name: "Ahmad bin Hassan", email: "ahmad@example.com", role: "Admin", status: "AKTIF" },
              { id: "USR-002", name: "Siti Aminah", email: "siti@example.com", role: "Editor", status: "AKTIF" },
              { id: "USR-003", name: "Mohammed Ismail", email: "ismail@example.com", role: "Viewer", status: "BARU" },
              { id: "USR-004", name: "Roslinda Othman", email: "ros@example.com", role: "Manager", status: "TIDAK AKTIF" }
            ], (user, index2) => {
              _push2(`<tr data-v-ebdcd06d${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(user.id)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(user.name)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(user.email)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(user.role)}</td><td class="px-6 py-4 whitespace-nowrap" data-v-ebdcd06d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_rs_badge, {
                variant: user.status === "AKTIF" ? "success" : user.status === "BARU" ? "info" : "disabled"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(user.status)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(user.status), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-v-ebdcd06d${_scopeId}><div class="flex justify-end space-x-2" data-v-ebdcd06d${_scopeId}><div class="relative" data-v-ebdcd06d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_rs_button, {
                variant: "info-text",
                class: "p-1 w-8 h-8"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "ic:outline-edit",
                      size: "18"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "ic:outline-edit",
                        size: "18"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (unref(tooltips)["edit" + index2]) {
                _push2(`<span class="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Edit </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_rs_button, {
                variant: "warning-text",
                class: "p-1 w-8 h-8"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "ic:outline-lock-reset",
                      size: "18"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "ic:outline-lock-reset",
                        size: "18"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (unref(tooltips)["reset" + index2]) {
                _push2(`<span class="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Reset Password </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_rs_button, {
                variant: "danger-text",
                class: "p-1 w-8 h-8"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "ic:outline-delete",
                      size: "18"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "ic:outline-delete",
                        size: "18"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (unref(tooltips)["delete" + index2]) {
                _push2(`<span class="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Delete </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="mt-4 flex items-center justify-between" data-v-ebdcd06d${_scopeId}><div class="text-sm text-gray-500" data-v-ebdcd06d${_scopeId}> Showing 1 to 4 of 4 records </div><div class="flex space-x-2" data-v-ebdcd06d${_scopeId}><button disabled class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50" data-v-ebdcd06d${_scopeId}> Previous </button><button disabled class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50" data-v-ebdcd06d${_scopeId}> Next </button></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "A user management interface with action buttons in the table rows, including tooltips for icon buttons."),
              createVNode("div", { class: "overflow-x-auto" }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                  createVNode("thead", { class: "bg-gray-50" }, [
                    createVNode("tr", null, [
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "ID"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Name"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Email"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Role"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Status"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Actions")
                    ])
                  ]),
                  createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList([
                      { id: "USR-001", name: "Ahmad bin Hassan", email: "ahmad@example.com", role: "Admin", status: "AKTIF" },
                      { id: "USR-002", name: "Siti Aminah", email: "siti@example.com", role: "Editor", status: "AKTIF" },
                      { id: "USR-003", name: "Mohammed Ismail", email: "ismail@example.com", role: "Viewer", status: "BARU" },
                      { id: "USR-004", name: "Roslinda Othman", email: "ros@example.com", role: "Manager", status: "TIDAK AKTIF" }
                    ], (user, index2) => {
                      return openBlock(), createBlock("tr", { key: index2 }, [
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(user.id), 1),
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(user.name), 1),
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(user.email), 1),
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(user.role), 1),
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                          createVNode(_component_rs_badge, {
                            variant: user.status === "AKTIF" ? "success" : user.status === "BARU" ? "info" : "disabled"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(user.status), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"])
                        ]),
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                          createVNode("div", { class: "flex justify-end space-x-2" }, [
                            createVNode("div", {
                              class: "relative",
                              onMouseenter: ($event) => unref(tooltips)["edit" + index2] = true,
                              onMouseleave: ($event) => unref(tooltips)["edit" + index2] = false
                            }, [
                              createVNode(_component_rs_button, {
                                variant: "info-text",
                                class: "p-1 w-8 h-8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: "ic:outline-edit",
                                    size: "18"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(Transition, { name: "tooltip" }, {
                                default: withCtx(() => [
                                  unref(tooltips)["edit" + index2] ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                                  }, " Edit ")) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1024)
                            ], 40, ["onMouseenter", "onMouseleave"]),
                            createVNode("div", {
                              class: "relative",
                              onMouseenter: ($event) => unref(tooltips)["reset" + index2] = true,
                              onMouseleave: ($event) => unref(tooltips)["reset" + index2] = false
                            }, [
                              createVNode(_component_rs_button, {
                                variant: "warning-text",
                                class: "p-1 w-8 h-8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: "ic:outline-lock-reset",
                                    size: "18"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(Transition, { name: "tooltip" }, {
                                default: withCtx(() => [
                                  unref(tooltips)["reset" + index2] ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                                  }, " Reset Password ")) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1024)
                            ], 40, ["onMouseenter", "onMouseleave"]),
                            createVNode("div", {
                              class: "relative",
                              onMouseenter: ($event) => unref(tooltips)["delete" + index2] = true,
                              onMouseleave: ($event) => unref(tooltips)["delete" + index2] = false
                            }, [
                              createVNode(_component_rs_button, {
                                variant: "danger-text",
                                class: "p-1 w-8 h-8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: "ic:outline-delete",
                                    size: "18"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(Transition, { name: "tooltip" }, {
                                default: withCtx(() => [
                                  unref(tooltips)["delete" + index2] ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                                  }, " Delete ")) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1024)
                            ], 40, ["onMouseenter", "onMouseleave"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                createVNode("div", { class: "text-sm text-gray-500" }, " Showing 1 to 4 of 4 records "),
                createVNode("div", { class: "flex space-x-2" }, [
                  createVNode("button", {
                    disabled: "",
                    class: "px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50"
                  }, " Previous "),
                  createVNode("button", {
                    disabled: "",
                    class: "px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50"
                  }, " Next ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-web-asset",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Modal Dialogs </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-web-asset",
                  class: "mr-2"
                }),
                createTextVNode(" Modal Dialogs ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Modals are used for focused interactions that require user attention.</p><div class="flex flex-wrap gap-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              onClick: ($event) => showModal.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Open Confirmation Modal`);
                } else {
                  return [
                    createTextVNode("Open Confirmation Modal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "info",
              onClick: ($event) => showFormModal.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Open Form Modal`);
                } else {
                  return [
                    createTextVNode("Open Form Modal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_rs_modal, {
              modelValue: unref(showModal),
              "onUpdate:modelValue": ($event) => isRef(showModal) ? showModal.value = $event : null,
              title: "Dialog Pengesahan"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border-b" data-v-ebdcd06d${_scopeId2}><h3 class="text-lg font-medium" data-v-ebdcd06d${_scopeId2}>Dialog Pengesahan</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border-b" }, [
                      createVNode("h3", { class: "text-lg font-medium" }, "Dialog Pengesahan")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border-t flex justify-end gap-3" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_RsButton, {
                    variant: "secondary",
                    onClick: ($event) => showModal.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batal`);
                      } else {
                        return [
                          createTextVNode("Batal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_RsButton, {
                    variant: "primary",
                    onClick: ($event) => showModal.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Teruskan`);
                      } else {
                        return [
                          createTextVNode("Teruskan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border-t flex justify-end gap-3" }, [
                      createVNode(_component_RsButton, {
                        variant: "secondary",
                        onClick: ($event) => showModal.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_RsButton, {
                        variant: "primary",
                        onClick: ($event) => showModal.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Teruskan")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6" data-v-ebdcd06d${_scopeId2}><div class="flex items-start" data-v-ebdcd06d${_scopeId2}><div class="bg-blue-100 rounded-full p-2 mr-4" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-info",
                    size: "24",
                    class: "text-blue-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-ebdcd06d${_scopeId2}><p class="mb-4" data-v-ebdcd06d${_scopeId2}>Adakah anda pasti untuk meneruskan tindakan ini?</p><div class="bg-gray-50 p-3 rounded-md mb-4 text-sm" data-v-ebdcd06d${_scopeId2}><div class="grid grid-cols-2 gap-2" data-v-ebdcd06d${_scopeId2}><div class="text-gray-600" data-v-ebdcd06d${_scopeId2}>ID Permohonan:</div><div class="font-medium" data-v-ebdcd06d${_scopeId2}>APP-001</div><div class="text-gray-600" data-v-ebdcd06d${_scopeId2}>Nama Pemohon:</div><div class="font-medium" data-v-ebdcd06d${_scopeId2}>Ahmad bin Hassan</div><div class="text-gray-600" data-v-ebdcd06d${_scopeId2}>Status Semasa:</div><div class="font-medium" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_RsBadge, { variant: "warning" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`MENUNGGU`);
                      } else {
                        return [
                          createTextVNode("MENUNGGU")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div><p class="text-sm text-gray-600" data-v-ebdcd06d${_scopeId2}> Tindakan ini tidak dapat dibatalkan selepas disahkan. </p></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex items-start" }, [
                        createVNode("div", { class: "bg-blue-100 rounded-full p-2 mr-4" }, [
                          createVNode(_component_Icon, {
                            name: "ic:outline-info",
                            size: "24",
                            class: "text-blue-600"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "mb-4" }, "Adakah anda pasti untuk meneruskan tindakan ini?"),
                          createVNode("div", { class: "bg-gray-50 p-3 rounded-md mb-4 text-sm" }, [
                            createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                              createVNode("div", { class: "text-gray-600" }, "ID Permohonan:"),
                              createVNode("div", { class: "font-medium" }, "APP-001"),
                              createVNode("div", { class: "text-gray-600" }, "Nama Pemohon:"),
                              createVNode("div", { class: "font-medium" }, "Ahmad bin Hassan"),
                              createVNode("div", { class: "text-gray-600" }, "Status Semasa:"),
                              createVNode("div", { class: "font-medium" }, [
                                createVNode(_component_RsBadge, { variant: "warning" }, {
                                  default: withCtx(() => [
                                    createTextVNode("MENUNGGU")
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          createVNode("p", { class: "text-sm text-gray-600" }, " Tindakan ini tidak dapat dibatalkan selepas disahkan. ")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_modal, {
              modelValue: unref(showFormModal),
              "onUpdate:modelValue": ($event) => isRef(showFormModal) ? showFormModal.value = $event : null,
              title: "Form Modal"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border-b" data-v-ebdcd06d${_scopeId2}><h3 class="text-lg font-medium" data-v-ebdcd06d${_scopeId2}>Edit User</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border-b" }, [
                      createVNode("h3", { class: "text-lg font-medium" }, "Edit User")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border-t flex justify-end gap-3" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_RsButton, {
                    variant: "secondary-outline",
                    onClick: ($event) => showFormModal.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_RsButton, {
                    variant: "primary",
                    onClick: ($event) => showFormModal.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save Changes`);
                      } else {
                        return [
                          createTextVNode("Save Changes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border-t flex justify-end gap-3" }, [
                      createVNode(_component_RsButton, {
                        variant: "secondary-outline",
                        onClick: ($event) => showFormModal.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_RsButton, {
                        variant: "primary",
                        onClick: ($event) => showFormModal.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Save Changes")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6" data-v-ebdcd06d${_scopeId2}><div class="space-y-4" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId2}>Name</label><input type="text" class="w-full border border-gray-300 rounded-md p-2" value="John Doe" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId2}>Email</label><input type="email" class="w-full border border-gray-300 rounded-md p-2" value="john.doe@example.com" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId2}>Role</label><select class="w-full border border-gray-300 rounded-md p-2" data-v-ebdcd06d${_scopeId2}><option data-v-ebdcd06d${_scopeId2}>Admin</option><option selected data-v-ebdcd06d${_scopeId2}>User</option><option data-v-ebdcd06d${_scopeId2}>Manager</option></select></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Name"),
                          createVNode("input", {
                            type: "text",
                            class: "w-full border border-gray-300 rounded-md p-2",
                            value: "John Doe"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Email"),
                          createVNode("input", {
                            type: "email",
                            class: "w-full border border-gray-300 rounded-md p-2",
                            value: "john.doe@example.com"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Role"),
                          createVNode("select", { class: "w-full border border-gray-300 rounded-md p-2" }, [
                            createVNode("option", null, "Admin"),
                            createVNode("option", { selected: "" }, "User"),
                            createVNode("option", null, "Manager")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Modals are used for focused interactions that require user attention."),
              createVNode("div", { class: "flex flex-wrap gap-4" }, [
                createVNode(_component_rs_button, {
                  variant: "primary",
                  onClick: ($event) => showModal.value = true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Open Confirmation Modal")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_rs_button, {
                  variant: "info",
                  onClick: ($event) => showFormModal.value = true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Open Form Modal")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              createVNode(_component_rs_modal, {
                modelValue: unref(showModal),
                "onUpdate:modelValue": ($event) => isRef(showModal) ? showModal.value = $event : null,
                title: "Dialog Pengesahan"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "p-4 border-b" }, [
                    createVNode("h3", { class: "text-lg font-medium" }, "Dialog Pengesahan")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "p-4 border-t flex justify-end gap-3" }, [
                    createVNode(_component_RsButton, {
                      variant: "secondary",
                      onClick: ($event) => showModal.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Batal")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_RsButton, {
                      variant: "primary",
                      onClick: ($event) => showModal.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Teruskan")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode("div", { class: "bg-blue-100 rounded-full p-2 mr-4" }, [
                        createVNode(_component_Icon, {
                          name: "ic:outline-info",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "mb-4" }, "Adakah anda pasti untuk meneruskan tindakan ini?"),
                        createVNode("div", { class: "bg-gray-50 p-3 rounded-md mb-4 text-sm" }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                            createVNode("div", { class: "text-gray-600" }, "ID Permohonan:"),
                            createVNode("div", { class: "font-medium" }, "APP-001"),
                            createVNode("div", { class: "text-gray-600" }, "Nama Pemohon:"),
                            createVNode("div", { class: "font-medium" }, "Ahmad bin Hassan"),
                            createVNode("div", { class: "text-gray-600" }, "Status Semasa:"),
                            createVNode("div", { class: "font-medium" }, [
                              createVNode(_component_RsBadge, { variant: "warning" }, {
                                default: withCtx(() => [
                                  createTextVNode("MENUNGGU")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        createVNode("p", { class: "text-sm text-gray-600" }, " Tindakan ini tidak dapat dibatalkan selepas disahkan. ")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_rs_modal, {
                modelValue: unref(showFormModal),
                "onUpdate:modelValue": ($event) => isRef(showFormModal) ? showFormModal.value = $event : null,
                title: "Form Modal"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "p-4 border-b" }, [
                    createVNode("h3", { class: "text-lg font-medium" }, "Edit User")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "p-4 border-t flex justify-end gap-3" }, [
                    createVNode(_component_RsButton, {
                      variant: "secondary-outline",
                      onClick: ($event) => showFormModal.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_RsButton, {
                      variant: "primary",
                      onClick: ($event) => showFormModal.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Save Changes")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-1" }, "Name"),
                        createVNode("input", {
                          type: "text",
                          class: "w-full border border-gray-300 rounded-md p-2",
                          value: "John Doe"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-1" }, "Email"),
                        createVNode("input", {
                          type: "email",
                          class: "w-full border border-gray-300 rounded-md p-2",
                          value: "john.doe@example.com"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-1" }, "Role"),
                        createVNode("select", { class: "w-full border border-gray-300 rounded-md p-2" }, [
                          createVNode("option", null, "Admin"),
                          createVNode("option", { selected: "" }, "User"),
                          createVNode("option", null, "Manager")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:tabs",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Tabs Component </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:tabs",
                  class: "mr-2"
                }),
                createTextVNode(" Tabs Component ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Tabs are used to organize content into different sections.</p>`);
            _push2(ssrRenderComponent(_component_rs_tab, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_rs_tab_item, { title: "User Information" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4" data-v-ebdcd06d${_scopeId3}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId3}>User Information</h3><p data-v-ebdcd06d${_scopeId3}>This tab contains basic user information like name, email, and contact details.</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h3", { class: "text-base font-semibold mb-2" }, "User Information"),
                            createVNode("p", null, "This tab contains basic user information like name, email, and contact details.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_tab_item, { title: "Application Details" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4" data-v-ebdcd06d${_scopeId3}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId3}>Application Details</h3><p data-v-ebdcd06d${_scopeId3}>This tab contains information about the user&#39;s application, including status and submission date.</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h3", { class: "text-base font-semibold mb-2" }, "Application Details"),
                            createVNode("p", null, "This tab contains information about the user's application, including status and submission date.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_tab_item, { title: "Documents" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4" data-v-ebdcd06d${_scopeId3}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId3}>Documents</h3><p data-v-ebdcd06d${_scopeId3}>This tab displays the documents attached to the application.</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h3", { class: "text-base font-semibold mb-2" }, "Documents"),
                            createVNode("p", null, "This tab displays the documents attached to the application.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_rs_tab_item, { title: "User Information" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode("h3", { class: "text-base font-semibold mb-2" }, "User Information"),
                          createVNode("p", null, "This tab contains basic user information like name, email, and contact details.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_tab_item, { title: "Application Details" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode("h3", { class: "text-base font-semibold mb-2" }, "Application Details"),
                          createVNode("p", null, "This tab contains information about the user's application, including status and submission date.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_tab_item, { title: "Documents" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode("h3", { class: "text-base font-semibold mb-2" }, "Documents"),
                          createVNode("p", null, "This tab displays the documents attached to the application.")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Tabs are used to organize content into different sections."),
              createVNode(_component_rs_tab, null, {
                default: withCtx(() => [
                  createVNode(_component_rs_tab_item, { title: "User Information" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-4" }, [
                        createVNode("h3", { class: "text-base font-semibold mb-2" }, "User Information"),
                        createVNode("p", null, "This tab contains basic user information like name, email, and contact details.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_tab_item, { title: "Application Details" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-4" }, [
                        createVNode("h3", { class: "text-base font-semibold mb-2" }, "Application Details"),
                        createVNode("p", null, "This tab contains information about the user's application, including status and submission date.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_tab_item, { title: "Documents" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-4" }, [
                        createVNode("h3", { class: "text-base font-semibold mb-2" }, "Documents"),
                        createVNode("p", null, "This tab displays the documents attached to the application.")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:arrows-in",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Collapse Components </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:arrows-in",
                  class: "mr-2"
                }),
                createTextVNode(" Collapse Components ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Collapse components are used to hide and show content.</p>`);
            _push2(ssrRenderComponent(_component_rs_collapse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_rs_collapse_item, { title: "Section 1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4" data-v-ebdcd06d${_scopeId3}><p data-v-ebdcd06d${_scopeId3}>Content for Section 1 goes here. This can include any type of content, like text, forms, or other components.</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("p", null, "Content for Section 1 goes here. This can include any type of content, like text, forms, or other components.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_collapse_item, { title: "Section 2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4" data-v-ebdcd06d${_scopeId3}><p data-v-ebdcd06d${_scopeId3}>Content for Section 2 goes here. Collapse items are useful for FAQs, settings sections, or any content that needs to be toggled.</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("p", null, "Content for Section 2 goes here. Collapse items are useful for FAQs, settings sections, or any content that needs to be toggled.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_collapse_item, { title: "Section 3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4" data-v-ebdcd06d${_scopeId3}><p data-v-ebdcd06d${_scopeId3}>Content for Section 3 goes here. The collapse component helps save space and organize information.</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("p", null, "Content for Section 3 goes here. The collapse component helps save space and organize information.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_rs_collapse_item, { title: "Section 1" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode("p", null, "Content for Section 1 goes here. This can include any type of content, like text, forms, or other components.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Section 2" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode("p", null, "Content for Section 2 goes here. Collapse items are useful for FAQs, settings sections, or any content that needs to be toggled.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Section 3" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode("p", null, "Content for Section 3 goes here. The collapse component helps save space and organize information.")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Collapse components are used to hide and show content."),
              createVNode(_component_rs_collapse, null, {
                default: withCtx(() => [
                  createVNode(_component_rs_collapse_item, { title: "Section 1" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-4" }, [
                        createVNode("p", null, "Content for Section 1 goes here. This can include any type of content, like text, forms, or other components.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_collapse_item, { title: "Section 2" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-4" }, [
                        createVNode("p", null, "Content for Section 2 goes here. Collapse items are useful for FAQs, settings sections, or any content that needs to be toggled.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_collapse_item, { title: "Section 3" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-4" }, [
                        createVNode("p", null, "Content for Section 3 goes here. The collapse component helps save space and organize information.")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:caret-down",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Dropdown Menus </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:caret-down",
                  class: "mr-2"
                }),
                createTextVNode(" Dropdown Menus ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Dropdowns provide a compact way to present multiple actions or options.</p><div class="flex flex-wrap gap-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_dropdown, {
              text: "Actions",
              variant: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:eye",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` View `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:eye",
                            class: "mr-2"
                          }),
                          createTextVNode(" View ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:pencil",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Edit `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:pencil",
                            class: "mr-2"
                          }),
                          createTextVNode(" Edit ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:trash",
                          class: "mr-2",
                          color: "red"
                        }, null, _parent4, _scopeId3));
                        _push4(` Delete `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:trash",
                            class: "mr-2",
                            color: "red"
                          }),
                          createTextVNode(" Delete ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:eye",
                          class: "mr-2"
                        }),
                        createTextVNode(" View ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:pencil",
                          class: "mr-2"
                        }),
                        createTextVNode(" Edit ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:trash",
                          class: "mr-2",
                          color: "red"
                        }),
                        createTextVNode(" Delete ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_dropdown, {
              text: "User Options",
              variant: "secondary-outline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:user",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Profile `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:user",
                            class: "mr-2"
                          }),
                          createTextVNode(" Profile ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:gear",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Settings `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:gear",
                            class: "mr-2"
                          }),
                          createTextVNode(" Settings ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:sign-out",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Logout `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:sign-out",
                            class: "mr-2"
                          }),
                          createTextVNode(" Logout ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:user",
                          class: "mr-2"
                        }),
                        createTextVNode(" Profile ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:gear",
                          class: "mr-2"
                        }),
                        createTextVNode(" Settings ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:sign-out",
                          class: "mr-2"
                        }),
                        createTextVNode(" Logout ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Dropdowns provide a compact way to present multiple actions or options."),
              createVNode("div", { class: "flex flex-wrap gap-4" }, [
                createVNode(_component_rs_dropdown, {
                  text: "Actions",
                  variant: "primary"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:eye",
                          class: "mr-2"
                        }),
                        createTextVNode(" View ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:pencil",
                          class: "mr-2"
                        }),
                        createTextVNode(" Edit ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:trash",
                          class: "mr-2",
                          color: "red"
                        }),
                        createTextVNode(" Delete ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_dropdown, {
                  text: "User Options",
                  variant: "secondary-outline"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:user",
                          class: "mr-2"
                        }),
                        createTextVNode(" Profile ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:gear",
                          class: "mr-2"
                        }),
                        createTextVNode(" Settings ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:sign-out",
                          class: "mr-2"
                        }),
                        createTextVNode(" Logout ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-linear-scale",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Progress Indicators </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-linear-scale",
                  class: "mr-2"
                }),
                createTextVNode(" Progress Indicators ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Progress indicators show completion status and provide feedback during long operations.</p><div class="space-y-6" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Basic Progress Bar</h3>`);
            _push2(ssrRenderComponent(_component_rs_progress_bar, { value: 75 }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Progress Bar with Label</h3>`);
            _push2(ssrRenderComponent(_component_rs_progress_bar, {
              value: 40,
              showValue: true
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Colored Progress Bars</h3><div class="space-y-2" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_progress_bar, {
              value: 90,
              variant: "success",
              showValue: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_progress_bar, {
              value: 60,
              variant: "warning",
              showValue: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_progress_bar, {
              value: 30,
              variant: "danger",
              showValue: true
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Progress indicators show completion status and provide feedback during long operations."),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-2" }, "Basic Progress Bar"),
                  createVNode(_component_rs_progress_bar, { value: 75 })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-2" }, "Progress Bar with Label"),
                  createVNode(_component_rs_progress_bar, {
                    value: 40,
                    showValue: true
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-2" }, "Colored Progress Bars"),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_rs_progress_bar, {
                      value: 90,
                      variant: "success",
                      showValue: true
                    }),
                    createVNode(_component_rs_progress_bar, {
                      value: 60,
                      variant: "warning",
                      showValue: true
                    }),
                    createVNode(_component_rs_progress_bar, {
                      value: 30,
                      variant: "danger",
                      showValue: true
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-table-view",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Data Tables with Column Visibility </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-table-view",
                  class: "mr-2"
                }),
                createTextVNode(" Data Tables with Column Visibility ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Tables display structured data in rows and columns with options to show/hide columns.</p><div class="flex justify-between items-center mb-4" data-v-ebdcd06d${_scopeId}><div class="text-sm text-gray-500" data-v-ebdcd06d${_scopeId}> Showing 1 to 4 of 4 records </div><div class="relative" data-v-ebdcd06d${_scopeId}><button class="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-view-column",
              size: "20"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-ebdcd06d${_scopeId}>Columns</span></button>`);
            if (unref(showColumnMenu)) {
              _push2(`<div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10" data-v-ebdcd06d${_scopeId}><div class="py-1" data-v-ebdcd06d${_scopeId}><!--[-->`);
              ssrRenderList(unref(tableFields), (field) => {
                _push2(`<div class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" data-v-ebdcd06d${_scopeId}><div class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(field.visible) ? " checked" : ""} class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>${ssrInterpolate(field.label)}</span></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="overflow-x-auto" data-v-ebdcd06d${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-ebdcd06d${_scopeId}><thead class="bg-gray-50" data-v-ebdcd06d${_scopeId}><tr data-v-ebdcd06d${_scopeId}><!--[-->`);
            ssrRenderList(unref(tableFields).filter((f) => f.visible), (field) => {
              _push2(`<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" data-v-ebdcd06d${_scopeId}><div class="flex items-center" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>${ssrInterpolate(field.label)}</span>`);
              if (field.sortable) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: getSortIcon(field.key),
                  class: "ml-1",
                  size: "16"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></th>`);
            });
            _push2(`<!--]--></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-ebdcd06d${_scopeId}><!--[-->`);
            ssrRenderList(unref(tableData), (app, index2) => {
              var _a, _b, _c, _d, _e, _f;
              _push2(`<tr class="hover:bg-gray-50" data-v-ebdcd06d${_scopeId}>`);
              if ((_a = unref(tableFields).find((f) => f.key === "id")) == null ? void 0 : _a.visible) {
                _push2(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(app.id)}</td>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_b = unref(tableFields).find((f) => f.key === "nama")) == null ? void 0 : _b.visible) {
                _push2(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(app.nama)}</td>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_c = unref(tableFields).find((f) => f.key === "tarikh")) == null ? void 0 : _c.visible) {
                _push2(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(app.tarikh)}</td>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_d = unref(tableFields).find((f) => f.key === "jenisBantuan")) == null ? void 0 : _d.visible) {
                _push2(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(app.jenisBantuan)}</td>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_e = unref(tableFields).find((f) => f.key === "status")) == null ? void 0 : _e.visible) {
                _push2(`<td class="px-6 py-4 whitespace-nowrap" data-v-ebdcd06d${_scopeId}><span class="${ssrRenderClass([{
                  "bg-green-100 text-green-800": app.status === "LULUS",
                  "bg-yellow-100 text-yellow-800": app.status === "MENUNGGU",
                  "bg-blue-100 text-blue-800": app.status === "DALAM PROSES",
                  "bg-red-100 text-red-800": app.status === "DITOLAK"
                }, "px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"])}" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(app.status)}</span></td>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_f = unref(tableFields).find((f) => f.key === "actions")) == null ? void 0 : _f.visible) {
                _push2(`<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-v-ebdcd06d${_scopeId}><button class="text-blue-600 hover:text-blue-900" data-v-ebdcd06d${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ic:outline-remove-red-eye",
                  class: "mr-1",
                  size: "16"
                }, null, _parent2, _scopeId));
                _push2(` Lihat </button></td>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="mt-4 flex items-center justify-between" data-v-ebdcd06d${_scopeId}><div class="text-sm text-gray-500" data-v-ebdcd06d${_scopeId}> Showing 1 to 4 of 4 records </div><div class="flex space-x-2" data-v-ebdcd06d${_scopeId}><button disabled class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50" data-v-ebdcd06d${_scopeId}> Previous </button><button disabled class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50" data-v-ebdcd06d${_scopeId}> Next </button></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Tables display structured data in rows and columns with options to show/hide columns."),
              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                createVNode("div", { class: "text-sm text-gray-500" }, " Showing 1 to 4 of 4 records "),
                createVNode("div", { class: "relative" }, [
                  createVNode("button", {
                    onClick: ($event) => showColumnMenu.value = !unref(showColumnMenu),
                    class: "flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }, [
                    createVNode(_component_Icon, {
                      name: "ic:outline-view-column",
                      size: "20"
                    }),
                    createVNode("span", null, "Columns")
                  ], 8, ["onClick"]),
                  unref(showColumnMenu) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                  }, [
                    createVNode("div", { class: "py-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(tableFields), (field) => {
                        return openBlock(), createBlock("div", {
                          key: field.key,
                          class: "px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
                          onClick: ($event) => toggleColumn(field.key)
                        }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("input", {
                              type: "checkbox",
                              checked: field.visible,
                              class: "mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            }, null, 8, ["checked"]),
                            createVNode("span", null, toDisplayString(field.label), 1)
                          ])
                        ], 8, ["onClick"]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode("div", { class: "overflow-x-auto" }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                  createVNode("thead", { class: "bg-gray-50" }, [
                    createVNode("tr", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(tableFields).filter((f) => f.visible), (field) => {
                        return openBlock(), createBlock("th", {
                          key: field.key,
                          scope: "col",
                          class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                          onClick: ($event) => sortTable(field.key)
                        }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("span", null, toDisplayString(field.label), 1),
                            field.sortable ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: getSortIcon(field.key),
                              class: "ml-1",
                              size: "16"
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ])
                        ], 8, ["onClick"]);
                      }), 128))
                    ])
                  ]),
                  createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(tableData), (app, index2) => {
                      var _a, _b, _c, _d, _e, _f;
                      return openBlock(), createBlock("tr", {
                        key: app.id,
                        class: "hover:bg-gray-50"
                      }, [
                        ((_a = unref(tableFields).find((f) => f.key === "id")) == null ? void 0 : _a.visible) ? (openBlock(), createBlock("td", {
                          key: 0,
                          class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        }, toDisplayString(app.id), 1)) : createCommentVNode("", true),
                        ((_b = unref(tableFields).find((f) => f.key === "nama")) == null ? void 0 : _b.visible) ? (openBlock(), createBlock("td", {
                          key: 1,
                          class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        }, toDisplayString(app.nama), 1)) : createCommentVNode("", true),
                        ((_c = unref(tableFields).find((f) => f.key === "tarikh")) == null ? void 0 : _c.visible) ? (openBlock(), createBlock("td", {
                          key: 2,
                          class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        }, toDisplayString(app.tarikh), 1)) : createCommentVNode("", true),
                        ((_d = unref(tableFields).find((f) => f.key === "jenisBantuan")) == null ? void 0 : _d.visible) ? (openBlock(), createBlock("td", {
                          key: 3,
                          class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        }, toDisplayString(app.jenisBantuan), 1)) : createCommentVNode("", true),
                        ((_e = unref(tableFields).find((f) => f.key === "status")) == null ? void 0 : _e.visible) ? (openBlock(), createBlock("td", {
                          key: 4,
                          class: "px-6 py-4 whitespace-nowrap"
                        }, [
                          createVNode("span", {
                            class: ["px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full", {
                              "bg-green-100 text-green-800": app.status === "LULUS",
                              "bg-yellow-100 text-yellow-800": app.status === "MENUNGGU",
                              "bg-blue-100 text-blue-800": app.status === "DALAM PROSES",
                              "bg-red-100 text-red-800": app.status === "DITOLAK"
                            }]
                          }, toDisplayString(app.status), 3)
                        ])) : createCommentVNode("", true),
                        ((_f = unref(tableFields).find((f) => f.key === "actions")) == null ? void 0 : _f.visible) ? (openBlock(), createBlock("td", {
                          key: 5,
                          class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        }, [
                          createVNode("button", {
                            onClick: ($event) => showModal.value = true,
                            class: "text-blue-600 hover:text-blue-900"
                          }, [
                            createVNode(_component_Icon, {
                              name: "ic:outline-remove-red-eye",
                              class: "mr-1",
                              size: "16"
                            }),
                            createTextVNode(" Lihat ")
                          ], 8, ["onClick"])
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                createVNode("div", { class: "text-sm text-gray-500" }, " Showing 1 to 4 of 4 records "),
                createVNode("div", { class: "flex space-x-2" }, [
                  createVNode("button", {
                    onClick: ($event) => changePage(unref(currentPage) - 1),
                    disabled: "",
                    class: "px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50"
                  }, " Previous ", 8, ["onClick"]),
                  createVNode("button", {
                    onClick: ($event) => changePage(unref(currentPage) + 1),
                    disabled: "",
                    class: "px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium disabled:opacity-50"
                  }, " Next ", 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-search",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Advanced Search Component </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-search",
                  class: "mr-2"
                }),
                createTextVNode(" Advanced Search Component ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Advanced search allows users to filter results using multiple criteria.</p><div class="relative mb-6" data-v-ebdcd06d${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-search",
              class: "text-gray-400",
              size: "20"
            }, null, _parent2, _scopeId));
            _push2(`</div><input${ssrRenderAttr("value", unref(searchTerm))} type="text" placeholder="Search by name, ID, or any keyword..." class="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><div class="absolute inset-y-0 right-0 flex items-center" data-v-ebdcd06d${_scopeId}><button class="px-4 text-sm text-blue-600 hover:text-blue-800 flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-tune",
              class: "mr-1"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-ebdcd06d${_scopeId}>Advanced Search</span></button></div></div>`);
            if (unref(advancedSearchVisible)) {
              _push2(`<div class="mb-6 bg-gray-50 p-4 rounded-md border" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-medium mb-4" data-v-ebdcd06d${_scopeId}>Advanced Search</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Type</label><select class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><option value="all" data-v-ebdcd06d${_scopeId}>All Types</option><option value="medical" data-v-ebdcd06d${_scopeId}>Medical Aid</option><option value="education" data-v-ebdcd06d${_scopeId}>Education Aid</option><option value="housing" data-v-ebdcd06d${_scopeId}>Housing Aid</option></select></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Status</label><select class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><option value="all" data-v-ebdcd06d${_scopeId}>All Status</option><option value="active" data-v-ebdcd06d${_scopeId}>Active</option><option value="inactive" data-v-ebdcd06d${_scopeId}>Inactive</option></select></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Year</label><select class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><option value="all" data-v-ebdcd06d${_scopeId}>All Years</option><option value="2023" data-v-ebdcd06d${_scopeId}>2023</option><option value="2022" data-v-ebdcd06d${_scopeId}>2022</option><option value="2021" data-v-ebdcd06d${_scopeId}>2021</option></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Minimum Amount (RM)</label><input${ssrRenderAttr("value", unref(advancedSearch).minAmount)} type="number" placeholder="e.g., 1000" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Maximum Amount (RM)</label><input${ssrRenderAttr("value", unref(advancedSearch).maxAmount)} type="number" placeholder="e.g., 5000" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}></div></div>`);
              if (unref(appliedFilters).length > 0) {
                _push2(`<div class="mb-4" data-v-ebdcd06d${_scopeId}><div class="flex flex-wrap items-center gap-2" data-v-ebdcd06d${_scopeId}><span class="text-sm text-gray-500" data-v-ebdcd06d${_scopeId}>Active Filters:</span><!--[-->`);
                ssrRenderList(unref(appliedFilters), (filter) => {
                  _push2(`<div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm" data-v-ebdcd06d${_scopeId}><span class="mr-1" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(filter.label)}</span><button class="text-blue-800 hover:text-blue-900" data-v-ebdcd06d${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "ic:baseline-close",
                    size: "16"
                  }, null, _parent2, _scopeId));
                  _push2(`</button></div>`);
                });
                _push2(`<!--]--><button class="text-sm text-gray-500 hover:text-gray-700 ml-2" data-v-ebdcd06d${_scopeId}> Clear All </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-end space-x-3" data-v-ebdcd06d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_rs_button, {
                variant: "secondary",
                onClick: ($event) => advancedSearchVisible.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Close`);
                  } else {
                    return [
                      createTextVNode("Close")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_rs_button, {
                variant: "primary",
                onClick: ($event) => advancedSearchVisible.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Apply Filters`);
                  } else {
                    return [
                      createTextVNode("Apply Filters")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-end" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:baseline-search",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-ebdcd06d${_scopeId2}>Search</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ic:baseline-search",
                      class: "mr-1"
                    }),
                    createVNode("span", null, "Search")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Advanced search allows users to filter results using multiple criteria."),
              createVNode("div", { class: "relative mb-6" }, [
                createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                  createVNode(_component_Icon, {
                    name: "ic:baseline-search",
                    class: "text-gray-400",
                    size: "20"
                  })
                ]),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(searchTerm) ? searchTerm.value = $event : null,
                  type: "text",
                  placeholder: "Search by name, ID, or any keyword...",
                  class: "w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(searchTerm)]
                ]),
                createVNode("div", { class: "absolute inset-y-0 right-0 flex items-center" }, [
                  createVNode("button", {
                    onClick: ($event) => advancedSearchVisible.value = !unref(advancedSearchVisible),
                    class: "px-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  }, [
                    createVNode(_component_Icon, {
                      name: "ic:baseline-tune",
                      class: "mr-1"
                    }),
                    createVNode("span", null, "Advanced Search")
                  ], 8, ["onClick"])
                ])
              ]),
              unref(advancedSearchVisible) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-6 bg-gray-50 p-4 rounded-md border"
              }, [
                createVNode("h3", { class: "text-base font-medium mb-4" }, "Advanced Search"),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Type"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(advancedSearch).type = $event,
                      class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, [
                      createVNode("option", { value: "all" }, "All Types"),
                      createVNode("option", { value: "medical" }, "Medical Aid"),
                      createVNode("option", { value: "education" }, "Education Aid"),
                      createVNode("option", { value: "housing" }, "Housing Aid")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(advancedSearch).type]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Status"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(advancedSearch).status = $event,
                      class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, [
                      createVNode("option", { value: "all" }, "All Status"),
                      createVNode("option", { value: "active" }, "Active"),
                      createVNode("option", { value: "inactive" }, "Inactive")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(advancedSearch).status]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Year"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(advancedSearch).year = $event,
                      class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, [
                      createVNode("option", { value: "all" }, "All Years"),
                      createVNode("option", { value: "2023" }, "2023"),
                      createVNode("option", { value: "2022" }, "2022"),
                      createVNode("option", { value: "2021" }, "2021")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(advancedSearch).year]
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Minimum Amount (RM)"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(advancedSearch).minAmount = $event,
                      type: "number",
                      placeholder: "e.g., 1000",
                      class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(advancedSearch).minAmount]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Maximum Amount (RM)"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(advancedSearch).maxAmount = $event,
                      type: "number",
                      placeholder: "e.g., 5000",
                      class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(advancedSearch).maxAmount]
                    ])
                  ])
                ]),
                unref(appliedFilters).length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-4"
                }, [
                  createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                    createVNode("span", { class: "text-sm text-gray-500" }, "Active Filters:"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(appliedFilters), (filter) => {
                      return openBlock(), createBlock("div", {
                        key: filter.id,
                        class: "inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                      }, [
                        createVNode("span", { class: "mr-1" }, toDisplayString(filter.label), 1),
                        createVNode("button", {
                          onClick: ($event) => removeFilter(filter.id),
                          class: "text-blue-800 hover:text-blue-900"
                        }, [
                          createVNode(_component_Icon, {
                            name: "ic:baseline-close",
                            size: "16"
                          })
                        ], 8, ["onClick"])
                      ]);
                    }), 128)),
                    createVNode("button", {
                      onClick: clearAllFilters,
                      class: "text-sm text-gray-500 hover:text-gray-700 ml-2"
                    }, " Clear All ")
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex justify-end space-x-3" }, [
                  createVNode(_component_rs_button, {
                    variant: "secondary",
                    onClick: ($event) => advancedSearchVisible.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Close")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_rs_button, {
                    variant: "primary",
                    onClick: ($event) => advancedSearchVisible.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Apply Filters")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "flex justify-end" }, [
                createVNode(_component_rs_button, { variant: "primary" }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "ic:baseline-search",
                      class: "mr-1"
                    }),
                    createVNode("span", null, "Search")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-fact-check",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Logical Field Grouping </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-fact-check",
                  class: "mr-2"
                }),
                createTextVNode(" Logical Field Grouping ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Organizing form fields into logical groups reduces cognitive load and improves data entry accuracy. Group related fields together within visually distinct containers, such as Card components, to help users understand the context and flow of information.</p><div class="space-y-6" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_card, { class: "p-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId2}>Maklumat Peribadi</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Nama Penuh <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(personalInfo).fullName)} type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama penuh anda" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>No. Kad Pengenalan <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(personalInfo).idNumber)} type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 990101-07-1234" data-v-ebdcd06d${_scopeId2}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Tarikh Lahir <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(personalInfo).birthDate)} type="date" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Jantina <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><div class="space-x-4 mt-2" data-v-ebdcd06d${_scopeId2}><label class="inline-flex items-center" data-v-ebdcd06d${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(personalInfo).gender, "lelaki")) ? " checked" : ""} value="lelaki" class="mr-2" data-v-ebdcd06d${_scopeId2}><span data-v-ebdcd06d${_scopeId2}>Lelaki</span></label><label class="inline-flex items-center" data-v-ebdcd06d${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(personalInfo).gender, "perempuan")) ? " checked" : ""} value="perempuan" class="mr-2" data-v-ebdcd06d${_scopeId2}><span data-v-ebdcd06d${_scopeId2}>Perempuan</span></label></div></div></div>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-base font-semibold mb-4" }, "Maklumat Peribadi"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Nama Penuh "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(personalInfo).fullName = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Masukkan nama penuh anda"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(personalInfo).fullName]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("No. Kad Pengenalan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(personalInfo).idNumber = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: 990101-07-1234"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(personalInfo).idNumber]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Tarikh Lahir "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(personalInfo).birthDate = $event,
                          type: "date",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(personalInfo).birthDate]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Jantina "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("div", { class: "space-x-4 mt-2" }, [
                          createVNode("label", { class: "inline-flex items-center" }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              "onUpdate:modelValue": ($event) => unref(personalInfo).gender = $event,
                              value: "lelaki",
                              class: "mr-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelRadio, unref(personalInfo).gender]
                            ]),
                            createVNode("span", null, "Lelaki")
                          ]),
                          createVNode("label", { class: "inline-flex items-center" }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              "onUpdate:modelValue": ($event) => unref(personalInfo).gender = $event,
                              value: "perempuan",
                              class: "mr-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelRadio, unref(personalInfo).gender]
                            ]),
                            createVNode("span", null, "Perempuan")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_card, { class: "p-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId2}>Alamat Pemohon</h3><div class="mb-4" data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Alamat <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(addressInfo).street)} type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="No. rumah dan nama jalan" data-v-ebdcd06d${_scopeId2}></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Bandar <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(addressInfo).city)} type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Shah Alam" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Poskod <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(addressInfo).postalCode)} type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 40000" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Negeri <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><select class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId2}><option value="" disabled selected data-v-ebdcd06d${_scopeId2}>Pilih negeri</option><!--[-->`);
                  ssrRenderList(stateOptions, (option) => {
                    _push3(`<option${ssrRenderAttr("value", option.value)} data-v-ebdcd06d${_scopeId2}>${ssrInterpolate(option.label)}</option>`);
                  });
                  _push3(`<!--]--></select></div></div>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-base font-semibold mb-4" }, "Alamat Pemohon"),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                        createTextVNode("Alamat "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(addressInfo).street = $event,
                        type: "text",
                        class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        placeholder: "No. rumah dan nama jalan"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(addressInfo).street]
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Bandar "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(addressInfo).city = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: Shah Alam"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(addressInfo).city]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Poskod "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(addressInfo).postalCode = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: 40000"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(addressInfo).postalCode]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Negeri "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(addressInfo).state = $event,
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: "",
                            selected: ""
                          }, "Pilih negeri"),
                          (openBlock(), createBlock(Fragment, null, renderList(stateOptions, (option) => {
                            return createVNode("option", {
                              key: option.value,
                              value: option.value
                            }, toDisplayString(option.label), 9, ["value"]);
                          }), 64))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(addressInfo).state]
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_card, { class: "p-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId2}>Maklumat Perhubungan</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Alamat E-mel <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(contactInfo).email)} type="email" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: nama@emel.com" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>No. Telefon <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(contactInfo).phone)} type="tel" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 0123456789" data-v-ebdcd06d${_scopeId2}></div></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId2}>Kaedah Perhubungan Yang Diutamakan</label><div class="grid grid-cols-1 md:grid-cols-2 mt-2" data-v-ebdcd06d${_scopeId2}><!--[-->`);
                  ssrRenderList(contactMethodOptions, (option) => {
                    _push3(`<div class="mb-2" data-v-ebdcd06d${_scopeId2}><label class="inline-flex items-center" data-v-ebdcd06d${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(contactInfo).preferredContact) ? ssrLooseContain(unref(contactInfo).preferredContact, option.value) : unref(contactInfo).preferredContact) ? " checked" : ""}${ssrRenderAttr("value", option.value)} class="mr-2" data-v-ebdcd06d${_scopeId2}><span data-v-ebdcd06d${_scopeId2}>${ssrInterpolate(option.label)}</span></label></div>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-base font-semibold mb-4" }, "Maklumat Perhubungan"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Alamat E-mel "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(contactInfo).email = $event,
                          type: "email",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: nama@emel.com"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(contactInfo).email]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("No. Telefon "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(contactInfo).phone = $event,
                          type: "tel",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: 0123456789"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(contactInfo).phone]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Kaedah Perhubungan Yang Diutamakan"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 mt-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(contactMethodOptions, (option) => {
                          return createVNode("div", {
                            key: option.value,
                            class: "mb-2"
                          }, [
                            createVNode("label", { class: "inline-flex items-center" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => unref(contactInfo).preferredContact = $event,
                                value: option.value,
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue", "value"]), [
                                [vModelCheckbox, unref(contactInfo).preferredContact]
                              ]),
                              createVNode("span", null, toDisplayString(option.label), 1)
                            ])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-end space-x-3" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "secondary-outline",
              onClick: saveDraft
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Simpan Draf`);
                } else {
                  return [
                    createTextVNode("Simpan Draf")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Hantar`);
                } else {
                  return [
                    createTextVNode("Hantar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 p-4 bg-blue-50 rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Amalan Terbaik Untuk Pengelompokan Medan:</h4><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Kelompokkan medan yang berkaitan bersama dalam kad atau bahagian yang jelas.</li><li data-v-ebdcd06d${_scopeId}>Gunakan tajuk subseksyen (semibold, 16px) untuk setiap kumpulan, sejajar ke kiri dan gaya yang konsisten.</li><li data-v-ebdcd06d${_scopeId}>Kekalkan jarak menegak 24px antara kumpulan untuk kejelasan.</li><li data-v-ebdcd06d${_scopeId}>Gunakan penjajaran grid dalam kumpulan untuk susun atur yang konsisten.</li><li data-v-ebdcd06d${_scopeId}>Untuk medan pilihan, tunjukkan dalam tajuk subheader (cth. &quot;Maklumat Tambahan (Pilihan)&quot;).</li><li data-v-ebdcd06d${_scopeId}>Pastikan kebolehcapaian dengan mengaitkan subheader dengan kumpulan medan menggunakan atribut ARIA yang sesuai.</li></ul></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Organizing form fields into logical groups reduces cognitive load and improves data entry accuracy. Group related fields together within visually distinct containers, such as Card components, to help users understand the context and flow of information."),
              createVNode("div", { class: "space-y-6" }, [
                createVNode(_component_rs_card, { class: "p-4" }, {
                  default: withCtx(() => [
                    createVNode("h3", { class: "text-base font-semibold mb-4" }, "Maklumat Peribadi"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Nama Penuh "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(personalInfo).fullName = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Masukkan nama penuh anda"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(personalInfo).fullName]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("No. Kad Pengenalan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(personalInfo).idNumber = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: 990101-07-1234"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(personalInfo).idNumber]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Tarikh Lahir "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(personalInfo).birthDate = $event,
                          type: "date",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(personalInfo).birthDate]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Jantina "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("div", { class: "space-x-4 mt-2" }, [
                          createVNode("label", { class: "inline-flex items-center" }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              "onUpdate:modelValue": ($event) => unref(personalInfo).gender = $event,
                              value: "lelaki",
                              class: "mr-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelRadio, unref(personalInfo).gender]
                            ]),
                            createVNode("span", null, "Lelaki")
                          ]),
                          createVNode("label", { class: "inline-flex items-center" }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              "onUpdate:modelValue": ($event) => unref(personalInfo).gender = $event,
                              value: "perempuan",
                              class: "mr-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelRadio, unref(personalInfo).gender]
                            ]),
                            createVNode("span", null, "Perempuan")
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_card, { class: "p-4" }, {
                  default: withCtx(() => [
                    createVNode("h3", { class: "text-base font-semibold mb-4" }, "Alamat Pemohon"),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                        createTextVNode("Alamat "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(addressInfo).street = $event,
                        type: "text",
                        class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        placeholder: "No. rumah dan nama jalan"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(addressInfo).street]
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Bandar "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(addressInfo).city = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: Shah Alam"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(addressInfo).city]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Poskod "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(addressInfo).postalCode = $event,
                          type: "text",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: 40000"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(addressInfo).postalCode]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Negeri "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(addressInfo).state = $event,
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: "",
                            selected: ""
                          }, "Pilih negeri"),
                          (openBlock(), createBlock(Fragment, null, renderList(stateOptions, (option) => {
                            return createVNode("option", {
                              key: option.value,
                              value: option.value
                            }, toDisplayString(option.label), 9, ["value"]);
                          }), 64))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(addressInfo).state]
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_card, { class: "p-4" }, {
                  default: withCtx(() => [
                    createVNode("h3", { class: "text-base font-semibold mb-4" }, "Maklumat Perhubungan"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Alamat E-mel "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(contactInfo).email = $event,
                          type: "email",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: nama@emel.com"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(contactInfo).email]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("No. Telefon "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(contactInfo).phone = $event,
                          type: "tel",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Contoh: 0123456789"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(contactInfo).phone]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Kaedah Perhubungan Yang Diutamakan"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 mt-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(contactMethodOptions, (option) => {
                          return createVNode("div", {
                            key: option.value,
                            class: "mb-2"
                          }, [
                            createVNode("label", { class: "inline-flex items-center" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => unref(contactInfo).preferredContact = $event,
                                value: option.value,
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue", "value"]), [
                                [vModelCheckbox, unref(contactInfo).preferredContact]
                              ]),
                              createVNode("span", null, toDisplayString(option.label), 1)
                            ])
                          ]);
                        }), 64))
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "flex justify-end space-x-3" }, [
                  createVNode(_component_rs_button, {
                    variant: "secondary-outline",
                    onClick: saveDraft
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Simpan Draf")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Hantar")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "mt-6 p-4 bg-blue-50 rounded-md" }, [
                  createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Amalan Terbaik Untuk Pengelompokan Medan:"),
                  createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                    createVNode("li", null, "Kelompokkan medan yang berkaitan bersama dalam kad atau bahagian yang jelas."),
                    createVNode("li", null, "Gunakan tajuk subseksyen (semibold, 16px) untuk setiap kumpulan, sejajar ke kiri dan gaya yang konsisten."),
                    createVNode("li", null, "Kekalkan jarak menegak 24px antara kumpulan untuk kejelasan."),
                    createVNode("li", null, "Gunakan penjajaran grid dalam kumpulan untuk susun atur yang konsisten."),
                    createVNode("li", null, 'Untuk medan pilihan, tunjukkan dalam tajuk subheader (cth. "Maklumat Tambahan (Pilihan)").'),
                    createVNode("li", null, "Pastikan kebolehcapaian dengan mengaitkan subheader dengan kumpulan medan menggunakan atribut ARIA yang sesuai.")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-text-fields",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Placeholder Text Best Practices </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-text-fields",
                  class: "mr-2"
                }),
                createTextVNode(" Placeholder Text Best Practices ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Placeholders should be used to provide hints about the expected input format, not as a replacement for labels. They should be concise, clear, and free of unnecessary words.</p><div class="space-y-6" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Penggunaan Placeholder Yang Betul</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Tarikh Lahir <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><div class="relative" data-v-ebdcd06d${_scopeId}><input type="text" placeholder="DD/MM/YYYY" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><div class="absolute right-2 top-2 text-gray-400" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-info",
              class: "cursor-help",
              title: "Format: Hari/Bulan/Tahun"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><p class="text-xs text-gray-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang baik: Placeholder menunjukkan format yang diharapkan</p></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Carian Pemohon</label><div class="relative" data-v-ebdcd06d${_scopeId}><input type="text" placeholder="Masukkan No. KP atau Nama" class="w-full border rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><div class="absolute left-3 top-2.5 text-gray-400" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "ic:outline-search" }, null, _parent2, _scopeId));
            _push2(`</div></div><p class="text-xs text-gray-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang baik: Placeholder menyatakan jenis input yang diterima</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Jumlah (RM)</label><input type="text" placeholder="Contoh: 1,000.00" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><p class="text-xs text-gray-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang baik: Menunjukkan format angka yang diharapkan</p></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>No. Telefon</label><input type="tel" placeholder="01x-xxxxxxx" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}><p class="text-xs text-gray-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang baik: Format nombor telefon yang diharapkan</p></div></div></div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Penggunaan Placeholder Yang Tidak Betul</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><div class="relative" data-v-ebdcd06d${_scopeId}><input type="text" placeholder="Nama Penuh *" class="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" data-v-ebdcd06d${_scopeId}></div><p class="text-xs text-red-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang tidak baik: Menggunakan placeholder sebagai ganti label</p></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Alamat</label><textarea placeholder="Sila masukkan alamat lengkap anda termasuk nombor rumah, nama jalan, taman perumahan, daerah dan poskod untuk memudahkan proses penghantaran dokumen" class="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-20" data-v-ebdcd06d${_scopeId}></textarea><p class="text-xs text-red-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang tidak baik: Placeholder terlalu panjang dan terperinci</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Emel</label><input type="email" placeholder="Emel tidak sah! Format: nama@domain.com" class="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" data-v-ebdcd06d${_scopeId}><p class="text-xs text-red-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang tidak baik: Menyertakan mesej ralat dalam placeholder</p></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Negeri</label><input type="text" placeholder="MASUKKAN NAMA NEGERI DI SINI" class="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" data-v-ebdcd06d${_scopeId}><p class="text-xs text-red-500 mt-1" data-v-ebdcd06d${_scopeId}>Contoh yang tidak baik: Menggunakan huruf besar sepenuhnya</p></div></div></div><div class="p-4 bg-blue-50 rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Amalan Terbaik Untuk Placeholder:</h4><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Gunakan placeholder hanya untuk memperjelas format input atau memberikan contoh ringkas.</li><li data-v-ebdcd06d${_scopeId}>Pastikan placeholder ringkas (di bawah 40 aksara) dan bebas dari perkataan yang tidak perlu.</li><li data-v-ebdcd06d${_scopeId}>Gunakan warna teks yang lebih ringan untuk placeholder (cth. #BDBDBD) untuk membezakannya dari input pengguna.</li><li data-v-ebdcd06d${_scopeId}>Jangan gunakan placeholder sebagai pengganti label yang boleh dilihat.</li><li data-v-ebdcd06d${_scopeId}>Jangan masukkan mesej pengesahan atau petunjuk ralat dalam placeholder.</li><li data-v-ebdcd06d${_scopeId}>Jangan gunakan HURUF BESAR atau tanda baca yang berlebihan.</li><li data-v-ebdcd06d${_scopeId}>Untuk medan dengan keperluan format tertentu, lengkapkan placeholder dengan ikon info dan tooltip untuk panduan tambahan.</li></ul></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Placeholders should be used to provide hints about the expected input format, not as a replacement for labels. They should be concise, clear, and free of unnecessary words."),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Penggunaan Placeholder Yang Betul"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                        createTextVNode("Tarikh Lahir "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode("div", { class: "relative" }, [
                        createVNode("input", {
                          type: "text",
                          placeholder: "DD/MM/YYYY",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }),
                        createVNode("div", { class: "absolute right-2 top-2 text-gray-400" }, [
                          createVNode(_component_Icon, {
                            name: "ic:outline-info",
                            class: "cursor-help",
                            title: "Format: Hari/Bulan/Tahun"
                          })
                        ])
                      ]),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Contoh yang baik: Placeholder menunjukkan format yang diharapkan")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Carian Pemohon"),
                      createVNode("div", { class: "relative" }, [
                        createVNode("input", {
                          type: "text",
                          placeholder: "Masukkan No. KP atau Nama",
                          class: "w-full border rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }),
                        createVNode("div", { class: "absolute left-3 top-2.5 text-gray-400" }, [
                          createVNode(_component_Icon, { name: "ic:outline-search" })
                        ])
                      ]),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Contoh yang baik: Placeholder menyatakan jenis input yang diterima")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Jumlah (RM)"),
                      createVNode("input", {
                        type: "text",
                        placeholder: "Contoh: 1,000.00",
                        class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      }),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Contoh yang baik: Menunjukkan format angka yang diharapkan")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "No. Telefon"),
                      createVNode("input", {
                        type: "tel",
                        placeholder: "01x-xxxxxxx",
                        class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      }),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Contoh yang baik: Format nombor telefon yang diharapkan")
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Penggunaan Placeholder Yang Tidak Betul"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "relative" }, [
                        createVNode("input", {
                          type: "text",
                          placeholder: "Nama Penuh *",
                          class: "w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        })
                      ]),
                      createVNode("p", { class: "text-xs text-red-500 mt-1" }, "Contoh yang tidak baik: Menggunakan placeholder sebagai ganti label")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Alamat"),
                      createVNode("textarea", {
                        placeholder: "Sila masukkan alamat lengkap anda termasuk nombor rumah, nama jalan, taman perumahan, daerah dan poskod untuk memudahkan proses penghantaran dokumen",
                        class: "w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-20"
                      }),
                      createVNode("p", { class: "text-xs text-red-500 mt-1" }, "Contoh yang tidak baik: Placeholder terlalu panjang dan terperinci")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Emel"),
                      createVNode("input", {
                        type: "email",
                        placeholder: "Emel tidak sah! Format: nama@domain.com",
                        class: "w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      }),
                      createVNode("p", { class: "text-xs text-red-500 mt-1" }, "Contoh yang tidak baik: Menyertakan mesej ralat dalam placeholder")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Negeri"),
                      createVNode("input", {
                        type: "text",
                        placeholder: "MASUKKAN NAMA NEGERI DI SINI",
                        class: "w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      }),
                      createVNode("p", { class: "text-xs text-red-500 mt-1" }, "Contoh yang tidak baik: Menggunakan huruf besar sepenuhnya")
                    ])
                  ])
                ]),
                createVNode("div", { class: "p-4 bg-blue-50 rounded-md" }, [
                  createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Amalan Terbaik Untuk Placeholder:"),
                  createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                    createVNode("li", null, "Gunakan placeholder hanya untuk memperjelas format input atau memberikan contoh ringkas."),
                    createVNode("li", null, "Pastikan placeholder ringkas (di bawah 40 aksara) dan bebas dari perkataan yang tidak perlu."),
                    createVNode("li", null, "Gunakan warna teks yang lebih ringan untuk placeholder (cth. #BDBDBD) untuk membezakannya dari input pengguna."),
                    createVNode("li", null, "Jangan gunakan placeholder sebagai pengganti label yang boleh dilihat."),
                    createVNode("li", null, "Jangan masukkan mesej pengesahan atau petunjuk ralat dalam placeholder."),
                    createVNode("li", null, "Jangan gunakan HURUF BESAR atau tanda baca yang berlebihan."),
                    createVNode("li", null, "Untuk medan dengan keperluan format tertentu, lengkapkan placeholder dengan ikon info dan tooltip untuk panduan tambahan.")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-save",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Save Draft &amp; Autosave </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-save",
                  class: "mr-2"
                }),
                createTextVNode(" Save Draft & Autosave ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>The ability to save drafts and autosave is essential for user convenience and data integrity, especially in long forms. This ensures that users don&#39;t lose their work due to timeouts, network issues, or accidental navigation away from the page.</p><div class="space-y-6" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Contoh Borang dengan Ciri Simpan Draf</h3><div class="border rounded-md p-4 mb-6" data-v-ebdcd06d${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Nama Projek <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><input type="text" value="Projek Bantuan Pendidikan 2023" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Ketua Projek <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><input type="text" value="Ahmad bin Hassan" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId}></div></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-600 mb-1" data-v-ebdcd06d${_scopeId}>Keterangan Projek</label><textarea class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20" data-v-ebdcd06d${_scopeId}>Program bantuan pendidikan untuk anak-anak asnaf di kawasan Shah Alam.</textarea></div><div class="mb-6 flex items-center space-x-2" data-v-ebdcd06d${_scopeId}><label class="inline-flex items-center cursor-pointer" data-v-ebdcd06d${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(autosaveEnabled)) ? ssrLooseContain(unref(autosaveEnabled), null) : unref(autosaveEnabled)) ? " checked" : ""} class="sr-only peer" data-v-ebdcd06d${_scopeId}><div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600" data-v-ebdcd06d${_scopeId}></div><span class="ms-3 text-sm font-medium text-gray-700" data-v-ebdcd06d${_scopeId}>Autosave</span></label>`);
            if (unref(lastSaved)) {
              _push2(`<div class="text-sm text-gray-500" data-v-ebdcd06d${_scopeId}> Terakhir disimpan: ${ssrInterpolate(new Date(unref(lastSaved)).toLocaleTimeString())}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(draftSaved)) {
              _push2(`<div class="p-3 mb-6 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm flex items-center" data-v-ebdcd06d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ic:outline-check-circle",
                class: "mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Draf disimpan secara automatik </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(failedToSave)) {
              _push2(`<div class="p-3 mb-6 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-center" data-v-ebdcd06d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ic:outline-error",
                class: "mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Gagal menyimpan draf. Sila cuba lagi. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-end space-x-3" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "secondary-outline",
              onClick: saveDraft,
              disabled: unref(savingDraft)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(savingDraft)) {
                    _push3(`<span class="flex items-center" data-v-ebdcd06d${_scopeId2}><span class="w-4 h-4 mr-2 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" data-v-ebdcd06d${_scopeId2}></span> Menyimpan... </span>`);
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "ic:outline-save",
                      class: "mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Simpan Draf <!--]-->`);
                  }
                } else {
                  return [
                    unref(savingDraft) ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex items-center"
                    }, [
                      createVNode("span", { class: "w-4 h-4 mr-2 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" }),
                      createTextVNode(" Menyimpan... ")
                    ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode(_component_Icon, {
                        name: "ic:outline-save",
                        class: "mr-1"
                      }),
                      createTextVNode(" Simpan Draf ")
                    ], 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Hantar`);
                } else {
                  return [
                    createTextVNode("Hantar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex space-x-4 mt-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "info",
              size: "sm",
              onClick: saveDraft
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Simulasi Simpan Draf `);
                } else {
                  return [
                    createTextVNode(" Simulasi Simpan Draf ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "danger",
              size: "sm",
              onClick: simulateFailedSave
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Simulasi Kegagalan Simpan `);
                } else {
                  return [
                    createTextVNode(" Simulasi Kegagalan Simpan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Butang Tetap di Bahagian Bawah</h3><div class="border rounded-md p-4 relative" data-v-ebdcd06d${_scopeId}><p class="text-sm mb-2" data-v-ebdcd06d${_scopeId}>Untuk borang yang panjang, kedudukan butang Simpan Draf harus tetap di bahagian bawah skrin untuk memastikan pengguna sentiasa dapat mencapainya tanpa perlu menatal ke bawah.</p><div class="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md" data-v-ebdcd06d${_scopeId}><div class="text-center py-6" data-v-ebdcd06d${_scopeId}>Kandungan borang yang panjang</div></div><div class="mt-4 border border-blue-200 bg-blue-50 p-3 rounded-md flex items-center justify-between" data-v-ebdcd06d${_scopeId}><span class="text-sm text-blue-700" data-v-ebdcd06d${_scopeId}>Butang Simpan Draf di bahagian bawah skrin</span>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              size: "sm",
              variant: "primary-outline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:outline-save",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Simpan Draf `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ic:outline-save",
                      class: "mr-1"
                    }),
                    createTextVNode(" Simpan Draf ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="p-4 bg-blue-50 rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Amalan Terbaik Untuk Ciri Simpan Draf &amp; Autosave:</h4><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Letakkan butang Simpan Draf di bahagian bawah-kanan borang yang panjang.</li><li data-v-ebdcd06d${_scopeId}>Aktifkan autosave pada selang masa 30 saat atau ketika pengguna meniggalkan medan.</li><li data-v-ebdcd06d${_scopeId}>Berikan notifikasi toast yang tidak mengganggu apabila draf disimpan secara automatik.</li><li data-v-ebdcd06d${_scopeId}>Dalam kes kegagalan rangkaian, paparkan amaran dalaman untuk memberitahu pengguna.</li><li data-v-ebdcd06d${_scopeId}>Sediakan cara untuk pengguna mengaktif atau menyahaktifkan ciri autosave.</li><li data-v-ebdcd06d${_scopeId}>Pastikan pengguna tahu kapan maklumat terakhir disimpan dengan penunjuk masa/tarikh.</li><li data-v-ebdcd06d${_scopeId}>Selalu berikan petunjuk visual semasa proses penyimpanan sedang berlaku (separator berputar).</li></ul></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "The ability to save drafts and autosave is essential for user convenience and data integrity, especially in long forms. This ensures that users don't lose their work due to timeouts, network issues, or accidental navigation away from the page."),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Contoh Borang dengan Ciri Simpan Draf"),
                  createVNode("div", { class: "border rounded-md p-4 mb-6" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Nama Projek "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("input", {
                          type: "text",
                          value: "Projek Bantuan Pendidikan 2023",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, [
                          createTextVNode("Ketua Projek "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("input", {
                          type: "text",
                          value: "Ahmad bin Hassan",
                          class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        })
                      ])
                    ]),
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-600 mb-1" }, "Keterangan Projek"),
                      createVNode("textarea", { class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20" }, "Program bantuan pendidikan untuk anak-anak asnaf di kawasan Shah Alam.")
                    ]),
                    createVNode("div", { class: "mb-6 flex items-center space-x-2" }, [
                      createVNode("label", { class: "inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => isRef(autosaveEnabled) ? autosaveEnabled.value = $event : null,
                          class: "sr-only peer"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(autosaveEnabled)]
                        ]),
                        createVNode("div", { class: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600" }),
                        createVNode("span", { class: "ms-3 text-sm font-medium text-gray-700" }, "Autosave")
                      ]),
                      unref(lastSaved) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-sm text-gray-500"
                      }, " Terakhir disimpan: " + toDisplayString(new Date(unref(lastSaved)).toLocaleTimeString()), 1)) : createCommentVNode("", true)
                    ]),
                    unref(draftSaved) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-3 mb-6 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm flex items-center"
                    }, [
                      createVNode(_component_Icon, {
                        name: "ic:outline-check-circle",
                        class: "mr-2"
                      }),
                      createTextVNode(" Draf disimpan secara automatik ")
                    ])) : createCommentVNode("", true),
                    unref(failedToSave) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-3 mb-6 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-center"
                    }, [
                      createVNode(_component_Icon, {
                        name: "ic:outline-error",
                        class: "mr-2"
                      }),
                      createTextVNode(" Gagal menyimpan draf. Sila cuba lagi. ")
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex justify-end space-x-3" }, [
                      createVNode(_component_rs_button, {
                        variant: "secondary-outline",
                        onClick: saveDraft,
                        disabled: unref(savingDraft)
                      }, {
                        default: withCtx(() => [
                          unref(savingDraft) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "flex items-center"
                          }, [
                            createVNode("span", { class: "w-4 h-4 mr-2 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" }),
                            createTextVNode(" Menyimpan... ")
                          ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(_component_Icon, {
                              name: "ic:outline-save",
                              class: "mr-1"
                            }),
                            createTextVNode(" Simpan Draf ")
                          ], 64))
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(_component_rs_button, { variant: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("Hantar")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "flex space-x-4 mt-4" }, [
                    createVNode(_component_rs_button, {
                      variant: "info",
                      size: "sm",
                      onClick: saveDraft
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Simulasi Simpan Draf ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, {
                      variant: "danger",
                      size: "sm",
                      onClick: simulateFailedSave
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Simulasi Kegagalan Simpan ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Butang Tetap di Bahagian Bawah"),
                  createVNode("div", { class: "border rounded-md p-4 relative" }, [
                    createVNode("p", { class: "text-sm mb-2" }, "Untuk borang yang panjang, kedudukan butang Simpan Draf harus tetap di bahagian bawah skrin untuk memastikan pengguna sentiasa dapat mencapainya tanpa perlu menatal ke bawah."),
                    createVNode("div", { class: "mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md" }, [
                      createVNode("div", { class: "text-center py-6" }, "Kandungan borang yang panjang")
                    ]),
                    createVNode("div", { class: "mt-4 border border-blue-200 bg-blue-50 p-3 rounded-md flex items-center justify-between" }, [
                      createVNode("span", { class: "text-sm text-blue-700" }, "Butang Simpan Draf di bahagian bawah skrin"),
                      createVNode(_component_rs_button, {
                        size: "sm",
                        variant: "primary-outline"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ic:outline-save",
                            class: "mr-1"
                          }),
                          createTextVNode(" Simpan Draf ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "p-4 bg-blue-50 rounded-md" }, [
                  createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Amalan Terbaik Untuk Ciri Simpan Draf & Autosave:"),
                  createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                    createVNode("li", null, "Letakkan butang Simpan Draf di bahagian bawah-kanan borang yang panjang."),
                    createVNode("li", null, "Aktifkan autosave pada selang masa 30 saat atau ketika pengguna meniggalkan medan."),
                    createVNode("li", null, "Berikan notifikasi toast yang tidak mengganggu apabila draf disimpan secara automatik."),
                    createVNode("li", null, "Dalam kes kegagalan rangkaian, paparkan amaran dalaman untuk memberitahu pengguna."),
                    createVNode("li", null, "Sediakan cara untuk pengguna mengaktif atau menyahaktifkan ciri autosave."),
                    createVNode("li", null, "Pastikan pengguna tahu kapan maklumat terakhir disimpan dengan penunjuk masa/tarikh."),
                    createVNode("li", null, "Selalu berikan petunjuk visual semasa proses penyimpanan sedang berlaku (separator berputar).")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-toggle-on",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Selection Controls: Radio Buttons, Checkboxes, and Dropdowns </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-toggle-on",
                  class: "mr-2"
                }),
                createTextVNode(" Selection Controls: Radio Buttons, Checkboxes, and Dropdowns ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Choosing the correct selection control is critical for usability and clarity. Use radio buttons for single selection among a small set of options, checkboxes for multi-select scenarios, and dropdowns for single selection when there are many options.</p><div class="space-y-8" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Radio Buttons (Butang Radio)</h3><p class="text-sm mb-4" data-v-ebdcd06d${_scopeId}>Gunakan untuk pemilihan tunggal daripada set pilihan yang kecil dan dapat dilihat (idealnya 2-5 pilihan).</p><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Contoh Radio Button Asas</h4><fieldset data-v-ebdcd06d${_scopeId}><legend class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Jenis Bantuan:</legend><div class="space-y-2" data-v-ebdcd06d${_scopeId}><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="radio" name="jenisBantuan" value="pendidikan" class="mr-2" checked data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Pendidikan</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="radio" name="jenisBantuan" value="perubatan" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Perubatan</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="radio" name="jenisBantuan" value="rumah" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Rumah</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="radio" name="jenisBantuan" value="sarahidup" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Sara Hidup</span></label></div></fieldset></div><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Radio Button Mendatar (Untuk Pilihan Lebih Pendek)</h4><fieldset data-v-ebdcd06d${_scopeId}><legend class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Jantina:</legend><div class="flex space-x-6" data-v-ebdcd06d${_scopeId}><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="radio" name="jantina" value="lelaki" class="mr-2" checked data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Lelaki</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="radio" name="jantina" value="perempuan" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Perempuan</span></label></div></fieldset></div><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Radio Button dengan Teks Panjang</h4><fieldset data-v-ebdcd06d${_scopeId}><legend class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Jenis Permohonan:</legend><div class="space-y-4" data-v-ebdcd06d${_scopeId}><label class="flex items-start" data-v-ebdcd06d${_scopeId}><input type="radio" name="jenisPermohonan" value="monthly" class="mr-2 mt-1" checked data-v-ebdcd06d${_scopeId}><span class="text-sm" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(longContentRadioOptions[0].label)}</span></label><label class="flex items-start" data-v-ebdcd06d${_scopeId}><input type="radio" name="jenisPermohonan" value="one_time" class="mr-2 mt-1" data-v-ebdcd06d${_scopeId}><span class="text-sm" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(longContentRadioOptions[1].label)}</span></label><label class="flex items-start" data-v-ebdcd06d${_scopeId}><input type="radio" name="jenisPermohonan" value="staged" class="mr-2 mt-1" data-v-ebdcd06d${_scopeId}><span class="text-sm" data-v-ebdcd06d${_scopeId}>${ssrInterpolate(longContentRadioOptions[2].label)}</span></label></div></fieldset></div></div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Checkboxes (Kotak Semak)</h3><p class="text-sm mb-4" data-v-ebdcd06d${_scopeId}>Gunakan untuk senario multi-pilih, di mana pengguna boleh memilih beberapa pilihan, atau untuk togol boolean (on/off).</p><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Contoh Checkbox Asas</h4><fieldset data-v-ebdcd06d${_scopeId}><legend class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Minat (Pilih semua yang berkenaan):</legend><div class="grid grid-cols-1 md:grid-cols-2 gap-2" data-v-ebdcd06d${_scopeId}><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="news" class="mr-2" checked data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Berita dan Kemaskini</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="volunteer" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Aktiviti Sukarelawan</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="education" class="mr-2" checked data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Pendidikan</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="medical" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Perubatan</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="living_expenses" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Sara Hidup</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="business" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bantuan Perniagaan</span></label></div></fieldset></div><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Checkbox Togol (Boolean)</h4><div class="space-y-4" data-v-ebdcd06d${_scopeId}><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" class="mr-2" checked data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Tunjuk semua rekod</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Terima notifikasi emel</span></label><label class="inline-flex items-center cursor-pointer" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="" class="sr-only peer" checked data-v-ebdcd06d${_scopeId}><div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600" data-v-ebdcd06d${_scopeId}></div><span class="ms-3 text-sm font-medium text-gray-700" data-v-ebdcd06d${_scopeId}>Toggle switch</span></label></div></div><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Checkbox dengan Pilihan &quot;Pilih Semua&quot;</h4><fieldset data-v-ebdcd06d${_scopeId}><legend class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Dokumen Sokongan:</legend><div class="mb-2 border-b pb-2" data-v-ebdcd06d${_scopeId}><label class="flex items-center font-medium" data-v-ebdcd06d${_scopeId}><input type="checkbox" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Pilih Semua</span></label></div><div class="space-y-2 ml-6" data-v-ebdcd06d${_scopeId}><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="ic" class="mr-2" checked data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Salinan Kad Pengenalan</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="bank_statement" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Penyata Bank (3 bulan terkini)</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="salary_slip" class="mr-2" checked data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Slip Gaji (3 bulan terkini)</span></label><label class="flex items-center" data-v-ebdcd06d${_scopeId}><input type="checkbox" value="utility_bill" class="mr-2" data-v-ebdcd06d${_scopeId}><span data-v-ebdcd06d${_scopeId}>Bil Utiliti</span></label></div></fieldset></div></div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Dropdowns (Menu Pilihan)</h3><p class="text-sm mb-4" data-v-ebdcd06d${_scopeId}>Gunakan untuk pemilihan tunggal apabila terdapat lebih daripada 5 pilihan, atau apabila ruang terhad.</p><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Contoh Dropdown Asas</h4><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Negeri:</label><select class="w-full border rounded-md p-2" data-v-ebdcd06d${_scopeId}><option value="" disabled selected data-v-ebdcd06d${_scopeId}>Pilih negeri</option><!--[-->`);
            ssrRenderList(stateOptions, (option) => {
              _push2(`<option${ssrRenderAttr("value", option.value)} data-v-ebdcd06d${_scopeId}>${ssrInterpolate(option.label)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Dropdown dengan Kumpulan Pilihan</h4><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Kategori Zakat:</label><select class="w-full border rounded-md p-2" data-v-ebdcd06d${_scopeId}><option value="" disabled selected data-v-ebdcd06d${_scopeId}>Pilih kategori</option><optgroup label="Zakat Pendapatan" data-v-ebdcd06d${_scopeId}><option value="gaji" data-v-ebdcd06d${_scopeId}>Gaji</option><option value="bonus" data-v-ebdcd06d${_scopeId}>Bonus</option><option value="komisen" data-v-ebdcd06d${_scopeId}>Komisen</option></optgroup><optgroup label="Zakat Perniagaan" data-v-ebdcd06d${_scopeId}><option value="perniagaan_individu" data-v-ebdcd06d${_scopeId}>Perniagaan Individu</option><option value="perniagaan_syarikat" data-v-ebdcd06d${_scopeId}>Perniagaan Syarikat</option></optgroup><optgroup label="Zakat Harta" data-v-ebdcd06d${_scopeId}><option value="emas" data-v-ebdcd06d${_scopeId}>Emas</option><option value="perak" data-v-ebdcd06d${_scopeId}>Perak</option><option value="simpanan" data-v-ebdcd06d${_scopeId}>Simpanan</option><option value="saham" data-v-ebdcd06d${_scopeId}>Saham</option></optgroup></select></div></div><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Dropdown Boleh Cari</h4><div class="mb-2" data-v-ebdcd06d${_scopeId}><label class="block text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Carian dengan V-Select (component placeholder):</label><div class="border rounded-md p-3 bg-gray-50 text-sm" data-v-ebdcd06d${_scopeId}><p data-v-ebdcd06d${_scopeId}>Untuk set data yang besar, gunakan komponen dropdown boleh cari seperti Vue Select (v-select)</p><p class="mt-2 text-blue-600" data-v-ebdcd06d${_scopeId}>Contoh: &lt;v-select :options=&quot;stateOptions&quot; placeholder=&quot;Pilih negeri&quot;&gt;&lt;/v-select&gt;</p></div></div></div></div><div class="p-4 bg-blue-50 rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Amalan Terbaik Untuk Kawalan Pemilihan:</h4><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Radio Buttons:</strong> Gunakan untuk pemilihan tunggal dari set yang kecil dan terlihat (2-5 pilihan).</li><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Checkboxes:</strong> Gunakan untuk pemilihan berganda atau nilai boolean (on/off).</li><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Dropdowns:</strong> Gunakan untuk pemilihan tunggal dengan banyak pilihan (&gt;5) atau ruang terhad.</li><li data-v-ebdcd06d${_scopeId}>Jangan nyahaktifkan pilihan melainkan sangat perlu; sebaliknya, terangkan mengapa pilihan tidak tersedia.</li><li data-v-ebdcd06d${_scopeId}>Pastikan semua kawalan boleh diakses sepenuhnya melalui papan kekunci (Tab, Arrow keys, Space/Enter).</li><li data-v-ebdcd06d${_scopeId}>Berikan tanda yang jelas untuk keadaan dipilih dengan kontras yang cukup.</li><li data-v-ebdcd06d${_scopeId}>Untuk senarai panjang, pertimbangkan untuk mengelompokkan pilihan dengan subheading atau pemisah.</li></ul></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Choosing the correct selection control is critical for usability and clarity. Use radio buttons for single selection among a small set of options, checkboxes for multi-select scenarios, and dropdowns for single selection when there are many options."),
              createVNode("div", { class: "space-y-8" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Radio Buttons (Butang Radio)"),
                  createVNode("p", { class: "text-sm mb-4" }, "Gunakan untuk pemilihan tunggal daripada set pilihan yang kecil dan dapat dilihat (idealnya 2-5 pilihan)."),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Contoh Radio Button Asas"),
                    createVNode("fieldset", null, [
                      createVNode("legend", { class: "text-sm font-semibold mb-2" }, "Jenis Bantuan:"),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jenisBantuan",
                            value: "pendidikan",
                            class: "mr-2",
                            checked: ""
                          }),
                          createVNode("span", null, "Bantuan Pendidikan")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jenisBantuan",
                            value: "perubatan",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Bantuan Perubatan")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jenisBantuan",
                            value: "rumah",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Bantuan Rumah")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jenisBantuan",
                            value: "sarahidup",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Bantuan Sara Hidup")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Radio Button Mendatar (Untuk Pilihan Lebih Pendek)"),
                    createVNode("fieldset", null, [
                      createVNode("legend", { class: "text-sm font-semibold mb-2" }, "Jantina:"),
                      createVNode("div", { class: "flex space-x-6" }, [
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jantina",
                            value: "lelaki",
                            class: "mr-2",
                            checked: ""
                          }),
                          createVNode("span", null, "Lelaki")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jantina",
                            value: "perempuan",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Perempuan")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Radio Button dengan Teks Panjang"),
                    createVNode("fieldset", null, [
                      createVNode("legend", { class: "text-sm font-semibold mb-2" }, "Jenis Permohonan:"),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("label", { class: "flex items-start" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jenisPermohonan",
                            value: "monthly",
                            class: "mr-2 mt-1",
                            checked: ""
                          }),
                          createVNode("span", { class: "text-sm" }, toDisplayString(longContentRadioOptions[0].label), 1)
                        ]),
                        createVNode("label", { class: "flex items-start" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jenisPermohonan",
                            value: "one_time",
                            class: "mr-2 mt-1"
                          }),
                          createVNode("span", { class: "text-sm" }, toDisplayString(longContentRadioOptions[1].label), 1)
                        ]),
                        createVNode("label", { class: "flex items-start" }, [
                          createVNode("input", {
                            type: "radio",
                            name: "jenisPermohonan",
                            value: "staged",
                            class: "mr-2 mt-1"
                          }),
                          createVNode("span", { class: "text-sm" }, toDisplayString(longContentRadioOptions[2].label), 1)
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Checkboxes (Kotak Semak)"),
                  createVNode("p", { class: "text-sm mb-4" }, "Gunakan untuk senario multi-pilih, di mana pengguna boleh memilih beberapa pilihan, atau untuk togol boolean (on/off)."),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Contoh Checkbox Asas"),
                    createVNode("fieldset", null, [
                      createVNode("legend", { class: "text-sm font-semibold mb-2" }, "Minat (Pilih semua yang berkenaan):"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-2" }, [
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "news",
                            class: "mr-2",
                            checked: ""
                          }),
                          createVNode("span", null, "Berita dan Kemaskini")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "volunteer",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Aktiviti Sukarelawan")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "education",
                            class: "mr-2",
                            checked: ""
                          }),
                          createVNode("span", null, "Bantuan Pendidikan")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "medical",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Bantuan Perubatan")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "living_expenses",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Bantuan Sara Hidup")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "business",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Bantuan Perniagaan")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Checkbox Togol (Boolean)"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode("input", {
                          type: "checkbox",
                          class: "mr-2",
                          checked: ""
                        }),
                        createVNode("span", null, "Tunjuk semua rekod")
                      ]),
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode("input", {
                          type: "checkbox",
                          class: "mr-2"
                        }),
                        createVNode("span", null, "Terima notifikasi emel")
                      ]),
                      createVNode("label", { class: "inline-flex items-center cursor-pointer" }, [
                        createVNode("input", {
                          type: "checkbox",
                          value: "",
                          class: "sr-only peer",
                          checked: ""
                        }),
                        createVNode("div", { class: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600" }),
                        createVNode("span", { class: "ms-3 text-sm font-medium text-gray-700" }, "Toggle switch")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, 'Checkbox dengan Pilihan "Pilih Semua"'),
                    createVNode("fieldset", null, [
                      createVNode("legend", { class: "text-sm font-semibold mb-2" }, "Dokumen Sokongan:"),
                      createVNode("div", { class: "mb-2 border-b pb-2" }, [
                        createVNode("label", { class: "flex items-center font-medium" }, [
                          createVNode("input", {
                            type: "checkbox",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Pilih Semua")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2 ml-6" }, [
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "ic",
                            class: "mr-2",
                            checked: ""
                          }),
                          createVNode("span", null, "Salinan Kad Pengenalan")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "bank_statement",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Penyata Bank (3 bulan terkini)")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "salary_slip",
                            class: "mr-2",
                            checked: ""
                          }),
                          createVNode("span", null, "Slip Gaji (3 bulan terkini)")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: "utility_bill",
                            class: "mr-2"
                          }),
                          createVNode("span", null, "Bil Utiliti")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Dropdowns (Menu Pilihan)"),
                  createVNode("p", { class: "text-sm mb-4" }, "Gunakan untuk pemilihan tunggal apabila terdapat lebih daripada 5 pilihan, atau apabila ruang terhad."),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Contoh Dropdown Asas"),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-semibold mb-2" }, "Negeri:"),
                      createVNode("select", { class: "w-full border rounded-md p-2" }, [
                        createVNode("option", {
                          value: "",
                          disabled: "",
                          selected: ""
                        }, "Pilih negeri"),
                        (openBlock(), createBlock(Fragment, null, renderList(stateOptions, (option) => {
                          return createVNode("option", {
                            key: option.value,
                            value: option.value
                          }, toDisplayString(option.label), 9, ["value"]);
                        }), 64))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Dropdown dengan Kumpulan Pilihan"),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-semibold mb-2" }, "Kategori Zakat:"),
                      createVNode("select", { class: "w-full border rounded-md p-2" }, [
                        createVNode("option", {
                          value: "",
                          disabled: "",
                          selected: ""
                        }, "Pilih kategori"),
                        createVNode("optgroup", { label: "Zakat Pendapatan" }, [
                          createVNode("option", { value: "gaji" }, "Gaji"),
                          createVNode("option", { value: "bonus" }, "Bonus"),
                          createVNode("option", { value: "komisen" }, "Komisen")
                        ]),
                        createVNode("optgroup", { label: "Zakat Perniagaan" }, [
                          createVNode("option", { value: "perniagaan_individu" }, "Perniagaan Individu"),
                          createVNode("option", { value: "perniagaan_syarikat" }, "Perniagaan Syarikat")
                        ]),
                        createVNode("optgroup", { label: "Zakat Harta" }, [
                          createVNode("option", { value: "emas" }, "Emas"),
                          createVNode("option", { value: "perak" }, "Perak"),
                          createVNode("option", { value: "simpanan" }, "Simpanan"),
                          createVNode("option", { value: "saham" }, "Saham")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                    createVNode("h4", { class: "text-sm font-medium mb-3" }, "Dropdown Boleh Cari"),
                    createVNode("div", { class: "mb-2" }, [
                      createVNode("label", { class: "block text-sm font-semibold mb-2" }, "Carian dengan V-Select (component placeholder):"),
                      createVNode("div", { class: "border rounded-md p-3 bg-gray-50 text-sm" }, [
                        createVNode("p", null, "Untuk set data yang besar, gunakan komponen dropdown boleh cari seperti Vue Select (v-select)"),
                        createVNode("p", { class: "mt-2 text-blue-600" }, 'Contoh: <v-select :options="stateOptions" placeholder="Pilih negeri"></v-select>')
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "p-4 bg-blue-50 rounded-md" }, [
                  createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Amalan Terbaik Untuk Kawalan Pemilihan:"),
                  createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                    createVNode("li", null, [
                      createVNode("strong", null, "Radio Buttons:"),
                      createTextVNode(" Gunakan untuk pemilihan tunggal dari set yang kecil dan terlihat (2-5 pilihan).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Checkboxes:"),
                      createTextVNode(" Gunakan untuk pemilihan berganda atau nilai boolean (on/off).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Dropdowns:"),
                      createTextVNode(" Gunakan untuk pemilihan tunggal dengan banyak pilihan (>5) atau ruang terhad.")
                    ]),
                    createVNode("li", null, "Jangan nyahaktifkan pilihan melainkan sangat perlu; sebaliknya, terangkan mengapa pilihan tidak tersedia."),
                    createVNode("li", null, "Pastikan semua kawalan boleh diakses sepenuhnya melalui papan kekunci (Tab, Arrow keys, Space/Enter)."),
                    createVNode("li", null, "Berikan tanda yang jelas untuk keadaan dipilih dengan kontras yang cukup."),
                    createVNode("li", null, "Untuk senarai panjang, pertimbangkan untuk mengelompokkan pilihan dengan subheading atau pemisah.")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-navigation",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Navigation Components </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ic:outline-navigation",
                  class: "mr-2"
                }),
                createTextVNode(" Navigation Components ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Navigation components help users move through the application efficiently.</p><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Breadcrumbs</h3><nav aria-label="breadcrumb" class="bg-gray-100 p-2 rounded-md" data-v-ebdcd06d${_scopeId}><ol class="flex items-center space-x-2 text-sm" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}><a href="#" class="text-blue-600 hover:underline" data-v-ebdcd06d${_scopeId}>Home</a></li><li class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-keyboard-arrow-right",
              class: "mx-1"
            }, null, _parent2, _scopeId));
            _push2(`<a href="#" class="text-blue-600 hover:underline" data-v-ebdcd06d${_scopeId}>Users</a></li><li class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:outline-keyboard-arrow-right",
              class: "mx-1"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-gray-600" data-v-ebdcd06d${_scopeId}>Edit User</span></li></ol></nav></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Pagination</h3><div class="flex items-center justify-center" data-v-ebdcd06d${_scopeId}><nav class="inline-flex rounded-md shadow-sm" data-v-ebdcd06d${_scopeId}><a href="#" class="px-3 py-2 border border-gray-300 bg-white text-sm font-medium rounded-l-md hover:bg-gray-50" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "ic:outline-chevron-left" }, null, _parent2, _scopeId));
            _push2(`</a><a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium hover:bg-gray-50" data-v-ebdcd06d${_scopeId}>1</a><a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-blue-50 text-blue-600 text-sm font-medium" data-v-ebdcd06d${_scopeId}>2</a><a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium hover:bg-gray-50" data-v-ebdcd06d${_scopeId}>3</a><a href="#" class="px-3 py-2 border border-gray-300 bg-white text-sm font-medium rounded-r-md hover:bg-gray-50" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "ic:outline-chevron-right" }, null, _parent2, _scopeId));
            _push2(`</a></nav></div></div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Wizard Navigation</h3><div class="mb-4" data-v-ebdcd06d${_scopeId}><div class="mb-10" data-v-ebdcd06d${_scopeId}><div class="flex justify-between items-center w-full mb-8" data-v-ebdcd06d${_scopeId}><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" data-v-ebdcd06d${_scopeId}> 1 </div><div class="mt-2 text-xs font-medium text-blue-600" data-v-ebdcd06d${_scopeId}> Maklumat </div></div><div class="flex-grow h-px bg-blue-600 mx-2" data-v-ebdcd06d${_scopeId}></div><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" data-v-ebdcd06d${_scopeId}> 2 </div><div class="mt-2 text-xs font-medium text-blue-600" data-v-ebdcd06d${_scopeId}> Maklumat </div></div><div class="flex-grow h-px bg-gray-300 mx-2" data-v-ebdcd06d${_scopeId}></div><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" data-v-ebdcd06d${_scopeId}> 3 </div><div class="mt-2 text-xs font-medium text-gray-600" data-v-ebdcd06d${_scopeId}> Pengiraan </div></div><div class="flex-grow h-px bg-gray-300 mx-2" data-v-ebdcd06d${_scopeId}></div><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" data-v-ebdcd06d${_scopeId}> 4 </div><div class="mt-2 text-xs font-medium text-gray-600" data-v-ebdcd06d${_scopeId}> Pembayaran </div></div></div></div><div class="p-6 border rounded-md" data-v-ebdcd06d${_scopeId}><h3 class="font-semibold text-lg mb-4" data-v-ebdcd06d${_scopeId}>Step 2: Contact Information</h3><div class="space-y-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Email Address <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><input type="email" class="w-full border border-gray-300 rounded-md p-2" data-v-ebdcd06d${_scopeId}></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Phone Number <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><input type="tel" class="w-full border border-gray-300 rounded-md p-2" data-v-ebdcd06d${_scopeId}></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Address <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><textarea class="w-full border border-gray-300 rounded-md p-2" rows="3" data-v-ebdcd06d${_scopeId}></textarea></div></div><div class="flex justify-between mt-6" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "secondary-outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Previous`);
                } else {
                  return [
                    createTextVNode("Previous")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Next`);
                } else {
                  return [
                    createTextVNode("Next")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Navigation components help users move through the application efficiently."),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-2" }, "Breadcrumbs"),
                createVNode("nav", {
                  "aria-label": "breadcrumb",
                  class: "bg-gray-100 p-2 rounded-md"
                }, [
                  createVNode("ol", { class: "flex items-center space-x-2 text-sm" }, [
                    createVNode("li", null, [
                      createVNode("a", {
                        href: "#",
                        class: "text-blue-600 hover:underline"
                      }, "Home")
                    ]),
                    createVNode("li", { class: "flex items-center" }, [
                      createVNode(_component_Icon, {
                        name: "ic:outline-keyboard-arrow-right",
                        class: "mx-1"
                      }),
                      createVNode("a", {
                        href: "#",
                        class: "text-blue-600 hover:underline"
                      }, "Users")
                    ]),
                    createVNode("li", { class: "flex items-center" }, [
                      createVNode(_component_Icon, {
                        name: "ic:outline-keyboard-arrow-right",
                        class: "mx-1"
                      }),
                      createVNode("span", { class: "text-gray-600" }, "Edit User")
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-2" }, "Pagination"),
                createVNode("div", { class: "flex items-center justify-center" }, [
                  createVNode("nav", { class: "inline-flex rounded-md shadow-sm" }, [
                    createVNode("a", {
                      href: "#",
                      class: "px-3 py-2 border border-gray-300 bg-white text-sm font-medium rounded-l-md hover:bg-gray-50"
                    }, [
                      createVNode(_component_Icon, { name: "ic:outline-chevron-left" })
                    ]),
                    createVNode("a", {
                      href: "#",
                      class: "px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium hover:bg-gray-50"
                    }, "1"),
                    createVNode("a", {
                      href: "#",
                      class: "px-3 py-2 border-t border-b border-gray-300 bg-blue-50 text-blue-600 text-sm font-medium"
                    }, "2"),
                    createVNode("a", {
                      href: "#",
                      class: "px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium hover:bg-gray-50"
                    }, "3"),
                    createVNode("a", {
                      href: "#",
                      class: "px-3 py-2 border border-gray-300 bg-white text-sm font-medium rounded-r-md hover:bg-gray-50"
                    }, [
                      createVNode(_component_Icon, { name: "ic:outline-chevron-right" })
                    ])
                  ])
                ])
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "text-base font-semibold mb-2" }, "Wizard Navigation"),
                createVNode("div", { class: "mb-4" }, [
                  createVNode("div", { class: "mb-10" }, [
                    createVNode("div", { class: "flex justify-between items-center w-full mb-8" }, [
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" }, " 1 "),
                        createVNode("div", { class: "mt-2 text-xs font-medium text-blue-600" }, " Maklumat ")
                      ]),
                      createVNode("div", { class: "flex-grow h-px bg-blue-600 mx-2" }),
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" }, " 2 "),
                        createVNode("div", { class: "mt-2 text-xs font-medium text-blue-600" }, " Maklumat ")
                      ]),
                      createVNode("div", { class: "flex-grow h-px bg-gray-300 mx-2" }),
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" }, " 3 "),
                        createVNode("div", { class: "mt-2 text-xs font-medium text-gray-600" }, " Pengiraan ")
                      ]),
                      createVNode("div", { class: "flex-grow h-px bg-gray-300 mx-2" }),
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" }, " 4 "),
                        createVNode("div", { class: "mt-2 text-xs font-medium text-gray-600" }, " Pembayaran ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "p-6 border rounded-md" }, [
                    createVNode("h3", { class: "font-semibold text-lg mb-4" }, "Step 2: Contact Information"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                          createTextVNode("Email Address "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("input", {
                          type: "email",
                          class: "w-full border border-gray-300 rounded-md p-2"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                          createTextVNode("Phone Number "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("input", {
                          type: "tel",
                          class: "w-full border border-gray-300 rounded-md p-2"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                          createTextVNode("Address "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("textarea", {
                          class: "w-full border border-gray-300 rounded-md p-2",
                          rows: "3"
                        })
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-between mt-6" }, [
                      createVNode(_component_rs_button, { variant: "secondary-outline" }, {
                        default: withCtx(() => [
                          createTextVNode("Previous")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_rs_button, { variant: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("Next")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:shapes",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Icons Usage and Best Practices </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:shapes",
                  class: "mr-2"
                }),
                createTextVNode(" Icons Usage and Best Practices ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Icons enhance clarity and speed of recognition for common actions. Use the Material Icons or Phosphor Icons (ph:) sets available in the codebase.</p><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Standard Icon Set</h3><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6" data-v-ebdcd06d${_scopeId}><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:edit",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Edit</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:edit</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:pencil",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Edit (Alternative)</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:pencil</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:delete",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Delete</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:delete</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:trash",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Delete (Alternative)</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:trash</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:visibility",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>View</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:visibility</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:eye",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>View (Alternative)</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:eye</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:add",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Add</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:add</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:plus",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Add (Alternative)</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:plus</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:key",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Reset Password</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:key</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:search",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Search</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:search</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:check",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Approve/Complete</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:check</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "material-symbols:close",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Cancel/Close</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>material-symbols:close</div></div></div><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Navigation Icons</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-v-ebdcd06d${_scopeId}><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:arrow-up",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Arrow Up</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:arrow-up</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:arrow-down",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Arrow Down</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:arrow-down</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:arrow-left",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Arrow Left</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:arrow-left</div></div><div class="p-4 border rounded-md flex flex-col items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:arrow-right",
              size: "24",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm font-medium" data-v-ebdcd06d${_scopeId}>Arrow Right</div><div class="text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>ph:arrow-right</div></div></div><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Icon Placement in Buttons</h3><div class="space-y-6" data-v-ebdcd06d${_scopeId}><div class="mb-6" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Left-aligned Icons (Standard)</h4><div class="flex flex-wrap gap-3" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "material-symbols:add",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Add User `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "material-symbols:add",
                      class: "mr-1"
                    }),
                    createTextVNode(" Add User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "material-symbols:edit",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Edit `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "material-symbols:edit",
                      class: "mr-1"
                    }),
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:trash",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Delete `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:trash",
                      class: "mr-1"
                    }),
                    createTextVNode(" Delete ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "success" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "material-symbols:check",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Approve `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "material-symbols:check",
                      class: "mr-1"
                    }),
                    createTextVNode(" Approve ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId}>Icon-only Buttons with Tooltips</h4><div class="flex flex-wrap gap-3" data-v-ebdcd06d${_scopeId}><div class="relative" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "info-text",
              class: "p-1 w-8 h-8",
              "aria-label": "Edit user"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "material-symbols:edit",
                    size: "18"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "material-symbols:edit",
                      size: "18"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(tooltips)["iconEdit"]) {
              _push2(`<span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Edit </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary-text",
              class: "p-1 w-8 h-8",
              "aria-label": "View details"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:eye",
                    size: "18"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:eye",
                      size: "18"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(tooltips)["iconView"]) {
              _push2(`<span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> View </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "warning-text",
              class: "p-1 w-8 h-8",
              "aria-label": "Reset password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "material-symbols:key",
                    size: "18"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "material-symbols:key",
                      size: "18"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(tooltips)["iconReset"]) {
              _push2(`<span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Reset Password </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "danger-text",
              class: "p-1 w-8 h-8",
              "aria-label": "Delete user"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:trash",
                    size: "18",
                    class: "text-red-600"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:trash",
                      size: "18",
                      class: "text-red-600"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(tooltips)["iconDelete"]) {
              _push2(`<span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Delete </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Icons in Dropdown Menu</h3><div class="mb-6" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_dropdown, {
              text: "Actions",
              variant: "secondary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:eye",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` View Details `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:eye",
                            class: "mr-2"
                          }),
                          createTextVNode(" View Details ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:pencil",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Edit User `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:pencil",
                            class: "mr-2"
                          }),
                          createTextVNode(" Edit User ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:key",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Reset Password `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:key",
                            class: "mr-2"
                          }),
                          createTextVNode(" Reset Password ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:plus",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Add Field `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:plus",
                            class: "mr-2"
                          }),
                          createTextVNode(" Add Field ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:arrow-up",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Move Up `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:arrow-up",
                            class: "mr-2"
                          }),
                          createTextVNode(" Move Up ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:arrow-down",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Move Down `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:arrow-down",
                            class: "mr-2"
                          }),
                          createTextVNode(" Move Down ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_dropdown_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:trash",
                          class: "mr-2 text-red-600"
                        }, null, _parent4, _scopeId3));
                        _push4(` Delete User `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "ph:trash",
                            class: "mr-2 text-red-600"
                          }),
                          createTextVNode(" Delete User ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:eye",
                          class: "mr-2"
                        }),
                        createTextVNode(" View Details ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:pencil",
                          class: "mr-2"
                        }),
                        createTextVNode(" Edit User ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:key",
                          class: "mr-2"
                        }),
                        createTextVNode(" Reset Password ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:plus",
                          class: "mr-2"
                        }),
                        createTextVNode(" Add Field ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:arrow-up",
                          class: "mr-2"
                        }),
                        createTextVNode(" Move Up ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:arrow-down",
                          class: "mr-2"
                        }),
                        createTextVNode(" Move Down ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:trash",
                          class: "mr-2 text-red-600"
                        }),
                        createTextVNode(" Delete User ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Table Row Actions with Icons</h3><div class="overflow-x-auto mb-6" data-v-ebdcd06d${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-ebdcd06d${_scopeId}><thead class="bg-gray-50" data-v-ebdcd06d${_scopeId}><tr data-v-ebdcd06d${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>ID</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Name</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Email</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ebdcd06d${_scopeId}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-ebdcd06d${_scopeId}><tr data-v-ebdcd06d${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>USR-001</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>Ahmad bin Hassan</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-ebdcd06d${_scopeId}>ahmad@example.com</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-v-ebdcd06d${_scopeId}><div class="flex justify-end space-x-2" data-v-ebdcd06d${_scopeId}><div class="relative" data-v-ebdcd06d${_scopeId}><button class="text-blue-600 hover:text-blue-900" aria-label="View details" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:eye",
              size: "18"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
            if (unref(tooltips)["rowView"]) {
              _push2(`<span class="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> View </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}><button class="text-indigo-600 hover:text-indigo-900" aria-label="Edit user" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:pencil",
              size: "18"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
            if (unref(tooltips)["rowEdit"]) {
              _push2(`<span class="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Edit </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}><button class="text-yellow-600 hover:text-yellow-900" aria-label="Reset password" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:key",
              size: "18"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
            if (unref(tooltips)["rowKey"]) {
              _push2(`<span class="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Reset Password </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="relative" data-v-ebdcd06d${_scopeId}><button class="text-red-600 hover:text-red-900" aria-label="Delete user" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:trash",
              size: "18"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
            if (unref(tooltips)["rowDelete"]) {
              _push2(`<span class="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10" data-v-ebdcd06d${_scopeId}> Delete </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></td></tr></tbody></table></div><div class="p-4 bg-blue-50 rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Icon Best Practices:</h4><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Icon + Text:</strong> Always pair icons with text unless the action is universally understood (e.g., trash for delete).</li><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Icon-only buttons:</strong> Always include a tooltip and an accessible aria-label.</li><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Placement:</strong> Place icons to the left of text in buttons.</li><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Size:</strong> Use consistent sizing - 16-18px for buttons in tables/toolbars, 20-24px for larger buttons and cards/headers.</li><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Color:</strong> Use red for destructive actions, gray/muted for disabled states.</li><li data-v-ebdcd06d${_scopeId}><strong data-v-ebdcd06d${_scopeId}>Accessibility:</strong> Never rely on color alone to convey meaning. Always include text or tooltips.</li></ul><div class="mt-4 text-center" data-v-ebdcd06d${_scopeId}><a href="https://icones.js.org/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline inline-flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:link",
              class: "mr-1"
            }, null, _parent2, _scopeId));
            _push2(` View Complete Icon Library `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:arrow-up-right",
              class: "ml-1",
              size: "14"
            }, null, _parent2, _scopeId));
            _push2(`</a></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Icons enhance clarity and speed of recognition for common actions. Use the Material Icons or Phosphor Icons (ph:) sets available in the codebase."),
              createVNode("h3", { class: "text-base font-semibold mb-4" }, "Standard Icon Set"),
              createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6" }, [
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:edit",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Edit"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:edit")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:pencil",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Edit (Alternative)"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:pencil")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:delete",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Delete"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:delete")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:trash",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Delete (Alternative)"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:trash")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:visibility",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "View"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:visibility")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:eye",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "View (Alternative)"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:eye")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:add",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Add"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:add")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:plus",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Add (Alternative)"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:plus")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:key",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Reset Password"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:key")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:search",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Search"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:search")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:check",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Approve/Complete"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:check")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "material-symbols:close",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Cancel/Close"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "material-symbols:close")
                ])
              ]),
              createVNode("h3", { class: "text-base font-semibold mb-4" }, "Navigation Icons"),
              createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" }, [
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:arrow-up",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Arrow Up"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:arrow-up")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:arrow-down",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Arrow Down"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:arrow-down")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:arrow-left",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Arrow Left"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:arrow-left")
                ]),
                createVNode("div", { class: "p-4 border rounded-md flex flex-col items-center" }, [
                  createVNode(_component_Icon, {
                    name: "ph:arrow-right",
                    size: "24",
                    class: "mb-2"
                  }),
                  createVNode("div", { class: "text-sm font-medium" }, "Arrow Right"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "ph:arrow-right")
                ])
              ]),
              createVNode("h3", { class: "text-base font-semibold mb-4" }, "Icon Placement in Buttons"),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "text-sm font-medium mb-3" }, "Left-aligned Icons (Standard)"),
                  createVNode("div", { class: "flex flex-wrap gap-3" }, [
                    createVNode(_component_rs_button, { variant: "primary" }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "material-symbols:add",
                          class: "mr-1"
                        }),
                        createTextVNode(" Add User ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, { variant: "info" }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "material-symbols:edit",
                          class: "mr-1"
                        }),
                        createTextVNode(" Edit ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, { variant: "danger" }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:trash",
                          class: "mr-1"
                        }),
                        createTextVNode(" Delete ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, { variant: "success" }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "material-symbols:check",
                          class: "mr-1"
                        }),
                        createTextVNode(" Approve ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "text-sm font-medium mb-3" }, "Icon-only Buttons with Tooltips"),
                  createVNode("div", { class: "flex flex-wrap gap-3" }, [
                    createVNode("div", {
                      class: "relative",
                      onMouseenter: ($event) => unref(tooltips)["iconEdit"] = true,
                      onMouseleave: ($event) => unref(tooltips)["iconEdit"] = false
                    }, [
                      createVNode(_component_rs_button, {
                        variant: "info-text",
                        class: "p-1 w-8 h-8",
                        "aria-label": "Edit user"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "material-symbols:edit",
                            size: "18"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(Transition, { name: "tooltip" }, {
                        default: withCtx(() => [
                          unref(tooltips)["iconEdit"] ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                          }, " Edit ")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onMouseenter", "onMouseleave"]),
                    createVNode("div", {
                      class: "relative",
                      onMouseenter: ($event) => unref(tooltips)["iconView"] = true,
                      onMouseleave: ($event) => unref(tooltips)["iconView"] = false
                    }, [
                      createVNode(_component_rs_button, {
                        variant: "primary-text",
                        class: "p-1 w-8 h-8",
                        "aria-label": "View details"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:eye",
                            size: "18"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(Transition, { name: "tooltip" }, {
                        default: withCtx(() => [
                          unref(tooltips)["iconView"] ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                          }, " View ")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onMouseenter", "onMouseleave"]),
                    createVNode("div", {
                      class: "relative",
                      onMouseenter: ($event) => unref(tooltips)["iconReset"] = true,
                      onMouseleave: ($event) => unref(tooltips)["iconReset"] = false
                    }, [
                      createVNode(_component_rs_button, {
                        variant: "warning-text",
                        class: "p-1 w-8 h-8",
                        "aria-label": "Reset password"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "material-symbols:key",
                            size: "18"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(Transition, { name: "tooltip" }, {
                        default: withCtx(() => [
                          unref(tooltips)["iconReset"] ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                          }, " Reset Password ")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onMouseenter", "onMouseleave"]),
                    createVNode("div", {
                      class: "relative",
                      onMouseenter: ($event) => unref(tooltips)["iconDelete"] = true,
                      onMouseleave: ($event) => unref(tooltips)["iconDelete"] = false
                    }, [
                      createVNode(_component_rs_button, {
                        variant: "danger-text",
                        class: "p-1 w-8 h-8",
                        "aria-label": "Delete user"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:trash",
                            size: "18",
                            class: "text-red-600"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(Transition, { name: "tooltip" }, {
                        default: withCtx(() => [
                          unref(tooltips)["iconDelete"] ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                          }, " Delete ")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onMouseenter", "onMouseleave"])
                  ])
                ])
              ]),
              createVNode("h3", { class: "text-base font-semibold mb-4" }, "Icons in Dropdown Menu"),
              createVNode("div", { class: "mb-6" }, [
                createVNode(_component_rs_dropdown, {
                  text: "Actions",
                  variant: "secondary"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:eye",
                          class: "mr-2"
                        }),
                        createTextVNode(" View Details ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:pencil",
                          class: "mr-2"
                        }),
                        createTextVNode(" Edit User ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:key",
                          class: "mr-2"
                        }),
                        createTextVNode(" Reset Password ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:plus",
                          class: "mr-2"
                        }),
                        createTextVNode(" Add Field ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:arrow-up",
                          class: "mr-2"
                        }),
                        createTextVNode(" Move Up ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:arrow-down",
                          class: "mr-2"
                        }),
                        createTextVNode(" Move Down ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_dropdown_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:trash",
                          class: "mr-2 text-red-600"
                        }),
                        createTextVNode(" Delete User ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode("h3", { class: "text-base font-semibold mb-4" }, "Table Row Actions with Icons"),
              createVNode("div", { class: "overflow-x-auto mb-6" }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                  createVNode("thead", { class: "bg-gray-50" }, [
                    createVNode("tr", null, [
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "ID"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Name"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Email"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      }, "Actions")
                    ])
                  ]),
                  createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                    createVNode("tr", null, [
                      createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, "USR-001"),
                      createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, "Ahmad bin Hassan"),
                      createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, "ahmad@example.com"),
                      createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                        createVNode("div", { class: "flex justify-end space-x-2" }, [
                          createVNode("div", {
                            class: "relative",
                            onMouseenter: ($event) => unref(tooltips)["rowView"] = true,
                            onMouseleave: ($event) => unref(tooltips)["rowView"] = false
                          }, [
                            createVNode("button", {
                              class: "text-blue-600 hover:text-blue-900",
                              "aria-label": "View details"
                            }, [
                              createVNode(_component_Icon, {
                                name: "ph:eye",
                                size: "18"
                              })
                            ]),
                            createVNode(Transition, { name: "tooltip" }, {
                              default: withCtx(() => [
                                unref(tooltips)["rowView"] ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                                }, " View ")) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ], 40, ["onMouseenter", "onMouseleave"]),
                          createVNode("div", {
                            class: "relative",
                            onMouseenter: ($event) => unref(tooltips)["rowEdit"] = true,
                            onMouseleave: ($event) => unref(tooltips)["rowEdit"] = false
                          }, [
                            createVNode("button", {
                              class: "text-indigo-600 hover:text-indigo-900",
                              "aria-label": "Edit user"
                            }, [
                              createVNode(_component_Icon, {
                                name: "ph:pencil",
                                size: "18"
                              })
                            ]),
                            createVNode(Transition, { name: "tooltip" }, {
                              default: withCtx(() => [
                                unref(tooltips)["rowEdit"] ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                                }, " Edit ")) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ], 40, ["onMouseenter", "onMouseleave"]),
                          createVNode("div", {
                            class: "relative",
                            onMouseenter: ($event) => unref(tooltips)["rowKey"] = true,
                            onMouseleave: ($event) => unref(tooltips)["rowKey"] = false
                          }, [
                            createVNode("button", {
                              class: "text-yellow-600 hover:text-yellow-900",
                              "aria-label": "Reset password"
                            }, [
                              createVNode(_component_Icon, {
                                name: "ph:key",
                                size: "18"
                              })
                            ]),
                            createVNode(Transition, { name: "tooltip" }, {
                              default: withCtx(() => [
                                unref(tooltips)["rowKey"] ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                                }, " Reset Password ")) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ], 40, ["onMouseenter", "onMouseleave"]),
                          createVNode("div", {
                            class: "relative",
                            onMouseenter: ($event) => unref(tooltips)["rowDelete"] = true,
                            onMouseleave: ($event) => unref(tooltips)["rowDelete"] = false
                          }, [
                            createVNode("button", {
                              class: "text-red-600 hover:text-red-900",
                              "aria-label": "Delete user"
                            }, [
                              createVNode(_component_Icon, {
                                name: "ph:trash",
                                size: "18"
                              })
                            ]),
                            createVNode(Transition, { name: "tooltip" }, {
                              default: withCtx(() => [
                                unref(tooltips)["rowDelete"] ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10"
                                }, " Delete ")) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ], 40, ["onMouseenter", "onMouseleave"])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "p-4 bg-blue-50 rounded-md" }, [
                createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Icon Best Practices:"),
                createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                  createVNode("li", null, [
                    createVNode("strong", null, "Icon + Text:"),
                    createTextVNode(" Always pair icons with text unless the action is universally understood (e.g., trash for delete).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Icon-only buttons:"),
                    createTextVNode(" Always include a tooltip and an accessible aria-label.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Placement:"),
                    createTextVNode(" Place icons to the left of text in buttons.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Size:"),
                    createTextVNode(" Use consistent sizing - 16-18px for buttons in tables/toolbars, 20-24px for larger buttons and cards/headers.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Color:"),
                    createTextVNode(" Use red for destructive actions, gray/muted for disabled states.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Accessibility:"),
                    createTextVNode(" Never rely on color alone to convey meaning. Always include text or tooltips.")
                  ])
                ]),
                createVNode("div", { class: "mt-4 text-center" }, [
                  createVNode("a", {
                    href: "https://icones.js.org/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "text-blue-600 hover:underline inline-flex items-center"
                  }, [
                    createVNode(_component_Icon, {
                      name: "ph:link",
                      class: "mr-1"
                    }),
                    createTextVNode(" View Complete Icon Library "),
                    createVNode(_component_Icon, {
                      name: "ph:arrow-up-right",
                      class: "ml-1",
                      size: "14"
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:steps",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Wizard Component </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:steps",
                  class: "mr-2"
                }),
                createTextVNode(" Wizard Component ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Wizard components guide users through complex multi-step processes, showing clear progress and allowing navigation between steps.</p><div class="mb-6 p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Multi-Step Form Wizard</h3><div class="mb-10" data-v-ebdcd06d${_scopeId}><div class="flex justify-between items-center w-full mb-8" data-v-ebdcd06d${_scopeId}><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" data-v-ebdcd06d${_scopeId}> 1 </div><div class="mt-2 text-xs font-medium text-blue-600" data-v-ebdcd06d${_scopeId}> Maklumat </div></div><div class="flex-grow h-px bg-blue-600 mx-2" data-v-ebdcd06d${_scopeId}></div><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" data-v-ebdcd06d${_scopeId}> 2 </div><div class="mt-2 text-xs font-medium text-blue-600" data-v-ebdcd06d${_scopeId}> Maklumat </div></div><div class="flex-grow h-px bg-gray-300 mx-2" data-v-ebdcd06d${_scopeId}></div><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" data-v-ebdcd06d${_scopeId}> 3 </div><div class="mt-2 text-xs font-medium text-gray-600" data-v-ebdcd06d${_scopeId}> Pengiraan </div></div><div class="flex-grow h-px bg-gray-300 mx-2" data-v-ebdcd06d${_scopeId}></div><div class="flex flex-col items-center" data-v-ebdcd06d${_scopeId}><div class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" data-v-ebdcd06d${_scopeId}> 4 </div><div class="mt-2 text-xs font-medium text-gray-600" data-v-ebdcd06d${_scopeId}> Pembayaran </div></div></div></div><div class="mb-6 border rounded-md p-6" data-v-ebdcd06d${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Langkah 2: Maklumat Pendapatan</h3><div class="space-y-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Jumlah Gaji Bulanan (RM) <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><input type="number" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 5000" data-v-ebdcd06d${_scopeId}><p class="mt-1 text-sm text-gray-500" data-v-ebdcd06d${_scopeId}>Jumlah gaji kasar sebelum potongan</p></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Bonus Tahunan (RM)</label><input type="number" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 10000" data-v-ebdcd06d${_scopeId}></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Pendapatan Lain (RM)</label><input type="number" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 2000" data-v-ebdcd06d${_scopeId}><p class="mt-1 text-sm text-gray-500" data-v-ebdcd06d${_scopeId}>Termasuk pendapatan sewaan, dividen, dll.</p></div><div class="pt-2" data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Potongan Bulanan (RM)</label><div class="space-y-3 pl-2 mt-3 border-l-2 border-gray-200" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>KWSP/EPF (RM)</label><input type="number" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 550" data-v-ebdcd06d${_scopeId}></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId}>Insurans Perubatan (RM)</label><input type="number" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 200" data-v-ebdcd06d${_scopeId}></div></div></div></div></div><div class="flex justify-between" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "secondary-outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:arrow-left",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Sebelumnya `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:arrow-left",
                      class: "mr-1"
                    }),
                    createTextVNode(" Sebelumnya ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Seterusnya `);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:arrow-right",
                    class: "ml-1"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Seterusnya "),
                    createVNode(_component_Icon, {
                      name: "ph:arrow-right",
                      class: "ml-1"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="border rounded-md p-4 bg-blue-50" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Amalan Terbaik Wizard</h4><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Gunakan komponen <code data-v-ebdcd06d${_scopeId}>&lt;rs-wizard&gt;</code> untuk borang berbilang langkah yang memerlukan penyelesaian berurutan.</li><li data-v-ebdcd06d${_scopeId}>Sediakan penunjuk kemajuan visual yang jelas menunjukkan langkah yang selesai, semasa, dan akan datang.</li><li data-v-ebdcd06d${_scopeId}>Pastikan navigasi papan kekunci dengan Tab, Enter/Space untuk maju, dan kekunci anak panah untuk langkah.</li><li data-v-ebdcd06d${_scopeId}>Sahkan setiap langkah sebelum membenarkan kemajuan atau tunjukkan ralat pengesahan.</li><li data-v-ebdcd06d${_scopeId}>Kekalkan keadaan borang antara langkah dan benarkan navigasi ke langkah yang telah selesai.</li><li data-v-ebdcd06d${_scopeId}>Sediakan butang navigasi jelas pada kedudukan konsisten (Sebelumnya/Seterusnya).</li><li data-v-ebdcd06d${_scopeId}>Tunjukkan medan yang diperlukan pada setiap langkah dengan tanda bintang dan berikan ringkasan ralat.</li></ul></div><div class="mt-4" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-3" data-v-ebdcd06d${_scopeId}>Ciri-ciri Kebolehcapaian</h3><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Peranan ARIA dan penanda mengenal pasti struktur wizard (<code data-v-ebdcd06d${_scopeId}>role=&quot;region&quot;</code> dengan <code data-v-ebdcd06d${_scopeId}>aria-labelledby</code>).</li><li data-v-ebdcd06d${_scopeId}>Pengurusan fokus memastikan input pertama dalam setiap langkah menerima fokus semasa navigasi.</li><li data-v-ebdcd06d${_scopeId}>Penunjuk langkah menggunakan atribut ARIA yang sesuai (<code data-v-ebdcd06d${_scopeId}>aria-current</code>, <code data-v-ebdcd06d${_scopeId}>aria-label</code>).</li><li data-v-ebdcd06d${_scopeId}>Pemberitahuan ralat menggunakan kawasan <code data-v-ebdcd06d${_scopeId}>aria-live</code> untuk pengumuman pembaca skrin.</li><li data-v-ebdcd06d${_scopeId}>Semua elemen interaktif dapat dikendalikan dengan papan kekunci dengan penunjuk fokus yang jelas.</li></ul></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Wizard components guide users through complex multi-step processes, showing clear progress and allowing navigation between steps."),
              createVNode("div", { class: "mb-6 p-4 border rounded-md" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Multi-Step Form Wizard"),
                createVNode("div", { class: "mb-10" }, [
                  createVNode("div", { class: "flex justify-between items-center w-full mb-8" }, [
                    createVNode("div", { class: "flex flex-col items-center" }, [
                      createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" }, " 1 "),
                      createVNode("div", { class: "mt-2 text-xs font-medium text-blue-600" }, " Maklumat ")
                    ]),
                    createVNode("div", { class: "flex-grow h-px bg-blue-600 mx-2" }),
                    createVNode("div", { class: "flex flex-col items-center" }, [
                      createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white text-sm font-medium" }, " 2 "),
                      createVNode("div", { class: "mt-2 text-xs font-medium text-blue-600" }, " Maklumat ")
                    ]),
                    createVNode("div", { class: "flex-grow h-px bg-gray-300 mx-2" }),
                    createVNode("div", { class: "flex flex-col items-center" }, [
                      createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" }, " 3 "),
                      createVNode("div", { class: "mt-2 text-xs font-medium text-gray-600" }, " Pengiraan ")
                    ]),
                    createVNode("div", { class: "flex-grow h-px bg-gray-300 mx-2" }),
                    createVNode("div", { class: "flex flex-col items-center" }, [
                      createVNode("div", { class: "rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium" }, " 4 "),
                      createVNode("div", { class: "mt-2 text-xs font-medium text-gray-600" }, " Pembayaran ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-6 border rounded-md p-6" }, [
                  createVNode("h3", { class: "text-lg font-semibold mb-4" }, "Langkah 2: Maklumat Pendapatan"),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                        createTextVNode("Jumlah Gaji Bulanan (RM) "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode("input", {
                        type: "number",
                        class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        placeholder: "Contoh: 5000"
                      }),
                      createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Jumlah gaji kasar sebelum potongan")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-1" }, "Bonus Tahunan (RM)"),
                      createVNode("input", {
                        type: "number",
                        class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        placeholder: "Contoh: 10000"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-1" }, "Pendapatan Lain (RM)"),
                      createVNode("input", {
                        type: "number",
                        class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        placeholder: "Contoh: 2000"
                      }),
                      createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Termasuk pendapatan sewaan, dividen, dll.")
                    ]),
                    createVNode("div", { class: "pt-2" }, [
                      createVNode("label", { class: "block text-sm font-medium mb-1" }, "Potongan Bulanan (RM)"),
                      createVNode("div", { class: "space-y-3 pl-2 mt-3 border-l-2 border-gray-200" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "KWSP/EPF (RM)"),
                          createVNode("input", {
                            type: "number",
                            class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            placeholder: "Contoh: 550"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Insurans Perubatan (RM)"),
                          createVNode("input", {
                            type: "number",
                            class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            placeholder: "Contoh: 200"
                          })
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode(_component_rs_button, { variant: "secondary-outline" }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "ph:arrow-left",
                        class: "mr-1"
                      }),
                      createTextVNode(" Sebelumnya ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_rs_button, { variant: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode(" Seterusnya "),
                      createVNode(_component_Icon, {
                        name: "ph:arrow-right",
                        class: "ml-1"
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "border rounded-md p-4 bg-blue-50" }, [
                createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Amalan Terbaik Wizard"),
                createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                  createVNode("li", null, [
                    createTextVNode("Gunakan komponen "),
                    createVNode("code", null, "<rs-wizard>"),
                    createTextVNode(" untuk borang berbilang langkah yang memerlukan penyelesaian berurutan.")
                  ]),
                  createVNode("li", null, "Sediakan penunjuk kemajuan visual yang jelas menunjukkan langkah yang selesai, semasa, dan akan datang."),
                  createVNode("li", null, "Pastikan navigasi papan kekunci dengan Tab, Enter/Space untuk maju, dan kekunci anak panah untuk langkah."),
                  createVNode("li", null, "Sahkan setiap langkah sebelum membenarkan kemajuan atau tunjukkan ralat pengesahan."),
                  createVNode("li", null, "Kekalkan keadaan borang antara langkah dan benarkan navigasi ke langkah yang telah selesai."),
                  createVNode("li", null, "Sediakan butang navigasi jelas pada kedudukan konsisten (Sebelumnya/Seterusnya)."),
                  createVNode("li", null, "Tunjukkan medan yang diperlukan pada setiap langkah dengan tanda bintang dan berikan ringkasan ralat.")
                ])
              ]),
              createVNode("div", { class: "mt-4" }, [
                createVNode("h3", { class: "text-base font-semibold mb-3" }, "Ciri-ciri Kebolehcapaian"),
                createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                  createVNode("li", null, [
                    createTextVNode("Peranan ARIA dan penanda mengenal pasti struktur wizard ("),
                    createVNode("code", null, 'role="region"'),
                    createTextVNode(" dengan "),
                    createVNode("code", null, "aria-labelledby"),
                    createTextVNode(").")
                  ]),
                  createVNode("li", null, "Pengurusan fokus memastikan input pertama dalam setiap langkah menerima fokus semasa navigasi."),
                  createVNode("li", null, [
                    createTextVNode("Penunjuk langkah menggunakan atribut ARIA yang sesuai ("),
                    createVNode("code", null, "aria-current"),
                    createTextVNode(", "),
                    createVNode("code", null, "aria-label"),
                    createTextVNode(").")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Pemberitahuan ralat menggunakan kawasan "),
                    createVNode("code", null, "aria-live"),
                    createTextVNode(" untuk pengumuman pembaca skrin.")
                  ]),
                  createVNode("li", null, "Semua elemen interaktif dapat dikendalikan dengan papan kekunci dengan penunjuk fokus yang jelas.")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:stack",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Accordion Component </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:stack",
                  class: "mr-2"
                }),
                createTextVNode(" Accordion Component ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Accordions provide a way to organize and present content in a limited space, expanding and collapsing sections as needed.</p><div class="mb-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Basic Accordion</h3>`);
            _push2(ssrRenderComponent(_component_rs_collapse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_rs_collapse_item, { title: "Personal Information" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4 space-y-4" data-v-ebdcd06d${_scopeId3}><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>Full Name <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}></div><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>IC Number <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 901231-14-5566" data-v-ebdcd06d${_scopeId3}></div><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>Date of Birth <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="date" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4 space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("Full Name "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "text",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("IC Number "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "text",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                placeholder: "e.g., 901231-14-5566"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("Date of Birth "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "date",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_collapse_item, { title: "Contact Details" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4 space-y-4" data-v-ebdcd06d${_scopeId3}><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>Email Address <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="email" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}></div><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>Phone Number <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="tel" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4 space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("Email Address "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "email",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("Phone Number "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "tel",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_collapse_item, { title: "Address Information" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4 space-y-4" data-v-ebdcd06d${_scopeId3}><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>Street Address <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-ebdcd06d${_scopeId3}><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>City <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}></div><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>Postal Code <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><input type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}></div><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-1" data-v-ebdcd06d${_scopeId3}>State <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><select class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId3}><option value="" disabled selected data-v-ebdcd06d${_scopeId3}>Select state</option><option value="selangor" data-v-ebdcd06d${_scopeId3}>Selangor</option><option value="kl" data-v-ebdcd06d${_scopeId3}>Kuala Lumpur</option><option value="penang" data-v-ebdcd06d${_scopeId3}>Pulau Pinang</option><option value="johor" data-v-ebdcd06d${_scopeId3}>Johor</option></select></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4 space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("Street Address "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "text",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                  createTextVNode("City "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                createVNode("input", {
                                  type: "text",
                                  class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                })
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                  createTextVNode("Postal Code "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                createVNode("input", {
                                  type: "text",
                                  class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                })
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                  createTextVNode("State "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                createVNode("select", { class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" }, [
                                  createVNode("option", {
                                    value: "",
                                    disabled: "",
                                    selected: ""
                                  }, "Select state"),
                                  createVNode("option", { value: "selangor" }, "Selangor"),
                                  createVNode("option", { value: "kl" }, "Kuala Lumpur"),
                                  createVNode("option", { value: "penang" }, "Pulau Pinang"),
                                  createVNode("option", { value: "johor" }, "Johor")
                                ])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_collapse_item, { title: "Supporting Documents" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4 space-y-4" data-v-ebdcd06d${_scopeId3}><div data-v-ebdcd06d${_scopeId3}><label class="block text-sm font-medium mb-3" data-v-ebdcd06d${_scopeId3}>Identity Card (Front &amp; Back) <span class="text-red-500" data-v-ebdcd06d${_scopeId3}>*</span></label><div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center" data-v-ebdcd06d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "ph:upload-simple",
                          size: "36",
                          class: "text-gray-400 mx-auto mb-2"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-sm text-gray-500 mb-1" data-v-ebdcd06d${_scopeId3}>Drag and drop files here, or click to browse</p><p class="text-xs text-gray-400" data-v-ebdcd06d${_scopeId3}>Supported formats: JPG, PNG, PDF (Max 2MB)</p></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4 space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-3" }, [
                                createTextVNode("Identity Card (Front & Back) "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("div", { class: "border-2 border-dashed border-gray-300 rounded-md p-6 text-center" }, [
                                createVNode(_component_Icon, {
                                  name: "ph:upload-simple",
                                  size: "36",
                                  class: "text-gray-400 mx-auto mb-2"
                                }),
                                createVNode("p", { class: "text-sm text-gray-500 mb-1" }, "Drag and drop files here, or click to browse"),
                                createVNode("p", { class: "text-xs text-gray-400" }, "Supported formats: JPG, PNG, PDF (Max 2MB)")
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_rs_collapse_item, { title: "Personal Information" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Full Name "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "text",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("IC Number "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "text",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                              placeholder: "e.g., 901231-14-5566"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Date of Birth "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "date",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Contact Details" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Email Address "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "email",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Phone Number "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "tel",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Address Information" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Street Address "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "text",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("City "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "text",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("Postal Code "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "text",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("State "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("select", { class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" }, [
                                createVNode("option", {
                                  value: "",
                                  disabled: "",
                                  selected: ""
                                }, "Select state"),
                                createVNode("option", { value: "selangor" }, "Selangor"),
                                createVNode("option", { value: "kl" }, "Kuala Lumpur"),
                                createVNode("option", { value: "penang" }, "Pulau Pinang"),
                                createVNode("option", { value: "johor" }, "Johor")
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Supporting Documents" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-3" }, [
                              createTextVNode("Identity Card (Front & Back) "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("div", { class: "border-2 border-dashed border-gray-300 rounded-md p-6 text-center" }, [
                              createVNode(_component_Icon, {
                                name: "ph:upload-simple",
                                size: "36",
                                class: "text-gray-400 mx-auto mb-2"
                              }),
                              createVNode("p", { class: "text-sm text-gray-500 mb-1" }, "Drag and drop files here, or click to browse"),
                              createVNode("p", { class: "text-xs text-gray-400" }, "Supported formats: JPG, PNG, PDF (Max 2MB)")
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end space-x-3 mt-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "secondary-outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Submit Application`);
                } else {
                  return [
                    createTextVNode("Submit Application")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 border rounded-md p-4 bg-blue-50" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Accordion Best Practices</h4><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Use accordions for long forms to reduce cognitive load by breaking content into manageable sections.</li><li data-v-ebdcd06d${_scopeId}>Single-section expansion is preferred for clarity (only one accordion item open at a time).</li><li data-v-ebdcd06d${_scopeId}>Ensure each section header clearly describes its contents.</li><li data-v-ebdcd06d${_scopeId}>Add visual indicators showing completion status of each section (optional).</li><li data-v-ebdcd06d${_scopeId}>Keep important actions (e.g., Submit button) outside the accordion for visibility.</li><li data-v-ebdcd06d${_scopeId}>Group related fields logically within each accordion section.</li></ul></div><div class="mt-4" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-3" data-v-ebdcd06d${_scopeId}>Accessibility Features</h3><ul class="text-sm space-y-2 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Accordion headers use the <code data-v-ebdcd06d${_scopeId}>button</code> element for keyboard and screen reader accessibility.</li><li data-v-ebdcd06d${_scopeId}>ARIA attributes (<code data-v-ebdcd06d${_scopeId}>aria-expanded</code>, <code data-v-ebdcd06d${_scopeId}>aria-controls</code>) indicate state.</li><li data-v-ebdcd06d${_scopeId}>Keyboard operation allows navigating with Tab and toggling with Space/Enter.</li><li data-v-ebdcd06d${_scopeId}>Visible focus indicators highlight the current section being interacted with.</li><li data-v-ebdcd06d${_scopeId}>Proper heading hierarchy within accordion content for semantic structure.</li></ul></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Accordions provide a way to organize and present content in a limited space, expanding and collapsing sections as needed."),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h3", { class: "text-base font-semibold mb-4" }, "Basic Accordion"),
                createVNode(_component_rs_collapse, null, {
                  default: withCtx(() => [
                    createVNode(_component_rs_collapse_item, { title: "Personal Information" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Full Name "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "text",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("IC Number "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "text",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                              placeholder: "e.g., 901231-14-5566"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Date of Birth "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "date",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Contact Details" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Email Address "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "email",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Phone Number "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "tel",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Address Information" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                              createTextVNode("Street Address "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("input", {
                              type: "text",
                              class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            })
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("City "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "text",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("Postal Code "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("input", {
                                type: "text",
                                class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, [
                                createTextVNode("State "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              createVNode("select", { class: "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" }, [
                                createVNode("option", {
                                  value: "",
                                  disabled: "",
                                  selected: ""
                                }, "Select state"),
                                createVNode("option", { value: "selangor" }, "Selangor"),
                                createVNode("option", { value: "kl" }, "Kuala Lumpur"),
                                createVNode("option", { value: "penang" }, "Pulau Pinang"),
                                createVNode("option", { value: "johor" }, "Johor")
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_collapse_item, { title: "Supporting Documents" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-3" }, [
                              createTextVNode("Identity Card (Front & Back) "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            createVNode("div", { class: "border-2 border-dashed border-gray-300 rounded-md p-6 text-center" }, [
                              createVNode(_component_Icon, {
                                name: "ph:upload-simple",
                                size: "36",
                                class: "text-gray-400 mx-auto mb-2"
                              }),
                              createVNode("p", { class: "text-sm text-gray-500 mb-1" }, "Drag and drop files here, or click to browse"),
                              createVNode("p", { class: "text-xs text-gray-400" }, "Supported formats: JPG, PNG, PDF (Max 2MB)")
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex justify-end space-x-3 mt-4" }, [
                createVNode(_component_rs_button, { variant: "secondary-outline" }, {
                  default: withCtx(() => [
                    createTextVNode("Cancel")
                  ]),
                  _: 1
                }),
                createVNode(_component_rs_button, { variant: "primary" }, {
                  default: withCtx(() => [
                    createTextVNode("Submit Application")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "mt-6 border rounded-md p-4 bg-blue-50" }, [
                createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Accordion Best Practices"),
                createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                  createVNode("li", null, "Use accordions for long forms to reduce cognitive load by breaking content into manageable sections."),
                  createVNode("li", null, "Single-section expansion is preferred for clarity (only one accordion item open at a time)."),
                  createVNode("li", null, "Ensure each section header clearly describes its contents."),
                  createVNode("li", null, "Add visual indicators showing completion status of each section (optional)."),
                  createVNode("li", null, "Keep important actions (e.g., Submit button) outside the accordion for visibility."),
                  createVNode("li", null, "Group related fields logically within each accordion section.")
                ])
              ]),
              createVNode("div", { class: "mt-4" }, [
                createVNode("h3", { class: "text-base font-semibold mb-3" }, "Accessibility Features"),
                createVNode("ul", { class: "text-sm space-y-2 list-disc pl-5" }, [
                  createVNode("li", null, [
                    createTextVNode("Accordion headers use the "),
                    createVNode("code", null, "button"),
                    createTextVNode(" element for keyboard and screen reader accessibility.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("ARIA attributes ("),
                    createVNode("code", null, "aria-expanded"),
                    createTextVNode(", "),
                    createVNode("code", null, "aria-controls"),
                    createTextVNode(") indicate state.")
                  ]),
                  createVNode("li", null, "Keyboard operation allows navigating with Tab and toggling with Space/Enter."),
                  createVNode("li", null, "Visible focus indicators highlight the current section being interacted with."),
                  createVNode("li", null, "Proper heading hierarchy within accordion content for semantic structure.")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:browser",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Modal Dialog Design Standards </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:browser",
                  class: "mr-2"
                }),
                createTextVNode(" Modal Dialog Design Standards ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4" data-v-ebdcd06d${_scopeId}>Modal dialogs are temporary overlays that appear over the current page to capture user input, confirm actions, or display important messages without requiring page navigation.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Modal Examples</h3><div class="mb-6 space-y-4" data-v-ebdcd06d${_scopeId}><div class="p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-2" data-v-ebdcd06d${_scopeId}>Info/Action Modal</h4><p class="text-sm text-gray-600 mb-4" data-v-ebdcd06d${_scopeId}>Use for important messages or confirmations that require user attention.</p>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              onClick: ($event) => openModalDemo("info", $event),
              id: "info-modal-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Open Info Modal `);
                } else {
                  return [
                    createTextVNode(" Open Info Modal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="p-4 border rounded-md" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-medium mb-2" data-v-ebdcd06d${_scopeId}>Form Modal</h4><p class="text-sm text-gray-600 mb-4" data-v-ebdcd06d${_scopeId}>Use for short forms or user input that doesn&#39;t require a full page.</p>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "info",
              onClick: ($event) => openModalDemo("form", $event),
              id: "form-modal-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Open Form Modal `);
                } else {
                  return [
                    createTextVNode(" Open Form Modal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-8" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Key Components</h3><div class="border rounded-md p-4 space-y-4" data-v-ebdcd06d${_scopeId}><ul class="text-sm space-y-3 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}><span class="font-medium" data-v-ebdcd06d${_scopeId}>Clear Title</span>: Use sentence case and be specific about the modal&#39;s purpose</li><li data-v-ebdcd06d${_scopeId}><span class="font-medium" data-v-ebdcd06d${_scopeId}>Close Button</span>: Always include a close button (\xD7) at the top-right</li><li data-v-ebdcd06d${_scopeId}><span class="font-medium" data-v-ebdcd06d${_scopeId}>Action Buttons</span>: Place at bottom-right, primary action first</li><li data-v-ebdcd06d${_scopeId}><span class="font-medium" data-v-ebdcd06d${_scopeId}>Focus Management</span>: Set initial focus on first interactive element</li><li data-v-ebdcd06d${_scopeId}><span class="font-medium" data-v-ebdcd06d${_scopeId}>Keyboard Navigation</span>: Support Tab key navigation and Escape to close</li><li data-v-ebdcd06d${_scopeId}><span class="font-medium" data-v-ebdcd06d${_scopeId}>Unsaved Changes</span>: Warn users before closing with unsaved changes</li><li data-v-ebdcd06d${_scopeId}><span class="font-medium" data-v-ebdcd06d${_scopeId}>Accessibility</span>: Include proper ARIA roles and labels</li></ul></div></div></div><div data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Structure &amp; Anatomy</h3><div class="border rounded-md p-6 bg-gray-50" data-v-ebdcd06d${_scopeId}><div class="border-2 border-gray-300 rounded-md shadow-sm" data-v-ebdcd06d${_scopeId}><div class="border-b p-4 bg-white rounded-t-md flex items-center justify-between" data-v-ebdcd06d${_scopeId}><h4 class="text-base font-semibold text-gray-800" data-v-ebdcd06d${_scopeId}>Update status</h4><button class="text-gray-500 hover:text-gray-700" aria-label="Close dialog" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "ph:x" }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="p-6 bg-white" data-v-ebdcd06d${_scopeId}><div class="space-y-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ebdcd06d${_scopeId}>Current Status</label><div class="text-sm bg-gray-100 p-2 rounded" data-v-ebdcd06d${_scopeId}>Active</div></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ebdcd06d${_scopeId}>New Status</label><select class="w-full border rounded-md p-2 text-sm" data-v-ebdcd06d${_scopeId}><option data-v-ebdcd06d${_scopeId}>Active</option><option data-v-ebdcd06d${_scopeId}>Pending</option><option data-v-ebdcd06d${_scopeId}>Suspended</option><option data-v-ebdcd06d${_scopeId}>Closed</option></select></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ebdcd06d${_scopeId}>Comments</label><textarea class="w-full border rounded-md p-2 text-sm" rows="2" data-v-ebdcd06d${_scopeId}></textarea></div></div></div><div class="border-t p-4 bg-white rounded-b-md flex justify-end space-x-3" data-v-ebdcd06d${_scopeId}><button class="px-4 py-2 text-sm border border-gray-300 rounded-md" data-v-ebdcd06d${_scopeId}> Cancel </button><button class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md" data-v-ebdcd06d${_scopeId}> Update Status </button></div></div><div class="mt-6 space-y-2 text-xs text-gray-600" data-v-ebdcd06d${_scopeId}><div class="flex items-center" data-v-ebdcd06d${_scopeId}><div class="w-3 h-3 bg-blue-600 rounded-full mr-2" data-v-ebdcd06d${_scopeId}></div><span data-v-ebdcd06d${_scopeId}>Header with clear, concise title</span></div><div class="flex items-center" data-v-ebdcd06d${_scopeId}><div class="w-3 h-3 bg-green-600 rounded-full mr-2" data-v-ebdcd06d${_scopeId}></div><span data-v-ebdcd06d${_scopeId}>Content area with focused, minimal UI</span></div><div class="flex items-center" data-v-ebdcd06d${_scopeId}><div class="w-3 h-3 bg-amber-600 rounded-full mr-2" data-v-ebdcd06d${_scopeId}></div><span data-v-ebdcd06d${_scopeId}>Action buttons at bottom-right (primary action highlighted)</span></div><div class="flex items-center" data-v-ebdcd06d${_scopeId}><div class="w-3 h-3 bg-red-600 rounded-full mr-2" data-v-ebdcd06d${_scopeId}></div><span data-v-ebdcd06d${_scopeId}>Close button at top-right corner</span></div></div></div><div class="mt-6 bg-blue-50 p-4 rounded-md text-sm" data-v-ebdcd06d${_scopeId}><h4 class="font-medium mb-2" data-v-ebdcd06d${_scopeId}>When to Use Modals</h4><ul class="space-y-1 text-xs text-gray-700 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>For actions requiring immediate attention</li><li data-v-ebdcd06d${_scopeId}>To collect focused user input without page navigation</li><li data-v-ebdcd06d${_scopeId}>For confirmations of destructive or important actions</li><li data-v-ebdcd06d${_scopeId}>To display quick information that needs acknowledgment</li></ul><h4 class="font-medium mt-3 mb-2" data-v-ebdcd06d${_scopeId}>When Not to Use</h4><ul class="space-y-1 text-xs text-gray-700 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>For complex forms requiring multiple steps</li><li data-v-ebdcd06d${_scopeId}>For content that could be displayed inline</li><li data-v-ebdcd06d${_scopeId}>For information that needs to be referenced alongside other page content</li><li data-v-ebdcd06d${_scopeId}>When multiple modals would need to be opened in sequence</li></ul></div></div></div>`);
            _push2(ssrRenderComponent(_component_rs_modal, {
              modelValue: unref(modalDemoOpen),
              "onUpdate:modelValue": ($event) => isRef(modalDemoOpen) ? modalDemoOpen.value = $event : null,
              role: "dialog",
              "aria-labelledby": "info-modal-title",
              "aria-describedby": "info-modal-description",
              size: "md",
              position: "center"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center w-full" data-v-ebdcd06d${_scopeId2}><h3 id="info-modal-title" class="text-lg font-semibold text-gray-800" data-v-ebdcd06d${_scopeId2}>System notification</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center w-full" }, [
                      createVNode("h3", {
                        id: "info-modal-title",
                        class: "text-lg font-semibold text-gray-800"
                      }, "System notification")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_rs_button, {
                    variant: "primary",
                    onClick: closeModalDemo,
                    autofocus: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Acknowledge `);
                      } else {
                        return [
                          createTextVNode(" Acknowledge ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(_component_rs_button, {
                        variant: "primary",
                        onClick: closeModalDemo,
                        autofocus: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Acknowledge ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-6 py-6" data-v-ebdcd06d${_scopeId2}><div class="flex items-start" data-v-ebdcd06d${_scopeId2}><div class="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:info-fill",
                    size: "24",
                    class: "text-blue-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div id="info-modal-description" data-v-ebdcd06d${_scopeId2}><p class="mb-4 text-gray-800" data-v-ebdcd06d${_scopeId2}>System maintenance is scheduled for tomorrow at 2:00 AM. The platform will be unavailable for approximately 30 minutes.</p><p class="text-sm text-gray-600" data-v-ebdcd06d${_scopeId2}>Please save your work and log out before the maintenance window begins.</p></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "px-6 py-6" }, [
                      createVNode("div", { class: "flex items-start" }, [
                        createVNode("div", { class: "bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0" }, [
                          createVNode(_component_Icon, {
                            name: "ph:info-fill",
                            size: "24",
                            class: "text-blue-600"
                          })
                        ]),
                        createVNode("div", { id: "info-modal-description" }, [
                          createVNode("p", { class: "mb-4 text-gray-800" }, "System maintenance is scheduled for tomorrow at 2:00 AM. The platform will be unavailable for approximately 30 minutes."),
                          createVNode("p", { class: "text-sm text-gray-600" }, "Please save your work and log out before the maintenance window begins.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_modal, {
              modelValue: unref(modalFormOpen),
              "onUpdate:modelValue": ($event) => isRef(modalFormOpen) ? modalFormOpen.value = $event : null,
              role: "dialog",
              "aria-labelledby": "form-modal-title",
              size: "md",
              position: "center"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center w-full" data-v-ebdcd06d${_scopeId2}><h3 id="form-modal-title" class="text-lg font-semibold text-gray-800" data-v-ebdcd06d${_scopeId2}>Update user information</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center w-full" }, [
                      createVNode("h3", {
                        id: "form-modal-title",
                        class: "text-lg font-semibold text-gray-800"
                      }, "Update user information")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-3" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_rs_button, {
                    variant: "secondary-outline",
                    onClick: tryCloseModalForm
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          createTextVNode(" Cancel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_button, {
                    variant: "primary",
                    onClick: saveModalForm,
                    disabled: !unref(modalFormData).name || !unref(modalFormData).email
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Save changes `);
                      } else {
                        return [
                          createTextVNode(" Save changes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(_component_rs_button, {
                        variant: "secondary-outline",
                        onClick: tryCloseModalForm
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_rs_button, {
                        variant: "primary",
                        onClick: saveModalForm,
                        disabled: !unref(modalFormData).name || !unref(modalFormData).email
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Save changes ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-6 py-6" data-v-ebdcd06d${_scopeId2}><div class="space-y-4" data-v-ebdcd06d${_scopeId2}><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="modal-form-name" data-v-ebdcd06d${_scopeId2}>Name <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input id="modal-form-name" type="text"${ssrRenderAttr("value", unref(modalFormData).name)} class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter user name" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="modal-form-email" data-v-ebdcd06d${_scopeId2}>Email <span class="text-red-500" data-v-ebdcd06d${_scopeId2}>*</span></label><input id="modal-form-email" type="email"${ssrRenderAttr("value", unref(modalFormData).email)} class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="user@example.com" data-v-ebdcd06d${_scopeId2}></div><div data-v-ebdcd06d${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="modal-form-status" data-v-ebdcd06d${_scopeId2}>Status</label><select id="modal-form-status" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ebdcd06d${_scopeId2}><option value="active" data-v-ebdcd06d${_scopeId2}>Active</option><option value="inactive" data-v-ebdcd06d${_scopeId2}>Inactive</option><option value="suspended" data-v-ebdcd06d${_scopeId2}>Suspended</option></select></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "px-6 py-6" }, [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            class: "block text-sm font-medium text-gray-700 mb-1",
                            for: "modal-form-name"
                          }, [
                            createTextVNode("Name "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "modal-form-name",
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(modalFormData).name = $event,
                            class: "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            placeholder: "Enter user name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(modalFormData).name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            class: "block text-sm font-medium text-gray-700 mb-1",
                            for: "modal-form-email"
                          }, [
                            createTextVNode("Email "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "modal-form-email",
                            type: "email",
                            "onUpdate:modelValue": ($event) => unref(modalFormData).email = $event,
                            class: "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            placeholder: "user@example.com"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(modalFormData).email]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            class: "block text-sm font-medium text-gray-700 mb-1",
                            for: "modal-form-status"
                          }, "Status"),
                          withDirectives(createVNode("select", {
                            id: "modal-form-status",
                            "onUpdate:modelValue": ($event) => unref(modalFormData).status = $event,
                            class: "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          }, [
                            createVNode("option", { value: "active" }, "Active"),
                            createVNode("option", { value: "inactive" }, "Inactive"),
                            createVNode("option", { value: "suspended" }, "Suspended")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(modalFormData).status]
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_modal, {
              modelValue: unref(modalWarningOpen),
              "onUpdate:modelValue": ($event) => isRef(modalWarningOpen) ? modalWarningOpen.value = $event : null,
              role: "dialog",
              "aria-labelledby": "warning-modal-title",
              size: "md",
              position: "center"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center w-full" data-v-ebdcd06d${_scopeId2}><h3 id="warning-modal-title" class="text-lg font-semibold text-gray-800" data-v-ebdcd06d${_scopeId2}>Discard changes?</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center w-full" }, [
                      createVNode("h3", {
                        id: "warning-modal-title",
                        class: "text-lg font-semibold text-gray-800"
                      }, "Discard changes?")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-3" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_rs_button, {
                    variant: "secondary-outline",
                    onClick: ($event) => modalWarningOpen.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Continue editing `);
                      } else {
                        return [
                          createTextVNode(" Continue editing ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_button, {
                    variant: "danger",
                    onClick: closeModalForm,
                    autofocus: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Discard changes `);
                      } else {
                        return [
                          createTextVNode(" Discard changes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(_component_rs_button, {
                        variant: "secondary-outline",
                        onClick: ($event) => modalWarningOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Continue editing ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_rs_button, {
                        variant: "danger",
                        onClick: closeModalForm,
                        autofocus: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Discard changes ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-6 py-6" data-v-ebdcd06d${_scopeId2}><div class="flex items-start" data-v-ebdcd06d${_scopeId2}><div class="bg-amber-100 rounded-full p-3 mr-4 flex-shrink-0" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:warning-circle-fill",
                    size: "24",
                    class: "text-amber-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-ebdcd06d${_scopeId2}><p class="mb-2 text-gray-800" data-v-ebdcd06d${_scopeId2}>You have unsaved changes. Are you sure you want to close this dialog?</p><p class="text-sm text-gray-600" data-v-ebdcd06d${_scopeId2}>Any changes you&#39;ve made will be lost if you close without saving.</p></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "px-6 py-6" }, [
                      createVNode("div", { class: "flex items-start" }, [
                        createVNode("div", { class: "bg-amber-100 rounded-full p-3 mr-4 flex-shrink-0" }, [
                          createVNode(_component_Icon, {
                            name: "ph:warning-circle-fill",
                            size: "24",
                            class: "text-amber-600"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "mb-2 text-gray-800" }, "You have unsaved changes. Are you sure you want to close this dialog?"),
                          createVNode("p", { class: "text-sm text-gray-600" }, "Any changes you've made will be lost if you close without saving.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-8 border rounded-md p-4 bg-blue-50" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-2" data-v-ebdcd06d${_scopeId}>Modal Implementation Best Practices</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><h5 class="text-xs font-medium mb-2" data-v-ebdcd06d${_scopeId}>Accessibility Requirements</h5><ul class="text-xs space-y-1 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Use <code data-v-ebdcd06d${_scopeId}>role=&quot;dialog&quot;</code> and <code data-v-ebdcd06d${_scopeId}>aria-labelledby</code> referencing title ID</li><li data-v-ebdcd06d${_scopeId}>Trap keyboard focus within the modal while open</li><li data-v-ebdcd06d${_scopeId}>Support closing with Escape key</li><li data-v-ebdcd06d${_scopeId}>Set initial focus on the first interactive element</li><li data-v-ebdcd06d${_scopeId}>Return focus to the trigger element when closed</li><li data-v-ebdcd06d${_scopeId}>Ensure screen reader users understand modal purpose</li></ul></div><div data-v-ebdcd06d${_scopeId}><h5 class="text-xs font-medium mb-2" data-v-ebdcd06d${_scopeId}>User Experience Guidelines</h5><ul class="text-xs space-y-1 list-disc pl-5" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>Warn users if they will lose unsaved changes</li><li data-v-ebdcd06d${_scopeId}>Keep modals simple and focused on a single task</li><li data-v-ebdcd06d${_scopeId}>Make modal title match the button/link that opened it</li><li data-v-ebdcd06d${_scopeId}>Disable scrolling of background content while modal is open</li><li data-v-ebdcd06d${_scopeId}>Use subtle animations for opening/closing (optional)</li><li data-v-ebdcd06d${_scopeId}>For mobile, ensure modals are responsive and touch-friendly</li></ul></div></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-4" }, "Modal dialogs are temporary overlays that appear over the current page to capture user input, confirm actions, or display important messages without requiring page navigation."),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Modal Examples"),
                  createVNode("div", { class: "mb-6 space-y-4" }, [
                    createVNode("div", { class: "p-4 border rounded-md" }, [
                      createVNode("h4", { class: "text-sm font-medium mb-2" }, "Info/Action Modal"),
                      createVNode("p", { class: "text-sm text-gray-600 mb-4" }, "Use for important messages or confirmations that require user attention."),
                      createVNode(_component_rs_button, {
                        variant: "primary",
                        onClick: ($event) => openModalDemo("info", $event),
                        id: "info-modal-button"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Open Info Modal ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "p-4 border rounded-md" }, [
                      createVNode("h4", { class: "text-sm font-medium mb-2" }, "Form Modal"),
                      createVNode("p", { class: "text-sm text-gray-600 mb-4" }, "Use for short forms or user input that doesn't require a full page."),
                      createVNode(_component_rs_button, {
                        variant: "info",
                        onClick: ($event) => openModalDemo("form", $event),
                        id: "form-modal-button"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Open Form Modal ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "mt-8" }, [
                    createVNode("h3", { class: "text-base font-semibold mb-4" }, "Key Components"),
                    createVNode("div", { class: "border rounded-md p-4 space-y-4" }, [
                      createVNode("ul", { class: "text-sm space-y-3 list-disc pl-5" }, [
                        createVNode("li", null, [
                          createVNode("span", { class: "font-medium" }, "Clear Title"),
                          createTextVNode(": Use sentence case and be specific about the modal's purpose")
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-medium" }, "Close Button"),
                          createTextVNode(": Always include a close button (\xD7) at the top-right")
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-medium" }, "Action Buttons"),
                          createTextVNode(": Place at bottom-right, primary action first")
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-medium" }, "Focus Management"),
                          createTextVNode(": Set initial focus on first interactive element")
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-medium" }, "Keyboard Navigation"),
                          createTextVNode(": Support Tab key navigation and Escape to close")
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-medium" }, "Unsaved Changes"),
                          createTextVNode(": Warn users before closing with unsaved changes")
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-medium" }, "Accessibility"),
                          createTextVNode(": Include proper ARIA roles and labels")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Structure & Anatomy"),
                  createVNode("div", { class: "border rounded-md p-6 bg-gray-50" }, [
                    createVNode("div", { class: "border-2 border-gray-300 rounded-md shadow-sm" }, [
                      createVNode("div", { class: "border-b p-4 bg-white rounded-t-md flex items-center justify-between" }, [
                        createVNode("h4", { class: "text-base font-semibold text-gray-800" }, "Update status"),
                        createVNode("button", {
                          class: "text-gray-500 hover:text-gray-700",
                          "aria-label": "Close dialog"
                        }, [
                          createVNode(_component_Icon, { name: "ph:x" })
                        ])
                      ]),
                      createVNode("div", { class: "p-6 bg-white" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Current Status"),
                            createVNode("div", { class: "text-sm bg-gray-100 p-2 rounded" }, "Active")
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "New Status"),
                            createVNode("select", { class: "w-full border rounded-md p-2 text-sm" }, [
                              createVNode("option", null, "Active"),
                              createVNode("option", null, "Pending"),
                              createVNode("option", null, "Suspended"),
                              createVNode("option", null, "Closed")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Comments"),
                            createVNode("textarea", {
                              class: "w-full border rounded-md p-2 text-sm",
                              rows: "2"
                            })
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t p-4 bg-white rounded-b-md flex justify-end space-x-3" }, [
                        createVNode("button", { class: "px-4 py-2 text-sm border border-gray-300 rounded-md" }, " Cancel "),
                        createVNode("button", { class: "px-4 py-2 text-sm bg-blue-600 text-white rounded-md" }, " Update Status ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-6 space-y-2 text-xs text-gray-600" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-3 h-3 bg-blue-600 rounded-full mr-2" }),
                        createVNode("span", null, "Header with clear, concise title")
                      ]),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-3 h-3 bg-green-600 rounded-full mr-2" }),
                        createVNode("span", null, "Content area with focused, minimal UI")
                      ]),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-3 h-3 bg-amber-600 rounded-full mr-2" }),
                        createVNode("span", null, "Action buttons at bottom-right (primary action highlighted)")
                      ]),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-3 h-3 bg-red-600 rounded-full mr-2" }),
                        createVNode("span", null, "Close button at top-right corner")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 bg-blue-50 p-4 rounded-md text-sm" }, [
                    createVNode("h4", { class: "font-medium mb-2" }, "When to Use Modals"),
                    createVNode("ul", { class: "space-y-1 text-xs text-gray-700 list-disc pl-5" }, [
                      createVNode("li", null, "For actions requiring immediate attention"),
                      createVNode("li", null, "To collect focused user input without page navigation"),
                      createVNode("li", null, "For confirmations of destructive or important actions"),
                      createVNode("li", null, "To display quick information that needs acknowledgment")
                    ]),
                    createVNode("h4", { class: "font-medium mt-3 mb-2" }, "When Not to Use"),
                    createVNode("ul", { class: "space-y-1 text-xs text-gray-700 list-disc pl-5" }, [
                      createVNode("li", null, "For complex forms requiring multiple steps"),
                      createVNode("li", null, "For content that could be displayed inline"),
                      createVNode("li", null, "For information that needs to be referenced alongside other page content"),
                      createVNode("li", null, "When multiple modals would need to be opened in sequence")
                    ])
                  ])
                ])
              ]),
              createVNode(_component_rs_modal, {
                modelValue: unref(modalDemoOpen),
                "onUpdate:modelValue": ($event) => isRef(modalDemoOpen) ? modalDemoOpen.value = $event : null,
                role: "dialog",
                "aria-labelledby": "info-modal-title",
                "aria-describedby": "info-modal-description",
                size: "md",
                position: "center"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center w-full" }, [
                    createVNode("h3", {
                      id: "info-modal-title",
                      class: "text-lg font-semibold text-gray-800"
                    }, "System notification")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end" }, [
                    createVNode(_component_rs_button, {
                      variant: "primary",
                      onClick: closeModalDemo,
                      autofocus: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Acknowledge ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "px-6 py-6" }, [
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode("div", { class: "bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0" }, [
                        createVNode(_component_Icon, {
                          name: "ph:info-fill",
                          size: "24",
                          class: "text-blue-600"
                        })
                      ]),
                      createVNode("div", { id: "info-modal-description" }, [
                        createVNode("p", { class: "mb-4 text-gray-800" }, "System maintenance is scheduled for tomorrow at 2:00 AM. The platform will be unavailable for approximately 30 minutes."),
                        createVNode("p", { class: "text-sm text-gray-600" }, "Please save your work and log out before the maintenance window begins.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_rs_modal, {
                modelValue: unref(modalFormOpen),
                "onUpdate:modelValue": ($event) => isRef(modalFormOpen) ? modalFormOpen.value = $event : null,
                role: "dialog",
                "aria-labelledby": "form-modal-title",
                size: "md",
                position: "center"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center w-full" }, [
                    createVNode("h3", {
                      id: "form-modal-title",
                      class: "text-lg font-semibold text-gray-800"
                    }, "Update user information")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-3" }, [
                    createVNode(_component_rs_button, {
                      variant: "secondary-outline",
                      onClick: tryCloseModalForm
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_rs_button, {
                      variant: "primary",
                      onClick: saveModalForm,
                      disabled: !unref(modalFormData).name || !unref(modalFormData).email
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Save changes ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "px-6 py-6" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          class: "block text-sm font-medium text-gray-700 mb-1",
                          for: "modal-form-name"
                        }, [
                          createTextVNode("Name "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "modal-form-name",
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(modalFormData).name = $event,
                          class: "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "Enter user name"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(modalFormData).name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          class: "block text-sm font-medium text-gray-700 mb-1",
                          for: "modal-form-email"
                        }, [
                          createTextVNode("Email "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "modal-form-email",
                          type: "email",
                          "onUpdate:modelValue": ($event) => unref(modalFormData).email = $event,
                          class: "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          placeholder: "user@example.com"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(modalFormData).email]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          class: "block text-sm font-medium text-gray-700 mb-1",
                          for: "modal-form-status"
                        }, "Status"),
                        withDirectives(createVNode("select", {
                          id: "modal-form-status",
                          "onUpdate:modelValue": ($event) => unref(modalFormData).status = $event,
                          class: "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "active" }, "Active"),
                          createVNode("option", { value: "inactive" }, "Inactive"),
                          createVNode("option", { value: "suspended" }, "Suspended")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(modalFormData).status]
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_rs_modal, {
                modelValue: unref(modalWarningOpen),
                "onUpdate:modelValue": ($event) => isRef(modalWarningOpen) ? modalWarningOpen.value = $event : null,
                role: "dialog",
                "aria-labelledby": "warning-modal-title",
                size: "md",
                position: "center"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center w-full" }, [
                    createVNode("h3", {
                      id: "warning-modal-title",
                      class: "text-lg font-semibold text-gray-800"
                    }, "Discard changes?")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-3" }, [
                    createVNode(_component_rs_button, {
                      variant: "secondary-outline",
                      onClick: ($event) => modalWarningOpen.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Continue editing ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_rs_button, {
                      variant: "danger",
                      onClick: closeModalForm,
                      autofocus: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Discard changes ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "px-6 py-6" }, [
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode("div", { class: "bg-amber-100 rounded-full p-3 mr-4 flex-shrink-0" }, [
                        createVNode(_component_Icon, {
                          name: "ph:warning-circle-fill",
                          size: "24",
                          class: "text-amber-600"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "mb-2 text-gray-800" }, "You have unsaved changes. Are you sure you want to close this dialog?"),
                        createVNode("p", { class: "text-sm text-gray-600" }, "Any changes you've made will be lost if you close without saving.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", { class: "mt-8 border rounded-md p-4 bg-blue-50" }, [
                createVNode("h4", { class: "text-sm font-semibold mb-2" }, "Modal Implementation Best Practices"),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("h5", { class: "text-xs font-medium mb-2" }, "Accessibility Requirements"),
                    createVNode("ul", { class: "text-xs space-y-1 list-disc pl-5" }, [
                      createVNode("li", null, [
                        createTextVNode("Use "),
                        createVNode("code", null, 'role="dialog"'),
                        createTextVNode(" and "),
                        createVNode("code", null, "aria-labelledby"),
                        createTextVNode(" referencing title ID")
                      ]),
                      createVNode("li", null, "Trap keyboard focus within the modal while open"),
                      createVNode("li", null, "Support closing with Escape key"),
                      createVNode("li", null, "Set initial focus on the first interactive element"),
                      createVNode("li", null, "Return focus to the trigger element when closed"),
                      createVNode("li", null, "Ensure screen reader users understand modal purpose")
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("h5", { class: "text-xs font-medium mb-2" }, "User Experience Guidelines"),
                    createVNode("ul", { class: "text-xs space-y-1 list-disc pl-5" }, [
                      createVNode("li", null, "Warn users if they will lose unsaved changes"),
                      createVNode("li", null, "Keep modals simple and focused on a single task"),
                      createVNode("li", null, "Make modal title match the button/link that opened it"),
                      createVNode("li", null, "Disable scrolling of background content while modal is open"),
                      createVNode("li", null, "Use subtle animations for opening/closing (optional)"),
                      createVNode("li", null, "For mobile, ensure modals are responsive and touch-friendly")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:cursor-click",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` UI Feedback &amp; Interaction States </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_Icon, {
                  name: "ph:cursor-click",
                  class: "mr-2"
                }),
                createTextVNode(" UI Feedback & Interaction States ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-6" data-v-ebdcd06d${_scopeId}>This example showcases enterprise-grade UI feedback mechanisms and interaction states for optimal user experience.</p><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" data-v-ebdcd06d${_scopeId}><div class="space-y-6 border rounded-lg p-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Form Validation &amp; Feedback</h3><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ebdcd06d${_scopeId}>Username <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><div class="relative" data-v-ebdcd06d${_scopeId}><input type="text" value="admin_user" class="w-full border border-green-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" data-v-ebdcd06d${_scopeId}><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:check-circle-fill",
              class: "text-green-500"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><p class="mt-1 text-xs text-green-600" data-v-ebdcd06d${_scopeId}>Username is available</p></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ebdcd06d${_scopeId}>Email Address <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><div class="relative" data-v-ebdcd06d${_scopeId}><input type="text" value="invalid-email" class="w-full border border-red-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" data-v-ebdcd06d${_scopeId}></div><p class="mt-1 text-xs text-red-600 flex items-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:warning-circle-fill",
              class: "mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Please enter a valid email address </p></div><div data-v-ebdcd06d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ebdcd06d${_scopeId}>Password <span class="text-red-500" data-v-ebdcd06d${_scopeId}>*</span></label><input type="password" value="password123" class="w-full border border-blue-500 rounded-md px-3 py-2 outline-none ring-2 ring-blue-500" data-v-ebdcd06d${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>Password must be at least 8 characters</p></div><div class="pt-4 flex items-center justify-between" data-v-ebdcd06d${_scopeId}><div class="relative" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "success",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:check-bold",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Saved `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:check-bold",
                      class: "mr-1"
                    }),
                    createTextVNode(" Saved ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              class: "flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="flex items-center" data-v-ebdcd06d${_scopeId2}><span class="w-4 h-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin" data-v-ebdcd06d${_scopeId2}></span> Processing... </span>`);
                } else {
                  return [
                    createVNode("span", { class: "flex items-center" }, [
                      createVNode("span", { class: "w-4 h-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin" }),
                      createTextVNode(" Processing... ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              class: "w-full",
              disabled: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Submit Form (Disabled) `);
                } else {
                  return [
                    createTextVNode(" Submit Form (Disabled) ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="mt-1 text-xs text-gray-500 text-center" data-v-ebdcd06d${_scopeId}>Complete all required fields to enable</p></div></div><div class="space-y-6 border rounded-lg p-6" data-v-ebdcd06d${_scopeId}><h3 class="text-base font-semibold mb-4" data-v-ebdcd06d${_scopeId}>Interactive Elements</h3><div class="mb-6 relative" data-v-ebdcd06d${_scopeId}><div class="absolute top-0 right-0 max-w-xs" data-v-ebdcd06d${_scopeId}><div class="bg-green-50 border-l-4 border-green-500 p-4 shadow-md rounded-md flex items-start" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:check-circle-fill",
              class: "text-green-500 mt-0.5 mr-3 flex-shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<div data-v-ebdcd06d${_scopeId}><p class="text-sm font-medium text-green-800" data-v-ebdcd06d${_scopeId}>Changes saved successfully!</p><p class="mt-1 text-xs text-green-700" data-v-ebdcd06d${_scopeId}>Your profile has been updated.</p></div><button class="ml-auto text-green-500 hover:text-green-700" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "ph:x-bold" }, null, _parent2, _scopeId));
            _push2(`</button></div></div><p class="text-sm mb-2" data-v-ebdcd06d${_scopeId}>Toast notification appears in the top-right corner:</p><div class="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center h-28" data-v-ebdcd06d${_scopeId}><p class="text-center text-gray-500 text-sm" data-v-ebdcd06d${_scopeId}>Toast notification area</p></div></div><div class="mb-6" data-v-ebdcd06d${_scopeId}><p class="text-sm mb-3" data-v-ebdcd06d${_scopeId}>Hover &amp; Focus States:</p><div class="flex flex-wrap gap-3 mb-4" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              class: "hover:bg-blue-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hover me `);
                } else {
                  return [
                    createTextVNode(" Hover me ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "secondary",
              class: "focus:ring-4 focus:ring-gray-300 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Focus me (Tab) `);
                } else {
                  return [
                    createTextVNode(" Focus me (Tab) ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "danger-outline",
              class: "hover:bg-red-50 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Destructive `);
                } else {
                  return [
                    createTextVNode(" Destructive ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div data-v-ebdcd06d${_scopeId}><p class="text-sm mb-3" data-v-ebdcd06d${_scopeId}>Destructive Action with Confirmation:</p>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "danger",
              class: "flex items-center",
              onClick: ($event) => showModal.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:trash-bold",
                    class: "mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Delete Account `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ph:trash-bold",
                      class: "mr-2"
                    }),
                    createTextVNode(" Delete Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-8" data-v-ebdcd06d${_scopeId}><p class="text-sm mb-3" data-v-ebdcd06d${_scopeId}>Button States:</p><div class="flex flex-wrap gap-4" data-v-ebdcd06d${_scopeId}><div class="text-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, { variant: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Normal `);
                } else {
                  return [
                    createTextVNode(" Normal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="mt-2 text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>Default</p></div><div class="text-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              class: "opacity-80"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hovered `);
                } else {
                  return [
                    createTextVNode(" Hovered ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="mt-2 text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>On hover</p></div><div class="text-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              class: "ring-2 ring-blue-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Focused `);
                } else {
                  return [
                    createTextVNode(" Focused ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="mt-2 text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>Keyboard focus</p></div><div class="text-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              class: "bg-blue-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Pressed `);
                } else {
                  return [
                    createTextVNode(" Pressed ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="mt-2 text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>On press</p></div><div class="text-center" data-v-ebdcd06d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_rs_button, {
              variant: "primary",
              disabled: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Disabled `);
                } else {
                  return [
                    createTextVNode(" Disabled ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="mt-2 text-xs text-gray-500" data-v-ebdcd06d${_scopeId}>Inactive</p></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_component_rs_modal, {
              modelValue: unref(showModal),
              "onUpdate:modelValue": ($event) => isRef(showModal) ? showModal.value = $event : null
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border-b" data-v-ebdcd06d${_scopeId2}><h3 class="text-lg font-semibold text-gray-800" data-v-ebdcd06d${_scopeId2}>Confirm Account Deletion</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border-b" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-800" }, "Confirm Account Deletion")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border-t flex justify-end gap-3" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_rs_button, {
                    variant: "secondary",
                    onClick: ($event) => showModal.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_rs_button, { variant: "danger" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Permanently Delete`);
                      } else {
                        return [
                          createTextVNode("Permanently Delete")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border-t flex justify-end gap-3" }, [
                      createVNode(_component_rs_button, {
                        variant: "secondary",
                        onClick: ($event) => showModal.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_rs_button, { variant: "danger" }, {
                        default: withCtx(() => [
                          createTextVNode("Permanently Delete")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6" data-v-ebdcd06d${_scopeId2}><div class="flex items-start" data-v-ebdcd06d${_scopeId2}><div class="bg-red-100 rounded-full p-2 mr-4" data-v-ebdcd06d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ph:warning-circle-fill",
                    size: "24",
                    class: "text-red-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-ebdcd06d${_scopeId2}><p class="mb-4 font-medium text-gray-700" data-v-ebdcd06d${_scopeId2}>Are you sure you want to delete your account?</p><p class="text-sm text-gray-600 mb-4" data-v-ebdcd06d${_scopeId2}> This action cannot be undone. All of your data will be permanently removed from our servers forever. This action is irreversible. </p><div class="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4" data-v-ebdcd06d${_scopeId2}><p class="text-sm text-gray-600" data-v-ebdcd06d${_scopeId2}> To confirm, please type &quot;delete&quot; below: </p><input type="text" class="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Type &#39;delete&#39;" data-v-ebdcd06d${_scopeId2}></div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex items-start" }, [
                        createVNode("div", { class: "bg-red-100 rounded-full p-2 mr-4" }, [
                          createVNode(_component_Icon, {
                            name: "ph:warning-circle-fill",
                            size: "24",
                            class: "text-red-600"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "mb-4 font-medium text-gray-700" }, "Are you sure you want to delete your account?"),
                          createVNode("p", { class: "text-sm text-gray-600 mb-4" }, " This action cannot be undone. All of your data will be permanently removed from our servers forever. This action is irreversible. "),
                          createVNode("div", { class: "bg-gray-50 p-3 rounded-md border border-gray-200 mb-4" }, [
                            createVNode("p", { class: "text-sm text-gray-600" }, ' To confirm, please type "delete" below: '),
                            createVNode("input", {
                              type: "text",
                              class: "mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500",
                              placeholder: "Type 'delete'"
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
            _push2(`<div class="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200" data-v-ebdcd06d${_scopeId}><h4 class="text-sm font-semibold mb-3" data-v-ebdcd06d${_scopeId}>Enterprise Design System Specifications</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" data-v-ebdcd06d${_scopeId}><div data-v-ebdcd06d${_scopeId}><p class="font-medium" data-v-ebdcd06d${_scopeId}>Typography</p><ul class="text-xs space-y-1 mt-1 text-gray-600" data-v-ebdcd06d${_scopeId}><li data-v-ebdcd06d${_scopeId}>\u2022 Font: Inter, sans-serif</li><li data-v-ebdcd06d${_scopeId}>\u2022 Base size: 16px (1rem)</li><li data-v-ebdcd06d${_scopeId}>\u2022 Line height: 1.5</li></ul></div><div data-v-ebdcd06d${_scopeId}><p class="font-medium" data-v-ebdcd06d${_scopeId}>Color Palette</p><div class="flex items-center mt-2 space-x-2" data-v-ebdcd06d${_scopeId}><div class="w-6 h-6 bg-[#0057A6] rounded" data-v-ebdcd06d${_scopeId}></div><span class="text-xs text-gray-600" data-v-ebdcd06d${_scopeId}>Primary Blue (#0057A6)</span></div><div class="flex items-center mt-2 space-x-2" data-v-ebdcd06d${_scopeId}><div class="w-6 h-6 bg-red-600 rounded" data-v-ebdcd06d${_scopeId}></div><span class="text-xs text-gray-600" data-v-ebdcd06d${_scopeId}>Error/Destructive (#DC2626)</span></div><div class="flex items-center mt-2 space-x-2" data-v-ebdcd06d${_scopeId}><div class="w-6 h-6 bg-green-600 rounded" data-v-ebdcd06d${_scopeId}></div><span class="text-xs text-gray-600" data-v-ebdcd06d${_scopeId}>Success (#16A34A)</span></div></div></div></div>`);
          } else {
            return [
              createVNode("p", { class: "mb-6" }, "This example showcases enterprise-grade UI feedback mechanisms and interaction states for optimal user experience."),
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" }, [
                createVNode("div", { class: "space-y-6 border rounded-lg p-6" }, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Form Validation & Feedback"),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                      createTextVNode("Username "),
                      createVNode("span", { class: "text-red-500" }, "*")
                    ]),
                    createVNode("div", { class: "relative" }, [
                      createVNode("input", {
                        type: "text",
                        value: "admin_user",
                        class: "w-full border border-green-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      }),
                      createVNode("div", { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" }, [
                        createVNode(_component_Icon, {
                          name: "ph:check-circle-fill",
                          class: "text-green-500"
                        })
                      ])
                    ]),
                    createVNode("p", { class: "mt-1 text-xs text-green-600" }, "Username is available")
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                      createTextVNode("Email Address "),
                      createVNode("span", { class: "text-red-500" }, "*")
                    ]),
                    createVNode("div", { class: "relative" }, [
                      createVNode("input", {
                        type: "text",
                        value: "invalid-email",
                        class: "w-full border border-red-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      })
                    ]),
                    createVNode("p", { class: "mt-1 text-xs text-red-600 flex items-center" }, [
                      createVNode(_component_Icon, {
                        name: "ph:warning-circle-fill",
                        class: "mr-1"
                      }),
                      createTextVNode(" Please enter a valid email address ")
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                      createTextVNode("Password "),
                      createVNode("span", { class: "text-red-500" }, "*")
                    ]),
                    createVNode("input", {
                      type: "password",
                      value: "password123",
                      class: "w-full border border-blue-500 rounded-md px-3 py-2 outline-none ring-2 ring-blue-500"
                    }),
                    createVNode("p", { class: "mt-1 text-xs text-gray-500" }, "Password must be at least 8 characters")
                  ]),
                  createVNode("div", { class: "pt-4 flex items-center justify-between" }, [
                    createVNode("div", { class: "relative" }, [
                      createVNode(_component_rs_button, {
                        variant: "success",
                        class: "flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "ph:check-bold",
                            class: "mr-1"
                          }),
                          createTextVNode(" Saved ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_rs_button, {
                      variant: "primary",
                      class: "flex items-center"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "flex items-center" }, [
                          createVNode("span", { class: "w-4 h-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin" }),
                          createTextVNode(" Processing... ")
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "pt-2" }, [
                    createVNode(_component_rs_button, {
                      variant: "primary",
                      class: "w-full",
                      disabled: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Submit Form (Disabled) ")
                      ]),
                      _: 1
                    }),
                    createVNode("p", { class: "mt-1 text-xs text-gray-500 text-center" }, "Complete all required fields to enable")
                  ])
                ]),
                createVNode("div", { class: "space-y-6 border rounded-lg p-6" }, [
                  createVNode("h3", { class: "text-base font-semibold mb-4" }, "Interactive Elements"),
                  createVNode("div", { class: "mb-6 relative" }, [
                    createVNode("div", { class: "absolute top-0 right-0 max-w-xs" }, [
                      createVNode("div", { class: "bg-green-50 border-l-4 border-green-500 p-4 shadow-md rounded-md flex items-start" }, [
                        createVNode(_component_Icon, {
                          name: "ph:check-circle-fill",
                          class: "text-green-500 mt-0.5 mr-3 flex-shrink-0"
                        }),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-green-800" }, "Changes saved successfully!"),
                          createVNode("p", { class: "mt-1 text-xs text-green-700" }, "Your profile has been updated.")
                        ]),
                        createVNode("button", { class: "ml-auto text-green-500 hover:text-green-700" }, [
                          createVNode(_component_Icon, { name: "ph:x-bold" })
                        ])
                      ])
                    ]),
                    createVNode("p", { class: "text-sm mb-2" }, "Toast notification appears in the top-right corner:"),
                    createVNode("div", { class: "bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center h-28" }, [
                      createVNode("p", { class: "text-center text-gray-500 text-sm" }, "Toast notification area")
                    ])
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("p", { class: "text-sm mb-3" }, "Hover & Focus States:"),
                    createVNode("div", { class: "flex flex-wrap gap-3 mb-4" }, [
                      createVNode(_component_rs_button, {
                        variant: "primary",
                        class: "hover:bg-blue-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Hover me ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_rs_button, {
                        variant: "secondary",
                        class: "focus:ring-4 focus:ring-gray-300 transition-all"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Focus me (Tab) ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_rs_button, {
                        variant: "danger-outline",
                        class: "hover:bg-red-50 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Destructive ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm mb-3" }, "Destructive Action with Confirmation:"),
                    createVNode(_component_rs_button, {
                      variant: "danger",
                      class: "flex items-center",
                      onClick: ($event) => showModal.value = true
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "ph:trash-bold",
                          class: "mr-2"
                        }),
                        createTextVNode(" Delete Account ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "mt-8" }, [
                    createVNode("p", { class: "text-sm mb-3" }, "Button States:"),
                    createVNode("div", { class: "flex flex-wrap gap-4" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode(_component_rs_button, { variant: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode(" Normal ")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "Default")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(_component_rs_button, {
                          variant: "primary",
                          class: "opacity-80"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Hovered ")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "On hover")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(_component_rs_button, {
                          variant: "primary",
                          class: "ring-2 ring-blue-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Focused ")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "Keyboard focus")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(_component_rs_button, {
                          variant: "primary",
                          class: "bg-blue-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Pressed ")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "On press")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(_component_rs_button, {
                          variant: "primary",
                          disabled: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Disabled ")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "Inactive")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_component_rs_modal, {
                modelValue: unref(showModal),
                "onUpdate:modelValue": ($event) => isRef(showModal) ? showModal.value = $event : null
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "p-4 border-b" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-800" }, "Confirm Account Deletion")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "p-4 border-t flex justify-end gap-3" }, [
                    createVNode(_component_rs_button, {
                      variant: "secondary",
                      onClick: ($event) => showModal.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_rs_button, { variant: "danger" }, {
                      default: withCtx(() => [
                        createTextVNode("Permanently Delete")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode("div", { class: "bg-red-100 rounded-full p-2 mr-4" }, [
                        createVNode(_component_Icon, {
                          name: "ph:warning-circle-fill",
                          size: "24",
                          class: "text-red-600"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "mb-4 font-medium text-gray-700" }, "Are you sure you want to delete your account?"),
                        createVNode("p", { class: "text-sm text-gray-600 mb-4" }, " This action cannot be undone. All of your data will be permanently removed from our servers forever. This action is irreversible. "),
                        createVNode("div", { class: "bg-gray-50 p-3 rounded-md border border-gray-200 mb-4" }, [
                          createVNode("p", { class: "text-sm text-gray-600" }, ' To confirm, please type "delete" below: '),
                          createVNode("input", {
                            type: "text",
                            class: "mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500",
                            placeholder: "Type 'delete'"
                          })
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", { class: "mt-6 bg-gray-50 p-4 rounded-md border border-gray-200" }, [
                createVNode("h4", { class: "text-sm font-semibold mb-3" }, "Enterprise Design System Specifications"),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "font-medium" }, "Typography"),
                    createVNode("ul", { class: "text-xs space-y-1 mt-1 text-gray-600" }, [
                      createVNode("li", null, "\u2022 Font: Inter, sans-serif"),
                      createVNode("li", null, "\u2022 Base size: 16px (1rem)"),
                      createVNode("li", null, "\u2022 Line height: 1.5")
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-medium" }, "Color Palette"),
                    createVNode("div", { class: "flex items-center mt-2 space-x-2" }, [
                      createVNode("div", { class: "w-6 h-6 bg-[#0057A6] rounded" }),
                      createVNode("span", { class: "text-xs text-gray-600" }, "Primary Blue (#0057A6)")
                    ]),
                    createVNode("div", { class: "flex items-center mt-2 space-x-2" }, [
                      createVNode("div", { class: "w-6 h-6 bg-red-600 rounded" }),
                      createVNode("span", { class: "text-xs text-gray-600" }, "Error/Destructive (#DC2626)")
                    ]),
                    createVNode("div", { class: "flex items-center mt-2 space-x-2" }, [
                      createVNode("div", { class: "w-6 h-6 bg-green-600 rounded" }),
                      createVNode("span", { class: "text-xs text-gray-600" }, "Success (#16A34A)")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kitchen-sink/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ebdcd06d"]]);

export { index as default };
//# sourceMappingURL=index-f4a37f8f.mjs.map
