import { _ as __nuxt_component_1$1 } from '../server.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = {
  __name: "RsBadge",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: ""
    },
    iconSize: {
      type: String,
      default: "18"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["badge", {
          "badge-primary": __props.variant === "primary",
          "badge-secondary": __props.variant === "secondary",
          "badge-info": __props.variant === "info",
          "badge-success": __props.variant === "success",
          "badge-warning": __props.variant === "warning",
          "badge-danger": __props.variant === "danger",
          "badge-disabled": __props.variant === "disabled"
        }]
      }, _attrs))}>`);
      if (__props.icon) {
        _push(ssrRenderComponent(_component_Icon, {
          name: __props.icon,
          size: __props.iconSize
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main;

export { __nuxt_component_4 as _ };
//# sourceMappingURL=RsBadge-e0a22fbb.mjs.map
