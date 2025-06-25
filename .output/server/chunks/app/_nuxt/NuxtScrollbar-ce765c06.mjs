import { _ as __nuxt_component_0 } from './client-only-29ef7f45.mjs';
import { useSSRContext, withCtx, createVNode, resolveDynamicComponent, renderSlot, openBlock, createBlock, getCurrentInstance, toRefs, reactive } from 'vue';
import { a as _export_sfc, e as useHead, b as useRoute, f as useAsyncData, c as createError, g as useNuxtApp } from '../server.mjs';
import { ssrRenderComponent, ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';
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

const NuxtComponentIndicator = "__nuxt_component";
async function runLegacyAsyncData(res, fn) {
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const vm = getCurrentInstance();
  const { fetchKey, _fetchKeyBase } = vm.proxy.$options;
  const key = (typeof fetchKey === "function" ? fetchKey(() => "") : fetchKey) || [_fetchKeyBase, route.fullPath, route.matched.findIndex((r) => Object.values(r.components || {}).includes(vm.type))].join(":");
  const { data, error } = await useAsyncData(`options:asyncdata:${key}`, () => nuxtApp.runWithContext(() => fn(nuxtApp)));
  if (error.value) {
    throw createError(error.value);
  }
  if (data.value && typeof data.value === "object") {
    Object.assign(await res, toRefs(reactive(data.value)));
  }
}
const defineNuxtComponent = function defineNuxtComponent2(...args) {
  const [options, key] = args;
  const { setup } = options;
  if (!setup && !options.asyncData && !options.head) {
    return {
      [NuxtComponentIndicator]: true,
      ...options
    };
  }
  return {
    [NuxtComponentIndicator]: true,
    _fetchKeyBase: key,
    ...options,
    setup(props, ctx) {
      const nuxtApp = useNuxtApp();
      const res = setup ? Promise.resolve(nuxtApp.runWithContext(() => setup(props, ctx))).then((r) => r || {}) : {};
      const promises = [];
      if (options.asyncData) {
        promises.push(runLegacyAsyncData(res, options.asyncData));
      }
      if (options.head) {
        const nuxtApp2 = useNuxtApp();
        useHead(typeof options.head === "function" ? () => options.head(nuxtApp2) : options.head);
      }
      return Promise.resolve(res).then(() => Promise.all(promises)).then(() => res).finally(() => {
        promises.length = 0;
      });
    }
  };
};
const _sfc_main = /* @__PURE__ */ defineNuxtComponent({
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    tag: {
      type: String,
      required: false,
      default: "div"
    },
    watchOptions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    handlers() {
      const events = [
        "scroll",
        "ps-scroll-y",
        "ps-scroll-x",
        "ps-scroll-up",
        "ps-scroll-down",
        "ps-scroll-left",
        "ps-scroll-right",
        "ps-y-reach-start",
        "ps-y-reach-end",
        "ps-x-reach-start",
        "ps-x-reach-end"
      ];
      return events.reduce((handlers, key) => {
        handlers[key] = (...args) => this.$emit(key, ...args);
        return handlers;
      }, {});
    }
  }
}, "$5GjKioyWkT");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_client_only = __nuxt_component_0;
  _push(ssrRenderComponent(_component_client_only, _attrs, {
    fallback: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(_ctx.tag), _ctx.$attrs, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }), _parent2, _scopeId);
      } else {
        return [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), _ctx.$attrs, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ];
      }
    })
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@davestewart/nuxt-scrollbar/dist/runtime/NuxtScrollbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as default };
//# sourceMappingURL=NuxtScrollbar-ce765c06.mjs.map
