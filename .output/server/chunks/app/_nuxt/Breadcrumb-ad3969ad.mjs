import { _ as __nuxt_component_0$1 } from './nuxt-link-26e5a74c.mjs';
import { b as useRoute, _ as __nuxt_component_1$1 } from '../server.mjs';
import { useSSRContext, computed, unref, mergeProps, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const breadcrumb = computed(() => {
      var _a;
      let breadcrumb2 = null;
      const matched = route.matched;
      if ((_a = matched[matched.length - 1].meta) == null ? void 0 : _a.breadcrumb) {
        breadcrumb2 = matched[matched.length - 1].meta.breadcrumb;
      } else {
        breadcrumb2 = matched.map((item) => {
          return {
            name: item.name,
            path: item.path
          };
        });
        return breadcrumb2;
      }
      if (breadcrumb2) {
        breadcrumb2.forEach((item) => {
          if (item.type == "current") {
            item.path = route.path;
          } else if (item.type == "parent") {
            item.path = route.path.split("/").slice(0, -item.parentNo).join("/");
          }
        });
      }
      return breadcrumb2;
    });
    computed(() => {
      const matched = route.matched;
      const title = matched[matched.length - 1].name;
      return title;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      if (unref(breadcrumb)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-6" }, _attrs))}><nav aria-label="Breadcrumb" class="mb-4"><ol class="flex items-center text-sm"><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:home",
                size: "16"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "mdi:home",
                  size: "16"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><!--[-->`);
        ssrRenderList(unref(breadcrumb), (item, index) => {
          _push(`<li class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:chevron-right",
            size: "16",
            class: "mx-2 text-gray-400",
            "aria-hidden": "true"
          }, null, _parent));
          _push(`<a class="${ssrRenderClass([{
            "text-gray-500 hover:text-gray-700": index !== unref(breadcrumb).length - 1,
            "text-primary font-medium": index === unref(breadcrumb).length - 1
          }, "cursor-pointer capitalize"])}"${ssrRenderAttr("aria-current", index === unref(breadcrumb).length - 1 ? "page" : void 0)}>${ssrInterpolate(item.name)}</a></li>`);
        });
        _push(`<!--]--></ol></nav></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/Breadcrumb.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main;

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Breadcrumb-ad3969ad.mjs.map
